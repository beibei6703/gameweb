<template>
  <div id="dialog" v-if="getisShowReciveNewsTask&&getUserInfo&&!getIsSHowCarryEnroll1&&!getIsSHowCarryEnroll&&!getisShowTask&&!getisShowExchangeNickname">
    <div class="dialog_mask"></div>
    <div class="dialog_main_carryenroll">
      <div class="dialog_main_carryenroll_guess">
        <span @click="gotoMygrand">预测</span>
        <div class="dialog_main_carryenroll_hover">
          <div class="dialog_main_carryenroll_hover_upd" @click="closeDialog"></div>
        </div>
      </div>
    </div>
    <!-- <div class="dialog_main dialog_propaganda">
      <div class="dialog_close"></div>
    </div> -->
  </div>
</template>
<script>
 import router from "@/router";
export default {
  data(){
    return{}
  },
  methods:{

    closeDialog(){
      this.$store.dispatch('setNewGuidanceStepDispatch',{guidanceNum:3})
      this.$store.commit('mutationIsShowReciveNewsTask',false);
    },
    gotoMygrand(){
      // setTimeout(() => {
         this.$store.commit('mutationIsShowWinner',true);
      // }, 300);

      this.$store.commit('mutationIsShowReciveNewsTask',false);
      router.push('/compete/Quizzeszone?ID=all')
    },
  },
  mounted() {


  },
  computed:{
    getisShowReciveNewsTask(){
      return this.$store.state.isDialogShow.isShowReciveNewsTask;
    },
    getUserInfo(){
      return this.$store.state.user.userInfo;
    },
    getIsSHowCarryEnroll(){
      return this.$store.state.isDialogShow.isSHowCarryEnroll;
    },
    getisShowTask(){
      return this.$store.state.isDialogShow.isShowTask;
    },
    getisShowExchangeNickname(){
      return this.$store.state.isDialogShow.isShowExchangeNickname;
    },
  }
}
</script>
<style lang="scss" scoped>
#dialog{
  z-index:10000;
  .dialog_main_carryenroll{
    width:1200px;position:fixed;top:40px;left:50%;margin-left:-600px;
    .dialog_main_carryenroll_guess{width:676px;position:absolute; right:0;}

    span{
      padding:0 10px; height:80px; line-height:80px; color:#fff; text-align: center;position:absolute;left:138px; top:0;cursor: pointer;
      background: url("../../assets/img/home/nav_top_bg_hover.png")  no-repeat;
      background-size: cover;
      font-size: 16px;
      &::before{
          content:'';display:block;position:absolute;top:-18px;left:-12px;width:77px;height:112px;
          background:url('../../assets/img/guide/dialog_receivenews_bk.png') no-repeat center;

        }

    }
    .dialog_main_carryenroll_hover{
      width:398px; height:82px;position:absolute;top:144px; left:-127px;
       background:url('../../assets/img/guide/dialog_receivenews.png') no-repeat center;
       &::before{
         content:'';display:block;position:absolute;top:-102px;;right:10px;;width:75px; height:128px;
         background:url('../../assets/img/guide/dialog_receivenews_qx.png') no-repeat center;
       }
       .dialog_main_carryenroll_hover_upd{
          width:104px;height:43px; position:absolute;bottom:-97px; left:195px;cursor:pointer;
          background:url('../../assets/img/guide/dialog_updown.png') no-repeat;
          background-size:cover;opacity:0.85;
         }

    }
  }
  // .dialog_propaganda{

  // width:442px; height:106px; background:url('../../assets/img/guide/dialog_cb.png') no-repeat center;background-size:cover;
  // .dialog_close{
  //   width:43px; height:77px; position: absolute;top:-70px;right:-2px; background:url('../../assets/img/guide/dialog_carry_close.png') no-repeat center;cursor: pointer;
  // }

// }
}

</style>


