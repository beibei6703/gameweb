<template>
  <div id="question">
    <!-- 左侧 -->
    <div class="left">
      <ul>
        <li v-for="(item,index) in questions" :key="index" :class="{active:index==num}" @click="titletab(index)">{{item}}</li>
      </ul>
      <div class="tell">0571 - 89990601</div>
    </div>
    <!-- 右侧 -->
    <Account v-if='num==0'></Account>
    <Prop v-if="num==1"></Prop>
    <Compete v-if="num==2"></Compete>
    <Introduce v-if="num==3"></Introduce>
    <api v-if="num==4"></api>
    <Callback v-if="num==5"></Callback>
    <Protocol v-if="num==6"></Protocol>
  </div>
</template>

<script>
import Account from "./questions/Account";
import Prop from "./questions/Prop";
import Compete from "./questions/Compete";
import Introduce from "./questions/Introduce";
import api from "./questions/api";
import Callback from "./questions/Callback";
import Protocol from "./mygrand/generalize/Protocol"
export default {
  data() {
    return {
      questions: [
        "账号问题",
        "道具问题",
        "预测问题",
        "家长监护",
        "公司简介",
        "问题反馈",
        "推广员协议"
      ],
      num: ""
    };
  },
  components: {
    Account,
    Prop,
    Compete,
    Introduce,
    api,
    Callback,
    Protocol
  },
  methods: {
    titletab(index) {
      this.num = index;
      this.$store.dispatch("flag", true);
    },
    setnum() {
      this.num = this.$route.query.num;
    }
  },
  created() {
    this.num = this.$route.query.num;
  },
  watch: {
    $route() {
      if (this.$route.path == "/question") {
        this.setnum();
        this.$store.dispatch("flag", true);
        console.log(this.$route.query.num, 8888, this.num);
      }
    }
  }
  // beforeRouteEnter(to,from,next){
  //   next(vm=>{
  //     vm.num = vm.$route.query.num
  //   })
  // },
  // // 可用作路由参数变化时对页面数据的刷新
  // beforeRouteUpdate(to,from,next){
  //   this.num = this.$route.query.num
  //   console.log(this.num);
  //   next()
  // }
};
</script>

<style scoped lang='scss'>
#question {
  margin-top: 90px;
  width: 1200px;
  .left {
    width: 275px;
    height: 737px;
    float: left;
    background-color: #15161a;
    ul {
      height: 367px;
      width: 100%;
      border-bottom: 1px solid #28282b;
      li {
        height: 61px;
        width: 100%;
        line-height: 61px;
        text-align: center;
        font-size: 18px;
        color: #dcdcdc;
        border-top: 1px solid #28282b;
        border-bottom: 1px solid #000000;
        background: url("../assets/images/News-images/questionright.png") 250px
          center no-repeat;
        &.active {
          color: #e1c076;
          background: url("../assets/images/News-images/questionright-hover.png")
            250px center no-repeat;
        }
        &:first-child {
          border-top: 0;
        }
      }
    }
    .tell {
      margin-top: 300px;
      width: 100%;
      height: 61px;
      line-height: 61px;
      background: url("../assets/images/Question-images/tel.png") 40px center
        no-repeat;
    }
  }
  .right {
    width: 925px;
    height: 100%;
    float: left;
    background-color: #242628;
  }
}
</style>
