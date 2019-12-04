<template>
  <div id="signin" v-show="this.$store.state.match.commonPop" :class="{active:getIsShow}">
    <div class="wrap_signin wrap_signin_h258">
      <div class="signin_top signin_top_258">
        <h3 class="theme_color fleft">提示</h3>
        <i class="x fright pointer x_258" @click="handleclose"></i>
      </div>
      <div class="signincontent">
        <div class="signinreward" :style="isSigninPupop.typeGuess==5||isSigninPupop.typeGuess==2?'padding-top:0;':'padding-top:30px;'">
          <slot name="yourcontent" >{{isSigninPupop.masseges}}</slot>
          <p name="yourcontent" v-if="isSigninPupop.masseges2">赔率更新为：{{isSigninPupop.newOdds[isSigninPupop.option]}}
            <i v-if="isSigninPupop.newOdds[isSigninPupop.option]!=isSigninPupop.oldOdds" :class="{active:isSigninPupop.newOdds[isSigninPupop.option]<isSigninPupop.oldOdds}"></i>
          </p>
          <p name="yourcontent" v-if="isSigninPupop.typeGuess==2">让分更新为：{{isSigninPupop.option==isSigninPupop.team_x?'让'+isSigninPupop.score_x:'受让'+isSigninPupop.score_x}} </p>
          <p name="yourcontent" v-if="isSigninPupop.typeGuess==5">大小分更新为：{{isSigninPupop.score}} </p>
        </div>
        <div class="btn_wrap">
          <i v-if="!this.isSigninPupop.typePay&&!this.isSigninPupop.joinroll" class="enter pointer "  @click="handleensure">{{getIsShow?'确定':''}}</i>
          <!-- <i v-if="!this.isSigninPupop.typePay&&!this.isSigninPupop.joinroll" class="cancel pointer "  @click="handleclose">取消</i> -->
          <i class="enter button_pay pointer" @click="handletorecharge()" v-if="isSigninPupop&& isSigninPupop.showrecharge && isSigninPupop.showrecharge==1">去充值</i>
          <i v-if="this.isSigninPupop.joinroll" class="enter button_pay pointer" style="margin-left:auto;margin-right:auto;" @click="gophone">去绑定</i>
        </div>
        <div v-if="this.isSigninPupop.typePay">
          <i class="enter button_pay fleft pointer margin_left" @click="handleensure('ensure')" style="margin-left:156px;">充值</i>
          <!-- <i class="cancel  fright pointer" @click="handleclose">取消</i> -->
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Http from "./../../common/http";
export default {
  data() {
    return {
    }
  },
  methods: {
    gophone() {
      this.$router.push({
        path: '/mygrand/unbindphone'
      }, )
      this.$store.commit('isSigninPupopDis', false);
    },
    handleclose() {
      if (this.isSigninPupop.typeLogin) {
        setTimeout(() => {
          this.$store.commit("istestBooleam", true);
        }, 100)
      }
      if(this.isSigninPupop.typeGuess){
        this.$store.commit('mutationsisUpdateOdds',true);
        this.$store.commit('mutationsisShowNewsOdds',this.isSigninPupop.newOdds);
        this.$store.commit('mutationsisShowNewsdesc',this.isSigninPupop);
      }
      let dataOption = {
        'masseges': ''
      }
      this.$store.commit('isSigninPupopDis', dataOption)
      this.$store.commit('isSigninPupopDis', false);

      /*if(this.$store.state.match.loginPupop=true){
        if(this.$store.state.user.userInfo){
          this.$store.state.match.loginBooleam=false;
        }else{
          this.$store.state.match.loginBooleam=true;
        }
      }else{
        this.$store.state.match.loginBooleam=false;
      }*/


    },
    getScrollTop(){
      var scrollTop = 0, bodyScrollTop = 0, documentScrollTop = 0;
      if(document.body){
        bodyScrollTop = document.body.scrollTop;
      }
      if(document.documentElement){
        documentScrollTop = document.documentElement.scrollTop;
      }
      scrollTop = (bodyScrollTop - documentScrollTop > 0) ? bodyScrollTop : documentScrollTop;
      return scrollTop;
    },
    handleensure() {
      let userInfo = this.$store.state.user.userInfo?this.$store.state.user.userInfo:null;

      if (this.isSigninPupop.type == 3) {
        this.$router.push('../mygrand/verityphone');
      }
      if (this.isSigninPupop.emailtype) {
        this.$router.push('../mygrand/verityemail');
      }
      if (this.isSigninPupop.typesucceed) {
        this.$router.push('../mygrand');
      }
      if(this.isSigninPupop.typeGuess){
        this.$store.commit('mutationsisUpdateOdds',true);
        this.$store.commit('mutationsisShowNewsOdds',this.isSigninPupop.newOdds);
        this.$store.commit('mutationsisShowNewsdesc',this.isSigninPupop);
      }
      let identityEnsure = this.$store.state.mall.identitySecondEnsure || null ;
      console.log(identityEnsure,'请回答19888');
      if(identityEnsure.ensure){
        let dataser = this.$store.state.mall.identityItemBuyOptions;
        // type:1-道具购买，2-Q币，3-话费，4-京东卡,5-道具赠送
        if(identityEnsure.type==1){
          Http.post("/shop/exchangeProduct", dataser).then((data)=>{
            if (data.data.code == 0) {
              this.$store.commit("isIdentitySecondEnsure", {ensure:false,type:1});
              this.$store.commit("tankuang", true);
              this.$store.commit("tankuang", dataser);
              this.result = "1";
              this.$store.commit("test", false);
              //                  this.shopmoney=shopmoney-moneyPr
              this.$store.dispatch("userInfo");
            } else {
              let dataOption = {
                masseges: data.data.message,
                type: "1"
              };
              this.$store.commit("isSigninPupopDis", true);
              this.$store.commit("isSigninPupopDis", dataOption);
              this.$store.commit("test", false);
            }
          });
        }
        if(identityEnsure.type==2){
          Http.post("/shop/card/recharge", dataser).then((data) => {
            if (data.data.code == 0) {
              this.$store.commit("isIdentitySecondEnsure", {ensure:false,type:1});
              let dataOption = this.$store.state.mall.optionMsg;
              console.log(dataOption,'qq');
              this.$store.commit("tankuang", true);
              this.$store.commit("tankuang", dataOption);
              this.$store.commit("isCards", false);
              this.$store.dispatch("userInfo");
            } else {
              let dataOption = {
                masseges: data.data.message,
                type: "1"
              };
              this.$store.commit("isSigninPupopDis", true);
              this.$store.commit("isSigninPupopDis", dataOption);
            }
          });
        }
        if(identityEnsure.type==3){
          Http.post("/shop/card/recharge", dataser).then((data)=> {
            if (data.data.code == 0) {
              this.$store.commit("isIdentitySecondEnsure", {ensure:false,type:1});
              let dataOption = this.$store.state.mall.optionMsg;
              console.log(dataOption,'ph');
              this.$store.commit("tankuang", true);
              this.$store.commit("tankuang", dataOption);
              this.$store.commit("isCards", false);
              this.$store.dispatch("userInfo");
            } else {
              let dataOption = {
                masseges: data.data.message,
                type: "1"
              };
              this.$store.commit("isSigninPupopDis", true);
              this.$store.commit("isSigninPupopDis", dataOption);
            }
          });
        }
        if(identityEnsure.type==4){
          Http.post("/shop/card/recharge", dataser).then((data)=> {
            if (data.data.code == 0) {
              this.$store.commit("isIdentitySecondEnsure", {ensure:false,type:1});
              let option = this.$store.state.mall.optionMsg;
              let dataOption = {
                product_type: option.product_type,
                product_id: option.product_id,
                num: option.num,
                masseges: data.data.message,
                type: "1"
              };
              console.log(dataOption,'jd');
              this.$store.commit("tankuang", true);
              this.$store.commit("tankuang", dataOption);
              this.$store.commit("isCards", false);
              this.$store.dispatch("userInfo");
            } else {
              let dataOption = {
                masseges: data.data.message,
                type: "1"
              };
              this.$store.commit("isSigninPupopDis", true);
              this.$store.commit("isSigninPupopDis", dataOption);
            }
          });
        }
        if(identityEnsure.type==5){
          Http.get("/user/getByNickname", dataser).then((data)=>{
            if (data.data.code == 0) {
              this.$store.commit("givehide", true);
              this.$store.commit("givehide", dataser);
              this.$store.commit("userlist", data.data.data);
              this.$store.commit("test", false);
              this.$store.commit("isIdentitySecondEnsure", {ensure:false,type:1});
            } else if (data.data.code == 41000) {
              let dataOption = {
                masseges: "至少4个字符",
                type: "2"
              };
              this.$store.commit("isSigninPupopDis", true);
              this.$store.commit("isSigninPupopDis", dataOption);
            } else {
              let dataOption = {
                masseges: data.data.message,
                type: "2"
              };
              this.$store.commit("isSigninPupopDis", true);
              this.$store.commit("isSigninPupopDis", dataOption);
            }
          });
        }
      }
      this.$store.commit("isIdentitySecondEnsure", {ensure:false,type:1});
      let msg = this.$store.state.match.commonPop ? this.$store.state.match.commonPop.masseges:null;
      if( msg && msg=='为了您的账户安全，请先绑定手机号'){
        if(!userInfo.mobile){
            // console.log(window.location.href);
            if(window.location.href.indexOf('/mygrand')!=-1){
              if(window.location.href.indexOf('=')!=-1){
                this.$router.push('../accountSetting');
              }else{
                this.$router.push('../mygrand/accountSetting');
              }
            }else if (window.location.href.indexOf('/mygrand/accountSetting')!=-1){
              this.$router.push('../mygrand/accountSetting');
            }else{
              this.$router.push('../mygrand/accountSetting');
            }
            // else{
            //   this.$router.push('../mygrand/accountSetting');
            // }

            this.$store.commit('test',false);
            this.$store.commit('givehide',false);
            this.$store.commit('mutationsisShowVerityPhone',false);
            this.$store.commit('mutationsisShowUnbindPhone',false);
        }
      }

      if (this.isSigninPupop.typePay) {
        // this.$router.push('../paymoney');

        console.log('滚轮高顿',this.getScrollTop())
        this.$store.commit('mutationScrolltopValue',this.getScrollTop())
        this.$store.commit('mutationIsShowRecharge',true)
      }
      if (this.isSigninPupop.typeLogin) {
        setTimeout(() => {
          this.$store.commit("istestBooleam", true);
        }, 100)

      }
      if(this.isSigninPupop.nologin){
        this.$store.dispatch('logout');
        this.$store.commit('showLoginDialog',true);
        setTimeout(()=>{
          this.$store.commit("istestBooleam",true);
        },100)
      }
      /*if(this.isSigninPupop.typeUnbind){
        window.location.reload();

      }*/
      let dataOption = {
        'masseges': ''
      }
      this.$store.commit('isSigninPupopDis', dataOption)
      this.$store.commit('isSigninPupopDis', false);
      /*if(this.$store.state.match.loginPupop=true){
        if(this.$store.state.user.userInfo){
          this.$store.state.match.loginBooleam=false;
        }else{
          this.$store.state.match.loginBooleam=true;
        }
      }else{
        this.$store.state.match.loginBooleam=false;
      }*/

    },
    handletorecharge(){
       let dataOption = {
        'masseges': ''
      }
      this.$store.commit('isSigninPupopDis', dataOption)
      this.$store.commit('isSigninPupopDis', false);
      this.$store.commit('test',false);
      this.$store.commit('treasureDia',false);
      this.$router.push('../paymoney');

    }
  },
  computed: {
    isSigninPupop: function () {
      console.log('我是什么呢，请告诉我',this.$store.state.match.commonPop)
      return this.$store.state.match.commonPop
    },
    getIsShow(){
      return this.$store.state.treasure.isLoginAddActive
    },
  }
}
</script>
<style lang="scss" scoped>
#signin {
  .wrap_signin {
    .signinreward {
      width: 360px;
      height: 116px;
      margin: 0 auto;
      margin-top: 30px;
      padding-top: 30px;
      line-height: 26px;
      .successinfo {
        padding-top: 10px;
        line-height: 30px;
      }
      i{
        display: inline-block;width:30px; height:20px;background:url('../../assets/images/competeImg/icon_oddup.png') no-repeat center; vertical-align: -2px;
        &.active{
          background-image:url('../../assets/images/competeImg/icon_odddn.png');
        }
      }
    }
    .btn_wrap{
      display: flex;
      justify-content: space-around;
    }
    .enter {
      display: block;
      width: 96px;
      height: 36px;
      // margin: 0 auto;
      margin-top: 15px;
      // margin-left: 74px;
      background-image: url("../../assets/images/mygrand/enter.png");
      &:hover {
        background-image: url("../../assets/images/mygrand/hoverenter.png");
      }
    }
    .ensure_btn{
      margin-left: 136px;
    }
    .button_pay {
      background: url("../../assets/images/competeImg/guess_b2.png") repeat-x
        bottom;
      width: 96px;
      line-height: 35px;
      height: 35px;
      color: #915a0c;
      border-radius: 2px;
      font-weight: 900;
    }
    .margin_left{
      margin-left:72px;
    }
    .btn_recharge{
      position: absolute;
      left: 40%;
      top:72%;
      font-weight: 900;
    }
    .button_pay:hover {
      background: url("../../assets/images/competeImg/guess_b2_h.jpg") repeat-x
        bottom !important;
    }
    .cancel {
      display: block;
      width: 96px;
      height: 34px;
      margin-top: 15px;
      border-radius: 3px;
      border: 1px solid #e1c076;
      line-height: 33px;
      font-size: 16px;
      &:hover {
        background-color: #706857;
      }
    }
  }
  &.active{
    .wrap_signin{
      background:url('https://imgcdn.api.com/images/treasure/login_tishi_bg.png') no-repeat center !important;border-color:#6e71bb;
    }
    .theme_color{color:#fff !important;}
    .x{
      background-image:url('https://imgcdn.api.com/images/treasure/close.png') !important;
      &:hover{
        background-image:url('https://imgcdn.api.com/images/treasure/close_hover.png') !important;
      }
    }
    .enter{
      background: #3538c5 !important;
      box-shadow: 0px 0px 20px #99baf9 inset !important;
      border-radius: 6px !important;
      color: #fff !important; line-height:36px;
      &:hover{
        background: #4e51de !important;
        box-shadow: 0px 0px 20px #99baf9 inset !important;
        border-radius: 6px !important;
      }
    }
  }
}
</style>

