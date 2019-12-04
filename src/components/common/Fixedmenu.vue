<template>
  <div id="fixedmenu" v-show="showFloat">
      <div class="menu" ref="menu">
          <!-- 默认显示 -->
        <div class="taskclick" v-if="getList && Object.keys(getList).length>0">
            <i class="redpoint" v-if="getList && getList[1].is_complete==1 && getList[1].is_taken==0 || getList && getList[2].is_complete==1 && getList[2].is_taken==0 || getList &&  getList[3].is_complete==1 && getList[3].is_taken==0"></i>
            <i class="redpoint" v-if="getNews && getNews[1].is_complete==1&&getNews[1].is_taken==0 ||getNews && getNews[2].is_complete==1&&getNews[2].is_taken==0 || getNews && getNews[3].is_complete==1&&getNews[3].is_taken==0"></i>
            <p class="themetask">我的任务</p>
            <img src="../../assets/images/taskshow.png" alt=""  @click="taskshowclick" data-name="1" v-show="ishide">
        </div>
        <!-- 点击显示 -->
        <transition name="slide-fade">
            <div class="sidebar" ref="fixmenuMain" v-if="getList && Object.keys(getList).length>0">
                  <!-- <i class="redpoint1" v-if="getList[1].is_complete==1&&getList[1].is_taken==0 || getList[2].is_complete==1&&getList[2].is_taken==0 || getList[3].is_complete==1&&getList[3].is_taken==0"></i> -->
                <img src="../../assets/images/task_r_arrow.png" alt="" @click="taskhideclick" class="handleclickpic">
                <div class="content">
                    <ul>
                        <li v-for="(item,index) in getList" :key="index">
                           <div class="taskleft fleft" >
                               <p class="taskname">{{item.des}}</p>
                               <p class="taskreward theme_color">奖励：{{item.reward.cai}}菜币+{{item.reward.exp}}经验</p>
                           </div>
                           <div class="taskrigth fright" >
                               <!-- <p class="finish" @click='handleclick(item.id)' v-if="item.is_complete==0">去完成</p> -->
                                <p class="finish"  :data-taken="item.is_taken" :data-complete="item.is_complete" ref="listBtn"  v-if="item.is_complete==1&&item.is_taken==0" :data-id="item.id" @click="okPlay($event)">领取</p>
                                <p class="finish" @click="taken($event)" :data-taken="item.is_taken" :data-complete="item.is_complete"  :data-des="item.des" ref="listBtn"  v-if="item.is_complete==0">去完成</p>
                                <p class="finish"  :data-taken="item.is_taken" :data-complete="item.is_complete" ref="listBtn" v-if="item.is_taken==1">已领取</p>
                           </div>
                        </li>
                    </ul>
                    <!-- <i class="redpoint1" ></i> -->
                    <i class="redpoint1" v-if="getNews && getNews[1].is_complete==1&&getNews[1].is_taken==0 || getNews && getNews[2].is_complete==1&&getNews[2].is_taken==0 ||getNews && getNews[3].is_complete==1&&getNews[3].is_taken==0"></i>
                    <router-link to="/mygrand/taskachievment" class="daily pointer" tag="p" @click.native="taskhideclick">查看更多任务</router-link>
                </div>
            </div>
         </transition>
      </div>
  </div>
