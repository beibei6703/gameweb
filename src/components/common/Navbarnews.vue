<template>
  <div id="navbar">
      <PopupLogin :show="showLogin" @close="closeLoginDialog" ref="loginDialog"/>
      <ForgetPassword v-if="showForgetDa"/>
      <CommonPupop/>
      <LoginInequality/>
      <!-- 头部导航顶部开始 -->
      <div class="fixed_top" v-if="!getIsShow">
        <div id="navbar_top">
          <!-- 头部导航顶部居中-flex开始 -->
          <div class="margin_1200 navbar_top_flex">
            <!-- 头部导航左侧侧小部件开始 -->
            <div class="narbar_left">
              <a class="small_part small_part1 " target="_blank" href="tencent://message/?uin=1056387396&Site=https://vps.shuidazhe.com&Menu=yes"><img src="../../assets/img/small_pic/online.png" alt="在线客服" class="small_part_img small_part_img1 pointer"> 在线客服(9:00~23:00) <span class="separate_line">|</span></a>
              <a class="small_part wb_part" href="https://weibo.com/u/6388838166" target="blank">
                <p class="small_part_img wb_logo"></p>
              </a>
              <div class="small_part position_samll_part wx_part">
                <p class="small_part_img wx_logo"></p>
                <img src="../../assets/images/mygrand/wxgzh.jpg" alt="" class="wxqrcode qrcpde">
              </div>
              <div class="small_part position_samll_part app_part">
                <p class="small_part_img app_logo"></p>
                <!-- <img src="../../assets/img/home/apppng.png" alt="" class="appqrcode qrcpde">
                <img src="../../assets/img/home/loginbyh5.jpg" alt="" class="h5qrcode"> -->
                <img src="../../assets/img/home/loginbyh5.jpg" alt="" class="appqrcode qrcpde">
              </div>


            </div>
            <!-- 头部导航左侧小部件结束 -->
            <!-- 头部导航右侧开始 -->
            <div class="narbar_right">
              <!-- 未登录开始 -->
              <div class="userInfo_top" v-if="!userInfo">
                <p class="not_logged_tip">点击注册,登录之后有惊喜!</p>
                <span class="left_triangle"></span>
                <p class="btn_login pointer" @click="showLoginDialog('login')">登录</p>
                <p class="btn_register pointer" @click="showLoginDialog('register')">注册</p>
              </div>
              <!-- 未登录结束 -->
              <!-- 已登录开始 -->
              <div v-if="userInfo" @mouseover="fnShowDrop()" @mouseout="fnHideDrop" style="cursor:pointer;">
                <div class="userInfo_top">
                  <!-- 默认 -->
                  <!-- <img src="../../assets/img/home/avatar.jpg" alt="" class="avatar"> -->
                  <img :src="userInfo.avatar" alt=""  class="avatar">
                  <p class="nickname">{{username}}</p>
                  <p class="leavel">lv{{userInfo.level}}</p>
                  <p class="isshow-infor"  :class="{active:userInfo.unread_num}">
                    <img src="../../assets/img/home/msg_tip.png" alt="" class="drop_down_box pointer" v-if="userInfo.unread_num">
                    <img src="../../assets/img/home/showdropdown.png" alt="" class="drop_down_box pointer" v-else>
                    <i></i>
                  </p>

                </div>
                <!-- 已登录结束 -->
                <!-- 下拉框开始 -->
                <ul class="drop" v-if="isDropShow">
                  <li>余额：{{thousandBitSeparator(userInfo.cai)}} c</li>
                  <li><router-link to="/mygrand" tag="p" class="secondli_top" @click.native="fnhidedropshow()" :style="isCheckin ?'line-height:36px;':'line-height:26px;'">个人信息<i></i> </router-link><p class="secondli_btm " v-if="!isCheckin"><img src="../../assets/img/home/gocheck.png" alt="" class="box_img"> 签到有惊喜!</p></li>
                  <router-link tag="li" class="thirdli-top" to="/mygrand/myemail" :class="{active:userInfo.unread_num}" @click.native="mygranddispatch">我的邮箱<i></i></router-link>
                  <li @click="fnToLogOut()" class="fourli-top">退出登录<i></i></li>
                </ul>
              <!-- 下拉框结束 -->
              </div>
            <!-- 头部导航右侧结束 -->
            </div>
          </div>
          <!-- 头部导航顶部居中-flex结束
            -->
        </div>
        <!-- 头部导航顶部结束 -->

        <!-- 头部导航主体开始 -->
        <div id="navbar_main">
          <div class="margin_1200 navbar_main_wrap">
            <div class="navbar_main_left">
              <router-link tag="div" to="/home">
                <img src="../../assets/img/small_pic/logo.png" alt="" class="logo pointer" oncontextmenu="return false;">
              </router-link>
              <span class="sparate_line">|</span>
              <span class="pure_text">预测有礼 精彩无限</span>
              <!-- <router-link to="/cqMajor" class="pure_text" tag="span">预测有礼 精彩无限</router-link> -->
            </div>
            <!-- <router-link to="/paymoney" tag="div" class="recharge_btn pointer"></router-link> -->
            <router-link to="/paymoney" tag="div" class="recharge_btn pointer"><img src="../../assets/img/home/recharge_btn.png" alt=""></router-link>
            <ul class="navbar_main_right" v-if="homelight">
               <router-link to="/home" tag="li" :class="{liactive: homelight[0]==true}">
                首页
              </router-link>
              <router-link to="/compete/Quizzeszone?ID=all" tag="li" :class="{liactive:  homelight[1]==true}">
                预测
              </router-link>
              <router-link to="/mall" tag="li" :class="{liactive:  this.homelight[2]==true}">
                商城
              </router-link>
              <router-link :to="{path:'/news',query:{currentLi:2}}" tag="li" :class="{liactive:  homelight[3]==true}">
               资讯
              </router-link>
               <router-link to="/activecenter" tag="li" :class="{liactive:  homelight[4]==true}">
              活动中心
              </router-link>
              <router-link to="/matchcenter" tag="li" :class="{liactive:  homelight[5]==true}">
                赛事中心
              </router-link>
              <router-link to="/mygrand" tag="li" :class="{liactive: homelight[6]==true}">
                我的菜园
              </router-link>
            </ul>
          </div>
        </div>
       <!-- 头部导航主体结束 -->
      </div>

      <!-- 消息滚动条开始 -->
      <div id="msg_scroll_bar"  v-if="!getIsShow">
        <div class="margin_1200 alarm">
          <div class="alarm-left"></div>
          <div class="alarm-right" v-if="runninglist&&runninglist.length>0">
            <div class="channelin">
              <h3>
                <p class="informm " :style="{left:positionright}">
                  <img src="../../assets/images/info.png" alt="" class='systeminfo' v-if="runninglist[0].channel=='world'">
                  <img src="../../assets/images/alarm.png" alt="" class='systemblue' v-else>
                  <span class="worlds" v-if="runninglist[0].channel=='world'"> {{runninglist[0].nickname}} : {{runninglist[0].content}}</span>
                  <span class="systems" v-else>系统消息
                    <span class="colon">:</span>
                    &nbsp;&nbsp;{{runninglist[0].content}}</span>
                </p>
              </h3>
            </div>
          </div>
        </div>
      </div>
      <!-- 消息滚动条结束 -->

      <!-- <img src="../../assets/img/home/wx_hover.png" alt=""> -->

  </div>
