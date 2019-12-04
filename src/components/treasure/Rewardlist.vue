<template>
<div id="rewardlist" v-if="getIsShowTabcon==1">
  <div class="reward-list">
    <div class="reward-list-center">
      <div class="reward-list-cn-special">限时特惠 买10送2</div>
      <div class="reward-list-cn-btn fleft" @click="openFreeBox" :class="{active:getFreeCount>0}">
        <p :class="{active:!getIsCanClickOne}">
          {{getFreeCount==0?'开福袋':'免费开启一次'}}
          <span v-if="getFreeCount==0" >500c<b>/</b>5元1次</span>
        </p>
      </div>
      <div class="reward-list-cn-btn fright" @click="openTwelve">
        <p :class="{active:!getIsCanClickTwelve}">
        福袋12连开
        <span>5000c<b>/</b>50元12次</span>
        </p>
      </div>
    </div>
    <ul class="reward-list-ul">
      <li v-for="(item,key) in getLotteryData" :key="key" :class="{active:getRecordIndex==key}" v-if="key<=4">
        <div class="ImgOut"><span><img :src="item.src"/></span></div>
        <div class="reward-list-text" :class="{active:item.id!=8000001}"><p>{{item.name+(item.id==8000001?item.value+'c':'')}}<span v-if="item.id!=8000001">{{item.value}}{{item.id==8000001?'c':'元'}}</span></p></div>
        <div class="reward-list-probability">概率：{{item.probability}}%</div>
      </li>
      <li v-for="(item,key) in getLotteryData" :key="key" :class="{active:getRecordIndex==key}" v-if="key>4&&key<=8" style="position:absolute">
        <div class="ImgOut"><span><img :src="item.src"/></span></div>
        <div class="reward-list-text" :class="{active:item.id!=8000001}"><p>{{item.name}}<span v-if="item.id!=8000001">{{item.value}}元</span></p></div>
        <div class="reward-list-probability">{{item.probability}}%</div>
      </li>
      <li v-for="(item,key) in getLotteryData" :key="key" :class="{active:getRecordIndex==key}" v-if="key>8&&key<=11" style="position:absolute">
        <div class="ImgOut"><span><img :src="item.src"/></span></div>
        <div class="reward-list-text" :class="{active:item.id!=8000001}"><p>{{item.name}}<span v-if="item.id!=8000001">{{item.value}}元</span></p></div>
        <div class="reward-list-probability">{{item.probability}}%</div>
      </li>
      <li v-for="(item,key) in getLotteryData" :key="key" :class="{active:getRecordIndex==key}" v-if="key>11&&key<=14" style="position:absolute">
        <div class="ImgOut"><span><img :src="item.src"/></span></div>
        <div class="reward-list-text" :class="{active:item.id!=8000001}"><p>{{item.name}}<span v-if="item.id!=8000001">{{item.value}}元</span></p></div>
        <div class="reward-list-probability">{{item.probability}}%</div>
      </li>

    </ul>

  </div>

  <div :data-flag="getIsStartRoll" style="position:absolute;top:0;left:0; width:0; height:0; overflow:hidden;">{{getIsStartRoll?'对':'错'}}</div>

