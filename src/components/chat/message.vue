<template>
  <div class="message">
    <ul>
      <li>
        <p class="time">
          <span>2019/01/01 10:10:10</span>
        </p>
        <div class="main self">
          <img class="avatar" width="30" height="30" src="../../assets/imgs/3.jpg">
          <div class="text">Test to Test</div>
        </div>
      </li>
      <li>
        <p class="time">
          <span>2019/01/01 10:10:10</span>
        </p>
        <div class="main">
          <img class="avatar" width="30" height="30" src="../../assets/imgs/1.jpg">
          <div class="text">Oh My God</div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "Message",
  computed: {}
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

    > span {
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