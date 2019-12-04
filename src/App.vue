<template>
  <div id="app" :style="{background:'#1b1c1f url('+bgimage+') no-repeat center  '+gameid}">
    <div class="appwrap">
      <div id="navbar" >
        <!-- <Navbar></Navbar> -->
        <Navbarnews/>
      </div>
    
      <section>
        <!-- <keep-alive> -->
          <router-view  :key="$route.fullpath"/>
        <!-- </keep-alive> -->
      </section>
      <div class="msi" v-if="ismsi&&!getIsShow" >
        <div class="nonedi pointer"  v-if="leftad && leftad.length>0">
          <a :href="leftad[0].url"  target="_blank">
            <span><img :src="leftad[0].img_uri" class="leftadimg"></span>
          </a>
          <div class="closemsi"  @click='msiclose' >x</div>
        </div>
      </div>
  <Advertise></Advertise> 
      <div id="footer" v-if="!getIsShow">
        <Footer></Footer>
      </div>
      <!-- 充值悬浮按钮 -->
      <!-- <div class="fixed_recharge pointer" v-if="isShowRecharge&&!getIsShow">
        <router-link to="/paymoney" tag="div"><img src="./assets/img/home/recharge_btn.png" alt=""></router-link>
        <div class="closerecharge"  @click="closerecharge" >x</div>
      </div> -->
      <div class="taskmenu" v-if="!getIsShow">
        <Fixedmenu/>
      </div>
      <div class="suckthetop" v-if="!getIsShow">
        <!-- <router-link  tag="div" to=""></router-link> -->
        <!-- <div @click="treasureclick" class="suck pointer"><span class="sucks sucks4" title="网维大师"></span></div> -->
        <!-- 幸运60s暂时隐藏 -->
          <!-- <div @click="turnclick" class="suck pointer"><span class="sucks sucks4" title="幸运六十秒"></span></div> -->

        <!-- 在线客服直接点击跳转 -->
        <a target="_blank" href="tencent://message/?uin=1056387396&Site=https://vps.shuidazhe.com&Menu=yes" class=" suck pointer" style="display:block;">
          <img border="0" src='./assets/images/online.png' title="在线客服" style="margin-top:12px;display:inline-block;" />
        </a>
        <a href="https://weibo.com/u/6388838166" class="suck pointer" style="display:block;" target="blank">
          <span class="sucks sucks3" title="官方微博"></span>
        </a>
        <p class="suck suck1">
          <span class="sucks sucks1" title="微信公众号"></span>
          <span class="gray1 gray"></span>
          <img src="./assets/images/mygrand/wxgzh.jpg" alt="" class="wxqrcode qrcpde">
        </p>
        <p class="suck suck2">
          <span class=" sucks2" title="APP下载"></span>
          <span class="gray2 gray"></span>
          <!-- <img src="./assets/img/home/apppng.png" alt="" class="appqrcode qrcpde"> -->
          <!-- <img src="./assets/img/home/loginbyh5.jpg" alt="" class="appqrcode h5cpde"> -->
          <img src="./assets/img/home/loginbyh5.jpg" alt="" class="appqrcode qrcpde">
        </p>
        <p class="suck pointer">
          <span class="sucks sucks5" @click="handletotop" title="回到顶部"></span>
        </p>

      </div>
      <div @click="handleclick('lol')" class="roll"  v-if="!getIsShow"><img src="./assets/images/roll.gif" alt=""></div>
      <div class="clear"></div>
    </div>
    <Propaganda/>
    <CarryOut/>
    <AccomplishTask/>
    <AccomplishExchange/>
    <ReceiveNewTask/>
    <LookRich/>
    <GuessBetGuide/>
    <WhenOpenGuess />
    <CanSysthetic />
    <FirstGetProps />
    <FirstGetDebris />
    <FirstGuess/>
    <TipPropsCanGuess/>
  </div>
</template>

