<template>
  <div id="userinfo">
    <div class="myBag" style="height:1460px;">
      <div class="mission">
        <div class="mission-title">
          <ul>
            <router-link v-for="(item) in Menu" :data-name="item.mybag" :to="item.href" tag="li" :key="item.id" active-class="activityMenu">
              {{item.tab}}
            </router-link>
          </ul>
        </div>
        <div class="mission-list">
          <ul>
            <li v-for="(item) in achievment_list" :data-name='item.name' :data-id='item.id' :data-complete="item.is_complete" :key="item.id">
              <div class="mission-list-pic fl" v-if="item.now!=item.goalDetail"><img :src="require('../../assets/images/Achievment/task'+item.id+'.png')"></div>
              <div class="mission-list-pic fl" v-if="item.now==item.goalDetail"><img :src="require('../../assets/images/Achievment/task'+item.id+'_1.png')"></div>
              <div class="mission-list-text fl">
                <h3 class="mission-list-text-name">{{item.name}}</h3>
                <p class="mission-list-text-txt">{{item.des}}</p>
                <span class="mission-list-text-length" v-if="item.now==item.goalDetail" style="background: #007f85">{{item.now}}/{{item.goal}}</span>
                <span class="mission-list-text-length" v-else>0/{{item.goal}}</span>
              </div>
              <div class="mission-list-btn fr" :data-complete="item.is_complete">
                <button @click="btrn($event)" :data-name='item.name' class="nocomplete" v-if="item.now!=item.goalDetail">去完成</button>
                <button  :data-name='item.name' class="complete"  v-if="item.now==item.goalDetail">已完成</button>
              </div>
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
      }
    },
    methods:{
      btrn:function (event) {
        let el = event.currentTarget;
        this.$router.push('./../compete/Quizzeszone?ID=all')
      }
    },
    mounted () {
      if(!this.$store.state.shop.achievment_list){
      }
      this.$store.dispatch('achievment_list');
    },
    computed:{
      achievment_list:function () {
        return this.$store.state.shop.achievment_list?this.$store.state.shop.achievment_list:null
      }

    },
    components:{

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
  .white{
    color: #e3dbc8!important;
  }
  .block{
    display: block;
  }
  .inline-block{
    display: inline-block;
  }
  .complete{
    cursor: pointer;
    width:66px;
    height:13px;
    height: 32px;
    font-size:14px;
    font-weight:400;
    color:rgba(225,192,118,1);
    line-height: 32px;
    text-align: center;
    border: none;
    background: url("../../assets/images/mygrand/task_btn.png") no-repeat;
    background-size: cover;
    border-radius: 4px;
    transition: all .5s;
    outline:none;
  }
  .nocomplete{
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
    font-size: 14px;
    border-radius: 4px;
    transition: all .5s;
  }
  //成就
  .mission{
    .mission-title{
      width: 100%;
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
      img{
        position: absolute;
        left:147px
      }
    }
    .mission-list{
      width: 100%;
      ul{
        padding: 0 15px;
        li{
          cursor: auto;
          padding: 26px 0;
          border-bottom: 1px solid #000;
          .mission-list-pic{
            width: 75px;
            height: 75px;
            margin: 0 45px;
            img{
              width: 100%;
              height: 100%;
            }
          }
          .mission-list-text{
            width: 550px;
            text-align: left;
            padding: 9px 0 ;
            .mission-list-text-name{
              font-size: 16px;
              font-weight: bold;
            }
            .mission-list-text-txt{
              margin: 13px 0;
              font-size: 13px;
            }
            .mission-list-text-length{
              width: 100%;
              height: 10px;
              line-height: 10px;
              text-align: center;
              color: #fff;
              background: #535353;
              display: block;
              font-size: 12px;
            }
          }
          .mission-list-btn{
            width: 180px;
            margin-top: 30px;
          }
        }
        li:last-child{
          border: none;
        }
      }
    }
  }
</style>
