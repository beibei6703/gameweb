<template>
  <div id="teamnews">
    <!-- 标题 -->
    <div class="title">
      <div class="titlebg"></div>
    </div>
    <!-- 内容 -->
    <div class="content" v-if="teamnews.items">
      <ul>
        <li v-for="(data,index) in teamnews.items" :key="index">
          <span class="newstitle">{{data.NewsTitle}}</span>
          <span class="newsdate">{{data.StartTime}}</span>
        </li>

      </ul>
    </div>
    <!-- 分页 -->
    <div id="page" v-if="teamnews.total>1&&teamnews.items">
      <div class="pagination" :style="{width:84+42*pagearr.length+'px'}">
        <div @click="turnUp" class="turnUp"><img src="../../assets/images/News-images/pageleft.png" alt=""></div>
        <div class="listdiv" v-for="(item,index) in pagearr" :key="index" @click="goto(item)" :class="{'active':page == item}">
          <a>{{item}}</a>
        </div>
        <div @click="turnDown" class="turnDown"><img src="../../assets/images/News-images/pageright.png" alt=""></div>
      </div>
    </div>
    <!-- 转会 -->
    <div class="nothing" v-if="!teamnews.total">这里还没有数据哟</div>
    <!-- <div class="changeteam">

    </div> -->
  </div>
</template>

<script>
import Http from "../../common/http";
export default {
  data() {
    return {
      teamnews: {},
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
        if (this.allpage >= 5) {
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
        Http.get(`/team/news?team_id=${this.teamId}&page=${this.page}&size=10`)
          .then(response => {
            this.teamnews = response.data.data;
          })
          .catch(Http.onError);
      }
    },
    turnDown() {
      if (this.page < this.allpage) {
        this.page++;
        if (this.allpage >= 5) {
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
        Http.get(`/team/news?team_id=${this.teamId}&page=${this.page}&size=10`)
          .then(response => {
            this.teamnews = response.data.data;
          })
          .catch(Http.onError);
      }
    },
    goto(index) {
      this.page = index;
      this.teamId = this.$store.state.news.team_id;
      Http.get(`/team/news?team_id=${this.teamId}&page=${this.page}&size=10`)
        .then(response => {
          this.teamnews = response.data.data;
        })
        .catch(Http.onError);
    },
    getData: function() {
      this.pagearr = [];
      this.teamId = this.$store.state.news.team_id;
      Http.get(`/team/news?team_id=${this.teamId}&page=${this.page}&size=10`)
        .then(response => {
          this.teamnews = response.data.data;
          console.log(this.teamnews);
          this.allpage = Math.ceil(this.teamnews.total / 10);
          if (this.allpage < 5) {
            while (this.allpage > 0) {
              this.pagearr.unshift(this.allpage);
              this.allpage--;
            }
          } else {
            this.pagearr = [1, 2, 3, 4, 5];
          }
          this.allpage = Math.ceil(this.teamnews.total / 10);
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
  }
};
</script>

<style scoped lang='scss'>
#teamnews {
  height: 1246px;
  width: 100%;
  padding-top: 45px;
  padding-right: 30px;
  padding-left: 30px;
  background-color: #1b1c1f;
  margin-bottom: 30px;
  position: relative;
  .title {
    height: 38px;
    width: 100%;
    .titlebg {
      width: 98px;
      height: 25px;
      margin-top: 7px;
      margin-left: 8px;
      background: url("../../assets/images/News-images/sprite.png") 0 -426px no-repeat;
    }
  }
  .content {
    width: 1146px;
    height: 502px;
    border: 1px solid #313131;
    margin-bottom: 35px;
    ul {
      width: 1144px;
      height: 500px;
      li {
        font-size: 15px;
        color: #dcdcdc;
        height: 50px;
        line-height: 50px;
        cursor: default;
        background-color: #131317;
        &:hover {
          color: #d9a35a;
        }
        &:nth-child(even) {
          background-color: #1b1c1f;
        }
        .newstitle {
          float: left;
          margin-left: 15px;
        }
        .newsdate {
          float: right;
          margin-right: 25px;
        }
      }
    }
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
  // .changeteam{
  //   margin-top:40px;
  // }
}
</style>
