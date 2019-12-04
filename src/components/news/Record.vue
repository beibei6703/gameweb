<template>
  <div id="record">
    <!-- 标题 -->
    <div class="title">
      <div class="titlebg"></div>
    </div>
    <!-- 战绩 -->
    <div class="recordInfo">
      <p class="recordTitle">
        <ul>
          <li>日期</li>
          <li>局数</li>
          <li>对手</li>
          <li>胜</li>
          <li>一血</li>
          <li>一塔</li>
          <li v-if="this.recordInfo.items[0].game_code == 'lol'">一龙</li>
          <li v-else>首肉山</li>
          <li v-if="this.recordInfo.items[0].game_code == 'lol'">20分钟塔数差</li>
          <li v-else>首十杀</li>
          <li v-if="this.recordInfo.items[0].game_code == 'lol'">20分钟龙数差</li>
          <li v-else>20分钟塔数差</li>
          <li v-if="this.recordInfo.items[0].game_code == 'lol'">25分钟经济差</li>
          <li v-else>20分钟经济差</li>
          <!-- <li>比赛详情</li> -->
        </ul>
      </p>
      <div class="recordDetail" v-if="recordInfo">
        <ul>
          <li v-for="(data,index) in recordInfo.items" :key="index">
            <div>{{data.StartTime.substr(0,10)}}</div>
            <div>{{data.GameOrder}}</div>
            <div>
              <p class="vslogo" :style="{backgroundImage:'url('+data.OpponentTeamLogo+')'}"></p>
              {{data.OpponentTeamName}}
            </div>
            <div>
              <img v-show="data.WinLoss==1" src="../../assets/images/News-images/yes.png" alt="">
              <img v-show="data.WinLoss==0" src="../../assets/images/News-images/no.png" alt="">
            </div>
            <div>
              <img v-show="data.Fb==1" src="../../assets/images/News-images/yes.png" alt="">
              <img v-show="data.Fb==0" src="../../assets/images/News-images/no.png" alt="">
            </div>
            <div>
              <img v-show="data.Ft==1" src="../../assets/images/News-images/yes.png" alt="">
              <img v-show="data.Ft==0" src="../../assets/images/News-images/no.png" alt="">
            </div>
            <div v-if="data.game_code == 'lol'">
              <img v-show="data.Fd==1" src="../../assets/images/News-images/yes.png" alt="">
              <img v-show="data.Fd==0" src="../../assets/images/News-images/no.png" alt="">
            </div>
            <div v-else>
              <img v-show="data.Fr==1" src="../../assets/images/News-images/yes.png" alt="">
              <img v-show="data.Fr==0" src="../../assets/images/News-images/no.png" alt="">
            </div>
            <div v-if="data.game_code == 'lol'" :style="{'padding-left': '42px'}">{{data.TowerDiffat20}}</div>
            <div v-else :style="{'padding-left':'16px'}">
              <img v-show="data.F10K==1" src="../../assets/images/News-images/yes.png" alt="">
              <img v-show="data.F10K==0" src="../../assets/images/News-images/no.png" alt="">
            </div>
            <div v-if="data.game_code == 'lol'">{{data.Dragonsat20}}</div>
            <div v-else>{{data.TowerDiffat20}}</div>
            <div v-if="data.game_code == 'lol'">{{data.GoldDiffat25}}K</div>
            <div v-else>{{data.NetWorthDiff20}}K</div>
            <!-- <div>观看详情></div> -->
          </li>
        </ul>
      </div>
    </div>
    <p class="tips">✲ 显示最近40局的战绩</p>
    <!-- 分页 -->
    <div id="page" v-if="recordInfo.total>1">
      <div class="pagination" :style="{width:84+42*pagearr.length+'px'}">
        <div @click="turnUp" class="turnUp"><img src="../../assets/images/News-images/pageleft.png" alt=""></div>
        <div class="listdiv" v-for="(item,index) in pagearr" :key="index" @click="goto(item)" :class="{'active':page == item}">
          <a>{{item}}</a>
        </div>
        <div @click="turnDown" class="turnDown"><img src="../../assets/images/News-images/pageright.png" alt=""></div>
      </div>
    </div>
    <div class="nothing" v-if="!recordInfo.total">这里还没有数据哟</div>
  </div>
</template>

