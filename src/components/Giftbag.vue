<template>
  <div class="giftbag">
    <div class="left fleft">
      <p class="theme">VIP礼包 <span class="arrow">></span></p>
    </div>
    <div class="right fleft">
      <div class="main" v-if="giftbag">
        <div class="content">
          <div class="ctop">
            <img :src="giftbag.pic" alt="" class="pimg fleft">
            <div class="pinfo">
              <p class="pinfo_title">{{giftbag.name}}</p>
              <p class="pinfo_price psmall">售价：{{giftbag.price}}元</p>
              <p class="pinfo_include psmall">内含：{{giftbag.cprice}} C币&nbsp;+&nbsp;{{giftbag.debris}}碎片</p>
            </div>
          </div>
          <div class="payway">
            <div class="type fleft">支付方式</div>
            <div class="payment fleft">
              <div class="alipay" :class="{active:pay_model=='alipay'}" @click="selectPayment('alipay')"></div>
              <div class="wxpay" :class="{active:pay_model=='wxpay'}" @click="selectPayment('wxpay')"></div>
            </div>
          </div>
          <div class="needpay ">
            <div class="type fleft">需要支付</div>
            <div class="pay-money fleft">
              <div><span class="rmb">{{giftbag.price}} </span>元</div>
            </div>
          </div>
          <div class="gopay">
            <button class="paybtn" @click="doPay">支付</button>
          </div>
          <Wx :isshow="showWxPay" :src="qrcode_url" @closeme="close"></Wx>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import Http from "@/common/http"
  import Wx from "@/components/dialog/Wx"
  export default {
    data() {
      return {
        pay_model: 'alipay',
        isBlock: false,
        giftbag: null
      }
    },
    components: {
      Wx
    },
    created() {
      //this.loadGiftbag()
    },
    mounted(){
      this.loadGiftbag()
    },
    watch:{
      '$route':'loadGiftbag'
    },
    computed: {      
      pay_cmoney() {
        var totalCMoney = 0
        totalCMoney = this.giftbag.price
        return Number(totalCMoney)
      },
      level() {
        console.log(this.$route.query)
        return this.$route.query.level;
      },
      showWxPay() {
        return this.$store.state.pay.showWxPay;
      },
      qrcode_url() {
        return this.$store.state.pay.wxPayInfo ? this.$store.state.pay.wxPayInfo.url : '';
      }
    },
    methods: {
      loadGiftbag:function(){
        var self = this
        Http.get('vip/giftbag').then(function(response) {
          if(response.data.code == 0) {
            var giftbaglist = response.data.data
            for(var i = 0; i < giftbaglist.length; i++) {
              if(self.level == giftbaglist[i].level) {
                self.giftbag = giftbaglist[i]
              }
            }
          }
        });
      },
      selectPayment: function(payment) {
        this.pay_model = payment
      },
      close:function(){
        clearInterval(this.tt);
        this.$store.dispatch('closeWxDialog');
      },
      doPay() {
        var self = this
        if(this.pay_model == 'alipay') {
          this.$store.dispatch('toAliPay', {
            level: this.level
          }).then(function(res){
            if(res.data.code != 0) {              
              return self.alert(res.data.message);
            }
          });
        } else if(this.pay_model == 'wxpay') {
          this.$store.dispatch('toWxPay', {
            level: this.level
          }).then(function(res) {
            if(res.data.code != 0) {
              return self.alert(res.data.message);
            }
            var pay_sn = res.data.data.pay_sn;
            if(res.data.code == 0) {
              self.tt = setInterval(function() {
                Http.get('/pay/order_status', {
                  pay_sn: pay_sn
                }).then(function(response) {
                  if(response.data.code == 0 && response.data.data == true) {
                    self.$store.dispatch('closeWxDialog');
                    clearInterval(self.tt);
                    self.alert('支付成功');
                  }
                });
              }, 5000);
              setTimeout(function() {
                clearInterval(self.tt);
                self.$store.dispatch('closeWxDialog');
              }, 1000 * 60 * 1);
            }
          });
        }
      }
    }
  }
</script>
<style lang="scss" scoped>
  .giftbag {
    width: 1200px;
    height: 688px;
    margin: 50px auto;
    padding-bottom: 50px;
    .left {
      width: 270px;
      height: 688px;
      background-color: #15161a;
      .theme {
        color: #e1c076;
        height: 66px;
        line-height: 66px;
        font-size: 18px;
        text-align: center;
        position: relative;
        left: 0;
        top: 0;
      }
      .arrow {
        position: absolute;
        right: 14px;
        top: -2px;
      }
    }
    .right {
      width: 930px;
      height: 688px;
      background-color: #242628;
    }
    .wrappic {
      height: 124px;
      margin: 50px 0 66px 0;
    }
    .type {
      font-size: 16px;
      color: #dcdcdc;
      line-height: 24px;
      margin-left: 64px;
      margin-right: 70px;
    }
    .payway {
      margin-top: 30px;
      margin-bottom: 60px;
      height: 68px;
    }
    .payment {
      height: 68px;
      .alipay {
        float: left;
        width: 176px;
        height: 60px;
        border: 1px solid #535353;
        background: url("../assets/images/mygrand/ali.png") center no-repeat;
      }
      .wxpay {
        float: left;
        width: 176px;
        height: 60px;
        border: 1px solid #535353;
        line-height: 60px;
        margin-left: 20px;
        color: #ffffff;
        background: url("../assets/images/mygrand/wx.png") center no-repeat;
      }
      .alipay.active,
      .wxpay.active {
        border: 1px solid #fff;
      }
      .alipay.active {
        background: url("../assets/images/mygrand/ali.png") center no-repeat, url("../assets/images/mygrand/select.png") right bottom no-repeat;
      }
      .wxpay.active {
        background: url("../assets/images/mygrand/wx.png") center no-repeat, url("../assets/images/mygrand/select.png") right bottom no-repeat;
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
    .ctop {
      height: 140px;
      width: 830px;
      margin-left: 60px;
      .pimg {
        width: 124px;
        height: 122px;
        display: block;
        border: 1px solid #dcdcdc;
        margin-right: 50px;
      }
      .pinfo {
        width: 420px;
        text-align: left;
        padding-top: 12px;
      }
      .pinfo_title {
        font-size: 20px;
        line-height: 30px;
        color: #e1c076;
        margin-bottom: 10px;
      }
      .psmall {
        font-size: 16px;
        line-height: 24px;
        color: #dcdcdc;
      }
    }
    .gopay {
      height: 66px;
      width: 120px;
      margin: 0 auto;
      .paybtn {
        width: 128px;
        height: 34px;
        background: linear-gradient(to bottom, #efd872, #ddad52);
        font-size: 16px;
        line-height: 24px;
        color: #906012;
        border: none;
        border-radius: 3px;
        margin-top: 60px;
      }
    }
    .main,
    .content {
      height: 688px;
      width: 700px;
      margin: 80px auto;
    }
  }
</style>