</template>
<script>
import router from "@/router"
import Http from './../../common/http';
export default {
  data () {
      return {
          taskshow:false,
          ishide:true,
          showredpoint:false
      }
  },
  methods: {
    taskshowclick(){//显示
      this.taskshow=!this.taskshow
      this.ishide=!this.ishide;
      let _box =this.$refs.fixmenuMain;
      let _l = -35,timer=null;
      timer=setInterval(function(){
          if(_l>=270){
              clearInterval(timer)
            _l=270;
          }else{
            _l+=15.5
          }
        _box.style.right=_l+'px'

      },20)

    },
    taskhideclick(){//隐藏
      this.taskshow=!this.taskshow
      this.ishide=!this.ishide;
      let _box =this.$refs.fixmenuMain;
      let _l = 300,timer=null;
      timer=setInterval(function(){
        if(_l<=-35){
          clearInterval(timer)
          _l=-35;
        }else{
          _l-=15.5
        }
        _box.style.right=_l+'px'
      },20)

    },
    //   handleclick(id){//跳转
    //       this.taskhideclick();
    //      if(id==1){
    //         router.push({path:'/compete/Quizzeszone?ID=all'})
    //      }else if(id==2){
    //          router.push({path:'/compete/Quizzeszone?ID=all'})
    //      }else if(id==3){
    //         router.push({path:'/paymoney'})
    //      }
    //   },
      okPlay:function (event) {
        this.taskhideclick();
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
            _this.$store.dispatch('userinfoshowdispatch')
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
      taken:function (event) {
        this.taskhideclick();
        let el = event.currentTarget;
        let des = el.getAttribute('data-des');
        if(des.indexOf('充值')>-1){
          this.$router.push('./../paymoney')
        }else{
          this.$router.push('./../compete/Quizzeszone?ID=all')
        }
      },
  },
 computed: {
     dailytask:function(){
         return this.$store.state.home.dailytask?this.$store.state.home.dailytask:null
     },
     showFloat:function(){
      if(this.$store.state.user.login==true && !this.$store.state.home.dailytask){
        // this.$store.dispatch('dailytaskdispatch')
        if(this.$route.path.indexOf('/treasure')==-1){
         this.$store.dispatch('getList');
        }
      }
      return this.$store.state.user.login
     },
     getList:function () {
        return this.$store.state.shop.getList?this.$store.state.shop.getList:null
      },
    getNews:function () {
        return this.$store.state.shop.getNews?this.$store.state.shop.getNews:null
    },
 },
 mounted () {
   if(this.$route.path.indexOf('/treasure')==-1){
     this.$store.dispatch('getList');
     this.$store.dispatch('getNews');
   }
 }
}
</script>
<style lang="scss" scoped>
#fixedmenu{
    width:434px;
    height: 230px;
    position: fixed;
    right: -434px;
    top:20%;
    z-index: 10;
    .taskclick{
        display: block;
        width:35px;
        height: 120px;
        position: absolute;
        left: -35px;
        top:20%;
        .themetask{
            height: 60px;
            font-size:14px;
            text-align: right;
            padding-left:10px;
            padding-right: 10px;
            position: absolute;
            bottom: 52px;
            left: 2px;
        }
    }
     .redpoint {
        background: #ed4b4b;
        width: 10px;
        height: 10px;
        border-radius: 50%;
        display: block;
        position: absolute;
        right: 27px;
        top: -4px;
    }
    .redpoint1{
        background: #ed4b4b;
        width: 10px;
        height: 10px;
        border-radius: 50%;
        display: block;
        position: absolute;
        right: 178px;
        top: 220px;
        z-index: 99999999999999999999;
    }
    .sidebar{
        width:312px;
        height: 230px;
        position: relative;
        top:0;
        right:-312px;
        .content{
            width: 276px;
            height: 244px;
            background-image: url('../../assets/images/taskbg.png');
            position: relative;
            left: 0;
            bottom: 0;
            ul{
                height: 166px;
                width:276px;
                padding-left: 20px;
                padding-top:38px;
                text-align: left;
                li{
                    height: 52px;
                    line-height: 22px;
                    &:nth-child(1){
                        margin-top:2px;
                        .taskrigth{
                            margin-top:-5px;
                        }
                    }
                    &:nth-child(2){
                        margin-top:2px;
                        .taskrigth{
                            margin-top:-4px;
                        }
                    }
                    &:nth-child(3){
                        margin-top:3px;
                        .taskrigth{
                            margin-top:-3px;
                        }
                    }
                    .taskrigth{
                        padding-top:20px;
                        padding-right: 66px;
                        width:56px;
                        height: 22px;
                        .finish{
                            height: 26px;
                            width: 54px;
                            line-height: 20px;
                            border:1px solid #4d4d4d;
                            text-align: center;
                            border-radius: 3px;
                            font-size: 12px;
                            &:hover{
                                border:1px solid #e1bf75;
                                transition: all .6s;
                            }
                        }
                    }
                    .taskleft{
                        padding-top:7px;
                    }
                    .taskname{
                        font-size: 14px;
                    }
                    .taskreward{
                        font-size:12px;
                    }
                }
            }
        }
        // 点击隐藏图片
        .handleclickpic{
            display: block;
            width:35px;
            height: 40px;
            position: absolute;
            left: -35px;
            top:43%;
            z-index: 2;
        }
    }
    // transition
    .slide-fade-enter-active {
            transition: all .8s ease;
    }
    .slide-fade-leave-active {
        transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
    }
    .slide-fade-enter, .slide-fade-leave-to{
        transform: translateX(10px);
        opacity: 0;
    }
    // 查看更多任务
    .daily{
        font-size: 12px;
        color: #989898;
        position: absolute;
        left: 100px;
        bottom:12px;
    }
}
</style>


