<template>
	<v-app style="background-color: #000;">
		<v-content>
			<v-container
			  grid-list
			  text-xs-center
			  style="background-color: orangered; padding: 0; height: 100%; max-width: 800px;"
			>
				<v-layout
				  align-center
				  column
				  justify-center
				  fill-height
				  style="height: 50%; margin: auto"
				  class="text-xs-center"
				>
					<v-btn nuxt to="/scoremode" round color="black" dark large>Score Mode</v-btn>
					<p>Petit texte explicatif</p>
				</v-layout>
				<v-layout
				  align-center
				  column
				  justify-center
				  fill-height
				  style="height: 50%; margin: auto; background-color: #fff; color: orange"
				  class="text-xs-center"
				>
					<p style="margin-bottom: 0">Petit texte explicatif</p>
					<v-btn round large color="deep-orange" dark @click="signInWithGoogle">Game Mode</v-btn>
				</v-layout>
			</v-container>
		</v-content>
	</v-app>
</template>

<script>
	export default {
		// layout: 'layoutLandingPage',
		middleware: ['unauth-check'],
		methods: {
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
	
</style>

