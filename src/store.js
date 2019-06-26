import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
const now = new Date();
const store = new Vuex.Store({
  state: {
    isAllowedAction: true, // true 是人操作，false为机器操作
    // 当前用户
    user: {
      name: '',
      img: 'dist/images/1.jpg'
    },
    // 会话列表
    sessions: [{
        id: 1,
        user: {
          name: '示例介绍',
          img: 'static/img/1.dd49ecb8.jpg'
        },
        messages: [{
          content: 'Hello，这是一个基于Vue + Vuex + Webpack构建的简单chat示例，聊天记录保存在localStorge, 有什么问题可以通过Github Issue问我。',
          date: now
        }, {
          content: '项目地址: https://github.com/coffcer/vue-chat',
          date: now
        }]
      },
      {
        id: 2,
        user: {
          name: 'webpack',
          img: 'static/img/2.9fb592e9.png'
        },
        messages: []
      }
    ],
    // 当前选中的会话
    currentSessionId: 1,
    // 过滤出只包含这个key的会话
    filterKey: ''
  },
  getters: {
    isAllowedAction: state => {
      return state.isAllowedAction
    },
    user: state => {
      let userInfo = JSON.parse(localStorage.getItem('userInfo'))
      state.user.name = userInfo.username
      return state.user
    },
    sessions: state => {
      return state.sessions
    },
    currentId: state => {
      return state.currentSessionId
    }
  },
  mutations: {
    setIsAllowedAction(state, flag) {
      state.isAllowedAction = flag
    },
    setUserInfo(state, data) {
      localStorage.setItem('userInfo', JSON.stringify(data))
      state.user.name = data.username
    },
    setCurrentSessionId(state, id) {
      state.currentSessionId = id
    },
    sendMessage(state, val) {
      let session = state.sessions.find(item => item.id === state.currentSessionId);
      session.messages.push({
        content: val,
        date: new Date(),
        self: true
      });
    }
  },
  actions: {

  }
})

export default store;