<script>
import Http from '@/common/http';
import "./assets/css/public.css";
import Vue from "vue";
import favicon from "./assets/images/favior.png";
import config from "./common/http-config";
import router from "@/router";
import Fingerprint2 from '@/utils/fingerprintjs2';
import Advertise from "./components/advertise/Advertise"
export default {
  name: "app",
  components:{
Advertise
  },
  data() {
    return {
      top: "top",
      wxqrcodeshow: false,
      appqrcodeshow: false,
      ismsi: true,
      isShowRecharge:true,
    }
  },
  updated() {
    if(this.$route.path.indexOf('/guess/')<0){
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    }
    if(window.location.href.indexOf('/treasure?ch')!=-1){
        router.push(`/treasure`);
    }
    if(this.$route.path.indexOf('/treasure')!=-1){
      this.$store.commit('mutationsIsLoginAddActive', true)
      this.$store.commit('mutationasIsShowPathTreasure',true)
      this.$store.commit('mutationIsShowPropaganda',false);
      this.$store.commit('mutationsisPathRoute',true);
      this.$store.commit("istestBooleam", true)
    }else{

      this.$store.commit('mutationsIsLoginAddActive', false)
      this.$store.commit('mutationasIsShowPathTreasure',false);
      this.$store.commit('mutationIsShowPropaganda',true);
      this.$store.commit('mutationsisPathRoute',false);

    }
  },
  computed: {
    bgimage: function() {
      return this.$store.state.news.bgimage;
    },
    gameid: function() {
      this.top = "top";
      if (this.$store.state.news.gameid == 1) {
        this.top = "30px";
      }else if(this.$store.state.news.gameid == 2){
        this.top = "top";
      }
      return this.top;
    },
    leftad:function(){
      return this.$store.state.home.leftaddata?this.$store.state.home.leftaddata : ''
    },
    getIsShow(){
      // console.log('我可以显示么',this.$store.state.treasure.isLoginAddActive)
      return this.$store.state.treasure.isLoginAddActive
    },
    showLogin: function() {//登录框
      return this.$store.state.user.showLoginDialog;
    },
    showForgetDa: function() {//忘记密码
      return this.$store.state.match.showForgetDa;
    },
  },
  methods: {
    msiclose() {
      this.ismsi = false;
    },
    closerecharge(){
      this.isShowRecharge = false;
    },
    turnclick(){
      let _this = this
      if (_this.$store.state.user.login == false) {
        _this.$store.dispatch("logout");
        _this.$store.dispatch("getList");
        _this.$store.commit("istestBooleam", true);
        _this.$store.commit("showLoginDialog", true);
      }else{
        router.push(`/turntable`);
      }
    },
    treasureclick(){
      router.push(`/treasure?charset`);
    },
    handleclick(id){
      router.push(`/freeturn/${id}`);
      if(this.$route.path.indexOf('freeturn/')>=0){
        // this.$store.dispatch('freeturndata',{type:2})
        this.$store.commit('getGameIndex',0)
        this.$store.commit('getfreeturntype',2)
        // this.$store.dispatch('freeturnself',{type:2})
      }
    },
    handletotop() {
      document.documentElement.scrollTop = "0px";
      document.body.scrollTop = "0px";
    },
    handlewxqrcodeshow() {
      this.wxqrcodeshow = true;
    },
    handlewxqrcodehide() {
      this.wxqrcodeshow = false;
    },
    handleappqrcodeshow() {
      this.appqrcodeshow = true;
    },
    handleappqrcodehide() {
      this.appqrcodeshow = false;
    },
    getDevice() {
      if (getCookie('tid') == null) {
        let fp = new Fingerprint2();
        return fp.get(function(result) {
          Http.post('/device/register', {
            fingerprint: result,
          }).then(function(response) {});
        });
      }
    },
  },
  mounted(){
    if(this.$route.path.indexOf('/treasure')==-1){
      this.$store.dispatch('leftad')
    }

  },
};
</script>
<style lang="scss">
html,body{
  background: #1f1f22;
}
.leftadimg{
  width:100%;
  height: 100%;
}
.margin_1200{
  width:1200px;
  height:100%;
  margin:0 auto;
  overflow: hidden;
}
 .fixed_recharge{
    width:150px;
    height: 62px;
    display: block;
    position:fixed;
    z-index: 8208;
    display: block;
  }
