import Vue from 'vue'
import Vuex from 'vuex'
import Game1 from './models/game1'
import Chat from './models/chat'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    Game1,
    Chat
  },
  strict: false
})

export default store;