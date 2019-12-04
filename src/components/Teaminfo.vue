<template>
  <div id='teaminfo'>
    <div class="container">
      <!-- table -->
      <!-- <div id='table'>
        <ul class="table">
          <router-link @click.native="titletab(2,require('@/assets/images/News-images/news-lolbg.png'))" :class="{active:currentLi==2}" :to="{path:'/news',query:{currentLi:2}}" tag='li'></router-link>
          <router-link @click.native="titletab(1,require('@/assets/images/News-images/news-dota2bg.png'))" :class="{active:currentLi==1}" :to="{path:'/news',query:{currentLi:1}}" tag='li'></router-link>
          <router-link @click.native="titletab(4,require('@/assets/images/News-images/news-pubgbg.png'))" :class="{active:currentLi==4}" :to="{path:'/news',query:{currentLi:4}}" tag='li'></router-link>
          <router-link @click.native="titletab(3,require('@/assets/images/News-images/news-csgobg.png'))" :class="{active:currentLi==3}" :to="{path:'/news',query:{currentLi:3}}" tag='li'></router-link>
        </ul>
      </div> -->
      <!-- 内容 -->
      <div class="content">
        <!-- 标题 -->
        <div class="title" v-if="teaminfo">
          <div class="word">
            <span>您的位置 :
              <router-link :to="{path:'/news',query:{currentLi:2}}" @click.native="titletab(2,require('@/assets/images/News-images/news-lolbg.jpg'))" tag='u'>资讯首页</router-link> 》
              <router-link v-if="teaminfo.game_id==1" :to="{path:'/news',query:{currentLi:1}}" @click.native="titletab(1,require('@/assets/images/News-images/news-dota2bg.jpg'))" tag='u'>Dota2</router-link>
              <router-link v-else-if="teaminfo.game_id==2" :to="{path:'/news',query:{currentLi:2}}" @click.native="titletab(2,require('@/assets/images/News-images/news-lolbg.jpg'))" tag='u'>英雄联盟</router-link>
              》
              <span class="yellow">{{team_name}}</span>
            </span>
          </div>
          <!-- <div class="input">
            <input type="text" placeholder="搜索其他战队"><input type="button">
          </div> -->
        </div>
        <!-- 战队信息 -->
        <div class="team" v-if="teaminfo">
          <div class="info fl">
            <div class="teamlogo fl" :style="{backgroundImage:'url('+teaminfo.team_logo+')'}">
              <p>{{team_name}}</p>
            </div>
            <div class="teammsg fl">
              <p>地区 : <img :src="region_logo" alt=""></p>
              <p>{{teaminfo.summary}}</p>
            </div>
            <div class="teamrank fr">
              <p>实力评分 :
                <span>{{teaminfo.score}}</span>
              </p>
              <div class="bordercolor"></div>
              <div class="level">{{teaminfo.other.scoreLevel}}</div>
              <Scorelevel :level="teaminfo.other.scoreLevel"></Scorelevel>
              <div class="rank">
                <div class="golbal fl">{{teaminfo.global_rank}}</div>
                <div class="region fr">{{teaminfo.area_rank}}</div>
              </div>
            </div>
          </div>
          <div class="show fr">
            <p></p>
            <div class="record">
              <p>胜&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 率 : {{teaminfo.other.winRate}} 最近25局</p>
              <p>连胜纪录 : {{teaminfo.other.continuityWin}}连胜</p>
              <p>状态火热度 :</p>
              <p>
                <span class="blackbg">
                  <span class="colorbg" :style="{width:level*262+'px'}"></span>
                </span>
              </p>
            </div>
          </div>
        </div>
        <div class="teamdata">
          <ul class="datatitle">
            <li v-for="(item,index) in tabs" :class="{active:index==num}" @click="tab(index)" :key="index">
              {{item}}
            </li>
          </ul>
          <Pandect v-if="num==0"></Pandect>
          <Record v-if="num==1" :game_id="game_id"></Record>
          <Schedule v-if="num==2"></Schedule>
          <Teamnews v-if="num==3"></Teamnews>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Http from "../common/http";
