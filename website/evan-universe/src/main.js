import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/store'
import axios from 'axios'
import moment from 'moment-timezone'

import BootstrapVue from 'bootstrap-vue'
Vue.use(BootstrapVue);
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import '@/assets/prism.css'
// import Prism from '@/assets/prism.js'
import Prism from 'prismjs'

axios.defaults.baseURL = 'http://localhost:5000';
// axios.defaults.baseURL = 'http://192.168.128.100:5000';
// axios.defaults.baseURL = 'http://54.71.220.94/EU';
axios.defaults.withCredentials=true;

Vue.config.productionTip = false
String.prototype.splice = function (index, count, add) { return this.slice(0, index) + (add || "") + this.slice(index + count); }

window.onload = ()=>{
  Prism.highlightAll(false)
}

Vue.filter('fromNow', function (value) {
  if (!value) return ''
  value = value.toString()
  return moment.utc(value).fromNow()
})

Vue.filter('date', function (value) {
  if (!value) return ''
  value = value.toString()
  // console.log(value);
  // return moment(value).format('llll')
  return moment.utc(value).tz(moment.tz.guess()).format('MMMM Do YYYY, h:mm:ss a')
})

// router.afterEach((to, from) => {
//   console.log(to);
//   Prism.highlightAll(false)
// })


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
