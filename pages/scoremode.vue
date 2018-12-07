<template>
    <v-content id="app">
        <v-container fluid style="padding: 0; max-width: 800px; color: white; border-bottom: 4px solid rgb(248,147,37)" class="backBlack">
            <v-layout row wrap>
                <v-flex d-flex xs2 justify-start align-center class="text-xs-left backBlack">
                    <v-card flat tile class="black boxTif backBlack" style="max-height: 120px; max-width: 120px">
                        <img src="/images/header-TIF_01.jpg" width="120px" height="120px" class="imageLogoTif" />
                    </v-card>
                </v-flex>
                <v-flex d-flex xs8>
                    <v-layout row wrap>
                        <v-flex d-flex>
                            <v-layout row wrap>
                                <v-flex d-flex xs12 class="elevation-0">
                                    <v-layout row wrap>
                                        <v-flex d-flex xs3 justify-center align-center class="text-xs-center elevation-0 headerMenu" style="border-right: 1px solid rgb(248,147,37); border-left: 2px solid rgb(248,147,37)">
                                            <div class="headerLogo">
                                                <img src="/images/menuShop.png" width="58px" height="58px" class="imageLogo" /><br />
                                                <span class="energyBox">5 / 100</span>
                                            </div>
                                        </v-flex>
                                        <v-flex d-flex xs3 justify-center align-center class="text-xs-center elevation-0 headerMenu" style="border-right: 1px solid rgb(248,147,37); border-left: 1px solid rgb(248,147,37)">
                                            <div class="headerLogo">
                                                <img src="/images/menuShop.png" width="58px" height="58px" class="imageLogo"/><br />
                                                <span class="energyBox">10 / 10</span>
                                            </div>
                                        </v-flex>
                                        <v-flex d-flex xs3 justify-center align-center class="text-xs-center elevation-0 headerMenu" style="border-right: 1px solid rgb(248,147,37); border-left: 1px solid rgb(248,147,37)">
                                            <div class="headerLogo">
                                                <img src="/images/menuShop.png" width="58px" height="58px" class="imageLogo"/><br />
                                                <span class="energyBox">1234 $</span>
                                            </div>
                                        </v-flex>
                                        <v-flex d-flex xs3 justify-center align-center class="text-xs-center elevation-0 headerMenu" style="border-left: 1px solid rgb(248,147,37); border-right: 2px solid rgb(248,147,37)">
                                            <div class="headerLogo">
                                                <img src="/images/menuShop.png" width="58px" height="58px" class="imageLogo"/><br />
                                                <span class="energyBox">16 tokens</span>
                                            </div>
                                        </v-flex>
                                    </v-layout>
                                </v-flex>
                                <v-flex d-flex xs12>
                                    <v-layout row wrap :class="classObject">
                                        <v-flex d-flex xs6 justify-center align-center class="text-xs-left">
                                            <div class="" style="font-size: 130%" v-if="!loadedUser">
                                                Utilisateur Invité
                                            </div>
                                            <div v-else>
                                                Bienvenue
                                            </div>
                                        </v-flex>
                                        <v-flex d-flex xs6 justify-center align-center class="text-xs-right">
                                            <div style="font-size: 130%;" v-if="loadedUser">
                                                {{ loadedUser.email }}
                                            </div>
                                            <div class="" style="font-size: 130%" v-else>
                                                Se connecter
                                            </div>
                                        </v-flex>
                                    </v-layout>
                                </v-flex>
                            </v-layout>
                        </v-flex>
                    </v-layout>
                </v-flex>
                <v-flex d-flex xs2 justify-end align-center class="text-xs-right">
                    <v-card flat tile class="black boxTif" style="max-height: 120px; max-width: 120px">
                        <img src="/images/header-TIF_05.jpg" width="120px" height="120px" class="imageLogoTif"/>
                    </v-card>
                </v-flex>
            </v-layout>
        </v-container>
        <v-container fluid style="padding: 0; max-width: 800px; background-color: green; color: white">
            <v-layout>
                <v-flex d-flex x12 justify-center align-center class="text-xs-center" style="height: 40px">
                    Soccer
                </v-flex>
            </v-layout>             
        </v-container>
        <v-container fluid style="padding: 0; max-width: 800px; background-color: grey; color: white">
            <v-layout>
                <v-flex d-flex x1 justify-end align-center style="padding-left: 20px;" @click="eventsByDate('substractOne')">
                    <fa :icon="['fas', 'angle-double-left']" size="1x" class="icon" />
                </v-flex>
                <v-flex d-flex x2 justify-start align-center class="text-xs-center navButton" style="height: 40px" @click="eventsByDate('yesterday')">
                    Hier
                </v-flex>
                <v-flex d-flex x6 justify-center align-center class="text-xs-center" style="height: 40px">
                    {{ date | moment('dddd, MMMM Do YYYY') }}
                </v-flex>
                <v-flex d-flex x2 justify-end align-center class="text-xs-center navButton" style="height: 40px" @click="eventsByDate('tomorrow')">
                    Demain
                </v-flex>
                <v-flex d-flex x1 justify-end align-center style="padding-right: 20px;" @click="eventsByDate('addOne')">
                    <fa :icon="['fas', 'angle-double-right']" size="1x" class="icon" style="text-shadow: 0 0 15px #3b5998;"/>
                </v-flex>
            </v-layout>             
        </v-container>


        <v-container fluid style="padding: 0; max-width: 800px; background-color: whitesmoke; margin-bottom: 80px">
            <v-card-text class="card-text" style="padding: 8px;">
                <v-expansion-panel class="elevation-0" :value="0">
                    <v-expansion-panel-content class="green">
                        <div slot="header" class="white--text">
                            ALL EVENTS
                        </div>
                        <v-icon slot="actions" color="white">$vuetify.icons.expand</v-icon>
                        <v-expansion-panel class="elevation-0" :value="0" v-for="competition in competitions" :key="competition.slug">
                            <v-expansion-panel-content class="black">
                                <div slot="header" class="white--text">
                                    <div v-for="country in competition.countries" :key="country.slug" style="display: flex; align-items:center;">
                                        <img :src="'/images/countries/' + country.slug + '.png'" width="25" />
                                        &nbsp;&nbsp;{{ competition.name }}
                                    </div>
                                </div>
                                <v-icon slot="actions" color="white">$vuetify.icons.expand</v-icon>
                                <v-card>
                                    <v-card-text style="padding: 0px">
                                        <v-data-table :items="eventsByCompetition(competition.slug)" class="elevation-0" hide-actions hide-headers>
                                            <template slot="items" slot-scope="props">
                                                <td class="text-xs-left hidden-xs-only" width="10%"><v-img :src="'/images/teams/' + props.item.home_team.slug + '.png'" :lazy-src="'/images/icon.png'" aspect-ratio="1" width="30"></v-img></td>
                                                <td class="text-xs-left" width="30%" style="font-size: 1.2em;">{{ props.item.home_team.name }}</td>
                                                <td class="text-xs-center" width="20%">
                                                    <span style="background-color: black; color: orange; padding: 2px 10px; border-radius: 5px; font-size: 130%" v-if="props.item.status === 'IN PLAY' || props.item.status === 'HALF TIME BREAK' || props.item.status === 'ADDED TIME' || props.item.status === 'FINISHED'">
                                                        <transition name="fade" mode="out-in" :duration="{ enter: 3000, leave: 2000 }">
                                                            <span :key="props.item.score">
                                                                {{ props.item.score }}
                                                            </span>
                                                        </transition>
                                                    </span>
                                                    <span v-else style="font-size: 1.2em;">{{ props.item.time }}</span>
                                                </td>
                                                <td class="text-xs-right" width="30%" style="font-size: 1.2em;">{{ props.item.visitor_team.name }}</td>
                                                <td class="text-xs-right hidden-xs-only" width="10%"><v-img :src="'/images/teams/' + props.item.visitor_team.slug + '.png'" :lazy-src="'/images/icon.png'" aspect-ratio="1" width="30"></v-img></td>
                                            </template>
                                        </v-data-table>
                                    </v-card-text>
                                </v-card>
                            </v-expansion-panel-content>
                        </v-expansion-panel>
                    </v-expansion-panel-content>
                </v-expansion-panel>
            </v-card-text>
        </v-container>


        <v-footer style="background-color: black; position: fixed; bottom: 0; width: 100%" height="auto" class="text-xs-center">
            <v-container fluid style="padding: 0; max-width: 800px">
                <div id="dock-container">
                    <div id="dock">
                        <ul>
                            <li>
                                <a href="equipes.html"><img src="/images/menuShop.png">
                                <span class="textMenu">Equipes</span></a>
                            </li>
                            <li>
                                <a href="competitions.html"><img src="/images/menuResultat.png">
                                <span class="textMenu">Compétition</span></a>
                            </li>
                            <li id="active">
                                <nuxt-link to="/"><img src="/images/menuHome.png">
                                <span class="textMenu">Matches</span></nuxt-link>
                            </li>
                            <li>
                                <a href="joueurs.html"><img src="/images/menuSocial.png">
                                <span class="textMenu">Joueurs</span></a>
                            </li>
                            <li>
                                <a href="tifnews.html"><img src="/images/menuResultat.png">
                                <span class="textMenu">TIF News</span></a>
                            </li>
                        </ul>
                    </div>
                </div>
            </v-container>
        </v-footer>     
    </v-content>
