<template>
	<v-layout align-center justify-center row fill-height>
		<v-flex xs12 sm10 md8 lg6 v-if="loadedUser">
			<v-card class="card">
				<v-card-title primary-title>
					<v-flex xs6>
						<h2 class="white--text text-xs-left">HOMEPAGE</h2>
					</v-flex>
					<v-flex xs6 class="text-xs-right">
						<fa :icon="['fas', 'arrow-circle-left']" size="2x" class="icon" @click="goBack" />
					</v-flex>
				</v-card-title>

				<v-card-text class="card-text mx-3">
					<div v-if="loadedUser" class="text-xs-center">
						<h3>Bienvenue {{ loadedUser.email }}!</h3><br />
						<h4>Une demonstration des techniques de Progressive Web App (PWA) appliquées à TIF:</h4><br />
						<p>
							- Installer l'application sur son écran d'accueil.<br />
							- Recevoir une notification de résultat dès le coup sifflet final sur mes différents appareils enregistrés (ordinateur, tablette, téléphone). Il faut bien entendu souscrire aux notifications manuellement sur chaque appareil depuis lequel on souhaite recevoir des notifications.
						</p>
						<br /><br />
						<nuxt-link to="/api/send-notifications" target="_blank">Send notifications</nuxt-link><br />

						<v-alert :value="true" type="error" dismissible v-if="are_notifications_allowed === 'no'">
      						You did not allowed notifications on this site. To receive our notifications, change your browser settings (notifications button usually stamds directly on the left of the address bar)
    					</v-alert>

						<v-btn color="success" @click="enableNotifications" v-if="are_notifications_allowed === 'default'">Enable notifications on this site</v-btn>

						<v-btn color="warning" @click="unsubscribe" v-if="is_subscribed">Unsubscribe from push notifications</v-btn><br /><br />
						<v-btn color="success" @click="subscribe" v-if="are_notifications_allowed !== 'no' && are_notifications_allowed !== 'default' && !is_subscribed">Subscribe to push notifications</v-btn><br />
						<v-btn color="default" @click="checkSubscription">Check my subscription status</v-btn><br />
						<v-btn nuxt color="success" class="elevation-0" @click="addToHomescreen" v-if="showButton">Add to homescreen</v-btn>

						<br /><br /><hr><br />
						<v-btn nuxt to="/events" color="primary" class="elevation-0">EVENTS</v-btn>
						<v-btn nuxt to="/teams" color="primary" class="elevation-0">MY TEAMS</v-btn>
						<v-btn color="warning" @click="logout" class="elevation-0">Logout</v-btn>
					</div>
					<div v-else>
						You are not logged in and therefore should not be able to see this page
					</div>

				</v-card-text>
				<v-card-actions class="card-footer">
					<v-flex class="text-xs-center">
						<v-btn nuxt color="error" to="/" class="elevation-0">Go back</v-btn>
						<v-btn class="elevation-0">Cancel</v-btn>
					</v-flex>
				</v-card-actions>
			</v-card>
		</v-flex>
	</v-layout>
</template>

