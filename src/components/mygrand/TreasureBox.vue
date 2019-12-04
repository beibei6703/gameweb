<template>
  <div id="treasurebox">
    <div class="myBag">
      <div class="myBag-item" v-if="mybag">
        <p v-if="mybag.length==0" class="nobag">暂无宝箱</p>
        <ul class="myBag-item-list">
          <li class="myBag-item-list-li fl" v-for="(item,index) in mybag" ref="thisli" :data-name="item.product_name" :data-id="item.product_id" :key="item.product_id" :data-index="index" :data-gameId="item.game_id" :data-price="item.cprice" :data-quality="item.quality" :data-icon="item.game_id" :data-cprice="item.product_cprice" :data-count="item.product_count" >
             <div class="myBag-item-list-li-pic" :class="`V-${item.quality}`">
              <img :src="item.product_pic" :alt="item.product_name" class="myBag-pic" :class="{gray:isExpired(item.expired_at)}" @mouseenter="toggleCase($event)" @mouseleave="toggleCaseR" v-if="item.quality==1 && item.product_id==0">
              <img :src="item.product_small_pic" :alt="item.product_name" class="myBag-pic" :class="{gray:isExpired(item.expired_at)}" @mouseenter="toggleCase($event)" @mouseleave="toggleCaseR" v-else>
              <span class="periodValidity" v-if="item.expired_at" :class="{expired:isExpired(item.expired_at)}">截止日期：{{item.expired_at.substring(0,10)}}</span>
            </div>
            <p class="name_num">{{item.product_name}} x {{item.product_count}}</p>
            <!--道具按钮-->
            <div class="expiredWrap" v-if="isExpired(item.expired_at)">
               <div class="myBag-item-list-li-btn open_btn expired_btn" > 已过期</div>
            </div>
            <div class="expiredWrap" v-else>
              <div class="myBag-item-list-li-btn" v-if="item.product_id==0">
                <p class="open_btn pointer" @click="fnOpenTreasure(item.product_name,item.quality,item.product_id,item.game_id,item.product_small_pic,'open',item.product_count,item.include,item.desc)">开启宝箱</p>
                <i class="clear"></i>
              </div>
              <div class="myBag-item-list-li-btn" v-else>
                <p class="open_btn pointer" @click="fnOpenTreasure(item.product_name,item.quality,item.product_id,item.game_id,item.product_small_pic,'open',item.product_count,item.include,item.desc)">开启宝箱</p>
              </div>
            </div>

            <!-- <div class="expiredWrap" v-else>
               <div class="myBag_expired_btn" > 已过期</div>
            </div> -->
          </li>
          <i class="clear"></i>
          <!--商城品质框1-->
          <div class="mall-case" ref="mallPop" v-show="isCase">
            <div class="mall-case-title">
              <span class="mall-case-title-icon inline-block" ref='productIcon'></span>
              <span class="mall-case-title-name inline-block" ref="productName"></span>
            </div>
            <div class="mall-case-quality" ref="productbg">
              <span class="mall-case-quality-name" ref="productquality"></span>
            </div>
            <div class="mall-case-price">
              <span class="mall-case-price-txt inline-block" ref="productnumname">价格：</span>
              <span class="mall-case-price-num inline-block" ref="productnum"></span>
            </div>
          </div>
        </ul>
      </div>
    </div>
    <div class="myBagPop">
      <ShopToolsPop v-if="this.$store.state.shop.isShow"></ShopToolsPop>
      <ShopGivePop v-if="this.$store.state.shop.givehide"></ShopGivePop>
      <TreasureBuy v-if="this.$store.state.isDialogShow.isBuyTreasureShow"/>
      <OpenTreasure v-if="this.$store.state.isDialogShow.isPrizeBoxShow"/>
    </div>
    <router-view></router-view>
  </div>
