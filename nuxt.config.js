require('dotenv').config()

module.exports = {
    /*
     ** Headers of the page
     */
    head: {
        title: "nuxt-pwa",
        meta: [
            { charset: "utf-8" },
            {
                name: "viewport",
                content: "width=device-width, initial-scale=1"
            },
            {
                hid: "description",
                name: "description",
                content: "Nuxt.js project"
            }
        ],
        link: [
            { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
            {
                rel: "stylesheet",
                href:
                    "https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons"
            },
            { rel: "manifest", href: "/manifest.json" }
        ]
    },

    /*
     ** Customize the progress bar color
     */
    loading: { color: "#FF4500" },
    /*
     ** Build configuration
     */
    modules: [
        '@nuxtjs/dotenv',
        [
            "nuxt-fontawesome",
            {
                component: "fa",
                imports: [
                    // import whole set
                    {
                        set: "@fortawesome/free-solid-svg-icons",
                        icons: ["fas"]
                    }
                ]
            }
        ]
    ],
    plugins: [
        { src: "~/plugins/vuetify.js", ssr: true },
        { src: "~/plugins/firebase-client-init.js", ssr: false },
        { src: "~/plugins/auth-cookie.js", ssr: false },
        { src: "~/plugins/vuex-persist", ssr: false },
        { src: "~/plugins/vue-moment", ssr: false },
        { src: "~/plugins/async-computed.js", ssr: false },
        { src: '~/plugins/vue-notifications.js', ssr: false },
        { src: '~/plugins/vue-swal.js', ssr: false }
    ],
    serverMiddleware: [
        "~/serverMiddleware/validateFirebaseIdToken",
        { path: "/admin", handler: "~/serverMiddleware/authAdmin" },
        {
            path: "/register-new-user",
            handler: "~/serverMiddleware/registerNewUser"
        },
        {
            path: "/create-subscription",
            handler: "~/serverMiddleware/createSubscription"
        },
        {
            path: "/update-user-tokens",
            handler: "~/serverMiddleware/updateUserTokens"
        },
        {
            path: "/move-old-events",
            handler: "~/serverMiddleware/moveOldEvents"
        },
        {
            path: "/api/send-notifications",
            handler: "~/serverMiddleware/sendNotifications"
        },
        {
            path: "/api/delete-subscription",
            handler: "~/serverMiddleware/deleteSubscription"
        },
        {
            path: "/api/fetch-past-premier-league-matches",
            handler: "~/serverMiddleware/api/fetchPastPremierLeagueMatches"
        },
        {
            path: "/api/fetch-next-premier-league-matches",
            handler: "~/serverMiddleware/api/fetchNextPremierLeagueMatches"
        },
        {
            path: "/api/fetch-live-score",
            handler: "~/serverMiddleware/api/fetchLiveScore"
        },
        {
            path: "/api/fetch-live-actions",
            handler: "~/serverMiddleware/api/fetchLiveActions"
        }
    ],
    css: ["~/assets/style/app.styl"],
    build: {
        /*
         ** Run ESLint on save
         */
        extend(config, { isDev, isClient }) {
            if (isDev && isClient) {
                config.module.rules.push({
                    enforce: "pre",
                    test: /\.(js|vue)$/,
                    loader: "eslint-loader",
                    exclude: /(node_modules)/
                })
            }
        }
    }
}
