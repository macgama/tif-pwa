<template>
    <v-content id="app">
        <v-container fluid style="padding: 0; max-width: 800px; background-color: #FF5722; color: white; border-bottom: 4px solid darkred">
            <v-layout row wrap>
                <v-flex d-flex xs2 justify-center align-center class="text-xs-left">
                    <v-card flat tile class="deep-orange boxTif" style="max-height: 100px">
                        <img src="/images/soccer.png" width="100px" height="100px" class="imageLogoTif"/>
                    </v-card>
                </v-flex>
                <v-flex d-flex xs8>
                    <v-layout row wrap>
                        <v-flex d-flex>
                            <v-layout row wrap>
                                <v-flex d-flex xs12 class="elevation-0">
                                    <v-layout row wrap>
                                        <v-flex d-flex xs3 justify-center align-center class="text-xs-center elevation-0 headerMenu" @mouseover="mouseOver('left')" @mouseleave="mouseLeave">
                                            <div class="">
                                                <img src="/images/level.png" width="40px" height="40px" class="imageLogo" /><br />
                                                5 / 100
                                            </div>
                                        </v-flex>
                                        <v-flex d-flex xs3 justify-center align-center class="text-xs-center elevation-0 headerMenu">
                                            <div class="">
                                                <img src="/images/energie.png" width="40px" height="40px" class="imageLogo"/><br />
                                                10 / 10
                                            </div>
                                        </v-flex>
                                        <v-flex d-flex xs3 justify-center align-center class="text-xs-center elevation-0 headerMenu" >
                                            <div class="">
                                                <img src="/images/dollar.png" width="40px" height="40px" class="imageLogo"/><br />
                                                1654 $
                                            </div>
                                        </v-flex>
                                        <v-flex d-flex xs3 justify-center align-center class="text-xs-center elevation-0 headerMenu" @mouseover="mouseOver('right')" @mouseleave="mouseLeave">
                                            <div class="">
                                                <img src="/images/token.png" width="40px" height="40px" class="imageLogo"/><br />
                                                16
                                            </div>
                                        </v-flex>
                                    </v-layout>
                                </v-flex>
                                <v-flex d-flex xs12>
                                    <v-layout row wrap :class="classObject">
                                        <v-flex d-flex xs6 justify-center align-center class="text-xs-left">
                                            <div class="" style="font-size: 100%" v-if="!loadedUser">
                                            Utilisateur Invité
                                            </div>
                                        </v-flex>
                                        <v-flex d-flex xs6 justify-center align-center class="text-xs-right">
                                            <div class="" style="font-size: 100%" v-if="!loadedUser">
                                                <nuxt-link to="/">S'incrire - Se connecter</nuxt-link>
                                            </div>
                                            <div v-else>
                                                Bienvenue, {{ loadedUser.email }}
                                            </div>
                                        </v-flex>
                                    </v-layout>
                                </v-flex>
                            </v-layout>
                        </v-flex>
                    </v-layout>
                </v-flex>
                <v-flex d-flex xs2 justify-center align-center class="text-xs-right">
                    <v-card flat tile class="deep-orange boxTif" style="max-height: 100px">
                        <img src="/images/switzerland.png" width="100px" height="100px" class="imageLogoTif"/>
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
                    Demain {{dayNumber}}
                </v-flex>
                <v-flex d-flex x1 justify-end align-center style="padding-right: 20px;" @click="eventsByDate('addOne')">
                    <fa :icon="['fas', 'angle-double-right']" size="1x" class="icon" style="text-shadow: 0 0 15px #3b5998;"/>
                </v-flex>
            </v-layout>             
        </v-container>
        <v-container fluid style="padding: 0; max-width: 800px; background-color: whitesmoke; margin-bottom: 85px">
            <v-card-text class="card-text" style="padding: 8px">
                <p>
                    <!-- userEvents: {{ userEvents }}<br /><br /> -->
                    <!-- allEvents: {{ allEvents }}<br /><br /> -->
                    <!-- events: {{ events }}<br /><br /> -->
                </p>
                <!-- MY EVENTS -->
                <v-expansion-panel class="elevation-0" :value="0" v-if="loadedUser">
                    <v-expansion-panel-content class="orange">
                        <div slot="header" class="white--text">
                            MY EVENTS
                        </div>
                        <v-icon slot="actions" color="white">$vuetify.icons.expand</v-icon>
                        <v-card>
                            <v-card-text style="padding: 0 8px 8px 8px">
                                <v-data-table :items="userEvents" class="elevation-0" hide-actions hide-headers>
                                    <template slot="items" slot-scope="props" style="height: 15px; border-spacing: 0; padding: 2px; border: 1px solid black">
                                        <v-layout style="background-color: black;">
                                            <div style="color: white; padding: 5px; display: flex; align-items:center;" v-for="country in props.item.competition.countries" :key="country.slug">
                                                <img :src="'/images/countries/' + country.slug + '.png'" style="width: 20px; height: 20px; margin-right: 5px;" />
                                                {{ props.item.competition.name }}
                                            </div>
                                        </v-layout>
                                        <v-layout align-center style="padding: 0; border-right: 1px solid black; border-left: 1px solid black; border-bottom: 1px solid black">
                                            <v-flex xs12 style="margin: 0; padding-top: 2px; padding-bottom: 2px; height: 100%">
                                                <v-layout align-start>
                                                    <v-flex class="text-xs-left" style="width: 4px; padding-left: 2px; padding-right: 2px; height: 15px; margin: 0">
                                                        <div style="background-color: red; height: 100%; width: 2px"></div>
                                                    </v-flex>
                                                    <v-flex class="text-xs-left" style="width: 100%; padding: 0; height: 15px; margin: 0">
                                                        <div style="color: orange;font-size: 80%"><span style="float: left; background-color: red; color: white; text-align: center; padding-left: 5px; padding-right: 5px; margin-right: 5px"> {{ props.item.status}}</span> {{ props.item.date }} - {{ convertToLocalTime(props.item.timestamp) }}</div>
                                                    </v-flex>
                                                </v-layout>
                                                <v-layout row align-center>
                                                    <v-flex>
                                                        <v-layout align-center style="width: 100%">
                                                            <v-flex sm1 hidden-xs-only align-center class="text-xs-left" style="width: 50px; padding-left: 15px">
                                                                <img :src="'/images/teams/' + props.item.home_team.slug + '.png'" :lazy-src="'/images/icon.png'" width="25"/>
                                                            </v-flex>
                                                            <v-flex sm4 xs5 align-center class="text-xs-left pd-left10">
                                                                {{ props.item.home_team.name }} 
                                                            </v-flex>
                                                            <v-flex sm2 xs2 class="text-xs-center">
                                                                <span style="background-color: black; color: orange; padding: 2px 10px; border-radius: 5px; font-size: 130%">
                                                                    <span v-if="props.item.score"><b>{{ props.item.score }}</b></span>
                                                                    <span v-else>-</span>
                                                                </span>
                                                            </v-flex>
                                                            <v-flex sm4 xs5 align-center class="text-xs-right pd-right10">
                                                                {{ props.item.visitor_team.name }}
                                                            </v-flex>
                                                            <v-flex sm1 hidden-xs-only align-center class="text-xs-right" style="width: 50px; padding-right: 15px">
                                                                <img :src="'/images/teams/' + props.item.visitor_team.slug + '.png'" :lazy-src="'/images/icon.png'" width="25"/>
                                                            </v-flex>
                                                        </v-layout>
                                                    </v-flex>
                                                </v-layout>
                                            </v-flex>
                                        </v-layout>								
                                    </template>
                                </v-data-table>
                            </v-card-text>
                        </v-card>
                    </v-expansion-panel-content>
                </v-expansion-panel>

                <!-- ALL EVENTS -->
                <v-expansion-panel class="elevation-0" :value="0">
                    <v-expansion-panel-content class="green">
                        <div slot="header" class="white--text">
                            ALL EVENTS
                        </div>
                        <v-icon slot="actions" color="white">$vuetify.icons.expand</v-icon>
                        <v-card>
                            <v-card-text style="padding: 0 8px 8px 8px">
                                <v-data-table :items="events" class="elevation-0" hide-actions hide-headers>
                                    <template slot="items" slot-scope="props" style="height: 15px; border-spacing: 0; padding: 2px; border: 1px solid black">
                                        <v-layout style="background-color: black;">
                                            <div style="color: white; padding: 5px; display: flex; align-items:center;" v-for="country in props.item.competition.countries" :key="country.slug">
                                                <img :src="'/images/countries/' + country.slug + '.png'" style="width: 20px; height: 20px; margin-right: 5px;" />
                                                {{ props.item.competition.name }}
                                            </div>
                                        </v-layout>
                                        <v-layout align-center style="padding: 0; border-right: 1px solid black; border-left: 1px solid black; border-bottom: 1px solid black">
                                            <v-flex xs12 style="margin: 0; padding-top: 2px; padding-bottom: 2px; height: 100%">
                                                <v-layout align-start>
                                                    <v-flex class="text-xs-left" style="width: 4px; padding-left: 2px; padding-right: 2px; height: 15px; margin: 0">
                                                        <div style="background-color: red; height: 100%; width: 2px"></div>
                                                    </v-flex>
                                                    <v-flex class="text-xs-left" style="width: 100%; padding: 0; height: 15px; margin: 0">
                                                        <div style="color: orange;font-size: 80%"><span style="float: left; background-color: red; color: white; text-align: center; padding-left: 5px; padding-right: 5px; margin-right: 5px"> {{ props.item.status}}</span> {{ props.item.date }} - {{ convertToLocalTime(props.item.timestamp) }}</div>
                                                    </v-flex>
                                                </v-layout>
                                                <v-layout row align-center>
                                                    <v-flex>
                                                        <v-layout align-center style="width: 100%">
                                                            <v-flex sm1 hidden-xs-only align-center class="text-xs-left" style="width: 50px; padding-left: 15px">
                                                                <img :src="'/images/teams/' + props.item.home_team.slug + '.png'" :lazy-src="'/images/icon.png'" width="25"/>
                                                            </v-flex>
                                                            <v-flex sm4 xs5 align-center class="text-xs-left pd-left10">
                                                                {{ props.item.home_team.name }} 
                                                            </v-flex>
                                                            <v-flex sm2 xs2 class="text-xs-center">
                                                                <span style="background-color: black; color: orange; padding: 2px 10px; border-radius: 5px; font-size: 130%">
                                                                    <!-- <span v-if="props.item.score"><b>{{ props.item.score }}</b></span>
                                                                    <span v-else>-</span> -->





                                                                    <transition name="fade" mode="out-in" :duration="{ enter: 3000, leave: 2000 }">
                                                                        <span :key="props.item.score" v-if="props.item.status === 'IN PLAY' || props.item.status === 'HALF TIME BREAK' || props.item.status === 'ADDED TIME' || props.item.status === 'FINISHED'">
                                                                            {{ props.item.score }}
                                                                        </span>
                                                                        <span v-else>-</span>
                                                                    </transition>




                                                                </span>
                                                            </v-flex>
                                                            <v-flex sm4 xs5 align-center class="text-xs-right pd-right10">
                                                                {{ props.item.visitor_team.name }}
                                                            </v-flex>
                                                            <v-flex sm1 hidden-xs-only align-center class="text-xs-right" style="width: 50px; padding-right: 15px">
                                                                <img :src="'/images/teams/' + props.item.visitor_team.slug + '.png'" :lazy-src="'/images/icon.png'" width="25"/>
                                                            </v-flex>
                                                        </v-layout>
                                                    </v-flex>
                                                </v-layout>
                                            </v-flex>
                                        </v-layout>									
                                    </template>
                                </v-data-table>
                            </v-card-text>
                        </v-card>
                    </v-expansion-panel-content>
                </v-expansion-panel>
            </v-card-text>

        </v-container>          
        <v-footer style="background-color: white; position: fixed; bottom: 0; width: 100%" height="auto" class="text-xs-center">
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
            // if (this.$store.getters('events/loadedEvents').length < 1) {
                await this.$store.dispatch("events/loadedEventsByDay", today)
            // }
        },
        data() {
            return {
                active: "",
                dayNumber: 0,
                date: moment(),
                competitions: ['swiss_super_league_2018_2019', 'english_premier_league_2018_2019'],
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
            }
        },
        methods: {
            eventsByCompetition (competition) {
                return this.allEvents.filter(event => event.competition.slug === competition)
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
                    await this.$store.dispatch('events/loadedEventsByDay', this.date.format('YYYY-MM-DD'))
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
    #app {
        font: normal 100%/1 "Acme", Helvetica, sans-serif;
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
        background-color: orange;
    }
    .headerInfo {
        background-color: orange; border-radius: 15px; padding: 0px 15px;
    }
    .activeLeft {
        background-color: orange; border-radius: 0px 15px 15px 15px; padding: 0px 15px;
    }
    .activeRight {
        background-color: orange; border-radius: 15px 0px 15px 15px; padding: 0px 15px;
    }

    /* Menu */

    #dock-container {
        height: 80px;
        padding: 0;
        margin: 0;
        bottom: 0;
        background-color: #FF5722;
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
    
    /* Ajout J-M */
    .navButton:hover {
        cursor: pointer;
        text-shadow : 0 0 6px #FFF, 0 0 6px #FFF;
    }
    .icon:hover {
        cursor: pointer;
        /*text-shadow: 0 0 26px #FFF, 0 0 26px red;*/
        text-shadow: 10 10 30px #ff0000; color: orangered;
        /*text-shadow: 0 0 30px #FFF; color: #FFFFFF;*/
    }

    /* Vuejs transitions*/
    .fade-enter-active, .fade-leave-active {
      transition: opacity 5s;
      background-color: #000;
    }
    .fade-enter, .fade-leave-to {
      opacity: 0;
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
            background-color: #FF5722;
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
</style>