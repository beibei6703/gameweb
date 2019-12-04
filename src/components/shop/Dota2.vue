<template>
  <div id="dota2">
    <div style="height: 20px"></div>
    <div class="mall-tools">
      <span class="mall-tools-title"> > 道具卡</span>
      <div class="mall-tools-list">
        <ul>
          <li v-for="(item,index) in dota_list" ref="thisli" :data-index="index" :data-name="item.product_name" :key="item.id" :data-gameId="item.game_id" :data-price="item.cprice" :data-quality="item.quality" :data-icon="item.game_id" >
            <div class="mall-tools-icon">
              <img :src="item.product_pic" :alt="item.product_name" class="mall-tools-img" @mouseenter="toggleCase($event)" @mouseleave="toggleCaseR">
            </div>
            <div class="mall-tools-text">
              <span class="mall-tools-name">{{item.product_name}}</span>
              <span class="mall-tools-num">{{thousandBitSeparator(item.cprice)}} C</span>
            </div>
            <div class="mall-tools-btn">
              <div class="mall-tools-buy" @click="Popshow($event)" :data-id="item.id" :data-src="item.product_pic" :data-name="item.product_name" :data-price="item.cprice" :data-quality="item.quality" :data-icon="item.game_id" data-type="1">购买</div>
              <div class="mall-tools-give" @click="Popshow($event)" :data-id="item.id" :data-src="item.product_pic" :data-name="item.product_name" :data-price="item.cprice" :data-quality="item.quality" :data-icon="item.game_id" data-type="2">赠送</div>
            </div>
          </li>
        </ul>
        <div class="clear"></div>
        <!--商城品质框-->
        <div class="mall-case" ref="mallPop" v-show="isCase">
          <div class="mall-case-title">
            <span class="mall-case-title-icon inline-block" ref="productIcon"></span>
            <span class="mall-case-title-name inline-block" ref="productName"></span>
          </div>
          <div class="mall-case-quality" ref="productbg">
            <span class="mall-case-quality-name" ref="productquality"></span>
          </div>
          <div class="mall-case-price">
            <span class="mall-case-price-txt inline-block">售价：</span>
            <span class="mall-case-price-num inline-block" ref="productnum"></span>
          </div>
        </div>
      </div>
    </div>
    <div class="mallPop">
      <ShopToolsPop v-show="isShow"></ShopToolsPop>
      <ShopSuccessPop v-show="tankuang"></ShopSuccessPop>
      <ShopGivePop v-show="givehide"></ShopGivePop>
    </div>
  </div>
