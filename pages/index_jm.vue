<template>
	<div>
		<v-layout row wrap style="height: 100vh; min-height: 300px; background: no-repeat center center scroll; -webkit-background-size: cover; -moz-background-size: cover; -o-background-size: cover; background-size: cover; border: 2px solid orangered;">
			<v-flex xs8 offset-xs2 text-xs-center>
				<app-logo />
				<h1 class="title">
					nuxt-pwa
				</h1>
				<h2 class="subtitle">
					Nuxt.js project
				</h2><br />
				<v-btn round color="#d6492f" dark @click.prevent="signInWithGoogle">Login Google</v-btn>&nbsp;
				<v-btn round color="3c5a99" dark @click.prevent="signInWithFacebook">Login Facebook</v-btn>
			</v-flex>
		</v-layout>
		<v-layout row wrap>
			<v-flex xs8 offset-xs2 text-xs-center>
				<p>
					notifications: {{ notifications }}<br />
					subscribed: {{ subscribed }}<br />
				</p>

				<v-btn @click="enableNotifications" v-if="notifications === 'default'">Enable notifications on this site</v-btn>

				<span v-if="notifications === 'no'">You have disabled notifications on this site. To enable notifications, change your navigator configuration.</span>

				<v-btn color="success" @click="unsubscribe" v-if="subscribed">Unsubscribe from push notifications</v-btn><br /><br />
				<v-btn color="success" @click="subscribe" v-if="notifications !== 'no' && notifications !== 'default' && !subscribed">Subscribe to push notifications</v-btn><br />
				<v-btn color="info" @click="checkSubscription">Check subscription</v-btn><br />
				<v-btn nuxt to="/register">Register</v-btn>
				<v-btn nuxt to="/home">Go to homepage</v-btn>
				<v-btn nuxt to="/admin">Go to admin</v-btn>
			</v-flex>
		</v-layout>
	</div>
</template>

