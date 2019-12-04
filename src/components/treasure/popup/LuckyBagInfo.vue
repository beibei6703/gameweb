<template>
<div class="popup" v-show="getIsShowLuckyBagInfo">
  <div class="popup-bg"></div>
  <div class="popup-main popup-luckyinfo">
    <div class="popup-close" @click="fnCLosePopup">×</div>
    <div class="popup-title">恭喜你！获得</div>
    <div class="popup-main-down">
      <div class="popup-main-lucky-containter">
        <div class="popup-main-lucky-list" v-if="getLuckyBagData" :style="getLuckyBagData.length>1?'margin:10px auto 0;':'margin:20px auto 10px;'">
          <ul>
            <li v-for="(item,key) in getLuckyBagData" :key="key" :class="{active:getLuckyBagData.length<2}">
              <div class="ImgOut1" :class="{animate:item.product_id!=8000001}">
                  <span>
                    <img :src="item.product_pic"/>
                  </span>
                  <p v-if="item.product_id==8000001">{{item.num+'C'}}</p>
                </div>
            </li>
          </ul>
        </div>

      </div>
      <div class="popup-mian-lucky-text">
        <p><em>·</em>获得得C币及道具可登录（丰收网） <a href="https://www.api.com" target="_blank">www.api.com</a>进行赛事预测或兑换点券、Q币、话费等虚拟卡</p>
        <p><em>·</em>若有其他疑问可联系客服查询</p>
      </div>
      <div class="popup-main-lucky-btn-out">
        <div class="popup-main-lucky-btn fleft"><a href="https://www.api.com/compete/Quizzeszone?ID=all" target="_blank">去预测</a></div>
        <div class="popup-main-lucky-btn fright" @click="fnCLosePopup">知道了</div>
      </div>
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
      if(this.$store.state.treasure.luckyBagData.length==1){
        this.$store.commit('mutationsRecordIndex',-1)
      }
      this.$store.commit('mutationsIsCanClickOne',true)
      this.$store.commit('mutationsIsCanClickTwelve',true)
      this.$store.commit('mutationsIsShowLuckyBagInfo',false);
      this.$store.commit('mutationsLuckyBagData',[]);
      this.$store.dispatch('userInfo');
      this.$store.dispatch('actionsMycardsData');
      this.$store.dispatch('actionsEnergyData');

    },
  },
  computed:{
    getIsShowLuckyBagInfo(){
      return this.$store.state.treasure.isShowLuckyBagInfo;
    },
    getLuckyBagData(){
      let renderData =this.$store.state.treasure.luckyBagData;

      return renderData;
    },
  },
}
</script>
<style lang="scss" scoped src="@/assets/css/treasure.css"></style>



