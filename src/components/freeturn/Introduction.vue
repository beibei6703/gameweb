<template>
  <div id="introduction">
    <div class="howtoplay">
      <div class="title">玩法介绍</div>
      <p>1、抽奖时间：每天15:00、20:00各开启一次</p>
      <!-- <p>2、抽奖时间：整点抽取，即下午15:00第一次抽取，20:00最后一次抽取</p> -->
      <p>2、参与条件：需绑定手机号码</p>
      <p v-if="gametype==2">3、奖品：小红帽安妮皮肤卡，价值1000C，等额1000点券</p>
      <p v-if="gametype==1">3、奖品：屠夫的烤肉工具双件套，价值1200C，等额1200刀币</p>
      <p>4、奖品数量：参与人数每增加100人，赠送奖品数及中奖名额增加1个，最多增加至10个奖品及中奖名额</p>
      <p>5、最终解释权归『丰收网』所有</p>
      <!-- <p class="bottominfo">本活动最终解释权归【丰收网】所有</p> -->
    </div>
  </div>
</template>


<script>
  import Http from "../../common/http";
  import config from "../../common/http-config";
export default {
  data () {
    return {
//      gameType:this.$route.path.indexOf('FreeturnLol')>=0?2:1
    }
  },
  watch: {
    'gametype': function () {
      this.gametype=this.gametype
    },
  },

  props: [
    'gametype',
  ],
}
</script>

<style scoped lang="scss">
#introduction {
  height: 420px;
  width: 440px;
  margin-top: 54px;
  background: url("../../assets/images/freeturn/playbg.png") 0px 0px
    no-repeat;
  background-size: cover;
  position: relative;
  .howtoplay {
    height: 230px;
    width: 310px;
    position: absolute;
    top:54px;
    left:70px;
    // background-color: #fff;
    .title {
      font-size: 15px;
      line-height: 40px;
      padding-left: 20px;
      font-weight: 700;
      color: #382a28;
    }
    p {
      font-size: 14px;
      line-height: 24px;
      padding-left: 20px;
      color:#382a28;
    }
    // .bottominfo {
    //   position: absolute;
    //   left: 72px;
    //   bottom: 32px;
    // }
  }
}
</style>
