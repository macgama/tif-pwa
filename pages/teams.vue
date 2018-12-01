<template>
	<v-layout align-center justify-center row fill-height>
		<v-flex xs12 sm10 md8 lg6>
			<v-card class="card">
				<v-card-title primary-title>
					<v-flex xs6>
						<h2 class="white--text text-xs-left">TES EQUIPES</h2>
					</v-flex>
					<v-flex xs6 class="text-xs-right">
						<fa :icon="['fas', 'arrow-circle-left']" size="2x" class="icon" @click="goBack" />
					</v-flex>
				</v-card-title>

				<v-card-text class="card-text mx-3">
					<div class="text-xs-center">
						<h3>Tu supportes {{ loadedUserTeams.length > 1 ? loadedUserTeams.length + ' équipes' : loadedUserTeams.length + ' équipe' }}:</h3>
						<!-- <b>loadedUserTeams:</b> {{ loadedUserTeams }}<br /><br /> -->
						<!-- <b>loadedCompetitions:</b> {{ loadedCompetitions }}<br /><br /> -->
						<!-- <b>loadedTeamsByCompetition:</b> {{ loadedTeamsByCompetition }}<br /><br /> -->
						<!-- <b>selectedCompetition:</b> {{ selectedCompetition }}<br /><br /> -->
						<!-- <b>selectedTeams:</b> {{ selectedTeams }}<br /><br /> -->
					</div>

					<v-container grid-list-md fluid>
						<v-layout align-center justify-center>
							<v-flex v-for="team in loadedUserTeams" :key="team.slug" xs4 sm3 md2 d-flex>
									<v-card flat tile class="d-flex">
										<v-card-text class="px-0">
											<v-img :src="'/images/teams/' + team.image" :lazy-src="'/images/icon.png'" aspect-ratio="1">
											</v-img>
										</v-card-text>
									</v-card>
							</v-flex>
						</v-layout>
					</v-container>

					<v-expansion-panel class="elevation-0" :value="0">
						<v-expansion-panel-content class="blue">
							<div slot="header" class="text-xs-center white--text">SELECTIONNE UN CHAMPIONNAT</div>
							<v-icon slot="actions" color="white">$vuetify.icons.expand</v-icon>

							<v-container grid-list-md fluid>
								<v-layout row wrap align-center justify-center>
									<v-flex v-for="competition in loadedCompetitions" :key="competition.slug" xs4 sm3 md2 d-flex>
										<v-card flat tile class="d-flex card-img" :class="[selectedCompetition.slug === competition.slug ? 'active' : '']" @click="selectCompetition(competition)">
											<v-card-text class="px-0">
												<v-img :src="'/images/competitions/' + competition.image" :lazy-src="'/images/icon.png'" aspect-ratio="1">
												</v-img>
											</v-card-text>
										</v-card>
									</v-flex>
								</v-layout>
							</v-container>
						</v-expansion-panel-content>
					</v-expansion-panel>

					<br /><br />

					<v-expansion-panel class="elevation-0" v-if="selectedCompetition" :value="0">
						<v-expansion-panel-content class="blue">
							<div slot="header" class="text-xs-center white--text">CHOISIS UNE OU DES EQUIPES</div>
							<v-icon slot="actions" color="white">$vuetify.icons.expand</v-icon>

							<v-container grid-list-md fluid>
								<v-layout row wrap align-center justify-center v-if="loadedTeamsByCompetition.length > 0">
									<v-flex v-for="team in loadedTeamsByCompetition" :key="team.slug" xs4 sm3 md2 d-flex>
										<v-card flat tile class="d-flex card-img" @click="selectTeam(team)" :class="{active: selectedTeams.findIndex(e => e.id === team.id) != -1}">
											<v-card-text class="px-0">
												<v-img :src="'/images/teams/' + team.image" :lazy-src="'/images/icon.png'" aspect-ratio="1"></v-img>
											</v-card-text>
										</v-card>
									</v-flex>
								</v-layout>
								<v-layout row wrap v-else>
									<v-alert
									  :value="true"
									  type="error"
									>
										Il n'y a aucune équipe sélectionnable dans cette compétition
									</v-alert>
								</v-layout>
							</v-container>
						</v-expansion-panel-content>
					</v-expansion-panel>
				</v-card-text>

				<v-card-actions class="card-footer">
					<v-flex class="text-xs-center">
						<v-btn color="success" class="elevation-0" @click="saveTeams">Save</v-btn>
						<v-btn nuxt color="error" to="/" class="elevation-0">Go back</v-btn>
						<v-btn class="elevation-0">Clear</v-btn>
					</v-flex>
				</v-card-actions>
			</v-card>
		</v-flex>
	</v-layout>
