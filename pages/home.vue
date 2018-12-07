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
					<v-layout row wrap v-if="loadedUser">
						<v-flex xs12 class="text-xs-center">
							<h3>Bienvenue {{ loadedUser.email }}!</h3><br />
							<p>
								<!-- <b>loadedTeams:</b> {{ loadedTeams }}<br /><br /> -->
								<!-- <span v-for="team in loadedTeams" :key="team.id">
									{{ team.name }}
								</span><br /><br /> -->
								<!-- <b>loadedUserSubscriptions:</b>  -->
								<!-- {{ loadedUserSubscriptions }} -->
								<!-- <span v-for="subscription in loadedUserSubscriptions" :key="subscription.slug">
									{{ subscription.team }}
								</span><br /> -->
								is_subscribed: {{ is_subscribed }}
							</p>
							<h4>Une demonstration des techniques de Progressive Web App (PWA) appliquées à TIF:</h4><br />
							<p>
								- Installer l'application sur son écran d'accueil.<br />
								- Recevoir les notifications.
							</p>
							<p class="text-xs-left">Le bouton vert "Add to Homescreen" est automatiquement généré par le navigateur lorsque celui-ci détermine qu'il peut être utile au visiteur d'obtenir un raccourci vers le site web. Les développeurs n'ont pas le contrôle pour faire apparaître ce bouton, ils peuvent tout au plus déterminer son emplacement et son design. Plus d'infos <a href="https://developers.google.com/web/fundamentals/app-install-banners/" target="_blank">ici</a>.<br />
							Les notifications sont envoyées sur les différents appareils enregistrés de l'utilisateur (ordinateur, tablette, téléphone) peu de temps après le coup de sifflet final de l'événement impliquant une équipe de l'utilisateur. Plus d'infos <a href="https://developers.google.com/web/fundamentals/push-notifications/" target="_blank">ici</a>.</p>
							<br /><br />
						</v-flex>
					</v-layout>

					<v-layout row wrap>
						<v-flex sm4 xs12 class="text-xs-center leftBox" style="">
							<h3>Add to homescreen:</h3>
							<br />
							<v-btn nuxt color="success" class="elevation-0" @click="addToHomescreen" v-if="showButton">Add to homescreen</v-btn>
						</v-flex>
						<v-flex sm8 xs12 class="text-xs-center rightBox">
							<h3>Notifications:</h3>
							<nuxt-link to="/subscriptions/send-notifications" target="_blank">Send notifications</nuxt-link><br />

							<v-alert :value="true" type="error" dismissible v-if="are_notifications_allowed === 'no'">
								You did not allow notifications on this site. To receive our notifications, please change your browser settings (notifications button usually stands directly on the left of the address bar)
							</v-alert>

							<v-btn color="success" class="elevation-0" @click="enableNotifications" v-if="are_notifications_allowed === 'default'">Enable notifications on this site</v-btn>

							<v-btn color="warning" class="elevation-0" @click="unsubscribe" v-if="is_subscribed" :disabled="loading">Unsubscribe from push notifications</v-btn>
							<v-btn color="success" class="elevation-0" @click="subscribe" v-if="are_notifications_allowed !== 'no' && are_notifications_allowed !== 'default' && !is_subscribed" :disabled="loading">Subscribe to push notifications</v-btn>
							<br />
							<v-btn color="default" class="elevation-0" :disabled="checkSubscriptionButtonLoading" @click="checkSubscription">Check my subscription status</v-btn><br />
							<v-btn color="default" class="elevation-0" v-if="is_subscribed" @click="reloadSubscription">Reload Subscription</v-btn>
						</v-flex>		
					</v-layout>
					<br /><hr><br />
					<v-layout row wrap>
						<v-flex xs12 class="text-xs-center">
							<v-btn nuxt to="/teams" color="success" class="elevation-0">MY TEAMS</v-btn>
							<v-btn nuxt to="/scoremode" color="primary" class="elevation-0">SWITCH TO SCOREMODE</v-btn>
							<v-btn color="warning" @click="logout" class="elevation-0">Logout</v-btn>
						</v-flex>
					</v-layout>

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
			this.$store.commit('setLoading', false)			
		},
		data() {
			return {
				are_notifications_allowed: "",
				is_subscribed: "",
				showButton: false,
				checkSubscriptionButtonLoading: false
			}
		},
		computed: {
			loading () {
				return this.$store.getters['loading']
			},
			loadedUser() {
				return this.$store.getters["users/loadedUser"]
			},
			loadedUserSubscriptions() {
				return this.$store.getters['subscriptions/loadedUserSubscriptions']
			},
			loadedTeams() {
				return this.$store.getters['teams/loadedTeams']
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
				try {
					console.log("Call to checkSubscription method")
					if (!navigator.serviceWorker) {
						new Noty({
							type: "warning",
							text: "Service worker not available on this navigator &#x2639;",
							timeout: 5000,
							theme: "metroui"
						}).show();
						return
					}
					this.checkSubscriptionButtonLoading = true
					const reg = await navigator.serviceWorker.ready
					console.log('reg: ', reg)

					const pushSubscription = await reg.pushManager.getSubscription()
					console.log("pushSubscription: ", pushSubscription)
					if (!pushSubscription) {
						console.log("No subscription!")
						this.is_subscribed = false
						this.$store.dispatch('subscriptions/loadedUserSubscriptions', null)
						if (displayMessage) {
							new Noty({
								type: "warning",
								text: "You have no subscription at the moment &#x2639;",
								timeout: 5000,
								theme: "metroui"
							}).show();
						}
						this.checkSubscriptionButtonLoading = false
						return false
					}

					console.log("Active subscription: ", pushSubscription)
					this.is_subscribed = true
					const subscriptions = await this.$store.dispatch('subscriptions/loadedUserSubscriptions', pushSubscription.endpoint)
					console.log('subscriptions: ', subscriptions)

					let array = []
					if (displayMessage) {
						if (subscriptions.length > 0) {
							subscriptions.forEach(function (subscription) {
		    					new Noty({
									type: "success",
									text: `You are receiving notifications for ${subscription.team ? subscription.team.name : ''} &#9786;`,
									timeout: 5000,
									theme: "metroui"
								}).show();
							});
						} else {
							new Noty({
								type: "warning",
								text: 'There is a mismatch between your subscription status on the client on the one we have in our database. Please click reload subscriptions button',
								timeout: 5000,
								theme: "metroui"
							}).show();
						}
					}
					this.is_subscribed = true
					this.checkSubscriptionButtonLoading = false
					return true
				}
				catch (error) {
					console.log('error: ', error)
					this.checkSubscriptionButtonLoading = false
					if (displayMessage) {
						new Noty({
							type: "warning",
							text: "Sorry, an error occured and your subscription status could not be verified &#x2639;",
							timeout: 5000,
							theme: "metroui"
						}).show();
					}
				}

			},
			async checkSubscription2 (displayMessage = true) {
				console.log("Call to checkSubscription method")
				// new Noty({
				// 	type: "success",
				// 	text: "Call to checkSubscription",
				// 	timeout: 5000,
				// 	theme: "metroui"
				// }).show();
				const that = this

				if (!navigator.serviceWorker) {
					new Noty({
						type: "warning",
						text: "Service worker not available on this navigator &#x2639;",
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
								that.$store.dispatch('subscriptions/loadedUserSubscriptions', null)
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
							that.is_subscribed = true
							that.$store.dispatch('subscriptions/loadedUserSubscriptions', pushSubscription.endpoint)

							return

							return axios.post("/subscriptions/fetch-subscriptions", {
								endpoint: pushSubscription.endpoint
							})
							.then(function(response) {
								// let teams = []
								// for (let subscription in response.data) {
								// 	teams.push(subscription)
								// }
								// console.log('teams: ', teams)
								// return
								// let def = JSON.parse(JSON.stringify(response.data))
								// console.log('def: ', def)
								// // let ghi = JSON.parse(def)
								// // console.log('ghi: ', ghi)
								console.log("response3: ", response)
								// console.log("response.data: ", response.data)
								// console.log("response3: ", response.data['-LSpASGrfSjc0OmOzPZ0'])
								// console.log("response3: ", response.data['-LSpASGrfSjc0OmOzPZ0'].team)
								// let abc = response.data

								// for (let i in response.data) {
								// 	console.log('i: ', i)
								// }
								that.$store.commit('setLoading', false)
								// if (displayMessage) {
								// 	for (let subscription in JSON.parse(response.data)) {
								// 		console.log('subscription: ', subscription)
								// 		new Noty({
								// 			type: "success",
								// 			text: `You receive notifications for ${subscription} &#9786;`,
								// 			timeout: 5000,
								// 			theme: "metroui"
								// 		}).show();
								// 	}
								// }
							})
							.catch(function(error) {
								that.$store.commit('setLoading', false)
								console.log("error3: ", error)
								return
							})


							
							// return true
						})
				})
			},
			async subscribe(team) {
				console.log("team: ", team)
				this.$store.commit('setLoading', true)
				await this.configurePushSub()
				this.is_subscribed = true
				this.$store.commit('setLoading', false)
			},
			async unsubscribe () {
				try {
					this.$store.commit('setLoading', true)

					const reg = await navigator.serviceWorker.ready
					console.log("reg: ", reg)

					const subscription = await reg.pushManager.getSubscription()
					// const endpoint = subscription.endpoint
					console.log("subscription endpoint: ", subscription.endpoint)

					const unsubscribe = await subscription.unsubscribe()
					this.is_subscribed = false

					const snapshot = await this.$store.dispatch('subscriptions/deleteSubscription', subscription.endpoint)
					console.log('snapshot: ', snapshot)
					this.$store.commit('setLoading', false)
					snapshot.forEach(team => {
						// console.log('abc')
						new Noty({
							type: 'success',
							text: `Successfully deleted subscription to team ${team.name}!`,
							timeout: 5000,
							theme: 'metroui' 
						}).show()
					})
					return
				}
				catch (error) {
					this.$store.commit('setLoading', false)
					console.log('error: ', error)
					new Noty({
						type: 'warning',
						text: 'Sorry, an error occured and the unsubscription procedure failed',
						timeout: 5000,
						theme: 'metroui' 
					})
				}
			},
			unsubscribe2() {
				const that = this
				navigator.serviceWorker.ready.then(function(reg) {
					that.$store.commit('setLoading', true)
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
									.post("/subscriptions/delete-subscription", {
										endpoint: subscription.endpoint
									})
									.then(function(response) {
										console.log("response2: ", response)
										that.$store.commit('setLoading', false)
										that.$store.commit('subscriptions/setUserSubscriptions', null)
										return response
									})
									.catch(function(error) {
										that.$store.commit('setLoading', false)
										console.log(error)
									})
							})
							.catch(function(e) {
								// Unsubscription failed
								that.$store.commit('setLoading', false)
								console.log("Unsubscription failed")
							})
					})
				})
			},
			async configurePushSub () {
				try {
					if (!"serviceWorker in navigator") {
						return
					}
					// Get user teams
					let userTeams = []
					let loadedUserTeams = this.$store.getters['users/loadedUserTeams']
					// let loadedUserTeams = []

					if (!loadedUserTeams.length > 0) {
						loadedUserTeams = await this.$store.dispatch('users/loadedUserTeams')
					}
					loadedUserTeams.forEach((team) => {
						userTeams.push({name: team.name, slug: team.slug})
					})
					console.log('userTeams: ', userTeams)

					const swreg = await navigator.serviceWorker.ready
					console.log('swreg: ', swreg)
					const reg = swreg

					const sub = await swreg.pushManager.getSubscription()
					console.log('sub: ', sub)

					let newSub
					if (sub === null) {
						// Create a new subscription
						const vapidPublicKey =
							"BBPCbckxl1U6mg1xxPhZCu2nAx0g2Gbh7iio-fi1_jU_CFGYH5XQ97XDuEBIXibz1ySDhsnTTGfeNuCYQgHR59k"
						const convertedVapidPublicKey = this.urlBase64ToUint8Array(vapidPublicKey)

						console.log("convertedVapidPublicKey: ", convertedVapidPublicKey)

						const newSub = await reg.pushManager.subscribe({
							userVisibleOnly: true,
							applicationServerKey: convertedVapidPublicKey
						})
						console.log('newSub1: ', newSub)

						const response = await axios.post("/subscriptions/create-subscription", {
							newSub: newSub,
							teams: userTeams,
							userId: firebase.auth().currentUser.uid
						})
						console.log('response1: ', response)
						response.data.forEach(team => {
							new Noty({
								type: "success",
								text: `You have successfully subscribed to the results of ${team.name} &#9786;`,
								timeout: 5000,
								theme: "metroui"
							}).show();
						})
						return response

						// const response2 = await this.$store.dispatch('subscriptions/createSubscription', {
						// 	newSub: newSub,
						// 	teams: userTeams,
						// 	userId: firebase.auth().currentUser.uid
						// })
						// console.log('response2: ', response2)

					} else {
						// We have a subscription
						// throw 'Already subscribed'
						this.unsubscribe()
					}

					console.log('newSub:', newSub)
					
					return
				}
				catch (error) {
					console.log('error: ', error)
					new Noty({
						type: "error",
						text: "Sorry, an error occured and subscription failed &#9786;",
						timeout: 5000,
						theme: "metroui"
					}).show();
				}
			},
			async configurePushSub2 () {
				if (!"serviceWorker in navigator") {
					return
				}
				// Get user teams
				let userTeams = []
				let loadedUserTeams = this.$store.getters['users/loadedUserTeams']
				// let loadedUserTeams = []

				if (!loadedUserTeams.length > 0) {
					loadedUserTeams = await this.$store.dispatch('users/loadedUserTeams')
				}
				loadedUserTeams.forEach((team) => {
					userTeams.push({name: team.name, slug: team.slug})
				})
				
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
						console.log('newSub3: ', newSub)
						console.log('newSub.keys: ', newSub.keys)

						return axios
							.post("/subscriptions/create-subscription", {
								newSub: newSub,

								// teams: [
								// 	"inter_milan",
								// 	"juventus"
								// ]
								teams: userTeams,
								userId: firebase.auth().currentUser.uid
							})
							.then(function(response) {
								console.log('response1: ', response)
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
					.then(function(response) {
						that.is_subscribed = true
						console.log("response2: ", response)
					})
					.catch(function(error) {
						console.log('Error: ', error)
					})
			},
			async reloadSubscription () {
				await this.unsubscribe()
				await this.subscribe()
				console.log('DONE!')
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
	.leftBox {
		background-color: #FFCCBC; 
		padding: 10px; 
		border-radius: 8px 0 0 8px;
	}

	.rightBox {
		background-color: #FFAB91; 
		padding: 10px; 
		border-radius: 0 8px 8px 0;
	}
	@media only screen and (max-width: 599px) {
		.leftBox {
			background-color: #FFCCBC; 
			padding: 10px; 
			border-radius: 8px;
		}

		.rightBox {
			background-color: #FFAB91; 
			padding: 10px; 
			border-radius: 8px;
		}
	}

</style>