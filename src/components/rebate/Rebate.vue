<template>
    <div class="rebateWrap">
       <!-- 未登录为0 登录已充值为1，登录未充值2 -->
        <div class="re_top">

        </div>
        <div class="myRebate" :data-status="re_status">
             <div class="myre_con" >
                 <div v-if="!userInfo" class="notLogin">
                     <span class="loginBtn" @click="fnOpenLogin"></span>
                     <span class="bankSp"></span>
                     <span>亲爱的用户,参加活动请先登录~</span>

                 </div>
                 <ul class="recharge" v-if="userInfo && (re_status ==3 || re_status==4 || re_status==2)">
                    <li class="rechargeLi" v-if="rechargedata">
                        <span>充值金额</span>
                        <span class="fontSp">充值时间 <i>{{rechargedata.created_at}}</i></span>
                        <span>{{rechargedata.amount}}元</span>
                        </li>
                    <li class="currentWater">
                        <span>当前流水</span>
                        <span class="blank"></span>
                        <div class="proBarAll">
                           <span :style="'width:'+(progress>=380?380:progress)+'px'"></span>
                           <b>{{rechargedata.bill_count}} / {{rechargedata.count}} C</b>
                        </div>

                    </li>
                    <li class="myMoney" v-if="rechargedata">
                        <span>我的红利</span>
                         <span class="fontSp">截止领取<i>{{rechargedata.expired_at}}</i></span>
                        <span>{{rechargedata.rebate_count}}元 </span>
                    </li>
                    <li class="mystatus">
                        <span>领取状态</span>
                         <span class="blank"></span>
                        <span @click="handleb" class="getStatusBtn" v-if="re_status==3">领取</span>
                            <div>
                                <span class="alreadyGet" v-if ="re_status ==4">已领取</span>
                                <span class="noGet" v-if="re_status==2">领取</span>
                            </div>

                    </li>
                 </ul>
               <div class="norecharge" v-if=" userInfo &&  (re_status==1 || re_status==0)">
                   <p class="topCon">
                       <span> 您暂未参与该活动，如需参与活动请前往充值</span>
                       <span class="blankP"></span>
                       <span @click="openRecharge" class="rechargeBtn">充值</span>
                   </p>
                   <p class="desCon">
                    仅计算活动时间内的第一笔充值金额，若未满足200元首充则可以累积叠加，每位用户仅可参与一档返红利活动
                   </p>
                </div>
            </div>
        </div>
        <div class="detailCon">
             <div class="content">
                 <img src="../../assets/img/rebate/tables.png" alt="">
              </div>

        </div>
        <div class="regular_bottom">
              <div class="regularCon">
                    <p>
                       <span class="tit_p">一.活动时间</span>
                       <span>10月10日0:00开启----11月3日23:59结束，红利将保存30天</span>
                       <span> 例如：某用户11月1日12:00充值200元，在11月30日12:00之前满足流水要求，即可领取30元红利</span>
                    </p>
                    <p>
                        <span class="tit_p">二.发放形式</span>
                        <span>红利设置，红利将以菜币的形式返还</span>
                    </p>
                    <p>
                        <span class="tit_p">三.活动条款</span>
                        <span style="color:#eb0000">仅计算活动时间内的第一笔充值金额，若未满足200元首充则可以累积叠加，每位用户仅可参与一档返红利活动</span>
                    </p>
                    <p>
                        <span class="tit_p">四.流水解释</span>
                        <span>存款金额 500元，对应红利50元</span>
                        <span>流水要求 = ( 500 + 50 ) x 4 = 2200元</span>
                        <span>流水：某用户A下注赔率0.6的盘口100菜币，则流水为100菜币，依次类推</span>
                        <span>成功参与后：红利将处于锁定状态，完成流水要求后可直接领取</span>
                        <span>流水倍数：丰收网仅对固赔 （不含奖池盘口） 产生输赢结果的投注额进行计算，任何平局、取消的赛事、赔率低于0.50赔率投注将不计算在有效投注内。</span>
                    </p>
                    <p>
                        <span class="tit_p">五.其他</span>
                        <span>如出现恶意套利，刷流水等行为，公司有权收回红利以及红利收益，凡参加活动用户，即表示接受且自愿遵守平台规定，且平台保留最终解释权</span>
                    </p>
                    <p>
                        <span class="tit_p">六.关注微信公众号  领取海量LOL皮肤点券</span>
                        <img src="../../assets/img/rebate/gongtzhong.jpg" alt="" style="width:140px;height:140px">
                    </p>

              </div>
        </div>
       <Draw v-if="code==0 "></Draw>

    </div>
