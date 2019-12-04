<template>
  <div id="matchdetail">
    <div class="matchinfo">
      <div class="matchpic" v-if="matchdata.logo">
        <img :src="matchdata.logo" alt="">
      </div>
      <div class="info">
        <div class="matchname">{{matchdata.name}}</div>
        <div class="matchdate">比赛时间：{{matchdata.started_at}}</div>
        <div class="matchelse">
          <div class="address" v-if="matchdata.host_place">举办地：{{matchdata.host_place}}</div>
          <div class="address" v-else>举办地：暂无</div>
          <div class="host" v-if="matchdata.host">举办方：{{matchdata.host}}</div>
          <div class="host" v-else>举办方：暂无</div>
          <div class="format" v-if="matchdata.rule">赛制：{{matchdata.rule}}</div>
          <div class="format" v-else>赛制：暂无</div>
          <div class="bonus" v-if="matchdata.reward">赛事总奖金：
            <span>{{matchdata.reward}}</span>
          </div>
          <div class="bonus" v-else>赛事总奖金：
            <span>暂无</span>
          </div>
        </div>
        <div class="teamrank">
          <div class="champion">
            <div class="leftlogo">
              <div class="nosmall" v-if="!matchdata.first_place.logo"></div>
              <div class="teamlogo" v-else>
                <img :src="matchdata.first_place.logo" alt="">
              </div>
            </div>
            <div class="rightinfo">
              <div class="rightword">冠军</div>
              <div class="noteam" v-if="!matchdata.first_place.name">待定</div>
              <div class="noteam" v-else>{{matchdata.first_place.name}}</div>
            </div>
          </div>
          <div class="runnerup">
            <div class="leftlogo">
              <div class="nosmall" v-if="!matchdata.second_place.logo"></div>
              <div class="teamlogo" v-else>
                <img :src="matchdata.second_place.logo" alt="">
              </div>
            </div>
            <div class="rightinfo">
              <div class="rightword">亚军</div>
              <div class="noteam" v-if="!matchdata.second_place.name">待定</div>
              <div class="noteam" v-else>{{matchdata.second_place.name}}</div>
            </div>
          </div>
          <div class="seasonarmy">
            <div class="leftlogo">
              <div class="nosmall" v-if="!matchdata.third_place.logo"></div>
              <div class="teamlogo" v-else>
                <img :src="matchdata.third_place.logo" alt="">
              </div>
            </div>
            <div class="rightinfo">
              <div class="rightword">季军</div>
              <div class="noteam" v-if="!matchdata.third_place.name">待定</div>
              <div class="noteam" v-else>{{matchdata.third_place.name}}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="recommend" v-if="recommenddata.length">
      <div class="title">重点推荐
        <div class="hot">
          <span>hot</span>
          <div class="triangle"></div>
        </div>
      </div>
      <div class="recommendcontent">
        <ul class="recommendul">
          <li class="recommendli" v-for="(item,index) in recommenddata" :key="index">
            <!-- <div class="guessmain-ex-text-fixed">固盘<i ></i></div> -->
            <div class="against" @click="gocompete(item.guess_id)">
              <div class="ateamlogo" v-if="item.team.left.logo">
                <div class="imgbox">
                  <img :src="item.team.left.logo" alt="">
                </div>
              </div>
              <div class="anameodds">
                <div class="ateamname">{{item.team.left.name}}</div>
              </div>
              <div class="vsinfo">
                <div class="vslogo"></div>
                <div class="vsstate">{{item.status_name=='open'?'未开始':item.status_name=='wait'?'即将开始':item.status_name=='end'?'已结束':'进行中'}}</div>
                <div class="vstime">{{item.started_at}}</div>
              </div>
              <div class="bnameodds">
                <div class="bteamname">{{item.team.right.name}}</div>
              </div>
              <div class="bteamlogo" v-if="item.team.right.logo">
                <div class="imgbox">
                  <img :src="item.team.right.logo" alt="">
                </div>
              </div>
            </div>
            <div class="buypoint">
              <div class="buytitle" @click="getbuy(item.id)">
                推荐买点
                <div class="triangle2" v-if="idnum==item.id&&up"></div>
                <div class="triangle1" v-else></div>
              </div>
              <ul v-if="idnum==item.id&&!bool">
                <li v-for="(data,index) in buydata" :key="index" @click="gonews(data.id,data.game_id)">
                  <div class="box">
                    <div class="caption"> · {{data.title}}</div>
                    <div class="articletime">{{data.publish_time}}</div>
                  </div>
                </li>
              </ul>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <div class="arrange" v-if="arrangedata.length" :style="{marginBottom:total?'0':'60px'}">
      <div class="arrangetitle">赛程安排</div>
      <div class="arrangetime">
        <ul :style="{width:numtop<7?'1200px':(numtop-7)*171+1200+'px',left:ulleft}" ref="ultop">

          <li v-for="(item,index) in matchdata.match_date" :key="index" @click="todaymatch(index,id,item)" :class="{active:datenum == index}">

            <div class="border"></div>{{item}}
          </li>
        </ul>
        <div class="arrleft" @click="leftturn" v-if="numtop>7"></div>
        <div class="arrright" @click="rightturn" v-if="numtop>7"></div>
      </div>
      <div class="contest">
        <div class="screen">
          <ul ref="ul" :style="{width:nowdatearr.length*290+'px',left:ululleft}">
            <li v-for="(item,index) in nowdatearr" :key="index">
              <div class="guessmain-ex-text-fixed" v-if="item.odds_type==2" title="玩家预测时的赔率为最后收益所得赔率，例如固赔1.5，预测100C则最后获得收益150C+本金100C，合计250C。">固盘<i ></i></div>
              <!-- <div class="conteststate" :style="{background:'url(/src/assets/images/matchcenter/'+item.status_name+'.png)'}">
                {{item.status_name=='open'?'未开始':item.status_name=='wait'?'即将开始':item.status_name=='end'?'已结束':'进行中'}}
              </div> -->
              <!-- test -->
              <div class="conteststate" v-if="item.status_name=='open'||item.status_name=='wait'">
                <img src="../assets/images/matchcenter/open.png" alt="">
                <span>未开始</span>
              </div>
              <div class="conteststate" v-if="item.status_name=='end'">
                <img src="../assets/images/matchcenter/end.png" alt="">
                <span>已结束</span>
              </div>
              <div class="conteststate" v-if="item.status_name=='start'">
                <img src="../assets/images/matchcenter/start.png" alt="">
                <span>进行中</span>
              </div>
              <div class="teamalogo" v-if="item.team.left.logo">
                <img :src="item.team.left.logo" alt="">
              </div>
              <div class="timeodds">
                <div class="contesttime">{{item.started_at}}</div>
                <div class="contestodds">
                  <span>{{item.score_1}}</span> :
                  <span>{{item.score_2}}</span>
                </div>
              </div>
              <div class="teamblogo" v-if="item.team.right.logo">
                <img :src="item.team.right.logo" alt="">
              </div>
              <div class="takeinend" @click="gocompete(item.guess_id)" v-if="item.status_name=='end'">参与预测</div>
              <div class="takein" @click="gocompete(item.guess_id)" v-else>参与预测</div>
            </li>
          </ul>
        </div>
        <div class="leftarr" @click="turnleft"></div>
        <div class="rightarr" @click="turnright"></div>
      </div>
    </div>
    <div class="news" v-if="total">
      <div class="title">赛事资讯</div>
      <div class="newscontent">
        <ul>
          <li v-for="(item,index) in newsarr" :key="index" @click="gonews(item.id,item.game_id)">
            <div class="bgbox">
              <div class="newspic">
                <img :src="item.picture" alt="">
              </div>
              <div class="titletime">
                <div class="newstitle">{{item.title}}</div>
                <div class="newstime">{{item.publish_time}}</div>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import router from "@/router"
