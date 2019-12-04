<template>
  <div id="userinfo">
    <div class="mission">
      <div class="mission-title">
        <ul>
          <router-link v-for="(item) in Menu" :data-name="item.mybag" :to="item.href" tag="li" :key="item.id" active-class="activityMenu">
            {{item.tab}}
          </router-link>
        </ul>
      </div>
      <div class="mission-body">
        <!--日常任务-->
        <div class="mission-newList">
          <ul class="mission-nav">
            <li>每日任务</li>
            <li>任务奖励</li>
            <li>完成度</li>
            <li>操作</li>
            <i class="clear"></i>
          </ul>
          <ul class="mission-text">
            <li v-for="(item,index) in getList" :data-taken="item.is_taken" :data-complete="item.is_complete" ref="text" :data-index="index" :data-des="item.des" :data-id="item.id" :key="item.id">
              <span class="mission-txt-name inline-block fl">{{item.des}}</span>
              <span class="mission-txt-award inline-block fl">{{item.reward.cai}}C+{{item.reward.exp}}经验</span>
              <span class="mission-txt-complete inline-block fl">{{item.now}}/{{item.goal}}</span>
              <span class="mission-txt-btn inline-block fl">
               <button class="finishPop"  :data-taken="item.is_taken" :data-complete="item.is_complete" ref="listBtn"  v-if="item.is_complete==1&&item.is_taken==0" :data-id="item.id" @click="okPlay($event)">领取</button>
                <button class="getPop" @click="taken($event)" :data-taken="item.is_taken" :data-complete="item.is_complete"  :data-des="item.des" ref="listBtn"  v-if="item.is_complete==0">去完成</button>
                <button class="noPop"  :data-taken="item.is_taken" :data-complete="item.is_complete" ref="listBtn" v-if="item.is_taken==1">已领取</button>
              </span>
              <i class="clear"></i>
            </li>
          </ul>
        </div>
        <!--新手任务-->
        <div class="mission-newList">
          <ul class="mission-nav">
            <li>新手任务</li>
            <li>任务奖励</li>
            <li>完成度</li>
            <li>操作</li>
            <i class="clear"></i>
          </ul>
          <ul class="mission-text">
            <li v-for="(item,index) in getNews" :data-taken="item.is_taken" :data-id="item.id" :key="item.id">
              <span class="mission-txt-name inline-block fl">{{item.des}}</span>
              <span class="mission-txt-award inline-block fl">{{item.reward}}C</span>
              <span class="mission-txt-complete inline-block fl">{{item.now}}/{{item.goal}}</span>
              <span class="mission-txt-btn inline-block fl">
                <button class="finishPop" @click="newokPlay($event)" :data-id="item.id" :data-taken="item.is_taken" :data-complete="item.is_complete" ref="listBtn" v-if="item.is_complete==1&&item.is_taken==0">领取</button>
                <button class="getPop" @click="newPlay($event)" :data-taken="item.is_taken" :data-complete="item.is_complete" ref="listBtn"  v-if="item.is_complete==0">去完成</button>
                <button class="noPop"  :data-taken="item.is_taken" :data-complete="item.is_complete" ref="listBtn" v-if="item.is_taken==1">已领取</button>
              </span>
              <i class="clear"></i>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>
<script>
  import Http from './../../common/http';
  import { mapMutations, mapState } from 'vuex';
  let menu=[
    {"tab":"任务",'mybag':'任务',href:'./taskachievment'},
    {"tab":"成就",'mybag':'成就',href:'./achievment'},
  ]
