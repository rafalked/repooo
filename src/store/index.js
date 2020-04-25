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
        setLoadedMeeting(state, payload){
          state.loadedMeetings = payload
        },
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
        },
        setCreatedMeetingKey (state, payload) {
            state.createdMeetingKey = payload
        },
        updateMeeting (state, payload){
            const meeting = state.loadedMeetings.find(meeting=>{
                return meeting.id === payload.id
            })
            if (payload.title){
                meeting.title = payload.title
            }
            if (payload.description){
                meeting.description = payload.description
            }
            if (payload.date){
                meeting.date = payload.date
            }
        }

        },
    actions: {
        loadMeetings({commit}){
            commit('setLoading', true)
            firebase.database().ref('meetings').once('value')
                .then((data)=>{
                    const meetings =[]
                    const obj = data.val()
                    for(let key in obj){
                        meetings.push({
                            id: key,
                            title: obj[key].title,
                            description: obj[key].description,
                            imageUrl: obj[key].imageUrl,
                            date: obj[key].date,
                            location: obj[key].location,
                            creatorID: obj[key].creatorID
                        })
                    }
                    commit('setLoadedMeeting', meetings)
                    commit('setLoading', false)
                })
                .catch((error)=>{
                    console.log(error)
                    commit('setLoading', false)
            })
        },
        createMeeting ({commit, getters}, payload){
            const meeting = {
                title: payload.title,
                location: payload.location,
                description: payload.description,
                date: payload.date.toISOString(),
                creatorID: getters.user.id,
                createdMeetingKey: '',
            }
            let imageUrl
            let key
            firebase.database().ref('meetings').push(meeting)
                .then((data)=>{
                  const key = data.key
                    return key
                })
                .then(key=>{
                    const filename = payload.image.name
                    const ext = filename.slice(filename.lastIndexOf('.'))
                    commit('setCreatedMeetingKey', key)
                    return firebase.storage().ref('meetings/' + key + '.' + ext).put(payload.image)
                })
                .then(fileData => {
                    let fullPath = fileData.metadata.fullPath
                    return firebase.storage().ref(fullPath).getDownloadURL()
                })
                .then(URL => {
                    imageUrl = URL
                    key = getters.createdMeetingKey
                    return firebase.database().ref('meetings').child(key).update({imageUrl: imageUrl})
                })
                .then(()=>{
                    commit('createMeeting', {
                        ...meeting,
                        imageUrl: imageUrl,
                        id: key
                     })
                })
                .catch((error)=>{
                    console.log(error)
            })
            //reach out to firebase and store it
        },
        updateMeetingData({commit}, payload){
            commit('setLoading', true)
            const updateObj = {}
            if(payload.title){
                updateObj.title = payload.title
            }
            if(payload.description){
                updateObj.description = payload.description
            }
            if(payload.date){
                updateObj.date = payload.date
            }
            firebase.database().ref('meetings').child(payload.id).update(updateObj)
                .then(()=>{
                    commit('updateMeeting', payload)
                    commit('setLoading', false)
                })
                .catch(error => {
                    console.log(error)
                    commit('setLoading', false)
                })
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
        autoSignIn({commit}, payload){
            commit('setUser', {id: payload.uid, registeredMeetings: []})
        },
        logout({commit}){
            firebase.auth().signOut()
            commit('setUser', null)
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
        },
        createdMeetingKey (state) {
            return state.createdMeetingKey
        }

    }
})