</template>

<script>
var date = new Date();
var m = date.getMonth() + 1;
var d = date.getDate();
var day = m + ':' + d;
import Http from '@/common/http';
import {
  setStore,
  getStore,
  removeStore,
  getCookie,
  setCookie,
  removeCookie,
} from '@/utils/storage.js';
import Fingerprint2 from '@/utils/fingerprintjs2';
// import scroxt from "scroxt";
  export default {
    data() {
      return {
        islogin:false,
        cainum:123456789,
        isDropShow:false,
        num: 0,
      }
    },
    methods: {
      fnShowDrop(){//下拉框显示与隐藏
        this.isDropShow=!this.isDropShow;
      },
      fnHideDrop(){
        this.isDropShow=!this.isDropShow;
      },
      fnhidedropshow(){
        this.isDropShow=false;
      },
      mygranddispatch() {
        this.showdwtabs = false;
      },
      fnToLogOut(){//退出登录
        this.$store.dispatch('logout');
        let thisPath = this.$route.path;
        if (thisPath.indexOf('guess') < 0 && thisPath.indexOf('compete') < 0) {
          this.$router.push({
            path: '/home',
          });
        }
        this.isDropShow = false;
        setTimeout(() => {
          window.location.reload();
        }, 600);
      },
      showLoginDialog: function(tab) {//登录注册
        this.$store.dispatch('userInfo');
        setTimeout(() => {
          if (!this.$store.state.user.userInfo) {
            this.$store.dispatch('showLoginDialog');
            this.$store.state.match.loginPupop = true;
            this.$refs.loginDialog.tab(tab);
            this.$store.dispatch('checkinprogessdispatch');
            this.$store.dispatch('userinfoshowdispatch');
            this.$store.dispatch('getguessdatadis');
          }
        }, 100);
      },
      closeLoginDialog: function() {//关闭登录弹窗
        this.$store.dispatch('hideLoginDialog');
        this.$store.state.match.loginPupop = false;
      },
      bgimage(str, num) {
        if (num == 3) {
          // console.log('资讯进入gameid2')
          // this.$store.dispatch('newshotnewslistdispatch', 2);
          // this.$store.dispatch('newsteamrankdispatch', 2);
          // this.$store.dispatch('newsnumber10dispatch', 2);
          this.$store.dispatch('setid', 2);
          this.$store.dispatch('background', str);
          this.num = num;
        } else {
          this.$store.dispatch('background', str);
          this.num = num;
        }
      },
      getDevice() {
        removeCookie('isCompleteAll');
        removeCookie('isCompeteFour');

        this.$store.commit('mutationisCompleteAll', false);
        let tid=false;
        if(getCookie('tid')==null||getCookie('tid')==undefined){
          tid=false;
        }else{
          tid=true;
        }
        // console.log('tid',tid,getCookie('tid'))
        this.$store.commit('mutationsIsHavetid',tid)
        if (getCookie('tid') == null||getCookie('tid') == undefined) {
          let fp = new Fingerprint2();
          return fp.get(function(result) {
            Http.post('/device/register', {
              fingerprint: result,
            }).then(function(response) {});
          });
        }
      },
    },
    computed: {
      showLogin: function() {//登录框
        return this.$store.state.user.showLoginDialog;
      },
      showForgetDa: function() {//忘记密码
        return this.$store.state.match.showForgetDa;
      },
      userInfo:function () {//个人信息
        return this.$store.state.user.userInfo
      },
      username:function(){//用户名
        return this.$store.state.user.username
      },
      scroxtHorizontal:function(){
        // let srcox =  new scroxt.Horizontal({
        //     target: ".my-ele",
        //     data: ['第一条','第2条','第3条'],
        //     speed: -5,
        //     gap: 20
        // });
        // return srcox;
      },
      positionright() {
        return this.$store.state.home.positionright
          ? this.$store.state.home.positionright
          : 0;
      },
      runninglist: function() {
        // console.log('this.$store.state.home.runninglist',this.$store.state.home.runninglist)
        return this.$store.state.home.runninglist? this.$store.state.home.runninglist: null;
      },
      homelight() {
        let menuClist = new Array(false, false, false, false, false, false,false);
        if (this.$route.path.indexOf('home') != -1) {
          this.bgimage(require('../../assets/images/background.jpg'), 0);
          menuClist[0] = true;
          return menuClist;
        }
        if (this.$route.path.indexOf('/rebate') != -1) {
          // this.bgimage('https://imgcdn.api.com/images/rebate/rebatebg.png', 0);
          this.bgimage(require('../../assets/img/rebate/rebatebg.jpg'), 0);
          menuClist[0] = true;
          return menuClist;
        }
        if (this.$route.path.indexOf('treasure') != -1) {
          this.bgimage('https://imgcdn.api.com/images/treasure/treasure_bg.png', 0);
          menuClist[0] = true;
          return menuClist;
        }
        if (this.$route.path.indexOf('cqMajor') != -1) {
          this.bgimage(require('../../assets/img/major/major_bg.jpg'), 0);
          menuClist[0] = false;
          return menuClist;
        }
        if (this.$route.path.indexOf('compete') != -1) {
          this.bgimage(require('../../assets/images/background.jpg'), 0);
          menuClist[1] = true;
          return menuClist;
        }
        if (this.$route.path.indexOf('mall') != -1) {
          this.bgimage(require('../../assets/img/mall/mallbg.png'), 3);
          menuClist[2] = true;
          return menuClist;
        }
        if (this.$route.path.indexOf('newslist') != -1) {
          this.bgimage(require('../../assets/images/background.jpg'), this.$route.query.game_id);
          menuClist[3] = true;
          return menuClist;
        }
        if (this.$route.path.indexOf('newsdetail') != -1) {
          this.bgimage(require('../../assets/images/background.jpg'), this.$route.query.game_id);
          menuClist[3] = true;
          return menuClist;
        }
        if (this.$route.path.indexOf('news') != -1) {
          this.bgimage(
            require('../../assets/images/News-images/news-lolbg.jpg'),
            3
          );
          menuClist[3] = true;
          return menuClist;
        }
        if (this.$route.path.indexOf('teaminfo') != -1) {
          menuClist[3] = true;
          return menuClist;
        }
        //活动
          if (this.$route.path.indexOf('activecenter') != -1) {
              this.bgimage(require('../../assets/images/background.jpg'), 0);
              menuClist[4] = true;
              return menuClist;
        }
        if (this.$route.path.indexOf('matchcenter') != -1) {
          this.bgimage(require('../../assets/images/matchcenter/bigbg.jpg'), 4);
          menuClist[5] = true;
          return menuClist;
        }
        // if (this.$route.path.indexOf('matchdetail') != -1) {
        //   this.bgimage(require('../../assets/images/matchcenter/bigbg.jpg'), 4);
        //   menuClist[5] = true;
        //   return menuClist;
        // }
        if (this.$route.path.indexOf('freeturn') != -1) {
          this.bgimage(require('../../assets/images/background.jpg'), 0);
          menuClist[0] = false;
          return menuClist;
        }
        if (this.$route.path.indexOf('question') != -1) {
          this.bgimage(require('../../assets/images/background.jpg'), 0);
          menuClist[0] = false;
          return menuClist;
        }
        if (this.$route.path.indexOf('paymoney') != -1) {
          this.bgimage(require('../../assets/images/background.jpg'), 0);
          menuClist[0] = false;
          return menuClist;
        }
        if (this.$route.path.indexOf('alipay/') != -1) {
          this.bgimage(require('../../assets/images/background.jpg'), 0);
          menuClist[0] = false;
          return menuClist;
        }
        if (this.$route.path.indexOf('downloadpage') != -1) {
          this.bgimage(require('../../assets/images/background.jpg'), 0);
          menuClist[0] = false;
          return menuClist;
        }
        if (this.$route.path.indexOf('turntable') != -1) {
          this.bgimage(require('../../assets/images/turntable/turntablebg.png'), 0);
          menuClist[0] = false;
          return menuClist;
        }
        if (this.$route.path.indexOf('mygrand') != -1) {
          this.bgimage(require('../../assets/images/background.jpg'), 5);
          menuClist[6] = true;
          // this.$store.dispatch('userInfo');
          if (this.$store.state.user.login == false) {
            this.$router.push({path: '/home'});
          } else {

          }
          return menuClist;
        }
        if (this.$route.path.indexOf('guess') != -1) {
          this.bgimage(require('../../assets/images/background.jpg'), 1);
          menuClist[1] = true;
          return menuClist;
        }
      },
      isCheckin(){
        return this.$store.state.home.woquya ? this.$store.state.home.woquya : false
      },
      getIsShow(){
        return this.$store.state.treasure.isLoginAddActive
      },
    },
    mounted() {
      this.$store.state.match.loginPupop = false;
      this.$store.dispatch('userInfo');
      if(this.$route.path.indexOf('/treasure')==-1){
        // this.$store.dispatch('leftad')
        this.$store.dispatch('getsystemdatadis');
        this.$store.dispatch('runninglistdis');
        this.$store.dispatch('checkinprogessdispatch')
      }

      this.getDevice();
      if (this.$route.path.indexOf('home') !== -1) {
        this.homelight[0] = true;
      }
      if (this.$route.path.indexOf('home') !== -1) {
        this.$store.dispatch('hotcompetedispatch');
        this.$store.dispatch('bswiperdispatch');
        this.$store.dispatch('eventcenterdispatch');
        this.$store.dispatch('exchangedispatch');
        this.$store.dispatch('hotnewslistdispatch');
        this.$store.dispatch('recomgoodslistdispatch');
        this.$store.dispatch('richlistdispatch');
      }
    },
  }
