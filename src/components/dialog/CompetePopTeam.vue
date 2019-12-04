<template>
  <div id="changeTeam" v-show="isShowchangeTeamPop.isShow">
    <div class="changeTeam-bg" @click="handleclose"></div>
    <div class="changeTeam-main" :style="'margin-top:-'+((241+(Math.ceil(isShowchangeTeamPop.Length/5)*122)-20)/2)+'px'">
      <div class="changeTeam-close" @click="handleclose"></div>
      <div class="changeTeam-main-con">
        <div class="changeTeam-main-list" v-if="isShowchangeTeamPop.teamData">
          <ul>
            <li v-for="(items,index) in isShowchangeTeamPop.teamData.team" class="changeTeam-choice" :data-index="parseInt(index)-1" :data-option="index" :class="{active:isShowchangeTeamPop.optionFrom==index}" @click="handleChoiceTeam($event)" :key="index">
              <div class="changeTeam-main-out"><div class="ImgOut"><span><img :src="items.logo"/></span></div>
              <p class="text-over">{{items.name}}</p></div>
            </li>
          </ul>
          <i class="clear"></i>
        </div>
        <div class="changeTeam-main-btn guess_bet_info_btn" @click="changeTeams($event)">确认换队</div>
      </div>
    </div>
  </div>
</template>
<script>
import Http from './../../common/http';
import { mapMutations, mapState } from 'vuex';
import router from "@/router";
export default {
  data () {
      return {
          items:{
              datasum:this.$store.state.match.isSigninTools.value?this.$store.state.match.isSigninTools.value:1
          },
          teamLeng:this.$store.state.match.showPubgPupBooleam.length,
          teams:['/guess/switchSideCai','/guess/switchSideCard'],
          optionFrom:this.$store.state.match.showPubgPupBooleam.optionFrom,
          optionTo:this.$store.state.match.showPubgPupBooleam.optionTo,

      }
  },
  methods: {
      handleclose(){
          this.$store.commit('isShowPubgPup',false)
      },
      handleensure(value){
      },
      handleChoiceTeam(event){
        let el=event.currentTarget;
        let Index =el.getAttribute('data-index');
        this.optionTo=el.getAttribute('data-option');
        let eLisList=document.getElementsByClassName('changeTeam-choice');
        for(var i=0;i<eLisList.length;i++){
            if(i==Index){
              eLisList[i].classList.add('active');
            }else{
              if(eLisList[i].classList.contains('active')==true){
                eLisList[i].classList.remove('active');
              }
            }

          }

      },
      changeTeams:function(event){
      let self=this
      let el =event.currentTarget,datas;
      let thisOption =el.getAttribute('data-option');
      let dataType =this.isShowchangeTeamPop.dataType;
      let guessId =this.$route.params.echoid;
      if(this.isShowchangeTeamPop.optionFrom==this.optionTo){
        return
      }
      let dataOptions = {
        guess_id:this.$route.params.echoid,
        option_from:this.isShowchangeTeamPop.optionFrom,
        option_to:this.optionTo
      };
      console.log('isShowchangeTeamPop',dataOptions,this.teams[dataType])
      let Url=this.teams[dataType]

      Http.post(Url,dataOptions).then(function(data){
        let result =data.data
        console.log('data',result)
        if(result.code==0){
          let dataOption ={
            'masseges':result.message,
            'type':'2',
          }
          self.$store.commit('isSigninPupopDis',true);
          self.$store.commit('isSigninPupopDis',dataOption);
          let params ={
              isShow:false,
              optionFrom:self.optionTo,
              optionTo: null,
              guessId:guessId,
              dataType:'',
              Length:0,
            };
          console.log(params)
          self.$store.commit('isShowPubgPup',params)
          if(dataType==0){
            datas={
              guess_id:guessId
            }
            self.$store.dispatch('caimy_list',datas)
            self.$store.dispatch('cbi_list',datas)

          }else{
            datas={
              guess_id:guessId
            }
            self.$store.dispatch('skins_list',datas)
            self.$store.dispatch('skinsmy_list',datas)
          }
        }else{
          let dataOption ={
            'masseges':result.message,
            'type':'2',
          }
          self.$store.commit('isSigninPupopDis',true);
          self.$store.commit('isSigninPupopDis',dataOption);
        }
      })
    },
  },
  computed: {
    isShowchangeTeamPop:function(){
      return this.$store.state.match.showPubgPupBooleam;
   },
  }
}
</script>
<style lang="scss" scoped src="@/assets/css/popupPubg.css"></style>


