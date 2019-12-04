<template>
  <div id="dialog" v-if="getisShowTask&&this.$route.path.indexOf('/mygrand/personinfo')!=-1">
    <div class="dialog_mask"></div>
    <div class="dialog_main_carryenroll" :style="'top:'+(getmygrandGuessData&&getmygrandGuessData.length>0?'457':'179')+'px'">
      <span @click="gotoMygrand">任务成就</span>
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
      this.$store.commit('mutationIsShowTask',false);
       document.documentElement.style.overflowY='auto';
      document.body.style.overflowY='auto';
    },
    gotoMygrand(){
      setTimeout(() => {
        this.$store.commit('mutationIsShowExchangeNickname',true);
      }, 100);

      this.$store.commit('mutationIsShowTask',false);
      router.push('/mygrand/taskachievment')
       document.documentElement.style.overflowY='auto';
      document.body.style.overflowY='auto';
    },
  },
  mounted() {
    let mygrandGuessData=this.$store.state.match.mygrandGuessData
    let isShowTask=this.$store.state.isDialogShow.isShowTask
    if(isShowTask&&this.$route.path.indexOf('mygrand/personinfo')!=-1&&mygrandGuessData&&mygrandGuessData.length>0){
      document.documentElement.scrollTop =400;
      document.body.scrollTop = 400;
      // document.documentElement.style.overflowY='hidden';
      // document.body.style.overflowY='hidden';

    }
  },
  updated() {
    console.log('我出来了几次呢',this.$store.state.match.mygrandGuessData)
    setTimeout(() => {
      let mygrandGuessData=this.$store.state.match.mygrandGuessData
      let isShowTask=this.$store.state.isDialogShow.isShowTask
      if(isShowTask&&this.$route.path.indexOf('mygrand/personinfo')!=-1&&mygrandGuessData&&mygrandGuessData.length>0){
        document.documentElement.scrollTop =400;
        document.body.scrollTop = 400;
        // document.documentElement.style.overflowY='hidden';
        // document.body.style.overflowY='hidden';

      }

    }, 100);
  },

  computed:{
    getisShowTask(){
      return this.$store.state.isDialogShow.isShowTask;
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
    width:1200px;position: absolute;;top:497px;left:50%;margin-left:-600px;
    span{
      width:101px; text-align:center;height:32px; line-height:32px; color:#fff;cursor: pointer;z-index:10;text-align: center;position:absolute;left:39px;top:194px;font-size:14px; color:#b8b8b8; cursor: pointer; background:#242425;
      &::before{
        content: '';display:block;width:133px; height:60px;position:absolute;top:-14px;left:-16px;
        background:url('../../assets/img/guide/dialog_cb_bk.png') no-repeat center;
      }
    }
    .dialog_main_carryenroll_hover{
      width:366px; height:78px;position:absolute;top:280px; left:63px;
       background:url('../../assets/img/guide/dialog_cb.png') no-repeat center;
       &::before{
         content:'';display:block;position:absolute;top:-79px;;right:133px;;width:142px; height:78px;
         background:url('../../assets/img/guide/dialog_cb_zx.png') no-repeat center;
       }
       .dialog_main_carryenroll_hover_upd{width:130px;height:54px; position:absolute;bottom:-120px; left:-30px;cursor:pointer; background:url('../../assets/img/guide/dialog_updown.png') no-repeat center;}
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


