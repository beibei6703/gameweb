<template>
  <div id="herosrank" v-if="gameid==2">
    <!-- 标题 -->
    <div class="title">
      <div class="titlebg"></div>
    </div>
    <!-- 英雄排名列表 -->
    <div class="list">
      <div>
        <ul class="listtitle">
          <li v-for="(item,index) in tabs" :key="index" :class="index==num?'yellow':'white'" @click="tab(index)">
            {{item}}
          </li>
        </ul>
        <!-- +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ -->
        <ul class="content">
          <li v-for="(data,index) in newsherosrankpick" :key="index">
            <div class="rank">
              <span>{{data.place}}</span>
            </div>
            <div class="heropic" :style="{background:'url('+'https://imgcdn.api.com/img/champion32.png'+') 0 '+data.img_num+'px'}"></div>
            <div class="heroname">
              <span>{{data.name}}</span>
            </div>
            <div class="strip">
              <span class="box" :style="{width:Math.ceil(Math.ceil(data.share)*139/100)+'px'}"></span>
            </div>
            <div class="number">
              <span>{{Math.ceil(data.share)}}%</span>
            </div>
          </li>
        </ul>
        <!-- ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ -->
      </div>
    </div>
  </div>
</template>

<script>
let statuser;
export default {
  data() {
    return {
      tabs: ["使用率", "禁用率"],
      num: 0,
      status: ["1", "2"]
    };
  },
  mounted() {
    statuser = {
      status: this.status[this.num]
    };

    if (!this.$store.state.news.newsherosrankpick) {
      this.$store.dispatch("newsherosrankpickdispatch", statuser);
    }
  },
  computed: {
    newsherosrankpick: function() {
      return this.$store.state.news.newsherosrankpick
        ? this.$store.state.news.newsherosrankpick
        : null;
    },
    gameid: function() {
      return this.$store.state.news.gameid;
    }
  },
  methods: {
    tab(index) {
      this.num = index;
      statuser = {
        status: this.status[this.num]
      };
      this.$store.dispatch("newsherosrankpickdispatch", statuser);
    }
  }
};
</script>
<style scoped lang='scss'>
#herosrank {
  width: 380px;
  height: 550px;
  margin-top: 69px;
  margin-bottom: 30px;
  .title {
    width: 98px;
    height: 25px;
    margin-left: 8px;
    margin-bottom: 15px;
    .titlebg {
      width: 98px;
      height: 25px;
      background: url("../../assets/images/News-images/sprite.png") 0 -651px no-repeat;
    }
  }
  .list {
    height: 513px;
    width: 380px;
    .listtitle {
      height: 43px;
      width: 380px;
      .yellow {
        color: #d9a35a;
      }
      .white {
        color: #fff;
      }
      li {
        background-color: #15161a;
        float: right;
        width: 190px;
        font-size: 16px;
        line-height: 43px;
        text-align: center;
        &:nth-child(1) {
          width: 189px;
          float: left;
        }
      }
    }
    .content {
      width: 380px;
      height: 470px;
      li {
        height: 46px;
        margin-top: 1px;
        width: 380px;
        background-color: #15161a;
        line-height: 46px;
        cursor: default;
        div {
          float: left;
        }
        .rank {
          width: 60px;
          height: 100%;
        }
        .heropic {
          width: 30px;
          height: 30px;
          border-radius: 50%;
          margin-top: 8px;
          margin-right: 5px;
        }
        .heroname {
          width: 94px;
          height: 100%;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .strip {
          width: 139px;
          height: 20px;
          border: 1px solid #a48d5b;
          line-height: 20px;
          margin-top: 14px;
          text-align: left;
          span {
            display: inline-block;
            width: 22%;
            height: 100%;
            background-color: #352c23;
          }
        }
        .number {
          width: 57px;
          height: 100%;
          margin-left: -5px;
        }
      }
    }
  }
}
</style>
