<template>
  <div class="list">
    <span v-show="false">{{sessions}}</span>
    <ul>
      <li v-for="item in sessions" :key="item.socketId" :class="{ active: item.socketId === currentId } "
        @click="selectSession(item.socketId)" v-if="item.socketId != user.socketId">
        <img class="avatar" width="30" height="30" :src="item.img" :alt="item.userName">
        <p class="name">{{item.userName}} </p>
      </li>
    </ul>
  </div>
</template>

<script>
  import {
    mapGetters
  } from "vuex";

  export default {
    name: "List",
    computed: {
      ...mapGetters(["currentId",'sessions']),
    },
    data() {
      return {
        socketId: "",
        user: {}
      };
    },
    mounted() {
      let self = this;
      this.getUser()
      //添加socket事件监听
    },
    methods: {
      /**
       * @description: 选中当前对话的id
       * @param {id}
       * @return:
       */
      selectSession(val) {
        let self = this;
        self.$store.commit("setCurrentId", val);
      },
      getUser() {
        let self = this
        let socketId = localStorage.getItem('userInfo')
        let node = ''
        if (socketId) {
          node = self.sessions.find((value, index, arr) => {
            return value.socketId == socketId
          })
          self.user = node
        }
      }
    }
  };
</script>

<style scoped lang="less">
  .list {
    li {
      padding: 12px 15px;
      border-bottom: 1px solid #292c33;
      cursor: pointer;
      transition: background-color 0.1s;

      &:hover {
        background-color: rgba(255, 255, 255, 0.03);
      }

      &.active {
        background-color: rgba(255, 255, 255, 0.1);
      }
    }

    .avatar,
    .name {
      vertical-align: middle;
    }

    .avatar {
      border-radius: 2px;
    }

    .name {
      display: inline-block;
      margin: 0 0 0 15px;
    }
  }
</style>