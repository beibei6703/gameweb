<template>
  <div id="logonolog">
    <div class="title">
      <ul class="titleul">
        <li class="fleft">时间</li>
        <li class="fleft">登录IP</li>
        <li class="fleft">登录城市</li>
      </ul>
    </div>
    <div class="content">
      <ul class="contentul" v-if="resultData.items">
        <li v-for="(data) in resultData.items" :key="data.id">
          <p class="time info fleft">{{data.created_at}}</p>
          <p class="ip info fleft">{{data.ip}}</p>
          <p class="city info fleft">{{data.address}}</p>
        </li>
      </ul>
    </div>
    <!-- 分页 -->
    <Pagination :currentPage.sync="page" :page-no="allpage" @change="goto" v-if="allpage>1"></Pagination>
    <div class="nothing" v-if="!this.allpage">这里还没有数据哟</div>
  </div>
</template>
<script>
import Http from "../../../common/http";
export default {
  data() {
    return {
      // 分页
      page: 1,
      allpage: 0,
      pagearr: [],
      resultData: {
        items: [
          {
            id: 0,
            ip: "",
            address: "",
            created_at: ""
          }
        ],
        meta: {
          total: 125,
          total_page: 9,
          has_more: true
        }
      }
    };
  },
  created() {
    this.getData();
  },
   updated() {
    document.documentElement.scrollTop = "0px";
    document.body.scrollTop = "0px";
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
        Http.get(`/loginHistories?page=${this.page}`)
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
        Http.get(`/loginHistories?page=${this.page}`)
          .then(response => {
            this.resultData = response.data.data;
          })
          .catch(Http.onError);
      }
    },
    goto(item) {
      this.page = item;
      Http.get(`/loginHistories?page=${this.page}`)
        .then(response => {
          this.resultData = response.data.data;
        })
        .catch(Http.onError);
    },
    getData() {
      this.page = 1;
      this.pagearr = [];
      Http.get(`/loginHistories?page=${this.page}`)
        .then(response => {
          this.resultData = response.data.data;
          console.log(this.resultData, 89898989898989);
          this.allpage = this.resultData.meta.total_page;
          if (this.allpage < 5) {
            while (this.allpage > 0) {
              this.pagearr.unshift(this.allpage);
              this.allpage--;
            }
          } else {
            this.pagearr = [1, 2, 3, 4, 5];
          }
          this.allpage = this.resultData.meta.total_page;
        })
        .catch(Http.onError);
    }
  }
};
</script>
<style lang="scss" scoped>
#logonolog {
  height: 100%;
  margin: 0 24px 0 20px;
  position: relative;
  .title {
    height: 34px;
    margin-top: 12px;
    .titleul {
     height:34px;
     line-height: 34px;
     background:rgba(102,102,102,1);
     color:rgba(33,32,38,1);
      li {
        width: 290px;
        text-align: center;
      }
    }
  }
  .content {
    min-height: 58px;
    .contentul {
      min-height: 58px;
      li {
        height: 100px;
        line-height: 100px;
        font-size: 14px;
        &:nth-child(odd){
          background:rgba(51,50,55,1);
        }
        &:nth-child(even){
          background:rgba(54,53,58,1);
        }
      }
      .info {
        width: 290px;
        text-align: center;

      }
    }
  }
  #page {
    width: 868px;
    height: 39px;
    margin:30px 0;
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