import Http from '../common/http';
export default {
  data() {
    return {
      bool: true,
      num: '',
      numtop: '',
      count: 0,
      counttop: 0,
      matchdata: {},
      recommenddata: [],
      buydata: [],
      newsdata: {},
      newsarr: [],
      arrangedata: [],
      datehour: '',
      total: '',
      idnum: '',
      datenum: 0,
      id: '',
      sw: true,
      page: 1,
      up: false,
      down: true,
      nowtime: '',
      ulleft: '0px',
      ululleft: '0px',
      nowdate: '',
      nowdateul: '0px',
      nowdatearr: [],
    };
  },
  methods: {
    getbuy(id) {
      if (this.idnum != id) {
        this.up = false;
        this.down = true;
        this.bool = true;
      }
      this.up = !this.up;
      this.down = !this.down;
      this.idnum = id;
      this.bool = !this.bool;
      // 推荐买点数据
      Http.get(`/news/recommendByBattle?battle_id=${id}`)
        .then(response => {
          this.buydata = response.data.data;
          console.log(this.buydata, 'buydata');
        })
        .catch(Http.onError);
    },
    gonews(id, gameid) {
      console.log(';a;a;a;');
      this.$store.dispatch('setid', gameid);
      console.log(';b;b;b;');
      window.open(
        window.location.origin +
          '/newsdetail?article_id=' +
          id +
          '&game_id=' +
          gameid
      );
      console.log(';c;c;c;');
    },
    gocompete(id) {

      if (id == 0) {
        return;
      } else {
        // window.open(window.location.origin + '/guess/' + id);
        this.$store.commit('mutationIsIndex',1)
        this.$store.commit('mutationIsSendDispath',true)
        router.push(`/guess/${id}`);
        this.$store.commit('mutationStateGuessId',id)

      }
    },
    leftturn() {
      if (this.counttop <= 0) {
        return;
      }
      this.counttop--;
      console.log(1111, this.counttop, '日期count左');
      this.animatetop(this.$refs.ultop, -this.counttop * 171);
    },
    rightturn() {
      if (this.counttop >= this.numtop - 7) {
        return;
      }
      this.counttop++;
      console.log(2222, this.counttop, '日期count右');
      this.animatetop(this.$refs.ultop, -this.counttop * 171);
    },
    animatetop(ele, target) {
      clearInterval(ele.timer);
      ele.timer = setInterval(function() {
        var current = ele.offsetLeft;
        var step = 171;
        step = target > current ? step : -step;
        if (Math.abs(target - current) > Math.abs(step)) {
          current = current + step;
          ele.style.left = current + 'px';
        } else {
          ele.style.left = target + 'px';
          clearInterval(ele.timer);
        }
      }, 100);
    },
    turnleft() {
      if (this.count <= 0) {
        return;
      }
      this.count--;
      console.log(this.count, 'count赛程左');
      this.animate(this.$refs.ul, -this.count * 290);
    },
    turnright() {
      if (this.count >= this.num - 4) {
        return;
      }
      this.count++;
      console.log(this.count, 'count赛程右');
      this.animate(this.$refs.ul, -this.count * 290);
    },
    animate(ele, target) {
      clearInterval(ele.timer);
      ele.timer = setInterval(function() {
        var current = ele.offsetLeft;
        var step = 290;
        step = target > current ? step : -step;
        if (Math.abs(target - current) > Math.abs(step)) {
          current = current + step;
          ele.style.left = current + 'px';
        } else {
          ele.style.left = target + 'px';
          clearInterval(ele.timer);
        }
      }, 100);
    },
    // 重构数组
    makearr(arr) {
      console.log('进入makearr函数');
      this.nowdatearr = [];
      let endarr = [];
      let startarr = [];
      let waitarr = [];
      let openarr = [];
      // 重构数组
      for (let j = 0; j < arr.length; j++) {
        if (arr[j].status_name == 'end') {
          endarr.push(arr[j]);
        } else if (arr[j].status_name == 'start') {
          startarr.push(arr[j]);
        } else if (arr[j].status_name == 'wait') {
          waitarr.push(arr[j]);
        } else if (arr[j].status_name == 'open') {
          openarr.push(arr[j]);
        }
      }
      this.nowdatearr = this.nowdatearr.concat(
        endarr,
        startarr,
        waitarr,
        openarr
      );
      // 赛程安排初始化
      for (let k = 0; k < this.nowdatearr.length; k++) {
        if (
          this.nowdatearr[k].status_name == 'start' ||
          this.nowdatearr[k].status_name == 'wait' ||
          this.nowdatearr[k].status_name == 'open'
        ) {
          if (this.nowdatearr.length <= 4) {
            this.ululleft = '0px';
            this.nowdateul = '0px';
            cosnole.log('return111');
            return;
          } else if (4 < this.nowdatearr.length) {
            if (k < 2) {
              this.ululleft = '0px';
              this.nowdateul = '0px';
            } else if (k < this.nowdatearr.length - 3) {
              this.ululleft = -(k - 1) * 290 + 'px';
              this.nowdateul = -(k - 1) * 290 + 'px';
              this.count = k - 1;
            } else if (this.nowdatearr.length - 3 <= k) {
              this.ululleft = -(this.nowdatearr.length - 4) * 290 + 'px';
              this.nowdateul = -(this.nowdatearr.length - 4) * 290 + 'px';
              this.count = this.nowdatearr.length - 4;
            }
            console.log('return222');
            return;
          }
        } else {
          if (this.nowdatearr.length <= 4) {
            this.ululleft = '0px';
            this.nowdateul = '0px';
            console.log('return333');
          } else {
            this.ululleft = -(this.nowdatearr.length - 4) * 290 + 'px';
            this.nowdateul = -(this.nowdatearr.length - 4) * 290 + 'px';
            this.count = this.nowdatearr.length - 4;
            console.log('return444');
          }
        }
      }
      console.log(arr, '赛程安排数据');
      console.log(this.nowdatearr, '重新做的数组');
    },
    todaymatch(index, id, date) {
      Http.get(`/battle/list?match_id=${id}&date=${date}`)
        .then(response => {
          this.arrangedata = response.data.data;
          this.num = this.arrangedata.length;
          this.makearr(this.arrangedata);
        })
        .catch(Http.onError);
      this.$refs.ul.style.left = this.nowdateul;
      this.datenum = index;
    },
    getdata(id) {
      // 赛事详细数据
      Http.get(`/match/detail?match_id=${id}`)
        .then(response => {
          this.matchdata = response.data.data;
          this.numtop = this.matchdata.match_date.length;
          console.log(this.matchdata, 'matchdata');
          for (let i = 0; i < this.matchdata.match_date.length; i++) {
            // 日期相等
            if (this.matchdata.match_date[i] == this.nowtime) {
              console.log('日期相同');
              this.nowdate = this.matchdata.match_date[i];
              this.datenum = i;
              // 赛程安排数据
              Http.get(
                `/battle/list?match_id=${this.matchdata.id}&date=${
                  this.matchdata.match_date[i]
                }`
              )
                .then(response => {
                  this.arrangedata = response.data.data;
                  this.num = this.arrangedata.length;
                  this.makearr(this.arrangedata);
                })
                .catch(Http.onError);
              // 赛程日期初始化（日期相同）
              if (this.numtop <= 7) {
                this.ulleft = '0px';
              } else if (7 < this.numtop) {
                if (i < 2) {
                  this.ulleft = '0px';
                } else if (i < this.numtop - 6) {
                  this.ulleft = -(i - 1) * 171 + 'px';
                  this.counttop = i - 1;
                } else if (this.numtop - 6 <= i) {
                  this.ulleft = -(this.numtop - 7) * 171 + 'px';
                  this.counttop = this.numtop - 7;
                }
              }
              return;
              // 日期接近
            } else if (this.matchdata.match_date[i] > this.nowtime) {
              console.log('日期不同');
              this.nowdate = this.matchdata.match_date[i];
              this.datenum = i;
              // 赛程安排数据
              Http.get(
                `/battle/list?match_id=${this.matchdata.id}&date=${
                  this.matchdata.match_date[i]
                }`
              )
                .then(response => {
                  this.arrangedata = response.data.data;
                  this.num = this.arrangedata.length;
                  this.makearr(this.arrangedata);
                })
                .catch(Http.onError);
              //赛程日期初始化（日期接近）
              if (this.numtop <= 7) {
                this.ulleft = '0px';
              } else if (7 < this.numtop) {
                if (i < 2) {
                  this.ulleft = '0px';
                } else if (i < this.numtop - 6) {
                  this.ulleft = -(i - 1) * 171 + 'px';
                  this.counttop = i - 1;
                } else if (this.numtop - 6 <= i) {
                  this.ulleft = -(this.numtop - 7) * 171 + 'px';
                  this.counttop = this.numtop - 7;
                }
              }
              return;
            } else {
              // console.log('全都结束了')
              // this.nowdate = this.matchdata.match_date[this.matchdata.match_date.length-1];
              // this.datenum = this.matchdata.match_date.length-1;
              // // 赛程安排数据
              // Http.get(
              //   `/battle/list?match_id=${this.matchdata.id}&date=${
              //     this.matchdata.match_date[this.matchdata.match_date.length-1]
              //   }`
              // )
              //   .then(response => {
              //     this.arrangedata = response.data.data;
              //     this.num = this.arrangedata.length;
              //     this.makearr(this.arrangedata);
              //   })
              //   .catch(Http.onError);
              // //赛程日期初始化（日期接近）
              // if (this.numtop <= 7) {
              //   this.ulleft = "0px";
              // } else if (7 < this.numtop) {
              //   // if (i < 2) {
              //   //   this.ulleft = "0px";
              //   // } else if (i < this.numtop - 6) {
              //   //   this.ulleft = -(i - 1) * 171 + "px";
              //   //   this.counttop = i - 1;
              //   // } else if (this.numtop - 6 <= i) {
              //     this.ulleft = -(this.numtop - 7) * 171 + "px";
              //     this.counttop = this.numtop - 7;
              //   // }
              // }
              // return;
            }
          }
          console.log('全都结束了');
          this.nowdate = this.matchdata.match_date[
            this.matchdata.match_date.length - 1
          ];
          this.datenum = this.matchdata.match_date.length - 1;
          // 赛程安排数据
          Http.get(
            `/battle/list?match_id=${this.matchdata.id}&date=${
              this.matchdata.match_date[this.matchdata.match_date.length - 1]
            }`
          )
            .then(response => {
              this.arrangedata = response.data.data;
              this.num = this.arrangedata.length;
              this.makearr(this.arrangedata);
            })
            .catch(Http.onError);
          //赛程日期初始化（日期接近）
          if (this.numtop <= 7) {
            this.ulleft = '0px';
          } else if (7 < this.numtop) {
            // if (i < 2) {
            //   this.ulleft = "0px";
            // } else if (i < this.numtop - 6) {
            //   this.ulleft = -(i - 1) * 171 + "px";
            //   this.counttop = i - 1;
            // } else if (this.numtop - 6 <= i) {
            this.ulleft = -(this.numtop - 7) * 171 + 'px';
            this.counttop = this.numtop - 7;
            // }
          }
          return;
        })
        .catch(Http.onError);
      // 对战推荐数据
      Http.get(`/battle/list?match_id=${id}&is_recommend=1`)
        .then(response => {
          this.recommenddata = response.data.data;
          this.getbuy(this.recommenddata[0].id);
          console.log(this.recommenddata, 'recommenddata');
        })
        .catch(Http.onError);
      // s赛事资讯数据
      Http.get(`/news/listByMatch?match_id=${id}&page=1`)
        .then(response => {
          this.newsdata = response.data.data;
          this.newsarr = this.newsdata.items;
          this.total = this.newsdata.meta.total;
          if (!response.data.data.meta.has_more) {
            this.sw = false;
          }
          console.log(this.newsdata, 'newsdata');
        })
        .catch(Http.onError);
    },
    scroll() {
      window.addEventListener('scroll', () => {
        let scrollTop =
          window.pageYOffset ||
          document.documentElement.scrollTop ||
          document.body.scrollTop;
        // console.log(
        //   document.documentElement.clientHeight +
        //     "-----------" +
        //     window.innerHeight
        // ); // 可视区域高度
        // console.log(scrollTop); // 滚动高度
        // console.log(document.body.offsetHeight); // 文档高度
        // 判断是否滚动到底部

        if (scrollTop + window.innerHeight >= document.body.offsetHeight) {
          // 如果开关打开则加载数据
          if (this.sw) {
            // 将开关关闭
            this.page++;
            Http.get(`/news/listByMatch?match_id=${this.id}&page=${this.page}`)
              .then(response => {
                this.newsarr = this.newsarr.concat(response.data.data.items);
                if (!response.data.data.meta.has_more) {
                  this.sw = false;
                }
              })
              .catch(Http.onError);
          }
        }
      });
    },
  },
  created() {
    this.id = this.$route.params.id;
    this.getdata(this.id);
    let monthstr = new Date().getMonth() + 1;
    if (monthstr < 10) {
      monthstr = '0' + monthstr;
    }
    this.nowtime =
      new Date().getFullYear() + '-' + monthstr + '-' + new Date().getDate();
    console.log(this.nowtime > '2018-05-13', 8888888);
  },
  mounted() {
    this.scroll();
  },
  watch: {
    $route() {
      if (this.$route.name == 'matchdetail') {
        this.sw = true;
        this.page = 1;
        this.ululleft = '0px';
        this.count = 0;
        this.id = this.$route.params.id;
        this.arrangedata = [];
        this.getdata(this.id);
      }
    },
  },
};
</script>

