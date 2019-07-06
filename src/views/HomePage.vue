<template>
  <div class="wrap">
    <div class="container">
      <h1>Welcome</h1>
      <el-form
        label-position="right"
        label-width="100px"
        :model="loginForm"
        style="margin-left: 10%;"
      >
        <el-form-item label="用户名">
          <el-input
            v-model="loginForm.userName"
            style="width: 70%"
          ></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input
            v-model="loginForm.password"
            type="password"
            style="width: 70%"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            @click="toLogin"
            style="width: 70%"
          >登录</el-button>
        </el-form-item>
      </el-form>
    </div>
    <ul>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
    </ul>
  </div>
</template>

<script>
import { socket } from '../main';
export default {
  name: "",
  data() {
    return {
      loginForm: {
        userName: "",
        password: ""
      }
    };
  },
  mounted() {
    let self = this;
    //添加socket事件监听
    this.sockets.subscribe("setUserInfo", data => {
      // 将map 更新到sessons 中
      if (!sessionStorage.getItem(data.UserId)) {
        // self.$store.commit("setUserInfo", self.loginForm);
        sessionStorage.setItem(data.UserId, data.UserId);
        if (!localStorage.getItem("userInfo")) {
          localStorage.setItem("userInfo", data.UserId);
        } else {
          if (localStorage.getItem("userInfo") != data.UserId) {
            localStorage.setItem("userInfo", data.UserId);
          }
        }
      }
      setTimeout(() => {
          self.$router.push({
            path: "/Chat"
          });
      }, 500);
    });
    /**
     * @description: 有新的用户登录全局监听
     * @param {type} 
     * @return: 
     */
    this.sockets.subscribe('memberChange',data =>{
        self.$store.commit("setSessions", data);
    })
  },
  components: {},
  methods: {
    toLogin() {
      let self = this;
      //TODO: 调用登录接口
      self.$socket.emit("serverLogin", self.loginForm);
    }
  }
};
</script>

<style scoped lang="scss">
* {
  box-sizing: border-box;
}

body {
  margin: 0;
  padding: 0;
  font: 16px/20px microsft yahei;
}

.wrap {
  width: 100%;
  height: 400px;
  padding: 40px 0;
  position: fixed;
  top: 50%;
  margin-top: -200px;
  opacity: 0.8;
  background: linear-gradient(to bottom right, #50a3a2, #53e3a6);
  background: -webkit-linear-gradient(to bottom right, #50a3a2, #53e3a6);
}

.container {
  width: 60%;
  margin: 0 auto;
}

.container h1 {
  text-align: center;
  color: #ffffff;
  font-weight: 500;
}

.container input {
  width: 320px;
  display: block;
  height: 36px;
  border: 0;
  outline: 0;
  padding: 6px 10px;
  line-height: 24px;
  margin: 32px auto;
  -webkit-transition: all 0s ease-in 0.1ms;
  -moz-transition: all 0s ease-in 0.1ms;
  transition: all 0s ease-in 0.1ms;
}

.container input[type="text"],
.container input[type="password"] {
  background-color: #ffffff;
  font-size: 16px;
  color: #50a3a2;
}

.container input[type="submit"] {
  font-size: 16px;
  letter-spacing: 2px;
  color: #666666;
  background-color: #ffffff;
}

.container input:focus {
  width: 400px;
}

.container input[type="submit"]:hover {
  cursor: pointer;
  width: 400px;
}

.wrap ul {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -10;
}

.wrap ul li {
  list-style-type: none;
  display: block;
  position: absolute;
  bottom: -120px;
  width: 15px;
  height: 15px;
  z-index: -8;
  background-color: rgba(255, 255, 255, 0.15);
  animotion: square 25s infinite;
  -webkit-animation: square 25s infinite;
}

.wrap ul li:nth-child(1) {
  left: 0;
  animation-duration: 10s;
  -moz-animation-duration: 10s;
  -o-animation-duration: 10s;
  -webkit-animation-duration: 10s;
}

.wrap ul li:nth-child(2) {
  width: 40px;
  height: 40px;
  left: 10%;
  animation-duration: 15s;
  -moz-animation-duration: 15s;
  -o-animation-duration: 15s;
  -webkit-animation-duration: 15s;
}

.wrap ul li:nth-child(3) {
  left: 20%;
  width: 25px;
  height: 25px;
  animation-duration: 12s;
  -moz-animation-duration: 12s;
  -o-animation-duration: 12s;
  -webkit-animation-duration: 12s;
}

.wrap ul li:nth-child(4) {
  width: 50px;
  height: 50px;
  left: 30%;
  -webkit-animation-delay: 3s;
  -moz-animation-delay: 3s;
  -o-animation-delay: 3s;
  animation-delay: 3s;
  animation-duration: 12s;
  -moz-animation-duration: 12s;
  -o-animation-duration: 12s;
  -webkit-animation-duration: 12s;
}

.wrap ul li:nth-child(5) {
  width: 60px;
  height: 60px;
  left: 40%;
  animation-duration: 10s;
  -moz-animation-duration: 10s;
  -o-animation-duration: 10s;
  -webkit-animation-duration: 10s;
}

.wrap ul li:nth-child(6) {
  width: 75px;
  height: 75px;
  left: 50%;
  -webkit-animation-delay: 7s;
  -moz-animation-delay: 7s;
  -o-animation-delay: 7s;
  animation-delay: 7s;
}

.wrap ul li:nth-child(7) {
  left: 60%;
  animation-duration: 8s;
  -moz-animation-duration: 8s;
  -o-animation-duration: 8s;
  -webkit-animation-duration: 8s;
}

.wrap ul li:nth-child(8) {
  width: 90px;
  height: 90px;
  left: 70%;
  -webkit-animation-delay: 4s;
  -moz-animation-delay: 4s;
  -o-animation-delay: 4s;
  animation-delay: 4s;
}

.wrap ul li:nth-child(9) {
  width: 100px;
  height: 100px;
  left: 80%;
  animation-duration: 20s;
  -moz-animation-duration: 20s;
  -o-animation-duration: 20s;
  -webkit-animation-duration: 20s;
}

.wrap ul li:nth-child(10) {
  width: 120px;
  height: 120px;
  left: 90%;
  -webkit-animation-delay: 6s;
  -moz-animation-delay: 6s;
  -o-animation-delay: 6s;
  animation-delay: 6s;
  animation-duration: 30s;
  -moz-animation-duration: 30s;
  -o-animation-duration: 30s;
  -webkit-animation-duration: 30s;
}

@keyframes square {
  0% {
    -webkit-transform: translateY(0);
    transform: translateY(0);
  }

  100% {
    bottom: 400px;
    transform: rotate(600deg);
    -webit-transform: rotate(600deg);
    -webkit-transform: translateY(-500);
    transform: translateY(-500);
  }
}

@-webkit-keyframes square {
  0% {
    -webkit-transform: translateY(0);
    transform: translateY(0);
  }

  100% {
    bottom: 400px;
    transform: rotate(600deg);
    -webit-transform: rotate(600deg);
    -webkit-transform: translateY(-500);
    transform: translateY(-500);
  }
}
</style>