<template>
  <div class="message" v-scroll-bottom  v-if="currentId">
    <ul>
      <li v-for="(item,index) in messages" :key="index">
        <p class="time">
          <span>{{ item.createTime | time }}</span>
        </p>
        <div class="main" :class="{ self: item.sendId == self_Id }">
          <img class="avatar" width="30" height="30" src="../../assets/imgs/1.jpg">
          <div class="text">{{ item.text }}</div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
  import {
    mapGetters
  } from "vuex";

  export default {
    name: "Message",
    computed: {
      ...mapGetters(['sessions', 'currentId', 'messages']),
    },
    filters: {
      time(date) {
        if (date) {
          date = new Date(date);
        }
        return `${date.getHours()}:${date.getMinutes()}`;
      }
    },
    directives: {
      /*这个是vue的自定义指令,官方文档有详细说明*/
      // 发送消息后滚动到底部,这里无法使用原作者的方法，也未找到合理的方法解决，暂用setTimeout的方法模拟
      'scroll-bottom'(el) {
        //console.log(el.scrollTop);
        setTimeout(function () {
          el.scrollTop += 9999;
        }, 1)
      }
    },
    mounted() {
      this.self_Id = localStorage.getItem('userInfo')
    },
    data() {
      return {
        self_Id: ''
      }
    }
  };
</script>

<style lang="less" scoped>
  .message {
    padding: 10px 15px;
    overflow-y: scroll;

    li {
      margin-bottom: 15px;
    }

    .time {
      margin: 7px 0;
      text-align: center;

      >span {
        display: inline-block;
        padding: 0 18px;
        font-size: 12px;
        color: #fff;
        border-radius: 2px;
        background-color: #dcdcdc;
      }
    }

    .avatar {
      float: left;
      margin: 0 10px 0 0;
      border-radius: 3px;
    }

    .text {
      display: inline-block;
      position: relative;
      padding: 0 10px;
      max-width: ~"calc(100% - 40px)";
      min-height: 30px;
      line-height: 2.5;
      font-size: 12px;
      text-align: left;
      word-break: break-all;
      background-color: #fafafa;
      border-radius: 4px;

      &:before {
        content: " ";
        position: absolute;
        top: 9px;
        right: 100%;
        border: 6px solid transparent;
        border-right-color: #fafafa;
      }
    }

    .self {
      text-align: right;

      .avatar {
        float: right;
        margin: 0 0 0 10px;
      }

      .text {
        background-color: #b2e281;

        &:before {
          right: inherit;
          left: 100%;
          border-right-color: transparent;
          border-left-color: #b2e281;
        }
      }
    }
  }
</style>