<template>
<div class="popup" v-show="getIsShowWechat">
  <div class="popup-bg" @click="fnCLosePopup"></div>
  <div class="popup-main">
    <div class="popup-close" @click="fnCLosePopup">×</div>
    <div class="popup-title">充值</div>
    <div class="popup-main-down">
      <div class="popup-main-wechat"></div>
    </div>
  </div>
</div>
</template>
<script>
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
      }
    }
  },
  methods:{
    fnCLosePopup(){
      this.$store.commit('mutationsIsShowWechat',false);
    },

  },
  computed:{
    getIsShowWechat(){
      return this.$store.state.treasure.isShowWechat;
    },
  },
}
</script>
<style lang="scss" scoped src="@/assets/css/treasure.css"></style>



