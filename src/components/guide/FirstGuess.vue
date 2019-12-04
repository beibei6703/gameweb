<template>
  <div id="dialog" v-if="isUserFirstGuessShow && getUserInfo">
    <div class="dialog_mask">
      <div class="main">
          <img src="../../assets/img/guide/close.png" alt="" class="close pointer" @click="closeCurrentPages">
         <p class="top " v-if="caiGuessData && parseFloat(caiGuessData[0].income)>0">恭喜您!!</p>
         <p class="top gray_top"  v-else>很遗憾...</p>
         <div class="btm" v-if="caiGuessData">
           <div class="details_info" v-if="caiGuessData[0].option_type==1">您在{{caiGuessData[0].options[1].name}} <span class="yellow_txt"> vs </span>{{caiGuessData[0].options[2].name}}比赛的{{caiGuessData[0].guess_type_name}}(盘口)获得收益{{caiGuessData[0].income}}c,继续预测可以获得更多的收益，是否继续？</div>
           <div class="details_info" v-if="caiGuessData[0].option_type==2">您在{{caiGuessData[0].match_name}}比赛的{{caiGuessData[0].guess_type_name}}(盘口)获得收益{{caiGuessData[0].income}},继续预测可以获得更多的收益，是否继续？</div>
           <div class="dynamic_sign" v-if="parseFloat(caiGuessData[0].income)>0">预测天才一键丰收</div>
           <div class="dynamic_sign" v-else>搏一搏单车变摩托</div>
           <p  class="operation_btn pointer" v-if="parseFloat(getUserInfo.cai)>100" @click="toGuess()">前往预测</p>
           <p  class="operation_btn pointer" v-else @click="toRecharge()">前往充值</p>
         </div>
      </div>
    </div>
  </div>
</template>

<script>
 import router from "@/router";
  export default {
    computed: {
      isUserFirstGuessShow() {
        return this.$store.state.isDialogShow.isUserFirstGuessShow || false;
      },
      getUserInfo(){
        return this.$store.state.user.userInfo ||null;
      },
      caiGuessData(){
        return this.$store.state.garden.caiGuessData || null;
      },
      isFirstGetPropsShow() {
        return this.$store.state.isDialogShow.isFirstGetPropsShow || false;
      },
      isFirstGetDebrisShow() {
      return this.$store.state.isDialogShow.isFirstGetDebrisShow || false;
    },
    },
    methods: {
      closeCurrentPages() {
        this.$store.dispatch("setNewGuidanceStepDispatch",{guidanceNum:8});
        this.$store.commit("mutationUserFirstGuessShow",false);
        document.documentElement.style.overflowY='auto';
        document.body.style.overflowY='auto';
      },
      toGuess(){
        this.$store.dispatch("setNewGuidanceStepDispatch",{guidanceNum:8});
        this.$store.commit("mutationUserFirstGuessShow",false);
        setTimeout(() => {
          router.push({ path: '/compete/Quizzeszone?ID=all' });
        }, 500);

        document.documentElement.style.overflowY='auto';
        document.body.style.overflowY='auto';
      },
      toRecharge(){
        this.$store.dispatch("setNewGuidanceStepDispatch",{guidanceNum:8});
        setTimeout(() => {
          router.push({ path: '/paymoney' });
        }, 500);
        this.$store.commit("mutationUserFirstGuessShow",false);

        document.documentElement.style.overflowY='auto';
        document.body.style.overflowY='auto';
      }
    },
    mounted() {
      let caiParams = {
        page:1,
        result_status:'all',
        size:10,
        status:'all',
      };
      this.$store.dispatch('caiGuessDispatch',caiParams);
    },
  }
</script>

<style scoped lang="scss">
  #dialog{
    z-index: 8210;
    .main{
      width: 428px;
      height: 550px;
      border-radius: 5px;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%,-50%);
      background: #fff;
      .yellow_txt{
        color: #e6bb46;
      }
      .close{
        width: 16px;
        height: 16px;
        display: block;
        position: absolute;
        top: 14px;
        right: 14px;
      }
      .top{
        width: 100%;
        height: 138px;
        font-size: 42px;
        color: #fff;
        line-height: 138px;
        background: #e6bb46;
        text-align: center;
      }
      .gray_top{
        background: #9d9c9a;
      }
      .btm{
        padding: 60px 45px 0;
        .details_info{
          font-size: 22px;
          color: #3e3d3d;
          line-height: 32px;
          text-align: left;
        }
        .dynamic_sign{
          margin:76px 0 14px 0 ;
          text-align: center;
          font-size: 20px;
          color: #706e6d;
        }
        .operation_btn{
          width: 280px;
          height: 56px;
          line-height: 56px;
          border-radius: 28px;
          text-align: center;
          background: #e9b21b;
          color: #fff;
          font-size: 24px;
          margin:0 auto;
        }
      }
    }
  }
</style>