</div>
</template>
<script>
import Http from "@/common/http";
// import LuckToast from 'components/luckToast.vue'
export default {
  data(){
    return{
      isShowEnergy:false,
      index: -1,    // 当前转动到哪个位置，起点位置
      count: 15,    // 总共有多少个位置
      timer: 0,    // 每次转动定时器
      speed: 200,   // 初始转动速度
      times: 0,    // 转动次数
      cycle: 45,   // 转动基本次数：即至少需要转动多少次再进入抽奖环节
      prize: -1,   // 中奖位置
      // endPrize:0,// 最终中奖位置
      isCanClick:true,//是否可以点击
    }
  },
  updated() {
    let isStartRoll=this.$store.state.treasure.isStartRoll;
    if(isStartRoll){
      this.startRoll();
    }
  },
  methods:{
    fnOpenLogin(){
      this.$store.commit('mutationsIsLoginAddActive',true);
      this.$store.dispatch('logout');
      this.$store.commit('showLoginDialog',true);
      setTimeout(()=>{
        this.$store.commit("istestBooleam",true);
      },100);
    },
    openFreeBox(){
      let isCanClickOne=this.$store.state.treasure.isCanClickOne;
      if(!isCanClickOne)return;
      this.$store.commit('mutationsIsCanClickOne',false)
      let self =this;
      let freeCount =this.$store.state.treasure.freeCount;
      // freeCount=0;
      let listdata =this.$store.state.treasure.lotteryData;
      let userInfo =this.$store.state.user.userInfo;
      if(!userInfo){
        this.fnOpenLogin();
        this.$store.commit('mutationsIsCanClickOne',true)
        return;
      }
      if(freeCount>0){
        Http.post('/activity/box/getFreeBox').then(response => {
            setTimeout(() => {
              self.$store.commit('mutationsIsCanClickOne',true)
            }, 3000);
            if (response.data.code == 0) {
              self.$store.dispatch('actionsFreeCount');
              self.$store.dispatch('actionsEnergyData')
              console.log('中的是什么呢',response.data.data)
              self.$store.commit('mutationsLuckyBagData',response.data.data)
              self.$store.commit('mutationsIsShowLuckyBagInfo',true);

            }else if(response.data.code==-1){
              self.fnOpenLogin();
              // self.$store.dispatch('userInfo');
              self.$store.commit('mutationsEnergyData',0)
              self.$store.commit('mutationsMycardsData',[]);
              self.$store.commit('mutationsFreeCount',1);
            }
        }).catch(Http.onError);
      }else{
        let mycai =this.$store.state.treasure.treasureMycai;
        // mycai=500;
        if(mycai>=500){
          let params={
            count:1
          }
          Http.post('/activity/box/buy/cai',params).then(response=>{
            if(response.data.code==0){
              // self.$store.dispatch('userInfo')
              self.$store.commit('mutationsTreasureMycai',mycai-500)

              self.$store.commit('mutationsLuckyBagData',response.data.data)
              console.log('我中的是什么',response.data.data)
              self.$store.commit('mutationsIsCanClickTwelve',false)
              self.startRoll();
            }else if(response.data.code==-1){
              self.fnOpenLogin();
              // self.$store.dispatch('userInfo')
              self.$store.commit('mutationsEnergyData',0)
              self.$store.commit('mutationsMycardsData',[]);
              self.$store.commit('mutationsFreeCount',1);
              self.$store.commit('mutationsIsCanClickTwelve',true)
              self.$store.commit('mutationsIsCanClickOne',true)
            }else{
              setTimeout(() => {
                self.$store.commit('mutationsIsCanClickOne',true)
                self.$store.commit('mutationsIsCanClickTwelve',true)
              }, 3000);
              let dataOption = {
                'masseges': response.data.message,
                'type': '2',
              }
              self.$store.commit('isSigninPupopDis', true);
              self.$store.commit('isSigninPupopDis', dataOption);
              if(response.data.code==-200){
                self.$store.dispatch('userInfo')
              }
            }
          }).catch(Http.onError);

        }else{
          this.$store.commit('mutationsIsCanClickTwelve',false)
          this.$store.commit('mutationsIsShowUpdate',true)
          this.$store.commit('mutationsIsShowMoneyNoEnough',{isShow:true,count:1,paymoney:5,payType:2})
        }
      }
    },
    openTwelve(){
      let isCanClickTwelve=this.$store.state.treasure.isCanClickTwelve
      if(!isCanClickTwelve)return;
      this.$store.commit('mutationsIsCanClickTwelve',false)
      let userInfo =this.$store.state.user.userInfo;
      let mycai =this.$store.state.treasure.treasureMycai;
      let self=this;
      if(!userInfo){
        this.fnOpenLogin();
        this.$store.commit('mutationsIsCanClickTwelve',true)
        return;
      }
      if(mycai>=5000){
        let params={
          count:10
        }
        Http.post('/activity/box/buy/cai',params).then(response=>{
          // setTimeout(() => {
          //   self.$store.commit('mutationsIsCanClickTwelve',true)
          // }, 3000);
          if(response.data.code==0){
            self.$store.commit('mutationsTreasureMycai',mycai-5000)

            // console.log('我成功了吗')
            // self.$store.dispatch('userInfo');
            console.log('我抽中了什么呢',response.data.data)
            self.$store.commit('mutationsLuckyBagData',response.data.data)
            self.$store.commit('mutationsIsShowLucky',true);
          }else if(response.data.code==-1){
            self.fnOpenLogin();
            // self.$store.dispatch('userInfo')
            self.$store.commit('mutationsEnergyData',0)
            self.$store.commit('mutationsMycardsData',[]);
            self.$store.commit('mutationsFreeCount',1);
            self.$store.commit('mutationsIsCanClickTwelve',true)
            self.$store.commit('mutationsIsCanClickOne',true)
          }else{
            let dataOption = {
              'masseges': response.data.message,
              'type': '2',
            }
            self.$store.commit('isSigninPupopDis', true);
            self.$store.commit('isSigninPupopDis', dataOption);
            self.$store.commit('mutationsIsCanClickTwelve',true)
            self.$store.commit('mutationsIsCanClickOne',true)
            if(response.data.code==-200){
              self.$store.dispatch('userInfo')
            }
          }
        }).catch(Http.onError);
      }else{
        this.$store.commit('mutationsIsShowUpdate',true)
        this.$store.commit('mutationsIsShowMoneyNoEnough',{isShow:true,count:10,paymoney:50,payType:2})
      }

      // this.$store.commit('mutationsIsShowMoneyNoEnough',true)
    },
    // 开始转动
    startRoll () {
      this.$store.commit('mutationsIsStartRoll',false)
      this.times += 1  // 转动次数
      this.oneRoll()  // 转动过程调用的每一次转动方法，这里是第一次调用初始化
      // 如果当前转动次数达到要求 && 目前转到的位置是中奖位置
      if (this.times > this.cycle+15 && this.prize === this.$store.state.treasure.recordIndex) {
        clearTimeout(this.timer)   // 清除转动定时器，停止转动
        this.prize = -1
        this.times = 0;
        this.speed=200;
        this.cycle=45;
        this.times=15;
        this.timer=0;
        console.log('你已经中奖了');
        setTimeout(() => {
          // this.index=-1;
          this.$store.commit('mutationsIsShowLuckyBagInfo',true)
        }, 500);
      } else {
        if (this.times < this.cycle) {
          this.speed -= 10   // 加快转动速度
          console.log('加速度了哦')

        } else if (this.times === this.cycle) {    // 随机获得一个中奖位置
          // const index = parseInt(Math.random() * 10, 0) || 0
          const index =this.$store.state.treasure.endPrize;
          this.prize = index
          console.log(`中奖位置${this.prize}`)

        } else if (this.times > this.cycle + 15 &&(this.prize === 0  || this.prize === this.$store.state.treasure.recordIndex + 1)) {
          this.speed += 40
          console.log('我开始减慢速度了么')
        } else {
          this.speed += 20
          console.log('这是什么情况',this.speed)
        }

        if (this.speed < 40) {
          // this.speed+=100
          this.speed = 40
          // console.log('我的速度小于40哦')

        }
        this.timer = setTimeout(this.startRoll, this.speed)
      }
    },
    // 每一次转动
    oneRoll () {
      let index = this.$store.state.treasure.recordIndex  // 当前转动到哪个位置
      const count = this.count  // 总共有多少个位置
      index += 1
      if (index > count - 1) {
        index = 0
      }
      this.$store.commit('mutationsRecordIndex',index)
      // this.index = index
    },
  },
  mounted() {
    this.$store.dispatch('actionsFreeCount')
    this.$store.dispatch('actionsProbability')

  },
  computed:{
    getUserInfo(){
      return this.$store.state.user.userInfo;
    },
    getFreeCount(){
      return this.$store.state.treasure.freeCount;
    },
    getLotteryData(){
      return this.$store.state.treasure.lotteryData;
    },
    getIsShowTabcon(){
      return this.$store.state.treasure.isShowTabcon;
    },
    getIsStartRoll(){
      return this.$store.state.treasure.isStartRoll;
    },
    getIsCanClickOne(){
      return this.$store.state.treasure.isCanClickOne;
    },
    getIsCanClickTwelve(){
      return this.$store.state.treasure.isCanClickTwelve;
    },
    getRecordIndex(){
      return this.$store.state.treasure.recordIndex;
    },
  },

}
</script>
<style lang="scss" scoped src="@/assets/css/treasure.css"></style>


