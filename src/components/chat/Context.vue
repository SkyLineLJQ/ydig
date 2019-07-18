<template>
  <div class="text" v-if="currentId">
    <textarea
      placeholder="按 Ctrl + Enter 发送"
      v-model="content"
      @keyup="onKeyup"
    ></textarea>
  </div>
</template>

<script>
import { socket } from "../../main";
import { mapGetters } from "vuex";

export default {
  name: "Context",
  data() {
    return {
      content: ""
    };
  },
  computed: {
    ...mapGetters(["currentId"])
  },
  mounted() {
    let self = this;
    //添加socket事件监听
    this.sockets.subscribe("saveHistory", data => {
      self.$store.commit('saveHistory',data)
    });
  },
  methods: {
    onKeyup(e) {
      let self = this;
      if (e.ctrlKey && e.keyCode === 13 && this.content.length) {
        let promise = new Promise(function(resove, reject) {
          if (self.sendMessage(self.content)) {
            resove(true);
          } else {
            reject(e);
          }
        });
        promise.then(
          success => {
            self.content = "";
          },
          fail => {
            console.log(fail);
          }
        );
      }
    },
    sendMessage(message) {
      let self = this;
      let data = {
        messages: message,
        currentId: self.currentId
      };
      self.$socket.emit("ChatMessages", data);
      return true;
    }
  }
};
</script>


<style lang="less" scoped>
.text {
  height: 160px;
  border-top: solid 1px #ddd;

  textarea {
    padding: 10px;
    height: 100%;
    width: 100%;
    border: 1px solid #eeeeee;
    outline: none;
    font-family: "Micrsofot Yahei";
    resize: none;
  }
}
</style>