<style scoped lang='scss'>
.guessmain-ex-text-fixed {
    position: absolute;
    top: 0;
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
    background: url('../assets/images/competeImg/guess_fixed.png') no-repeat center;
    vertical-align: -5px;
}
#matchdetail {
  li {
    cursor: default;
  }
  min-height: 1000px;
  .matchinfo {
    height: 260px;
    width: 100%;
    padding-left: 32px;
    padding-right: 32px;
    padding-top: 35px;
    margin-bottom: 20px;
    background: rgba(62, 65, 69, 0.7)
      url('../assets/images/matchcenter/topbg.png');
    .matchpic {
      width: 320px;
      height: 180px;
      float: left;
      vertical-align: middle;
      display: table-cell;
      text-align: center;
      margin-right: 20px;
      img {
        height: 180px;
        max-width: 320px;
        max-height: 180px;
      }
    }
    .info {
      float: left;
      .matchname {
        font-size: 18px;
        line-height: 18px;
        font-weight: bold;
        margin-bottom: 10px;
        text-align: left;
      }
      .matchdate {
        font-size: 11px;
        font-weight: bold;
        color: #999;
        margin-bottom: 12px;
        text-align: left;
      }
      .matchelse {
        height: 20px;
        text-align: left;
        margin-bottom: 22px;
        div {
          float: left;
          padding-left: 20px;
          padding-right: 20px;
          font-size: 12px;
          color: #b8b8b8;
          border-right: 1px solid #434343;
          &:first-child {
            padding-left: 0;
          }
          &:last-child {
            padding-right: 0;
            border-right: none;
          }
        }
        .bonus {
          span {
            color: #efc914;
            font-weight: bold;
          }
        }
      }
      .teamrank {
        border-top: 1px solid #434343;
        height: 70px;
        padding-top: 20px;
        .champion {
          width: 200px;
          height: 50px;
          float: left;
          .leftlogo {
            float: left;
            width: 70px;
            height: 50px;
            background: url('../assets/images/matchcenter/no1.png');
            .nosmall {
              width: 10px;
              height: 13px;
              background: url('../assets/images/matchcenter/no1small.png');
              margin-left: 30px;
              margin-top: 18px;
            }
            .teamlogo {
              img {
                margin-left: 0px;
                margin-top: 12px;
                width: 28px;
                height: 28px;
              }
            }
          }
          .rightinfo {
            float: left;
            margin-top: 6px;
            .rightword {
              text-align: left;
              font-size: 12px;
              line-height: 12px;
              margin-bottom: 4px;
            }
            .noteam {
              text-align: left;
              font-size: 12px;
              line-height: 12px;
              font-weight: bold;
              color: #af822b;
            }
          }
        }
        .runnerup {
          width: 200px;
          height: 50px;
          float: left;
          .leftlogo {
            float: left;
            width: 70px;
            height: 50px;
            background: url('../assets/images/matchcenter/no2.png');
            .nosmall {
              width: 10px;
              height: 13px;
              background: url('../assets/images/matchcenter/no2small.png');
              margin-left: 30px;
              margin-top: 18px;
            }
            .teamlogo {
              img {
                margin-left: 0px;
                margin-top: 12px;
                width: 28px;
                height: 28px;
              }
            }
          }
          .rightinfo {
            float: left;
            margin-top: 6px;
            .rightword {
              text-align: left;
              font-size: 12px;
              line-height: 12px;
              margin-bottom: 4px;
            }
            .noteam {
              text-align: left;
              font-size: 12px;
              line-height: 12px;
              font-weight: bold;
              color: #af822b;
            }
          }
        }
        .seasonarmy {
          width: 200px;
          height: 50px;
          float: left;
          .leftlogo {
            float: left;
            width: 70px;
            height: 50px;
            background: url('../assets/images/matchcenter/no3.png') -10px -10px
              no-repeat;
            .nosmall {
              width: 10px;
              height: 13px;
              background: url('../assets/images/matchcenter/no3small.png');
              margin-left: 26px;
              margin-top: 20px;
            }
            .teamlogo {
              img {
                margin-left: -6px;
                margin-top: 12px;
                width: 28px;
                height: 28px;
              }
            }
          }
          .rightinfo {
            float: left;
            margin-top: 6px;
            .rightword {
              text-align: left;
              font-size: 12px;
              line-height: 12px;
              margin-bottom: 4px;
            }
            .noteam {
              text-align: left;
              font-size: 12px;
              line-height: 12px;
              font-weight: bold;
              color: #af822b;
            }
          }
        }
      }
    }
  }
  .recommend {
    min-height: 100px;
    .title {
      text-align: left;
      position: relative;
      height: 34px;
      line-height: 34px;
      font-size: 15px;
      font-weight: bold;
      .hot {
        position: absolute;
        width: 28px;
        height: 12px;
        color: #fff;
        background-color: red;
        top: 11px;
        left: 68px;
        span {
          position: absolute;
          top: -12px;
          left: -2px;
          display: block;
          font-size: 20px;
          font-weight: bold;
          transform: scale(0.5);
        }
        .triangle {
          position: absolute;
          width: 0;
          height: 0;
          left: -6px;
          top: 4px;
          border-style: solid;
          border-width: 2px 6px 2px 0;
          border-color: transparent red transparent transparent;
        }
      }
    }
    .recommendcontent {
      .recommendul {
        .recommendli {
          position:relative;top:0;left:0;
          margin-bottom: 20px;
          &:last-child {
            margin-bottom: 0;
          }
          .against {
            cursor: pointer;
            border-top: 3px solid #444142;
            height: 184px;
            background-color: rgba(48, 46, 49, 0.7);
            border-bottom: 1px solid rgba(184, 184, 184, 0.3);
            padding-left: 40px;
            .ateamlogo {
              float: left;
              width: 180px;
              height: 120px;
              margin-top: 32px;
              .imgbox {
                width: 180px;
                height: 120px;
                vertical-align: middle;
                display: table-cell;
                text-align: center;
                img {
                  height: 120px;
                  max-height: 120px;
                  max-width: 180px;
                }
              }
            }
            .anameodds {
              float: left;
              width: 244px;
              height: 100%;
              text-align: center;
              .ateamname {
                font-size: 16px;
                font-weight: bold;
                line-height: 16px;
                margin-top: 84px;
              }
            }
            .vsinfo {
              float: left;
              width: 270px;
              height: 180px;
              background: url('../assets/images/matchcenter/vsbg.png');
              .vslogo {
                width: 24px;
                height: 22px;
                margin-top: 48px;
                margin-left: 122px;
                background: url('../assets/images/matchcenter/vs.png');
              }
              .vsstate {
                font-weight: bold;
                font-size: 14px;
                margin-top: 8px;
                margin-bottom: 10px;
                line-height: 14px;
                text-align: center;
                background: url('../assets/images/matchcenter/vsdashed.png')
                  81px 6px no-repeat;
              }
              .vstime {
                font-size: 16px;
                font-weight: bold;
                color: #efc914;
                text-align: center;
              }
            }
            .bnameodds {
              float: left;
              width: 244px;
              height: 100%;
              text-align: center;
              .bteamname {
                font-size: 16px;
                font-weight: bold;
                line-height: 16px;
                margin-top: 84px;
              }
            }
            .bteamlogo {
              float: left;
              width: 180px;
              height: 120px;
              margin-top: 32px;
              .imgbox {
                width: 180px;
                height: 120px;
                vertical-align: middle;
                display: table-cell;
                text-align: center;
                img {
                  height: 120px;
                  max-height: 120px;
                  max-width: 180px;
                }
              }
            }
          }
          .buypoint {
            min-height: 56px;
            width: 100%;
            background-color: rgba(57, 55, 58, 0.7) !important;
            .buytitle {
              cursor: pointer;
              position: relative;
              height: 56px;
              width: 100%;
              font-size: 14px;
              font-weight: bold;
              color: #b8b8b8;
              text-align: left;
              padding-left: 38px;
              line-height: 56px;
              .triangle1 {
                position: absolute;
                top: 24px;
                left: 98px;
                width: 0;
                height: 0;
                border-style: solid;
                border-width: 8px 8px 0 8px;
                border-color: #fff transparent transparent transparent;
              }
              .triangle2 {
                position: absolute;
                top: 24px;
                left: 98px;
                width: 0;
                height: 0;
                border-style: solid;
                border-width: 0 8px 8px 8px;
                border-color: transparent transparent #fff transparent;
              }
            }
            ul {
              li {
                cursor: pointer;
                height: 61px;
                line-height: 60px;
                border-bottom: 1px solid rgb(43, 43, 43);
                &:hover {
                  background-color: #02010a;
                  .box {
                    .caption {
                      color: #fff;
                    }
                    .articletime {
                      color: #fff;
                    }
                  }
                }
                &:first-child {
                  .box {
                    border-top: 1px solid rgba(184, 184, 184, 0.1);
                  }
                }
                &:last-child {
                  border-bottom: none;
                }
                .box {
                  margin-left: 38px;
                  margin-right: 30px;
                  height: 59px;
                  box-sizing: content-box;
                  .caption {
                    float: left;
                    font-size: 15px;
                    color: #aeaeae;
                  }
                  .articletime {
                    float: right;
                    font-size: 14px;
                    color: #666;
                  }
                }
              }
            }
          }
        }
      }
    }
  }
  .arrange {
    .arrangetitle {
      margin-top: 20px;
      height: 34px;
      line-height: 34px;
      text-align: left;
      font-size: 15px;
      font-weight: bold;
    }
    .arrangetime {
      height: 53px;
      position: relative;
      overflow: hidden;
      background: url('../assets/images/matchcenter/arrangebg.png') 1px 0px
        no-repeat;
      padding-bottom: 22px;
      ul {
        position: absolute;
        z-index: 10;
        top: 0;
        left: 0;
        height: 30x;
        .active {
          color: #efc914;
          .border {
            height: 2px;
            margin: 0 auto;
            width: 100px;
            background: radial-gradient(#fff, #e7c213);
          }
        }
        li {

          cursor: pointer;
          width: 171px;
          float: left;
          height: 30px;
          line-height: 30px;
          color: #fff;
        }
      }
      .arrleft {
        z-index: 11;
        cursor: pointer;
        position: absolute;
        left: 0px;
        top: 50%;
        width: 12px;
        height: 18px;
        background: url('../assets/images/matchcenter/leftarr.png');
        transform: translateY(-50%);
      }
      .arrright {
        z-index: 11;
        cursor: pointer;
        position: absolute;
        right: 0px;
        top: 50%;
        width: 12px;
        height: 18px;
        background: url('../assets/images/matchcenter/rightarr.png');
        transform: translateY(-50%);
      }
    }
    .contest {
      position: relative;
      height: 172px;
      padding-left: 25px;
      padding-right: 25px;
      .screen {
        width: 100%;
        position: relative;
        overflow: hidden;
        height: 172px;
        ul {
          position: absolute;
          left: 0;
          top: 0;
          li {
            position:relative;top:0;left:0;
            float: left;
            width: 280px;
            height: 172px;
            position: relative;
            background: url('../assets/images/matchcenter/schedulebg.png');
            margin-right: 10px;
            .teamalogo {
              width: 64px;
              height: 64px;
              border-radius: 50%;
              float: left;
              margin-top: 56px;
              margin-left: 10px;
              img {
                height: 64px;
                width: 64px;
                border-radius: 50%;
              }
            }
            .timeodds {
              margin-left: 17px;
              margin-right: 17px;
              margin-top: 60px;
              float: left;
              .contesttime {
                font-size: 12px;
                line-height: 12px;
                margin-bottom: 15px;
              }
              .contestodds {
                font-size: 28px;
                font-weight: bold;
              }
            }
            .teamblogo {
              width: 64px;
              height: 64px;
              float: left;
              border-radius: 50%;
              margin-top: 56px;
              img {
                height: 64px;
                width: 64px;
                border-radius: 50%;
              }
            }
            .conteststate {
              position: absolute;
              width: 52px;
              height: 40px;
              top: -2px;
              right: 13px;
              img {
                width: 52px;
                height: 40px;
                position: absolute;
                left: 0;
                top: 0;
              }
              span {
                position: absolute;
                width: 52px;
                height: 40px;
                left: 0;
                top: 0;
                text-align: center;
                line-height: 26px;
                font-weight: bold;
                font-size: 12px;
                color: #fff;
              }
            }
            .takein {
              cursor: pointer;
              position: absolute;
              left: 50%;
              top: 130px;
              transform: translateX(-50%);
              width: 102px;
              line-height: 24px;
              height: 26px;
              border: 1px solid #5d3825;
              font-size: 12px;
              border-radius: 4px;
              font-weight: bold;
              color: #f15408;
              &:hover {
                background: url('../assets/images/matchcenter/takeinhover.png');
                color: #fff;
              }
            }
            .takeinend {
              cursor: pointer;
              position: absolute;
              left: 50%;
              top: 130px;
              transform: translateX(-50%);
              width: 102px;
              line-height: 24px;
              height: 26px;
              font-size: 12px;
              border-radius: 4px;
              font-weight: bold;
              color: #fff;
              background-color: #535353;
            }
          }
        }
      }
      .leftarr {
        cursor: pointer;
        position: absolute;
        left: 0px;
        top: 50%;
        width: 12px;
        height: 18px;
        background: url('../assets/images/matchcenter/leftarr.png');
        transform: translateY(-50%);
      }
      .rightarr {
        cursor: pointer;
        position: absolute;
        right: 0px;
        top: 50%;
        width: 12px;
        height: 18px;
        background: url('../assets/images/matchcenter/rightarr.png');
        transform: translateY(-50%);
      }
    }
  }
  .news {
    min-height: 38px;
    margin-bottom: 40px;
    .title {
      height: 38px;
      line-height: 38px;
      font-size: 15px;
      font-weight: bold;
      text-align: left;
    }
    .newscontent {
      min-height: 138px;
      background-color: rgba(53, 51, 53, 0.7);
      ul {
        li {
          // position:relative;top:0;left:0;
          cursor: pointer;
          height: 138px;
          &:hover {
            background-color: rgba(12, 10, 19, 0.7);
          }
          &:last-child {
            .bgbox {
              border-bottom: none;
            }
          }
          .bgbox {
            border-bottom: 1px solid #535354;
            height: 138px;
            width: 1140px;
            margin-left: 30px;
            padding-top: 26px;
            .newspic {
              float: left;
              width: 154px;
              height: 90px;
              margin-right: 14px;
              img {
                width: 154px;
                height: 90px;
              }
            }
            .titletime {
              float: left;
              .newstitle {
                height: 28px;
                font-size: 14px;
                text-align: left;
              }
              .newstime {
                font-size: 12px;
                color: #999;
                text-align: left;
              }
            }
          }
        }
      }
    }
  }
}
</style>
