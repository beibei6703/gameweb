<template>
  <div id='newshotcompete' v-if="newshotcompete[0]">
    <!-- 标题 -->
    <div class="title">
      <div class="titlebg"></div>
    </div>
    <!-- 内容 -->
    <div class="content">
      <p class="btitle">- {{newshotcompete[0].match.name}} -</p>
      <div class="pic" :style="{background:'#15161a url('+newshotcompete[0].match.logo+') center center / cover no-repeat'}"></div>
      <div class="guessmain-ex-text-fixed" v-if="newshotcompete[0].odds_type==2" title="玩家预测时的赔率为最后收益所得赔率，例如固赔1.5，预测100C则最后获得收益150C+本金100C，合计250C。" >固盘<i></i></div>
      <div class="detail" v-if="newshotcompete[0].option_type == 1">

        <div class="top">
          <img :src="newshotcompete[0].team[1].logo" alt="" class="teamlog alog logoss">
          <!-- div.center要inline-block -->
          <div class="center">
            <div class="vs"></div>
            <p>{{newshotcompete[0].status_name}}</p>
          </div>
          <img :src="newshotcompete[0].team[2].logo" alt="" class="teamlog blog logoss">
        </div>
        <div class="bottom">
          <div class="ateam">
            <p class="teamname">{{newshotcompete[0].team[1].name}}</p>
            <p class="odds">{{nFormatter(newshotcompete[0].team[1].odds)}}</p>
          </div>
          <div class="competebtn" @click="handleclick(newshotcompete[0].id)">参与</div>
          <div class="bteam">
            <p class="teamname">{{newshotcompete[0].team[2].name}}</p>
            <p class="odds">{{nFormatter(newshotcompete[0].team[2].odds)}}</p>
          </div>
        </div>
      </div>
      <div class="detail" v-if="newshotcompete[0].option_type == 2">

        <div class="time">{{newshotcompete[0].status_name}}</div>
        <div class="teamodds">
          <div class="logoodds" v-for="(item,index) in arr" :key="index">
            <div class="logos">
              <img :src="item.logo" alt="" class="logoss">
            </div>
            <div class="odds">{{nFormatter(item.odds)}}</div>
          </div>
        </div>
        <div class="competebtn takein"  @click="handleclick(newshotcompete[0].id)">参与</div>
      </div>
    </div>
  </div>
</template>
<script>
import router from "@/router"
export default {
  data() {
    return {
      arr: []
    };
  },
   methods:{

  },
  mounted() {
    if (!this.$store.state.news.newshotcompete) {
      this.$store.dispatch("newshotcompetedispatch");
    }
  },

  computed: {
    newshotcompete: function() {
      if (!this.$store.state.news.newshotcompete) {
        return [
          {
            id: 199,
            battle_id: 123,
            game_id: 2,
            round: "BO3",
            winner: 0,
            guess_type: 1,
            guess_type_name: "猜输赢",
            handicap_team: 0,
            handicap: "0",
            date: "2018-02-01 17:00:00",
            short_date: "02-01 17:00",
            status: "wait",
            status_name: "32分钟后",
            score: "0",
            score_1: 0,
            score_2: 0,
            match: {
              name: "LCK 2018 春季赛",
              logo:
                "https://imgcdn.api.com//news/1246b948-de0a-475a-8cf1-a2952c41782b.png"
            },
            team: {
              left: {
                id: 6,
                short_name: "KT",
                name: "KT Rolster",
                logo:
                  "https://cdn.esportsmatrix.com/lol/Content/images/uploaded/team/9caed715-5ad3-4d19-a8b5-a204fb6834ae.png"
              },
              right: {
                id: 14,
                short_name: "JAG",
                name: "Jin Air Green Wings",
                logo:
                  "https://cdn.esportsmatrix.com/lol/Content/images/uploaded/team/8b74263f-658d-441b-b1a2-778876ff86c6.png"
              }
            },
            odds: {
              left: 1,
              right: 1
            },
            support: {
              left: 0.5,
              right: 0.5
            }
          }
        ];
      } else {
        // console.log(this.$store.state.news.newshotcompete,7777);
        let newshotarr = this.$store.state.news.newshotcompete;
        this.arr.push(newshotarr[0].team[newshotarr[0].hot[0]]);
        this.arr.push(newshotarr[0].team[newshotarr[0].hot[1]]);
        this.arr.push(newshotarr[0].team[newshotarr[0].hot[2]]);
        console.log(this.arr, "this.arr");
        return this.$store.state.news.newshotcompete;
      }
    }
  },
  methods: {
    nFormatter(num) {
      if (num >= 1000000000) {
        return (num / 1000000000).toFixed(1).replace(/.0$/, "") + "G";
      }
      if (num >= 1000000) {
        return (num / 1000000).toFixed(1).replace(/.0$/, "") + "M";
      }
      if (num >= 1000) {
        return (num / 1000).toFixed(1).replace(/.0$/, "") + "K";
      }
      return num;
    },
    handleclick(id){
      console.log('我点击了吗')
      this.$store.commit('mutationIsIndex',1)
      this.$store.commit('mutationIsSendDispath',true)
      router.push(`/guess/${id}`);
      this.$store.commit('mutationStateGuessId',id)
    },
  }
};
</script>

