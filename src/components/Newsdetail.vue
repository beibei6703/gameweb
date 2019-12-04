<template>
  <div id="newsdetail">
    <div class="container">
      <div class="left">
        <div class="title">
          <span>您的位置 :
            <router-link :to="{path:'/news'}" @click.native="titletab(2,require('@/assets/images/News-images/news-lolbg.jpg'))" tag='u'>资讯首页</router-link> 》
            <router-link v-if="game_id==1" :to="{path:'/news'}" @click.native="titletab(1,require('@/assets/images/News-images/news-dota2bg.jpg'))" tag='u'>DOTA2</router-link>
            <router-link v-else-if="game_id==2" :to="{path:'/news'}" @click.native="titletab(2,require('@/assets/images/News-images/news-lolbg.jpg'))" tag='u'>英雄联盟</router-link>
            <router-link v-else-if="game_id==4" :to="{path:'/news'}" @click.native="titletab(4,require('@/assets/images/News-images/news-pubgbg.jpg'))" tag='u'>绝地求生</router-link>
            <router-link v-else-if="game_id==3" :to="{path:'/news'}" @click.native="titletab(3,require('@/assets/images/News-images/news-csgobg.jpg'))" tag='u'>CSGO</router-link>
            》
            <span class="yellow">热门资讯</span>
          </span>
        </div>
        <!-- 文章 -->
        <div class="article">
          <div class="articletitle">
            <h3>{{articleinfo.title}}</h3>
            <div class="from" v-if="articleinfo.publish_time">
              <span>{{articleinfo.publish_time.substr(0,16)}}</span>
              <span>来源 : {{articleinfo.from_source}}</span>
              <span v-if="articleinfo.editor_name">作者 : {{articleinfo.editor_name}}</span>
            </div>
          </div>
          <div class="articlecontent" v-html="articleinfo.content"></div>
        </div>

      </div>
      <!-- +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ -->
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
      game_id: "",
      article_id: "",
      articleinfo: {}
    };
  },
  components: {
    Hotcompete,
    Teamrank
  },
  created() {
    this.getData();
    // require("../assets/comment/comment");
    // require("../assets/comment/commentapi");
  },
  methods: {
    getData() {
      this.game_id = this.$route.query.game_id;
      this.article_id = this.$route.query.article_id;
      Http.get(`/news/detail?&article_id=${this.article_id}`)
        .then(response => {
          this.articleinfo = response.data.data;
          document.title = this.articleinfo.title + "-丰收网";
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
      if (this.$route.query.article_id) {
        this.getData();
      }
    }
  }
};
</script>

<style scoped lang='scss'>
.container {
  width: 1200px;
  margin: 0 auto;
  // height: 2500px;
  .left {
    float: left;
    width: 800px;
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
    .article {
      background-color: #15161a;
      margin-bottom: 30px;
      .articletitle {
        width: 742px;
        height: 170px;
        margin: 0 auto;
        padding-left: 12px;
        text-align: left;
        border-bottom: 1px solid #313131;
        h3 {
          width: 100%;
          height: 24px;
          font-size: 24px;
          color: #dcdcdc;
          padding-top: 56px;
          margin-bottom: 64px;
        }
        .from {
          height: 20px;
          width: 100%;
          span {
            font-size: 12px;
            float: left;
            line-height: 20px;
            color: #989898;
            &:nth-child(1) {
              width: 162px;
            }
            &:nth-child(2) {
              width: 100px;
            }
            &:nth-child(3) {
              float: right;
              margin-right: 30px;
              width: 100px;
            }
          }
        }
      }
      .articlecontent {
        width: 742px;
        margin: 0 auto;
        text-align: left;
        padding-top: 35px;
        font-size: 16px;
        color: #dcdcdc;
        line-height: 34px;
        // text-indent: 2em;
        margin-top: 50px;
      }
      .share {
        height: 70px;
        width: 100%;
        color: #989898;
        margin-top: 30px;
        font-size: 16px;
        padding-left: 22px;
        text-align: left;
      }
    }
    // .commenttitle {
    //   height: 40px;
    //   width: 100%;
    //   margin-top: 30px;
    //   background: url("../assets/images/News-images/sprite.png") 0 -576px no-repeat;
    // }
  }
  .right {
    float: right;
  }
}
</style>
