<template>
 <div></div>
</template>

<script>
import { swiper, swiperSlide } from 'vue-awesome-swiper';
import router from "@/router";
export default {
  data() {
    return {
      isLogin: false,
      prediction_tabs:[{tab:'全部赛事',game:'all',path:''},{tab:'英雄联盟',game:'lol',path:''},{tab:'DOTA2',game:'dota',path:''},{tab:'王者荣耀',game:'wzry',path:''},{tab:'CS:GO',game:'csgo',path:''},{tab:'体育赛事',game:'football',path:''}],
      prediction_num:0,
      swiperOption_quiz:{
        speed: 2000,
        loop:true,
        slidesPerView : 4,
        slidesPerGroup : 1,
        prevButton:true,
        grabCursor : true,
        nextButton:true,
        preventClicks:true,
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        observer:true,//修改swiper自己或子元素时，自动初始化swiper
        observeParents:true,
      },
      hotcompetelistdata:[],
      guessPage:1,
      currentGame:'all',
      ops: {
        rail: {
          opacity: '0.8',
          background: '#518CFA',
          size:'8px',
        },
        bar: {
          background: '#cddeff',
          keepShow: true,
          onlyShowBarOnScroll:true,
        },
      },
    };
  },
  methods: {
    predictiontab(game,index){//预测tab切换
        this.hotcompetelistdata=[];
        this.prediction_num=index;
        this.guessPage = 1;
        this.currentGame = game;
        let guessParams = {
          game,
          status:'open',
          page:this.guessPage,
        };
        this.$store.dispatch('hotcompetedispatch',guessParams);
        setTimeout(() => {
            this.hotcompetelistdata = this.$store.state.home.hotcompetelist;
        }, 300);
    },
    handleToGuess(id){//预测
      this.$store.commit('mutationIsIndex',1);
      this.$store.commit('mutationIsSendDispath',true);
      router.push(`/guess/${id}`);
    },
    fnPrePage(){//预测-翻页上
      if(this.guessPage<=1){
        this.guessPage = 1;
        return;
      }else{
        this.guessPage--;
      }
      let guessParams = {
        game:this.currentGame,
        status:'open',
        page:this.guessPage,
      };
      this.$store.dispatch('hotcompetedispatch',guessParams);
    },
    fnNextPage(){//预测-翻页下
      let isGuessHasMore = this.$store.state.home.isGuessHasMore;
      if(isGuessHasMore){
        this.guessPage++;
      }else{
        return;
      }
      let guessParams = {
        game:this.currentGame,
        status:'open',
        page:this.guessPage,
      };
      this.$store.dispatch('hotcompetedispatch',guessParams);
      setTimeout(() => {
        this.hotcompetelistdata = this.$store.state.home.hotcompetelist;
      }, 300);
    },
    strIntercept(str){//用户名-限制
      let reg =/[\u4e00-\u9fa5]/;
      let a,b,newstr;
      if(reg.test(str)){
        if(str.length<=5){
            return str;
        }else{
          a=str.substr(0,2);
          b=str.substr(str.length-2,2);
          newstr = a  + '**' +b;
          return newstr;
        }
      }else{
        if(str.length<=10){
          return str;
        }else{
          a = str.substr(0,5);
          b = str.substr(str.length-2,2);
          newstr = a + '**' + b;
          return newstr;
        }
      }
    },
    toLogin(){//登录
      this.$store.commit('showLoginDialog',true);
      this.$store.commit('isloginBooleam',true);
    }
  },
  mounted() {
    let guessParams = {
      game:'all',
      status:'open',
      page:1,
    };
    this.$store.dispatch('hotcompetedispatch',guessParams);
    setTimeout(() => {
      this.hotcompetelistdata = this.$store.state.home.hotcompetelist;
      if(!this.hotcompetelistdata){
        setTimeout(() => {
          this.hotcompetelistdata = this.$store.state.home.hotcompetelist;
        }, 500);
      }
    }, 300);
     this.hotcompetelistdata = this.$store.state.home.hotcompetelist;
    this.$store.dispatch("cqMajorRanking");
    this.$store.dispatch("userFlow");
  },
  destroyed() {
      this.hotcompetelistdata = [];
      clearInterval(this.countDown);
  },
  computed: {
    userInfo() {
      return this.$store.state.user.userInfo || null;
    },
    cqMajorRankList(){
      return this.$store.state.activity.cqMajorRankList || null ;
    },
    userFlow(){
      return this.$store.state.activity.userFlow || null ;
    },
    quizData(){
      this.hotcompetelistdata = this.$store.state.home.hotcompetelist;
      return this.$store.state.home.hotcompetelist || null ;
    }
  },
};
</script>

