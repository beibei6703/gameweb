<template>
  <div id="checkin">
    <div class="top" v-if="getcheckindatalist">
      <p class="has_checked_day">
        您已累计签到&nbsp;
        <span class="weight_txt">{{getcheckindatalist.this_month_count}}</span> &nbsp;天
      </p>
      <!-- <p class="chechin_btn pointer" @click="handleshowcheckin" >签到</p> -->
      <p class="chechin_btn pointer" @click="handleshowcheckin" v-if="!isCheckin">签到</p>
      <p class="has_checked_btn" v-else>已签到</p>
      <p class="little_tip">（关注微信公众号,在H5端同时签到可以获得 <span class="special">双倍奖励）</span> </p>

    </div>
    <div
      class="tip"
      v-if="getcheckindatalist"
    >每日签到可获得：{{thousandBitSeparator(getcheckindatalist.reward.cai)}} C + {{getcheckindatalist.reward.exp}} 经验</div>
    <div class="pure_txt">累积签到奖励：</div>
    <div class="checkin_progress">
      <div class="below_progress">
        <div class="daily_progress" :style="{ width: width }"></div>
        <ul class="node_pic" v-if="getcheckindatalist" :data-isCheckin="isCheckinRewardShow">
          <li>
            <img
              src="../../../assets/img/garden/first_day.png"
              alt
              :class="{cannot_get:getcheckindatalist.this_month_count<1}"
            >
          </li>
          <li :class="{cannot_get:getcheckindatalist.this_month_count<5 }">
            <img src="../../../assets/img/garden/prize1.png" alt class="prize_icon" @click="handlerClickChest($event,1)" v-if="getcheckindatalist.this_month_count>=5 && !getcheckindatalist.reward_state[1]">
            <img src="../../../assets/img/garden/prize1.png" alt class="prize_icon" v-else>
            <img src="../../../assets/img/garden/received.png" alt="" class="received_icon" v-if="getcheckindatalist.reward_state[1]">
            <p class="gold_txt ">累计{{getcheckindatalist.config[1].goal}}天</p>
            <p class="gold_txt ">{{getcheckindatalist.config[1].reward.cai}}C+{{getcheckindatalist.config[1].reward.debris}}P</p>
          </li>
          <li :class="{cannot_get:getcheckindatalist.this_month_count<10 }">
            <img src="../../../assets/img/garden/prize2.png" alt class="prize_icon " @click="handlerClickChest($event,2)" v-if="getcheckindatalist.this_month_count>=10 && !getcheckindatalist.reward_state[2]">
            <img src="../../../assets/img/garden/prize2.png" alt class="prize_icon " v-else>
            <img src="../../../assets/img/garden/received.png" alt="" class="received_icon" v-if="getcheckindatalist.reward_state[2]">
            <p class="gold_txt ">累计{{getcheckindatalist.config[2].goal}}天</p>
            <p class="gold_txt ">{{getcheckindatalist.config[2].reward.cai}}C+{{getcheckindatalist.config[2].reward.debris}}P</p>
          </li>
          <li :class="{cannot_get:getcheckindatalist.this_month_count<15 }">
            <img src="../../../assets/img/garden/prize3.png" alt class="prize_icon "  @click="handlerClickChest($event,3)" v-if="getcheckindatalist.this_month_count>=15 && !getcheckindatalist.reward_state[3]">
            <img src="../../../assets/img/garden/prize3.png" alt class="prize_icon " v-else>
            <img src="../../../assets/img/garden/received.png" alt="" class="received_icon" v-if="getcheckindatalist.reward_state[3]">
            <p class="gold_txt ">累计{{getcheckindatalist.config[3].goal}}天</p>
            <p class="gold_txt ">{{getcheckindatalist.config[3].reward.cai}}C+{{getcheckindatalist.config[3].reward.debris}}P</p>
          </li>
          <li :class="{cannot_get:getcheckindatalist.this_month_count<20 }">
            <img src="../../../assets/img/garden/prize4.png" alt class="prize_icon "  @click="handlerClickChest($event,4)" v-if="getcheckindatalist.this_month_count>=20 && !getcheckindatalist.reward_state[4]">
            <img src="../../../assets/img/garden/prize4.png" alt class="prize_icon " v-else>
            <img src="../../../assets/img/garden/received.png" alt="" class="received_icon" v-if="getcheckindatalist.reward_state[4]">
            <p class="gold_txt ">累计{{getcheckindatalist.config[4].goal}}天</p>
            <p class="gold_txt ">{{getcheckindatalist.config[4].reward.cai}}C+{{getcheckindatalist.config[4].reward.debris}}P</p>
          </li>
          <li :class="{cannot_get:getcheckindatalist.this_month_count<25 }">
            <img src="../../../assets/img/garden/prize5.png" alt class="prize_icon "  @click="handlerClickChest($event,5)" v-if="getcheckindatalist.this_month_count>=25 && !getcheckindatalist.reward_state[5]">
            <img src="../../../assets/img/garden/prize5.png" alt class="prize_icon " v-else>
            <img src="../../../assets/img/garden/received.png" alt="" class="received_icon" v-if="getcheckindatalist.reward_state[5]">
            <p class="gold_txt ">累计{{getcheckindatalist.config[5].goal}}天</p>
            <p class="gold_txt ">{{getcheckindatalist.config[5].reward.cai}}C+{{getcheckindatalist.config[5].reward.debris}}P</p>
          </li>
        </ul>
      </div>
    </div>
    <div class="rwdia">
      <All :isshow="hideis" @closeme="closechild" :number="currentnum"></All>
      <Signindialog :isshows="signdiashow" @closesigndia="signdaiclose"></Signindialog>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      hideis: false,
      currentnum: 1,
      signdiashow: false
    };
  },
  mounted() {
    this.$store.dispatch("checkinprogessdispatch");
  },
  computed: {
    isCheckin() {
      return this.$store.state.home.woquya
        ? this.$store.state.home.woquya
        : false;
    },
    getcheckindatalist() {
      return this.$store.state.home.getcheckindatalist
        ? this.$store.state.home.getcheckindatalist
        : null;
    },
    width() {
      return this.$store.state.home.getcheckinwidth
        ? this.$store.state.home.getcheckinwidth
        : null;
    },
    isCheckinRewardShow(){
      this.hideis = this.$store.state.home.isCheckinRewardShow;
      return this.$store.state.home.isCheckinRewardShow || false;
    }
  },
  methods: {
    handleshowcheckin(event) {
        this.$store.dispatch("checkindispatch");
        this.signdiashow = true;
        this.isSignin = true;
        this.$store.commit("woquyamutation", true);
        // this.$store.commit("dailycheckwidth");
        this.$store.commit("dailycheckday");
        this.$store.commit("userinfowidthmu");
        this.$store.commit("userinfoexpmu");
        this.$store.commit("userinfocaimu");
    },
    closechild(value) {
      this.hideis = value;
    },
    signdaiclose(value) {
      this.signdiashow = value;
    },
    handlerClickChest(event, nums) {
      this.currentnum = nums;
      let checkinData = this.$store.state.home.getcheckindatalist || null ;
      let userInfo= this.$store.state.user.userInfo || null ;
      // if(nums==3 || nums==4 || nums==5){
      //   if(checkinData.this_month_count>=15 && !userInfo.mobile){
      //     let dataOption ={
      //       'masseges':'为了您的账户安全，请先绑定手机号',
      //       'type':'2',
      //     }
      //     this.$store.commit('isSigninPupopDis',true);
      //     this.$store.commit('isSigninPupopDis',dataOption);
      //   }else{
      //     this.hideis = true;
      //     this.$store.commit("currentsigncom", nums-1);
      //     this.$store.commit("havetoreceive", nums-1);
      //     this.$store.dispatch("checkindialogdis", { level: nums });
      //   }
      // }else{
      //   this.hideis = true;
      //   this.$store.commit("currentsigncom", nums-1);
      //   this.$store.commit("havetoreceive", nums-1);
      //   this.$store.dispatch("checkindialogdis", { level: nums });
      // }
      // this.hideis = true;
      this.$store.commit("currentsigncom", nums-1);
      this.$store.commit("havetoreceive", nums-1);
      this.$store.dispatch("checkindialogdis", { level: nums,type:1});
    },
  }
};
</script>

