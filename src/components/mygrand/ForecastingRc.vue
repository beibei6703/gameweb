<template>
  <div id="forecastingRc">
    <p class="title">我的预测</p>
    <div class="prediction_wrap" v-if="getguessdatalist">
      <ul class="prediction_nav">
        <li v-for="(val,key) in predictionNav" :key="key" :class="{active_Prediction:key==predictionNum}" @click="fnPredictionTab(key)">{{val.title}}</li>
      </ul>
      <div class="prediction_main" v-for="(val,key) in 2" :key="key" v-if="key==predictionNum">
        <div class="predc_main_top" v-if="predictionNum==0">
          <p class="top_txt">{{predictionNav[key].op1}}：<span class="yellow_txt">{{thousandBitSeparator(getguessdatalist.cai_income_all)}} c</span></p>
          <p class="top_txt">{{predictionNav[key].op2}}：<span class="yellow_txt">{{thousandBitSeparator(getguessdatalist.cai_cost_all)}} c</span></p>
        </div>
        <div class="predc_main_top" v-else>
          <p class="top_txt">{{predictionNav[key].op1}}：<span class="yellow_txt">{{thousandBitSeparator(getguessdatalist.card_income_all)}} c</span></p>
          <p class="top_txt">{{predictionNav[key].op2}}：<span class="yellow_txt">{{thousandBitSeparator(getguessdatalist.card_cost_all)}} c</span></p>
        </div>
        <ul class="predc_main_btm" v-if="predictionNum==0">
         <li>{{predictionNav[key].op3}}：<span class="yellow_txt">{{thousandBitSeparator(getguessdatalist.cai_income_day)}} c</span></li>
         <li>{{predictionNav[key].op4}}：<span class="yellow_txt">{{thousandBitSeparator(getguessdatalist.cai_income_week)}} c</span></li>
         <li>{{predictionNav[key].op5}}：<span class="yellow_txt">{{thousandBitSeparator(getguessdatalist.cai_income_month)}} c</span></li>
        </ul>
        <ul class="predc_main_btm" v-else>
         <li>{{predictionNav[key].op3}}：<span class="yellow_txt">{{thousandBitSeparator(getguessdatalist.card_income_day)}} c</span></li>
         <li>{{predictionNav[key].op4}}：<span class="yellow_txt">{{thousandBitSeparator(getguessdatalist.card_income_week)}} c</span></li>
         <li>{{predictionNav[key].op5}}：<span class="yellow_txt">{{thousandBitSeparator(getguessdatalist.card_income_month)}} c</span></li>
        </ul>
      </div>
    </div>
    <div class="guess_wrap">
      <ul class="guess_nav">
        <li v-for="(val) in guessNav" :key="val.id" :class="{active_Guess:val.id == guessNum}" @click="fnGuessTab(val.id)">{{val.title}}</li>
        <div class="compete-mine-recharge" @click="openRecharge">充值</div>
      </ul>
      <!-- the module of cai guess -->
      <div class="guess_main"   v-show="guessNum == 1">
        <ul class="type_nav">
          <li v-for="(val,key) in guessType" :key="key" :class="{active_Type:key == typeNum}" @click="fnTypeTab(key)">{{val.title}}</li>
        </ul>
        <div class="list_main">
          <ul class="guess_title_nav cai_guess_title_nav">
            <li v-for="(val,key) in guessTitle" :key="key">{{val.title}}</li>
          </ul>
          <ul class="guess_list cai_guess_list guess_list_cai" v-if="caiGuessData && caiGuessData.length>0">
            <li v-for="(val,key) in caiGuessData" :key="key" @click="handleclick(val.guess_id,val.battle_id,val.odds_type)">
              <p class="guess_text"><span class="guess_icon"  :class="`guess_icon_${val.game_id}`"></span>{{val.updated_at.substring(0,16)}}</p>
              <p class="guess_text">{{thousandBitSeparator(parseInt(val.chip))}}c</p>
              <div class="guess_details" >
                <!-- 两队情况 -->
                <p class="guess_text_inline" v-if="val.option_type==1" :title="val.options[1].name +' 、'+ val.options[2].name">{{val.options[1].name}} <span class="vs">vs</span> {{val.options[2].name}}</p>
                <div class="guess_text_inline  multiList" v-if="val.option_type==2">
                  <p class="ellipsis" @mouseover="showtitlevs($event)" @mouseout="hidetitlevs($event)"><span  v-for="data in val.options" :key="data.id">{{data.name}}、</span></p>
                  <p class="multiGuess"><span class="testpubg" v-for="(data) in val.options" :key="data.id">{{data.name}}、</span></p>
                </div>
                <p class="guess_text_inline">{{val.team_name}}( <span class="red_txt">{{nFormatter(val.team_odds)}}</span> )</p>
              </div>
              <div class="result_details">
                <p class="guess_text_inline">{{val.guess_type_name}}</p>
                <p class="guess_text_inline">{{val.income_message}} <span class="yellow_txt">{{thousandBitSeparator(val.income)}}c</span> </p>
              </div>
              <p class="guess_text">{{val.status_name}}</p>
            </li>
          </ul>
          <div class="noData" v-else>暂无数据,快去 <router-link tag="span" to="/compete/Quizzeszone?ID=all">预测 </router-link> 吧!</div>
        </div>
        <Pagination :currentPage.sync="caiCurrentPage" :page-no="caiPages" @change="caiGuessPageChange" v-if="caiPages>1"></Pagination>
      </div>
      <!-- the module of props guess -->
      <div class="guess_main"    v-show="guessNum == 2">
        <ul class="type_nav">
          <li v-for="(val,key) in guessType" :key="key" :class="{active_Type:key == typeNum}" @click="fnTypeTab(key)">{{val.title}}</li>
        </ul>
        <div class="list_main">
          <ul class="guess_title_nav cai_guess_title_nav">
            <li v-for="(val,key) in guessTitle" :key="key">{{val.title}}</li>
          </ul>
          <ul class="guess_list cai_guess_list" v-if=" propsGuessData && propsGuessData.length>0">
            <li v-for="(val,key) in propsGuessData" :key="key" @click="handleclick(val.guess_id,val.battle_id,val.odds_type)">
              <div class="props_list_top">
                <p class="guess_text"><span class="guess_icon" :class="`guess_icon_${val.game_id}`"></span>{{val.updated_at.substring(0,16)}}</p>
                <p class="guess_text">{{thousandBitSeparator(parseInt(val.chip))}}c</p>
                <div class="guess_details">
                  <p class="guess_text_inline" v-if="val.option_type==1" :title="val.options[1].name +' 、'+ val.options[2].name">{{val.options[1].name}} <span class="vs">vs</span> {{val.options[2].name}}</p>
                  <p class="guess_text_inline ellipsis" v-if="val.option_type==2"><span  v-for="data in val.options" :key="data.id">{{data.name}}、</span></p>
                  <p class="guess_text_inline">{{val.team_name}}( <span class="red_txt">{{nFormatter(val.team_odds)}}</span> )</p>
                </div>
                <div class="result_details">
                  <p class="guess_text_inline">{{val.guess_type_name}}</p>
                  <p class="guess_text_inline">{{val.income_message}} <span class="yellow_txt">{{thousandBitSeparator(val.income)}}c</span> </p>
                </div>
                <p class="guess_text">{{val.status_name}}</p>
              </div>
              <ul class="props_list_btm">
                <li class=" skincard" v-for="(data) in val.cards" :key="data.id" :class="`V-${data.quality}`">
                  <img :src="data.pic" alt="" class="img">
                  <span class="num">X{{data.count}}</span>
                </li>
              </ul>
            </li>
          </ul>
          <div class="noData" v-else>暂无数据,快去 <router-link tag="span" to="/compete/Quizzeszone?ID=all">预测 </router-link> 吧!</div>
        </div>
        <Pagination :currentPage.sync="propsCurrentPage" :page-no="propsPages" @change="propsGuessPageChange" v-if="propsPages>1"></Pagination>
      </div>
      <!-- the module of guess logs -->
      <div class="guess_main"  v-show="guessNum == 3">
        <div class="list_main" style="background:#2e2d33;overflow:hidden;">
          <ul class="guess_title_nav guess_logs_title_nav" style="margin-top:12px;" >
            <li v-for="(val,key) in logTitle" :key="key">{{val.title}}</li>
          </ul>
          <ul class="guess_list guess_logs_list guess_list_cai" v-if="guessLogsData&&guessLogsData.length>0">
            <li v-for="(val,key) in guessLogsData" :key="key">
              <p class="guess_text">{{val.date_time.substring(0,16)}}</p>
              <p class="guess_text">{{val.type}}</p>
              <p class="guess_text">{{val.guess_id}}</p>
              <p class="guess_text">{{val.desc}}</p>
            </li>
          </ul>
          <div class="noData" v-else>暂无数据,快去 <router-link tag="span" to="/compete/Quizzeszone?ID=all">预测 </router-link> 吧!</div>
        </div>
        <Pagination :currentPage.sync="guessLogsCurrentPage" :page-no="guessLogsPages" @change="guessLogPageChange" v-if="guessLogsPages>1"></Pagination>
      </div>
    </div>
  </div>
