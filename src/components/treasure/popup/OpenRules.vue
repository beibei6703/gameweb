<template>
  <div class="popup" v-if="getIsSHowRules">
    <div class="popup-bg"></div>
    <div class="">
      <div class=" popup-main openRules">
        <div class="popup-close" @click="fnCLosePopup"></div>
        <p class="title">开福袋规则</p>
        <p class="content">抽奖规则简介福袋根据奖池公示的概率随机抽取奖品，500C即可进行夺宝，奖品包含C币及英雄联盟皮肤,100%中奖。</p>
        <p class="content">1. 500C可进行一次夺宝，选择5000C连续夺宝可额外获赠两次夺宝机会，100%获取奖品，100C=1RMB。</p>
        <p class="content">2. 每夺宝一次获得5点能量，当能量到达100点可额外获得一次夺宝机会，能量可叠加。</p>
        <p class="content">3. C币等价于点券，1000C币即可兑换1000点券。</p>
        <p class="content">4. 福袋抽到的皮肤礼物我们将以点券的形式充值到你的LOL账户，请玩家自行选择区服。</p>
        <p class="content">5．点券奖励将在半小时内发放至用户填写的LOL账户，可点击兑换—我的菜园—账户记录，查询奖励发放进度。</p>
        <p class="content">6. 若夺宝网站遗失，可输入 <a href="https://www.api.com" target="_blank">www.api.com</a> 进入我的背包进行奖品兑换，也可关注微信公众账号：丰收电竞联盟</p>
        <p class="content">7. 本活动最终解释权归杭州丰收网络科技有限公司所有。</p>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
      methods:{
        fnCLosePopup(){
          this.$store.commit('mutationsIsSHowRules',false);
        },
      },
      computed:{
        getIsSHowRules(){
          return this.$store.state.treasure.isSHowRules;
        },
      },
    }
</script>
<style lang="scss" scoped src="@/assets/css/treasure.css"></style>
<style scoped lang="scss">
  .openRules{
    width: 600px;
    height: 460px;
    margin:-230px 0 0 -300px;
    background: url("https://imgcdn.api.com/images/treasure/popup_rules.png") no-repeat;
    background-size: cover;
    .title{
      text-align: center;
      color: #fff;
      font-size: 16px;
      margin-top:12px;
      line-height: 50px;
    }
    .content{
      text-align: left;
      color: #fff;
      font-size: 14px;
      margin:16px 0;
      line-height: 16px;
      padding: 0 60px;
    }
    a{
      color: #fff;
    }
  }
</style>
