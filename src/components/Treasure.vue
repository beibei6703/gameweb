<template>
  <div id="treasure">
    <router-link tag="div" to="/home" class="logo pointer">
      <img :src="require('@/assets/img/small_pic/logo.png')" alt="丰收网" class="fleft">
      <span class="fleft">www.api.com</span>
    </router-link>
    <div class="treasure-main">
    <Navigintor/>
    <Maincontent/>
    </div>
    <Rechargepop/>
    <LuckyBag/>
    <LuckyBagInfo/>
    <EnergyShortage/>
    <OpenRules/>
    <MyRecord/>
    <MoneyNotEnough/>
  </div>
</template>
<script>
import Navigintor from './treasure/Navigintor.vue'
import Maincontent from './treasure/Maincontent.vue'

import Rechargepop from "./treasure/popup/Recharge.vue";
import LuckyBag from './treasure/popup/LuckyBag.vue'
import LuckyBagInfo from './treasure/popup/LuckyBagInfo.vue'
import EnergyShortage from './treasure/popup/EnergyShortage.vue'
import OpenRules from './treasure/popup/OpenRules.vue'
import MyRecord from './treasure/popup/MyRecord.vue'
import MoneyNotEnough from './treasure/popup/MoneyNotEnough.vue'
export default {
  data(){
    return{}
  },
  methods:{},
  mounted() {

  },
  components:{
    Navigintor,
    Maincontent,
    Rechargepop,
    LuckyBag,
    LuckyBagInfo,
    EnergyShortage,
    OpenRules,
    MyRecord,
    MoneyNotEnough,
  },

}
</script>
<style lang="scss" scoped src="@/assets/css/treasure.css"></style>






