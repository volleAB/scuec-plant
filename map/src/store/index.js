import Vue from 'vue'
import Vuex from 'vuex'
import Auth from './modules/auth'
import Plant from './modules/plant'

import getters from './getters'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    Auth,
    Plant
  },
  getters
})

export default store
