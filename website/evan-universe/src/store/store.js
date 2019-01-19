import Vue from 'vue'
import Vuex from 'vuex'

import UserCtl from './modules/UserCtl'
import System from './modules/System'
import BlogCtl from './modules/BlogCtl'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
      UserCtl,
      System,
      BlogCtl
    },
    // strict: debug,
    // plugins: debug ? [createLogger()] : []
})
