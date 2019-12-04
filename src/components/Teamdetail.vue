<template>
  <div id="teamdetail">
    <div class="container">
      <!-- 标题栏 -->
      <div class="title">
        <div class="titlebg"></div>
        <div class="word">
          <span>您的位置 :
            <router-link :to="{path:'/news',query:{currentLi:2}}" @click.native="titletab(2,require('@/assets/images/News-images/news-lolbg.jpg'))" tag='u'>资讯首页</router-link> 》
            <router-link v-if="game_id==1" :to="{path:'/news',query:{currentLi:1}}" @click.native="titletab(1,require('@/assets/images/News-images/news-dota2bg.jpg'))" tag='u'>Dota2</router-link>
            <router-link v-else-if="game_id==2" :to="{path:'/news',query:{currentLi:2}}" @click.native="titletab(2,require('@/assets/images/News-images/news-lolbg.jpg'))" tag='u'>英雄联盟</router-link>
            》
            <span class="yellow">战队排行</span>
          </span>
        </div>
        <!-- 搜索框 -->
        <!-- <div class="input">
          <input type="text" placeholder="搜索其他战队" ref="input"><input type="button" @click="checked">
        </div> -->
      </div>
      <!-- 列表栏 -->
      <div class="list">
        <!-- 列表标题 -->
        <div class="listtitle">
          <ul>
            <li>排行</li>
            <li>战队</li>
            <li v-if="flag">地区</li>
            <li v-else>20分钟塔数差</li>

            <li v-if="flag">胜率</li>
            <li v-else-if="!flag&&game_id==2">20分钟龙数</li>
            <li v-else-if="!flag&&game_id==1">20分经济差</li>

            <li v-if="flag">一血</li>
            <li v-else-if="!flag&&game_id==2">25分钟经济差</li>
            <li v-else-if="!flag&&game_id==1">30分钟经济差</li>

            <li v-if="flag">一塔</li>
            <li v-else-if="!flag&&game_id==2">首先峰</li>
            <li v-else-if="!flag&&game_id==1">首近战兵营</li>

            <li v-if="flag&&game_id==2">一龙</li>
            <li v-else-if="!flag">送掉比赛</li>
            <li v-else-if="flag&&game_id==1">首十杀</li>

            <li v-if="flag&&game_id==2">首大龙</li>
            <li v-if="flag&&game_id==1">首肉山</li>
            <li v-else-if="!flag">翻盘</li>

            <li>积分</li>

            <li @click="changebg"></li>
          </ul>
        </div>
        <!-- 列表内容 -->
        <div class="listcontent" v-if="teamdata">
          <ul v-if="bool">
            <li v-if="teamdata" v-for="(data,index) in teamdata" :key="index" :class="(index+1)%2==1?'black':'gray'">
              <div>
                <div v-if="-index+2>=0"></div>
                <span v-if="-index+2<0">{{data.format_data.Ranking}}</span>
              </div>
              <!-- teamlogo   teamname -->
              <div v-if='game_id==1'>
                <img :src="data.format_data.Team.Logo" alt="">
                <span>{{data.format_data.Team.Name}}</span>
              </div>
              <div v-else-if="game_id==2">
                <img :src="data.format_data.TeamInfo.Logo" alt="">
                <span>{{data.format_data.TeamInfo.Name}}</span>
              </div>
              <!-- 地区   20分钟塔数差 -->
              <div v-if="flag&&game_id==2">
                <img :src="data.format_data.TeamInfo.Region.Logo" alt=""></div>
              <div v-else-if="flag&&game_id==1">
                <img :src="data.format_data.Region.Logo" alt=""></div>
              <div v-else-if="!flag">{{data.format_data.TowerDiffAt20}}</div>
              <!-- 胜率 20分钟龙数+20分钟经济数 -->
              <div v-if="flag">{{Math.ceil(data.format_data.WinLoss)}}%</div>
              <div v-else-if="!flag&&game_id==2">{{data.format_data.DragonAt20}}</div>
              <div v-else-if="!flag&&game_id==1">{{data.format_data.NetWorthDiffAt20}}</div>
              <!-- 一血  25分钟经济差+30分钟经济差 -->
              <div v-if="flag">{{Math.ceil(data.format_data.Fb)}}%</div>
              <div v-else-if="!flag&&game_id==2">{{data.format_data.GoldDiffAt25}}</div>
              <div v-else-if="!flag&&game_id==1">{{data.format_data.NetWorthDiffAt30}}</div>
              <!-- 一塔  首先峰+首近战兵营 -->
              <div v-if="flag">{{Math.ceil(data.format_data.Ft)}}%</div>
              <div v-else-if="!flag&&game_id==2">{{data.format_data.Fh}}</div>
              <div v-else-if="!flag&&game_id==1">{{data.format_data.Fr}}</div>
              <!-- 一龙+首十杀  送掉比赛 -->
              <div v-if="flag&&game_id==2">{{Math.ceil(data.format_data.Fd)}}%</div>
              <div v-else-if="flag&&game_id==1">{{Math.ceil(data.format_data.F10K)}}%</div>
              <div v-else>{{data.format_data.Throw}}</div>
              <!-- 首大龙+首肉山  翻盘 -->
              <div v-if="flag&&game_id==2">{{Math.ceil(data.format_data.Fbaron)}}%</div>
              <div v-else-if="flag&&game_id==1">{{Math.ceil(data.format_data.Fbarr)}}%</div>
              <div v-else>{{data.format_data.Comeback}}</div>
              <!-- 积分 -->
              <div>{{Math.ceil(data.score)}}{{data.format_data.FormBonus>0?'(+'+data.format_data.FormBonus+')':'('+data.format_data.FormBonus+')'}}</div>
              <router-link v-if="game_id==2" :to="{path:'/teaminfo',query:{team_id:data.team_id,team_name:data.format_data.TeamInfo.Name,region_logo:data.format_data.TeamInfo.Region.Logo,game_id:data.game_id}}" tag='div'>观看详情></router-link>
              <router-link v-else-if="game_id==1" :to="{path:'/teaminfo',query:{team_id:data.team_id,team_name:data.format_data.Team.Name,region_logo:data.format_data.Region.Logo,game_id:data.game_id}}" tag='div'>观看详情></router-link>
            </li>
            <!-- +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ -->
          </ul>
          <li v-else-if="!bool&&ischecked&&seachdata" class='search'>
            <div>
              <span>{{seachdata.format_data.Ranking}}</span>
            </div>
            <!-- teamlogo   teamname -->
            <div v-if='game_id==1'>
              <img :src="seachdata.format_data.Team.Logo" alt="">
              <span>{{seachdata.format_data.Team.Name}}</span>
            </div>
            <div v-else-if="game_id==2">
              <img :src="seachdata.format_data.TeamInfo.Logo" alt="">
              <span>{{seachdata.format_data.TeamInfo.Name}}</span>
            </div>
            <!-- 地区   20分钟塔数差 -->
            <div v-if="flag&&game_id==2">
              <img :src="seachdata.format_data.TeamInfo.Region.Logo" alt=""></div>
            <div v-else-if="flag&&game_id==1">
              <img :src="seachdata.format_data.Region.Logo" alt=""></div>
            <div v-else-if="!flag">{{seachdata.format_data.TowerDiffAt20}}</div>
            <!-- 胜率 20分钟龙数+20分钟经济数 -->
            <div v-if="flag">{{Math.ceil(seachdata.format_data.WinLoss)}}%</div>
            <div v-else-if="!flag&&game_id==2">{{seachdata.format_data.DragonAt20}}</div>
            <div v-else-if="!flag&&game_id==1">{{seachdata.format_data.NetWorthDiffAt20}}</div>
            <!-- 一血  25分钟经济差+30分钟经济差 -->
            <div v-if="flag">{{Math.ceil(seachdata.format_data.Fb)}}%</div>
            <div v-else-if="!flag&&game_id==2">{{seachdata.format_data.GoldDiffAt25}}</div>
            <div v-else-if="!flag&&game_id==1">{{seachdata.format_data.NetWorthDiffAt30}}</div>
            <!-- 一塔  首先峰+首近战兵营 -->
            <div v-if="flag">{{Math.ceil(seachdata.format_data.Ft)}}%</div>
            <div v-else-if="!flag&&game_id==2">{{seachdata.format_data.Fh}}</div>
            <div v-else-if="!flag&&game_id==1">{{seachdata.format_data.Fr}}</div>
            <!-- 一龙+首十杀  送掉比赛 -->
            <div v-if="flag&&game_id==2">{{Math.ceil(seachdata.format_data.Fd)}}%</div>
            <div v-else-if="flag&&game_id==1">{{Math.ceil(seachdata.format_data.F10K)}}%</div>
            <div v-else>{{seachdata.format_data.Throw}}</div>
            <!-- 首大龙+首肉山  翻盘 -->
            <div v-if="flag&&game_id==2">{{Math.ceil(seachdata.format_data.Fbaron)}}%</div>
            <div v-else-if="flag&&game_id==1">{{Math.ceil(seachdata.format_data.Fbarr)}}%</div>
            <div v-else>{{seachdata.format_data.Comeback}}</div>
            <!-- 积分 -->
            <div>{{Math.ceil(seachdata.score)}}{{seachdata.format_data.FormBonus>0?'(+'+seachdata.format_data.FormBonus+')':'('+seachdata.format_data.FormBonus+')'}}</div>
            <router-link v-if="game_id==2" :to="{path:'/teaminfo',query:{team_id:seachdata.team_id,team_name:seachdata.format_data.TeamInfo.Name,region_logo:seachdata.format_data.TeamInfo.Region.Logo,game_id:seachdata.game_id}}" tag='div'>观看详情></router-link>
            <router-link v-else-if="game_id==1" :to="{path:'/teaminfo',query:{team_id:seachdata.team_id,team_name:seachdata.format_data.Team.Name,region_logo:seachdata.format_data.Region.Logo,game_id:seachdata.game_id}}" tag='div'>观看详情></router-link>
          </li>
          <li v-else-if="!bool&&!ischecked" class="searchfalse">请输入正确的战队名称 lol为英文缩写 dota2为英文全称</li>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import Http from "../common/http";
