import Vue from 'vue'
import Vuex from 'vuex'
import * as firebase from 'firebase'

Vue.use(Vuex)

export const store = new Vuex.Store({
    state: {
        loadedMeetings: [
            {imageUrl: 'https://lovecoffee.pl/public/manager/images/blog/kawa-zapaorzna-przez-bariste.jpg',
                id: 'SDd',
                title: 'Caffe?',
                date: new Date (),
                location: 'Restaurant',
                description: 'Latte lover',
            },
            {imageUrl: 'https://www.wroclaw.pl/files/cmsdocuments/9069189/sport.jpg',
                id: 'SDd1',
                title: 'Sport?',
                date: new Date (),
                location: 'Football Pitch',
                description: 'Lets Play',
            },
            {imageUrl: 'https://assets.biggreenegg.eu/app/uploads/2018/06/28115815/topimage-pizza-special17-800x500.jpg',
                id: 'SDd2',
                title: 'Pizza?',
                date: '2020-04-28',
                location: new Date (),
                description: 'Yummy',
            },
        ],
        user: null,
        loading: false,
        error: null,
    },
    mutations: {
        createMeeting (state, payload){
            state.loadedMeetings.push(payload)
           },
        setUser(state, payload){
            state.user = payload
        },
        setLoading(state, payload){
            state.loading = payload
        },
        setError(state, payload){
            state.error = payload
        },
        clearError(state){
            state.error = null
        }

        },
    actions: {
        createMeeting ({commit}, payload){
            const meeting = {
                title: payload.title,
                location: payload.location,
                imageUrl: payload.imageUrl,
                description: payload.description,
                date: payload.date,
                id: 'asdasda'
            }
            //reach out to firebase and store it
            commit('createMeeting', meeting)
        },
        signUserUp({commit}, payload){
            commit('setLoading', true)
            commit('clearError')
            firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
                .then(
                    user => {
                        commit('setLoading', false)
                        const newUser ={
                            id: user.user.uid,
                            registeredMeetings: []
                        }
                        commit('setUser', newUser)
                    }
                )
                .catch(
                    error => {
                        commit('setLoading', false)
                        commit('setError', error)
                        console.log(error)
                    }
                )
        },
        signUserIn({commit}, payload){
            commit('setLoading', true)
            commit('clearError')
            firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
                .then(
                    user => {
                        commit('setLoading', false)
                        const newUser ={
                            id: user.user.uid,
                            registeredMeetings: []
                        }
                        commit('setUser', newUser)
                    }
                )
                .catch(
                    error => {
                        commit('setLoading', false)
                        commit('setError', error)
                        console.log(error)
                    }
                )
        },
        clearError({commit}){
            commit('clearError')
        }
    },
    getters:{
        loadedMeetings(state){
            return state.loadedMeetings.sort((meetingA, meetingB) => {
              return meetingA.date > meetingB.date
            })
        },
        featuredMeetings(state, getters){
            return getters.loadedMeetings.slice(0, 5)
        },
        loadedMeeting(state){
            return(meetingId) =>{
                return state.loadedMeetings.find((meeting) => {
                    return meeting.id == meetingId
                })
            }
        },
        user(state) {
            return state.user
        },
        loading(state){
            return state.loading
        },
        error(state){
            return state.error
        }

    }
})
