<template>
  <div id="myinfovue">
    <div class="top">
      <ul class="navarul">
        <li v-for="(item,index) in dataMenu" :class="{active:index == num} " @click="tab(index,1)" :key="index">{{item}}</li>
      </ul>
      <div class="edit">
        <div class="testletter  pointer" @click="handleedit()" v-if="level.level<4">编辑</div>
        <router-link tag="div" to="/mygrand/letterinstation" class="testletter  pointer "  v-if="level.level>=4">
         编辑
        </router-link>
      </div>
      <div class="tabCon">
        <div>
          <div class="wrap">
            <ul class="contentul" v-if="emaildata">
              <li v-for="(data) in emaildata.items" :key="data.id" @click="topickup(data.content,data.id,data.status,data.message_type,$event,0)" >
                <div class="envelope fleft">
                  <img src="../../../assets/images/mygrand/letter_email.png" alt="" class="letter" v-if="data.status==0">
                  <img src="../../../assets/images/mygrand/opend_email.png" alt="" class="openletter" v-if="data.status==1">
                  <!-- 0未领取，1已领取 -->
                  <p class="redpoint" v-if="data.status==0"></p>
                </div>
                <!-- <img :src="data.from.avatar" alt="" class="sendpic fleft"> -->
                <p class="highlightname fleft" style="font-size:14px;" v-if="data.status==0">{{data.from.nickname}}</p>
                <p class="sendname fleft" style="font-size:14px;" v-if="data.status==1">{{data.from.nickname}}</p>
                <span class="line blackline fleft">|</span>
                <!-- <span class="line whiteline fleft">|</span> -->
                <p class="highlightname highlighttitle fleft" v-if="data.status==0" style="font-size:14px;">{{data.content[0].title}}</p>
                <p class="sendname sendcontent fleft" v-if="data.status==1" style="font-size:14px;">{{data.content[0].title}}</p>
                <p class="highlightime fright" v-if="data.status==0">{{data.created_at.substring(0,16)}}</p>
                <p class="sendtime fright" v-if="data.status==1">{{data.created_at.substring(0,16)}}</p>
              </li>
            </ul>
            <!-- 分页 -->
            <Pagination :currentPage.sync="page" :page-no="allpage" @change="goto" v-if="allpage>1"></Pagination>
            <div class="nothing" v-if="allpage==0">这里还没有数据哟</div>
          </div>
        </div>
      </div>
    </div>
    <div class="email">
      <Emailinfo @reloadData="reloadData"></Emailinfo>
    </div>
    <div class="failshow" v-show="this.$store.state.home.whats">
      <Fail></Fail>
    </div>
  </div>
