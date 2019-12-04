<template>
  <div class="rechargepop" v-if="getMyUserInfo&&isSigninPupop">
    <div class="rechargepop-bg" @click="fnClosePop"></div>
    <div class="rechargepop-main" :style="'top:'+(100+getScrolltopValue)+'px'">
      <div class="changeTeam-close" @click="fnClosePop"></div>
      <div class="recharget-main-top">
        <div class="recharge-main-tl fl">
          <img :src="require('@/assets/images/vips/VIP'+getMyUserInfo.vip_level+'.png')"  v-if="getMyUserInfo.vip_level>=1"/>
          <img :src="require('@/assets/images/vips/v'+getMyUserInfo.vip_level+'.png')" alt="" v-if="getMyUserInfo.vip_level==0">
          </div>
        <div class="recharge-main-t-level fl">
          <h1><span class="recharge-main-t-help" @mouseover="showExpend"  @mouseout="closeExpend"></span> 还需{{getMyUserInfo.expect_vip_exp-getMyUserInfo.now_vip_exp}}vip经验可升级到<span class="cl-yellow">VIP{{getMyUserInfo.vip_level+1}}</span></h1>
          <div class="recharge-main-t-help-info" v-if="isShowExpend">每充值1元，可以获得1点VIP经验.</div>
          <div class="recharge-main-t-process">
            <span :style="'width:'+parseInt((getMyUserInfo.now_vip_exp/getMyUserInfo.expect_vip_exp)*500)+'px'" class="process"></span>
            <em>{{getMyUserInfo.now_vip_exp}}/{{getMyUserInfo.expect_vip_exp}}</em>
          </div>

        </div>
        <div class="recharge-main-tl fr"><img :src="require('@/assets/images/vips/VIP'+(getMyUserInfo.vip_level+1)+'.png')"/></div>
      </div>

      <div class="have">
        <p class="type fl">拥有C币</p>
        <p class="num fl"><span v-if="getMyUserInfo">{{getMyUserInfo.cai}}</span> C</p>
      </div>
      <div class="buynum">
        <p class="type fl">购买数量</p>
        <ul class="fl buynumul">
          <li v-for="(item,index) in money_list" :class="{active:item==select_cmoney}" @click="selectMoney(item)" :key="index">{{item}}C</li>
          <li style="position:relative;top:0;left:0;"><input name="other" type="text" @keyup="inputCmoney" value="" class="other" /><span class="c">C币</span></li>
        </ul>
        <p class="tip">注：单次购买不得低于500C</p>
      </div>
      <div class="payway">
        <div class="type fl">支付方式</div>
        <div class="payment fl">
          <div class="alipay pointer" :class="{active:pay_model=='alipay'}" @click="selectPayment('alipay')"></div>
          <div class="wxpay pointer" :class="{active:pay_model=='wxpay'}" @click="selectPayment('wxpay')"></div>
        </div>
      </div>
      <div class="needpay ">
        <div class="type fl">需要支付</div>
        <div class="pay-money fl">
          <div><span class="rmb"> {{pay_cmoney}} </span>元<span class="small">(1人民币可购买100C币)</span></div>
        </div>
      </div>
      <div class="paybtn">
        <a class="gopay pointer" @click="toPay">支付</a>
      </div>

      <Wx :isshow="showWxPay" :src="qrcode_url" @closeme="close"></Wx>
    </div>
  </div>
</template>
<script>
import Wx from "./Wx"
import InputNum from "../common/InputNum"
import Http from "@/common/http"
import Qs from "qs";