</template>

<script>
	export default {
		head: {
			title: 'Teams',
		},
		layout: "layoutFront",
		// middleware: ['auth-check'],
		created () {
			this.$store.dispatch('competitions/loadedCompetitions')
			this.$store.dispatch('users/loadedUserTeams')
			this.$store.dispatch('teams/loadedTeams')

			for (let team of this.loadedUserTeams) {
                this.selectedTeams.push(team)
            }
		},
		data() {
			return {
				selectedCompetition: '',
				selectedTeams: []
			}
		},
		computed: {
			loadedUser() {
				return this.$store.getters["users/loadedUser"]
			},
			loadedCompetitions () {
    			return this.$store.getters['competitions/loadedCompetitions'].filter(competition => competition.active === true && competition.type === 'main' && competition.geo === 'national')
    		},
			loadedUserTeams () {
            	return this.$store.getters['users/loadedUserTeams']
			},
			loadedTeamsByCompetition () {
				console.log('Call to loadedTeamsByCompetition')
				// console.log('competitionId: ', competitionId)
				// return

                const teams = []
                const competition_id = this.selectedCompetition.id
				this.$store.getters['teams/loadedTeams']
					// .filter(team => team.competitions.incudes(competition_id))
					.forEach(function (team) {
						// console.log('team: ', team)
						if (team.competitions) {
							if (team['competitions'][competition_id]) {
								teams.push(team)
							}
						}
					})
				console.log('teams: ', teams)
                return teams
            },
		},
		methods: {
			selectCompetition(competition) {
				console.log('competition: ', competition)
				this.selectedCompetition = competition
				this.loadedTeamsByCompetition
			},
			selectTeam (team) {
                // this.isActive = !this.isActive
                console.log('selectTeam')
                console.log('team.id: ', team.id)
                // const selectedTeam = {id: team.id, name: team.name}
                const selectedTeam = team
                console.log('selectedTeam: ', selectedTeam)
                // return
                // console.log(selectedTeam)
                const index = this.selectedTeams.findIndex(el => el.id === team.id)
                console.log('index: ' + index)
                // if (!this.selectedTeams.includes(selectedTeam)) {
                if (!this.selectedTeams.find(el => el.id === selectedTeam.id)) {
					this.selectedTeams.push(selectedTeam)
                } else {
                    this.selectedTeams.splice(index, 1)
                }
			},
			async saveTeams () {
                console.log('saveTeams')
                console.log(this.selectedTeams)
				await this.$store.dispatch('users/updateUserTeams', this.selectedTeams)
                // this.$router.replace('/home')
			},
			clear () {
                this.selectedTeams = []
            },
			goBack() {
				this.$router.replace("/home")
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
		/* background-color: whitesmoke; */

	}
	.icon:hover {
		cursor: pointer;
		color: #fff;
	}
	.info {
		opacity: 0;
		transition: .5s ease;
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		-ms-transform: translate(-50%, -50%);
		text-align: center;
		background-color: orangered;
	}
	.card-img {
		cursor: pointer;
		opacity: 1;
		transition: .5s ease;
  		backface-visibility: hidden;
	}
	.card-img:hover {
		/* background-color: orangered; */
		opacity: 0.3;
	}
	.card-img:hover .info{
		/* background-color: orangered; */
		opacity: 1;
	}
	.v-alert {
		width: 100%;
	}
	.active {
        background: orangered;
        border: 6px solid orangered;
	}
</style>