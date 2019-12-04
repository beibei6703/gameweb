<template>
  <div id="news">
    <div class="container">
      <!-- 标题 -->
      <div class="title">
        <Table :gameid="gameid"></Table>
      </div>
      <!-- 左侧 -->
      <div class="left">
        <!-- 热门资讯 -->
        <Hotnews></Hotnews>
        <!-- 最强战力 -->
        <Number10></Number10>
      </div>
      <!-- 右侧 -->
      <div class="right">
        <!-- 热门预测 -->
        <Hotcompete></Hotcompete>
        <!-- 战队排行 -->
        <Teamrank v-if="gameid==1||gameid==2"></Teamrank>
        <!-- 英雄排行 -->
        <Herosrank></Herosrank>
      </div>
    </div>
  </div>
</template>
<script>
import Table from "./news/Table";
// 左侧
import Hotnews from "./news/Hotnews";
import Number10 from "./news/Number10";
// 右侧
import Hotcompete from "./news/Hotcompete";
import Teamrank from "./news/Teamrank";
import Herosrank from "./news/Herosrank";
export default {
  data() {
    return {};
  },
  components: {
    Table,
    Hotnews,
    Number10,
    Hotcompete,
    Teamrank,
    Herosrank
  },
  computed: {
    gameid: function() {
      console.log(this.$store.state.news.gameid,'news变化吗？')
      return this.$store.state.news.gameid;
    }
  }
};
</script>
<style scoped lang="scss">
.container {
  width: 1200px;
  margin: 0 auto;
  margin-top: 312px;
  height: 1740px;
  background: #1b1c20;
  .left {
    float: left;

  }
  .right {
    float: right;
  }
}
</style>



