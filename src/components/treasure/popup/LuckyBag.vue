<template>
<div class="popup" v-show="getIsShowLucky">
  <div class="popup-bg"></div>
  <div class="popup-lucky">
    <div class="popup-close" @click="fnCLosePopup"></div>
    <div class="popup-lucky-open-btn" @click="openLuckyInfo">开启福袋</div>
  </div>
</div>
</template>
<script>
import Http from "@/common/http";
export default {
  data(){
    return{
      isLogin:true,
      moneyValue:{
        value:'',
      },
      payValue:0,
      payTypeString:'aliplay',
      payType:{
        aliplay:true,
        wechat:false,
      },
      payBuyType:['cai','aliplay','wechat']
    }
  },
  methods:{
    openLuckyInfo(){
      this.fnCLosePopup();
      this.$store.commit('mutationsIsShowLuckyBagInfo',true);
    },
    fnCLosePopup(){
      this.$store.commit('mutationsIsCanClickTwelve',true)
      this.$store.commit('mutationsIsShowLucky',false);
    },
  },
  computed:{
    getIsShowLucky(){
      return this.$store.state.treasure.isShowLucky;
    },
    getUserInfo(){
      return this.$store.state.user.userInfo;
    },

  },
}
</script>
<style lang="scss" scoped src="@/assets/css/treasure.css"></style>



