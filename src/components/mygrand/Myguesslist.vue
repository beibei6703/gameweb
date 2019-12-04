<template>
<div id="myguess">
  <div class="myguess-list">
    <ul v-if="getMygrandGuessData">
      <li v-for="(demo,key) in getMygrandGuessData" :key="key" :class="'myguess_bg'+demo.game_id" v-if="key<=3">
        <div class="myguess-list-up">
          <i :class="'icon_game icon_game'+demo.game_id"></i>
          <p class="myguess-list-times">{{demo.short_date[0]}}<span>{{demo.short_date[1]}}</span></p>
          <p class="myguess—list-status cl-green" >{{demo.status_name}}</p>
        </div>
        <div class="myguess-list-team-two" v-if="demo.option_type==1">
          <div class="myguess-list-team-same left fl">
            <div class="ImgOut">
              <span><img :src="demo.team[1].logo"/></span>
            </div>
            <div class="myguess-list-team-name clear">{{demo.team[1].short_name}}</div>
          </div>
          <div class="myguess-list-team-vs">VS</div>
          <div class="myguess-list-team-same right fr">
            <div class="ImgOut">
              <span><img :src="demo.team[2].logo"/></span>
            </div>
            <div class="myguess-list-team-name">{{demo.team[2].short_name}}</div>
          </div>
        </div>
        <div class="myguess-list-team-pubg" v-if="demo.option_type==2">
          <div v-for="(value,indexe) in demo.hot" :key="indexe" class="myguess-list-team-same-pubg fl">
            <div v-for="(item,index) in demo.team" v-if="index==value" :key="index">
              <div class="ImgOut">
                <span><img :src="item.logo"/></span>
              </div>
              <div class="myguess-list-team-name-pubg clear">{{item.short_name}}</div>
            </div>
          </div>
          <div class="myguess-list-team-pubg-name-bg"></div>
        </div>
        <div class="myguess-list-name">
          {{demo.match.name}}-{{demo.guess_type_name}}
        </div>
        <div class="myguess-list-btn" @click="gotoGuess(demo.id)">预测</div>
      </li>

    </ul>
  </div>
</div>

</template>
<script>
import router from "@/router";
export default {
  data() {
    return {};
  },
  methods: {
    gotoGuess(id) {
      this.$store.commit("mutationIsIndex", 1);
      this.$store.commit("mutationIsSendDispath", true);
      router.push(`/guess/${id}`);
    }
  },
  mounted() {
    this.$store.dispatch("actionsMygrandGuessData", {
      game: "all",
      status: "open",
      page: 1
    });
  },
  computed: {
    getMygrandGuessData() {
      console.log("我的记录", this.$store.state.match.mygrandGuessData);
      return this.$store.state.match.mygrandGuessData;
    }
  }
};
</script>

