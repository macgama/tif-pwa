<template>
    <v-content>
		<v-layout align-center justify-center row fill-height>
			<v-flex xs12 sm10 md8 lg6>
				<v-card class="card">
                    <v-card-title primary-title class="card-title">
                        <v-flex xs6>
                            <h2 class="white--text text-xs-left">TODAY'S EVENTS</h2>
                        </v-flex>
                        <v-flex xs6 class="text-xs-right">
                            <fa :icon="['fas', 'arrow-circle-left']" size="2x" class="icon" @click="goBack" />
                        </v-flex>
                    </v-card-title>
                    <!-- loadedTodayEvents: {{ loadedTodayEvents }}<br /><br /> -->
                    <!-- loadedTodayEvents[1]: {{ loadedTodayEvents[1] }}<br /><br /> -->

                    <v-card-text class="card-text mx-3">
                        <v-expansion-panel class="elevation-0" :value="0">
                            <v-expansion-panel-content class="deep-orange accent-4">
                                <div slot="header" class="text-xs-center white--text">SWISS SUPER LEAGUE</div>
                                <v-icon slot="actions" color="white">$vuetify.icons.expand</v-icon>
                                <v-card>
                                    <v-card-text>
                                        <v-data-table :items="eventsByCompetition('swiss_super_league_2018_2019')" class="elevation-0" hide-actions hide-headers>
                                            <template slot="items" slot-scope="props">
                                                <td class="text-xs-left" width="10%"><v-img :src="'/images/teams/' + props.item.home_team.slug + '.png'" :lazy-src="'/images/icon.png'" aspect-ratio="1"></v-img></td>
                                                <td class="text-xs-left" width="20%">{{ props.item.home_team.name }}</td>
                                                <td class="text-xs-center" width="40%">
                                                    <span class="hidden-sm-and-down">{{ props.item.competition.name }}<br /></span>
                                                    <span class="hidden-sm-and-down">{{ props.item.date }} - {{ props.item.time }}<br /></span>
                                                    <b>{{ props.item.score }}</b>
                                                </td>
                                                <td class="text-xs-right" width="20%">{{ props.item.visitor_team.name }}</td>
                                                <td class="text-xs-right" width="10%"><v-img :src="'/images/teams/' + props.item.visitor_team.slug + '.png'" :lazy-src="'/images/icon.png'" aspect-ratio="1"></v-img></td>
                                            </template>
                                        </v-data-table>
                                    </v-card-text>
                                </v-card>
                            </v-expansion-panel-content>
                        </v-expansion-panel>
                        <v-expansion-panel class="elevation-0" :value="1">
                            <v-expansion-panel-content class="blue">
                                <div slot="header" class="text-xs-center white--text">ENGLISH PREMIER LEAGUE</div>
                                <v-icon slot="actions" color="white">$vuetify.icons.expand</v-icon>
                                <v-card>
                                    <v-card-text>
                                        <v-data-table :items="eventsByCompetition('english_premier_league_2018_2019')" class="elevation-0" hide-actions hide-headers>
                                            <template slot="items" slot-scope="props">
                                                <td class="text-xs-left" width="10%"><v-img :src="'/images/teams/' + props.item.home_team.slug + '.png'" :lazy-src="'/images/icon.png'" aspect-ratio="1"></v-img></td>
                                                <td class="text-xs-left" width="20%">{{ props.item.home_team.name }}</td>
                                                <td class="text-xs-center" width="40%">
                                                    <span class="hidden-sm-and-down">{{ props.item.competition.name }}<br /></span>
                                                    <span class="hidden-sm-and-down">{{ props.item.date }} - {{ props.item.time }}<br /></span>
                                                    <b>{{ props.item.score }}</b>
                                                </td>
                                                <td class="text-xs-right" width="20%">{{ props.item.visitor_team.name }}</td>
                                                <td class="text-xs-right" width="10%"><v-img :src="'/images/teams/' + props.item.visitor_team.slug + '.png'" :lazy-src="'/images/icon.png'" aspect-ratio="1"></v-img></td>
                                            </template>
                                        </v-data-table>
                                    </v-card-text>
                                </v-card>
                            </v-expansion-panel-content>
                        </v-expansion-panel>
                        <v-expansion-panel class="elevation-0" :value="1">
                            <v-expansion-panel-content class="deep-orange accent-4">
                                <div slot="header" class="text-xs-center white--text">FRENCH LEAGUE 1</div>
                                <v-icon slot="actions" color="white">$vuetify.icons.expand</v-icon>
                                <v-card>
                                    <v-card-text>
                                        <v-data-table :items="eventsByCompetition('french_league1_2018_2019')" class="elevation-0" hide-actions hide-headers>
                                            <template slot="items" slot-scope="props">
                                                <td class="text-xs-left" width="10%"><v-img :src="'/images/teams/' + props.item.home_team.slug + '.png'" :lazy-src="'/images/icon.png'" aspect-ratio="1"></v-img></td>
                                                <td class="text-xs-left" width="20%">{{ props.item.home_team.name }}</td>
                                                <td class="text-xs-center" width="40%">
                                                    <span class="hidden-sm-and-down">{{ props.item.competition.name }}<br /></span>
                                                    <span class="hidden-sm-and-down">{{ props.item.date }} - {{ props.item.time }}<br /></span>
                                                    <b>{{ props.item.score }}</b>
                                                </td>
                                                <td class="text-xs-right" width="20%">{{ props.item.visitor_team.name }}</td>
                                                <td class="text-xs-right" width="10%"><v-img :src="'/images/teams/' + props.item.visitor_team.slug + '.png'" :lazy-src="'/images/icon.png'" aspect-ratio="1"></v-img></td>
                                            </template>
                                        </v-data-table>
                                    </v-card-text>
                                </v-card>
                            </v-expansion-panel-content>
                        </v-expansion-panel>
                        <v-expansion-panel class="elevation-0" :value="1">
                            <v-expansion-panel-content class="blue">
                                <div slot="header" class="text-xs-center white--text">GERMAN BUNDESLIGA</div>
                                <v-icon slot="actions" color="white">$vuetify.icons.expand</v-icon>
                                <v-card>
                                    <v-card-text>
                                        <v-data-table :items="eventsByCompetition('german_bundesliga_2018_2019')" class="elevation-0" hide-actions hide-headers>
                                            <template slot="items" slot-scope="props">
                                                <td class="text-xs-left" width="10%"><v-img :src="'/images/teams/' + props.item.home_team.slug + '.png'" :lazy-src="'/images/icon.png'" aspect-ratio="1"></v-img></td>
                                                <td class="text-xs-left" width="20%">{{ props.item.home_team.name }}</td>
                                                <td class="text-xs-center" width="40%">
                                                    <span class="hidden-sm-and-down">{{ props.item.competition.name }}<br /></span>
                                                    <span class="hidden-sm-and-down">{{ props.item.date }} - {{ props.item.time }}<br /></span>
                                                    <b>{{ props.item.score }}</b>
                                                </td>
                                                <td class="text-xs-right" width="20%">{{ props.item.visitor_team.name }}</td>
                                                <td class="text-xs-right" width="10%"><v-img :src="'/images/teams/' + props.item.visitor_team.slug + '.png'" :lazy-src="'/images/icon.png'" aspect-ratio="1"></v-img></td>
                                            </template>
                                        </v-data-table>
                                    </v-card-text>
                                </v-card>
                            </v-expansion-panel-content>
                        </v-expansion-panel>
                        <v-expansion-panel class="elevation-0" :value="1">
                            <v-expansion-panel-content class="deep-orange accent-4">
                                <div slot="header" class="text-xs-center white--text">SPANISH LALIGA</div>
                                <v-icon slot="actions" color="white">$vuetify.icons.expand</v-icon>
                                <v-card>
                                    <v-card-text>
                                        <v-data-table :items="eventsByCompetition('spanish_la_liga_2018_2019')" class="elevation-0" hide-actions hide-headers>
                                            <template slot="items" slot-scope="props">
                                                <td class="text-xs-left" width="10%"><v-img :src="'/images/teams/' + props.item.home_team.slug + '.png'" :lazy-src="'/images/icon.png'" aspect-ratio="1"></v-img></td>
                                                <td class="text-xs-left" width="20%">{{ props.item.home_team.name }}</td>
                                                <td class="text-xs-center" width="40%">
                                                    <span class="hidden-sm-and-down">{{ props.item.competition.name }}<br /></span>
                                                    <span class="hidden-sm-and-down">{{ props.item.date }} - {{ props.item.time }}<br /></span>
                                                    <b>{{ props.item.score }}</b>
                                                </td>
                                                <td class="text-xs-right" width="20%">{{ props.item.visitor_team.name }}</td>
                                                <td class="text-xs-right" width="10%"><v-img :src="'/images/teams/' + props.item.visitor_team.slug + '.png'" :lazy-src="'/images/icon.png'" aspect-ratio="1"></v-img></td>
                                            </template>
                                        </v-data-table>
                                    </v-card-text>
                                </v-card>
                            </v-expansion-panel-content>
                        </v-expansion-panel>
                        <v-expansion-panel class="elevation-0" :value="1">
                            <v-expansion-panel-content class="blue">
                                <div slot="header" class="text-xs-center white--text">ITALIAN SERIE A</div>
                                <v-icon slot="actions" color="white">$vuetify.icons.expand</v-icon>
                                <v-card>
                                    <v-card-text>
                                        <v-data-table :items="eventsByCompetition('italian_serie_a_2018_2019')" class="elevation-0" hide-actions hide-headers>
                                            <template slot="items" slot-scope="props">
                                                <td class="text-xs-left" width="10%"><v-img :src="'/images/teams/' + props.item.home_team.slug + '.png'" :lazy-src="'/images/icon.png'" aspect-ratio="1"></v-img></td>
                                                <td class="text-xs-left" width="20%">{{ props.item.home_team.name }}</td>
                                                <td class="text-xs-center" width="40%">
                                                    <span class="hidden-sm-and-down">{{ props.item.competition.name }}<br /></span>
                                                    <span class="hidden-sm-and-down">{{ props.item.date }} - {{ props.item.time }}<br /></span>
                                                    <b>{{ props.item.score }}</b>
                                                </td>
                                                <td class="text-xs-right" width="20%">{{ props.item.visitor_team.name }}</td>
                                                <td class="text-xs-right" width="10%"><v-img :src="'/images/teams/' + props.item.visitor_team.slug + '.png'" :lazy-src="'/images/icon.png'" aspect-ratio="1"></v-img></td>
                                            </template>
                                        </v-data-table>
                                    </v-card-text>
                                </v-card>
                            </v-expansion-panel-content>
                        </v-expansion-panel>
                    </v-card-text>
                    <br />

                    <v-card-actions class="card-footer">
                        <v-flex class="text-xs-center">
                            <v-btn class="elevation-0" nuxt to="/home">Go back</v-btn>
                        </v-flex>
                    </v-card-actions>
                </v-card>
			</v-flex>
		</v-layout>
	</v-content>
