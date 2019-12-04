<template>
   <div class="popup" v-if="getIsmoneyNoEnough.isShow">
    <div class="popup-bg"></div>
    <div class="">
      <div class="popup-main moneyNotEnough">
        <div class="popup-close" @click="fnCLosePopup"></div>
        <p class="title">余额不足！</p>
        <p class="needPay">需支付{{getIsmoneyNoEnough.paymoney}}元开{{getIsmoneyNoEnough.count}}个福袋宝箱</p>
        <div class="popup-main-type">
          <div class="popup-main-paytype">
            <div class="popup-main-paytype-same paywx fl" :class="{active:getIsmoneyNoEnough.payType==2}" @click="fnChoiceType('wechat')" :style="'margin-left:'+(getISIe?50:0)+'px'">
              <span><span></span></span>
              微信
            </div>
            <div class="popup-main-paytype-same payalipay fl" :class="{active:getIsmoneyNoEnough.payType==1}" @click="fnChoiceType('aliplay')" v-if="!getISIe">
              <span><span></span></span>
              支付宝
            </div>


          </div>
        </div>
        <div class="popup-main-payerweima" v-if="getIsmoneyNoEnough.payType==1&&aliplayData.url&& !getISIe">
          <iframe id="iframe-aliplay" :srcdoc="aliplayData.url" width="330" height='270' scrolling="no"></iframe>
        </div>

        <div class="popup-main-payerweima" v-if="getIsmoneyNoEnough.payType==2&&wechatData.url"><img :src="wechatData.url"/></div>
        <p class="toPay" v-if="getIsmoneyNoEnough.payType!=2&&isSHowBtn&& !getISIe" @click="goToPay">前往支付</p>
      </div>
    </div>
    <div style="position:absolute;top:0;left:0; width:0; height:0; overflow:hidden;">{{getIsmoneyNoEnough.isShow?'对':'错'}}</div>
  </div>
</template>

