<template>
  <div id="basicInfo" v-if="userinfoshowlist">
      <div class="top">
        <div class="top_pic">
          <img src="../../../assets/img/garden/avatar_mask.png" alt="" class="mask">
          <img :src="userinfoshowlist.avatar" alt="" class="avatar">
          <p class="vipBg">{{userinfoshowlist.vip_level}}</p>
        </div>
        <div class="top_text">
          <p class="user"><span class="username">{{userinfoshowlist.nickname}}</span><span class="level">Lv{{userinfoshowlist.level}}</span > <span class="unique">编号：{{userinfoshowlist.unique_number}}</span></p>
          <div class="progress">
            <div  class="hehebg"><p class="dynamicProgress" :style="{width:userinfowidth}"></p></div>
            <p class="exp">{{userinfoshowlist.now_exp}}/{{userinfoshowlist.expect_exp}}</p>
          </div>
          <!-- <img src="../../../assets/img/garden/recharge_n.png" alt=""> -->
          <div class="introduce">个性签名：{{userinfoshowlist.bio}}</div>
          <div class="bindImg">
            <router-link tag="p" to="/mygrand/accountSetting" class="icon icon1 pointer"  v-if="!userinfoshowlist.mobile_verified"></router-link>
            <p class="icon icon1" :class="{activeIcon1:userinfoshowlist.mobile_verified}" v-else :title="userinfoshowlist.mobile"></p>
            <router-link tag="p" to="/mygrand/accountSetting" class="icon icon2 pointer" v-if="!userinfoshowlist.email_verified"></router-link>
            <p class="icon icon2" :class="{activeIcon2:userinfoshowlist.email_verified}" v-else :title="userinfoshowlist.email"></p>
            <router-link tag="p" to="/mygrand/accountSetting" class="icon icon3 pointer" v-if="!thirdBind[2].isbind"></router-link>
            <p class="icon icon3" :class="{activeIcon3:thirdBind[2].isbind}" v-else></p>
            <router-link tag="p" to="/mygrand/accountSetting" class="icon icon4 pointer" v-if="!thirdBind[1].isbind"></router-link>
            <p class="icon icon4" :class="{activeIcon4:thirdBind[1].isbind}" v-else></p>
            <router-link tag="p" to="/mygrand/accountSetting" class="icon icon5 pointer" v-if="!thirdBind[0].isbind"></router-link>
            <p class="icon icon5" :class="{activeIcon5:thirdBind[0].isbind}" v-else></p>
            <!-- <p class="icon icon3" :class="{activeIcon3:wbBind}"></p>
            <p class="icon icon4" :class="{activeIcon4:wxBind}"></p>
            <p class="icon icon5" :class="{activeIcon5:qqBind}"></p> -->
          </div>
        </div>
      </div>
      <p class="text">账户余额：</p>
      <div class="account_details">
        <p class="small_size">C币余额</p>
        <div class="operation">
          <p class="cai"><span class="yellow">{{thousandBitSeparator(userinfoshowlist.cai)}}</span>c</p>
          <p class="recharge_btn pointer"  @click="openRecharge">充值</p>
        </div>
        <div class="props">
          <div class="items">道具估值：<span class="items_nums">{{thousandBitSeparator(this.$store.state.match.cardsValue)}}</span>c</div>
          <img src="../../../assets/img/garden/sperate.png" alt="" class="sperate">
          <div class="items">碎&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;片：<span class="items_nums">{{thousandBitSeparator(this.$store.state.match.iconValue)}}</span>p</div>
        </div>
      </div>
      <div class="checkin">
        <Checkin/>
      </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        key: 'value'
      }
    },
    computed: {
      userinfoshowlist(){
        return this.$store.state.home.userinfoshowlist || null ;
      },
      userinfowidth(){
          return this.$store.state.home.userinfowidth || '1px';
      },
      userinfoexp(){
          return this.$store.state.home.userinfoexp || 0;
      },
      thirdBind(){
        return this.$store.state.user.thirdMessage || null;
      },
      qqBind(){
        return this.$store.state.user.qqBind || false;
      },
      wbBind(){
        return this.$store.state.user.wbBind || false;
      },
      wxBind(){
        return this.$store.state.user.wxBind || false;
      },
    },
    methods: {
      openRecharge:function(){
        this.$store.commit('mutationIsShowRecharge',true);
      }
    },
    mounted() {
      this.$store.dispatch('actionMybagValue');
    },
  }