export default {
  data() {
    return {
      isShowExpend:false,
      money_list: [500,1000, 2000, 5000, 10000, 20000, 40000, 80000, 100000, 200000],
        pay_model: 'alipay',
        // pay_model: 'wxpay',
        select_cmoney: 500,
        tt: null,
        scrollTopValue:0,
        isDelay:true,
    }
  },
  methods: {

    fnClosePop(){
      this.$store.commit('mutationIsShowRecharge',false)
    },
    showExpend(){
      this.isShowExpend=!this.isShowExpend
    },
    closeExpend(){
      this.isShowExpend=!this.isShowExpend
    },
    checkLogin: function() {
      if(getCookie('cid') == null) {
        this.$store.commit('showLoginDialog', true);
        this.$router.replace('home');
      }
    },
    urlencode (str) {
        str = (str + '').toString();

        return encodeURIComponent(str).replace(/!/g, '%21').replace(/'/g, '%27').replace(/\(/g, '%28').
        replace(/\)/g, '%29').replace(/\*/g, '%2A').replace(/%20/g, '+');
    },
    toPay: function() {
      var self = this
      if(!this.isDelay){
        let dataOption = {
            masseges: '操作频繁,请稍后再试',
            type: "2"
          };
          self.$store.commit("isSigninPupopDis", true);
          self.$store.commit("isSigninPupopDis", dataOption);
          return;
      }else{
        this.isDelay=false;
        setTimeout(() => {
          this.isDelay=true;
        }, 3000);
      }
      this.$store.commit('mutationIsSaveReachargePath',this.$route.query=="{}"?this.$route.path:this.$route.path+'?'+Qs.stringify(this.$route.query))
      this.$store.commit('mutationsWebPath',window.location.href.slice(0,window.location.href.indexOf(this.$route.path)));

      // return console.log(window.location.href,this.$store.state.pay.webPath,'我的路劲')
      if(this.pay_cmoney <5 ) {
        return this.alert('充值金额最小为500C');
      }
      if(this.pay_cmoney >= 10 ){
          self.$store.dispatch('getList');
      }
      if(this.pay_model == 'alipay') {
        this.$store.dispatch('toAliPay', {
          amount: this.pay_cmoney,
          redirect_url:self.$route.path,
          type:1,
        }).then(function(res){
          // return console.log('我是支付支付的哦',res)
          if(res.data.code !== 0) {
            return self.alert(res.data.message);
          }
        });
      } else if(this.pay_model == 'wxpay') {
        this.$store.dispatch('toWxPay', {
          amount: this.pay_cmoney
        }).then(function(res) {
          if(res.data.code !== 0) {
            return self.alert(res.data.message);
          }
          console.log('微信支付',res.data)
          var pay_sn = res.data.data.pay_sn;
          var date = new Date();
          console.log(date.toLocaleString(),'微信支付时间')
          // alert(self.pay_cmoney)
          if(res.data.code == 0) {
              self.tt = setInterval(function() {
                Http.get('/pay/order_status', {
                  pay_sn: pay_sn
                }).then(function(response) {
                  console.log('我是什么呢',response)
                  if(response.data.code == 0 && response.data.data == true) {
                    self.$store.dispatch('closeWxDialog');
                    self.$store.dispatch('userinfo')
                    self.$store.dispatch('userinfoshowdispatch')
                    self.$store.dispatch("userInfo")
                    self.$store.dispatch('self')
                     if( self.$route.path.indexOf('rebate')!= -1){
                      self.$store.dispatch('getStatus')
                    }
                    clearInterval(self.tt);
                    self.$router.push(self.$store.state.match.isSaveReachargePath)
                  }
                });
              }, 5000);
              setTimeout(function() {
                clearInterval(self.tt);
                self.$store.dispatch('closeWxDialog');
              }, 1000 * 60 * 6);
            }
        });
      }

    },
    selectMoney: function(cmoney) {
      this.select_cmoney = cmoney;
    },
    selectPayment: function(payment) {
      this.pay_model = payment
    },
    inputCmoney: function(event) {
      var cmoney = event.target.value
      var isN = /^[0-9]+$/g.test(cmoney);
      !isN ? cmoney = cmoney.replace(/[^0-9]/g, '') : 0;
      this.select_cmoney = cmoney
      event.target.value = cmoney
      //console.log(isN,cmoney)
    },
    close: function() {
      clearInterval(this.tt);
      this.$store.dispatch('closeWxDialog');
    }
  },
  components: {
      Wx,
      InputNum
    },
  computed: {
    isSigninPupop: function () {
      // console.log('我出来了没有呢',this.$store.state.match.isShowRecharge)
      return this.$store.state.match.isShowRecharge
    },
    getMyUserInfo:function(){
      // console.log('a',this.$store.state.user.userInfo)
      return this.$store.state.user.userInfo
    },
    pay_cmoney() {
      var totalCMoney = 0
      totalCMoney = this.select_cmoney / 100
      return Number(totalCMoney)
    },
    showWxPay() {
      return this.$store.state.pay.showWxPay;
    },
    qrcode_url() {
      return this.$store.state.pay.wxPayInfo ? this.$store.state.pay.wxPayInfo.url : '';
    },
    getScrolltopValue:function(){
      return this.$store.state.match.scrolltopValue;
    }
  }
}
</script>
<style lang="scss" scoped src="@/assets/css/popupRecharge.css"></style>
