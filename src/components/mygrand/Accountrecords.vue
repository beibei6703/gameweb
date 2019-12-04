<template>
  <div id="accountrecords">
    <ul class="tabsul">
      <li v-for="(item,index) in tabs" :class="{active:index == num}" @click="tab(index,1)" :key="index">{{item}}</li>
    </ul>
    <div class="tabCon">
      <div v-for='(itemCon,index) in 5' v-show=" index == num" :key="index">
        <div class="wrap" v-if="index==0">
          <div class="jialong">
            <ul class="top">
              <li >时间</li>
              <li >类别</li>
              <li >收入/支出</li>
              <li >操作</li>
              <li >备注</li>
            </ul>
            <ul class="content " v-if="userAccountData && userAccountData.length>0">
              <li v-for="(data) in userAccountData" :key="data.id">
                <p class=" account_text">{{data.created_at.substring(0,16)}}</p>
                <p class="account_text">{{data.category_name}}</p>
                <p class="account_text">{{thousandBitSeparator(data.count)}}{{data.category_num==1?'p':data.category_num==2?'c':null}}</p>
                <p class="account_text">{{data.operation}}</p>
                <p class=" account_text">{{data.reason}}</p>
              </li>
            </ul>
            <div class="noData" v-else>暂无数据,快去 <router-link tag="span" to="/compete/Quizzeszone?ID=all">预测 </router-link> 吧!</div>
            <!-- 分页 -->
            <Pagination :currentPage.sync="allPage" :page-no="userAccountTotalPages" @change="allPageChange" v-if="userAccountTotalPages>1"></Pagination>
          </div>
        </div>
        <div class="wrap" v-if="index==1">
          <div class="jialong">
            <ul class="top">
              <li >时间</li>
              <li >数量</li>
              <li >操作</li>
              <li >详情</li>
              <li >状态/结果</li>
            </ul>
            <ul class="content" v-if="caiPaymentsData && caiPaymentsData.length>0">
              <li v-for="(data) in caiPaymentsData" :key="data.id">
                <p class="account_text">{{data.created_at.substring(0,16)}}</p>
                <p class="account_text">{{thousandBitSeparator(data.count)}}c</p>
                <p class="account_text">{{data.operation}}</p>
                <p class="account_text">{{data.reason}}</p>
                <p class="account_text">成功</p>
              </li>
            </ul>
            <div class="noData" v-else>暂无数据,快去 <router-link tag="span" to="/compete/Quizzeszone?ID=all">预测 </router-link> 吧!</div>
            <!-- 分页 -->
            <Pagination :currentPage.sync="caiPage" :page-no="caiPaymentsTotalPages" @change="caiPageChange" v-if="caiPaymentsTotalPages>1"></Pagination>
          </div>
        </div>
        <div class="wrap" v-if="index==2">
          <div class="jialong">
            <ul class="threetop">
              <li >时间</li>
              <li >数量</li>
              <li >操作</li>
              <!-- <li >道具估值</li> -->
              <li >详情</li>
              <li >状态/结果</li>
            </ul>
            <ul class="content props_content" v-if="propsPaymentsData && propsPaymentsData.length>0">
              <li v-for="(data) in propsPaymentsData" :key="data.id">
                <p class="account_text">{{data.created_at.substring(0,16)}}</p>
                <p class="account_text">{{thousandBitSeparator(data.count)}}</p>
                <p class="account_text">{{data.operation}}</p>
                <!-- <p class="account_text">x{{ data.category_num}}</p> -->
                <p class="account_text">{{data.reason}}</p>
                <p class="account_text">成功</p>
              </li>
            </ul>
            <div class="noData" v-else>暂无数据,快去 <router-link tag="span" to="/compete/Quizzeszone?ID=all">预测 </router-link> 吧!</div>
            <!-- 分页 -->
             <Pagination :currentPage.sync="propsPage" :page-no="propsPaymentsTotalPages" @change="propsPageChange" v-if="propsPaymentsTotalPages>1"></Pagination>
          </div>
        </div>
        <div class="wrap" v-if="index==3">
          <div class="jialong">
            <ul class="top">
              <li >时间</li>
              <li >数量</li>
              <li >操作</li>
              <li >详情</li>
              <li >状态/结果</li>
            </ul>
            <ul class="content" v-if="debrisPaymentsData && debrisPaymentsData.length>0">
              <li v-for="(data) in debrisPaymentsData" :key="data.id">
                <p class="account_text">{{data.created_at.substring(0,16)}}</p>
                <p class="account_text">{{thousandBitSeparator(data.count)}}p</p>
                <p class="account_text">{{data.operation}}</p>
                <p class="account_text">{{data.reason}}</p>
                <!-- <p class="account_text">{{data.type>0?'收入':'支出'}}</p> -->
                <p class="account_text">成功</p>
              </li>
            </ul>
            <div class="noData" v-else>暂无数据,快去 <router-link tag="span" to="/compete/Quizzeszone?ID=all">预测 </router-link> 吧!</div>
            <!-- 分页 -->
            <Pagination :currentPage.sync="debrisPage" :page-no="debrisPaymentsTotalPages" @change="debrisPageChange" v-if="debrisPaymentsTotalPages>1"></Pagination>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      tabs: ["全部收支", "C币明细", "道具明细", '碎片明细'],
      num: 0,
      allPage: 1,
      caiPage:1,
      propsPage:1,
      debrisPage:1
    };
  },
  methods: {
    tab(index, page) {
      this.num = index;
      if(this.num==0){
        this.allPayments(1);
      }else if(this.num==1){
        this.caiPayments(1);
      }else if(this.num==2){
        this.propsPayments(1);
      }else if(this.num==3){
        this.debrisPayments(1);
      }
    },
    allPayments(page){
      let allPayMentParams = {
        page,
        size:10
      };
      this.$store.dispatch('allPaymentsDispatch',allPayMentParams);
    },
    caiPayments(page){
      let caiPayMentParams = {
        page,
        size:10
      };
      this.$store.dispatch('caiPaymentsDispatch',caiPayMentParams);
    },
    propsPayments(page){
      let propsPayMentParams = {
        page,
        size:10
      };
      this.$store.dispatch('propsPaymentsDispatch',propsPayMentParams);
    },
    debrisPayments(page){
      let debrisPayMentParams = {
        page,
        size:10
      };
      this.$store.dispatch('debrisPaymentsDispatch',debrisPayMentParams);
    },
    allPageChange(page){
      this.allPayments(page);
    },
    caiPageChange(page){
      this.caiPayments(page);
    },
    propsPageChange(page){
      this.propsPayments(page);
    },
    debrisPageChange(page){
      this.debrisPayments(page);
    }
  },
  mounted() {
    this.allPayments(1);
  },
  computed:{
     userAccountData(){
       return this.$store.state.garden.userAccountData || null;
     },
     caiPaymentsData(){
       return this.$store.state.garden.caiPaymentsData || null;
     },
     propsPaymentsData(){
       return this.$store.state.garden.propsPaymentsData || null;
     },
     debrisPaymentsData(){
       return this.$store.state.garden.debrisPaymentsData || null;
     },
     userAccountTotalPages(){
       return this.$store.state.garden.userAccountTotalPages || 1;
     },
     caiPaymentsTotalPages(){
       return this.$store.state.garden.caiPaymentsTotalPages || 1;
     },
     propsPaymentsTotalPages(){
       return this.$store.state.garden.propsPaymentsTotalPages || 1;
     },
     debrisPaymentsTotalPages(){
       return this.$store.state.garden.debrisPaymentsTotalPages || 1;
     },
  },
  updated() {
      document.documentElement.scrollTop = "0px";
      document.body.scrollTop = "0px";
  },
};
</script>
<style lang="scss" scoped>
  #accountrecords {
    min-height: 300px;
    position: relative;
    .tabsul {
      height: 45px;
      display: flex;
      background-color: #3c3c41;
      padding:8px 0 0  28px;
      li {
        width: 80px;
        line-height:36px ;
        font-size: 14px;
        color: #858585;
        text-align: center;
      }
      .active{
        color: #fff;
        background-color: #242425;
        height: 37px;
      }
    }
    .wrap {
      padding: 22px 20px 0 20px;
      position: relative;
      .top ,.threetop{
        height: 34px;
        background: #666;
        line-height: 34px;
        display: flex;
        li {
          // width: 222px;
          text-align: center;
          color: #202020;
          font-size: 14px;
        }
      }
      .top{
        li{
          width: calc(100%/5);
        }
      }
      .threetop{
        li{
          width: calc(100%/5);
        }
      }
      .noData{
        font-size: 16px;
        color: #dcdcdc;
        text-align: center;
        line-height: 100px;
        span{
          color: #c39937;
          cursor: pointer;
        }
      }
    }
    .content {
      padding-bottom: 10px;
      li {
        height: 64px;
        line-height: 64px;
        text-align: center;
        font-size: 14px;
        display: flex;
        justify-content: space-around;
        p{
          width: calc(100%/5);
        }
        &:nth-child(2n){
          background: #333237;
        }
        &:nth-child(2n+1){
          background: #36353a;
        }
        .account_text{
          color: #dcdcdc;
          text-align: center;
        }
      }
    }
    // .props_content{
    //   li{
    //     p{
    //       width: calc(100%/5);
    //     }
    //   }
    // }
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
    .threetop {
      height: 36px;
      // background-color: #15161a;
      line-height: 36px;
      li {
        width: 296px;
        text-align: center;
        color: #c5b78c;
      }
    }
    .threecontent {
      min-height: 200px;
      padding-bottom: 10px;
      li {
        height: 60px;
        line-height: 60px;
        text-align: center;
        font-size: 14px;
        p {
          width: 296px;
        }
        .time {
          color: #7b7b7c;
        }
        .num {
          color: #dcdcdc;
        }
        .way {
          color: #989898;
        }
        .status {
          color: #989898;
        }
        span {
          line-height: 60px;
        }
      }
    }
  }
</style>


