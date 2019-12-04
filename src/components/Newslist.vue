<template>
  <div id="newslist">
    <div class="container">
      <div class="left">
        <div class="title" v-if="allpage">
          <span>您的位置 :
            <router-link :to="{path:'/news',query:{currentLi:2}}" @click.native="titletab(2,require('@/assets/images/News-images/news-lolbg.jpg'))" tag='u'>资讯首页</router-link> 》
            <router-link v-if="game_id==1" :to="{path:'/news',query:{currentLi:1}}" @click.native="titletab(1,require('@/assets/images/News-images/news-dota2bg.jpg'))" tag='u'>DOTA2</router-link>
            <router-link v-else-if="game_id==2" :to="{path:'/news',query:{currentLi:2}}" @click.native="titletab(2,require('@/assets/images/News-images/news-lolbg.jpg'))" tag='u'>英雄联盟</router-link>
            <router-link v-else-if="game_id==4" :to="{path:'/news',query:{currentLi:4}}" @click.native="titletab(4,require('@/assets/images/News-images/news-pubgbg.jpg'))" tag='u'>绝地求生</router-link>
            <router-link v-else-if="game_id==3" :to="{path:'/news',query:{currentLi:3}}" @click.native="titletab(3,require('@/assets/images/News-images/news-csgobg.jpg'))" tag='u'>CSGO</router-link>
            》
            <span class="yellow">热门资讯</span>
          </span>
        </div>
        <!-- 列表 -->
        <div class="list">
          <ul>
            <router-link :to="{name:'newsdetail',query:{article_id:data.id,game_id:data.game_id}}" tag='li' v-for="(data,index) in articlelist.items" :key="index" @click.native="bgimage(require('../assets/images/background.jpg'))">
              <div class="newspic">
                <img :src="data.picture">
              </div>
              <div class="newsinfo">
                <h3>{{data.title}}</h3>
                <p class="newslist-summary">{{data.summary}}</p>
              </div>
            </router-link>
          </ul>
        </div>
        <!-- 分页 -->
        <div id="page" v-if="allpage>1">
          <div class="pagination" :style="{width:84+42*pagearr.length+'px'}">
            <div @click="turnUp" class="turnUp"><img src="../assets/images/News-images/pageleft.png" alt=""></div>
            <div class="listdiv" v-for="(item,index) in pagearr" :key="index" @click="goto(item)" :class="{'active':page == item}">
              <a>{{item}}</a>
            </div>
            <div @click="turnDown" class="turnDown"><img src="../assets/images/News-images/pageright.png" alt=""></div>
          </div>
        </div>
        <div class="nothing" v-if="!allpage">这里还没有数据哟</div>
      </div>
      <!-- left end -->
      <div class="right">
        <Hotcompete></Hotcompete>
        <Teamrank></Teamrank>
      </div>
    </div>
  </div>
</template>

<script>
import Http from "../common/http";
import Hotcompete from "./news/Hotcompete";
import Teamrank from "./news/Teamrank";
export default {
  data() {
    return {
      articlelist: {},
      game_id: 1,
      // 分页
      page: 1,
      allpage: 0,
      pagearr: []
    };
  },
  components: {
    Hotcompete,
    Teamrank
  },
  methods: {
    bgimage(str) {
      this.$store.dispatch("background", str);
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
        this.game_id = this.$route.query.game_id;
        Http.get(`/news/list?page=${this.page}&size=10&game_id=${this.game_id}`)
          .then(response => {
            this.articlelist = response.data.data;
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
        this.game_id = this.$route.query.game_id;
        Http.get(`/news/list?page=${this.page}&size=10&game_id=${this.game_id}`)
          .then(response => {
            this.articlelist = response.data.data;
          })
          .catch(Http.onError);
      }
    },
    goto(index) {
      this.page = index;
      this.game_id = this.$route.query.game_id;
      Http.get(`/news/list?page=${this.page}&size=10&game_id=${this.game_id}`)
        .then(response => {
          this.articlelist = response.data.data;
        })
        .catch(Http.onError);
    },
    getData() {
      this.game_id = this.$route.query.game_id;
      this.pagearr = [];
      Http.get(`/news/list?page=${this.page}&size=10&game_id=${this.game_id}`)
        .then(response => {
          this.articlelist = response.data.data;
          console.log(this.articlelist, 888);
          this.allpage = Math.ceil(this.articlelist.total / 10);
          if (this.allpage < 5) {
            while (this.allpage > 0) {
              this.pagearr.unshift(this.allpage);
              this.allpage--;
            }
          } else {
            this.pagearr = [1, 2, 3, 4, 5];
          }
          this.allpage = Math.ceil(this.articlelist.total / 10);
        })
        .catch(Http.onError);
    },
    titletab(num, str) {
      this.$store.dispatch("newshotnewslistdispatch", num);
      this.$store.dispatch("newsteamrankdispatch", num);
      this.$store.dispatch("newsnumber10dispatch", num);
      this.$store.dispatch("setid", num);
      this.$store.dispatch("background", str);
    }
  },
  watch: {
    $route() {
      if (this.$route.path == "/newslist") {
        this.getData();
        this.page = 1;
      }
    }
  },
  created() {
    this.getData();
  }
};
</script>

<style scoped lang='scss'>
.container {
  width: 1200px;
  margin: 0 auto;
  .left {
    float: left;
    width: 800px;
    position: relative;
    .title {
      width: 800px;
      height: 65px;
      margin-top: 24px;
      background-color: #101114;
      line-height: 65px;
      text-align: left;
      padding-left: 22px;
      font-size: 14px;
      color: #989898;
      u {
        cursor: pointer;
      }
      .yellow {
        color: #d9a35a;
      }
    }
    .list {
      width: 800px;
      ul {
        width: 800px;
        li {
          height: 163px;
          width: 800px;
          margin-bottom: 2px;
          background-color: #15161a;
          &:hover {
            background: url("../assets/images/News-images/hotnews-hover.png");
          }
          &:last-child {
            margin-bottom: 0px;
          }
          .newspic {
            float: left;
            width: 200px;
            height: 124px;
            img {
              width: 200px;
              height: 124px;
              margin-top: 20px;
              margin-left: 30px;
            }
          }
          .newsinfo {
            width: 422px;
            height: 124px;
            float: left;
            margin-top: 26px;
            margin-left: 56px;
            text-align: left;
            h3 {
              font-size: 24px;
              color: #d9a35a;
              line-height: 32px;
              margin-bottom: 26px;
            }
            .newslist-summary {
              color: #aaaaab;
              line-height: 20px;
              font-size: 14px;
            }
          }
        }
      }
    }
    #page {
      height: 100px;
      background-color: #15161a;
      position: relative;
      margin-bottom: 50px;
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
  .right {
    float: right;
  }
}
</style>
