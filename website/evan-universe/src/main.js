import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/store'
import axios from 'axios'


import BootstrapVue from 'bootstrap-vue'
Vue.use(BootstrapVue);
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import '@/assets/prism.css'
// import Prism from '@/assets/prism.js'
import Prism from 'prismjs'

// axios.defaults.baseURL = 'http://localhost:5000';
axios.defaults.baseURL = 'http://54.71.220.94/EU';
axios.defaults.withCredentials=true;

Vue.config.productionTip = false

window.onload = ()=>{
  Prism.highlightAll(false)
}

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
