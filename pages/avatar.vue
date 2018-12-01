<template>
	<v-content>
		<v-layout align-center justify-center row fill-height>
			<v-flex xs12 sm10 md8 lg6>
				<v-card class="card">
					<v-card-title primary-title>
						<v-flex xs6>
							<h2 class="white--text text-xs-left">AVATAR</h2>
						</v-flex>
						<v-flex xs6 class="text-xs-right">
							<fa :icon="['fas', 'arrow-circle-left']" size="2x" class="icon" @click="goBack" />
						</v-flex>
					</v-card-title>

					<v-card-text class="card-text mx-3">
						<div v-if="loadedUser" class="text-xs-center">
							<h3>Welcome {{ loadedUser.email }}!</h3><br />
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
	</v-content>
</template>

<script>
	export default {
		head: {
			title: 'Avatar',
		},
		layout: "layoutFront",
		// middleware: ['auth-check'],
		data() {
			return {}
		},
		computed: {
			loadedUser() {
				return this.$store.getters["users/loadedUser"]
			}
		},
		methods: {
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