import Table from "./news/Table";
import Pandect from "./news/Pandect";
import Record from "./news/Record";
import Schedule from "./news/Schedule";
import Teamnews from "./news/Teamnews";
import Scorelevel from "./news/Scorelevel";
export default {
  data() {
    return {
      currentLi: 2,
      game_id: 0,
      team_id: 541,
      team_name: "",
      region_logo: "",
      teaminfo: {
        id: 2,
        game_id: 1,
        game_code: "dota",
        team_id: 541,
        team_logo:
          "https://cdn.esportsmatrix.com/dota2/Content/images/uploaded/team/f8eb5ed8-2e45-48c2-8ed3-a6db2b55aa73.png",
        summary:
          "在2014年8月成立，建队的初期核心是Navi战队的两名大将Puppey和Kuroky。在2015年斩获包括TS3，2015ESL，MDL等等赛事的冠军，更在2016 Shanghai Major中获得了冠军荣誉。但是在夺冠后大换血的Secret状态一路下滑，至今还挣扎在动荡后的后遗症中。\r\n",
        score: "1915",
        global_rank: "全球排行：1",
        area_rank: "地区排行：1",
        match_data: [
          {
            name: "平均20分钟塔数差",
            value: "0.08"
          },
          {
            name: "平均肉山数",
            value: "1.08"
          },
          {
            name: "20分钟经济差",
            value: "1208"
          },
          {
            name: "首十杀百分比",
            value: "44%"
          },
          {
            name: "首近战兵营百分比",
            value: "56%"
          }
        ],
        team_player: [
          {
            playerId: "5103",
            playerName: "Ace",
            playerLogo:
              "https://cdn.esportsmatrix.com/dota2/Content/images/uploaded/player/3356fe51-62a6-4478-8c82-f77b73c9c2e5.png",
            pos: "1号位 "
          },
          {
            playerId: "5139",
            playerName: "MidOne",
            playerLogo:
              "https://cdn.esportsmatrix.com/dota2/Content/images/uploaded/player/b05e3e92-9763-4ef0-93e3-ea89ee0d3ec9.png",
            pos: "2号位 "
          },
          {
            playerId: "5140",
            playerName: "FATA",
            playerLogo:
              "https://cdn.esportsmatrix.com/dota2/Content/images/uploaded/player/2a2a71b9-2a66-41b2-a76d-4df4b66a9a13.png",
            pos: "3号位 "
          },
          {
            playerId: "5272",
            playerName: "YapzOr",
            playerLogo:
              "https://cdn.esportsmatrix.com/dota2/Content/images/uploaded/player/927f8aee-4290-4802-980e-d09aa2c48bf0.png",
            pos: "4号位 "
          },
          {
            playerId: "5243",
            playerName: "Puppey",
            playerLogo:
              "https://cdn.esportsmatrix.com/dota2/Content/images/uploaded/player/374b0af8-42f3-4c44-a929-0a3a0b160203.png",
            pos: "5号位 "
          }
        ],
        best_group: "",
        player_data: [
          {
            playerId: "5103",
            pos: "1号位",
            kda: "5.0",
            can_tuan: "62%",
            carry: "20%",
            troll: "12%",
            global_rank: "80",
            area_rank: "18",
            score: "1557",
            val: "11.9M",
            playerName: "Ace",
            playerLogo:
              "https://cdn.esportsmatrix.com/dota2/Content/images/uploaded/player/3356fe51-62a6-4478-8c82-f77b73c9c2e5.png",
            strength: 1557
          },
          {
            playerId: "5139",
            pos: "2号位",
            kda: "5.1",
            can_tuan: "69%",
            carry: "36%",
            troll: "8%",
            global_rank: "12",
            area_rank: "6",
            score: "1810",
            val: "12.9M",
            playerName: "MidOne",
            playerLogo:
              "https://cdn.esportsmatrix.com/dota2/Content/images/uploaded/player/b05e3e92-9763-4ef0-93e3-ea89ee0d3ec9.png",
            strength: 1810
          },
          {
            playerId: "5140",
            pos: "3号位",
            kda: "3.7",
            can_tuan: "56%",
            carry: "24%",
            troll: "20%",
            global_rank: "22",
            area_rank: "9",
            score: "1711",
            val: "13.6M",
            playerName: "FATA",
            playerLogo:
              "https://cdn.esportsmatrix.com/dota2/Content/images/uploaded/player/2a2a71b9-2a66-41b2-a76d-4df4b66a9a13.png",
            strength: 1711
          },
          {
            playerId: "5272",
            pos: "4号位",
            kda: "4.9",
            can_tuan: "78%",
            carry: "36%",
            troll: "0%",
            global_rank: "6",
            area_rank: "4",
            score: "1884",
            val: "15.3M",
            playerName: "YapzOr",
            playerLogo:
              "https://cdn.esportsmatrix.com/dota2/Content/images/uploaded/player/927f8aee-4290-4802-980e-d09aa2c48bf0.png",
            strength: 1884
          },
          {
            playerId: "5243",
            pos: "5号位",
            kda: "3.0",
            can_tuan: "64%",
            carry: "24%",
            troll: "8%",
            global_rank: "31",
            area_rank: "13",
            score: "1677",
            val: "13.7M",
            playerName: "Puppey",
            playerLogo:
              "https://cdn.esportsmatrix.com/dota2/Content/images/uploaded/player/374b0af8-42f3-4c44-a929-0a3a0b160203.png",
            strength: 1677
          }
        ],
        compare_data: {
          red: {
            winRate: "48%",
            fbRate: "56%",
            ftRate: "56%",
            f10KRate: "48%",
            frRate: "45%",
            firstMeleeRate: "48%",
            TowerDiffat20Rate: "-0.32",
            NetWorthDiffat20Rate: "-0.47",
            AverageRouShanRate: "0.80"
          },
          blue: {
            winRate: "76%",
            fbRate: "44%",
            ftRate: "60%",
            f10KRate: "60%",
            frRate: "67%",
            firstMeleeRate: "68%",
            TowerDiffat20Rate: "0.72",
            NetWorthDiffat20Rate: "2.02",
            AverageRouShanRate: "0.84"
          }
        },
        strength_map: [
          {
            pos: "1号位",
            value: "1557"
          },
          {
            pos: "2号位",
            value: "1810"
          },
          {
            pos: "3号位",
            value: "1711"
          },
          {
            pos: "4号位",
            value: "1884"
          },
          {
            pos: "5号位",
            value: "1677"
          }
        ],
        other: {
          winRate: "68 %",
          continuityWin: "5",
          scoreLevel: "S"
        },
        updated_at: "2017-12-28 18:14:00"
      },
      level: "0.5",
      tabs: ["战队总览", "战绩", "赛程", "战队新闻"],
      num: 0
    };
  },
  components: {
    Table,
    Pandect,
    Record,
    Schedule,
    Teamnews,
    Scorelevel
  },
  methods: {
    // ========================================table=================================

    titletab(num, str) {
      this.$store.dispatch("newshotnewslistdispatch", num);
      this.$store.dispatch("newsteamrankdispatch", num);
      this.$store.dispatch("newsnumber10dispatch", num);
      this.$store.dispatch("setid", num);
      this.$store.dispatch("background", str);
    },

    // ========================================table=================================
    tab(index) {
      this.num = index;
    },
    getdata: function() {
      console.log(111111, "我也出发了");
      this.team_name = this.$route.query.team_name;
      this.team_id = this.$route.query.team_id;
      this.currentLi = this.$route.query.game_id;
      this.region_logo = this.$route.query.region_logo;
      this.$store.dispatch("team_id", this.team_id);
      Http.get("/team/detail?team_id=" + this.team_id)
        .then(response => {
          this.teaminfo = response.data.data;
          this.game_id = response.data.data.game_id;
          if (response.data.data.other.scoreLevel == "S") {
            this.level = 5 / 6;
          } else if (response.data.data.other.scoreLevel == "A") {
            this.level = 4 / 6;
          } else if (response.data.data.other.scoreLevel == "B") {
            this.level = 3 / 6;
          } else if (response.data.data.other.scoreLevel == "C") {
            this.level = 2 / 6;
          } else if (response.data.data.other.scoreLevel == "D") {
            this.level = 1 / 6;
          } else if (response.data.data.other.scoreLevel == "E") {
            this.level = 0;
          }
        })
        .catch(Http.onError);
    }
  },
  created() {
    this.getdata();
  },
  watch: {
    $route() {
      if (this.$route.path == "/teaminfo") {
        this.getdata();
      }
    }
  }
};
</script>

