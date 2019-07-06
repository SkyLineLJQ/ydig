<template>
  <div id="chat">
    <div class="sidebar">
      <Card></Card>
      <List></List>
    </div>
    <div class="main">
      <Message></Message>
      <Context></Context>
    </div>
  </div>
</template>

<script>
import Card from "../components/chat/Card";
import List from "../components/chat/List";
import Context from "../components/chat/Context";
import Message from "../components/chat/Message";
import { socket } from "../main";

export default {
  name: "Chat",
  components: {
    Card: resolve => {
      require(["../components/chat/Card"], resolve);
    },
    List: resolve => {
      require(["../components/chat/List"], resolve);
    },
    Message: resolve => {
      require(["../components/chat/Message"], resolve);
    },
    Context: resolve => {
      require(["../components/chat/Context"], resolve);
    }
  },
  created() {},
  mounted() {},
  methods: {}
};
</script>

<style lang="less" scoped>
#chat {
  margin: 20px auto;
  width: 800px;
  height: 600px;

  overflow: hidden;
  border-radius: 3px;

  .sidebar,
  .main {
    height: 100%;
  }

  .sidebar {
    float: left;
    width: 200px;
    color: #f4f4f4;
    background-color: #2e3238;
  }

  .main {
    position: relative;
    overflow: hidden;
    background-color: #eee;
  }

  .text {
    position: absolute;
    width: 100%;
    bottom: 0;
    left: 0;
  }

  .message {
    height: ~"calc(100% - 160px)";
  }
}
</style>