<style scoped lang='scss'>
.guessmain-ex-text-fixed {
    position: absolute;
    top: 212px;
    height: 20px;
    line-height: 20px;
    /* background: #dab63c; */
    padding: 0 5px;
    background: -webkit-linear-gradient(#dab63b 40%, #cea839);
    left: 0;
    color: #371726;
    border-radius: 0 0 5px 0;
    font-size: 12px;
}

.guessmain-ex-text-fixed i {
    display: inline-block;
    width: 15px;
    height: 20px;
    background: url('../../assets/images/competeImg/guess_fixed.png') no-repeat center;
    vertical-align: -5px;
}
#newshotcompete {
  width: 380px;
  margin-top: 24px;
  .title {
    width: 380px;
    height: 46px;
    padding-top: 12px;
    color: #989898;
    background-color: #1b1c1f;
    .titlebg {
      width: 98px;
      height: 25px;
      margin-left: 8px;
      background: url("../../assets/images/mygrand/quiz.png") center no-repeat;
    }
  }
  .content {
    width: 380px;
    height: 372px;position:relative;top:0;left:0;
    .btitle {
      height: 50px;
      width: 100%;
      font-size: 16px;
      line-height: 50px;
      text-align: center;
      background-color: #292b2f;
      color: #e1c076;
    }
    .pic {
      height: 162px;
      width: 100%;
      background-size: contain !important;
    }
    .detail {
      height: 162px;
      width: 100%;
      text-align: left;
      background-color: #15161a;
      .top {
        height: 78px;
        width: 100%;
        padding-left: 54px;
        .teamlog {
          width: 58px;
          height: 58px;
          float: left;
          border-radius: 50%;
        }
        .center {
          float: left;
          height: 70px;
          width: 148px;
          margin-top: 18px;
          text-align: center;
          p {
            color: #ffd35e;
            font-size: 16px;
            margin-top: 8px;
          }
          .vs {
            width: 33px;
            height: 23px;
            margin-left: 60px;
            margin-top: -10px;
            background: url("../../assets/images/News-images/sprite.png") 0 -348px
              no-repeat;
          }
        }
      }
      .bottom {
        width: 100%;
        height: 74px;
        font-size: 16px;
        position: relative;
        .ateam {
          width: 155px;
          height: 74px;
          float: left;
          text-align: center;
        }
        .bteam {
          height: 7px;
          width: 155px;
          float: right;
          text-align: center;
        }
        .maohao {
          position: absolute;
          top: 40px;
          left: 185px;
        }
        .teamname {
          color: #d9a35a;
          height: 20px;
          margin-top: 5px;
          line-height: 20px;
          margin-left: 20px;
          margin-right: 20px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .odds {
          color: #fff;
          margin-top: 12px;
        }
      }
      .time {
        color: #ffd35e;
        font-size: 14px;
        text-align: center;
        line-height: 34px;
      }
      .teamodds {
        height: 86px;
        margin-left: 55px;
        .logoodds {
          float: left;
          margin-right: 50px;
          width: 58px;
          height: 86px;
          &:last-child {
            margin-right: 0px;
          }
          .logos {
            width: 58px;
            height: 58px;
            img {
              width: 58px;
              height: 58px;
            }
          }
          .odds {
            width: 58px;
            line-height: 24px;
            font-size: 14px;
            text-align: center;
          }
        }
      }
      .competebtn {
        width: 70px;
        height: 32px;
        border-radius: 3px;
        float: left;
        font-size: 16px;
        color: #845107;
        text-align: center;
        line-height: 32px;
        cursor: pointer;
        background: url("../../assets/images/competeImg/guess_b2.png") repeat;
        &:hover {
          background: url("../../assets/images/mygrand/c_h_1_32.png") repeat;
          transition: all 0.6s;
        }
      }
      .takein {
        margin-left: 156px;
      }
    }
  }
}
.logoss{
  border-radius: 50% !important;
}
</style>