</template>

<script>
    import moment from 'moment'
    export default {
        head: {
            title: 'Events',
        },
        layout: 'layoutFront',
        created() {
            setTimeout(() => {
                this.$store.dispatch("events/loadedEvents")
                console.log('Done!')           
			}, 2500)
        },
        data() {
            return {}
        },
        computed: {
            loadedTodayEvents () {
                const today = moment().add(1, 'days').format('YYYY-MM-DD')
                return this.$store.getters['events/loadedEvents']
                    .filter(event => (event.date === today))
                    .sort((a, b) => a.timestamp - b.timestamp)
            },
            
            myEvents() {
                return [
                    {
                        date: "14-11-2018",
                        time: "20:30",
                        home_team: {
                            name: "Neuchâtel Xamax",
                            slug: "xamax",
                            image:
                                "https://upload.wikimedia.org/wikipedia/fr/d/d5/Logo_Neuch%C3%A2tel_Xamax.jpg"
                        },
                        visitor_team: {
                            name: "Lausanne Sports",
                            slug: "lausanne_sports",
                            image:
                                "https://upload.wikimedia.org/wikipedia/fr/c/ca/FC_Lausanne-Sport.png"
                        },
                        score: "6 - 0",
                        status: "FINISHED",
                        competition: {
                            name: "Swiss Cup",
                            slug: "swiss_cup_2018"
                        }
                    },
                    {
                        date: "20-11-2018",
                        time: "16:00",
                        home_team: {
                            name: "Young Boys",
                            slug: "young_boys",
                            image:
                                "https://upload.wikimedia.org/wikipedia/fr/thumb/c/c2/BSC_Young_Boys.svg/396px-BSC_Young_Boys.svg.png"
                        },
                        visitor_team: {
                            name: "Neuchâtel Xamax",
                            slug: "xamax",
                            image:
                                "https://upload.wikimedia.org/wikipedia/fr/d/d5/Logo_Neuch%C3%A2tel_Xamax.jpg"
                        },
                        score: "0 - 3",
                        status: "FINISHED",
                        competition: {
                            name: "Super League",
                            slug: "swiss_super_league_2018_2019"
                        }
                    }
                ]
            },
            allEvents() {
                return [
                    {
                        date: "18-11-2018",
                        time: "20:30",
                        home_team: {
                            name: "Liverpool FC",
                            slug: "liverpool",
                            image:
                                "https://upload.wikimedia.org/wikipedia/fr/thumb/5/54/Logo_FC_Liverpool.svg/817px-Logo_FC_Liverpool.svg.png"
                        },
                        visitor_team: {
                            name: "Manchester United",
                            slug: "manchester_united",
                            image:
                                "https://upload.wikimedia.org/wikipedia/fr/thumb/b/b9/Logo_Manchester_United.svg/610px-Logo_Manchester_United.svg.png"
                        },
                        score: "2 - 2",
                        status: "FINISHED",
                        competition: {
                            name: "Premier League",
                            slug: "english_premier_league_2018_2019"
                        }
                    },
                    {
                        date: "18-11-2018",
                        time: "21:00",
                        home_team: {
                            name: "Manchester City",
                            slug: "manchester_city",
                            image:
                                "https://upload.wikimedia.org/wikipedia/fr/3/36/Manchester_City_2016.png"
                        },
                        visitor_team: {
                            name: "Chelsea",
                            slug: "chelsea",
                            image:
                                "https://upload.wikimedia.org/wikipedia/fr/thumb/5/51/Logo_Chelsea.svg/475px-Logo_Chelsea.svg.png"
                        },
                        score: "2 - 1",
                        status: "FINISHED",
                        competition: {
                            name: "Premier League",
                            slug: "english_premier_league_2018_2019"
                        }
                    }
                ]
            }
        },
        methods: {
            eventsByCompetition (competition) {
                console.log('Call to events method')
                return this.loadedTodayEvents.filter(event => event.competition.slug === competition)
            },
            goBack() {
                this.$router.replace("/home")
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
    .v-card__text {
        padding: 0px;
    }

    .theme--light.v-expansion-panel
        .v-expansion-panel__container
        .v-expansion-panel__header
        .v-expansion-panel__header__icon
        .v-icon {
        color: white;
    }
</style>