<style scoped lang="scss">
#major {
  .main {
    width: 1150px;
    height: auto;
    margin: 0 auto;
    padding-bottom: 30px;
    .top {
      width: 100%;
      height: 688px;
      position: relative;
      .login_status {
        position: absolute;
        top: 86%;
        left: 50%;
        transform: translateX(-50%);
        .non_login {
          width: 330px;
          height: 143px;
          text-align: center;
          line-height: 128px;
          margin: 0 auto;
          color: #fff;
          font-size: 22px;
          background: url("../../assets/img/major/login.png") no-repeat;
        }
        .has_login {
          margin: 0 auto;
          .login_top {
            margin-bottom: 20px;
          }
          .avatar {
            width: 50px;
            height: 50px;
            display: inline-block;
            border-radius: 50%;
            transform: translateY(20%);
          }
          .username {
            font-size: 20px;
            color: #fff;
            margin: 0 4px;
          }
          .level {
            font-size: 14px;
            font-weight: 800;
            color: #fd4600;
          }
          .effective_flow {
            color: #00f0ff;
            font-size: 28px;
            font-weight: 800;
          }
        }
      }
    }
    .major_main {
      width: 100%;
      display: flex;
      justify-content: space-between;
      margin-top: 30px;
    }
    .activity_main {
      width: 806px;
    }
    .blue_txt {
      font-size: 18px;
      color: #00e4ec;
    }
    .small_txt,
    .introduce_txt {
      font-size: 18px;
      line-height: 28px;
      color: #fff;
    }
    .introduce_txt {
      line-height: 24px;
    }
    .activity_prize {
      width: 100%;
      height: 218px;
      display: flex;
      justify-content: space-between;
      li {
        width: 260px;
        &:nth-child(1) {
          position: relative;
        }
        .pos_txt {
          position: absolute;
          bottom: 47%;
          left: 50%;
          transform: translateX(-50%);
          color: #fff;
          font-size: 14px;
        }
        .prize_img {
          display: block;
        }
        .prize_img1 {
          width: 274px;
          height: 174px;
          margin-top: -33px;
        }
        .prize_img2 {
          width: 275px;
          height: 152px;
        }
        .prize_img3 {
          width: 273px;
          height: 197px;
        }
        .pure_txt {
          font-size: 20px;
          line-height: 54px;
          color: #fff;
          text-align: center;
        }
        .pure_txt2 {
          margin-top: -8px;
        }
        .pure_txt3 {
          margin-top: -52px;
        }
        .interval_num {
          width: 157px;
          height: 30px;
          line-height: 30px;
          font-size: 16px;
          color: #fff;
          text-align: center;
          margin: 0 auto;
          background: url("../../assets/img/major/interval_num.png") no-repeat;
        }
        .interval_num_1 {
          margin-top: 10px;
        }
      }
    }
    .activity_introduce {
      width: 100%;
      height: 360px;
      position: relative;
      background: url("../../assets/img/major/introduce_bg.png") no-repeat;
      margin-top: 39px;
      .introduce_wraper {
        // width: 608px;
        width: 690px;
        position: absolute;
        top: 10%;
        left: 9%;
        text-align: left;
        .padding_txt {
          padding-left: 26px;
        }
        .two {
          margin-top: 25px;
        }
        .three {
          margin-top: 28px;
        }
        .four {
          margin-top: 16px;
        }
        .five {
          margin-top: 29px;
        }
      }
    }
    .ranking_list {
      // width: 292px;
      width: 300px;
      height: 616px;
      background: url("../../assets/img/major/ranking_bg.jpg") no-repeat;
      background-size: cover;
      .rank_wraper {
        // width: 292px;
        width: 300px;
        height: 486px;
        position: relative;
        overflow-y: auto;
        margin-top: 130px;
        overflow-x:hidden;
      }
      .rank_noData{
        margin:200px auto;
      }
      .rank {
        width: 100%;
        position: absolute;
        top: 6px;
        padding-left: 20px;
        padding-right: 4px;
        li {
          width: 100%;
          height: 37px;
          line-height: 37px;
          display: flex;
          // justify-content: space-between;
          text-align: center;
          border-bottom: 1px solid transparent;
          border-image: linear-gradient(to right, #2951b9, #425dc9);
          border-image-slice: 10;
          &:hover {
            background: url("../../assets/img/major/hover.png") no-repeat;
          }
          span{
            // width: calc(100%/3);
            text-align: center;
          }
          .serial_num {
            width: 42px;
          }
          .name {
            width: 100px;
            margin-left: 14px;
          }
          .detail{
            width: 108px;
          }
        }
      }
    }
    .supplement {
      width: 100%;
      padding-bottom: 6px;
      background: rgba(1,5,14,1) url("../../assets/img/major/supplement.png") no-repeat;
      display: flex;
      justify-content: space-between;
      padding-top: 100px;
      position: relative;
      z-index: 2;
      .bule_txt_q {
        color: #01edfc;
        font-size: 18px;
        margin-top: 12px;
        text-align: left;
        line-height: 26px;
      }
      .txt {
        font-size: 16px;
        color: #fff;
        text-align: left;
        line-height: 24px;
        padding-left: 2px;
      }
      .s_txt {
        font-size: 16px;
        color: #fff;
        padding-left: 29px;
        text-align: left;
        line-height: 24px;
      }
      .blue_point {
        display: inline-block;
        width: 6px;
        height: 6px;
        background: #00e4ec;
        border-radius: 50%;
        margin-bottom: 3px;
      }
    }
    .qrcode {
      padding-top: 36px;
      .wx_qrcode {
        width: 244px;
        height: 244px;
        display: block;
        margin-left: 38px;
      }
      .tip_txt {
        width: 327px;
        height: 31px;
        font-size: 16px;
        line-height: 31px;
        color: #fff;
        background: url("../../assets/img/major/txt_bg.png") no-repeat;
        text-align: center;
        margin-top: 26px;
      }
    }
    .prediction {
      //第二部分预测
      width: 100%;
      height: 408px;
      margin: 24px 0 48px 0;
      .prediction_tab {
        //预测导航条
        width: 100%;
        height: 62px;
        display: flex;
        background: url("../../assets/img/major/quiz_bg.png") no-repeat;
        background-size: cover;
        margin-bottom: 34px;
        font-size: 22px;
        line-height: 62px;
        color: #fff;
        li {
          width: calc(100%/6);
          text-align: center;
          border-left: 1px solid #0c4f74;
          &:hover {
            background: url("../../assets/img/major/quiz_activity.png") center
              no-repeat;
          }
        }
        .li_activity{
          background: url("../../assets/img/major/quiz_activity.png") center
              no-repeat;
        }
      }
      .prediction_tab_content {
        //预测主体
        width: 100%;
        height: 300px;
        .prediction_content {
          //预测轮播图
          .swiper-container {
            .swiper-wrapper {
              display: flex;
              justify-content: space-around;
            }
            .swiper_wraps {
              padding-left: 0px;
              display: flex;
              justify-content: space-around;
              .swiper_block {
                width: 252px !important;
                margin: 0 13px 0 21px;
              }
            }
            .swiper-button-prev {
              background: url("../../assets/img/home/ecleft.png") no-repeat;
              left: 0px;
            }
            .swiper-button-next {
              background: url("../../assets/img/home/ecright.png") no-repeat;
              right: -20px;
            }
            .nextArrow {
              display: none;
            }
            .block_quiz {
              //预测小块
              height: 300px;
              .game_icon {
                //游戏图标
                width: 17px;
                height: 17px;
                display: block;
                margin: 0 auto;
                margin-top: 18px;
                background: url("../../assets/images/competeImg/guess_logoS.png")
                  no-repeat;
                background-size: cover;
              }
              .game_icon1 {
                background-position: -32px 0px;
              }
              .game_icon2 {
                background-position: -5px 0px;
              }
              .game_icon3 {
                background-position: -87px 0px;
              }
              .game_icon4 {
                width: 20px;
                height: 12px;
                background-position: -39px 0px;
              }
              .game_icon5 {
                background-position: -114px 0px;
              }
              .game_icon6 {
                background-position: -114px 0px;
              }
              .game_icon7 {
                display: inline-block;
                width: 32px;
                height: 22px;
                background: url("../../assets/images/matchcenter/wzry_icon_lh.png")
                  no-repeat;
              }
              .quiz_time {
                font: 18px/24px "\5FAE\8F6F\96C5\9ED1";
                color: #dcdcdc;
                text-align: center;
                margin-top: 8px;
              }
              .quiz_status {
                font: 14px/22px "\5FAE\8F6F\96C5\9ED1";
                color: #21f3fa;
                text-align: center;
                margin-bottom: 10px;
              }
              .quiz_team {
                //战队信息
                display: flex;
                justify-content: space-around;
                .multiteam {
                  .multi_team_name {
                    background: url("../../assets/img/home/game_name_bg_hover.png")
                      center no-repeat;
                  }
                  &:nth-child(1) {
                    .team_logo {
                      margin-left: 54px;
                    }
                    .multi_team_name {
                      background-position: 42px 0px;
                      text-align: right;
                      padding-right: 0px;
                    }
                  }
                  &:nth-child(2) {
                    .multi_team_name {
                      background-position: -90px 0px;
                      text-align: center;
                    }
                  }
                  &:nth-child(3) {
                    .team_logo {
                      margin-right: 54px;
                    }
                    .multi_team_name {
                      background-position: -233px 0px;
                      text-align: left;
                    }
                  }
                }
                .team_logo {
                  width: 64px;
                  height: 64px;
                  display: block;
                  margin: 0 auto;
                  span {
                    width: 64px;
                    height: 64px;
                  }
                }

                .test_vs {
                  font: 900 18px/22px "\5FAE\8F6F\96C5\9ED1";
                  color: #fff;
                  margin-top: 64px;
                }
                .team_name {
                  width: 118px;
                  height: 40px;
                  color: #fff;
                  font: 900 14px/40px "\5FAE\8F6F\96C5\9ED1";
                  margin-top: 6px;
                }
                .margin_2px {
                  margin-top: 2px;
                }
                .margin_6px {
                  margin-top: 6px;
                }
                .team_name_left {
                  background: url("../../assets/img/home/team_a.png") 100%
                    no-repeat;
                  text-align: center;
                }
                .team_name_right {
                  background: url("../../assets/img/home/team_b.png") 0% no-repeat;
                  text-align: center;
                }
              }
              .block_up {
                height: 204px;
                overflow: hidden;
              }
              .block_up1 {
                //dota
                background: url("../../assets/img/home/quiz-bg-dota2.png")
                  no-repeat;
                &:hover {
                  background: url("../../assets/img/home/quiz-bg-dota2_hover.png")
                    no-repeat;
                }
              }
              .block_up2 {
                //lol
                background: url("../../assets/img/home/quiz-bg-lol.png") no-repeat;
                &:hover {
                  background: url("../../assets/img/home/quiz-bg-lol_hover.png")
                    no-repeat;
                }
              }
              .block_up3 {
                //csgo
                background: url("../../assets/img/home/quiz-bg-csgo.png") no-repeat;
                &:hover {
                  background: url("../../assets/img/home/quiz-bg-csgo_hover.png")
                    no-repeat;
                }
              }
              .block_up4 {
                //pubg
                background: url("../../assets/img/home/quiz-bg-pubg.png") no-repeat;
                &:hover {
                  background: url("../../assets/img/home/quiz-bg-pubg_hover.png")
                    no-repeat;
                }
              }
              .block_up5 {
                //sport
                background: url("../../assets/img/home/quiz-bg-sport.png")
                  no-repeat;
                &:hover {
                  background: url("../../assets/img/home/quiz-bg-sport_hover.png")
                    no-repeat;
                }
              }
              .block_up6 {
                //sport
                background: url("../../assets/img/home/quiz-bg-sport.png")
                  no-repeat;
                &:hover {
                  background: url("../../assets/img/home/quiz-bg-sport_hover.png")
                    no-repeat;
                }
              }
              .block_up7 {
                //sport
                background: url("../../assets/img/home/quiz_bg_wzry.png") no-repeat;
                &:hover {
                  background: url("../../assets/img/home/quiz_bg_wzry_hover.png")
                    no-repeat;
                }
              }
              .block_btm {
                height: 94px;
                background: #2f2f33;
                overflow: hidden;

                .game_info {
                  font: 13px/18px "\5FAE\8F6F\96C5\9ED1";
                  margin: 12px 0;
                  color: #fff;
                  text-align: center;
                }
                .partin_btn {
                  width: 191px;
                  height: 85px;
                  margin: 0 auto;
                  color: #fff;
                  text-align: center;
                  background: url("../../assets/img/major/guess.png") no-repeat;
                  background-size: cover;
                  line-height: 68px;
                  font-size: 14px;
                  margin-top: -18px;
                }
              }
            }
          }
        }
        .testNo {
          display: none;
        }
      }
      .noData{
        margin:168px auto;
      }
    }
  }
}
</style>
