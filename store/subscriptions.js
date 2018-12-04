import * as firebase from "firebase/app";
import "firebase/database";
import Noty from 'noty'
import axios from 'axios'
import moment from 'moment'

export const state = () => ({
	loadedSubscriptions: [],
	loadedUserSubscriptions: []
})

export const mutations = {
	setUserSubscriptions(state, payload) {
		// console.log('def')
		state.loadedUserSubscriptions = payload
	},
    createSubscription (state, payload) {
        state.loadedSubscriptions.push(payload)
    },
}

export const actions = {
    // Load all subscriptions
    loadedSubscriptions ({commit}) {
        // console.log('loadedSubscriptions')
        // firebase.database().ref('/subscriptions/').once('value').then(function (snapshot) {
        firebase.database().ref('/subscriptions/').on('value', function (snapshot) {
            const subscriptionsArray = []
            for (const key in snapshot.val()) {
                subscriptionsArray.push({ ...snapshot.val()[key], id: key})
            }
            commit('setsubscriptions', subscriptionsArray)

            // snapshot.forEach(function(childSnapshot) {
            //     let childData = childSnapshot.val()
            // })
            // commit('setsubscriptions', childData)

        })
	},
	loadedUserSubscriptions2 ({commit}, endpoint) {
    	firebase.database().ref('/subscriptions/').orderByChild('endpoint').equalTo(endpoint).once('value').then(function (snapshot) {
	      	// console.log(snapshot.val())
	      	const subscriptionsArray = []
	      	for (const key in snapshot.val()) {
	        	subscriptionsArray.push({ ...snapshot.val()[key], id: key})
	      	}
	      	// console.log(postsArray)
	      	commit('setUserSubscriptions', subscriptionsArray)
	    })
  	},
	async loadedUserSubscriptions ({commit}, endpoint) {
		try {
			const snapshot = await firebase.database().ref('/subscriptions/')
			  .orderByChild("endpoint")
			  .equalTo(endpoint)
			  .once('value')
			
			const subscriptionsArray = []

			for (const key in snapshot.val()) {
				subscriptionsArray.push({...snapshot.val()[key], id: key})
			}
			console.log('subscriptionsArray: ', subscriptionsArray)
			commit('setUserSubscriptions', subscriptionsArray)
			return subscriptionsArray

		}
		catch (error) {
			console.log('error: ', errror)
			throw new Error(error);
		}
	},

    // Create a new subscription
    async createSubscription_TOBEDELTED ({commit, getters}, payload) {
        // commit('setLoading', true, { root: true })
        let updates = {};

        console.log(payload)
        const teams = payload.teams
        const newSub = payload.newSub
        const userId = firebase.auth().currentUser.uid

        for (let team of teams) {
            const dataObject = {
                endpoint: newSub.endpoint,
                keys: newSub.keys,
                user_id: userId,
                created_at: moment().unix(),
                team: {
                    name: team.name,
                    slug: team.slug
                }
            }
            console.log('dataObject: ', dataObject)

            const newSubscriptionKey = firebase.database().ref().child("/subscriptions/").push().key;
            updates["/subscriptions/" + newSubscriptionKey] = dataObject;
        }
        console.log('updates: ', updates)

        return
    },

    // Update a subscription
    updateSubscription ({commit, dispatch}, payload) {
        commit('setLoading', true, { root: true})
        console.log(payload)
        // return

        let updates = {}
        updates['/subscriptions/'] = payload

        firebase.database().ref().update(updates).then(() => {
            dispatch('loadedSubscriptions')
            commit('setLoading', false, { root: true })
            new Noty({type: 'success', text: 'Subscription modifiée avec succès!', timeout: 5000, theme: 'metroui'}).show()
        }).catch((error) => {
            console.log(error)
            commit('setLoading', false, { root: true })
            commit('setError', error, { root: true })
            new Noty({type: 'error', text: 'Subscription non modifiée. Erreur: ' + error, timeout: 5000, theme: 'metroui'}).show()
        })
    },

    // Delete a subscription
    async deleteSubscription ({commit, dispatch, rootState}, endpoint) {
        try {
            console.log('endpoint: ', endpoint)
            commit('setLoading', true, { root: true })
            let updates = {}

            const snapshot = await firebase.database().ref('/subscriptions').orderByChild('endpoint').equalTo(endpoint).once('value')


            console.log('snapshot: ', snapshot)
            console.log('snapshot.val(): ', snapshot.val())
            const deletedSubscriptions = []
            snapshot.forEach((childSnapshot) => {
                console.log('childSnapshot.key: ', childSnapshot.key)
                console.log('childSnapshot2: ', childSnapshot.val())
                console.log('childSnapshot3: ', childSnapshot.val().team)
                deletedSubscriptions.push(childSnapshot.val().team)
                updates['/subscriptions/' + childSnapshot.key] = null         
            })

            console.log('updates: ', updates)
            console.log('deletedSubscriptions: ', deletedSubscriptions)

            const snapshot2 = await firebase.database().ref().update(updates)
            // console.log('snapshot2: ', snapshot2)
            return deletedSubscriptions
            return snapshot2
        }
        catch (error) {
            console.log('error: ', error)
            throw new Error(error);
        }
    }
}

export const getters = {
    loadedSubscriptions(state) {
        return state.loadedSubscriptions
	},
	loadedUserSubscriptions(state) {
		return state.loadedUserSubscriptions
	}
}