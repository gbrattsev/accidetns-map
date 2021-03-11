import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import firebaseConfig from './plugins/firebase'
import firebase from 'firebase'
import vuetify from './plugins/vuetify';
import '@babel/polyfill'
import 'roboto-fontface/css/roboto/roboto-fontface.css'
// import '@mdi/font/css/materialdesignicons.css'

Vue.config.productionTip = false

firebase.initializeApp(firebaseConfig)
require("firebase/firestore");

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
