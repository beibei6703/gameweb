<template>
  <div class="topup">
    <div class="top">
      <p class="title">充值</p>
    </div>
    <div class="main">
      <div class="test">
        <Selfinfo/>
      </div>
      <div class="have">
        <p class="type fleft">拥有C币</p>
        <p class="num fleft"><span v-if="userinfoshowlist">{{userinfoshowlist.cai}}</span> C</p>
      </div>
      <div class="buynum">
        <p class="type fleft">购买数量</p>
        <ul class="fleft buynumul">
          <li v-for="(item,index) in money_list" :class="{active:item==select_cmoney}" @click="selectMoney(item)" :key="index">{{item}}C</li>
          <li style="position:relative;top:0;left:0;"><input name="other" type="text" @keyup="inputCmoney" value="" class="other" /><span class="c">C币</span></li>
        </ul>
        <p class="tip">注：单次购买不得低于500C</p>
      </div>
      <div class="payway">
        <div class="type fleft">支付方式</div>
        <div class="payment fleft">
          <div class="alipay pointer" :class="{active:pay_model=='alipay'}" @click="selectPayment('alipay')"></div>
          <div class="wxpay pointer" :class="{active:pay_model=='wxpay'}" @click="selectPayment('wxpay')"></div>
        </div>
      </div>
      <div class="needpay ">
        <div class="type fleft">需要支付</div>
        <div class="pay-money fleft">
          <div><span class="rmb"> {{pay_cmoney}} </span>元<span class="small">(1人民币可购买100C币)</span></div>
        </div>
      </div>
      <div class="paybtn">
        <a class="gopay pointer" @click="toPay">支付</a>
      </div>
      <!-- iframe -->
       <!-- <iframe  class="alipaysubmit" name="alipaysubmit" style="width:600px;height:600px;" :srcdoc="this.$store.state.pay.aliContent"></iframe> -->
      <Wx :isshow="showWxPay" :src="qrcode_url" @closeme="close"></Wx>
      <!-- <TestDialog v-if="this.$store.state.isDialogShow.isAliShow"/> -->
    </div>
  </div>
