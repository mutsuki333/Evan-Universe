import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/store'
import axios from 'axios'

axios.defaults.baseURL = 'http://localhost:5000';
// axios.defaults.baseURL = 'http://54.71.220.94/EU';
axios.defaults.withCredentials=true;

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
