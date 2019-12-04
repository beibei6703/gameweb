<template>
  <div id="signin" v-show="isShow">
    <div class="main">
      <div class="top">
        <p class="x" @click="handleclose"></p>
        <div class="picwrap">
          <div class="pic" v-if="userinfoshowlist">
            <img src="../../assets/images/vips/v0.png" alt="" class="vipimg fleft valign" v-if="userinfoshowlist.vip_level==0">
            <img :src="require('@/assets/images/vips/VIP'+userinfoshowlist.vip_level+'.png')" alt="" class="vipimg fleft valign" v-if="userinfoshowlist.vip_level>=1">
            <div class="tip fleft">
              <div class="progress">
                <span class="blue" :style="{width: width+'px'}" v-if="width"></span>
                <span class="exp" v-if="userinfoshowlist">{{userinfoshowlist.now_vip_exp}}/{{userinfoshowlist.expect_vip_exp}}</span>
              </div>
              <div class="tiptop">
                <p class="needs fleft" v-if="userinfoshowlist">
                  <span class="help" @mouseover="helptipshows" @mouseout="helptiphides"></span>
                  还需{{vipexp}}VIP经验可升级到 <span class="vip">VIP{{userinfoshowlist.vip_level+1}}</span>
                </p>
              </div>
              <div class="helptip" v-if="helptiphide">
                  <h3 class="helptip_info">每充值或预测预测100C,均可获得1点VIP经验.</h3>
              </div>
            </div>
            <img :src="require('@/assets/images/vips/VIP'+(userinfoshowlist.vip_level+1)+'.png')" alt="" class="vipimg fleft valign">
          </div>
        </div>
      </div>
      <div class="bottom">
        <p class="btop">VIP特权说明</p>
        <div class="bcontent">
          <div class="pleft fleft">
            <table>
              <tr>
                <th class="th samll">VIP等级</th>
                <th class="th samll">服务费</th>
                <th class="th big">福利</th>
              </tr>
              <tr>
                <td class="samll">1</td>
                <td class="samll">-</td>
                <td class="big">专属vip活动</td>
              </tr>
              <tr>
                <td class="samll">2</td>
                <td class="samll">4.9%</td>
                <td class="big">每周赠送50C，专属VIP活动</td>
              </tr>
              <tr>
                <td class="samll">3</td>
                <td class="samll">4.8%</td>
                <td class="big">每周赠送100C，专属VIP活动</td>
              </tr>
              <tr>
                <td class="samll">4</td>
                <td class="samll">4.5%</td>
                <td class="big">每周赠送200C，专属VIP活动</td>
              </tr>
              <tr>
                <td class="samll">5</td>
                <td class="samll">4.2%</td>
                <td class="big">每周赠送400C，专属VIP活动，专属VIP客服</td>
              </tr>
              <tr>
                <td class="samll">6</td>
                <td class="samll">4.0%</td>
                <td class="big">每周赠送600C，专属VIP活动，专属VIP客服</td>
              </tr>
              <tr>
                <td class="samll">7</td>
                <td class="samll">3.8%</td>
                <td class="big">每周赠送800C，专属VIP活动，专属VIP客服</td>
              </tr>
              <tr>
                <td class="samll">8</td>
                <td class="samll">3.5%</td>
                <td class="big">每周赠送1000C，专属VIP活动，专属VIP客服</td>
              </tr>
              <tr>
                <td class="samll">9</td>
                <td class="samll">3.0%</td>
                <td class="big">每周赠送2000C，专属VIP活动，专属VIP客服</td>
              </tr>
            </table>
          </div>
          <div class="pright fleft" v-if="giftbaglist">
            <div class="giftbag-list">
              <swiper :options="swiperOption" ref="mySwiper">
                <swiper-slide v-for='data in giftbaglist' :key='data.level'>
                    <div class="giftbag-item" >
                      <img :src="data.pic">  
                      <p class="price psmall">价格：{{data.price}}元</p>
                      <p class="include psmall">包含：{{data.cprice}} 菜币 {{data.debris}} 碎片</p>
                      <button v-if="!data.can_buy && data.level<=userinfoshowlist.vip_level" class="buybtn buyed" ></button>
                      <button v-if="data.can_buy" class="buybtn" @click="buyGiftbag(data)">购买</button>
                      <button v-if="data.level>userinfoshowlist.vip_level" class="buybtn nobuy"></button>
                    </div>
                </swiper-slide>
                <div class="swiper-button-prev right" slot="button-prev"></div>
                <div class="swiper-button-next left" slot="button-next"></div>
              </swiper>
            </div>            
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import { swiper, swiperSlide } from 'vue-awesome-swiper'
  require ('@/assets/swiper/swiper.css');
  require ('@/assets/swiper/swiper.js');
  import Http from '@/common/http'
  export default {
    data() {
      return {
        swiperOption: {
          speed: 1000,
          loop:false,                    
          prevButton:true,
          grabCursor : true,
          nextButton:true,
          preventClicks:true,
          navigation: {
              nextEl: '.swiper-button-next',
              prevEl: '.swiper-button-prev',
          },
        },
        giftbaglist:[],
        helptiphide:false,
      }
    },
    props: ['isShow'],
    computed: {
      width() {
        if(!this.$store.state.home.userinfoshowlist) return 0;
        return 352 / this.$store.state.home.userinfoshowlist.expect_vip_exp * this.$store.state.home.userinfoshowlist.now_vip_exp
      },
      vipexp() {
        if(!this.$store.state.home.userinfoshowlist) return 0;
        return this.$store.state.home.userinfoshowlist.expect_vip_exp - this.$store.state.home.userinfoshowlist.now_vip_exp
      },
      userinfoshowlist() {
        return this.$store.state.home.userinfoshowlist ? this.$store.state.home.userinfoshowlist : null
      }
    },
    mounted() {
      if(!this.$store.state.home.userinfoshowlist) {
        this.$store.dispatch('userinfoshowdispatch')
      }
      var self = this
      Http.get('vip/giftbag').then(function(response){
        if(response.data.code==0){
          self.giftbaglist = response.data.data
        }
      });
    },
    methods: {
      handleclose() {
        this.$emit('closeme', false)
      },
      buyGiftbag: function(item) {
        this.$emit('closeme', false)
        
        this.$router.push({path:'/giftbag',query:{'level':item.level}})
      },
      helptipshows(){
        this.helptiphide=!this.helptiphide
      },
      helptiphides(){
        this.helptiphide=!this.helptiphide
      },
    },
    components:{
      swiper,
      swiperSlide
    }
  }
