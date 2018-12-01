<template>
	<v-app>
		<v-content>
			<nuxt/>
		</v-content>
	</v-app>
</template>

<script>
	export default {
		head: {
			title: 'Welcome - This Is Fan',
			meta: [
				{ charset: 'utf-8' },
				{ name: 'viewport', content: 'width=device-width, initial-scale=1' },

				// hid is used as unique identifier. Do not use `vmid` for it as it will not work
				{ hid: 'description', name: 'description', content: 'An application for real fans - Get live results - Play the game - Support your team - Interact with other supporters - Become the ultimate fan' },
				{ name: "robots", content: "noindex" }
			]
		},
		middleware: ['unauth-check']
	}
</script>

<style scoped>
	
</style>

