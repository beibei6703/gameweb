<template>
  <div class="hotcompete">
    <div class="allbody">
      <div class="compete-left fl">
        <div class="compete-list-nav">
          <CompeteNav></CompeteNav>
        </div>
        <CompeteText></CompeteText>
      </div>
      <div class="compete-right fr">
        <MineGuess></MineGuess>
        <WinLose></WinLose>
      </div>
      <div class="clear"></div>
    </div>
  </div>
</template>
<script>
  import CompeteNav from "./CompeteNav";
  import WinLose from "./WinLose";
  import MineGuess from "./MineGuess";
  import CompeteText from "./CompeteText";
  export default {
    data () {
      return {
      }
    },
    components: {
      CompeteNav,
      WinLose,
      MineGuess,
      CompeteText
    },
    methods:{
    }
  }
</script>
<style lang="scss" scoped>
  .compete-left{width:876px; border-top: #494546 1px solid;}
  .compete-right{width:312px;}
  .hotcompete{padding-bottom:40px;}
  .compete-list-minNav{
    height:60px;text-align: center;font-size:15px;background:#15161a;
    li{width:82px; border-right:#989898 1px solid;float:left; height:16px;line-height:16px;margin:22px 0; color:#989898;/*cursor:pointer;*/}
    :hover,.active{color:#d9a35a;}
    :last-child{border:0;}
  }
  .compete-list-nav{border-top: #838182 1px solid;}
</style>

