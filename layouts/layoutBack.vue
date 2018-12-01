<template>
	<div>
		<v-app v-if="loadingPage">
			<main>
				<v-container fill-height>
					<v-layout align-center justify-center>
						<v-container fill-height>
							<v-layout align-center justify-center>
								<v-progress-circular indeterminate color="primary" :size="150"></v-progress-circular>
							</v-layout>
						</v-container>
					</v-layout>
				</v-container>
			</main>
		</v-app>
		<v-app v-else>
			<nuxt/>
		</v-app>
	</div>
</template>

<script>
	export default {
		head: {
			meta: [
				{ name: "robots", content: "noindex" }
			]
		},
		middleware: ['admin-check'],
		created () {
			setTimeout(() => {
			  	this.loadingPage = false
			}, 1000)
		},
		mounted() {
			console.log(Notification.permission)
			if (Notification.permission === 'granted') {
	
			}
			if ("serviceWorker" in navigator) {
				window.addEventListener('load', function(registration) {
					navigator.serviceWorker
						.register("/sw.js")
						.then(function() {
							console.log("Service worker registered with scope: ", registration.scope);
						})
						.catch(function(err) {
							console.log(err);
						});
				})
			}
		},
		data () {
			return {
				loadingPage: true,
			}
		}
	}
</script>

<style scoped>
	
</style>

