import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
    state: {
        loadedMeetings: [
            {imageUrl: 'https://lovecoffee.pl/public/manager/images/blog/kawa-zapaorzna-przez-bariste.jpg',
                id: 'SDd',
                title: 'Caffe?',
                date: '2020-04-26'},
            {imageUrl: 'https://www.wroclaw.pl/files/cmsdocuments/9069189/sport.jpg',
                id: 'SDd1',
                title: 'Sport?',
                date: '2020-04-27'},
            {imageUrl: 'https://assets.biggreenegg.eu/app/uploads/2018/06/28115815/topimage-pizza-special17-800x500.jpg',
                id: 'SDd2',
                title: 'Pizza?',
                date: '2020-04-28'},
        ],
        user: {
            id: 'ajsasjas12',
            registeredMeetings: ['SDd']
        }
    },
    mutations: {
        createMeeting (state, payload){
            state.loadedMeetings.push(payload)
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
        }

    }
})