</template>
<script>
  import Wx from "../dialog/Wx"
  import InputNum from "../common/InputNum"
  import Http from '@/common/http';
  import Selfinfo from "../Selfinfo"
  import { getCookie } from '@/utils/storage'
  export default {

    data() {
      return {
        money_list: [500,1000, 2000, 5000, 10000, 20000, 40000, 80000, 100000, 200000],
        pay_model: 'alipay',
        // pay_model: 'wxpay',
        select_cmoney: 500,
        tt: null,
        isDelay:true,
      }
    },
    computed: {
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
      userinfoshowlist() {
        return this.$store.state.home.userinfoshowlist ? this.$store.state.home.userinfoshowlist : null
      },
      width() {
        if(!this.$store.state.home.userinfoshowlist) return 0;
        return 352 / this.$store.state.home.userinfoshowlist.expect_vip_exp * this.$store.state.home.userinfoshowlist.now_vip_exp
      },
      vipexp() {
        if(!this.$store.state.home.userinfoshowlist) return 0;
        return this.$store.state.home.userinfoshowlist.expect_vip_exp - this.$store.state.home.userinfoshowlist.now_vip_exp
      }
    },
    created: function() {
      //this.checkLogin()
      //this.$store.dispatch('userinfoshowdispatch');
    },
    mounted:function(){
      //this.checkLogin()
    },
    methods: {
      checkLogin: function() {
        if(getCookie('cid') == null) {
          this.$store.commit('showLoginDialog', true);
          this.$router.replace('home');
        }
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
        if(this.pay_cmoney < 5) {
          return this.alert('充值金额最小为500C');
        }
        if(this.pay_cmoney >= 10 ){
            self.$store.dispatch('getList');
        }
        if(this.pay_model == 'alipay') {
          this.$store.dispatch('toAliPay', {
            amount: this.pay_cmoney
          }).then(function(res){
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
            var pay_sn = res.data.data.pay_sn;
            var date = new Date();
            console.log(date.toLocaleString(),'微信支付时间')
            // alert(self.pay_cmoney)
            if(res.data.code == 0) {
              self.tt = setInterval(function() {
                Http.get('/pay/order_status', {
                  pay_sn: pay_sn
                }).then(function(response) {
                  if(response.data.code == 0 && response.data.data == true) {
                    self.$store.dispatch('closeWxDialog');
                    self.$store.dispatch('userinfo')
                    self.$store.dispatch('userinfoshowdispatch')
                    self.$store.dispatch("userInfo")
                    self.$store.dispatch('self')
                    clearInterval(self.tt);
                    // self.alert('支付成功');
                    // self.$router.push(`/alipay/success?total_amount=${self.pay_cmoney}&timestamp=${date.toLocaleString()}`)
                    self.$router.push(`/alipay/success?total_amount=${self.pay_cmoney}&timestamp=${date.toLocaleString()}`)
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
      InputNum,
      Selfinfo
    }
  }
</script>
<style scoped lang="scss">
  .topup {
    width: 930px;
    margin: 0px auto;
    .top {
      height: 64px;
      border-bottom: 1px solid #535353;
      .title {
        font-size: 20px;
        color: #e3dbc8;
        font-weight: 900;
        line-height: 64px;
        width: 100px;
        text-align: left;
        margin-left: 20px;
      }
    }
    .test {
      height: 124px;
    }
    .main {
      min-height: 100px;
      margin-top: 24px;
      .type {
        font-size: 16px;
        color: #dcdcdc;
        line-height: 24px;
        margin-left: 64px;
        margin-right: 70px;
      }
      .have {
        margin-top: 26px;
        height: 46px;
        .num {
          margin-left: 12px;
          line-height: 24px;
          span {
            color: #e1bf75;
          }
        }
      }
      .buynum {
        height: 256px;
        margin-top: 16px;
        padding-bottom: 10px;
        position: relative;
      }
      .tip{
        position: absolute;
        bottom: -3px;
        right: 57%;
      }
      .buynumul {
        width: 610px;
        min-height: 100px;
        li {
          width: 176px;
          height: 42px;
          float: left;
          line-height: 42px;
          border: 1px solid #535353;
          margin-right: 22px;
          margin-bottom: 22px;
          color: #535353;
        }
        .other {
          background: #15161a;
          border: none;
          height: 40px;
          width: 154px;
          padding: 0;
          margin: 0;
          display: block;
          color: #dcdcdc;
          padding-left: 20px;
        }
        .c {
          position: absolute;
          right: -50px;
          top: 0px;
        }
        li.active {
          border: 1px solid #fff;
          color: #fff;
          background: url("../../assets/images/mygrand/select.png") right bottom no-repeat;
        }
      }
      .payway {
        margin-top: 20px;
        margin-bottom: 10px;
        height: 68px;
      }
      .payment {
        height: 68px;
        .alipay {
          float: left;
          width: 176px;
          height: 60px;
          border: 1px solid #535353;
          background: url("../../assets/images/mygrand/ali.png") center no-repeat;
        }
        .wxpay {
          float: left;
          width: 176px;
          height: 60px;
          border: 1px solid #535353;
          line-height: 60px;
          margin-left: 20px;
          color: #ffffff;
          background: url("../../assets/images/mygrand/wx.png") center no-repeat;
        }
        .alipay.active,
        .wxpay.active {
          border: 1px solid #fff;
        }
        .alipay.active {
          background: url("../../assets/images/mygrand/ali.png") center no-repeat, url("../../assets/images/mygrand/select.png") right bottom no-repeat;
        }
        .wxpay.active {
          background: url("../../assets/images/mygrand/wx.png") center no-repeat, url("../../assets/images/mygrand/select.png") right bottom no-repeat;
        }
      }
      .needpay {
        height: 56px;
        .type {
          line-height: 56px;
        }
        .pay-money {
          line-height: 56px;
        }
        .rmb {
          color: #e1bf75;
          font-size: 26px;
          font-weight: 900;
        }
        .small {
          font-size: 14px;
          color: #535353;
        }
      }
      .paybtn {
        height: 45px;
        text-align: left;
        padding-left: 198px;
        margin-top: 20px;
        .gopay {
          display: block;
          width: 150px;
          height: 44px;
          line-height: 38px;
          text-align: center;
          font-size: 20px;
          color: #794e0d;
          background: url(../../assets/images/Mall-images/left-btn.png)
        }
      }
    }
  }
</style>

<style lang="scss">
  .bg-black .select {
    background-color: #15161a;
    input {
      background-color: #15161a;
    }
  }

  .bg-white .select {
    background-color: #FFFFFF;
    input {
      background-color: #FFFFFF;
    }
  }
</style>
