import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js'
import VueSocketIO from 'vue-socket.io'

Vue.config.productionTip = false

// let ip = "127.0.0.1"; // !!!!!!!!!!!!!   该地址为调试地址  随时记得要更换 !!!!!!!!!!!!
let ip = "192.168.3.188"; // !!!!!!!!!!!!!   该地址为调试地址  随时记得要更换 !!!!!!!!!!!!
let socket = io("http://" + ip + ":3000");// 连接socket 

Vue.use(new VueSocketIO({
  debug: true,
  connection: socket,
  vuex: {
      store,
      actionPrefix: 'SOCKET_',
      mutationPrefix: 'SOCKET_'
  },
  options: { path: "/ydig" } //Optional options
}))


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

export { socket }  //导出