export default {
  data() {
    return {
      flag: true,
      game_id: "",
      teamdata: [],
      page: 1,
      sw: true,
      bool: true,
      seachdata: {},
      ischecked: true
    };
  },
  methods: {
    changebg() {
      this.flag = !this.flag;
    },
    titletab(num, str) {
      this.$store.dispatch("newshotnewslistdispatch", num);
      this.$store.dispatch("newsteamrankdispatch", num);
      this.$store.dispatch("newsnumber10dispatch", num);
      this.$store.dispatch("setid", num);
      this.$store.dispatch("background", str);
    },
    getdata() {
      this.bool = true;
      this.game_id = this.$route.query.game_id;
      this.page = 1;
      Http.get(`/team/rank?game_id=${this.game_id}&size=15&page=1`)
        .then(response => {
          this.teamdata = response.data.data.items;
          if (Math.ceil(response.data.data.total / 15) - this.page < 1) {
            this.sw = false;
          }
          console.log(response.data.data, "下拉记载数据");
        })
        .catch(Http.onError);
    },
    scroll: function() {
      window.addEventListener("scroll", () => {
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
          console.log('高度比较判断')
          // 如果开关打开则加载数据
          if (this.sw) {
            console.log('开关判断',this.sw)
            // 将开关关闭
            this.page++;
            Http.get(
              `/team/rank?game_id=${this.game_id}&size=15&page=${this.page}`
            )
              .then(response => {
                this.teamdata = this.teamdata.concat(response.data.data.items);
                if (Math.ceil(response.data.data.total / 15) - this.page < 1) {
                  this.sw = false;
                }
              })
              .catch(Http.onError);
          }
        }
      });
    }
    // 搜索js
    // checked() {
    //   this.game_id = this.$route.query.game_id;
    //   Http.get(`/team/rank?game_id=${this.game_id}&size=200`)
    //     .then(response => {
    //       this.teamdata = response.data.data.items;
    //       console.log(4444444444444, this.teamdata);
    //     })
    //     .catch(Http.onError);
    //   let flag;
    //   setTimeout(() => {
    //     this.ischecked = true;
    //     this.bool = false;
    //     if (this.game_id == 1) {
    //       for (let data of this.teamdata) {
    //         if (
    //           this.$refs.input.value.toUpperCase().trim() ==
    //           data.format_data.Team.Name.toUpperCase().trim()
    //         ) {
    //           this.seachdata = data;
    //           flag = true;
    //           return this.seachdata;
    //         }
    //       }
    //       if (!flag) {
    //         this.ischecked = false;
    //         return this.ischecked;
    //       }
    //     } else {
    //       console.log(888, this.teamdata);
    //       for (let data of this.teamdata) {
    //         if (
    //           this.$refs.input.value.toUpperCase().trim() ==
    //           data.format_data.TeamInfo.Code
    //         ) {
    //           this.seachdata = data;
    //           flag = true;
    //           return this.seachdata;
    //         }
    //       }
    //       if (!flag) {
    //         this.ischecked = false;
    //         return this.ischecked;
    //       }
    //     }
    //   }, 500);
    // }
  },
  created() {
    this.getdata();
  },
  watch: {
    $route() {
      if (this.$route.path=='/teamdetail') {
        this.sw = true
        this.getdata();
      }
    }
  },
  mounted() {
    this.scroll();
    // ============================================

    // window.addEventListener("scroll", () => {
    //   let scrollTop =
    //     window.pageYOffset ||
    //     document.documentElement.scrollTop ||
    //     document.body.scrollTop;
    //   // console.log(
    //   //   document.documentElement.clientHeight +
    //   //     "-----------" +
    //   //     window.innerHeight
    //   // ); // 可视区域高度
    //   // console.log(scrollTop); // 滚动高度
    //   // console.log(document.body.offsetHeight); // 文档高度
    //   // 判断是否滚动到底部

    //   if (scrollTop + window.innerHeight >= document.body.offsetHeight) {
    //     // 如果开关打开则加载数据
    //     if (this.sw == true) {
    //       // 将开关关闭
    //       this.sw = false;
    //       this.page++;
    //       Http.get(
    //         `/team/rank?game_id=${this.game_id}&size=15&page=${this.page}`
    //       )
    //         .then(response => {
    //           this.teamdata = this.teamdata.concat(response.data.data.items);
    //           this.sw = true;
    //         })
    //         .catch(Http.onError);
    //     }
    //   }
    // });
  }
};
</script>