</template>
<script>
import {mapState} from 'vuex'
export default {
  name: "Rebate",
  data() {
    return {
    //   showRecharge: 0,
    //   receiveBtn: 1,
    //   noReceive:false,
      progress:""
    };
  },
  created(){
      this.$store.dispatch("getStatus")
  },
  methods: {
    handleb() {
      this.$store.commit("showDrawDialog", true);
      this.$store.dispatch("getrebate")
      if(this.code==0){
        //   this.receiveBtn = 2
         this.$store.dispatch("getStatus")
      }else{
        //   this.receiveBtn = 1
      }
    },

    fnOpenLogin() {
      // this.$store.dispatch('logout');
      this.$store.commit("showLoginDialog", true);
      setTimeout(() => {
        this.$store.commit("istestBooleam", true);
      }, 100);
    },
    openRecharge: function() {
       if(this.$store.state.user.userInfo){
          console.log("滚轮高顿", this.getScrollTop());
          this.$store.commit("mutationScrolltopValue", this.getScrollTop());
          this.$store.commit("mutationIsShowRecharge", true);
        }else{
          this.$store.dispatch("logout");
          this.$store.commit("showLoginDialog", true);
          setTimeout(() => {
            this.$store.commit("istestBooleam", true);
          }, 100);
        }
    },
    getScrollTop() {
      var scrollTop = 0,
        bodyScrollTop = 0,
        documentScrollTop = 0;
      if (document.body) {
        bodyScrollTop = document.body.scrollTop;
      }
      if (document.documentElement) {
        documentScrollTop = document.documentElement.scrollTop;
      }
      scrollTop =
        bodyScrollTop - documentScrollTop > 0
          ? bodyScrollTop
          : documentScrollTop;
      return scrollTop;
    }
  },
  computed: {
      re_status(){
          let re_status= this.$store.state.rebate.re_status;
        //   if(re_status == 0 || re_status ==1){
        //         this.showRecharge = 1
        //     }else if(re_status == 2){
        //             this.noReceive = true
        //             this.showRecharge = 0

        //     }else if (re_status == 4){
        //         this.receiveBtn = 2
        //         this.noReceive = false
        //         this.showRecharge = 0
        //     }
        //     else{  this.receiveBtn = 1
        //             this.noReceive = false
        //             this.showRecharge = 0
        //     }
        // console.log('状态',re_status,this.noReceive,this.showRecharge)
            return re_status ;

      },
      rechargedata(){
        let rechargedata= this.$store.state.rebate.rechargedata;
        console.log("data" ,rechargedata.bill_count)
        console.log("data" ,rechargedata.count)
       this.progress = ((rechargedata.bill_count/rechargedata.count).toFixed(2))*100*3.8
        console.log(this.progress)
        return rechargedata;
      },
     ...mapState({
        userInfo: state => state.user.userInfo,
        code :state => state.rebate.code
     }),
  }
};
</script>
<style lang="scss" scoped>

.re_top {
  width: 100%;
  height: 426px;

}
.title_re {
  height: 80px;
  font-size: 36px;
  line-height: 80px;
  text-align: left;
  padding-left: 12px;
}

