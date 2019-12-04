<template>
  <div id="shopcards">
    <div class="mall-tools">
      <span class="mall-tools-title fl"> > 虚拟卡</span>
      <div class="mall-tip fr">
        <span class="tipyellow">提示：</span><span>虚拟卡单项充值每日限额200元次日0点更新，24小时内到账</span>
      </div>
      <i class="clear"></i>
      <div class="mall-tools-list">
        <ul>
          <li v-for="(item,index) in cards_list" :data-id="item.id" :key="item.id" :data-gameId="item.game_id">
            <div class="mall-tools-icon">
              <img :src="item.product_pic" :alt="item.product_name" class="mall-tools-img">
            </div>
            <div class="mall-tools-text">
              <span class="mall-tools-name">{{item.product_name}}</span>
              <span class="mall-tools-num">{{thousandBitSeparator(item.cprice)}} C</span>
            </div>
            <div class="mall-tools-btn">
              <div class="exchange-btn" :data-type="5" @click="JDShow($event)" v-if="item.product_name.indexOf('京东')>-1" :data-id="item.id" :data-src="item.product_pic" :data-name="item.product_name" :data-price="item.cprice">兑换</div>
              <div class="exchange-btn" :data-type="6" v-if="item.product_name.indexOf('Q币')>-1" @click="Cardsshow($event)" :data-id="item.id" :data-src="item.product_pic" :data-name="item.product_name" :data-price="item.cprice" >兑换</div>
              <div class="exchange-btn" :data-type="7" v-if="item.product_name.indexOf('话费')>-1" @click="Cardsshow($event)" :data-id="item.id" :data-src="item.product_pic" :data-name="item.product_name" :data-price="item.cprice" >兑换</div>
            </div>
          </li>
        </ul>
        <div class="clear"></div>
      </div>
    </div>
    <div class="mallPop">
      <ShopCardsPop v-show="isCards"></ShopCardsPop>
      <ShopSuccessPop v-show="tankuang"></ShopSuccessPop>
    </div>
  </div>
</template>
<script>
  import ShopCardsPop from './../shop/ShopCardsPop'
  import ShopSuccessPop from './ShopSuccessPop'
  import Http from './../../common/http';
  import { mapMutations, mapState } from 'vuex';
  export default {
    data(){
      return{
        isShower:false,
      }
    },
    methods:{
      thousandBitSeparator(num){
        return (num || 0).toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,');
      },

      Cardsshow:function (event) {
        let el =event.currentTarget;
        let _dataType =el.getAttribute('data-type');
        let _this = this
        let dataParam = {
          id:el.getAttribute('data-id'),
          name:el.getAttribute('data-name'),
          src:el.getAttribute('data-src'),
          price:el.getAttribute('data-price'),
          dataType :_dataType,
//          valueS:true,
        };
//        Http.get('/self').then(function(data){
          if(_this.$store.state.user.userInfo){
            _this.$store.commit('isCards',true);
            _this.$store.commit('isCards',dataParam);
            _this.$store.dispatch('userInfo');
//            _this.$store.dispatch('userInfo')
          }else{
            _this.$store.dispatch('logout')
            _this.$store.commit('showLoginDialog',true);
            _this.$store.commit('isloginBooleam',true);
          }
//        })
      },
      JDShow:function (event) {
        let el =event.currentTarget;
        let _dataType =el.getAttribute('data-type');
        let _this = this;
        let dataParam = {
          id:el.getAttribute('data-id'),
          name:el.getAttribute('data-name'),
          src:el.getAttribute('data-src'),
          price:el.getAttribute('data-price'),
          dataType :_dataType,
//          valueS:true,
        };
//        Http.get('/self').then(function(data){
          if(_this.$store.state.user.userInfo){
            _this.$store.commit('isCards',true);
            _this.$store.commit('isCards',dataParam);
            _this.$store.dispatch('userInfo');
//            _this.$store.dispatch('userInfo')

          }else{
            _this.$store.dispatch('logout')
            _this.$store.commit('showLoginDialog',true);
            _this.$store.commit('isloginBooleam',true);
          }
//        })

      }
    },
    mounted () {
//      if(!this.$store.state.shop.tools_list){
//        this.$store.dispatch('tools_list')
//      }
      if(!this.$store.state.shop.cards_list){
        this.$store.dispatch('cards_list')
      }
//      this.$store.dispatch('userInfo')
    },
    computed:{
//      tools_list:function(){
//        return this.$store.state.shop.tools_list?this.$store.state.shop.tools_list:null
//      },
      cards_list:function(){
        return this.$store.state.shop.cards_list?this.$store.state.shop.cards_list:null
      },
      isCards:function(){
        return this.$store.state.shop.isCards
      },
      tankuang:function(){
        return this.$store.state.shop.tan_kuang
      }
    },
    components:{
      ShopCardsPop,
      ShopSuccessPop
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
  .tipyellow{
    color: #c39a26;
  }

  //商城道具卡
  .mall-tools{
    padding: 0 10px ;
    text-align: left;
    .mall-tools-title{
      font-size: 18px;
      color: #989898;
      margin-left: 25px;
      display: inline-block;
    }
    .mall-tip{
      font-size: 14px;
      position: relative;
      right: 20px;
      top: 3px;
      color: #bebfc1;
    }
    .mall-tools-list{
      margin-top: 20px;
      ul{
        li{
          float: left;
          width: 166px;
          height: 295px;
          border: 1px solid #353637;
          margin: 0 16px 20px;
          cursor: Default;
          transition: all .5s;
          .mall-tools-icon{
            padding: 15px 18px 12px;
            .mall-tools-img{
              width: 126px;
              height: 183px;
            }
          }
          .mall-tools-text{
            text-align: center;
            .mall-tools-name{
              width: 93px;
              margin: 0 auto;
              color: #dcdcdc;
              font-size: 14px;
            }
            .mall-tools-num{
              width: 93px;
              margin: 6px auto 6px;
              color: #e1c076;
              font-size: 14px;
              overflow: hidden;
              text-overflow:ellipsis;
              white-space: nowrap;
              display: block;
            }
          }
          .mall-tools-btn{
            padding: 0 25px;
            clear: both;
            div{
              float: left;
              font-size: 12px;
              color: #fff;
              width: 70px;
              height: 23px;
              text-align: center;
              line-height: 23px;
              background: url('../../assets/images/Mall-images/tools-btnr.png')repeat;
              margin: 0 22px;
              cursor: pointer;
              transition: all .5s;
            }
            div:hover{
              background: url('../../assets/images/Mall-images/tools-btnrr.png')repeat;
            }
          }
        }
        li:hover{
          border-color: #c09152;
        }
      }
    }
  }
</style>