</template>
<script>
  import ShopToolsPop from './../shop/ShopToolsPop'
  import ShopSuccessPop from './ShopSuccessPop'
  import ShopGivePop from './ShopGivePop'
  import Http from './../../common/http';
  import { mapMutations, mapState } from 'vuex';
  export default {
    data(){
      return{
        dataUrl:['pop-buy','pop-give'],
        PopBtn:["购买","赠送"],
        PopMt:['mall-pop-mt95','mall-pop-mt62'],
        isCase:false
      }
    },
    methods:{
      thousandBitSeparator(num){
        return (num || 0).toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,');
      },

      Popshow:function (event) {
        let el = event.currentTarget;
        let _dataType =el.getAttribute('data-type');
        let i =_dataType==1?0:1;
        let _this =this
        let dataParam ={
          id:el.getAttribute('data-id'),
          name:el.getAttribute('data-name'),
          src:el.getAttribute('data-src'),
          price:el.getAttribute('data-price'),
          dataType:el.getAttribute('data-type'),
          popQuality:el.getAttribute('data-quality'),
          icon:el.getAttribute('data-icon'),
          url:this.dataUrl[i],
          popbtn:this.PopBtn[i],
          buymt:this.PopMt[i]
        };
//        Http.get('/self').then(function(data){
          if(_this.$store.state.user.userInfo){
            _this.$store.commit('test',true);
            _this.$store.commit('test',dataParam);
            _this.$store.dispatch('userInfo');
          }else{
            _this.$store.dispatch('logout')
            _this.$store.commit('showLoginDialog',true);
            _this.$store.commit('isloginBooleam',true);
          }
//        })
      },
      toggleCase:function(event){
        this.isCase = true;
        let el = event.currentTarget.parentNode.parentNode;
        let Index=el.getAttribute('data-index');
        let mallPop =this.$refs.mallPop;
        let _li =this.$refs.thisli;
        let caseIcon = el.getAttribute('data-icon');
        let _v;
        _v=parseInt(Index/4)
        mallPop.style.top=(20+310*_v)+'px';
        mallPop.style.left=165+198*parseInt(Index%4)+'px';
        this.$refs.productName.innerHTML=el.getAttribute('data-name');
        this.$refs.productnum.innerHTML=this.thousandBitSeparator(parseInt(el.getAttribute('data-price')))+' C';
        let caseQuality = el.getAttribute('data-quality');
        if(caseQuality==1){
          this.$refs.productquality.innerHTML='普通';
          this.$refs.productbg.className='mall_ordinary';
        }else if(caseQuality==2){
          this.$refs.productquality.innerHTML='优质'
          this.$refs.productbg.className='mall_superior';
        }else if(caseQuality==3){
          this.$refs.productquality.innerHTML='稀有'
          this.$refs.productbg.className='mall_tate';
        }else if(caseQuality==4){
          this.$refs.productquality.innerHTML='传说'
          this.$refs.productbg.className='mall_story';
        }else if(caseQuality==5){
          this.$refs.productquality.innerHTML='不朽'
          this.$refs.productbg.className='mall_immortal';
        }else if(caseQuality==6){
          this.$refs.productquality.innerHTML='永恒'
          this.$refs.productbg.className='mall_eternity';
        }
        if(caseIcon==2){
          this.$refs.productIcon.className='case-iconlol'
        }else if(caseIcon==1){
          this.$refs.productIcon.className='case-icondota'
        }

      },
      toggleCaseR:function () {
        this.isCase = false
      }

    },
    mounted () {
      if(!this.$store.state.shop.dota_list){
        this.$store.dispatch('dota_list')
      }
//      this.$store.dispatch('userInfo')

    },
    computed:{
      dota_list:function () {
        return this.$store.state.shop.dota_list?this.$store.state.shop.dota_list:null
      },
      isShow:function(){
        return this.$store.state.shop.isShow
      },
      tankuang:function(){
        return this.$store.state.shop.tan_kuang
      },
      givehide:function(){
        return this.$store.state.shop.givehide
      }
    },
    components:{
      ShopToolsPop,
      ShopSuccessPop,
      ShopGivePop
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
  h2{
    font-size: 88px;
    color:red;
  }
  .mall_ordinary{//普通 白色
    background: linear-gradient(to right,#fff , #1f1f1f) !important;
    background: -webkit-linear-gradient(left,  #fff , #1f1f1f) !important; /* Safari 5.1 - 6.0 */
    background: -o-linear-gradient(left,  #fff , #1f1f1f) !important; /* Opera 11.1 - 12.0 */
    background: -moz-linear-gradient(left,  #fff , #1f1f1f) !important; /* Firefox 3.6 - 15 */
    width: 179px;
    height: 16px;
    font-size: 12px;
    line-height: 16px;
    text-align: center;
    position: absolute;
    right:1px;
    color: #fff;
  }
  .mall_superior{//优质 绿色
    background: #ade55c !important;
    background: linear-gradient(to right,#ade55c , #1f1f1f) !important;
    background: -webkit-linear-gradient(left,  #ade55c , #1f1f1f) !important; /* Safari 5.1 - 6.0 */
    background: -o-linear-gradient(left,  #ade55c, #1f1f1f) !important; /* Opera 11.1 - 12.0 */
    background: -moz-linear-gradient(left,  #ade55c , #1f1f1f) !important; /* Firefox 3.6 - 15 */
    width: 179px;
    height: 16px;
    font-size: 12px;
    line-height: 16px;
    text-align: center;
    position: absolute;
    right:1px;
    color: #fff;
  }
  .mall_tate{//稀有 蓝色
    background: #4b69ff !important;
    background: linear-gradient(to right,#4b69ff , #1f1f1f) !important;
    background: -webkit-linear-gradient(left,  #4b69ff , #1f1f1f) !important; /* Safari 5.1 - 6.0 */
    background: -o-linear-gradient(left,  #4b69ff, #1f1f1f) !important; /* Opera 11.1 - 12.0 */
    background: -moz-linear-gradient(left,  #4b69ff , #1f1f1f) !important; /* Firefox 3.6 - 15 */
    width: 179px;
    height: 16px;
    font-size: 12px;
    line-height: 16px;
    text-align: center;
    position: absolute;
    right:1px;
    color: #fff;
  }
  .mall_story{//传说 紫色
    background: #8847ff !important;
    background: linear-gradient(to right,#8847ff , #1f1f1f) !important;
    background: -webkit-linear-gradient(left,  #8847ff, #1f1f1f) !important; /* Safari 5.1 - 6.0 */
    background: -o-linear-gradient(left,  #8847ff, #1f1f1f) !important; /* Opera 11.1 - 12.0 */
    background: -moz-linear-gradient(left,  #8847ff , #1f1f1f) !important; /* Firefox 3.6 - 15 */
    width: 179px;
    height: 16px;
    font-size: 12px;
    line-height: 16px;
    text-align: center;
    position: absolute;
    right:1px;
    color: #fff;
  }
  .mall_immortal{//不朽 橙色
    background: #ffa22a !important;
    background: linear-gradient(to right,#ffa22a , #1f1f1f) !important;
    background: -webkit-linear-gradient(left,  #ffa22a, #1f1f1f) !important; /* Safari 5.1 - 6.0 */
    background: -o-linear-gradient(left,  #ffa22a, #1f1f1f) !important; /* Opera 11.1 - 12.0 */
    background: -moz-linear-gradient(left,  #ffa22a , #1f1f1f) !important; /* Firefox 3.6 - 15 */
    width: 179px;
    height: 16px;
    font-size: 12px;
    line-height: 16px;
    text-align: center;
    position: absolute;
    right:1px;
    color: #fff;
  }
  .mall_eternity{//永恒 红色
    background: #b11c1c !important;
    background: linear-gradient(to right,#b11c1c , #1f1f1f) !important;
    background: -webkit-linear-gradient(left,  #b11c1c, #1f1f1f) !important; /* Safari 5.1 - 6.0 */
    background: -o-linear-gradient(left,  #b11c1c, #1f1f1f) !important; /* Opera 11.1 - 12.0 */
    background: -moz-linear-gradient(left,  #b11c1c , #1f1f1f) !important; /* Firefox 3.6 - 15 */
    width: 179px;
    height: 16px;
    font-size: 12px;
    line-height: 16px;
    text-align: center;
    position: absolute;
    right:1px;
    color: #fff;
  }
  .case-iconlol{
    display:inline-block; vertical-align: -2.5px;
    width: 16px !important;
    height: 16px !important;
    background:url('../../assets/images/Mall-images/pop-icon.png')no-repeat !important ;
    background-size:cover!important;
  }
  .case-icondota{
    display:inline-block; vertical-align: -2.5px;
    width: 16px !important;
    height: 16px !important;
    background:url('../../assets/images/Mall-images/dota-icon.png')no-repeat !important;
    background-size:cover!important;
  }
  //商城道具卡
  .mall-tools{
    padding: 0 10px ;
    text-align: left;
    .mall-tools-title{
      font-size: 18px;
      color: #989898;
      margin-left: 25px;
    }
    .mall-tools-list{
      margin-top: 20px;
      position: relative;
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
              width: 130px;
              margin: 0 auto;
              color: #dcdcdc;
              font-size: 14px;
              overflow: hidden;
              text-overflow:ellipsis;
              white-space: nowrap;
              display: block;
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
            clear: both;
            margin: 0 7px;
            div{
              float: left;
              font-size: 12px;
              color: #fff;
              width: 70px;
              height: 24px;
              text-align: center;
              line-height: 23px;
              cursor: pointer;
            }
            .mall-tools-buy{
              background: url('../../assets/images/Mall-images/tools-btnl.png') no-repeat ;
              transition: all .5s;
              margin-right: 8px;
              &:hover{
                background: url('../../assets/images/Mall-images/tools-btnlr.png') no-repeat ;
              }
            }
            .mall-tools-give{
              background: url('../../assets/images/Mall-images/tools-btnr.png') no-repeat;
              transition: all .5s;
              &:hover{
                background: url('../../assets/images/Mall-images/tools-btnrr.png') no-repeat ;
              }
            }
          }
        }
        li:hover{
          border-color: #c09152;

        }
      }
      //商城品质框
      .mall-case{
        width: 190px;
        height: 87px;
        background: url('../../assets/images/Mall-images/mall-case.png')no-repeat;
        position: absolute;
        left: 170px;
        top: 18px;
        z-index: 999;
        .mall-case-title{
          height: 40px;
          text-align: center;
          line-height: 40px;
          font-size: 14px;
          color: #fff;
          .mall-case-title-icon{
            width: 16px;
            height: 16px;
            /*background: url(../../assets/images/Mall-images/dota-icon.png)no-repeat;*/
          }
          img{
            vertical-align: middle;
          }
        }
        .mall-case-quality{
          width: 179px;
          height: 16px;
          line-height: 16px;
          text-align: center;
          position: absolute;
          font-size: 12px;
          right:1px;
          color: #fff;
        }
        .mall-case-price{
          /*margin-top: 27px;*/
          font-size: 13px;
          color: #e1c076;
          width: 179px;
          height: 29px;
          position: absolute;
          right: 1px;
          top:57px;
          background: rgba(27,28,31,.6);
          line-height: 29px;
          text-align: center;
        }
      }
    }
  }
</style>


