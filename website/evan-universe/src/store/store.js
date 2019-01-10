import Vue from 'vue'
import Vuex from 'vuex'

import UserCtl from './modules/UserCtl'
import System from './modules/System'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
      UserCtl,
      System
    },
    // strict: debug,
    // plugins: debug ? [createLogger()] : []
})