export default {
  data () {
      return {
        Menu:menu,
        Popbtntxt:['领取','去完成','已领取'],
        PopColor:['getPop','finishPop','noPop']
      }
  },
    methods:{
      taken:function (event) {
        let el = event.currentTarget;
        let des = el.getAttribute('data-des');
        if(des.indexOf('充值')>-1){
          this.$router.push('./../paymoney')
        }else{
          this.$router.push('./../compete/Quizzeszone?ID=all')
        }
      },
      newPlay:function (event) {
        let el = event.currentTarget;
        this.$router.push('./accountSetting')
      },
      okPlay:function (event) {
        let _this=this;
        let el = event.currentTarget;
        let allPop = {
          id:el.getAttribute('data-id')
        }
        Http.post('/dailyTask/getReward',allPop).then(function (data) {
          if(data.data.code==0){
            let dataOption ={
              'masseges':data.data.message,
              'type':'1',
            }
            _this.$store.commit('isSigninPupopDis',true);
            _this.$store.commit('isSigninPupopDis',dataOption);
            _this.$store.dispatch('getList');
            _this.$store.dispatch('self')
          }else{
            let dataOption ={
              'masseges':data.data.message,
              'type':'2',
            }
            _this.$store.commit('isSigninPupopDis',true);
            _this.$store.commit('isSigninPupopDis',dataOption);
          }
        })
      },
      newokPlay:function (event) {
        let _this=this;
        let el = event.currentTarget;
        let okPop = {
          id:el.getAttribute('data-id')
        }
        Http.post('/task/getReward',okPop).then(function (data) {
          if(data.data.code==0){
            let dataOption ={
              'masseges':data.data.message,
              'type':'1',
            }
            _this.$store.commit('isSigninPupopDis',true);
            _this.$store.commit('isSigninPupopDis',dataOption);
            _this.$store.dispatch('getNews');
            _this.$store.dispatch('self')
            if(_this.$store.state.isDialogShow.isCompleteAll){
              _this.$store.dispatch('getNewGuidanceDispatch', { guidanceNum: 3 })
            }


          }else{
            let dataOption ={
              'masseges':data.data.message,
              'type':'2',
            }
            _this.$store.commit('isSigninPupopDis',true);
            _this.$store.commit('isSigninPupopDis',dataOption);
          }
        })
      }
    },

    mounted () {
      if(!this.$store.state.shop.getList){
      }
      this.$store.dispatch('getList');
      if(!this.$store.state.shop.getNews){
      }
      this.$store.dispatch('getNews');
    },
    computed:{
      getList:function () {
        return this.$store.state.shop.getList?this.$store.state.shop.getList:null
      },
      getNews:function () {
        return this.$store.state.shop.getNews?this.$store.state.shop.getNews:null
      },
      get_reward:function () {

        return this.$store.state.shop.get_reward?this.$store.state.shop.get_reward:null
      },
      get_newreward:function () {
        return this.$store.state.shop.get_newreward?this.$store.state.shop.get_newreward:null
      },
    }
}
</script>
<style lang="scss" scoped>
  //公用
  .fl{float:left;}
  .fr{float:right;}
  .clear{clear:both;margin:0;padding:0;display:block;}
  .allbody{width:1200px; margin-left:auto; margin-right:auto;}
  .hide{display: none}
  .show{display: block}
  .ImgOut{
    position:relative;left:0; top:0;overflow:hidden;
    span{
      display:table-cell; text-align:center;vertical-align: middle;
      img{max-width:100%; max-height:100%; display:inline-block;}
    }
  }
  .login-nav.login-active,.register-nav.login-active{
    border: none !important; height:48px;
  }
  .pr{
    position: relative;
  }
  .block{
    display: block;
  }
  .inline-block{
    display: inline-block;
  }
  .white{
    color: #e3dbc8!important;
  }
  .getPop{
    cursor: pointer;
    width:58px;
    height:27px;
    border:1px solid rgba(225,192,118,1);
    border-radius:2px;
    line-height: 27px;
    text-align: center;
    border: none;
    background: url("../../assets/images/mygrand/task_btn_n.png") no-repeat;
    color:rgba(126,75,8,1);
    border-radius: 4px;
    transition: all .5s;
  }
  .getPop:hover{
    background: url("../../assets/images/mygrand/task_btn_h.png") no-repeat;
  }
  .finishPop{
    outline:none;
    cursor: pointer;
    width:58px;
    height:27px;
    border:1px solid rgba(225,192,118,1);
    border-radius:2px;
    line-height: 27px;
    text-align: center;
    border: none;
    background: url("../../assets/images/mygrand/task_btn_n.png") no-repeat;
    color:rgba(255,255,255,1);
    border-radius: 4px;
    transition: all .5s;
  }
  .finishPop:hover{
    background: url("../../assets/images/mygrand/task_btn_h.png") no-repeat;
  }
  .noPop{
    cursor: pointer;
    width:62px;
    height:13px;
    height: 32px;
    font-weight:400;
    color:rgba(225,192,118,1);
    line-height: 26px;
    text-align: center;
    border: none;
    background: url("../../assets/images/mygrand/task_btn.png") no-repeat;
    border-radius: 4px;
    transition: all .5s;
    outline:none;
  }
  //任务
  .mission{
    .mission-title{
      width: 100%;
      // background: url('../../assets/images/myBag/mybag-title.png') repeat;
      // background-position: -20px -23px;
      ul{
        width:1008px;
        height:45px;
        background:rgba(60,60,65,1);
        border-radius:2px 2px 0px 0px;
        display: flex;
        padding:7px 0 0 26px;
        li{
          width:82px;
          height:39px;
          line-height: 39px;
          text-align: center;
          color:rgba(133,133,135,1);
          border-radius:1px 1px 0px 0px;
          font-size: 14px;
        }
        .activityMenu{
          color:rgba(255,255,255,1);
          background:rgba(36,36,38,1);
        }
      }

    }
    .mission-body{
      width: 970px;
      margin: 14px auto;
      .mission-newList{
        margin-bottom: 30px;
        .mission-nav{
          width: 100%;
          height: 38px;
          line-height: 46px;
          font-size: 14px;
          color:rgba(33,32,38,1);
          background:rgba(102,102,102,1);
          li{
            float: left;
            cursor: default;
          }
          li:nth-child(1){
            margin-left: 85px;
          }
          li:nth-child(2){
            margin-left: 172px;
          }
          li:nth-child(3){
            margin-left: 145px;
          }
          li:nth-child(4){
            margin-left: 240px;
          }
        }
        .mission-text{
          font-size: 14px;
          .mission-txt-btn{
            font-size: 14px;
          }
          li{
            height:100px;

            line-height: 100px;
            cursor: default;
            &:nth-child(odd){
              background:rgba(51,50,55,1);
            }
            &:nth-child(even){
              background:rgba(54,53,58,1);
            }
            span:nth-child(1){
              width: 230px;
              text-align: center;
            }
            span:nth-child(2){
              width: 230px;
              text-align: center;
            }
            span:nth-child(3){
              width: 170px;
              text-align: center;
            }
            span:nth-child(4){
              margin-left: 150px;
              .mission-txt-btnBtn{
                cursor: pointer;
                width: 86px;
                height: 32px;
                line-height: 32px;
                text-align: center;
                border: none;
                background: #d9a35a;
                color: #fff;
                font-size: 15px;
                border-radius: 4px;
                transition: all .5s;
              }
              .mission-txt-btnBtn:hover{
                background: #e4ad6f;
              }
            }
          }

        }
      }
    }
  }

</style>