</template>

<script>
import router from "@/router";
  export default {
    data() {
      return {
        predictionNav: [{title:'C币收益',id:1,op1:'总收益',op2:'预测总值',op3:'今日收益',op4:'本周收益',op5:'本月收益'},{title:'道具收益',id:2,op1:'总收益估值',op2:'预测总值估值',op3:'今日收益估值',op4:'本周收益估值',op5:'本月收益估值'}],
        guessNav:[{title:'C币预测',id:1},{title:'道具预测',id:2},{title:'预测日志',id:3}],
        predictionNum:0,
        guessNum:1,
        guessType:[{title:'全部',id:1},{title:'赢',id:2},{title:'输',id:3}],
        typeNum:0,
        guessTitle:[{title:'游戏类型/时间',id:1},{title:'预测金额',id:2},{title:'预测详情',id:3},{title:'预测结果',id:4},{title:'获胜战队',id:5}],
        logTitle:[{title:'时间',id:1},{title:'预测方式',id:2},{title:'预测编号',id:3},{title:'操作',id:4}],
        caiCurrentPage:1,
        propsCurrentPage:1,
        guessLogsCurrentPage:1,
      }
    },
    methods: {
      fnPredictionTab(key) {
        this.predictionNum = key;
      },
      fnGuessTab(key){
        this.guessNum = key;
        if(this.typeNum!=0){
          this.typeNum==0;
        }
        if(key==1){
          this.caiFetch(this.currentPage,'all');
        }else if(key==2){
          this.propsFetch(this.currentPage,'all');
        }else if(key == 3){
          this.guessLogFetch(this.currentPage);
        }
      },
      fnTypeTab(key){
        this.typeNum = key;
        let result_status;
        if(this.typeNum==0){
          result_status='all';
        }else if(this.typeNum==1){
          result_status='win';
        }else if(this.typeNum==2){
          result_status='lose';
        }
        if(this.guessNum==1){
          this.caiFetch(1,result_status);
        }else if(this.guessNum==2){
          this.propsFetch(1,result_status);
        }
      },
      caiFetch(page,result_status){
        let caiParams = {
          page,
          result_status,
          size:10,
          status:'all',
        };
        this.$store.dispatch('caiGuessDispatch',caiParams);
      },
      propsFetch(page,result_status){
        let propsParams = {
          page,
          result_status,
          size:10,
          status:'all'
        };
        this.$store.dispatch('propsGuessDispatch',propsParams);
      },
      guessLogFetch(page){
        let guessLogParams = {
          page,
          cursor:null,
          guess_id:null,
        };
        this.$store.dispatch('guessLogsDispatch',guessLogParams);
      },
      guessLogPageChange(page){
        this.guessLogFetch(page);
      },
      caiGuessPageChange(page){
        let result_status;
        if(this.typeNum==0){
          result_status='all';
        }else if(this.typeNum==1){
          result_status='win';
        }else if(this.typeNum==2){
          result_status='lose';
        }
        this.caiFetch(page,result_status);
      },
      propsGuessPageChange(page){
        let result_status;
        if(this.typeNum==0){
          result_status='all';
        }else if(this.typeNum==1){
          result_status='win';
        }else if(this.typeNum==2){
          result_status='lose';
        }
        this.propsFetch(page,result_status);
      },
      handleclick(id,battleId,oddsType){
        this.$store.commit('mutationIsSendDispath',true)
        if(this.$store.state.match.stateGuessId&&this.$store.state.match.stateGuessId!=id){
          this.$store.commit('mutationGuessTeamData',null)
        }
        router.push(`/guess/${id}`);
        this.$store.commit('mutationStateGuessId',id)
      },
      showtitlevs(event){
        var ele = event.currentTarget.parentNode.childNodes[2];
        ele.style.display='block';
      },
      hidetitlevs(event){
        var ele = event.currentTarget.parentNode.childNodes[2];
        ele.style.display='none';
      },
      getScrollTop(){
        let scrollTop = 0, bodyScrollTop = 0, documentScrollTop = 0;
        if(document.body){
          bodyScrollTop = document.body.scrollTop;
        }
        if(document.documentElement){
          documentScrollTop = document.documentElement.scrollTop;
        }
        scrollTop = (bodyScrollTop - documentScrollTop > 0) ? bodyScrollTop : documentScrollTop;
        return scrollTop;
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
    },
    computed: {
      getguessdatalist() {
        return this.$store.state.garden.earingsValuationData || null;
      },
      caiPages(){
        return this.$store.state.garden.caiTotalPages || 1;
      },
      propsPages(){
        return this.$store.state.garden.propsTotalPages || 1;
      },
      guessLogsPages(){
        return this.$store.state.garden.guessLogsTotalPages || 1;
      },
      caiGuessData(){
        return this.$store.state.garden.caiGuessData || null;
      },
      propsGuessData(){
        return this.$store.state.garden.propsGuessData || null;
      },
      guessLogsData(){
        return this.$store.state.garden.guessLogsData || null;
      }
    },
    mounted() {
      this.caiFetch(1,'all');
      this.$store.dispatch('getguessdatadis');
    },
    updated() {
      document.documentElement.scrollTop = "0px";
      document.body.scrollTop = "0px";
    },
  }
</script>

<style scoped lang="scss">
  #forecastingRc{
    .title{
      padding: 20px 0 0 20px;
      font-size: 15px;
      color: #dcdcdc;
      line-height: 30px;
      text-align: left;
    }
    .prediction_wrap{
      width: 970px;
      height: 244px;
      margin:0 auto;
      background: #38363b;
      .prediction_nav{
        height: 40px;
        display: flex;
        justify-content: space-around;

        li{
          width: 50%;
          text-align: center;
          line-height: 40px;
          color: #737373;
          font-size: 16px;
          position: relative;
          &:nth-child(2)::before{
            height: 24px;
            width: 2px;
            background: #2e2d33;
            content: "";
            position: absolute;
            left: 0;
            top: 6px;
          }
        }
        .active_Prediction{
          color: #fff;
          &:after{
            width: 32px;
            height: 1px;
            content:"";
            position: absolute;
            bottom: 0;
            right: 0;
            left: 0;
            margin: 0 auto;
            background: #fff;
          }
        }
      }
    }
    .prediction_main{
      height: 204px;
      .predc_main_top{
        height: 134px;
        background: #2e2d33;
        display: flex;
        justify-content: space-around;
        .top_txt{
          width: 50%;
          line-height: 134px;
          text-align: center;
          color: #dcdcdc;
          font-size: 16px;
          .yellow_txt{
            font-size: 18px;
            color: #c39937;
          }
        }
      }
      .predc_main_btm{
        height: 70px;
        // background: radial-gradient(circle,#4d4434, #2e2d33);
        background:url('../../assets/img/mall/guess_records.png') no-repeat center;
        display: flex;
        justify-content: space-around;
        li{
          width: calc(100%/3);
          text-align: center;
          line-height: 70px;
          color: #dcdcdc;
          font-size: 15px;
          position: relative;
          span{
            font-size: 16px;
            color: #c39937;
          }
          &:nth-child(2){
            // background:url('../../assets/img/mall/guess_records.png') no-repeat center;
            &:after,&:before{
              width: 1px;
              height: 51px;
              position: absolute;
              background: url("../../assets/img/garden/sperate.png") no-repeat;
              background-size: contain;
              top:7px;
              content: "";
            }
            &:after{
              right: 0;
            }
            &:before{
              left: 0;
            }
          }
        }
      }
    }
    .guess_wrap{
      margin-top: 20px;
      padding: 0 20px;
      .guess_nav{
        height: 45px;
        border-radius: 2px;
        background: #3c3c41;
        display: flex;
        padding: 7px 0 0 30px;
        li{
          width: 80px;
          height: 38px;
          line-height: 38px;
          color: #858585;
          font-size: 14px;
        }
        .active_Guess{
          background: #2e2d33;
          color: #fff;
          // border:1px solid #fff;
          // border-bottom: none;
          // background:url('../../assets/img/mall/mall_nav_border_hover.png') no-repeat top center;
          height: 39px;
          position: relative;
          z-index: 2;
        }
      }
      .guess_main{
        padding: 0 14px;
        background: #2e2e31;
        // border-top: 1px solid #fff;
        .type_nav{
          height:40px ;
          display: flex;
          justify-content: flex-end;
          background: #2e2d33;
          li{
            width: 48px;
            line-height: 22px;
            font-size: 14px;
            color: #858585;
            border-radius: 12px;
            text-align: center;
            margin-top:8px;
          }
          .active_Type{
            height: 22px;
            color: #000;
            background: #909090;
          }
        }
        .guess_title_nav{
          height: 34px;
          line-height: 34px;
          display: flex;
          justify-content: space-around;
          background: #666;
          text-align: center;
          margin-top: 12px;
        }
        .guess_logs_title_nav{
          color: #212026;
          li{
            width: calc(100%/4);
          }
        }
        .guess_logs_list{
          li{
            .guess_text{
              width: calc(100%/4);
            }
          }
        }
        .cai_guess_title_nav{
          li{
            width: calc(100%/5);
            color: #212026;
          }
        }
        .cai_guess_list{
          li{
            .guess_text,.guess_details,.result_details{
              width: calc(100%/5);
            }
          }
        }
        .guess_list_cai{
          li{
            height: 100px !important;
            display: flex;
            justify-content: space-around;
          }
        }
        .guess_list{
          li{
            height: 166px;
            .props_list_top{
              display: flex;
              justify-content: space-around;
            }
            .props_list_btm{
              margin-top: 16px;
              display: flex;
              padding: 0 30px;
              li{
                width: 40px;
                height: 40px;
                position: relative;
                margin:0 4px;
                img{
                  width: 100%;
                  height: 100%;
                  display: block;
                }
                .num{
                  width: 120%;
                  transform: scale(.8);
                  font-size: 10px;
                  color: #858585;
                  background: #13171f;
                  position: absolute;
                  bottom: -2px;
                  right: -4px;
                }
              }
            }
            &:nth-child(2n+1){
              background: #333237;
            }
            &:nth-child(2n){
              background: #363639;
            }
            .guess_text,.guess_details,.result_details{
              margin-top: 30px;
            }
            .guess_text,.guess_text_inline{
              color: #dcdcdc;
              font-size: 14px;
              line-height: 16px;
              margin-bottom: 8px;
              text-align: center;
            }
            .guess_text_inline{
              width: 200px;
            }
            .multiList{
              position: relative;
              .multiGuess{
                width: 250px;
                display: flex;
                flex-wrap: wrap;
                // background: #2e2e31;
                background: #dcdcdc;
                color: #333;
                padding: 6px;
                position: absolute;
                top:25px;
                left: -28px;;
                z-index: 2;
                display: none;
                span{
                  font-size: 14px;
                   line-height: 16px;
                }
              }
            }
            .vs{
              font-size: 14px;
              font-weight: 900;
              color: #c39937;
            }
            .red_txt{
              color: #ff4c22;
              font-size: 14px;
            }
            .yellow_txt{
              color: #c39937;
            }
            .guess_icon{
              background: url("../../assets/images/competeImg/guess_logoS.png") no-repeat;
              display: inline-block;
              position: relative;
              top: 6px;
              right: 8px;
            }
            .guess_icon_1{
              width: 20px;
              height: 18px;
              background-position: -36px -1px;
              top: 4px;
            }
            .guess_icon_2{
              width: 20px;
              height: 20px;
              background-position: -6px -1px;
            }
            .guess_icon_3{
              width: 20px;
              height: 20px;
              background-position: -102px -0px;
            }
            .guess_icon_4{
              width: 28px;
              height: 16px;
              background-position: -67px -2px;
              top:2px;
            }
            .guess_icon_5{
              width: 16px;
              height: 16px;
              background-position: -135px -1px;
            }
            .guess_icon_6{
              width: 16px;
              height: 16px;
              background-position: -135px -1px;
            }
            .guess_icon_7{
              width: 32px;
              height: 22px;
              display: inline-block;
              background: url("../../assets/images/matchcenter/wzry_icon_lh.png") no-repeat;
            }
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
    }
  }
  .compete-mine-recharge {
        width: 72px;
        height: 30px;
        color: #fff;
        background: url('../../assets/img/home/icon_recharge_normal.png') no-repeat center;
        position: absolute;
        top: 7px;
        right: 0;
        line-height: 30px;
        text-align: center;
        font-size: 16px;
        cursor: pointer;
    }

    .compete-mine-recharge:hover {
        background: url('../../assets/img/home/icon_recharge_hover.png') no-repeat center;
    }
</style>
