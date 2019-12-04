<template>
  <div id="matchcenter">
    <div class="tab ">
      <ul class="cmcardtab">
        <li @click="tabs(0,'lol')" :class="{active:num==0}">
          <span class="cpic c2"></span>英雄联盟
        </li>
        <li @click="tabs(1,'dota')" :class="{active:num==1}">
          <span class="cpic c3"></span>DOTA2
        </li>
        <li @click="tabs(2,'csgo')" :class="{active:num==2}">
          <span class="cpic c5"></span>CSGO
        </li>
        <!-- <li @click="tabs(3,'pubg')" :class="{active:num==3}">
          <span class="cpic c4"></span>绝地求生
        </li> -->
        <li @click="tabs(7,'wzry')" :class="{active:num==3}">
          <span class="cpicc"></span>王者荣耀
        </li>
        <li @click="tabs(4,'football')" :class="{active:num==4}">
          <span class="cpic c6"></span>体育频道
        </li>
      </ul>
    </div>
    <div class="tabcontent">
      <ul>
        <!-- <router-link tag="li" to='/matchdetail'>
          <div class="state">
            未开始
            <div class="triangle"></div>
          </div>
          <div class="matchdetail">
            <div class="matchname">英雄联盟MSI</div>
            <div class="matchdate">2018.01.12-02.01</div>
          </div>
        </router-link> -->
        <router-link tag="li" :to="'/matchdetail/'+item.id" v-for="(item,index) in data.items" :key="index" :style="{background:'url('+item.logo+') center center / cover no-repeat'}">
          <div class="state" :style="{backgroundColor:item.status=='open'?'#4b8cd9':item.status=='wait'?'#4b8cd9':item.status=='end'?'#727273':'#cda433'}">
            {{item.status=='open'?'未开始':item.status=='wait'?'即将开始':item.status=='end'?'已结束':'进行中'}}
            <div class="triangle" :style="{borderColor:item.status=='open'?'#4b8cd9 #4b8cd9 transparent #4b8cd9':item.status=='wait'?'#4b8cd9 #4b8cd9 transparent #4b8cd9':item.status=='end'?'#727273 #727273 transparent #727273':'#cda433 #cda433 transparent #cda433'}"></div>
          </div>
          <div class="matchdetail">
            <div class="matchname">{{item.name}}</div>
            <div class="matchdate">{{item.started_at.substr(0,4)}}.{{item.started_at.substr(5,2)}}.{{item.started_at.substr(8,2)}}-{{item.ended_at.substr(5,2)}}.{{item.ended_at.substr(8,2)}}</div>
          </div>
        </router-link>
      </ul>
      <!-- 分页 -->
      <div id="page" v-if="total>1">
        <div class="pagination" :style="{width:84+42*pagearr.length+'px'}">
          <div @click="turnUp" class="turnUp"><img src="../assets/images/News-images/pageleft.png" alt=""></div>
          <div class="listdiv" v-for="(item,index) in pagearr" :key="index" @click="goto(item)" :class="{'active':page == item}">
            <a>{{item}}</a>
          </div>
          <div @click="turnDown" class="turnDown"><img src="../assets/images/News-images/pageright.png" alt=""></div>
        </div>
      </div>
      <div class="nothing" v-if="!total">这里还没有数据哟</div>
    </div>
  </div>
</template>

