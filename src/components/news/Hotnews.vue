<template>
  <div id="newshotnews">
    <!-- 标题 -->
    <div class="title">
      <div class="titlebg"></div>
      <router-link tag='span' :to="{name:'newslist',query:{game_id:gameid}}" @click.native="bgimage(require('@/assets/images/background.jpg'))">更多
        <i class="border"></i>
      </router-link>
    </div>
    <!-- 列表 -->
    <div class="list">
      <ul>
        <router-link :to="{name:'newsdetail',query:{article_id:data.id,game_id:gameid}}" tag='li' v-for="(data,index) in newshotnewslist" :key="index" @click.native="bgimage(require('@/assets/images/background.jpg'))">
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
  </div>
</template>

<script>
export default {
  methods: {
    bgimage(str) {
      this.$store.dispatch("background", str);
    }
  },
  mounted() {
    if (!this.$store.state.news.newshotnewslist) {
      this.$store.dispatch("newshotnewslistdispatch");
    }
  },
  computed: {
    newshotnewslist: function() {
      return this.$store.state.news.newshotnewslist
        ? this.$store.state.news.newshotnewslist
        : null;
    },
    gameid: function() {
      console.log(this.$store.state.news.gameid,'hotnews')
      return this.$store.state.news.gameid;
    }
  }
};
</script>

<style scoped lang='scss'>
#newshotnews {
  margin-top: 30px;
  .title {
    width: 800px;
    height: 25px;
    margin-bottom: 15px;
    color: #989898;
    font-size: 12px;
    line-height: 25px;
    text-align: right;
    .titlebg {
      width: 98px;
      height: 25px;
      float: left;
      margin-left: 8px;
      background: url("../../assets/images/News-images/sprite.png") 0 -476px no-repeat;
    }
    span {
      cursor: pointer;
      float: right;
      &:hover {
        color: #e1bf75;
        .border {
          font-size: 0;
          line-height: 0;
          border-width: 5px;
          border-color: #e1bf75;
          border-right-width: 0;
          border-style: dashed;
          border-left-style: solid;
          border-top-color: transparent;
          border-bottom-color: transparent;
          display: inline-block;
          margin-left: 2px;
          margin-right: 2px;
        }
      }
      .border {
        font-size: 0;
        line-height: 0;
        border-width: 5px;
        border-color: #989898;
        border-right-width: 0;
        border-style: dashed;
        border-left-style: solid;
        border-top-color: transparent;
        border-bottom-color: transparent;
        display: inline-block;
        margin-left: 2px;
        margin-right: 2px;
      }
    }
  }
  .list {
    width: 800px;
    height: 995px;
    ul {
      width: 800px;
      height: 995px;
      li {
        height: 163px;
        width: 800px;
        margin-bottom: 2px;
        background-color: #15161a;
        &:hover {
          background: url("../../assets/images/News-images/hotnews-hover.png");
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
          width: 600px;
          height: 124px;
          float: left;
          margin-top: 30px;
          padding-left: 56px;
          padding-right:30px;
          text-align: left;
          h3 {
            font-size: 20px;
            line-height: 36px;
            color: #e1c076;
            margin-top: -12px;
            margin-bottom: 14px;
          }
          .newslist-summary {
            color: #dcdcdc;
            line-height:20px;
            font-size: 14px;
          }
        }
      }
    }
  }
}
</style>
