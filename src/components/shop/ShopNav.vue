<template>
  <div id="shopnav">
    <!--商城图标-->
    <span class="mall-title block"><img src="../../assets/images/Mall-images/mall-icon.png" alt="商城标签" class="mallTitle-icon"></span>
    <div class="caibi fr">
    <span class="inline-block">账户余额</span>
    <span class="inline-block" id="mymoney" :data-money="isLoginUserCai">{{thousandBitSeparator(parseInt(isLoginUserCai))}} C</span>
  </div>
    <!--商城导航-->
    <div class="mall-nav clear">
      <ul class="mall-list">
        <router-link v-for="(item,index) in Menu" activeClass="active"  :data-name="item.game" :to="item.href" tag="li" :key="item.id">
          <span :class="'icon_logo'+index" v-if="index<5"></span>{{item.tab}}
        </router-link>
      </ul>

      <i class="clear"></i>
    </div>
    <!--<router-view></router-view>-->
  </div>
</template>
<script>
  import Http from './../../common/http';
  import { mapMutations, mapState } from 'vuex';
  let menu=[
    {"tab":"热门商品",'game':'all',href:'./ShopTools?all'},
    {"tab":"英雄联盟",'game':'lol',href:'./Lol'},
    {"tab":"DOTA2",'game':'dota',href:'./Dota2'},
    {"tab":"绝地求生",'game':'pubg',href:'./Juedi'},
    {"tab":"CSGO",'game':'csgo',href:'./Csgo'},
    // {"tab":"其他商品",'game':'dota',href:'./other'},
  ]
  export default {
    data(){
      return {
        Menu:menu,
        num:0,
//        shopmoney:this.$store.state.shop.selfMine
      }
    },
    methods:{
      tabs:function (index) {
        this.num=index;
      },
      getUersInfo:function(){
        let _this=this;
//        Http.get('/self').then(function(data){
          if(_this.$store.state.user.userInfo){
            _this.$store.state.shop.selfMine=data.data.data.cai;
          }else{
            _this.shopmoney='0';
          }

//        })
      },

    },
    created(){
      /*if(!this.$store.state.shop.self){

      }
      this.$store.dispatch('self')*/
    },
    mounted (){
//      this.$store.dispatch('self')
      //this.getUersInfo()

    },
    computed:{
      /*selfer:function(){
        return this.$store.state.shop.selfMine
      },*/
      isLoginUserCai:function(){
        let self=this
        let Cai;

        if(self.$store.state.user.userInfo){
          if(self.$store.state.user.userInfo.cai){
//            console.log('我的账户余额',self.$store.state.user.userInfo.cai)
            Cai=self.$store.state.user.userInfo.cai
          }else{
            Cai=0
          }

        }else{
          Cai=0
        }
        return Cai


      }

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
    background: url('../../assets/images/LoginImage/login-nav.png') no-repeat;
    border: none !important; height:48px;
    /*height: 48px;*/
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
  .active{
    border-color: #989898!important;
  }

  /*商城导航*/
  .mall-title{
    float: left;
    padding: 20px 16px 16px;
    .mallTitle-icon{
      width: 49px;
      height: 25px;
    }
  }
  .caibi{
    position: relative;
    top: 31px;
    right: 13px;
    font-size: 14px;
    span:nth-child(1){
      font-weight: 800;
    }
  }
  .mall-nav{
    .mall-list{
      height:45px; line-height:45px; text-align:center; font-size:16px;
      display: flex;
      justify-content: space-around;
      li{
        -webkit-transition: all 0.5s;
        width:160px; float:left; background:url('../../assets/images/competeImg/guess_menuH.png') no-repeat ;background-size: cover; text-shadow:#070a11 1px 3px 10px;webkit-transition: all 0.5s;
        span{
          width:32px;height:20px;background:url('../../assets/images/competeImg/guess_logoG.png') no-repeat;display:inline-block; vertical-align: -4px;-webkit-transition: all 0.5s;
        }
        .icon_logo0{display:none !important;width:0;height:0; background:none !important;}
        .icon_logo1{background-position:0 0;}
        .icon_logo2{background-position:-32px 0;}
        .icon_logo3{background-position:-64px 0;}
        .icon_logo4{background-position:-96px 0;}
      }
      li:hover,li.active{background-image:url('../../assets/images/competeImg/guess_menuA.png');
        span{background-image:url('../../assets/images/competeImg/guess_logoS.png');}
      }
    }
  }
</style>