</script>

<style scoped lang="scss">
  #basicInfo{
    .top{
      display: flex;
      height: 136px;
      padding: 24px 0 0 30px;
      .top_pic{
        width: 110px;
        position: relative;
        .mask{
          width: 99px;
          height: 99px;
          display: block;
          position: absolute;
          left: 0;
          top: 0;
        }
        .avatar{
          width: 96px;
          height: 96px;
          display: block;
        }
        .vipBg{
          width: 39px;
          height: 15px;
          position: absolute;
          bottom: 6px;
          right: 0;
          background: url("../../../assets/img/garden/vip.png") no-repeat;
          background-size: cover;
          color: #fff;
          font-size: 12px;
          text-align: right;
          padding-right: 6px;
          line-height: 15px;
        }
      }
      .top_text{
        margin-left: 12px;
        .user{
          margin-bottom: 8px;
          text-align: left;
          padding-left: 4px;
          position: relative;
        }
        .unique{
          position: absolute;
          right:76px;
        }
        .username{
          font-size: 18px;
          color: #fff;
        }
        .level{
          font-size: 16px;
          color: #c38e2a;
          margin-left: 12px;
        }
        .progress{
          display: flex;
          .hehebg{
            width: 480px;
            height: 14px;
            border-radius: 8px;
            background: #000;
            .dynamicProgress{
              height: 14px;
              border-radius: 8px;
              background: url("../../../assets/img/garden/progress.png") no-repeat;
              background-size: cover;
            }
          }
          .exp{
            margin-left: 12px;
            line-height: 11px;
          }
        }
        .introduce{
          color: #5e5e70;
          font-size: 14px;
          margin-top: 12px;
          text-align: left;
          padding-left: 4px;
        }
        .bindImg{
          display: flex;
          justify-content: space-around;
          width: 130px;
          height: 15px;
          margin-top: 14px;
          .icon{
            height: 15px;
            background: url("../../../assets/img/garden/garden_icons.png") no-repeat;
          }
          .icon1{
            width: 10px;
            background-position: -0px -0px;
          }
          .icon2{
            width: 15px;
            background-position: -128px 2px;
          }
          .icon3{
            width: 19px;
            background-position: -52px -0px;
          }
          .icon4{
            width: 19px;
            background-position: -71px -0px;
          }
          .icon5{
            width: 16px;
            background-position: -20px -0px;
          }
          .activeIcon1{
            background-position: -10px -0px;
          }
          .activeIcon2{
            background-position: -143px -0px;
          }
          .activeIcon3{
            background-position: -90px -0px;
          }
          .activeIcon4{
            background-position: -109px -0px;
          }
          .activeIcon5{
            background-position: -36px -0px;
          }
        }
      }
    }
    .text{
      margin:34px 0   14px 0;
      text-align: left;
      font-size: 15px;
      color: #dcdcdc;
      padding-left: 30px;
    }
    .account_details{
      width: 950px;
      height: 186px;
      background: #36353a;
      margin: 0 auto;
      padding:0 ;
      .small_size{
        padding:24px 28px;
        color: #dcdcdc;
        font-size: 14px;
        text-align: left;
      }
      .operation{
        width: 100%;
        display: flex;
        padding-left: 28px;
        .cai{
          color: #dcdcdc;
          font-size: 12px;
        }
        .yellow{
          color: #cea137;
          font-size: 30px;
        }
        .recharge_btn{
          margin-left: 24px;
          width: 76px;
          height: 30px;
          line-height: 30px;
          text-align: center;
          color: #dcdcdc;
          font-size: 14px;
          background: url("../../../assets/img/garden/recharge_n.png") no-repeat;
          background-size: cover;
          &:hover{
            background: url("../../../assets/img/garden/recharge_h.png") no-repeat;
            background-size: cover;
          }
        }
      }
      .props{
        display: flex;
        .sperate{
          width: 1px;
          height: 51px;
          margin:17px 50px 0 50px;
        }
        .items{
          color: #dcdcdc;
          font-size: 14px;
          line-height: 80px;
          margin:0 60px 0 30px;
        }
        .items_nums{
          font-size: 16px;
          margin-left: 30px;
        }
      }
    }
    .checkin{
      width: 950px;
      margin:20px auto;
    }
  }
</style>