.V-1 {
  border: 1px solid #ffffff !important;
}
.V-2 {
  border: 1px solid #ade55c !important;
}
.V-3 {
  border: 1px solid #4b69ff !important;
}
.V-4 {
  border: 1px solid #8847ff !important;
}
.V-5 {
  border: 1px solid #ffa22a !important;
}
.V-6 {
  border: 1px solid #b11c1c !important;
}
.margin {
  width: 1200px;
  margin: 0 auto;
}
.appwrap {
  width: 100%;
}
.clear {
  clear: both;
}
div {
  color: #dcdcdc;
}
.part_title{//模块标题
  width:140px;
  height: 40px;
  background: url("./assets/img/home/nav_top_title_bg.png") no-repeat;
  text-align: center;
  font: 900 14px/40px '\5FAE\8F6F\96C5\9ED1';
  color: #eee;
}
#app {
  text-align: center;
  color: #2c3e50;
  min-height: 850px;
  min-width: 1300px;
  width: 100%;
}
.hide {
  display: none;
}
.fl {
  float: left;
}
.fr {
  float: right;
}
.clear {
  clear: both;
  margin: 0;
  padding: 0;
  display: block;
}
.allbody {
  width: 1200px;
  margin-left: auto;
  margin-right: auto;
}
.ImgOut {
  position: relative;
  left: 0;
  top: 0;
  overflow: hidden;
  text-align: center;
  em {
    &::before{content: "";display:block;
      position:absolute;top:0;left:0;width:100%;height:100%;z-index:2;
    }
  }
  span {
    display: table-cell;
    vertical-align: middle;
    &::before{content: "";display:block;
      position:absolute;top:0;left:0;width:100%;height:100%;z-index:2;
    }
    img {
      max-width: 100%;
      max-height: 100%;
      display: inline-block;
    }
  }
}
section {
  width: 1200px !important;
  min-width: 1200px;
  min-width: 1200px;
  margin: 0 auto !important;
  margin-top: 20px !important;
  // margin-top: 74px !important;
}
.msi {
  // display: none;
  .nonedi{
    //  width: 200px;
    //   height: 404px;
      position: fixed;
      // background: url('./assets/images/matchcenter/msi.gif');
      left: 0;
      top: 50%;
      z-index: 99;
      // cursor: pointer;
      transform: translateY(-50%);
  }
  .route{
    // width: 200px;
    // height: 272px;
    position: absolute;
    top:0;
    left:0;
    display: block;
  }
  .route span{
    width: 200px;
    height: 272px;
  }
  // .leftadimg{
  //   width: 200px;
  //   height: 272px;
  // }
    .closemsi {
      cursor: pointer;
      width: 20px;
      height: 20px;
      font-size: 20px;
      position: fixed;
      color: #eee;
      top:0;
      right: 0;
      // position: absolute;
      // top:-10px;
      // right:-80px;
      z-index: 100;
  }
}
#footer,
#navbar {
  width: 100%;
}
.roll {
    position: fixed;
    right: 0;
    bottom: 20px;
    width: 240px;
    height: 188px;
    z-index:8208;
    img {
      width: 100%;
      height: 100%;
      cursor: pointer;
    }
  }
.suckthetop {
  position: fixed;
  right: 0;
  top: 50%;
  width: 40px;
  height: 220px;
  z-index:11;

  .suck {
    width: 40px;
    height: 40px;
    background: #393b3e;
    border-radius: 5px;
    margin-top: 3px;
    &:hover {
      background: #4a4d51;
    }
  }
  .suck1 {
    &:hover {
      .wxqrcode {
        display: block;
      }
      .gray1 {
        display: block;
      }
    }
  }
  .suck2 {
    &:hover {
      .appqrcode {
        display: block;
      }
      .gray2 {
        display: block;
      }
    }
  }
  .suck3 {
    &:hover {
      .qqonline {
        display: block;
      }
      .gray3 {
        display: block;
      }
    }
  }
  .sucks {
    display: inline-block;
    background: url("./assets/images/suckthetop.png") no-repeat;
  }
  .sucks1 {
    width: 21px;
    height: 30px;
    background-position: -40px 9px;
  }
  .sucks2 {
    display: inline-block;
    background: url("./assets/images/downloadapp.png") center 4px no-repeat;
    width: 30px;
    height: 36px;
    // background-position: -81px 9px;
  }
  .sucks3 {
    width: 21px;
    height: 30px;
    background-position: -19px 9px;
  }
  .sucks4 {
    width: 21px;
    height: 30px;
    background-position: -61px 9px;
  }
  .sucks5 {
    width: 21px;
    height: 30px;
    background-position: 2px 9px;
  }
  .qrcpde {
    width: 80px;
    height: 80px;
    position: absolute;
    right: 45px;
    display: block;
  }
  .h5cpde{
    width: 80px;
    height: 80px;
    position: absolute;
    right: 176px;
    display: block;
  }
  .wxqrcode {
    //  top:12px;
    top: -31px;
    width: 132px;
    height: 160px;
    display: none;
    z-index: 1 !important;
    //  display: block;
  }
  .appqrcode {
    // top:55px;
    top: 12px;
    display: none;
    width: 132px;
    height: 160px;
    z-index: 1 !important;
  }
  .qqonline {
    top: 6px;
    display: none;
    width: 132px;
    height: 160px;
    z-index: 1 !important;
  }
  .gray {
    display: inline-block;
    width: 10px;
    height: 40px;
    background: #4a4d51;
    position: absolute;
    right: 36px;
  }
  .gray1 {
    // top: 132px;
    top: 89px;
    display: none;
  }
  .gray2 {
    // top: 175px;
    top: 132px;
    display: none;
  }
  .gray3 {
    top: 46px;
    display: none;
  }
}