<script>
import Http from "../../common/http";
export default {
  data() {
    return {
      teamId: "",
      recordInfo: {
        total: 40,
        items: [
          {
            id: 4465,
            game_code: "lol",
            MatchId: 4465,
            Fb: "1",
            Fd: "0",
            Ft: "0",
            Fh: "0",
            Fr: "",
            FirstBaron: null,
            FBarr: "",
            F10K: "",
            NetWorthDiff20: "",
            GameOrder: "2",
            WinLoss: "0",
            TowerDiffat20: "-1",
            GoldDiffat25: "-0.9",
            Dragonsat20: "0",
            StartTime: "2017-08-12 00:00:00",
            OpponentTeamId: 47,
            OpponentTeamName: "Oh My God",
            OpponentTeamLogo:
              "https://cdn.esportsmatrix.com/lol/Content/images/uploaded/team/22ae0635-c9e8-4cb5-8a2b-7f82d5c0d99f.png",
            TeamId: 52,
            created_at: "0000-00-00 00:00:00",
            updated_at: "0000-00-00 00:00:00"
          }
        ]
      },
      // 分页
      page: 1,
      allpage: 0,
      pagearr: []
    };
  },
  methods: {
    turnUp() {
      if (this.page > 1) {
        this.page--;
        if (this.allpage > 5) {
          this.pagearr = [];
          let left, right;
          if (this.allpage >= 5) {
            if (this.page > 3 && this.page < this.allpage - 2) {
              left = this.page - 2;
              right = this.page + 2;
            } else {
              if (this.page <= 3) {
                left = 1;
                right = 5;
              } else {
                right = this.allpage;
                left = this.allpage - 4;
              }
            }
          }
          while (left <= right) {
            this.pagearr.push(left);
            left++;
          }
        }
        this.teamId = this.$store.state.news.team_id;
        Http.get(`/team/match?team_id=${this.teamId}&page=${this.page}&size=10`)
          .then(response => {
            this.recordInfo = response.data.data;
          })
          .catch(Http.onError);
      }
    },
    turnDown() {
      if (this.page < this.allpage) {
        this.page++;
        if (this.allpage > 5) {
          let left, right;
          this.pagearr = [];
          if (this.allpage >= 5) {
            if (this.page > 3 && this.page < this.allpage - 2) {
              left = this.page - 2;
              right = this.page + 2;
            } else {
              if (this.page <= 3) {
                left = 1;
                right = 5;
              } else {
                right = this.allpage;
                left = this.allpage - 4;
              }
            }
          }
          while (left <= right) {
            this.pagearr.push(left);
            left++;
          }
        }
        this.teamId = this.$store.state.news.team_id;
        Http.get(`/team/match?team_id=${this.teamId}&page=${this.page}&size=10`)
          .then(response => {
            this.recordInfo = response.data.data;
          })
          .catch(Http.onError);
      }
    },
    goto(item) {
      this.page = item;
      // this.figure = this.page
      this.teamId = this.$store.state.news.team_id;
      Http.get(`/team/match?team_id=${this.teamId}&page=${this.page}&size=10`)
        .then(response => {
          this.recordInfo = response.data.data;
        })
        .catch(Http.onError);
    },
    getData: function() {
      this.teamId = this.$store.state.news.team_id;
      this.pagearr = []
      Http.get(`/team/match?team_id=${this.teamId}&page=${this.page}&size=10`)
        .then(response => {
          this.recordInfo = response.data.data;
          this.allpage = Math.ceil(this.recordInfo.total / 10);
          if (this.allpage < 5) {
            while (this.allpage > 0) {
              this.pagearr.unshift(this.allpage);
              this.allpage--;
            }
          } else {
            this.pagearr = [1, 2, 3, 4, 5];
          }
          this.allpage = Math.ceil(this.recordInfo.total / 10);
        })
        .catch(Http.onError);
    }
  },
  watch: {
    $route() {
      if (this.$route.path=='/teaminfo') {
        this.getData();
        this.page = 1
      }
    }
  },
  created() {
    this.getData();
  }
};
</script>