<style scoped lang='scss'>
#teaminfo {
  width: 100%;
  .fl {
    float: left;
  }
  .fr {
    float: right;
  }
  .container {
    width: 1200px;
    height: 100%;
    margin: 0 auto;
    #table {
      .table {
        width: 1200px;
        height: 83px;
        li {
          float: left;
          height: 100%;
          width: 300px;
          &:nth-child(1) {
            background: url("../assets/images/News-images/loltab.png");
            &:hover,
            &.active {
              background: url("../assets/images/News-images/loltab-hover.png");
              transition: all 1s;
            }
          }
          &:nth-child(2) {
            background: url("../assets/images/News-images/dotatab.png");
            &:hover,
            &.active {
              background: url("../assets/images/News-images/dotatab-hover.png");
              transition: all 1s;
            }
          }
          &:nth-child(3) {
            background: url("../assets/images/News-images/chijitab.png");
            &:hover,
            &.active {
              background: url("../assets/images/News-images/chijitab-hover.png");
              transition: all 1s;
            }
          }
          &:nth-child(4) {
            background: url("../assets/images/News-images/csgotab.png");
            &:hover,
            &.active {
              background: url("../assets/images/News-images/csgotab-hover.png");
              transition: all 1s;
            }
          }
        }
      }
    }
    .content {
      height: 100%;
      width: 100%;
      .title {
        width: 100%;
        height: 70px;
        text-align: left;
        line-height: 70px;
        padding-left: 30px;
        color: #dcdcdc;
        background: #1e1f22;
        .word {
          float: left;
          width: 786px;
          height: 100%;
          u {
            cursor: pointer;
          }
          .yellow {
            color: #e1bf75;
          }
        }
        .input {
          float: right;
          width: 239px;
          height: 41px;
          margin-top: 16px;
          margin-right: 25px;
          border: 1px solid #515151;
        }
        input[type="text"] {
          float: left;
          width: 190px;
          height: 37px;
          padding-left: 10px;
          outline: none;
          background-color: #212428;
          border: none;
        }
        input[type="button"] {
          float: right;
          display: block;
          width: 37px;
          height: 39px;
          border: none;
          outline: none;
          cursor: pointer;
          background: #3c3f4a url("../assets/images/News-images/searchbtn.png")
            center center no-repeat;
        }
      }
      .team {
        width: 100%;
        height: 261px;
        margin-bottom: 17px;
        background-color: #15161a;
        padding: 23px 30px;
        .info {
          width: 770px;
          height: 215px;
          background: url("../assets/images/News-images/teaminfobg.png");
          .teamlogo {
            width: 182px;
            height: 100%;
            background-size: 118px 118px;
            background-position: center 37px;
            background-repeat: no-repeat;
            p {
              text-align: center;
              font-size: 16px;
              color: #dcdcdc;
              margin-top: 172px;
            }
          }
          .teammsg {
            width: 300px;
            height: 100%;
            padding-top: 23px;
            text-align: left;
            p {
              &:first-child {
                height: 20px;
                width: 100%;
                line-height: 20px;
                color: #fbf9f9;
                font-size: 15px;
                display: table-cell;
                vertical-align: middle;
                img {
                  width: 27px;
                  height: 20px;
                  vertical-align: middle;
                }
              }
              &:nth-child(2) {
                margin-top: 13px;
                color: #989898;
                font-size: 12px;
                line-height: 18px;
              }
            }
          }
          .teamrank {
            width: 236px;
            height: 100%;
            padding-top: 23px;
            margin-right: 24px;
            position: relative;
            p {
              width: 100%;
              height: 16px;
              font-size: 16px;
              color: #fbf9f9;
              span {
                color: #ffd35e;
              }
            }
            .level {
              position: absolute;
              top: 71px;
              left: 118px;
              font-size: 36px;
              color: #d9a35a;
            }
            .score {
              width: 100px;
              height: 100px;
              border-radius: 50%;
              color: #d9a35a;
              font-size: 64px;
              line-height: 80px;
              text-align: center;
              margin-top: 10px;
              margin-bottom: 10px;
              margin-left: 76px;
              border: 10px solid #3d342a;
            }
            .rank {
              width: 100%;
              height: 31px;
              color: #dcdcdc;
              font-size: 16px;
              line-height: 29px;
              .golbal {
                width: 110px;
                height: 100%;
                border: 1px solid #3b80e8;
              }
              .region {
                width: 110px;
                height: 100%;
                border: 1px solid #be2e3e;
              }
            }
          }
        }
        .show {
          width: 349px;
          height: 215px;
          padding-left: 32px;
          background: url("../assets/images/News-images/teamshowbg.png");
          text-align: left;
          & > p {
            height: 18px;
            width: 284px;
            margin-top: 22px;
            margin-bottom: 30px;
            border-bottom: 1px solid #262626;
            background: url("../assets/images/News-images/sprite.png") 0 -405px no-repeat;
          }
          .record {
            width: 284px;
            height: 142px;
            p {
              height: 16px;
              line-height: 16px;
              &:first-child {
                margin-bottom: 16px;
              }
              &:nth-child(2) {
                margin-bottom: 26px;
              }
              &:nth-child(3) {
                margin-bottom: 10px;
              }
              &:nth-child(4) {
                width: 277px;
                height: 22px;
                border: 1px solid #424344;
                .blackbg {
                  display: block;
                  width: 262px;
                  height: 7px;
                  margin: 0 auto;
                  margin-top: 6px;
                  background-color: #101114;
                  border-radius: 131px;
                  .colorbg {
                    display: block;
                    height: 7px;
                    border-radius: 131px;
                    background-image: linear-gradient(
                      to right,
                      #3b80e8 131px,
                      #c02d3b 262px
                    );
                  }
                }
              }
            }
          }
        }
      }
      .teamdata {
        height: 100%;
        width: 100%;
        .datatitle {
          width: 100%;
          height: 53px;
          border-bottom: 1px solid #313131;
          background-color: #15161a;
          .active {
            color: #e1bf75;
            background-color: #1b1c1f;
            border-top: 1px solid #313131;
            border-right: 1px solid #313131;
            border-bottom: 1px solid #1b1c1f;
            border-left: 1px solid #313131;
          }
          li {
            width: 133px;
            height: 53px;
            text-align: center;
            line-height: 53px;
            font-size: 18px;
            color: #989898;
            float: left;
            &:nth-child(1) {
              border-left: none;
            }
          }
        }
      }
    }
  }
}
</style>