<script>
import Http from "../common/http";
export default {
  data() {
    return {
      num: 0,
      data: {},
      total:'',
      page: 1,
      allpage: "",
      pagearr: [],
      gameid:'lol'
    };
  },
  methods: {
    tabs(index, gamename) {
      this.page = 1
      this.num = index;
      this.gameid = gamename
      this.getdata(gamename, 1);
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
        Http.get(`/match/list?game=${this.gameid}&page=${this.page}`)
          .then(response => {
            this.data = response.data.data;
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
        Http.get(`/match/list?game=${this.gameid}&page=${this.page}`)
          .then(response => {
            this.data = response.data.data;
          })
          .catch(Http.onError);
      }
    },
    goto(item) {
      this.page = item;
      Http.get(`/match/list?game=${this.gameid}&page=${item}`)
        .then(response => {
          this.data = response.data.data;
        })
        .catch(Http.onError);
    },
    getdata(gamename, page) {
      // 联赛列表数据
      this.pagearr = []
      Http.get(`/match/list?game=${gamename}&page=${page}`)
        .then(response => {
          this.data = response.data.data;
          this.total = this.data.meta.total
          console.log(this.data, "data");
          this.allpage = this.data.meta.total_page;
          if (this.allpage < 5) {
            while (this.allpage > 0) {
              this.pagearr.unshift(this.allpage);
              this.allpage--;
            }
          } else {
            this.pagearr = [1, 2, 3, 4, 5];
          }
          this.allpage = this.data.meta.total_page;
        })
        .catch(Http.onError);
    }
  },
  created() {
    this.getdata("lol", 1);
  }
};
</script>

<style scoped lang="scss">
#matchcenter {
  min-height: 1000px;
  padding-top: 15px;
  padding-left: 20px;
  padding-right: 20px;
  .tab {
    height: 48px;
    margin-bottom: 18px;
  }
  .cmcardtab{//预测选项
    height:46px ;
    overflow: hidden;
    text-align: center;
    display: flex;
    justify-content: space-between;
    li{
        float: left;
        line-height: 45px;
        width:20%;
        color:#dcdcdc;
        font-size: 14px;
        text-align: left;
        background: url("../assets/images/custom.png") no-repeat;
        background-position: -145px -55px;
        &:nth-child(1){
            text-align: center;
        }
        &:hover{
            background: url("../assets/images/custom.png") no-repeat;
            background-position: -441px -0px;
            .cpic{
                background: url("../assets/images/custom.png") no-repeat;
                display: inline-block;
            }
            .cpicc{
              background: url("../assets/images/matchcenter/wzry_icon_lh.png") no-repeat;
            }
            .c2{
                background-position: -160px 2px;
                width:24px;
                height: 24px;
            }
            .c3{
                background-position: -108px 0px;
            }
            .c4{
                background-position: -220px 0px;
            }
            .c5{
                background-position: -82px 0px;
            }
            .c7{
                background-position: -82px 0px;
            }
        }
        .hcleft{
            float:left;
        }
    }
    .cpic{
        display: inline-block;
        width: 18px;
        height: 18px;
        margin-bottom: -6px;
        background: url("../assets/images/custom.png") no-repeat;
    }
    .cpicc{
      display: inline-block;
      width: 32px;
      height: 22px;
      margin:0 0 -6px 64px;
      background: url("../assets/images/matchcenter/wzry_icon.png") no-repeat;
    }
    .c2{
        background-position:-194px 5px;
        width:24px;
        height: 24px;
        margin-left: 8px;
    }
    .c3{
          margin-left: 88px;
          margin-right:6px;
          background-position: -134px 0px;
          width:16px;
    }
    .c4{
          background-position: -258px 0px;
          width:28px;
          margin-left: 76px;
          margin-right: 4px;
    }
    .c5{
          margin-left: 96px;
          margin-right:5px;
          background-position: -56px 0px;
          width:16px;
    }
    .c6{
          margin-left: 78px;
          margin-right: 5px;
          background-position: -28px 0px;
    }
    .c7{
          margin-left: 78px;
          margin-right: 5px;
          background-position: -28px 0px;
    }
}

  .tabcontent {
    min-height: 1000px;
    margin-bottom:100px;
    ul {
      li {
        position: relative;
        float: left;
        width: 260px;
        height: 240px;
        border-radius: 2px;
        background-color: #fff;
        margin-bottom: 100px;
        margin-right: 40px;
        &:nth-child(4n) {
          margin-right: 0;
        }
        .state {
          position: absolute;
          font-size: 12px;
          font-weight: bold;
          line-height: 40px;
          text-align: center;
          right: 13px;
          top: 0;
          width: 48px;
          height: 40px;
          color:#fff;
          background-color: #4b8cd9;
          .triangle {
            position: absolute;
            left: 0;
            bottom: -10px;
            width: 0;
            height: 0;
            border-style: solid;
            border-width: 0 24px 10px 24px;
            border-color: #4b8cd9 #4b8cd9 transparent #4b8cd9;
          }
        }
        .matchdetail {
          position: absolute;
          bottom: -50px;
          left: 0;
          width: 260px;
          height: 40px;
          color: #fff;
          .matchname {
            font-size: 15px;
            font-weight: bold;
            line-height: 15px;
            margin-bottom: 10px;
          }
          .matchdate {
            font-size: 12px;
          }
        }
      }
    }
    #page {
      height: 39px;
      top:1040px;
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
      font-size: 20px;
      color: #989898;
      top:500px;
      left: 50%;
      transform: translateX(-50%);
      position: absolute;
    }
  }
}
</style>