<style lang="scss" scoped>
.myguess-list {
  height: 260px;
  margin-bottom: 20px;
  ul {
    width: 1250px;
  }
  li {
    width: 275px;
    float: left;
    height: 260px;
    overflow: hidden;
    &.myguess_bg1 {
      background: #2a292e url("../../assets/img/home/quiz-bg-dota2.png")
        no-repeat top center;
      &:hover {
        background-image: url("../../assets/img/home/quiz-bg-dota2_hover.png");
      }
    }
    &.myguess_bg2 {
      background: #2a292e url("../../assets/img/home/quiz-bg-lol.png") no-repeat
        top center;

      &:hover {
        background-image: url("../../assets/img/home/quiz-bg-lol_hover.png");
      }
    }
    &.myguess_bg3 {
      background: #2a292e url("../../assets/img/home/quiz-bg-csgo.png")
        no-repeat top center;
      &:hover {
        background-image: url("../../assets/img/home/quiz-bg-csgo_hover.png");
      }
    }
    &.myguess_bg4 {
      background: #2a292e url("../../assets/img/home/quiz-bg-pubg.png")
        no-repeat top center;
      &:hover {
        background-image: url("../../assets/img/home/quiz-bg-pubg_hover.png");
      }
    }
    &.myguess_bg5 {
      background: #2a292e url("../../assets/img/home/quiz-bg-sport.png")
        no-repeat top center;
      &:hover {
        background-image: url("../../assets/img/home/quiz-bg-sport_hover.png");
      }
    }
    &.myguess_bg6 {
      background: #2a292e url("../../assets/img/home/quiz-bg-sport.png")
        no-repeat top center;
      &:hover {
        background-image: url("../../assets/img/home/quiz-bg-sport_hover.png");
      }
    }
    &.myguess_bg7 {
      background: #2a292e url("../../assets/img/home/quiz_bg_wzry.png")
        no-repeat top center;
      &:hover {
        background-image: url("../../assets/img/home/quiz_bg_wzry_hover.png");
      }
    }
    &::after {
      content: "";
      display: block;
      margin: 0;
      padding: 0;
      clear: both;
    }
    background-color: #2a292e;
    margin-right: 32px;
    .myguess-list-up {
      height: 60px;
      i {
        width: 32px;
        height: 20px;
        background: url("../../assets/images/competeImg/guess.png") no-repeat;
        display: block;
        margin: 14px auto 0;
        &.icon_game1 {
          background-position: -32px -135px;
        }
        &.icon_game2 {
          background-position: 0 -135px;
        }
        &.icon_game3 {
          background-position: -96px -135px;
        }
        &.icon_game4 {
          background-position: -64px -135px;
        }
        &.icon_game5 {
          background-position: -128px -135px;
        }
        &.icon_game6 {
          background-position: -128px -135px;
        }
        &.icon_game7 {
          // background-position: -128px -135px;
          display: inline-block;
          width: 32px;
          height: 22px;
          background: url("../../assets/images/matchcenter/wzry_icon_lh.png")
            no-repeat;
        }
      }
      .myguess-list-times {
        line-height: 30px;
        text-align: left;
        width: 110px;
        margin: 0 auto;
        font-size: 14px;
        color: #dcdcdc;
        span {
          float: right;
          font-weight: bold;
        }
      }
      .myguess—list-status {
        text-align: center;
        font-size: 16px;
      }
    }
    .myguess-list-team-two {
      &::after {
        content: "";
        display: block;
        margin: 0;
        padding: 0;
        clear: both;
      }
      position: relative;
      top: 0;
      left: 0;
      .myguess-list-team-same {
        width: 120px;
        height: 120px;
        &.left {
          // .ImgOut{float:right;margin-right:10px;}
          .myguess-list-team-name {
            background: url("../../assets/img/home/team_a.png") no-repeat right
              center;
            &:hover {
              background: url("../../assets/img/home/team_a_hover.png")
                no-repeat right center;
            }
          }
        }
        &.right {
          // .ImgOut{float:right;margin-right:10px;}
          .myguess-list-team-name {
            background: url("../../assets/img/home/team_b.png") no-repeat left
              center;
            &:hover {
              background: url("../../assets/img/home/team_b_hover.png")
                no-repeat left center;
            }
          }
        }
        .ImgOut {
          width: 70px;
          height: 70px;
          margin: 0 auto;
          span {
            width: 70px;
            height: 70px;
          }
        }
        .myguess-list-team-name {
          width: 130px;
          height: 38px;
          line-height: 38px;
          text-align: center;
          color: #dcdcdc;
          font-size: 16px;
          font-weight: bold;
          margin-top: 5px;
          -webkit-transition: all 0.5s;
          transition: all 0.5s;
        }
      }
      .myguess-list-team-vs {
        position: absolute;
        bottom: 35px;
        width: 50px;
        left: 50%;
        margin-left: -22px;
        text-align: center;
        font-size: 16px;
        font-weight: bold;
      }
    }
    .myguess-list-name {
      // line-height: 20px;
      line-height: 13px;
      font-size: 14px;
      text-align: center;
    }
    .myguess-list-btn {
      width: 108px;
      height: 40px;
      text-align: center;
      background: url("../../assets/img/home/partin_btn.png");
      line-height: 46px;
      margin: 0 auto;
      text-shadow: 1px 0px 10px #4e2711;
      font-size: 14px;
      margin-top: 1px;
      &:hover {
        background-image: url("../../assets/img/home/partin_btn_hover.png");
      }
    }
    .myguess-list-team-pubg {
      position: relative;
      top: 0;
      left: 0;
      height: 120px;
      .myguess-list-team-same-pubg {
        width: 91px;
        .ImgOut {
          width: 70px;
          height: 70px;
          margin: 0 auto;
          span {
            width: 70px;
            height: 70px;
          }
        }
      }
      .myguess-list-team-pubg-name-bg {
        width: 275px;
        height: 38px;
        line-height: 38px;
        position: absolute;
        top: 75px;
        left: 0;
        z-index: 1;
        background: url("../../assets/img/home/game_name_bg.png") no-repeat
          right;
        -webkit-transition: all 0.5s;
        transition: all 0.5s;
      }
      .myguess-list-team-name-pubg {
        position: relative;
        top: 0;
        left: 0;
        z-index: 2;
        line-height: 38px;
      }
    }
    &:hover {
      .myguess-list-team-pubg-name-bg {
        background: url("../../assets/img/home/game_name_bg_hover.png")
          no-repeat right;
      }
    }
  }
}
</style>

