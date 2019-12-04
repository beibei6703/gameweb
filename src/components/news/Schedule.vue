<template>
  <div id="schedule">
    <div class="tab">
      <ul class="datatitle">
        <li v-for="(item,index) in tabs" :class="{active:index==num}" @click="tab(index)" :key="index">
          {{item}}
        </li>
      </ul>
      <!-- 预测 -->
      <div class="forecast" v-if="num==1">暂无预测</div>
      <!-- 结果 -->
      <div class="result" v-if="num==0">
        <ul>
          <li v-for="(data,index) in resultData.items" :key="index">
            <div><img :src="data.league_logo" alt=""></div>
            <div class="vstime">
              <p>{{data.start_time.substr(0,10)}}</p>
              <p>{{data.start_time.substr(10,6)}}</p>
            </div>
            <div>
              <p>{{data.team_a_data.Name}}</p>
              <img v-if="data.team_a_data.RegionLogo" :src="data.team_a_data.RegionLogo" alt="">
            </div>
            <div>
              <img :src="data.team_a_data.Logo" alt="">
            </div>
            <div>
              <div class="score1">
                <div class="scoreleft" :style="{borderBottomColor:data.team_a_data.Score>data.team_b_data.Score?'#3fa450':(data.team_a_data.Score==data.team_b_data.Score?'#e1bf75':'#525252')}">{{data.team_a_data.Score}} :</div>
                <div class="scoreright" :style="{borderBottomColor:data.team_a_data.Score>data.team_b_data.Score?'#525252':(data.team_a_data.Score==data.team_b_data.Score?'#e1bf75':'#be2e3e')}">&nbsp;&nbsp;{{data.team_b_data.Score}}</div>
              </div>
              <!-- <div class="score">
                <div class="avsb">{{data.team_a_data.Score}} : {{data.team_b_data.Score}}</div>
                <div class="border">
                  <div :style="{backgroundColor:data.team_a_data.Score>data.team_b_data.Score?'#3fa450':(data.team_a_data.Score==data.team_b_data.Score?'#e1bf75':'#525252')}"></div>
                  <div :style="{backgroundColor:data.team_a_data.Score>data.team_b_data.Score?'#525252':(data.team_a_data.Score==data.team_b_data.Score?'#e1bf75':'#be2e3e')}"></div>
                </div>
              </div> -->
              <p>{{data.team_a_data.Score>data.team_b_data.Score?'胜':data.team_a_data.Score==data.team_b_data.Score?'平':'负'}}</p>
            </div>
            <div>
              <img :src="data.team_b_data.Logo" alt="">
            </div>
            <div>
              <p>{{data.team_b_data.Name}}</p>
              <img v-if="data.team_b_data.RegionLogo" :src="data.team_b_data.RegionLogo" alt="">
            </div>
          </li>
        </ul>
        <p class="vsinfo">*显示最近3个月的比赛结果</p>
        <!-- 分页 -->
        <div id="page" v-if="allpage>1">
          <div class="pagination" :style="{width:84+42*pagearr.length+'px'}">
            <div @click="turnUp" class="turnUp"><img src="../../assets/images/News-images/pageleft.png" alt=""></div>
            <div class="listdiv" v-for="(item,index) in pagearr" :key="index" @click="goto(item)" :class="{'active':page == item}">
              <a>{{item}}</a>
            </div>
            <div @click="turnDown" class="turnDown"><img src="../../assets/images/News-images/pageright.png" alt=""></div>
          </div>
        </div>
        <div class="nothing" v-if="!allpage">这里还没有数据哟</div>
      </div>

    </div>
  </div>
</template>