</template>
<script>
export default {
  data () {
      return {
        isCase:false,
        dataUrl:['pop-give','pop-use'],
        PopType:0,
        expiredStatus:false,
      }
  },
  methods:{
     isExpired(expiredTime){
      if(!expiredTime) return false;
      let endTime = new Date(expiredTime);
      let curTime = new Date();
      let jetLag = endTime.getTime() - curTime.getTime();
      jetLag = Math.round(jetLag/1000);
      return jetLag>0?false:true ;
    },
    toggleCase:function(event){
      this.isCase = true;
      let el = event.currentTarget.parentNode.parentNode;
      let Index=el.getAttribute('data-index');
      let mallPop =this.$refs.mallPop;
      let _li =this.$refs.thisli;
      let caseIcon = el.getAttribute('data-icon');
      let caseIconNo = el.getAttribute('data-id');
      let _v;
      _v=parseInt(Index/4)
      mallPop.style.top=(20+227*_v)+'px';
      mallPop.style.left=150+208*parseInt(Index%4)+'px';
      this.$refs.productName.innerHTML=el.getAttribute('data-name');
      this.$refs.productnum.innerHTML=this.thousandBitSeparator(parseInt(el.getAttribute('data-cprice'))) +' C';
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
        this.$refs.productIcon.className='case-iconlol';
        this.$refs.productIcon.style.display='inline-block'
        this.$refs.productnumname.style.display='inline-block';
      }else if(caseIcon==1){
        this.$refs.productIcon.className='case-icondota'
        this.$refs.productIcon.style.display='inline-block'
        this.$refs.productnumname.style.display='inline-block';
      }else if(caseIconNo==0){
        this.$refs.productIcon.style.display='none';
        this.$refs.productquality.innerHTML='普通';
        this.$refs.productName.innerHTML='道具碎片';
        this.$refs.productnum.innerHTML='可用于道具合成';
        this.$refs.productnumname.style.display='none';
        this.$refs.productbg.className='mall_ordinaryb';
      }
    },
    toggleCaseR:function () {
      this.isCase = false
    },
    fnOpenTreasure(name,quality,id,game_id,pic,origin,count,include,desc){
       const boxOptions = {
         name,quality,id,game_id,pic,origin,count,include,desc
        }
        this.$store.commit('changeIsBuyTreasureShow',true)
        this.$store.commit('mutationBoxBuyOptions',boxOptions)
    }
  },
  computed:{
    mybag:function () {
      return this.$store.state.shop.bag_treasure_list?this.$store.state.shop.bag_treasure_list:null
    },
  },
}
</script>
<style lang="scss" scoped>
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
.myBag {
  .myBag-item {
    padding: 24px 0 0 46px;
    .nobag{
      height: 300px;
      line-height: 300px;
    }
    .myBag-item-list {
      position: relative;
      .myBag-item-list-li {
        margin-right: 28px;
        margin-bottom: 16px;
        width: 180px;
        height: 210px;
        // background: #121212;
        cursor: auto;
        .myBag-item-list-li-pic {
          position: relative;
          background: #000;
          border: 1px solid red;
          height: 130px;
          width: 130px;
          margin: 10px auto;
          padding: 12px;
          .myBag-pic {
            width: 106px;
            height: 106px;
          }
          .gray {
            -webkit-filter: grayscale(100%);
            -moz-filter: grayscale(100%);
            -ms-filter: grayscale(100%);
            -o-filter: grayscale(100%);
            filter: grayscale(100%);
            filter: gray;
          }
          .periodValidity{
            position: absolute;
            width: 132px;
            height: 22px;
            line-height: 22px;
            font-size: 10px;
            color: #fff;
            background: #f24f2a;
            bottom: 8px;
            left: -1px;
            text-align: center;
            transform: scale(0.8);
          }
          .expired{
            background: #666;
          }
        }
        .myBag-item-list-li-btn {
          margin-top: 13px;
          padding: 0 15px;
          div {
            float: left;
            font-size: 12px;
            color: #fff;
            width: 70px;
            height: 24px;
            text-align: center;
            line-height: 24px;
            cursor: pointer;
          }
          .myBag-item-list-li-btn-left{
            background: url('../../assets/images/Mall-images/tools-btnl.png') no-repeat ;
            transition: all .2s;
            &:hover{
              background: url('../../assets/images/Mall-images/tools-btnlr.png') no-repeat ;
              height: 24px;
              line-height: 24px;
            }
          }
          .myBag-item-list-li-btn-right{
            background: url('../../assets/images/Mall-images/tools-btnr.png') no-repeat;
            transition: all .2s;
            &:hover{
              background: url('../../assets/images/Mall-images/tools-btnrr.png') no-repeat ;
              height: 24px;
              line-height: 24px;
            }
          }
          .myBag-item-list-li-btn-hecheng{
            margin: 0 auto;
            background: url('../../assets/images/Mall-images/tools-btnr.png') no-repeat;
            transition: all .2s;
            &:hover{
              background: url('../../assets/images/Mall-images/tools-btnrr.png') no-repeat ;
              height: 24px;
              line-height: 24px;
            }
          }
        }
      }
      .myBag-item-list-li:nth-child(4),.myBag-item-list-li:nth-child(8),.myBag-item-list-li:nth-child(12),.myBag-item-list-li:nth-child(16),.myBag-item-list-li:nth-child(20){
        margin-right: 0;
      }
      /*.myBag-item-list-li:nth-child(5), .myBag-item-list-li:nth-child(10) {*/
        /*margin-right: 0;*/
      /*}*/
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
  .name_num{
    text-align: center;
    font-size: 14px;
    color: #bbb;
  }
  .open_btn{
    width: 82px;
    height: 28px;
    line-height: 28px;
    font-size: 14px;
    color: #fff;
    text-align: center;
    background: url('../../assets/img/mall/dialog_buy_n.png')  no-repeat;
    background-size: cover;
    margin:0 auto;
    &:hover{
      background: url('../../assets/img/mall/dialog_buy_h.png')  no-repeat;
      background-size: cover;
    }
  }
  .expired_btn{
    background:#666;
    cursor: default;
    &:hover{
      background:#666;
    }
  }
}
</style>


