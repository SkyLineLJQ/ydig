/**
* @description: 一个小游戏，人机轮流拿箱子里的10个球，
* 规则：一次可以从箱子中拿走一个放到自己的盘子里，或者从对方的盘子中拿走一个最终谁的盘子里的数量大谁就获胜
* @return:
*/
<template>
  <div class="app">
    <main class="container">
      <div class="userArea">
        <el-card class="box-card user-card">
          <div slot="header" class="clearfix">
            <span>Your Tray</span>
            <label style="float: right; padding: 3px 0" type="text">总分:{{sumUser}}</label>
          </div>
          <div class="text item">
            <el-main style="text-align: center;">
              <span v-for="item in userValue" :key="item" class="button-number">
                <template>
                  <el-button type="success" :icon="'iconfont icon-shuzi'+item" circle></el-button>
                </template>
              </span>
            </el-main>
          </div>
        </el-card>
      </div>
      <el-main style="text-align: center;" class="publicArea">
        <span v-for="item in Options" :key="item" class="button-number">
          <template>
            <el-button type="warning" icon="el-icon-star-on" circle @click="handleGetBallValue(item)"></el-button>
          </template>
        </span>
      </el-main>
      <div class="roobotsArea">
        <el-card class="box-card user-card">
          <div slot="header" class="clearfix">
            <span>Robot's Tray</span>
            <label style="float: right; padding: 3px 0" type="text">总分:{{sumRobot}}</label>
          </div>
          <div class="text item">
            <el-main style="text-align: center;">
              <span v-for="item in robotValue" :key="item" class="button-number">
                <template>
                  <el-button type="info" icon="el-icon-star-off" circle></el-button>
                </template>
              </span>
            </el-main>
          </div>
        </el-card>
      </div>
    </main>
  </div>
</template>

<script>
  import {
    mapGetters
  } from "vuex";

  export default {
    name: "",
    data() {
      return {
        Options: [],
        userValue: [], // 用户拿分的数组
        robotValue: [], //机器人得分的数组
        sumUser: 0,
        sumRobot: 0
      };
    },
    created() {},
    mounted() {
      let self = this;
      // 初始化小球数据
      self.initBalls();
    },
    computed: {
      ...mapGetters(["isAllowedAction"])
    },
    components: {},
    methods: {
      initBalls() {
        let self = this;
        self.userValue = []
        self.robotValue = []
        self.sumUser = self.sumRobot = 0
        while (self.Options.length != 10) {
          let key = Math.floor(Math.random() * 10);
          if (!self.Options.includes(key)) {
            self.Options.push(key);
          }
        }
      },
      handleGetBallValue(val) {
        let self = this;
        if (self.isAllowedAction) {
          self.hanldeUserClick(val); // 人取球
        }
      },
      hanldeUserClick(val) {
        let self = this;
        self.userValue.push(val);
        let index = self.Options.findIndex((value, index, arr) => {
          return val === value;
        });
        self.Options.splice(index, 1);
        self.sumUser += val;
        // 设置机器人操作状态
        self.$store.commit("setIsAllowedAction", false);
        setTimeout(() => {
          self.handleRobotClick();
        }, 1000);
        self.isGameEnd()
      },
      handleRobotClick() {
        let self = this;
        let index = Math.floor(Math.random() * 10) % self.Options.length;
        self.robotValue.push(self.Options[index]);
        self.sumRobot += self.Options[index];
        self.Options.splice(index, 1);
        self.$store.commit("setIsAllowedAction", true);
        self.isGameEnd()
      },
      /**
       * @description: 判断游戏是否结束
       * @param {type}
       * @return:
       */
      isGameEnd() {
        let self = this;
        if (self.Options.length === 0) {
          let text = self.sumUser > self.sumRobot ? '恭喜你赢了~' : '很遗憾你输了!'
          self.$confirm(text, "游戏结束", {
            confirmButtonText: "确定",
            center: true,
            showCancelButton: false,
            type: 'success'
          }).then(()=>{
            // 重置游戏
            self.initBalls()
          });
        }
      }
    }
  };
</script>

<style scoped lang="scss">
  @import "../assets/css/Game1.scss";
  @import "../assets/svg/font/iconfont.css";

  .app {
    height: 100%;
    width: 100%;
    display: flex;
    margin-top: 1%;
    justify-content: center;
    align-items: center;
    background: linear-gradient(to bottom right, #50a3a2, #53e3a6);
  }

  .container {
    width: 100%;
    height: 700px;
    display: flex;
  }
</style>