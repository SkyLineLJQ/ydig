<template>
  <div class="text">
    <textarea placeholder="按 Ctrl + Enter 发送" v-model="content" @keyup="onKeyup"></textarea>
  </div>
</template>

<script>
  export default {
    name: "Context",
    data() {
      return {
        content: ""
      };
    },
    methods: {
      onKeyup(e) {
        let self = this
        if (e.ctrlKey && e.keyCode === 13 && this.content.length) {
          let promise = new Promise(function (resove, reject) {
            if(self.sendMessage(self.content)){
              resove(true)
            }else {
              reject(e)
            }
          })
          promise.then((success)=>{
            self.content = ''
          },(fail)=>{
            console.log(fail);
          })
        }
      },
      sendMessage(message) {
        let self = this
        self.$store.commit('sendMessage',message)
        return true
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