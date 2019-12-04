<template>
  <div id="dialog" v-if="getisShowWinner&&getUserInfo&&this.$route.path.indexOf('/compete/')!=-1">
    <div class="dialog_mask"></div>
    <div class="dialog_main_carryenroll" :style="'top:'+(getMyguessdata&&getMyguessdata.length>0?getisRichScrollTop:445)+'px'">
      <div class="dialog_main_winnerlist">
        <WinLose/>
      </div>
        <div class="dialog_main_carryenroll_hover">
          <div class="dialog_main_carryenroll_hover_upd" @click="closeDialog"></div>
        </div>
    </div>
    <!-- <div class="dialog_main dialog_propaganda">
      <div class="dialog_close"></div>
    </div> -->
    <div style="opacity:0;filter:alpha(opacity=0)" v-if="getMyguessdata&&getMyguessdata.length>0">{{getMyguessdata.length>0?'1':'0'}}</div>
    <div style="opacity:0;filter:alpha(opacity=0)">{{getMyguessdata?'1':'0'}}</div>
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
      this.$store.commit('mutationIsShowWinner',false);
      this.$store.dispatch('setNewGuidanceStepDispatch',{guidanceNum:3})
      document.documentElement.style.overflowY='auto';
      document.body.style.overflowY='auto';
    },
  },
  mounted() {
    // setTimeout(() => {
      let myGuessDataList=this.$store.state.match.myGuessDataList
      if(this.$route.path.indexOf('/compete/')!=-1&&this.$store.state.isDialogShow.isShowWinner&&myGuessDataList&&myGuessDataList.length>0){
        let box=document.querySelector('div#compete .compete-winLose');
        this.$store.commit('mutationisRichScrollTop',box.offsetTop)
        console.log('丰收榜出来没有呢',box.offsetTop,this.$store.state.isDialogShow.isShowWinner,this.$route.path.indexOf('compete/'))
        document.documentElement.scrollTop =box.offsetTop-250;
        document.body.scrollTop = box.offsetTop-250;
        // document.documentElement.style.overflowY='hidden';
        // document.body.style.overflowY='hidden';
      }
    // }, 100);

  },
  updated() {

    setTimeout(() => {
      let myGuessDataList=this.$store.state.match.myGuessDataList
      if(this.$route.path.indexOf('/compete/')!=-1&&this.$store.state.isDialogShow.isShowWinner&&myGuessDataList&&myGuessDataList.length>0){
        let box=document.querySelector('div#compete .compete-winLose');
        this.$store.commit('mutationisRichScrollTop',box.offsetTop)
        console.log('丰收榜出来没有呢',box.offsetTop,this.$store.state.isDialogShow.isShowWinner,this.$route.path.indexOf('compete/'))
        document.documentElement.scrollTop =box.offsetTop-250;
        document.body.scrollTop = box.offsetTop-250;
        // document.documentElement.style.overflowY='hidden';
        // document.body.style.overflowY='hidden';
      }
    }, 200);
  },
  computed:{
    getisShowWinner(){
      return this.$store.state.isDialogShow.isShowWinner;
    },
    getUserInfo(){
      return this.$store.state.user.userInfo;
    },
    getMyguessdata:function(){
      return this.$store.state.match.myGuessDataList;
    },
    getisRichScrollTop:function(){
      return this.$store.state.isDialogShow.isRichScrollTop;
    },
  }
}
</script>
<style lang="scss" scoped>
#dialog{
  z-index:10000;
  position:absolute;
  .dialog_main_carryenroll{
    width:1200px;position:absolute;top:445px;left:50%;margin-left:-600px;
    .dialog_main_winnerlist{
      width:312px; position:absolute;right:0;top:0;
      &::before{
          background: rgba(5, 6, 6, .8);content: '';display:block;width:100%;height:45px; z-index: 10;position:absolute;top:5px;left:0;
      }
      &::after{
          content: '';display:block;width:358px;height:calc(100% - 15px); z-index: 10;position:absolute;top:33px;left:-23px;
          background:url('../../assets/img/guide/dialog_winlose_bk.png') no-repeat;
          background-size:cover;
      }

    }
    .dialog_main_carryenroll_hover{
      width:531px; height:237px;position:absolute;top:-113px; right:351px;

       background:url('../../assets/img/guide/dialog_winlose.png') no-repeat center;
       .dialog_main_carryenroll_hover_upd{width:211px;height:44px; position:absolute;bottom:-200px; right:97px;cursor:pointer; background:url('../../assets/img/guide/eight_knowed.png') no-repeat center;}

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


