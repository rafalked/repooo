import Vue from 'vue'
import App from './App.vue'
import * as firebase from 'firebase'
import vuetify from './plugins/vuetify';
import router from './router'
import {store} from './store'
import DateFilter from './filter/date'
import AlertCmp from './components/shared/alert.vue'

Vue.config.productionTip = false
Vue.filter('date', DateFilter)
Vue.component('app-alert', AlertCmp)

new Vue({
  vuetify,
  router,
  store,
  render: h => h(App),
  created () {
    firebase.initializeApp({
      apiKey: 'AIzaSyBaBm6s-hNrbJViXxtYDGhCHnLo9_eqOKs',
      authDomain: 'meetingsmanager-c33a9.firebaseapp.com',
      databaseURL: 'https://meetingsmanager-c33a9.firebaseio.com',
      projectId: 'meetingsmanager-c33a9',
      storageBucket: 'meetingsmanager-c33a9.appspot.com',
    })
  }
}).$mount('#app')