<script>
import Http from "../../common/http";
export default {
  data() {
    return {
      tabs: ["赛事结果", "比赛预测"],
      num: 0,
      resultData: {},
      // 分页
      page: 1,
      allpage: 0,
      pagearr: []
    };
  },
  methods: {
    tab(index) {
      this.num = index;
    },
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
        Http.get(
          `/team/match/result?team_id=${this.teamId}&page=${this.page}&size=5`
        )
          .then(response => {
            this.resultData = response.data.data;
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
        Http.get(
          `/team/match/result?team_id=${this.teamId}&page=${this.page}&size=5`
        )
          .then(response => {
            this.resultData = response.data.data;
          })
          .catch(Http.onError);
      }
    },
    goto(item) {
      this.page = item;
      // this.figure = this.page
      this.teamId = this.$store.state.news.team_id;
      Http.get(
        `/team/match/result?team_id=${this.teamId}&page=${this.page}&size=5`
      )
        .then(response => {
          this.resultData = response.data.data;
        })
        .catch(Http.onError);
    },
    getData: function() {
      this.teamId = this.$store.state.news.team_id;
      this.pagearr = [];
      Http.get(
        `/team/match/result?team_id=${this.teamId}&page=${this.page}&size=5`
      )
        .then(response => {
          this.resultData = response.data.data;
          this.allpage = Math.ceil(this.resultData.total / 5);
          if (this.allpage < 5) {
            while (this.allpage > 0) {
              this.pagearr.unshift(this.allpage);
              this.allpage--;
            }
          } else {
            this.pagearr = [1, 2, 3, 4, 5];
          }
          this.allpage = Math.ceil(this.resultData.total / 5);
        })
        .catch(Http.onError);
    }
  },
  watch: {
    $route() {
      if (this.$route.path == "/teaminfo") {
        this.getData();
        this.page = 1;
      }
    }
  },
  created() {
    this.getData();
  },
  munted() {
    this.getData();
  }
};
</script>
<style scoped lang='scss'>
#schedule {
  height: 760px;
  width: 100%;
  padding-top: 38px;
  padding-right: 30px;
  padding-left: 30px;
  background-color: #1b1c1f;
  .tab {
    width: 100%;
    height: 45px;
    .datatitle {
      height: 45px;
      .active {
        color: #e1c076;
      }
      li {
        float: left;
        font-size: 16px;
        color: #989898;
        width: 136px;
        &:first-child {
          border-right: 1px solid #989898;
        }
      }
    }
    .result {
      width: 1146px;
      height: 644px;
      border: 1px solid #313131;
      ul {
        width: 1144px;
        height: 500px;
        li {
          width: 100%;
          height: 100px;
          cursor: default;
          background-color: #191a1d;
          &:nth-child(even) {
            background-color: #131418;
          }
          &:hover {
            background-color: #292b2f;
          }
          .vstime {
            width: 210px;
            background: url("../../assets/images/News-images/blackline.png")
              right center no-repeat;
            p {
              color: #d9a35a;
              font-size: 18px;
              text-align: center;
              &:first-child {
                margin-top: 30px;
                margin-bottom: 10px;
              }
            }
          }
          div {
            float: left;
            height: 100px;
            &:nth-child(1) {
              width: 124px;
              img {
                height: 76px;
                margin-top: 12px;
              }
            }
            &:nth-child(3) {
              width: 200px;
              p {
                margin-top: 26px;
                margin-bottom: 10px;
                font-size: 18px;
                color: #dcdcdc;
                text-align: right;
              }
              img {
                margin-right: -168px;
                width: 27px;
              }
            }
            &:nth-child(4) {
              width: 118px;
              img {
                width: 65px;
                margin-top: 20px;
              }
            }
            &:nth-child(5) {
              width: 74px;
              .score1 {
                width: 74px;
                height: 34px;
                margin: 0 auto;
                margin-top: 17px;
                margin-bottom: 7px;
                .scoreleft {
                  float: left;
                  width: 36px;
                  height: 34px;
                  color: #dcdcdc;
                  font-size: 20px;
                  text-align: right;
                  padding-top: 4px;
                  background-color: #15161a;
                  border-top: 1px solid #525252;
                  border-left: 1px solid #525252;
                  border-bottom: 4px solid red;
                }
                .scoreright {
                  float: left;
                  width: 36px;
                  height: 34px;
                  color: #dcdcdc;
                  font-size: 20px;
                  text-align: left;
                  padding-top: 4px;
                  background-color: #15161a;
                  border-top: 1px solid #525252;
                  border-right: 1px solid #525252;
                  border-bottom: 4px solid blue;
                }
              }
              p {
                width: 48px;
                height: 24px;
                margin-left: 13px;
                border: 1px solid #525252;
                color: #be2e3e;
                font-size: 14px;
                line-height: 24px;
                margin-top: 64px;
              }
            }
            &:nth-child(6) {
              width: 132px;
              img {
                width: 65px;
                margin-top: 20px;
              }
            }
            &:nth-child(7) {
              width: 285px;
              p {
                margin-top: 26px;
                margin-bottom: 10px;
                font-size: 18px;
                color: #dcdcdc;
                text-align: left;
              }
              img {
                margin-right: 254px;
                width: 27px;
              }
            }
          }
        }
      }
      .vsinfo {
        margin-top: 16px;
        margin-left: 38px;
        width: 100%;
        height: 20px;
        line-height: 20px;
        font-size: 14px;
        color: #838383;
        margin-bottom: 5px;
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
  }
}
</style>
