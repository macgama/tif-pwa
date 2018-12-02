<template>
    <v-content>
        <v-container fluid style="padding: 0; max-width: 800px; background-color: #FF5722; color: white; border-bottom: 4px solid darkred">
            <v-layout row wrap>
                <v-flex d-flex xs2 justify-center align-center class="text-xs-left">
                    <v-card flat tile class="deep-orange boxTif" style="max-height: 100px">
                        <img src="soccer.png" width="100px" height="100px" class="imageLogoTif"/>
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
                                                <img src="level.png" width="40px" height="40px" class="imageLogo" /><br />
                                                5 / 100
                                            </div>
                                        </v-flex>
                                        <v-flex d-flex xs3 justify-center align-center class="text-xs-center elevation-0 headerMenu">
                                            <div class="">
                                                <img src="energie.png" width="40px" height="40px" class="imageLogo"/><br />
                                                10 / 10
                                            </div>
                                        </v-flex>
                                        <v-flex d-flex xs3 justify-center align-center class="text-xs-center elevation-0 headerMenu" >
                                            <div class="">
                                                <img src="dollar.png" width="40px" height="40px" class="imageLogo"/><br />
                                                1654 $
                                            </div>
                                        </v-flex>
                                        <v-flex d-flex xs3 justify-center align-center class="text-xs-center elevation-0 headerMenu" @mouseover="mouseOver('right')" @mouseleave="mouseLeave">
                                            <div class="">
                                                <img src="token.png" width="40px" height="40px" class="imageLogo"/><br />
                                                16
                                            </div>
                                        </v-flex>
                                    </v-layout>
                                </v-flex>
                                <v-flex d-flex xs12>
                                    <v-layout row wrap :class="classObject">
                                        <v-flex d-flex xs6 justify-center align-center class="text-xs-left">
                                            <div class="" style="font-size: 100%">
                                            Utilisateur Invité
                                            </div>
                                        </v-flex>
                                        <v-flex d-flex xs6 justify-center align-center class="text-xs-right">
                                            <div class="" style="font-size: 100%">
                                                S'incrire - Se connecter
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
                        <img src="switzerland.png" width="100px" height="100px" class="imageLogoTif"/>
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
                <v-flex d-flex x1 justify-start align-center style="height: 40px; padding-left: 20px">
                    <<
                </v-flex>
                <v-flex d-flex x2 justify-start align-center class="text-xs-center" style="height: 40px">
                    Hier
                </v-flex>
                <v-flex d-flex x6 justify-center align-center class="text-xs-center" style="height: 40px">
                    Aujourd'hui
                </v-flex>
                <v-flex d-flex x2 justify-end align-center class="text-xs-center" style="height: 40px">
                    Demain
                </v-flex>
                <v-flex d-flex x1 justify-end align-center style="height: 40px; padding-right: 20px">
                    >>
                </v-flex>
            </v-layout>             
        </v-container>
        <v-container fluid style="padding: 0; max-width: 800px; background-color: whitesmoke; margin-bottom: 85px">
            <v-card-text class="card-text" style="padding: 8px">

                <!-- SWISS SUPER LEAGUE -->
                <v-expansion-panel class="elevation-0" :value="0">
                    <v-expansion-panel-content class="orange">
                        <div slot="header" class="white--text">
                            SWISS SUPERLEAGUE
                        </div>
                        <v-icon slot="actions" color="white">$vuetify.icons.expand</v-icon>
                        <v-card>
                            <v-card-text style="padding: 0 8px 8px 8px">
                                <v-data-table :items="eventsByCompetition('swiss_super_league_2018_2019')" class="elevation-0" hide-actions hide-headers>
                                    <template slot="items" slot-scope="props" style="height: 15px; border-spacing: 0; padding: 2px; border: 1px solid black">
                                        <v-layout align-center style="margin-top: 8px; padding-top: 0">
                                            <v-flex xs12>
                                                <div style="background-color: black; color: white; padding: 5px"><img src="switzerland.png" style="width: 13px; height: 13px"/> {{ props.item.competition.name }}</div>
                                            </v-flex>
                                        </v-layout>
                                        <v-layout align-center style="padding: 0; border-right: 1px solid black; border-left: 1px solid black; border-bottom: 1px solid black">
                                            <v-flex xs12 style="margin: 0; padding-top: 2px; padding-bottom: 2px; height: 100%">
                                                <v-layout align-start>
                                                    <v-flex class="text-xs-left" style="width: 4px; padding-left: 2px; padding-right: 2px; height: 15px; margin: 0">
                                                        <div style="background-color: red; height: 100%; width: 2px"></div>
                                                    </v-flex>
                                                    <v-flex class="text-xs-left" style="width: 100%; padding: 0; height: 15px; margin: 0">
                                                        <div style="color: orange;font-size: 80%"><span style="float: left; background-color: red; color: white; text-align: center; padding-left: 5px; padding-right: 5px; margin-right: 5px"> {{ props.item.status}}</span> {{ props.item.date }} - {{ props.item.time}}</div>
                                                    </v-flex>
                                                </v-layout>
                                                <v-layout row align-center>
                                                    <v-flex class="text-xs-left" style="width: 4px; padding-left: 2px; padding-right: 2px; height: 40px; margin: 0">
                                                        <div style="background-color: red; height: 40px; width: 2px"></div>
                                                    </v-flex>
                                                        <v-layout align-center style="width: 100%">
                                                            <v-flex sm1 hidden-xs-only align-center class="text-xs-left" style="width: 50px; padding-left: 15px">
                                                                <img :src="props.item.home_team.image" width="25"/>
                                                            </v-flex>
                                                            <v-flex sm4 xs5 align-center class="text-xs-left pd-left10">
                                                                {{ props.item.home_team.name }} 
                                                            </v-flex>
                                                            <v-flex sm2 xs2 class="text-xs-center">
                                                                <span style="background-color: black; color: orange; padding: 2px 10px; border-radius: 5px; font-size: 130%"><b>{{ props.item.score }}</b></span>
                                                            </v-flex>
                                                            <v-flex sm4 xs5 align-center class="text-xs-right pd-right10">
                                                                {{ props.item.visitor_team.name }}
                                                            </v-flex>
                                                            <v-flex sm1 hidden-xs-only align-center class="text-xs-right" style="width: 50px; padding-right: 15px">
                                                                <img :src="props.item.visitor_team.image" width="25"/>
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

                <!-- ENGLISH PREMIER LEAGUE -->
                <v-expansion-panel class="elevation-0" :value="1">
                    <v-expansion-panel-content style="background-color: green">
                        <div slot="header" class="white--text">
                            ENGLISH PREMIER LEAGUE
                        </div>
                        <v-icon slot="actions" color="white">$vuetify.icons.expand</v-icon>
                        <v-card>
                            <v-card-text style="padding: 8px">
                                <v-data-table :items="eventsByCompetition('english_premier_league_2018_2019')" class="elevation-0" hide-actions hide-headers>
                                    <template slot="items" slot-scope="props" style="height: 15px; border-spacing: 0; padding: 2px; border: 1px solid black">
                                        <v-layout align-center style="">
                                            <v-flex xs12>
                                                <div style="background-color: black; color: white; padding: 5px"><img src="switzerland.png" style="width: 13px; height: 13px"/> {{ props.item.competition.name }}</div>
                                            </v-flex>
                                        </v-layout>
                                        <v-layout align-center style="padding: 0; border: 1px solid black">
                                            <v-flex xs12 style="margin: 0; padding-top: 2px; padding-bottom: 2px; height: 100%">
                                                <v-layout align-start>
                                                    <v-flex class="text-xs-left" style="width: 4px; padding-left: 2px; padding-right: 2px; height: 15px; margin: 0">
                                                        <div style="background-color: red; height: 100%; width: 2px"></div>
                                                    </v-flex>
                                                    <v-flex class="text-xs-left" style="width: 100%; padding: 0; height: 15px; margin: 0">
                                                        <div style="color: orange;font-size: 80%"><span style="float: left; background-color: red; color: white; text-align: center; padding-left: 5px; padding-right: 5px; margin-right: 5px"> {{ props.item.status}}</span> {{ props.item.date }} - {{ props.item.time}}</div>
                                                    </v-flex>
                                                </v-layout>
                                                <v-layout row align-center>
                                                    <v-flex class="text-xs-left" style="width: 4px; padding-left: 2px; padding-right: 2px; height: 40px; margin: 0">
                                                        <div style="background-color: red; height: 40px; width: 2px"></div>
                                                    </v-flex>
                                                        <v-layout align-center style="width: 100%">
                                                            <v-flex sm1 hidden-xs-only align-center class="text-xs-left" style="width: 50px; padding-left: 15px">
                                                                <img :src="props.item.home_team.image" width="25"/>
                                                            </v-flex>
                                                            <v-flex sm4 xs5 align-center class="text-xs-left pd-left10">
                                                                {{ props.item.home_team.name }} 
                                                            </v-flex>
                                                            <v-flex sm2 xs2 class="text-xs-center">
                                                                <span style="background-color: black; color: orange; padding: 2px 10px; border-radius: 5px; font-size: 130%"><b>{{ props.item.score }}</b></span>
                                                            </v-flex>
                                                            <v-flex sm4 xs5 align-center class="text-xs-right pd-right10">
                                                                {{ props.item.visitor_team.name }}
                                                            </v-flex>
                                                            <v-flex sm1 hidden-xs-only align-center class="text-xs-right" style="width: 50px; padding-right: 15px">
                                                                <img :src="props.item.visitor_team.image" width="25"/>
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

                <!-- ITALIAN SERIE A -->
                <v-expansion-panel class="elevation-0" :value="1">
                    <v-expansion-panel-content class="orange">
                        <div slot="header" class="white--text">
                            ITALIAN SERIE A
                        </div>
                        <v-icon slot="actions" color="white">$vuetify.icons.expand</v-icon>
                        <v-card>
                            <v-card-text style="padding: 8px">
                                <v-data-table :items="eventsByCompetition('italian_serie_a_2018_2019')" class="elevation-0" hide-actions hide-headers>
                                    <template slot="items" slot-scope="props" style="height: 15px; border-spacing: 0; padding: 2px; border: 1px solid black">
                                        <v-layout align-center style="">
                                            <v-flex xs12>
                                                <div style="background-color: black; color: white; padding: 5px"><img src="switzerland.png" style="width: 13px; height: 13px"/> {{ props.item.competition.name }}</div>
                                            </v-flex>
                                        </v-layout>
                                        <v-layout align-center style="padding: 0; border: 1px solid black">
                                            <v-flex xs12 style="margin: 0; padding-top: 2px; padding-bottom: 2px; height: 100%">
                                                <v-layout align-start>
                                                    <v-flex class="text-xs-left" style="width: 4px; padding-left: 2px; padding-right: 2px; height: 15px; margin: 0">
                                                        <div style="background-color: red; height: 100%; width: 2px"></div>
                                                    </v-flex>
                                                    <v-flex class="text-xs-left" style="width: 100%; padding: 0; height: 15px; margin: 0">
                                                        <div style="color: orange;font-size: 80%"><span style="float: left; background-color: red; color: white; text-align: center; padding-left: 5px; padding-right: 5px; margin-right: 5px"> {{ props.item.status}}</span> {{ props.item.date }} - {{ props.item.time}}</div>
                                                    </v-flex>
                                                </v-layout>
                                                <v-layout row align-center>
                                                    <v-flex class="text-xs-left" style="width: 4px; padding-left: 2px; padding-right: 2px; height: 40px; margin: 0">
                                                        <div style="background-color: red; height: 40px; width: 2px"></div>
                                                    </v-flex>
                                                        <v-layout align-center style="width: 100%">
                                                            <v-flex sm1 hidden-xs-only align-center class="text-xs-left" style="width: 50px; padding-left: 15px">
                                                                <img :src="props.item.home_team.image" width="25"/>
                                                            </v-flex>
                                                            <v-flex sm4 xs5 align-center class="text-xs-left pd-left10">
                                                                {{ props.item.home_team.name }} 
                                                            </v-flex>
                                                            <v-flex sm2 xs2 class="text-xs-center">
                                                                <span style="background-color: black; color: orange; padding: 2px 10px; border-radius: 5px; font-size: 130%"><b>{{ props.item.score }}</b></span>
                                                            </v-flex>
                                                            <v-flex sm4 xs5 align-center class="text-xs-right pd-right10">
                                                                {{ props.item.visitor_team.name }}
                                                            </v-flex>
                                                            <v-flex sm1 hidden-xs-only align-center class="text-xs-right" style="width: 50px; padding-right: 15px">
                                                                <img :src="props.item.visitor_team.image" width="25"/>
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
                                <a href="equipes.html"><img src="menuShop.png">
                                <span class="textMenu">Equipes</span></a>
                            </li>
                            <li>
                                <a href="competitions.html"><img src="menuResultat.png">
                                <span class="textMenu">Compétition</span></a>
                            </li>
                            <li id="active">
                                <a href="scoremode.html"><img src="menuHome.png">
                                <span class="textMenu">Matches</span></a>
                            </li>
                            <li>
                                <a href="joueurs.html"><img src="menuSocial.png">
                                <span class="textMenu">Joueurs</span></a>
                            </li>
                            <li>
                                <a href="tifnews.html"><img src="menuResultat.png">
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
        },
        layout: 'layoutFront',
        created() {
            setTimeout(() => {
                this.$store.dispatch("events/loadedEvents")
                console.log('Done!')           
			}, 2500)
        },
        data() {
            return {
                active: "",
                allEvents: [
                    {
                        date: "01-12-2018",
                        time: "20:30",
                        home_team: {
                            name: "FC Basel",
                            slug: "fc_basel",
                            image: "https://upload.wikimedia.org/wikipedia/fr/thumb/7/72/Logo_FC_B%C3%A2le.svg/800px-Logo_FC_B%C3%A2le.svg.png"
                        },
                        visitor_team: {
                            name: "Grasshopper Zurich",
                            slug: "grasshopper_zuerich",
                            image: "https://upload.wikimedia.org/wikipedia/commons/7/7a/Logo_Signet_mit_Sterne_gelb-blau.png"
                        },
                            score: "2 - 2",
                            status: "FINISHED",
                            competition: {
                            name: "Super League",
                            slug: "swiss_super_league_2018_2019"
                        }
                    },
                    {
                        date: "01-12-2018",
                        time: "16:00",
                        home_team: {
                            name: "Young Boys",
                            slug: "young_boys",
                            image: "https://upload.wikimedia.org/wikipedia/fr/thumb/c/c2/BSC_Young_Boys.svg/396px-BSC_Young_Boys.svg.png"
                        },
                        visitor_team: {
                            name: "Neuchâtel Xamax",
                            slug: "xamax",
                            image: "https://upload.wikimedia.org/wikipedia/fr/d/d5/Logo_Neuch%C3%A2tel_Xamax.jpg"
                        },
                        score: "0 - 3",
                        status: "FINISHED",
                        competition: {
                            name: "Super League",
                            slug: "swiss_super_league_2018_2019"
                        }
                    },
                    {
                        date: "01-12-2018",
                        time: "16:00",
                        home_team: {
                            name: "Lucerne",
                            slug: "fc_lucerne",
                            image: "https://upload.wikimedia.org/wikipedia/fr/thumb/7/77/Logo_FC_Lucerne.svg/1024px-Logo_FC_Lucerne.svg.png"
                        },
                        visitor_team: {
                            name: "Thun",
                            slug: "thun",
                            image: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/24/FC_Thun_Logo_2011.svg/800px-FC_Thun_Logo_2011.svg.png"
                        },
                        score: "2 - 1",
                        status: "FINISHED",
                        competition: {
                            name: "Super League",
                            slug: "swiss_super_league_2018_2019"
                        }
                    },
                    {
                        date: "01-12-2018",
                        time: "16:00",
                        home_team: {
                            name: "Manchester United",
                            slug: "manchester_united",
                            image: "https://upload.wikimedia.org/wikipedia/fr/b/b9/Logo_Manchester_United.svg"
                        },
                        visitor_team: {
                            name: "Chelsea",
                            slug: "chelsea",
                            image: "https://upload.wikimedia.org/wikipedia/fr/5/51/Logo_Chelsea.svg"
                        },
                        score: "2 - 2",
                        status: "FINISHED",
                        competition: {
                            name: "Premier League",
                            slug: "english_premier_league_2018_2019"
                        }
                    },
                    {
                        date: "01-12-2018",
                        time: "16:00",
                        home_team: {
                            name: "Southampton",
                            slug: "southampton",
                            image: "https://upload.wikimedia.org/wikipedia/fr/thumb/5/54/Southampton_FC.svg/800px-Southampton_FC.svg.png"
                        },
                        visitor_team: {
                            name: "Everton",
                            slug: "everton",
                            image: "https://upload.wikimedia.org/wikipedia/fr/0/07/Everton_F.C._%282014%E2%80%93%29.png"
                        },
                        score: "0 - 1",
                        status: "FINISHED",
                        competition: {
                            name: "Premier League",
                            slug: "english_premier_league_2018_2019"
                        }
                    },
                    {
                        date: "01-12-2018",
                        time: "16:00",
                        home_team: {
                            name: "Inter Milan",
                            slug: "inter_milan",
                            image: "https://upload.wikimedia.org/wikipedia/commons/8/89/FC_Internazionale_Milano_2014.svg"
                        },
                        visitor_team: {
                            name: "Juventus",
                            slug: "juventus",
                            image: "https://upload.wikimedia.org/wikipedia/commons/1/15/Juventus_FC_2017_logo.svg"
                        },
                        score: "3 - 2",
                        status: "FINISHED",
                        competition: {
                            name: "Serie A",
                            slug: "italian_serie_a_2018_2019"
                        }
                    }
                ]
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
            }
        },
        methods: {
            eventsByCompetition (competition) {
                return this.allEvents.filter(event => event.competition.slug === competition)
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
        -webkit-gradient(linear, left top, left bottom, from(transparent), color-stop(0.7, transparent), to(rgba(255,255,255,.5)));
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
            -webkit-gradient(linear, left top, left bottom, from(transparent), color-stop(0.7, transparent), to(rgba(255,255,255,.5)));
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
</style>