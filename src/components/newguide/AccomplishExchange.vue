<template>
  <div id="dialog" v-if="getisShowExchangeNickname&&this.$route.path.indexOf('/mygrand/taskachievment')!=-1">
    <div class="dialog_mask"></div>
    <div class="dialog_main_carryenroll" :style="'top:'+(getmygrandGuessData&&getmygrandGuessData.length>0?'706':'424')+'px'">
      <span @click="gotoMygrand">去完成</span>
      <div class="dialog_main_carryenroll_hover">
        <div class="dialog_main_carryenroll_hover_upd" @click="closeDialog"></div>
      </div>
    </div>
    <!-- <div class="dialog_main dialog_propaganda">
      <div class="dialog_close"></div>
    </div> -->
    <div style="opacity:0;filter:alpha(opacity=0)" v-if="getmygrandGuessData&&getmygrandGuessData.length>0">{{getmygrandGuessData.length>0?'1':'0'}}</div>
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
      this.$store.dispatch('setNewGuidanceStepDispatch',{guidanceNum:2})
      this.$store.commit('mutationIsShowExchangeNickname',false);
      document.documentElement.style.overflowY='auto';
      document.body.style.overflowY='auto';
    },
    gotoMygrand(){
      this.$store.dispatch('setNewGuidanceStepDispatch',{guidanceNum:2})
      this.$store.commit('mutationIsShowExchangeNickname',false);
      document.documentElement.style.overflowY='auto';
      document.body.style.overflowY='auto';
      router.push('/mygrand/accountSetting')
    },
  },
  mounted() {
    let myGuessDataList=this.$store.state.match.myGuessDataList
    let mygrandGuessData = this.$store.state.match.mygrandGuessData
    let isShowExchangeNickname=this.$store.state.isDialogShow.isShowExchangeNickname
    if(this.$route.path.indexOf('mygrand/taskachievment')!=-1&&isShowExchangeNickname&&mygrandGuessData&&mygrandGuessData.length>0){
      document.documentElement.scrollTop =600;
      document.body.scrollTop = 600;
      // document.documentElement.style.overflowY='hidden';
      // document.body.style.overflowY='hidden';
    }


  },
  updated() {
    setTimeout(() => {
      let myGuessDataList=this.$store.state.match.myGuessDataList
      let mygrandGuessData = this.$store.state.match.mygrandGuessData
      let isShowExchangeNickname=this.$store.state.isDialogShow.isShowExchangeNickname
      if(this.$route.path.indexOf('mygrand/taskachievment')!=-1&&isShowExchangeNickname&&mygrandGuessData&&mygrandGuessData.length>0){
        document.documentElement.scrollTop =600;
        document.body.scrollTop = 600;
        // document.documentElement.style.overflowY='hidden';
        // document.body.style.overflowY='hidden';
      }
    }, 100);
  },
  computed:{
    getisShowExchangeNickname(){
      return this.$store.state.isDialogShow.isShowExchangeNickname;
    },
    getmygrandGuessData(){
      return this.$store.state.match.mygrandGuessData;
    },
  }
}
</script>
<style lang="scss" scoped>
#dialog{
  z-index:10000;
  position:absolute;
  .dialog_main_carryenroll{
    width:1200px;position: absolute;;top:746px;left:50%;margin-left:-600px;
    span{
      width:86px; text-align:center;height:32px; line-height:32px; text-align: center;cursor: pointer; z-index:10;border-radius:2px;position:absolute;right:122px;top:194px;font-size:14px; color:#fff; cursor: pointer; background:#007f85;
      &::before{
          content:'';display:block;position:absolute;top:-16px;left:-14px;width:115px;height:64px;
          background:url('../../assets/img/guide/dialog_exchange_bk.png') no-repeat center;

        }
    }
    .dialog_main_carryenroll_hover{
      width:243px; height:131px;position:absolute;top:175px; right:163px;
       background:url('../../assets/img/guide/dialog_exchange.png') no-repeat center;
       .dialog_main_carryenroll_hover_upd{width:104px;height:43px; position:absolute;bottom:-75px; left:145px;cursor:pointer;
        background:url('../../assets/img/guide/dialog_updown.png') no-repeat;
        background-size:cover;opacity:0.8;
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


