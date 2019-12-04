<template>
  <div class="popup" v-if="getIsEnergyShort">
    <div class="popup-bg"></div>
    <div class="">
      <div class=" popup-main energyShortage">
        <div class="popup-close" @click="fnCLosePopup"></div>
        <img src="https://imgcdn.api.com/images/treasure/warning.png" alt="" class="waring">
        <p class="warn_text_16px">能量值不足！</p>
        <p class="warn_text_14px">暂无领取福袋机会</p>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data(){
      return{}

    },
    methods:{
      fnCLosePopup(){
      this.$store.commit('mutationsIsShowEnergy',false);
    },
    },
    computed:{
      getIsEnergyShort(){
        return this.$store.state.treasure.isShowEnergy;
      },
    },

  }
</script>
<style lang="scss" scoped src="@/assets/css/treasure.css"></style>
<style scoped lang="scss">
  .energyShortage{
    width: 342px;
    height: 200px;
    margin:-100px 0 0 -171px;
    background: url("https://imgcdn.api.com/images/treasure/popup_energy_shortage.png") no-repeat;
    // background-size: cover;
    padding-top: 50px;
    .waring{
      width: 34px;
      height: 34px;
      display: block;
      margin: 8px auto;
    }
    p{
      text-align: center;
      color: #fff;
    }
    .warn_text_16px{
      font-size: 16px;
      font-weight: 900;
      line-height: 26px;
    }
    .warn_text_14px{
      font-size: 14px;
      line-height: 22px;
    }

  }
</style>


