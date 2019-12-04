<template>
<div class="popup" v-show="getIsShowRecharge">
  <div class="popup-bg"></div>
  <div class="popup-main popup-bg-recharge">
    <div class="popup-close" @click="fnCLosePopup"></div>
    <div class="popup-title">充值</div>
    <div class="popup-main-down">
      <div class="popup-main-type">
        <!-- <div class="popup-main-type-text">选择充值金额</div> -->
        <div class="popup-main-type-list" ref="typespan">
          <span @click="fnChoiceMoney(0,10)">10元</span>
          <span @click="fnChoiceMoney(1,30)">30元</span>
          <span @click="fnChoiceMoney(2,50)">50元</span>
          <span @click="fnChoiceMoney(3,100)">100元</span>
          <span @click="fnChoiceMoney(4,500)">500元</span>
        </div>
        <div class="popup-main-type-others" @click="fnChoiceMoney(5,moneyValue.value)" ref="inputpay">
          其他金额 <input type="text" class="input-pay fright" v-model="moneyValue.value" @keyup="inputCmoney"/>
          <em>元</em>
        </div>

      </div>
      <div class="recharge-tishi">提示:1人民币可购买100C币</div>
      <div class="popup-main-type">
        <!-- <div class="popup-main-type-text">选择支付方式</div> -->
        <div class="popup-main-paytype">
          <div class="popup-main-paytype-same paywx fl" :class="{active:payType.wechat}" @click="fnChoiceType('wechat')">
            <span><span></span></span>
            微信
          </div>
          <div class="popup-main-paytype-same payalipay fl" :class="{active:payType.aliplay}" @click="fnChoiceType('aliplay')">
            <span><span></span></span>
            支付宝
          </div>


        </div>
      </div>
      <div class="popup-main-payerweima" v-if="payType.wechat&&payType.url">
        <img :src="payType.url"/>
      </div>
      <div class="popup-main-paybtn" v-if="isShowpay" @click="fnpay(payTypeString,payValue)">支付</div>
    </div>
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
      payTypeString:'',
      payType:{
        aliplay:false,
        wechat:false,
        url:null,
      },
      isShowpay:true,
      tt:null,
    }
  },
  methods:{
    fnCLosePopup(){
      clearInterval(this.tt)

      setTimeout(() => {
        this.isShowpay=true;
        this.payType.url=null;
        this.$store.commit('mutationsIsShowRecharge',false);
      }, 500);
    },
    fnChoiceMoney(index,value){
      console.log(index,value)
      this.payValue=value;
      this.moneyValue.value=index!=5?'':this.moneyValue.value;

      let eLisBox =this.$refs.typespan.getElementsByTagName('span');
      let inputBox =this.$refs.inputpay;
      if(index==5){
        if(!inputBox.classList.contains('active')){
            inputBox.classList.add('active')
          }
      }else{
        if(inputBox.classList.contains('active')){
            inputBox.classList.remove('active')
          }
      }
      for(let i=0;i<eLisBox.length;i++){
        if(i==index){
          if(!eLisBox[i].classList.contains('active')){
            eLisBox[i].classList.add('active')
          }
        }else{
          if(eLisBox[i].classList.contains('active')){
            eLisBox[i].classList.remove('active')
          }
        }
      }
    },
    fnChoiceType(typepay){
      this.isShowpay=true;
      this.payType.url=null;
      console.log('paymoney',this.payValue)
      clearInterval(this.tt)
      if(typepay!='wechat'){
        this.payType.aliplay=true;
        this.payType.wechat=false;
      }else{
        this.payType.aliplay=false;
        this.payType.wechat=true;
      }
      this.payTypeString=typepay;
    },
    urlencode (str) {
        str = (str + '').toString();

        return encodeURIComponent(str).replace(/!/g, '%21').replace(/'/g, '%27').replace(/\(/g, '%28').
        replace(/\)/g, '%29').replace(/\*/g, '%2A').replace(/%20/g, '+');
    },
    fnpay(payType,value){
      let self=this;
      if(!payType){
        let dataOption = {
          masseges: "请选择支付方式",
          type: "2"
        };
        self.$store.commit("isSigninPupopDis", true);
        self.$store.commit("isSigninPupopDis", dataOption);
      }
      if(!value||value<=0)return;
      if(payType!='wechat'){
        console.log('我是支付宝支付哦',value)
        // self.$store.commit('mutationsWebPath',window.location.href.slice(0,window.location.href.indexOf(this.$route.path)))
        let thisPath =this.urlencode(this.$route.path)
        this.$store.commit('mutationIsSaveReachargePath',)
        self.$store.commit('mutationsWebPath','https://www.api.com/')
        self.isShowpay=false;
        self.payType.url=null;

        this.$store.dispatch('toAliPay', {
          amount: value,
          redirect_url:thisPath,
          type:1,
        }).then(function(res){
          // return console.log('我是支付支付的哦',res)
          if(res.data.code !== 0) {
            return self.alert(res.data.message);
          }else{
            // console.log('我是啥字呢',res.data)
            // location.reload()
          }
        });
      }else{
        console.log('我是微信支付哦',value,payType)
        let params={
          amount: value,
          subject:'C币充值'
        }
        Http.post("pay/weixin", params).then(res=> {
          console.log('w我支付了么',res.data)
          if (res.data.code == 0) {
              var pay_sn = res.data.data.pay_sn;
              var url = res.data.data.url;
              console.log('微信支付', res.data)
              var payurl = "http://api" + url;
              var payload = { pay_sn: pay_sn, url: payurl };
              self.payType.url=payurl;
              self.isShowpay=false;
              // store.commit("showWxPay", true);
              // store.commit("wxPayInfo", payload);
              if(payType=='wechat'&&!self.isShowpay){
                self.tt = setInterval(function() {
                  if(payType=='wechat'&&!self.isShowpay){
                    Http.get('/pay/order_status', {
                      pay_sn: pay_sn
                    }).then(function(response) {
                      console.log('我是什么呢',response)
                      if(response.data.code == 0 && response.data.data == true) {
                        self.isShowpay=true;
                        self.payType.url=null;
                        self.$store.dispatch('userInfo')
                        clearInterval(self.tt);
                      }
                    });
                  }else{
                    clearInterval(self.tt)
                  }
                }, 5000);
                setTimeout(function() {
                  clearInterval(self.tt);
                  self.isShowpay=true;
                  self.payType.url=null;
                }, 1000 * 60 * 6);
            }else{
              clearInterval(self.tt);
            }
          }
          }).catch(Http.onError);
        // this.$store.commit('mutationsIsShowWechat',true);
      }

    },
    inputCmoney: function(event) {
      var cmoney = event.target.value
      var isN = /[^\d^\.]+/g.test(cmoney);
      !isN ? cmoney = cmoney.replace(/[^\d^\.]+/g, ''): 0;
      this.payValue = cmoney
      event.target.value = cmoney
      //console.log(isN,cmoney)
    },

  },
  destroyed() {
    clearInterval(this.tt);
  },
  computed:{
    getIsShowRecharge(){
      return this.$store.state.treasure.isShowRecharge;
    },
  },
}
</script>
<style lang="scss" scoped src="@/assets/css/treasure.css"></style>