</script>

<style scoped lang="scss">
.isshow-infor{
  position:relative;
  top:0;
  left:0;
}
.isshow-infor.active i{
  display:block;
  position:absolute;
  top:12px;
  right:-10px;
  width:10px;
  height:10px;
  border-radius:100%;
  background:#ed4b4b;
  animation: team_cx 0.9s linear 0s infinite alternate;
  -webkit-animation: team_cx 0.9s linear 0s infinite alternate;
  -ms-animation: team_cx 0.9s linear 0s infinite alternate;
  -moz-animation: team_cx 0.9s linear 0s infinite alternate;
  -o-animation: team_cx 0.9s linear 0s infinite alternate;
  @keyframes team_cx{
    0%{
      opacity:1;
    }
    100%{
       opacity:0;
    }
  }
  @-webkit-keyframes team_cx{
    0%{
      opacity:1;
    }
    100%{
       opacity:0;
    }
  }
  @-moz-keyframes team_cx{
    0%{
      opacity:1;
    }
    100%{
       opacity:0;
    }
  }
  @-o-keyframes team_cx{
    0%{
      opacity:1;
    }
    100%{
       opacity:0;
    }
  }
}
  #navbar{
    width:100%;
    .fixed_top{
      width:100%;
      position: fixed;
      top:0;
      z-index: 8209;
    }
    // .recharge_btn{
    //   width: 38px;
    //   height: 20px;
    //   position: relative;
    //   top:31px;
    //   left: -88px;
    //   background: url("../../assets/img/home/recharge_normal.png") no-repeat;
    //   background-size: cover;
    //   &:hover{
    //     background: url("../../assets/img/home/recharge_hover.png") no-repeat;
    //     background-size: cover;
    //   }
    // }
    #navbar_top{//头部导航顶部开始
      height: 40px;
      width:100%;
      background: #3a3b3f;


      .navbar_top_flex{//头部导航顶部-flex
        display: flex;
        justify-content: space-between;
      }

      .narbar_left{//头部导航左侧侧小部件开始
        display: flex;
        .position_samll_part{
          position: absolute;
        }

        .wb_part{
          &:hover{
            .wb_logo{
              background: url("../../assets/img/home/wb_hover.png") no-repeat;
            }
          }
        }

        .wx_part{
          &:hover{
            .wxqrcode{
              display: block;
            }
            .wx_logo{
              background: url("../../assets/img/home/wx_hover.png") no-repeat;
            }
          }
        }

        .app_part{
          &:hover{
            .appqrcode{
              display: block;
            }
            .h5qrcode{
              display: block;
            }
            .app_logo{
              background: url("../../assets/img/home/app_hover.png") no-repeat;
            }
          }
        }

        .small_part{
          color: #9f9f9f;
          font-size: 12px;
          line-height: 40px;
        }

        .small_part1{
          display: flex;
          margin-right:10px;
          position: relative;
          z-index: 3;
        }

        .separate_line{
          margin-left:14px;
          color: #000;
        }

        .small_part_img{
          width: 20px;
          height: 20px;
          display: block;
          margin-top:10px;
          margin:10px 14px 0 0 ;
          position:relative;
        }

        .wb_logo{
          background: url("../../assets/img/home/wb.png") no-repeat;
        }

        .wx_logo{
          left:200px;
          background: url("../../assets/img/home/wx.png") no-repeat;
        }

        .app_logo{
          left:230px;
          background: url("../../assets/img/home/app.png") no-repeat;
        }

        .small_part_img1{
          margin-right: 6px;
        }

        .wxqrcode{
          position: absolute;
          left: 150px;
          top:36px;
          display: none;
        }

        .appqrcode{
          position: absolute;
          left:180px;
          top:36px;
          display: none;
        }

        .h5qrcode{
          position: absolute;
          left:312px;
          top:36px;
          display: none;
        }

        .position_block{
          width:134px;
          height: 162px;
          background: #fff;
          position: absolute;
        }

      }

      .narbar_right{//头部导航右侧

        .userInfo_top{//未登录状态下头部导航右侧
          display: flex;
          margin-right: 10px;
        }

        .not_logged_tip{//未登录提示框
          width:160px;
          height: 20px;
          font-size: 12px;
          line-height: 16px;
          border:1px solid #818181;
          box-sizing: border-box;
          background: #535353;
          color: #dcdcdc;
          padding-left: 10px;
          margin:10px 6px 0 0 ;
        }
        .left_triangle{//超右方向小箭头
            width: 0;
            height: 0;
            border-top: 5px solid transparent;
            border-left: 7px solid #818181;
            border-bottom: 5px solid transparent;
            position: relative;
            left: -6px;
            top:15px;
        }

        .btn_login{//登录按钮
          margin-right: 16px;
          font-size: 12px;
          line-height: 40px;
          color: #dfca4c;
        }

        .btn_register{//注册按钮
          font-size: 12px;
          line-height: 40px;
          color: #dcdcdc;
        }

        .avatar{
          width:24px;
          height: 24px;
          border-radius: 50%;
          display: block;
          margin:10px 6px 0 0;
        }

        .nickname{
           font-size: 12px;
           line-height: 44px;
           color: #dcdcdc;
           margin-right: 10px;
        }

        .leavel{
          color: #fe4500;
          font-size: 10px;
          line-height: 46px;
        }

        .drop_down_box{
          width:11px;
          height: 11px;
          display: block;
          border-radius: 50%;
          margin:18px 0  0 8px  ;
        }

        .drop{//下拉框
          width:132px;
          min-height:120px;
          background: #39393c;
          text-align: center;
          font-size: 12px;
          line-height: 40px;
          color: #dcdcdc;
          position: absolute;
          top:40px;

          li{
            height: 40px;position:relative;top:0;left:0;
            &:nth-child(1){
              cursor: default;
            }

            &:nth-child(even){
              background: #2f2e34;
            }


            .secondli_top{
              line-height: 26px;position:relative;top:0;left:0;
            }
            .secondli_top i{display: inline-block;margin-left:5px;width:12px; height:12px;background:url('../../assets/img/home/icon_more.png') no-repeat center;}
            &:hover .secondli_top i{background-image:url('../../assets/img/home/icon_more_hover.png')}
            .secondli_btm{
              line-height:4px;
              font-size: 10px;
              color: #20b0c8;
              display: flex;
              justify-content: center;
              .box_img{
                width:10px;
                height: 10px;
                display: block;
                margin:-2px 3px 0 0;
              }
            }
          }
          .thirdli-top i{
              content:'';position:relative;top:0;left:0;display:inline-block;margin-left:5px; width:12px; height:12px;background:url('../../assets/img/home/icon_email.png') no-repeat center;

            }
          .thirdli-top:hover i{
            background-image:url('../../assets/img/home/icon_email_hover.png')

          }
          .thirdli-top i::before{
            content:'';
            display:none;position:absolute;top:0;right:-8px; width:6px; height:6px; border-radius:100%; background:#fe4500; vertical-align: 5px;

          }
          .thirdli-top.active i::before{
            display:block;
          }
          .fourli-top i{
            position:relative;top:0;left:0;display:inline-block;margin-left:5px; width:12px; height:12px;background:url('../../assets/img/home/logout.png') no-repeat center;

          }
          .fourli-top:hover i{
           background-image:url('../../assets/img/home/logout_hover.png')

          }


        }


      }

    }

    #navbar_main{//头部导航主体开始
      height: 80px;
      width: 100%;
      background: url("../../assets/img/home/nav_top_bg.png" ) no-repeat;

      .navbar_main_wrap{//主体
        display: flex;
        justify-content: space-between;

        .navbar_main_left{//主体左边
          display: flex;

          .logo{
            width:124px;
            height: 37px;
            display:block;
            margin:22px 28px 0 6px;
          }

          .sparate_line{//分割线
            line-height: 80px;
            color:#393c3e;
            margin-right: 26px;
          }

          .pure_text{//纯文本
            font-size: 12px;
            line-height: 80px;
            color: #dcdcdc;
          }
        }

        .navbar_main_right{//主体右边导航tab选项卡
          display: flex;
          justify-content:flex-end;
          font-size: 16px;
          font-weight: 900;
          line-height: 80px;
          color: #fff;
          text-align: center;
          .liactive{
            background: url("../../assets/img/home/nav_top_bg_hover.png")  no-repeat;
            background-size: cover;
          }
          li{
            padding:0 10px;
            margin:0 20px;
            text-align: center;
            &:nth-child(6){
              margin:0;
            }
            &:hover{
              background: url("../../assets/img/home/nav_top_bg_hover.png") no-repeat;
              background-size: cover;
            }
          }
        }
      }
    }

    #msg_scroll_bar{//消息滚动条开始
      height: 30px;
      width:100%;
      margin-top:126px;
      background: linear-gradient(to right,#222 2%,#2e3037 100%,#222 2%);
      .alarm {
        //跑马灯
        height: 30px;
        margin: 0 auto;
        margin-top: 8px;
        margin-bottom: 28px;
        .alarm-left {
          width: 62px;
          height: 36px;
          background: rgba(98, 98, 98, 0.2);
          float: left;
          margin: 0 auto;
          position: relative;
          img {
            color: #dcdcdc;
            margin-top: 10px;
            position: absolute;
            left: 20px;
            top: 0;
          }
        }
        .alarm-right {
          //左侧通知
          width: 1138px;
          height: 36px;
          float: left;
          background: rgba(98, 98, 98, 0.2);
          font-size: 14px;
          line-height: 36px;
          text-align: left;
          box-sizing: border-box;
          position: relative;
          left: 0px;
          top: 0px;
          overflow: hidden;
          h3 {
            //跑马灯信息
            color: #fff;
            opacity: 1;
            height: 36px;
            font-size: 14px;
            min-width: 106px;
            .time {
              display: inline-block;
            }
            p {
              padding-left: 20px;
              position: absolute;
              top: 0px;
              .worlds {
                white-space: nowrap;
                overflow: hidden;
              }
            }
          }
        }
        .systemblue {
          width: 16px;
          height: 16px;
          display: block;
          position: absolute;
          left: -2px;
          top: 10px;
        }
        .systeminfo {
          width: 20px;
          height: 15px;
          display: block;
          position: absolute;
          left: -9px;
          top: 11px;
        }
        .colon {
          color: #fff;
          position: absolute;
          left: 78px;
          top: 0px;
        }
      }
    }

  }
</style>