.myre_con {
    width:100%;
    height: 250px;
    display:flex;
    align-items: center;
    justify-content: center;
    margin-left: -22px;
  .notLogin {
    display:flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .loginBtn{
      display: block;
      height:50px;
      width:162px;
      background: url(../../assets/img/rebate/loginn.png) no-repeat;
      &:hover{
           background: url(../../assets/img/rebate/loginh.png) no-repeat;
      }
    }
    .bankSp{
        display: block;
        height:14px;
    }
  }
  .proBarAll{
      width:380px;
      height:25px;
      background: url(../../assets/img/rebate/probara.png) no-repeat left top;
      span{
          display: block;
          height:25px;
          background: url(../../assets/img/rebate/probar.png) no-repeat center;
          background-size: cover;
      }
      b{
          text-align:left;
          display:block;
          color:#e6c59d;
          margin-top:8px;
          font-size:14px;

      }
  }
  .recharge {
     height:100%;
     background: url(../../assets/img/rebate/redLbg.png) no-repeat center top;
    display: flex;
    color:#e6c59d;
    justify-content: space-around;
    align-items: center;
    // margin-left:53px;


    li {
     height:100%;
      display: flex;
      flex-direction: column;
        justify-content:center;
        align-items: center;
    }
     .rechargeLi{
        width:185px;

    }
    .currentWater{
        width:476px;
        .blank{
            display: block;
            height:36px;
        }
    }
    .myMoney{
        width:175px;
    }
    .mystatus{
        width:225px;
        margin-left:8px;
        align-items: center;
         .blank{
            display: block;
            height:32px;
        }
        .getStatusBtn{
            font-weight:bold;
            display: block;
            width:73px;
            height:30px;
            line-height:30px;
            background:url(../../assets/img/rebate/lingqu.png) no-repeat;
            color:#975136;
            &:hover{
                cursor: pointer;
            }
        }
        .alreadyGet,.noGet{
             background:url(../../assets/img/rebate/alreadyget.png) no-repeat;
               color:#975136;
                width:73px;
                height:30px;
                line-height:30px;
                float:left;
                font-weight:bold;
                &:hover{
                cursor: pointer;
            }
        }
        .noGet{
             background:url(../../assets/img/rebate/noget.png) no-repeat;
            //  margin-left:20px;
             color:#ffffff;

        }
    }
  }
   .fontSp{
            font-size:11px;
            color:#eb0000;
            margin-top:8px;
            margin-bottom:20px;
            i{
                display:block;
                width:100%;
                text-align: center;
                margin-top:5px;
            }
        }
  .norecharge {
    color: #e6c59d;
    display: flex;
    flex-direction: column;
     width:100%;
     .blankP{
         display: block;
         height:11px;
     }
    .topCon {
        width:100%;
      font-size: 14px;
      display:flex;
      align-items: center;
      justify-content: center;
      .rechargeBtn{
          margin-left:10px;
          display:block;
          width:73px;
          height:30px;
          line-height: 30px;
          font-weight:bold;
          color:#975136;
          background:url(../../assets/img/rebate/rechargebtn.png) no-repeat;
          &:hover{
              cursor: pointer;
          }
      }
    }
    .desCon {
     margin-top:14px;
      color: #7d5750;
      font-size: 12px;
    }
  }
}
.detailCon{
    display:flex;
    justify-content: center;
    align-items: center;
    height:433px;
    // padding-bottom:36px;
    .content{
        width:1131px;
        height:335px;
        // margin-top:55px;

        img{
            width:100%;
        }
    }
}
.regularCon {
    height:858px;
    color:#e6c59d;
    font-size:14px;
    padding-top: 50px;
    text-align: center;
    display: flex;
    flex-direction: column;
    p{
        width:100%;
        margin-bottom:32px;
        margin-left:-26px;
        span{
            display: block;
            width:100%;
            text-align: center;
            margin-bottom:15px;
        }
        .tit_p{
            font-weight: bold;
        }
    }

}
</style>


