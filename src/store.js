import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isAllowedAction: true // true 是人操作，false为机器操作
  },
  getters:{
    isAllowedAction: state => {
      return state.isAllowedAction
    }
  },
  mutations: {
    setIsAllowedAction (state,flag){
      state.isAllowedAction = flag
    }
  },
  actions: {

  }
})
