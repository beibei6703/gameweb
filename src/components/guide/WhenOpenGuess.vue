<template>
  <div id="dialog" v-if="isOpenGuessShow && getUserInfo && this.$route.path.indexOf('/guess/')!=-1">
    <div class="dialog_mask"></div>
    <div class="main" :style="'top:'+(getisScrollTop+getisThisScrollTop+402+(getmainData.club_type==2?25:32)+(getmainData.club_type==2?80:0))+'px'">
      <img src="../../assets/img/guide/eight_forecast_way.png" alt="" class="theme">
      <div class="can_click_area" @click="closeCurrentPages">
        <p class="pretend_btn pointer">C币预测</p>
        <!-- <p class="pretend_btn pointer">道具预测</p> -->
      </div>
      <img src="../../assets/img/guide/eight_knowed_guess.png" alt="" class="btn_know pointer" @click="closeCurrentPages">
  </div>

  </div>
</template>

<script>
  export default {
    computed: {
      isOpenGuessShow() {
        return this.$store.state.isDialogShow.isOpenGuessShow || false;
      },
      getUserInfo(){
        return this.$store.state.user.userInfo ||null;
      },
      getisEndAnimate(){
        return this.$store.state.isDialogShow.isEndAnimate;
      },
      getGuessId: function () {
        return this.$store.state.match.stateGuessId;
      },
      getisScrollTop: function () {
        let top =document.querySelector('div.guessmain-pubg-xh.active').offsetTop
        // return this.$store.state.isDialogShow.isScrollTop;
        return top;
      },
      getisThisScrollTop: function () {
        return this.$store.state.isDialogShow.isThisScrollTop;
      },
      getmainData: function () {
        return this.$store.state.match.guessMainData ? this.$store.state.match.guessMainData : null
      },
    },
    methods: {
      closeCurrentPages() {
        this.$store.dispatch("setNewGuidanceStepDispatch",{guidanceNum:5});
        this.$store.commit("mutationOpenGuessShow",false);
        document.documentElement.style.overflowY='auto';
        document.body.style.overflowY='auto';
      }
    },
    updated() {
      console.log('我的值是多少呢',this.$store.state.isDialogShow.isThisScrollTop,this.$store.state.isDialogShow.isScrollTop)
      if(this.$store.state.isDialogShow.isOpenGuessShow && this.$route.path.indexOf('/guess/')!=-1){
        // document.documentElement.style.overflowY='hidden';
        // document.body.style.overflowY='hidden';
      }
    }
  }
</script>

<style scoped lang="scss">
#dialog{position:absolute !important; z-index:8210;}
  .main{
    width: 1200px;
    height: 430px;
    position: absolute;
    top:0;
    left:50%;
    margin-left: -669px;
    .theme{
      width: 248px;
      height: 96px;
      display: block;
      position: absolute;
      top:86px;
      left: 210px;
    }
    .btn_know{
      width: 144px;
      height: 44px;
      display: block;
      position: absolute;
      top:352px;
      left: 398px;
    }
    .can_click_area{
      // width: 218px;
      height: 37px;
      position: absolute;
      top:110px;
      left: 100px;
      // display: flex;
      &::before{
            content: "";display: block;  width:85px; height:100px;background:url('../../assets/img/guide/dialog_guess_click.png') no-repeat center;position:absolute;top:20px;left:70px;cursor:pointer;z-index:111;
          }

      p{
        width: 107px;
        // margin:0 8px;
        height:37px;
        line-height: 37px;
        color: #858585;
        font-size: 14px;
        text-align: center;
        // background: #1d1d1a;
        &:nth-child(1){
          color: #fff;
          // &::after{
          //   content: "";
          //   width: 2px;
          //   height: 11px;
          //   margin-left: 30px;
          //   display: inline-block;
          //   background: #858585;
          // }
           &::before{
            content: "";
            width: 107px;
            height: 65px;
            position:absolute;top:-14px;left:0;
            display: block;
            background:url('../../assets/img/guide/eight_forecast_way_5bk.png') no-repeat center;
            // background: #858585;
          }
        }
      }
    }
  }
</style>
