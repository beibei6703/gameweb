<template>
<div id="menu">
  <div class="menu-top">
    <div class="menu-left fleft" :class="{active:getUserInfo}">
      <div class="menu-unlogin" v-if="!getUserInfo">
        <button class="fleft" @click="fnOpenLogin()">立即登录</button>
        <span class="fleft"> <em>开</em> 福袋 <em>送</em> 豪礼</span>
      </div>
      <div class="menu-login" v-if="getUserInfo">
        <div class="menu-pic fleft">
          <img :src="getUserInfo.avatar"/>
        </div>
        <div class="menu-text fleft">
          <h1 class="fleft">{{getUserInfo.nickname}} <span @click="layout"></span></h1>
          <h2 class="fleft">C币余额：<span>{{getTreasureMycai}}</span> c</h2>
        </div>
        <div class="menu-text-btn fleft" @click="fnOPenRecharge">充值</div>
      </div>
    </div>
    <div class="menu-nav fleft">
      <div class="menu-nav-btn fleft" :class="{active:getIsShowTabcon==1}"  @click="showTancon(1)"><span></span></div>
      <div class="menu-nav-btn fright" :class="{active:getIsShowTabcon==2}" @click="showTancon(2)"></div>
    </div>
    <div class="menu-service fright">
      <a target="_blank" href="tencent://message/?uin=1056387396&Site=https://vps.shuidazhe.com&Menu=yes" class=" suck pointer" style="display:block;">
          联系客服
        </a>
      <!-- <button>刷新页面</button> -->
    </div>
  </div>
  <div class="menu-energy">
    <div class="reward-energy fleft">
      <div class="reward-energy-title fl">我的能量值<span @mouseover="fnShowInfo" @mouseout="fnShowInfo"></span>：{{getEnergy?getEnergy.data:0}}</div>
      <div class="reward-energy-process fl">
        <span v-if="getEnergy" :style="'width:'+(3*(getEnergy.data>=100?100:getEnergy.data))+'px'"></span>
      </div>
      <div v-if="isShowEnergy" class="reward-energy-infor">
        <p><em>·</em>一次性开启1个宝箱可获得5点能量值，一次性开启12个宝箱可获得50个能量值.</p>
        <p><em>·</em>能量值达到100后即可获得能量奖励.</p>
        <p><em>·</em>能量值满100后，超出的能量值将给与累积；玩家可多次获得奖励，无上限.</p>
      </div>
      <div class="reward-energy-btn fr" @click="fnReceiveEnergy()">领福袋</div>
    </div>
    <div class="menu-down-right fright">
      <span class="fleft">全新玩法 超高返奖</span>
      <button class="fright" @click="fnShowRules">规则介绍</button>
    </div>

  </div>
</div>
</template>
<script>
import Http from "@/common/http";
import router from "@/router";
export default {
  data(){
    return{
      isLogin:true,
      isShowEnergy:false,
    }
  },
  methods:{
    fnOPenRecharge(){
      this.$store.commit('mutationsIsShowRecharge',true);
    },
    fnShowInfo(){
      this.isShowEnergy=!this.isShowEnergy;
    },
    showTancon(num){
      console.log('num',num)
      this.$store.commit('mutationsIsShowTabcon',num)
    },
    fnOpenLogin(){
      this.$store.commit('mutationsIsLoginAddActive',true);
      // this.$store.dispatch('logout');
      this.$store.commit('showLoginDialog',true);
      setTimeout(()=>{
        this.$store.commit("istestBooleam",true);
      },100)
    },
    layout(){
      // this.$store.dispatch('logout');
      let self=this;
      Http.post('logout').then(response => {
        if(response.data.code==0){
          self.$store.commit('mutationsEnergyData',0)
          self.$store.commit('mutationsMycardsData',[]);
          self.$store.commit('mutationsFreeCount',1);
          self.$store.commit('userInfo', null);
          self.$store.commit('logout');

        }
      });
    },
    fnReceiveEnergy(){
      let self = this;
      let userInfo =this.$store.state.user.userInfo;
      if(!userInfo){
        this.fnOpenLogin();
        return;
      }
      Http.post('/activity/box/getRewardBox').then(response=>{
        console.log('领取状态',response)
        if(response.data.code==0){
          self.$store.dispatch('actionsEnergyData');
          self.$store.commit('mutationsIsShowLuckyBagInfo',true)
          self.$store.commit('mutationsLuckyBagData',response.data.data)
        }else if(response.data.code==-200){
          self.$store.commit('mutationsIsShowEnergy',true)
        }
      }).catch(Http.onError);


    },
    fnShowRules(){
      this.$store.commit('mutationsIsSHowRules',true)
    },
  },
  mounted() {
    this.$store.dispatch('userInfo');
    this.$store.dispatch('actionsEnergyData');

  },
  computed:{
    getUserInfo(){
      let userdata =this.$store.state.user.userInfo;
      this.$store.commit('mutationsTreasureMycai',userdata?userdata.cai:0)
      return userdata;
    },
    getEnergy(){
      return this.$store.state.treasure.energyData?this.$store.state.treasure.energyData:null;
    },
    getIsShowTabcon(){
      return this.$store.state.treasure.isShowTabcon;
    },
    getTreasureMycai(){
       return this.$store.state.treasure.treasureMycai;
    },

  },
}
</script>
<style lang="scss" scoped src="@/assets/css/treasure.css"></style>



