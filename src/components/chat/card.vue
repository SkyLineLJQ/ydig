<template>
  <div class="card">
    <header>
      <img class="avatar" width="40" height="40" src="../../assets/imgs/2.png">
      <p class="name">嗯嗯啊</p>
    </header>
    <footer>
      <input class="search" type="text" placeholder="search user..." @keyup="onKeyup">
    </footer>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "Card",
  computed: {},
  methods: {
    onKeyup(e) {
      console.log(e.target.value);
    }
  }
};
</script>

<style scoped lang="less">
.card {
  padding: 12px;
  border-bottom: solid 1px #24272c;

  footer {
    margin-top: 10px;
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
    font-size: 16px;
  }
  .search {
    padding: 0 10px;
    width: 100%;
    font-size: 12px;
    color: #fff;
    height: 30px;
    line-height: 30px;
    border: solid 1px #3a3a3a;
    border-radius: 4px;
    outline: none;
    background-color: #26292e;
  }
}
</style>