<style scoped lang='scss'>
#record {
  width: 100%;
  padding-top: 45px;
  padding-right: 30px;
  padding-left: 30px;
  background-color: #1b1c1f;
  height: 760px;
  .title {
    height: 38px;
    width: 100%;
    .titlebg {
      width: 98px;
      height: 25px;
      margin-left: 8px;
      margin-top: 7px;
      background: url("../../assets/images/News-images/sprite.png") 0 -451px no-repeat;
    }
  }
  .recordInfo {
    width: 100%;
    height: 542px;
    p {
      height: 42px;
      width: 100%;
      background: url("../../assets/images/News-images/playerinfo.png") repeat-x;
      ul {
        height: 42px;
        width: 100%;
        li {
          height: 42px;
          float: left;
          font-size: 15px;
          color: #fefefe;
          line-height: 42px;
          text-align: left;
          cursor: default;
          &:first-child {
            width: 136px;
            padding-left: 35px;
          }
          &:nth-child(2) {
            width: 76px;
          }
          &:nth-child(3) {
            width: 184px;
          }
          &:nth-child(4) {
            width: 84px;
          }
          &:nth-child(5) {
            width: 92px;
          }
          &:nth-child(6) {
            width: 91px;
          }
          &:nth-child(7) {
            width: 99px;
          }
          &:nth-child(8) {
            width: 128px;
          }
          &:nth-child(9) {
            width: 114px;
          }
          &:nth-child(10) {
            width: 134px;
          }
          // &:nth-child(11) {
          //   width: 126px;
          // }
        }
      }
    }
    .recordDetail {
      height: (100%-42)px;
      width: 100%;
      ul {
        width: 100%;
        height: 100%;
        li {
          height: 50px;
          cursor: default;
          background-color: #131418;
          &:nth-child(odd) {
            background-color: #191a1d;
          }
          &:hover {
            background-color: #292b2f;
          }
          div {
            height: 50px;
            float: left;
            font-size: 14px;
            color: #dcdcdc;
            line-height: 50px;
            text-align: left;
            &:first-child {
              width: 136px;
              padding-left: 10px;
              color: #989898;
            }
            &:nth-child(2) {
              width: 76px;
              padding-left: 10px;
            }
            &:nth-child(3) {
              width: 184px;
              position: relative;
              padding-left: 36px;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
              p {
                width: 32px;
                height: 32px;
                border-radius: 50%;
                position: absolute;
                top: 10px;
                left: 0;
                background-size: contain;
              }
            }
            &:nth-child(4) {
              width: 84px;
            }
            &:nth-child(5) {
              width: 92px;
              padding-left: 10px;
            }
            &:nth-child(6) {
              width: 91px;
              padding-left: 10px;
            }
            &:nth-child(7) {
              width: 99px;
              padding-left: 10px;
            }
            &:nth-child(8) {
              width: 128px;
            }
            &:nth-child(9) {
              width: 114px;
              padding-left: 42px;
            }
            &:nth-child(10) {
              width: 134px;
              padding-left: 30px;
            }
            // &:nth-child(11) {
            //   width: 82px;
            //   height: 24px;
            //   padding-left: 4px;
            //   text-align: center;
            //   line-height: 20px;
            //   color: #dcdcdc;
            //   font-size: 14px;
            //   border: 1.5px solid #515459;
            //   border-radius: 41px;
            //   margin-top: 13px;
            //   margin-left: -10px;
            //   &:hover {
            //     color: #d9a35a;
            //     border-color: #46392a;
            //   }
            // }
          }
        }
      }
    }
  }
  .tips {
    margin-top: 20px;
    color: #808080;
    font-size: 14px;
    height: 20px;
    width: 100%;
    line-height: 20px;
    text-align: left;
  }
  #page {
    height: 39px;
    position: relative;
    .pagination {
      position: absolute;
      height: 39px;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      .active {
        background: #ba9665;
        a {
          color: #fff;
        }
      }
      div {
        float: left;
        width: 37px;
        height: 39px;
        font-size: 20px;
        line-height: 39px;
        margin-right: 5px;
        cursor: pointer;
        text-align: center;
        border: 1px solid #535353;
        &:hover {
          border: 1px solid #ba9665;
          a {
            color: #ba9665;
          }
        }
        a {
          color: #535353;
        }
        img {
          width: 16px;
          height: auto;
        }
      }
    }
  }
  .nothing {
    font-size: 14px;
    color: #989898;
    top: 200px;
    left: 50%;
    transform: translateX(-50%);
    position: absolute;
  }
}
</style>