<script>
	import AppLogo from "~/components/AppLogo.vue"
	// import {abc} from '../static/sw.js'
	// import {urlBase64ToUint8Array} from '../static/app.js'
	// var mylib = require('../static/app.js');
	// import test from '../static/app.js'
	// import {
	// square
	// } from '../static/app.js'
	import axios from "axios"
	export default {
		components: {
			AppLogo
		},
		layout: 'layoutLandingPage',
		mounted() {
			if (Notification.permission === "granted") {
				console.log("Notifications granted")
				this.notifications = "yes"
			} else if (Notification.permission === "default") {
				this.notifications = "default"
			} else {
				this.notifications = "no"
			}
			// console.log(square(2))

			// Check subscription
			this.checkSubscription()
			// return new Promise((resolve, reject) => {
			// 	// resolve(this.subscribed = false)
			// 	const that = this
			// 	navigator.serviceWorker.ready.then(function(reg) {
			// 		reg.pushManager.getSubscription().then(function(pushSubscription) {
			// 			console.log('pushSubscription: ', pushSubscription)
			// 			if (!pushSubscription) {
			// 				console.log('No subscription 2!')
			// 				// resolve(that.subscribed = false)
			// 				return resolve(that.subscribed = false)

			// 				// this.subscribed = false
			// 			}
			// 			console.log('Active subscription: ', pushSubscription)
			// 			return resolve(that.subscribed = true)
			// 			// this.subscribed = true
			// 		});
			// 	})
			// })
		},
		data() {
			return {
				notifications: "",
				subscribed: ""
			}
		},
		asyncComputed: {
			myResolvedValue() {
				return new Promise((resolve, reject) => {
					setTimeout(() => resolve("*Fancy* Resolved Value!"), 2000)
				})
			},
			checkSubscription2() {
				const that = this
				return new Promise((resolve, reject) => {
					navigator.serviceWorker.ready.then(function(reg) {
						reg.pushManager
							.getSubscription()
							.then(function(pushSubscription) {
								console.log("pushSubscription: ", pushSubscription)
								if (!pushSubscription) {
									console.log("No subscription 2!")
									return resolve((that.subscribed = false))
								}
								console.log(
									"Active subscription 2: ",
									pushSubscription
								)
								return resolve((that.subscribed = true))
							})
					})
				})
			}
		},
		computed: {
			// checkSubscription4() {
			// 	return navigator.serviceWorker.ready.then(function(reg) {
			// 		reg.pushManager.getSubscription().then(function(pushSubscription) {
			// 			console.log('pushSubscription: ', pushSubscription)
			// 			if (!pushSubscription) {
			// 				console.log('No subscription!')
			// 				this.subscribed = false
			// 				return false
			// 			}
			// 			console.log('Active subscription: ', pushSubscription)
			// 			this.subscribed = true
			// 			return true
			// 		});
			// 	})
			// }
		},
		methods: {
			urlBase64ToUint8Array(base64String) {
				var padding = "=".repeat((4 - (base64String.length % 4)) % 4)
				var base64 = (base64String + padding)
					.replace(/\-/g, "+")
					.replace(/_/g, "/")

				var rawData = window.atob(base64)
				var outputArray = new Uint8Array(rawData.length)

				for (var i = 0; i < rawData.length; ++i) {
					outputArray[i] = rawData.charCodeAt(i)
				}
				return outputArray
			},
			enableNotifications() {
				console.log("Click enable notifications button")
				var that = this
				Notification.requestPermission().then(function(result) {
					console.log("User choice: ", result)
					if (result !== "granted") {
						console.log("No notification permission granted!")
						that.notifications = "no"
					} else {
						that.notifications = "yes"
						that.configurePushSub()
					}
				})
			},
			sendNotification() {
				// new Notification('Successfully subscribed!')

				if ("serviceWorker" in navigator) {
					var team1 = "Xamax"
					var team2 = "Lausanne"
					var score = "2-2"
					var title = team1 + " vs " + team2 + " : " + score
					var options = {
						body: "Final result",
						image: "/images/teams/xamax.png"
					}
					navigator.serviceWorker.ready.then(function(swreg) {
						swreg.showNotification(title, options)
					})
				}
				// navigator.serviceWorker.getRegistration().then(function(reg) {
				// reg.showNotification('Hello world 3!');
				// });
			},
			callABC() {
				console.log("call abc")
				abc()
			},
			configurePushSub() {
				if (!"serviceWorker in navigator") {
					return
				}

				const that = this
				var reg
				var team = "lausanne"
				const currentEndpoint = ""

				navigator.serviceWorker.ready
					.then(function(swreg) {
						reg = swreg
						return swreg.pushManager.getSubscription()
					})
					.then(function(sub) {
						console.log("sub: ", sub)
						// currentEndPoint = sub
						// console.log('currentEndpoint: ', currentEndpoint)
						if (sub === null) {
							// Create a new subscription
							var vapidPublicKey =
								"BBPCbckxl1U6mg1xxPhZCu2nAx0g2Gbh7iio-fi1_jU_CFGYH5XQ97XDuEBIXibz1ySDhsnTTGfeNuCYQgHR59k"
							// To be removed
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
						}
					})
					.then(function(newSub) {
						return axios
							.post("/create-subscription", {
								newSub: newSub,
								teams: [
									"xamax",
									"lausanne",
									"inter_milan",
									"juventus"
								]
							})
							.then(function(response) {
								console.log(response)
								return response
							})
							.catch(function(error) {
								console.log(error)
							})
						// return fetch('https://thisisfan-71532.firebaseio.com/subscriptions/' + team + '/.json', {
						// 	method: 'POST',
						// 	headers: {
						// 		'Content-Type': 'application/json',
						// 		'Accept': 'application/json'
						// 	},
						// 	body: JSON.stringify(newSub)
						// })
					})
					.then(function(res) {
						that.subscribed = true
						console.log("res: ", res)
					})
					.catch(function(err) {
						console.log(err)
					})
			},
			unsubscribe() {
				// return fetch('/api/delete-subscription', {
				// 	method: 'POST',
				// 	headers: {
				// 		'Content-Type': 'application/json',
				// 		'Accept': 'application/json'
				// 	},
				// 	body: JSON.stringify({a: 1, b: 'Textual content'})
				// }).then(function(response) {
				// 	console.log(response)
				// 	// if (!response.ok) {
				// 	// throw new Error('Bad status code from server.');
				// 	// }

				// 	return response;
				// }).catch(error => {
				// 	console.log(error)
				// })
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
								that.subscribed = false

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
			checkSubscription() {
				// return checkSubscription2
				console.log("Call to checkSubscription method")
				navigator.serviceWorker.ready.then(function(reg) {
					reg.pushManager
						.getSubscription()
						.then(function(pushSubscription) {
							console.log("pushSubscription: ", pushSubscription)
							if (!pushSubscription) {
								console.log("No subscription!")
								alert("No subscription!")
								return false
							}
							console.log("Active subscription: ", pushSubscription)
							alert("Active subscription!")
							return true
						})
				})
			},
			subscribe(team) {
				console.log("team: ", team)
				this.configurePushSub()
			},
			async signInWithGoogle() {
				console.log("signInWithGoogle")
				await this.$store.dispatch("firebase-auth/signInWithGooglePopup")
				console.log("done")
				this.$router.replace("/home")
			}
		}
	}
</script>

<style scoped>
	.container {
		min-height: 100vh;
		display: flex;
		justify-content: center;
		align-items: center;
		text-align: center;
	}

	.title {
		font-family: "Quicksand", "Source Sans Pro", -apple-system,
			BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial,
			sans-serif;
		/* 1 */
		display: block;
		font-weight: 300;
		font-size: 100px;
		color: #35495e;
		letter-spacing: 1px;
	}

	.subtitle {
		font-weight: 300;
		font-size: 42px;
		color: #526488;
		word-spacing: 5px;
		padding-bottom: 15px;
	}

	.links {
		padding-top: 15px;
	}
</style>