<script>
import Http from "@/common/http";
  export default {
    data() {
      return {
        isChecked: "wx",
        wechatData:{
          order_sn:null,
          url:null,
        },
        aliplayData:{
          data:null,
          order_sn:null,
          url:null,

        },
        countTime:null,
        isSHowBtn:true,
      }
    },
    updated() {
      let self=this;
      let isShowMoneyNoEnough=this.$store.state.treasure.isShowMoneyNoEnough
      let isShowUpdate=this.$store.state.treasure.isShowUpdate;

      if(isShowMoneyNoEnough.isShow&&isShowMoneyNoEnough.payType==2&&isShowUpdate){
        this.goToWechat();
      }
    },
    destroyed() {
      clearInterval(this.countTime);
    },
    mounted() {
        console.log(navigator.userAgent,'啥子');
    },
    methods:{
      fnCLosePopup(){
        clearInterval(this.countTime);
        setTimeout(() => {
          this.$store.commit('mutationsIsShowMoneyNoEnough',{
            isShow:false,
            count:null,
            paymoney:null,
            payType:null,
          });
          this.$store.commit('mutationsIsCanClickOne',true)
          this.$store.commit('mutationsIsCanClickTwelve',true)

        }, 500);

      },
      fnChoiceType(type){
        let self=this;
        let isShowMoneyNoEnough=this.$store.state.treasure.isShowMoneyNoEnough;
        let paytype =0;

        if(type=='aliplay'){
          paytype=1;
          this.isShowUpdate=true;
          this.aliplayData.url=null;
          this.isSHowBtn=true;
          clearInterval(this.countTime);
          this.$store.commit('mutationsIsShowMoneyNoEnough',{
            isShow:isShowMoneyNoEnough.isShow,
            count:isShowMoneyNoEnough.count,
            paymoney:isShowMoneyNoEnough.paymoney,
            payType:paytype,
          });

        }else{
          paytype=2;
          clearInterval(self.countTime);
          this.$store.commit('mutationsIsShowMoneyNoEnough',{
            isShow:isShowMoneyNoEnough.isShow,
            count:isShowMoneyNoEnough.count,
            paymoney:isShowMoneyNoEnough.paymoney,
            payType:paytype,
          });
          this.goToWechat()

        }
      },
      goToWechat(){
        console.log('ddddddd')
        this.$store.commit('mutationsIsShowUpdate',false)

        let self=this;
        let isShowMoneyNoEnough=this.$store.state.treasure.isShowMoneyNoEnough;
        let params={
            count:isShowMoneyNoEnough.count
          }
        Http.post('/activity/box/buy/wechat',params).then(response=>{
          if(response.data.code==0){
            var order_sn = response.data.data.order_sn;
            var payurl = "https://api.api.com/pay/qrcode?payurl=" +response.data.data.url;

            self.wechatData={
              order_sn:order_sn,
              url:payurl,
            }
            if(isShowMoneyNoEnough.payType!=2){
              clearInterval(self.countTime);
              return;
            }

            self.countTime=null;
            if(isShowMoneyNoEnough.payType==2){
              self.countTime=setInterval(()=>{
              let isShowMoneyNoEnoughs=self.$store.state.treasure.isShowMoneyNoEnough;
              if(isShowMoneyNoEnoughs.payType==2&&isShowMoneyNoEnoughs.isShow){
                Http.get('/activity/box/orderStatus',{
                  order_sn:self.wechatData.order_sn
                }).then(res=>{
                  console.log('我是什么呢',res.data)
                  if(res.data.code==0){
                    self.$store.commit('mutationsLuckyBagData',res.data.data);
                    self.$store.commit('mutationsIsShowMoneyNoEnough',{isShow:false,count:1,paymoney:0,payType:1})
                    clearInterval(self.countTime);
                    if(params.count==1){
                      self.$store.commit('mutationsIsStartRoll',true);
                    }else{

                      self.$store.commit('mutationsIsShowLucky',true);
                    }
                  }
                })
              }
            },4000);

            setTimeout(function() {
              clearInterval(self.countTime);
              self.$store.commit('mutationsIsShowMoneyNoEnough',{isShow:false,count:1,paymoney:0,payType:1})
            }, 1000 * 60 * 5);
             }
          }
        }).catch(Http.onError);
      },
      goToPay(){
        let isShowMoneyNoEnough=this.$store.state.treasure.isShowMoneyNoEnough;
        let self=this;
        if(!isShowMoneyNoEnough.payType){
          let dataOption = {
            masseges: "请选择支付方式",
            type: "2"
          };
          self.$store.commit("isSigninPupopDis", true);
          self.$store.commit("isSigninPupopDis", dataOption);
        }else{
          // let redirect_url='http://www.api.com/alipay/success'
          let params={
            count:isShowMoneyNoEnough.count,
            // redirect_url:redirect_url

          }
          this.isSHowBtn=false;
          Http.post('/activity/box/buy/alipay',params).then(response=>{
            if(response.data.code==0){
              console.log('我成功了吗',response.data.data)
              self.aliplayData.order_sn=response.data.data.order_sn
              self.aliplayData.url=response.data.data.data;
              self.countTime=null;
              self.$store.commit('mutationAliplayData',{
                data: null,
                order_sn: response.data.data.order_sn,
                url: response.data.data.data
              })
              self.$store.commit('mutationsWebPath','https://www.api.com/')

              if(isShowMoneyNoEnough.payType==1&&!self.countTime){
                self.countTime=setInterval(()=>{
                  let isShowMoneyNoEnoughs=self.$store.state.treasure.isShowMoneyNoEnough;
                  if(isShowMoneyNoEnoughs.payType==1&&isShowMoneyNoEnoughs.isShow){
                    Http.get('/activity/box/orderStatus',{
                      order_sn:self.aliplayData.order_sn
                    }).then(res=>{
                      console.log('我是支付宝什么呢',res.data)

                      if(res.data.code==0){
                        self.aliplayData.url=null;
                        self.$store.commit('mutationsLuckyBagData',res.data.data);
                        self.$store.commit('mutationsIsShowMoneyNoEnough',{isShow:false,count:1,paymoney:0,payType:1})
                        clearInterval(self.countTime);
                        if(params.count==1){
                          self.$store.commit('mutationsIsStartRoll',true);
                        }else{
                          self.$store.commit('mutationsIsShowLucky',false);
                          self.$store.commit('mutationsIsShowLuckyBagInfo',true);
                        }
                      }else if(res.data.code!=-200){

                      }
                    })
                   }
                },2000);
                setTimeout(function() {
                  clearInterval(self.countTime);
                  self.$store.commit('mutationsIsShowMoneyNoEnough',{isShow:false,count:1,paymoney:0,payType:1})
                }, 1000 * 60 * 5);
              }

            }
          })
        }

      },
    },
    computed:{
      getIsmoneyNoEnough(){
        return this.$store.state.treasure.isShowMoneyNoEnough;
      },
      getISIe(){
        let isIE=false;
        if (navigator.userAgent.indexOf("compatible") != -1 && navigator.userAgent.indexOf("Mozilla") != -1) {
          isIE=true;
        }
        if (!!window.ActiveXObject || "ActiveXObject" in window) {
          isIE=true;
        }
        if(navigator.userAgent.indexOf("Edge") > -1){
          isIE=true;
        }

        return isIE;
      },
    },
  }
</script>
<style lang="scss" scoped src="@/assets/css/treasure.css"></style>
<style scoped lang="scss">
  .moneyNotEnough{
    width: 482px;
    height: 380px;
    margin:-190px 0 0 -241px;
    background: url("https://imgcdn.api.com/images/treasure/money_notEnough.png") no-repeat;
    background-size: cover;
    .title{
      text-align: center;
      color: #fff;
      line-height: 50px;
      margin-top:20px;
    }
    .needPay{
      font-size: 14px;
      text-align: center;
      line-height: 22px;
    }
    .options{
      margin:30px 0 16px 0;
      input{
        margin: 0 8px;
      }
    }
    .qrCode{
      width: 140px;
      height: 140px;
      display: block;
      margin:8px auto;
    }
    .toPay{
      width: 96px;
      height: 30px;
      border: 1px solid #fff;
      border-radius: 2px;
      line-height: 30px;
      text-align: center;
      margin:12px auto;
      font-size: 14px;
      color: #fff;
    }
  }
</style>