</template>

<script>
    import moment from 'moment'
    export default {
        head: {
            title: 'Events',
            link: [
				{ rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Acme' }
			]
        },
        layout: 'layoutScoreMode',
        async created() {
            const today = moment().format('YYYY-MM-DD')
   //          console.log('today: ', today)
   //          // if (this.$store.getters("events/loadedEvents").length < 1) {
   //              await this.$store.dispatch("events/loadedEvents")
   //          // }
   //          if (this.$store.getters['users/loadedUserTeams'].length < 1) {
			// 	await this.$store.dispatch('users/loadedUserTeams')
			// }
            await this.$store.commit('events/setEmptyEvents')
            await this.$store.commit('competitions/setEmptyCompetitions')
            // if (this.$store.getters('events/loadedEvents').length < 1) {
                await this.$store.dispatch("events/loadedEventsAndCompetitionsByDay", today)
            // }
            // if (this.$store.getters['competitions/loadedCompetitions'].length < 1) {
            //     this.$store.dispatch('competitions/loadedCompetitions')
            // }
        },
        data() {
            return {
                active: "",
                dayNumber: 0,
                date: moment(),
                // competitions: {
                //     'spanish_la_liga_2018_2019': {
                //         "name": "La Liga",
                //         "slug": "spanish_la_liga_2018_2019"
                //     },
                //     'english_premier_league_2018_2019': {
                //         "name": "Premier League",
                //         "slug": "english_premier_league_2018_2019"
                //     },
                //     'italian_serie_a_2018_2019': {
                //         "name": "Serie A",
                //         "slug": "italian_serie_a_2018_2019"
                //     },
                //     'german_bundesliga_2018_2019': {
                //         "name": "Bundesliga",
                //         "slug": "german_bundesliga_2018_2019"
                //     },
                //     'french_ligue1_2018_2019': {
                //         "name": "Ligue 1",
                //         "slug": "french_ligue1_2018_2019"
                //     },
                //     'swiss_super_league_2018_2019': {
                //         "name": "Super League",
                //         "slug": "swiss_super_league_2018_2019"
                //     }
                // }
            }
        },
        computed: {
            classObject() {
                if (this.active === "left") {
                return "activeLeft";
                } else if (this.active === "right") {
                return "activeRight";
                }
                return "headerInfo";
            },
            loadedUser () {
                return this.$store.getters['users/loadedUser']
            },
            userTeams () {
				return this.$store.getters['users/loadedUserTeams']
			},
			userTeamsIds () {
				const userTeamsIds = []
				const userTeams = this.$store.getters['users/loadedUserTeams']
				userTeams.forEach((team) => {
					userTeamsIds.push(parseInt(team.livescore_api_id))
				})
				return userTeamsIds
			},
            allEvents () {
                // return this.$store.getters['events/loadedEvents']
                const today = moment().format('YYYY-MM-DD')
                const userTeamsIds = this.userTeamsIds
                return this.$store.getters['events/loadedEvents']
                    .filter(event => (event.date === today))
                    .filter(event => (!userTeamsIds.includes(event.home_team.id) && !userTeamsIds.includes(event.visitor_team.id)))
                    // .filter(event => (!userTeamsIds.includes(event.visitor_team.id)))
                    .sort((a, b) => a.timestamp - b.timestamp)
            },
            events () {
                // const today = moment().format('YYYY-MM-DD')
                return this.$store.getters['events/loadedEvents']
                    .filter(event => (event.date === this.date.format('YYYY-MM-DD')))
                    .sort((a, b) => a.timestamp - b.timestamp)
            },
            userEvents () {
                const today = moment().format('YYYY-MM-DD')
                const userTeamsIds = this.userTeamsIds
                console.log('userTeamsIds: ', userTeamsIds)
				return this.$store.getters['events/loadedEvents']
					.filter(event => (event.date === today))
					.filter(event => (userTeamsIds.includes(event.home_team.livescore_api_id) || userTeamsIds.includes(event.visitor_team.livescore_api_id)))
					.sort((a, b) => a.timestamp - b.timestamp)
            },
            competitions () {
                return this.$store.getters['competitions/loadedCompetitions']
            }
        },
        methods: {
            eventsByCompetition (competition) {
                return this.$store.getters['events/loadedEvents']
                    .filter(event => (event.date === this.date.format('YYYY-MM-DD') && event.competition.slug === competition))
                    .sort((a, b) => a.timestamp - b.timestamp)
                // return this.allEvents.filter(event => event.competition.slug === competition)
            },
            convertToLocalTime (timestamp) {
				const utcDiff = new Date().getTimezoneOffset()
                console.log('utcDiff: ', utcDiff)
                // console.log('moment.unix(timestamp): ', moment.unix(timestamp))
                // return moment.unix(timestamp).format("HH:mm")
				if (utcDiff > 0) {
					return moment.unix(timestamp).add(utcDiff, 'minutes').format("HH:mm")
				} else {
					return moment.unix(timestamp).subtract(utcDiff, 'minutes').format("HH:mm")
				}
			},
            async eventsByDate (setDayNumber) {
                console.log('setDate: ', setDayNumber)
                switch(setDayNumber) {
                    case 'substractOne':
                        this.dayNumber -= 1
                        break
                    case 'yesterday':
                        this.dayNumber = -1
                        break
                    case 'tomorrow': 
                        this.dayNumber = 1
                        break
                    case 'addOne': 
                        this.dayNumber += 1
                        break
                }

                this.date = moment().add(this.dayNumber, 'days')
                console.log('this.date: ', this.date)

                const events = this.$store.getters['events/loadedEvents'].filter(event => (
                    event.date === this.date.format('YYYY-MM-DD')
                ))
                if (events.length < 1) {
                    console.log('events.length < 1')
                    await this.$store.dispatch('events/loadedEventsAndCompetitionsByDay', this.date.format('YYYY-MM-DD'))
                }
                console.log('events: ', events)
                return events

                // return this.$store.getters['events/loadedEvents']
            },
            mouseOver(direction) {
                console.log(direction);
                if (direction === "left") {
                    this.active = "left";
                } else if (direction === "right") {
                    this.active = "right";
                }
            },
            mouseLeave() {
                this.active = null;
            }
        }
    }
</script>

<style scoped>
    .black {
        background-color: black;
    }
        
    /* ScoreCard */

    .card {
        border-radius: 5px;
    }
    .card-title {
        background-color: lightslategray;
    }
    .card-text {
        background-color: whitesmoke;
        width: auto;
        border-radius: 8px;
    }
    .card-footer {
        background-color: lightslategrey;
    }
    .fas:hover {
        cursor: pointer;
        color: #fff;
    }
    
    .v-expansion-panel__header {
        padding: 2px 12px;
        min-height: 0;
    }
    
    #app {
        font: normal 100%/1 "Acme", Helvetica, sans-serif;
    }

    /* Header */
    .headerMenu:hover {
        cursor: pointer;
        background-color: rgb(248,147,37);
    }
    .headerInfo {
        padding: 0px; height: 20px; margin-top: 0px;
    }
    .activeLeft {
        padding: 0px; height: 20px; margin-top: 0px;
    }
    .activeRight {
        padding: 0px; height: 20px; margin-top: 0px;
    }
    
    .backBlack {
        background-image: url("/images/header-TIF_03.png");
        background-position: center;
        background-repeat: repeat-x;
    }
    
    .headerLogo {
        height: 83px;
    }
    
    .levelBox {
        background-color: white;
        color: black;
        height: 20px;
        vertical-align: middle;
        padding: 0  15px;
        border-radius: 3px;
    }
    
    .energyBox {
        background-color: white;
        color: black;
        height: 20px;
        vertical-align: middle;
        padding: 0 15px;
        border-radius: 3px;
    }
    
    .dollarBox {
        background-color: white;
        color: black;
        height: 20px;
        vertical-align: middle;
        padding: 0 15px;
        border-radius: 3px;
    }

    .tokenBox {
        background-color: white;
        color: black;
        height: 20px;
        vertical-align: middle;
        padding: 0 15px;
        border-radius: 3px;
    }

    /* Menu */

    #dock-container {
        height: 80px;
        padding: 0;
        margin: 0;
        bottom: 0;
        background-color: rgb(248,147,37);
        border: none;
        border-top: 4px solid orangered;
    }

    #dock-container li#active img {
        -webkit-transform: scale(1.65);
        margin: 0 0.5em;
    }

    #dock-container li {
        width: 17%;
        padding: 0;
        margin: 0;
        list-style-type: none;
        display: inline-block;
        position: relative;
        padding-top: 10px;
    }

    #dock-container ul {
        width: 100%;
        padding-left: 0px;
        padding-right: 0px;
        margin-bottom: 0;
    }

    #dock-container li img {
        width: 58px;
        height: 58px;
        /*-webkit-gradient(linear, left top, left bottom, from(transparent), color-stop(0.7, transparent), to(rgba(255,255,255,.5)));*/
        -webkit-transition: all 0.3s;
        -webkit-transform-origin: 50% 100%;
    }

    #dock-container li:hover img { 
        -webkit-transform: scale(1.65);
        margin: 0 0.5em;
    }

    #dock-container li:hover + li img, #dock-container li.prev img {
        -webkit-transform: scale(1);
        margin: 0 0;
    }

    #dock-container li span {
        display: none;
        position: absolute;
        bottom: 0px;
        left: 0;
        width: 100%;
        background-color: rgba(0,0,0,0.5);
        border-radius: 5px;
    }

    #dock-container li#active span {
        display: none;
        position: absolute;
        bottom: 0px;
        left: 0;
        width: 100%;
        background-color: rgba(0,0,0,0.5);
        border-radius: 5px;
    }

    #dock-container li#active span {
        display: block;
        color: #fff;
    }

    #dock-container li#active .textMenu {
        font: normal 120%/1 "Acme", Helvetica, sans-serif;
        padding: 2px;
    }

    #dock-container li:hover span {
        display: block;
        color: #fff;
    }

    #dock-container .textMenu {
        font: normal 120%/1 "Acme", Helvetica, sans-serif;
        padding: 2px;
    }

    @media only screen and (max-width: 768px) {

        #app {
            font: normal 90%/1 "Acme", Helvetica, sans-serif;
        }
        
        .pd-right10 {
            padding-right: 10px;
        }
        
        .pd-left10 {
            padding-left: 10px;
        }

        /* Header */

        .imageLogoTif {
            width: 60px;
            height: 60px;
        }

        .boxTif {
            width: 70px;
            height: 70px;
        }

        .imageLogo {
            width: 30px;
            height: 30px;
        }

        /* Menu */

        #dock-container {
            height: 55px;
            padding: 0;
            margin: 0;
            bottom: 0;
            background-color: rgb(248,147,37);
            border: none;
            border-top: 4px solid darkred;
        }

        #dock-container li#active img {
            -webkit-transform: scale(1.65);
            margin: 0 0.5em;
        }

        #dock-container li {
            width: 17%;
            padding: 0;
            margin: 0;
            list-style-type: none;
            display: inline-block;
            position: relative;
            padding-top: 3px;
        }

        #dock-container ul {
            width: 100%;
            padding-left: 0px;
            padding-right: 0px;
            margin-bottom: 0;
        }

        #dock-container li img {
            width: 38px;
            height: 38px;
            /*-webkit-gradient(linear, left top, left bottom, from(transparent), color-stop(0.7, transparent), to(rgba(255,255,255,.5)));*/
            -webkit-transition: all 0.3s;
            -webkit-transform-origin: 50% 100%;
        }

        #dock-container li:hover img { 
            -webkit-transform: scale(1.65);
            margin: 0 0.5em;
        }

        #dock-container li:hover + li img, #dock-container li.prev img {
            -webkit-transform: scale(1);
            margin: 0 0;
        }

        #dock-container li span {
            display: none;
            position: absolute;
            bottom: 0px;
            left: 0;
            width: 100%;
            background-color: rgba(0,0,0,0.5);
            border-radius: 5px;
        }

        #dock-container li#active span {
            display: none;
            position: absolute;
            bottom: 0px;
            left: 0;
            width: 100%;
            background-color: rgba(0,0,0,0.5);
            border-radius: 5px;
        }

        #dock-container li#active span {
            display: block;
            color: #fff;
        }

        #dock-container li#active .textMenu {
            font: normal 90%/1 "Acme", Helvetica, sans-serif;
            padding: 2px;
        }

        #dock-container li:hover span {
            display: block;
            color: #fff;
        }

        #dock-container .textMenu {
            font: normal 90%/1 "Acme", Helvetica, sans-serif;
            padding: 2px;
        }

    }

    /* Ajouts J-M */
    .navButton:hover {
        cursor: pointer;
        text-shadow : 0 0 6px #FFF, 0 0 6px #FFF;
    }
    .icon:hover {
        cursor: pointer;
        text-shadow: 10 10 30px #ff0000; color: orangered;
    }

    /* Vuejs transitions*/
    .fade-enter-active, .fade-leave-active {
        transition: opacity 5s;
        background-color: #000;
    }
    .fade-enter, .fade-leave-to {
        opacity: 0;
    }

</style>