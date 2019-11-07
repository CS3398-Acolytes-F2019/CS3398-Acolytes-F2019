import Vue from 'vue'
import App from './App.vue'
import router from './router'
import firebase from 'firebase'
import './modules/Firebase'


Vue.config.productionTip = false;

let app: Vue;
firebase.auth().onAuthStateChanged(function(user) {
  if (!app) {
    app = new Vue({
      router,
      render: h => h(App)
    }).$mount('#app')
  }
})