<style scoped lang='scss'>
#teamdetail {
  width: 100%;
  padding-bottom: 50px;
  .container {
    height: 100%;
    width: 1200px;
    margin: 0 auto;
    .title {
      width: 100%;
      height: 70px;
      text-align: left;
      line-height: 70px;
      color: #dcdcdc;
      .titlebg {
        width: 98px;
        height: 25px;
        float: left;
        margin-top: 23px;
        margin-right: 44px;
        margin-left: 8px;
        background: url("../assets/images/News-images/sprite.png") 0 -501px no-repeat;
      }
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
        color: #dcdcdc;
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
    .list {
      width: 100%;
      .listtitle {
        height: 55px;
        width: 100%;
        background: url("../assets/images/News-images/teamdetail-bg.png") 0 0
          repeat;
        ul {
          width: 100%;
          height: 55px;
          li {
            height: 55px;
            float: left;
            text-align: left;
            line-height: 55px;
            color: #fff;
            font-size: 14px;
            cursor: default;
            &:first-child {
              width: 80px;
              text-align: center;
            }
            &:nth-child(2) {
              width: 212px;
            }
            &:nth-child(3) {
              width: 112px;
            }
            &:nth-child(4) {
              width: 112px;
            }
            &:nth-child(5) {
              width: 112px;
            }
            &:nth-child(6) {
              width: 112px;
            }
            &:nth-child(7) {
              width: 100px;
            }
            &:nth-child(8) {
              width: 124px;
            }
            &:nth-child(9) {
              width: 112px;
            }
            &:nth-child(10) {
              width: 124px;
              cursor: pointer;
              background: url("../assets/images/News-images/sprite.png") 0 -731px
                no-repeat;
              &:hover {
                background: url("../assets/images/News-images/sprite.png") 0 -676px
                  no-repeat;
              }
            }
          }
        }
      }
      .listcontent {
        width: 100%;
        .search,
        .searchfalse {
          width: 100%;
          height: 700px;
          background-color: #292b2f;
          div {
            float: left;
            text-align: left;
            height: 50px;
            line-height: 50px;
            display: table-cell;
            vertical-align: middle;
            img {
              width: 34px;
              height: 34px;
              vertical-align: middle;
            }
            &:first-child {
              width: 80px;
              text-align: center;
              position: relative;
              color: #000;
              span {
                position: absolute;
                top: 14px;
                left: 26px;
                width: 24px;
                height: 24px;
                line-height: 24px;
                border-radius: 50%;
                background-color: #d9a35a;
              }
            }
            &:nth-child(2) {
              width: 212px;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
              span {
                display: inline-block;
                margin-left: 5px;
              }
            }
            &:nth-child(3) {
              width: 112px;
              img {
                width: 34px;
                height: 28px;
                vertical-align: middle;
              }
            }
            &:nth-child(4) {
              width: 112px;
            }
            &:nth-child(5) {
              width: 112px;
            }
            &:nth-child(6) {
              width: 112px;
            }
            &:nth-child(7) {
              width: 100px;
            }
            &:nth-child(8) {
              width: 124px;
            }
            &:nth-child(9) {
              width: 112px;
            }
            &:nth-child(10) {
              width: 82px;
              height: 24px;
              text-align: center;
              line-height: 20px;
              color: #dcdcdc;
              font-size: 14px;
              border: 1.5px solid #515459;
              border-radius: 41px;
              margin-top: 13px;
              &:hover {
                color: #d9a35a;
                border-color: #46392a;
              }
            }
          }
          &:nth-child(1) {
            div {
              &:first-child {
                div {
                  width: 24px;
                  height: 28px;
                  margin-left: 28px;
                  margin-top: 11px;
                  background: url("../assets/images/News-images/sprite.png") 0 -242px
                    no-repeat;
                }
              }
            }
          }
          &:nth-child(2) {
            div {
              &:first-child {
                div {
                  width: 24px;
                  height: 28px;
                  margin-left: 28px;
                  margin-top: 11px;
                  background: url("../assets/images/News-images/sprite.png") 0 -186px
                    no-repeat;
                }
              }
            }
          }
          &:nth-child(3) {
            div {
              &:first-child {
                div {
                  width: 24px;
                  height: 28px;
                  margin-left: 28px;
                  margin-top: 11px;
                  background: url("../assets/images/News-images/sprite.png") 0 -214px
                    no-repeat;
                }
              }
            }
          }
        }
        ul {
          width: 100%;
          height: 100%;
          .black {
            background-color: #15161a;
          }
          .gray {
            background-color: #1a1b1e;
          }
          li {
            width: 100%;
            height: 51px;
            cursor: default;
            &:hover {
              background: url("../assets/images/News-images/teamrank-hover.png");
            }
            div {
              float: left;
              text-align: left;
              height: 50px;
              line-height: 50px;
              display: table-cell;
              vertical-align: middle;
              img {
                width: 34px;
                height: 34px;
                vertical-align: middle;
              }
              &:first-child {
                width: 80px;
                text-align: center;
                position: relative;
                color: #dcdcdc;
                span {
                  position: absolute;
                  top: 14px;
                  left: 26px;
                  width: 24px;
                  height: 24px;
                  line-height: 24px;
                }
              }
              &:nth-child(2) {
                width: 212px;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                span {
                  display: inline-block;
                  margin-left: 5px;
                }
              }
              &:nth-child(3) {
                width: 112px;
                img {
                  width: 34px;
                  height: 28px;
                  vertical-align: middle;
                }
              }
              &:nth-child(4) {
                width: 112px;
              }
              &:nth-child(5) {
                width: 112px;
              }
              &:nth-child(6) {
                width: 112px;
              }
              &:nth-child(7) {
                width: 100px;
              }
              &:nth-child(8) {
                width: 124px;
              }
              &:nth-child(9) {
                width: 112px;
              }
              &:nth-child(10) {
                width: 82px;
                height: 24px;
                text-align: center;
                line-height: 20px;
                color: #dcdcdc;
                font-size: 14px;
                border: 1.5px solid #515459;
                border-radius: 41px;
                margin-top: 13px;
                margin-left: 20px;
                cursor: pointer;
                &:hover {
                  color: #e1bf75;
                  border-color: #ba9665;
                }
              }
            }
            &:nth-child(1) {
              div {
                &:first-child {
                  div {
                    width: 24px;
                    height: 28px;
                    margin-left: 28px;
                    margin-top: 11px;
                    background: url("../assets/images/News-images/sprite.png") 0 -242px
                      no-repeat;
                  }
                }
              }
            }
            &:nth-child(2) {
              div {
                &:first-child {
                  div {
                    width: 24px;
                    height: 28px;
                    margin-left: 28px;
                    margin-top: 11px;
                    background: url("../assets/images/News-images/sprite.png") 0 -186px
                      no-repeat;
                  }
                }
              }
            }
            &:nth-child(3) {
              div {
                &:first-child {
                  div {
                    width: 24px;
                    height: 28px;
                    margin-left: 28px;
                    margin-top: 11px;
                    background: url("../assets/images/News-images/sprite.png") 0 -214px
                      no-repeat;
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}
</style>