.part-tit-l {
  width: 100%;
  overflow: hidden;
  margin-top: 30px;
  margin-bottom: 15px;
  h3 {
    width: 104px;
    height: 24px;
    float: left;
    background: url("./assets/images/mygrand/scipt1.png") no-repeat;
    margin-left: 8px;
  }
  .h3{
    background: url('./assets/images/mygrand/coop.png') no-repeat;
  }
  .more {
    float: right;
    margin-top: 10px;
    font-size: 14px;
    color: #dcdcdc;
    padding-right: 20px;
    box-sizing: border-box;
    cursor: pointer;
    &:hover {
      color: #e1bf75;
      .border {
        border-color: #e1bf75;
        font-size: 0;
        line-height: 0;
        border-width: 5px;
        border-right-width: 0;
        border-style: dashed;
        border-left-style: solid;
        border-top-color: transparent;
        border-bottom-color: transparent;
        position: relative;
        right: 0;
        top: -5px;
      }
    }
    .moreload {
      padding-right: 3px;
    }
    .border {
      font-size: 0;
      line-height: 0;
      border-width: 5px;
      border-color: #dcdcdc;
      border-right-width: 0;
      border-style: dashed;
      border-left-style: solid;
      border-top-color: transparent;
      border-bottom-color: transparent;
      position: relative;
      right: 0;
      top: -5px;
    }
  }
}
#signin {
  width: 100%;
  position: fixed;
  left: 0px;
  right: 0px;
  top: 0px;
  bottom: 0px;
  z-index: 999999999999999;
  background: rgba(5, 6, 6, 0.8);
  .wrap_signin {
    position: fixed;
    top: 50%;
    left: 50%;
    margin-top: -130px;
    margin-left: -219px;
    border: 1px solid #e1bf75;
  }
  .wrap_signin_h258 {
    margin-top: -130px !important;
    margin-left: -220px !important;
    width: 440px;
    height: 260px;
    background: url("./assets/images/mygrand/com_dia_bg.jpg") no-repeat;
  }
  .wrap_signin_h476 {
    margin-top: -239px !important;
    margin-left: -270px !important;
    width: 540px;
    height: 478px;
    background-image: url("./assets/images/mygrand/h476bg.jpg");
  }
  .wrap_signin_checkin {
    width: 438px;
    height: 258px;
    background-image: url("./assets/images/mygrand/signinbg.jpg");
  }
  .x {
    position: absolute;
    right: 20px;
    display: block;
    width: 22px;
    height: 22px;
    background: url("./assets/images/competeImg/inequality_i.png") no-repeat
      center;
    &:hover {
      background-image: url("./assets/images/competeImg/inequality_ih.png");
    }
  }
  .x_258 {
    top: 11px;
  }
  .signin_top {
    text-align: center;
    position: relative;
    left: 0px;
    top: 0px;
  }
  .signin_top_258 {
    height: 38px;
    line-height: 38px;
    padding-left: 18px;
  }
  .signin_top_checkin {
    height: 38px;
    text-align: center;
    position: relative;
    left: 0px;
    top: 0px;
    line-height: 38px;
  }
  .signinreward {
    width: 432px;
    height: 300px;
    margin: 0 auto;
    margin-top: 30px;
  }
  .signincontent {
    height: 376px;
  }
  .reward {
    height: 160px;
    width: 432px;
    margin: 0 auto;
    text-align: left;
    margin-left: 10px;
    p {
      width: 432px;
      margin-top: 8px;
    }
    .title {
      font-size: 16px;
      color: #fff;
    }
    .info {
      color: #989898;
      line-height: 30px;
      padding-left: 12px;
    }
    .infodetail {
      display: inline-block;
      width: 360px;
      height: 66px;
      border: 1px solid #989898;
    }
  }
  .picinfo {
    width: 80px;
    height: 80px;
    border: 1px solid #e1c076;
    padding: 2px;
    position: relative;
    left: 40%;
    .pic {
      width: 76px;
      height: 76px;
    }
  }
  .btn {
    display: block;
    width: 104px;
    height: 40px;
    line-height: 40px;
    font-size: 18px;
    color: #946011;
    background-image: url("./assets/images/mygrand/normal.png");
    &:hover {
      background-image: url("./assets/images/mygrand/hover.png");
    }
  }
  .nfl {
    margin-left: 72px;
  }
  .nfr {
    margin-right: 72px;
  }
}
.closerecharge{position:absolute;top:-20px;right:0; width:20px; height:20px;color:#fff; text-align: center; line-height:20px; z-index:10;}
</style>
