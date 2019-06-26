<template>
  <div class="list">
    <ul>
      <li v-for="item in sessions" :key="item.id" :class="{ active: item.id === currentId } "
        @click="selectSession(item.id)">
        <img class="avatar" width="30" height="30" :src="item.user.img" :alt="item.user.name">
        <p class="name">{{item.user.name}} </p>
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
      ...mapGetters(["sessions", "currentId"])
    },
    data() {
      return {};
    },
    methods: {
      /**
       * @description: 选中当前对话的id
       * @param {id}
       * @return:
       */
      selectSession(val) {
        let self = this;
        self.$store.commit("setCurrentSessionId", val);
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