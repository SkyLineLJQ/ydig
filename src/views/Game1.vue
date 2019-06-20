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
            <span>玩家计分板</span>
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
            <el-progress type="circle" :percentage="percentUser" class="progress"></el-progress>
          </div>
        </el-card>
      </div>
      <el-main style="text-align: center;" class="publicArea">
        <!-- 规则说明-->
        <div class="helpRules">
          <label>游戏规则:</label>
          <p>游戏由玩家和机器人(Robot)参与,桌面上有0~9编号的10个小球，玩家和机器人轮流从桌面上取走小球放入自己的区域中，得分大的获胜。</p>
          <p style="color: #EA0B0B;text-align:center"># 玩家和机器人在第一次取走小球后可以放弃从桌面上取球的机会，获得弃掉对方盒子中的一个小球</p>
        </div>
        <el-button
          type="primary"
          @click="startGame()"
          style="width:75%;margin: 0 auto"
          v-loading="noMoreClick"
          v-show="!startFlag"
        >Let's Go!</el-button>
        <span v-for="item in Options" :key="item" class="button-number">
          <template>
            <el-button
              type="warning"
              icon="el-icon-star-on"
              circle
              @click="handleGetBallValue(item)"
              v-if="startFlag"
            ></el-button>
          </template>
        </span>
      </el-main>
      <div class="roobotsArea">
        <el-card class="box-card user-card">
          <div slot="header" class="clearfix">
            <span>机器人计分板</span>
            <label style="float: right; padding: 3px 0" type="text">总分:{{sumRobot}}</label>
          </div>
          <div class="text item">
            <el-main style="text-align: center;">
              <span v-for="item in robotValue" :key="item" class="button-number">
                <template>
                  <el-button type="info" icon="el-icon-star-off" @click="removeRobot(item)" circle></el-button>
                </template>
              </span>
            </el-main>
            <el-progress type="circle" :percentage="percentRobot" class="progress"></el-progress>
          </div>
        </el-card>
      </div>
    </main>
    <el-dialog
      title="请选择机器人等级"
      :visible.sync="DialogVisible"
      width="30%"
      center
      :close-on-click-modal="false"
      @close="DialogVisible = false,noMoreClick = false"
    >
      <el-radio-group v-model="robotClass" size="small" style="margin-left: 15%">
        <el-radio label="ZZ" border>智障</el-radio>
        <el-radio label="PT" border>普通</el-radio>
        <el-radio label="AI" border>AI</el-radio>
      </el-radio-group>

      <span slot="footer" class="dialog-footer">
        <el-button @click="DialogVisible = false,noMoreClick = false">取 消</el-button>
        <el-button type="primary" @click="setRobot" :disabled="robotClass == '' ">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { handleRobot, isAllowedDel } from "../utils/game1";

export default {
  name: "Game1",
  data() {
    return {
      Options: [],
      userValue: [], // 用户拿分的数组
      robotValue: [], //机器人得分的数组
      sumUser: 0,
      sumRobot: 0,
      startFlag: false,
      noMoreClick: false,
      DialogVisible: false,
      robotClass: "", // 机器人等级
      percentUser: 0,
      percentRobot: 0
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
  watch: {
    sumUser: function(val, oldVal) {
      this.percentUser = Math.floor((val * 100) / 35);
    },
    sumRobot: function(val, oldVal) {
      this.percentRobot = Math.floor((val * 100) / 35);
    }
  },
  components: {},
  methods: {
    initBalls() {
      let self = this;
      self.userValue = [];
      self.robotValue = [];
      self.sumUser = self.sumRobot = 0;
      self.startFlag = false;
      self.robotClass = "";
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
        handleRobot(self.robotClass, self);
      }, 1000);
    },

    startGame() {
      let self = this;
      self.noMoreClick = true;
      self.DialogVisible = true;
    },
    setRobot() {
      let self = this;
      setTimeout(() => {
        self.startFlag = true;
        self.noMoreClick = false;
        self.DialogVisible = false;
      }, 500);
      handleRobot(self.robotClass, self);
    },
    removeRobot(val) {
      let self = this;
      if (isAllowedDel(self, "USER")) {
        self.sumRobot -= val;
        let index = self.robotValue.findIndex((value, index, arr) => {
          return val === value;
        });
        self.robotValue.splice(index, 1);
        self.$store.commit("setIsAllowedAction", false);
        setTimeout(() => {
          handleRobot(self.robotClass, self);
        }, 1000);
      } else {
        self.$message.error("这是最后一个小球，您不能移除它~");
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