<script>
	import axios from 'axios'
	import Noty from 'noty'
	import firebase from 'firebase/app'

	// PWA Install to Homescreen
	let deferredPrompt

	export default {
		head: {
			title: 'Home',
		},
		layout: "layoutFront",
		// middleware: ['auth-check'],
		mounted () {
			if (Notification.permission === "granted") {
				console.log("Notifications granted")
				this.are_notifications_allowed = "yes"
			} else if (Notification.permission === "default") {
				this.are_notifications_allowed = "default"
			} else {
				this.are_notifications_allowed = "no"
			}
			this.checkSubscription(false)

			// Check for add to homescreen button
			window.addEventListener('beforeinstallprompt', (e) => {
				console.log('beforeinstallprompt called!!!!')
				deferredPrompt = e
				this.showButton = true
			});
		},
		data() {
			return {
				are_notifications_allowed: "",
				is_subscribed: "",
				showButton: false
			}
		},
		computed: {
			loadedUser() {
				return this.$store.getters["users/loadedUser"]
			}
		},
		methods: {
			addToHomescreen () {
				deferredPrompt.prompt();
				// Wait for the user to respond to the prompt
				deferredPrompt.userChoice
					.then((choiceResult) => {
						if (choiceResult.outcome === 'accepted') {
							console.log('User accepted the A2HS prompt');
							this.showButton = false
						} else {
							console.log('User dismissed the A2HS prompt');
							this.showButton = false
						}
						deferredPrompt = null;
					});
			},
			enableNotifications() {
				console.log("Click enable notifications button")
				var that = this
				Notification.requestPermission().then(function(result) {
					console.log("User choice: ", result)
					if (result !== "granted") {
						console.log("No notification permission granted!")
						that.are_notifications_allowed = "no"
						return false
					} else {
						that.are_notifications_allowed = "yes"
						return that.configurePushSub()
					}
				})
			},
			urlBase64ToUint8Array(base64String) {
				const padding = "=".repeat((4 - (base64String.length % 4)) % 4)
				const base64 = (base64String + padding)
					.replace(/\-/g, "+")
					.replace(/_/g, "/")

				const rawData = window.atob(base64)
				const outputArray = new Uint8Array(rawData.length)

				for (let i = 0; i < rawData.length; ++i) {
					outputArray[i] = rawData.charCodeAt(i)
				}
				return outputArray
			},
			async checkSubscription(displayMessage = true) {
				console.log("Call to checkSubscription method")
				new Noty({
					type: "success",
					text: "Call to checkSubscription",
					timeout: 5000,
					theme: "metroui"
				}).show();
				const that = this

				if (!navigator.serviceWorker) {
					new Noty({
						type: "warning",
						text: "Service worker is not available on this navigator &#x2639;",
						timeout: 5000,
						theme: "metroui"
					}).show();
					return
				}
				navigator.serviceWorker.ready.then(function(reg) {
					reg.pushManager
						.getSubscription()
						.then(function(pushSubscription) {
							console.log("pushSubscription: ", pushSubscription)
							if (!pushSubscription) {
								console.log("No subscription!")
								// alert("No subscription!")
								that.is_subscribed = false
								if (displayMessage) {
									new Noty({
										type: "warning",
										text: "You have no subscription at the moment &#x2639;",
										timeout: 5000,
										theme: "metroui"
									}).show();
								}
								return false
							}
							console.log("Active subscription: ", pushSubscription)
							// alert("Active subscription!")
							that.is_subscribed = true
							if (displayMessage) {
								new Noty({
									type: "success",
									text: "You do have an active subscription &#9786;",
									timeout: 5000,
									theme: "metroui"
								}).show();
							}
							return true
						})
				})
			},
			subscribe(team) {
				console.log("team: ", team)
				this.configurePushSub()
			},
			unsubscribe() {
				const that = this
				navigator.serviceWorker.ready.then(function(reg) {
					console.log("reg: ", reg)
					reg.pushManager.getSubscription().then(function(subscription) {
						console.log(
							"subscription endpoint: ",
							subscription.endpoint
						)
						subscription
							.unsubscribe()
							.then(function(successful) {
								// You've successfully unsubscribed
								console.log("You've successfully unsubscribed")
								console.log("successful", successful)
								that.is_subscribed = false

								return axios
									.post("/api/delete-subscription", {
										endpoint: subscription.endpoint
									})
									.then(function(response) {
										console.log("response2: ", response)
										return response
									})
									.catch(function(error) {
										console.log(error)
									})
							})
							.catch(function(e) {
								// Unsubscription failed
								console.log("Unsubscription failed")
							})
					})
				})
			},
			async configurePushSub() {
				if (!"serviceWorker in navigator") {
					return
				}
				// Get user teams
				// let loadedUserTeams = this.$store.getters['users/loadedUserTeams']
				let loadedUserTeams = []
				let userTeams = []

				if (!loadedUserTeams.length > 0) {
					console.log('abc')
					loadedUserTeams = await this.$store.dispatch('users/loadedUserTeams')
					loadedUserTeams.forEach((team) => {
						userTeams.push(team.slug)
					})
				}
				
				console.log('userTeams: ', userTeams)
				const that = this
				var reg

				navigator.serviceWorker.ready
					.then(function(swreg) {
						reg = swreg
						return swreg.pushManager.getSubscription()
					})
					.then(function(sub) {
						console.log("sub: ", sub)
						if (sub === null) {
							// Create a new subscription
							var vapidPublicKey =
								"BBPCbckxl1U6mg1xxPhZCu2nAx0g2Gbh7iio-fi1_jU_CFGYH5XQ97XDuEBIXibz1ySDhsnTTGfeNuCYQgHR59k"
							var convertedVapidPublicKey = that.urlBase64ToUint8Array(
								vapidPublicKey
							)

							console.log(
								"convertedVapidPublicKey: ",
								convertedVapidPublicKey
							)
							return reg.pushManager.subscribe({
								userVisibleOnly: true,
								applicationServerKey: convertedVapidPublicKey
							})
						} else {
							// We have a subscription
							// throw 'Already subscribed'
							that.unsubscribe()
						}
					})
					.then(function(newSub) {
						console.log('userTeams: ', userTeams)

						return axios
							.post("/create-subscription", {
								newSub: newSub,

								// teams: [
								// 	"inter_milan",
								// 	"juventus"
								// ]
								teams: userTeams,
								userId: firebase.auth().currentUser.uid
							})
							.then(function(response) {
								console.log('response: ', response)
								new Noty({
									type: "success",
									text: "You've successfully subscribed to results of &#9786;",
									timeout: 5000,
									theme: "metroui"
								}).show();
								return response
							})
							.catch(function(error) {
								console.log(error)
							})
					})
					.then(function(res) {
						that.is_subscribed = true
						console.log("res: ", res)
					})
					.catch(function(error) {
						console.log('Error: ', error)
					})
			},
			goBack() {
				this.$router.replace("/")
			},
			logout() {
				console.log("Clicked logout button")
				this.$store.dispatch("firebase-auth/signOut").then(() => {
					this.$router.replace("/")
				})
			}
		}
	}
</script>

<style scoped>
	.card {
		background: linear-gradient(110deg, #fdcd3b 60%, #ffed4b 60%);
		border-radius: 5px;
	}
	.card-title {
		/*background-color: lightslategray;*/
	}
	.card-text {
		background-color: whitesmoke;
		width: auto;
		border-radius: 8px;
	}
	.card-footer {
	}
	.icon:hover {
		cursor: pointer;
		color: #fff;
	}
</style>