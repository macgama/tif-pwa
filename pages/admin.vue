<template>
	<v-content>
		<v-layout>
			<v-flex xs12 sm10 offset-sm1>
				<v-card class="mt-4">
					<v-card-title primary-title class="text-md-center">
						<v-card-text class="text-md-center">
							<h3 class="headline mb-0">Administration TIF</h3>
						</v-card-text>
					</v-card-title>
					<v-card-text class="text-md-center">
						<v-btn nuxt to="/home" color="primary" class="elevation-0">Go back to Homepage</v-btn>
						<v-btn @click="logout">Logout</v-btn>
					</v-card-text>
				</v-card>
			</v-flex>
		</v-layout>
	</v-content>
</template>

<script>
import moment from "~/plugins/vue-moment"
import "moment/locale/fr"
export default {
    layout: "layoutBack",
	middleware: ['admin-check'],
    created() {},
    data() {
        return {}
    },
    computed: {},
    methods: {
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
[v-cloak] > * {
    display: none;
}
</style>