</template>
<script>
import Http from "../../../common/http";
export default {
  data() {
    return {
      dataMenu: ["全部", "未读", "已读"],
      num: 0,
      media: 2,
      getallemaildata: null,
      getunreademaildata: null,
      getreademaildata: null,
      // 分页
      page: 1,
      resultData: {}
    };
  },
   updated() {
    document.documentElement.scrollTop = "0px";
    document.body.scrollTop = "0px";
  },
  methods: {
    tab(index,page) {
      this.num = index;
      this.page = page;
      this.$store.commit('sendMyEmailParams',{
        page:page,
        category: index
      })
      this.$store.dispatch("getemaildis",this.$store.state.home.myInforation);
    },
    topickup(content, id, status, ftype, event, nums) {
      // console.log(event.currentTarget.childNodes);
      var ele = event.currentTarget;
      let payload = {
        type:this.num,
        page:this.page
      }
      this.$store.commit('emailType',payload);
      this.media = id;
      if (ftype != 3 && ftype != 5) {
        this.$store.dispatch("taghasbeenreaddis", {
          message_id: id
        });
         this.$store.dispatch("getemaildis",this.$store.state.home.myInforation)
         this.$store.commit('echostatusmu',1)
      }
      this.$store.commit("isSigninDiaShowDis", true);
      this.$store.commit("emaildialogcontent", {
        content: content,
        message_id: id,
        status: status,
        ftype: ftype,
        nums: nums
      });
    },
    reloadData: function() {
      this.$store.dispatch("getemaildis",this.$store.state.home.myInforation);
    },
    loadData: function() {
      var self = this;
    },
    goto(item) {
      this.page = item;
      this.$store.commit('sendMyEmailParams',{
        page:item,
        category: this.$store.state.home.myInforation.category
      })
      this.$store.dispatch("getemaildis",this.$store.state.home.myInforation)
    },
    handleedit(){
      setTimeout(()=>{
          if(this.$store.state.user.userInfo.level<4){
            this.$store.commit('backendclose',true)
            this.$store.commit('worldtakstatus','当前等级不足,需LV4才可使用该功能')
            return
          }
      },300)
    },
  },
   computed: {
    emaildata:function(){
      return this.$store.state.home.myInforationer?this.$store.state.home.myInforationer:null;
    },
    allpage:function(){
      return this.$store.state.home.myEmailPage;
    },
    pagearr() {
      let pageStart = 1;
      let pageEnd = this.allpage;
      let pageItem = [];
      if (this.allpage == 0) return [];
      if (this.allpage >= 5) {
        if (this.page > 3 && this.page < this.allpage - 2) {
          pageStart = this.page - 2;
          pageEnd = this.page + 2;
        } else {
          if (this.page <= 3) {
            pageStart = 1;
            pageEnd = 5;
          } else {
            pageEnd = this.allpage;
            pageStart = this.allpage - 4;
          }
        }
      }
      while (pageStart <= pageEnd) {
        pageItem.push(pageStart);
        pageStart++;
      }
      return pageItem;
    },
    level:function(){
      return this.$store.state.user.userInfo? this.$store.state.user.userInfo : null
    }
  },
};
</script>
<style lang="scss" scoped>
#myinfovue {
  padding: 0 42px 0 20px;
  position: relative;

  .highlightname {
    color: #dcdcdc !important;
    font-size: 16px;
    color: #676768;
    margin-right: 16px;
  }
  .highlighttitle {
    margin-left: 16px;
  }
  .highlightime {
    color:rgba(252,252,255,1);
    font-size: 12px;
  }
  .top{
    position: relative;
    .testletter{
      width:54px;
      height:24px;
      line-height: 24px;
      font-size: 14px;
      color:rgba(220,220,220,1);
      border:1px solid rgba(149,149,149,1);
      border-radius:4px;
      position: absolute;
      left: 8px;
      top: 0px;
    }
  }
  .navarul {
    height: 42px;
    display: flex;
    justify-content:flex-end;
    font-size: 14px;
    li {
      float: left;
      width:76px;
      height:22px;
      line-height: 22px;
      font-size:14px;
      font-weight:400;
      color:#858587;
    }
    .active {
      width:48px;
      height:22px;
      color:#2e2d31;
      background:rgba(144,144,144,1);
      border-radius:11px;
    }
  }
  .contentul {
    min-height: 78px;
    li {
      height: 100px;
      padding-right: 40px;
      line-height: 100px;
      &:nth-child(odd){
        background:rgba(51,50,55,1);
      }
      &:nth-child(even){
        background:rgba(54,53,58,1);
      }
    }
    .envelope {
      width: 86px;
      height: 100px;
      position: relative;
      left: 0px;
      top: 0px;
      .letter {
        width: 16px;
        height: 12px;
        margin-top: 22px;
      }
      .openletter {
        width: 16px;
        height: 16px;
        margin-top: 18px;
      }
      .redpoint {
        background: #e13545;
        width: 7px;
        height:7px;
        border-radius: 50%;
        display: block;
        position: absolute;
        left: 47px;
        top: 40px;
      }
    }
    .sendpic {
      display: block;
      margin: 12px 10px 0 40px;
      width: 40px;
      height: 40px;
      border-radius: 50%;
    }
    .sendname {
      float: left;
      font-size: 16px;
      color:rgba(136,136,136,1);
      margin-right: 16px;
      text-align: center;
      float: left;
    }
    .sendcontent {
      float: left;
      margin-left: 16px;
      color:rgba(136,136,136,1);
      text-align: center;
    }
    .line {
      float: left;
      padding: 0;
      margin: 0;
      display: block;
    }
    .blackline {
      color:rgba(89,89,90,1);
      margin:0 30px;
    }
    .whiteline {
      color: #3a3a3c;
      position: relative;
      left: -3px;
      top: 0;
    }
    .sendtime {
      float: right;
      color:rgba(136,136,136,1);
      font-size: 12px;
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
  .page {
    width: 868px;
    height: 39px;
    margin-top: 50px;
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
}
</style>