</script>
<style lang="scss" scoped>
  #signin {
    .main {
      width: 698px;
      height: 450px;
      position:absolute;
      top:50%;
      left: 50%;
      margin-left:-349px;
      margin-top: -225px;
      background-color: #23252b;
    }
    .tip{
      position: relative;
      top: 0px;
      left: 0px;
    }
    .helptip{
      width: 154px;
      height: 64px;
      background: url("../../assets/images/mygrand/deeptip.png") no-repeat;
      position: absolute;
      top:80px;
      left: -14px;
      z-index: 2;
      .helptip_info{
        font-size: 12px;
        color: #989898;
        width: 134px;
        line-height: 18px;
        text-align: left;
        margin:18px auto;
      }
    }
    .top {
      height: 102px;
      position: relative;
      left: 0;
      top:-20px;
    }
    .bottom {
      height: 340px;
      margin-top: -20px;
    }
    .btop {
      height: 18px;
      font-size: 12px;
      color: #989898;
      text-align: left;
      clear: both;
      padding-left: 50px;
      position: absolute;
      top:130px;
    }
    .bcontent {
      height: 322px;
    }
    .pleft {
      width: 380px;
      height: 256px;
      margin-left: 58px;
    }
    table {
      width: 360px;
      height: 256px;
      .th {
        color: #d5b671;
        font-size: 12px;
        text-align: center;
        border: 1px solid #545454;
        line-height: 24px;
      }
      td {
        text-align: center;
        border: 1px solid #545454;
        line-height: 24px;
      }
      .samll {
        width: 40px;
      }
      .big {
        width: 222px;
      }
    }
    .baginfo {
      height: 256px;
      width: 380px;
      border: 1px solid #dcdcdc;
    }
    .pright {
      width: 206px;
      height: 256px;
      border: 1px solid #e1c076;
      background-color: #15161a;
      padding: 12px 12px 14px 12px;
    }
    .pright_info {
      width: 130px;
      height: 130px;
      display: block;
      border: 1px solid #dcdcdc;
      margin: 0 auto;
    }
    .picwrap {
      background: url("../../assets/images/mygrand/paybg.jpg") center no-repeat;
      height: 102px;
    }
    .pic {
      height: 100px;
      width: 700px;
      margin: 20px auto;
    }
    .needs {
      font-size: 14px;
      color: #fff;
      .vip {
        color: #e4c670;
      }
    }
    .progress {
      width: 352px;
      height: 20px;
      background: #15161a;
      border-radius: 3px;
      position: relative;
      left: 0;
      top: 30px;
      .blue {
        background: linear-gradient(to right, #007c85, #013b46);
        width: 20px;
        height: 20px;
        display: inline-block;
        position: absolute;
        left: 0;
        top: 0;
        border-radius: 3px;
        z-index: 2;
      }
      .exp {
        width: 60px;
        font-size: 10px;
        color: #a5b3bc;
        position: absolute;
        right: 0;
        bottom: 0;
        line-height: 20px;
        text-align: right;
        padding-right: 3px;
      }
    }
    .vipimg {
      width: 120px;
      height: 120px;
      margin: 10px 20px;
      display: block;
      position: relative;
      top: -50px;
    }
    .tiptop {
      height: 44px;
      padding-left: 30px;
      line-height: 44px;
      position: relative;
      top: 30px;
      bottom: 0;
    }
    .help{
      width: 32px;
      height: 32px;
      background: url("../../assets/images/mygrand/help.png") 8px center no-repeat;
      position: absolute;
      left: -6px;
      top: 6px;
    }
    .x {
      right: 16px;
      top: 20px;
    }
    .psmall {
      text-align: left;
      padding-left: 6px;
      font-size: 12px;
      color: #989898;
      line-height: 18px;
      margin-top: 5px;
    }
    .price {
      margin-top: 10px;
    }
    .buybtn {
      width: 130px;
      height: 30px;
      line-height: 30px;
      font-size: 20px;
      color: #794e0d;
      border: none;
      background: linear-gradient(to bottom, #85643b, #e8d095);
      border-top: 1px solid #b5a688;
      border-left: 1px solid #b8955a;
      border-right: 1px solid #b8955a;
      border-bottom: 1px solid #ebc55e;
      border-radius: 3px;
      margin-top: 16px;
      &.buyed {
        background: url('../../assets/images/mygrand/buyed.png'); 
        border:none;
      }
      &.nobuy {
        background: url('../../assets/images/mygrand/nobuy.png'); 
        border:none;
      }
    }
    
    .giftbag-list{
      .swiper-slide {
        text-align: center;
        font-size: 18px;
        background: #fff;
        display: -webkit-box;
        display: -ms-flexbox;
        display: -webkit-flex;
        display: flex;
        -webkit-box-pack: center;
        -ms-flex-pack: center;
        -webkit-justify-content: center;
        justify-content: center;
        -webkit-box-align: center;
        -ms-flex-align: center;
        -webkit-align-items: center;
        align-items: center;
        background:none;
        img{
            width:130px;
            height:130px;
        }            
      }
      .swiper-button-next{
        top:45%;
        right:-9px;
        background-image: url('../../assets/images/ecright.png');
        background-size: 21px 29px;
        width: 40px;
        height: 92px;
      }
      .swiper-button-prev{
        top:45%;
        left:-10px;
        background-image: url('../../assets/images/ecleft.png');
        background-size: 21px 29px;
        width: 40px;
        height: 92px;
      }
    }
  }
</style>