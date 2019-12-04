<template>
  <div id="popup_guess" v-if="getisShowGuessBetGuide&&getUserInfo&&this.$route.path.indexOf('/guess/')!=-1&&getisEndAnimate">
    <div class="popup_guess_mask"></div>
    <div class="dialog_main_carryenroll" :style="'top:'+(getisScrollTop+getisThisScrollTop+402+(getmainData.club_type==2?80:0))+'px'" @click="closeDialog()">

      <div class="dialog_main_winnerlist"  v-for="(items,index) in getgGuessTeamData" :key="index" v-if="items.id==getGuessId" >
        <div class="dialog_main_click" :class="{active:getmainData.club_type==2}"></div>
        <div class="guessmain-ex-team rela" :data-index="index" v-if="items.option_type==1" :class="{guessbtngraw:items.status!='wait'}">
          <div class="guessmain-sample fl">
            <div class="guessmain-team-text text-right fl">
              <h1><i v-if="items.winner==1" style="margin-right:5px; text-align:right;"></i>赔率<span>{{items.team[1].odds}}</span></h1>
              <h2 class="text-over">{{items.team[1].name}}</h2>
              <!-- <h3 class="fr" v-if="items.winner==1"></h3> -->
            </div>
            <div class="guessmain-team-sup bg-red fl" v-if="items.status=='wait'" style="right:auto;left:110px;">去预测</div>
            <div class="clear"></div>
          </div>

          <div class="guessmain-sample fr">

            <div class="guessmain-team-text  text-left fr">
              <h1><span>{{items.team[2].odds}}</span>赔率<i v-if="items.winner==2" style="margin-left:5px;"></i></h1>
              <h2 class="text-over">{{items.team[2].name}}</h2>

            </div>
            <div class="guessmain-team-sup bg-blue fr" v-if="items.status=='wait'">去预测</div>

            <div class="clear"></div>
          </div>
          <div class="guessmain-team-add-vs"></div>
        </div>
        <div class="guessmain-pubg-guess-list" v-if="items.option_type==2">
          <div class="guessmain-pubg-guess-same rela fl" v-for="(demos,indexin) in items.team" :key="indexin" :class="{guessbtngraw:items.status!='wait'}" v-if="indexin<5">
            <div class="guessmain-pubg-guess-same-l">
              <i class="guessmain-pubg-guess-same-hg" v-if="items.winner==indexin"></i>
              <div class="guessmain-pubg-guess-ImgOut ImgOut fl">
                <span><img :src="demos.logo"/></span>
              </div>
              <div class="guessmain-pubg-guess-text fl">
                <h2>赔率<span>{{demos.odds}}</span><em>预测</em></h2>
                <h1 class="text-over">{{demos.name}}</h1>
              </div>
              <i class="clear"></i>
            </div>
          </div>
          <i class="clear"></i>
        </div>
      </div>
      <div class="dialog_main_carryenroll_hover"></div>
      <div class="dialog_main_carryenroll_hover_upd" @click="closeDialog"></div>
    </div>
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
      this.$store.dispatch('setNewGuidanceStepDispatch',{guidanceNum:4})
      this.$store.commit('mutationIsShowGuessBetGuide',false);
      document.documentElement.style.overflowY='auto';
      document.body.style.overflowY='auto';
    },
  },
  mounted() {

  },
  updated() {
    setTimeout(() => {
      if(this.$store.state.isDialogShow.isShowWinner&&this.$route.path.indexOf('/compete/')!=-1){
        setTimeout(() => {
          // document.documentElement.style.overflowY='hidden';
          // document.body.style.overflowY='hidden';
        }, 500);
      }
    }, 100);
  },
  computed:{
    getisShowGuessBetGuide(){
      return this.$store.state.isDialogShow.isShowGuessBetGuide;
    },
    getUserInfo(){
      return this.$store.state.user.userInfo;
    },
    getisEndAnimate(){
      return this.$store.state.isDialogShow.isEndAnimate;
    },
    getgGuessTeamData: function () {
      return this.$store.state.match.guessTeam_message ? this.$store.state.match.guessTeam_message : null
    },
    getGuessId: function () {
      return this.$store.state.match.stateGuessId;
    },
    getisScrollTop: function () {
      console.log('getisScrollTop',this.$store.state.isDialogShow.isScrollTop)
      return this.$store.state.isDialogShow.isScrollTop;
    },
    getisThisScrollTop: function () {
      console.log('getisThisScrollTop',this.$store.state.isDialogShow.isThisScrollTop)
      return this.$store.state.isDialogShow.isThisScrollTop;
    },
    getmainData: function () {
      return this.$store.state.match.guessMainData ? this.$store.state.match.guessMainData : null
    },

  }
}
</script>
<style lang="scss" scoped>
#popup_guess{
  position:absolute;top:0;left:0;z-index:8309;width:100%;
  .popup_guess_mask{position:fixed;top:0;left:0;background: rgba(5, 6, 6, .8);width:100%;height:100%;}
  .dialog_main_carryenroll{
  //  z-index:8309;
    width:1200px;position: absolute;top:0;left:50%;margin-left:-600px;
    .dialog_main_winnerlist{
      position:absolute;left:2px;top:0;
       width:871px;
        &::before{
          content: '';display:block;width:902px; height:131px;position:absolute;top:-14px;left:-16px;
          background:url('../../assets/img/guide/dialog_guess_battle_bk.png') no-repeat center;
        }
       .dialog_main_click{
         width:85px; height:100px;background:url('../../assets/img/guide/dialog_guess_click.png') no-repeat center;position:absolute;top:54px;left:705px;z-index:111;
         &.active{
           left:162px !important;
         }
        }
    }
    // .guessmain-team-sup{background-color:#28272c !important;}
    .dialog_main_carryenroll_hover{
      width:612px; height:153px;position:absolute;top:-190px; left:180px;
       background:url('../../assets/img/guide/dialog_guess_battle.png') no-repeat center;

    }
    .dialog_main_carryenroll_hover_upd{width:144px;height:44px; position:absolute;bottom:-238px; left:50%;margin-left:-188px;cursor:pointer;
     background:url('../../assets/img/guide/eight_knowed_guess.png') no-repeat center;}
  }

}

</style>
<style lang="scss" scoped src="@/assets/css/guessDetail.css"></style>