<style scoped lang="scss">
#checkin {
  width: 950px;
  height: 283px;
  background: rgba(46, 45, 49, 1);
  .top {
    width: 100%;
    display: flex;
    text-align: left;
    padding: 35px 0 6px 31px;
    color: rgba(220, 220, 220, 1);
    font-size: 12px;
    .weight_txt {
      font-size: 36px;
      font-weight: 800;
      color: #fff;
    }
    .little_tip{
      line-height: 48px;
      color:#fff;
    }
    .special{
      color: #CEA137;
    }
    .chechin_btn {
      width: 54px;
      height: 24px;
      line-height: 24px;
      text-align: center;
      color: #fff;
      font-size: 12px;
      background: url("../../../assets/img/garden/checkin_btn.png") no-repeat;
      margin: 12px 20px;
    }
    .has_checked_btn {
      width: 55px;
      height: 24px;
      line-height: 24px;
      text-align: center;
      color: #fff;
      font-size: 12px;
      background: rgba(86, 86, 86, 1);
      border-radius: 2px;
      margin: 12px 20px;
    }
  }
  .tip {
    width: 229px;
    height: 23px;
    line-height: 23px;
    background: rgba(59, 59, 64, 1);
    opacity: 0.6;
    border-radius: 1px;
    font-size: 12px;
    color: rgba(184, 184, 184, 1);
    margin-left: 32px;
  }
  .pure_txt{
    text-align: left;
    font-size: 12px;
    color: #fff;
    padding:20px 0 0 31px;
  }
  .checkin_progress {
    padding: 59px 0 0 52px;
    .below_progress {
      width: 758px;
      height: 2px;
      background: rgba(173, 173, 173, 0.05);
      position: relative;
    }
    .daily_progress {
      // width: 120px;
      height: 2px;
      background: linear-gradient(to right, #cea50d, #adadad);
    }
    .node_pic {
      width: 100%;
      display: flex;
      position: absolute;
      .gray_txt {
        color: rgba(173, 173, 173, 1);
      }
      .cannot_get {
        -webkit-filter: grayscale(100%);
        -moz-filter: grayscale(100%);
        -ms-filter: grayscale(100%);
        -o-filter: grayscale(100%);
        filter: grayscale(100%);
        filter: gray;
      }
      li {
        position: relative;
        width: 68px;
        font-size: 12px;
        line-height: 14px;
        text-align: center;
        color: #cea50d;
        img {
          display: block;
        }
        .received_icon{
          width: 19px;
          height: 19px;
          position: absolute;
        }
        &:nth-child(1) {
          width: 27px;
          height: 27px;
          top: -17px;
          left: -10px;
        }
        &:nth-child(2) {
          .prize_icon {
            width: 50px;
            height: 26px;
          }
          .received_icon{
            top:11px;
            right: 9px;
          }
          .gold_txt{
            margin-left: -13px;
          }
          top: -18px;
          left: 76.6px;
        }
        &:nth-child(3) {
          .prize_icon {
            width: 48px;
            height: 40px;
          }
          .received_icon{
            top:25px;
            right: 9px;
          }
          .gold_txt{
            margin-left: -22px;
          }
          top: -32px;
          left: 167.6px;
        }
        &:nth-child(4) {
          .prize_icon {
            width: 64px;
            height: 48px;
          }
          .received_icon{
            top:32px;
            right: -6px;
          }
          top: -40px;
          left: 250.2px;
        }
        &:nth-child(5) {
          .prize_icon {
            width: 68px;
            height: 51px;
          }
          .received_icon{
            top:36px;
            right: -6px;
          }
          top: -44px;
          left: 327.2px;
        }
        &:nth-child(6) {
          .prize_icon {
            width: 72px;
            height: 52px;
          }
          .received_icon{
            top:36px;
            right: -12px;
          }
          .gold_txt{
            margin-left: 4px;
          }
          top: -45px;
          left: 416.8px;
        }
      }
    }
  }
}
</style>
