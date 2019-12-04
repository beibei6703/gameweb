<template>
  <div id="scMall">
    <!-- ttreasure chest -->
    <ul class="treasure">
      <li v-for="(val,key) in recListData" :key="val.id" v-if="key<3">
        <div  class="box_img_wrap" >
          <img :src="val.product_pic" alt="" class="box_img" @mouseover="showBoxIntroduce($event)" @mouseout="hideBoxIntroduce($event)">
          <!-- <img src="../assets/img/mall/platinum_n.png" alt="" class="box_img" @mouseover="showBoxIntroduce($event)" @mouseout="hideBoxIntroduce($event)"> -->
          <div class="box_introduce" @mouseover="noShowInTroduce($event)">
            <p class="box_text">{{val.product_name}}</p>
            <p class="box_quailty_color_piece"  :class="`tiplv-${val.quality}`" >{{quality[val.quality-1]}}</p>
            <p class="box_price">售价:{{thousandBitSeparator(val.cprice)}}c</p>
            <div class="box_content"><span class="posi_txt"> 包含：</span><p class="include_detail" v-html="val.desc"></p></div>
            <!-- <div class="box_content"><span class="posi_txt"> 包含：</span><p class="include_detail" v-for="(item,key) in val.include" :key="key">{{item}}</p></div> -->
            <!-- <p class="box_content">说明：{{val.desc}}</p> -->
          </div>
        </div>
        <p class="box_buy_btn" @click="fnShowTreasureBuy(val.product_name,val.quality,val.include,val.cprice,val.product_pic,val.id,'buy',val.desc)">购买</p>
        <p class="light"></p>
      </li>
    </ul>
    <div class="section">
      <div class="article">
          <nav>
            <ul class="navlist">
              <li v-for="(val,key) in nav" :key="val.id" @click="fnNavTab(val.title,key)" :class="{navList_act:key==navNum}" >{{val.title}}</li>
            </ul>
            <div class="compete-mine-recharge" @click="openRecharge">充值</div>
          </nav>
          <div class="itemList" v-for="(val,key) in 4" :key="key" v-show="key == navNum" id="theItemList">
              <div class="type_wrap" v-if="navNum==2">
                <ul class="props_nav" >
                  <li v-for="(val,key) in propsNav" :key="key" @click="fnPropsTab(val.title,key)" :class="{propsActive:key==propsNavNum}">{{val.title}}</li>
                </ul>
                <p class="item_tip" >注：以下皮肤卡为网站道具，购买后可充值为等值点券。</p>
                <div class="props_wrap" v-for="(val,key) in 2" :key="key" v-show="key == propsNavNum">
                  <ul  class="goods_list" :class="{box_goods_list:navNum==3}" v-if="mallListData.length>0">
                    <li v-for="(val,key) in mallListData" :key="key" @mouseover="showGoodIntroduce($event)" @mouseout="hideGoodIntroduce($event)" >
                      <div class="goods_display">
                        <img :src="val.product_pic" alt="" class="goods_img"/>
                        <img src="../assets/img/mall/img_mask_k.png" alt="" class="goods_img_mask" v-if="navNum==3">
                        <img src="../assets/img/mall/img_mask_c.png" alt="" class="goods_img_mask" v-else>
                        <p class="box_mark" v-if="val.top==1">推荐</p>
                        <p class="goods_name">{{val.product_name}}</p>
                        <p class="goods_price">{{thousandBitSeparator(val.cprice)}}c</p>
                        <div class="goods_opration" v-if="navNum==0 || navNum==2">
                          <p class="goods_buy_btn goods_btn" @click="fnPropsBuy(val.product_name,val.quality,val.content,val.cprice,val.product_pic,val.id,val.game_id,1)">购买</p>
                          <p class="goods_give_btn goods_btn" @click="fnPropsBuy(val.product_name,val.quality,val.content,val.cprice,val.product_pic,val.id,val.game_id,2)">赠送</p>
                        </div>
                        <div class="goods_exchange_btn" v-if="navNum==1" @click="fnExchange(val.product_name,val.cprice,val.product_pic,val.id)">兑换</div>
                        <div class="goods_box_btn" v-if="navNum==3" @click="fnShowTreasureBuy(val.product_name,val.quality,val.include,val.cprice,val.product_pic,val.id,'buy',val.desc)">购买</div>
                      </div>
                      <div class="goods_introduce">
                        <div class="tiptop" >
                          <i  class="tipimg i1" v-if="val.game_id==1"></i>
                          <i  class="tipimg i2" v-if="val.game_id==2"></i>
                          <i  class="tipimg i3" v-if="val.game_id==3"></i>
                          <i  class="tipimg i4" v-if="val.game_id==4"></i>
                        <p class="tipname"> {{val.product_name}}</p>
                        </div>
                        <p class="tipquality"  :class="`tiplv-${val.quality}`">{{quality[val.quality-1]}}</p>
                        <p class="tipprice theme_color" >售价:{{thousandBitSeparator(val.cprice)}} C</p>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
              <div class="type_wrap" v-else>
                <p class="item_tip" v-if="navNum==0">注：以下皮肤卡为网站道具，购买后可充值为等值点券。</p>
                <ul  class="goods_list" :class="{box_goods_list:navNum==3}" v-if="mallListData&&mallListData.length>0">
                  <li v-for="(val,key) in mallListData" :key="key" @mouseover="showGoodIntroduce($event)" @mouseout="hideGoodIntroduce($event)" >
                    <div class="goods_display">
                      <img :src="val.product_pic" alt="" class="goods_img"/>
                      <img src="../assets/img/mall/img_mask_k.png" alt="" class="goods_img_mask" v-if="navNum==3">
                      <img src="../assets/img/mall/img_mask_c.png" alt="" class="goods_img_mask" v-else>
                      <p class="box_mark" v-if="val.top==1">推荐</p>
                      <p class="goods_name">{{val.product_name}}</p>
                      <p class="goods_price">{{thousandBitSeparator(val.cprice)}}c</p>
                      <div class="goods_opration" v-if="navNum==0 || navNum==2">
                        <p class="goods_buy_btn goods_btn" @click="fnPropsBuy(val.product_name,val.quality,val.content,val.cprice,val.product_pic,val.id,val.game_id,1)">购买</p>
                        <p class="goods_give_btn goods_btn" @click="fnPropsBuy(val.product_name,val.quality,val.content,val.cprice,val.product_pic,val.id,val.game_id,2)">赠送</p>
                      </div>
                      <div class="goods_exchange_btn" v-if="navNum==1" @click="fnExchange(val.product_name,val.cprice,val.product_pic,val.id)">兑换</div>
                      <div class="goods_box_btn" v-if="navNum==3" @click="fnShowTreasureBuy(val.product_name,val.quality,val.include,val.cprice,val.product_pic,val.id,'buy',val.desc)">购买</div>
                    </div>
                    <div class="goods_introduce">
                      <div class="tiptop" >
                        <i  class="tipimg i1" v-if="val.game_id==1"></i>
                        <i  class="tipimg i2" v-if="val.game_id==2"></i>
                        <i  class="tipimg i3" v-if="val.game_id==3"></i>
                        <i  class="tipimg i4" v-if="val.game_id==4"></i>
                      <p class="tipname"> {{val.product_name}}</p>
                      </div>
                      <p class="tipquality"  :class="`tiplv-${val.quality}`">{{quality[val.quality-1]}}</p>
                      <p class="tipprice theme_color" >售价:{{thousandBitSeparator(val.cprice)}} C</p>
                    </div>
                  </li>
                </ul>
                <div class="zanwu" v-if="navNum==3 && mallListData.length<1">暂无宝箱,敬请期待!</div>
              </div>
          </div>
      </div>
      <aside>
        <MineGuess/>
        <Hotcompete/>
      </aside>
    </div>
    <!-- <OpenTreasure/> -->
    <TreasureBuy v-if="this.$store.state.isDialogShow.isBuyTreasureShow"/>
    <TreasureBuySuccess v-if="this.$store.state.isDialogShow.isTreasureBuyScsShow"/>
    <ShopToolsPop v-if="this.$store.state.shop.isShow" ></ShopToolsPop>
    <ShopSuccessPop v-if="this.$store.state.shop.tan_kuang"></ShopSuccessPop>
    <ShopGivePop v-if="this.$store.state.shop.givehide"></ShopGivePop>
    <ShopCardsPop v-if="this.$store.state.shop.isCards"></ShopCardsPop>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        nav:[{title:'热门',id:1},{title:'虚拟卡',id:2},{title:'道具卡',id:3},{title:'宝箱',id:4}],
        navNum:0,
        propsNavNum:0,
        itemList:[],
        isBuyTreasureShow:false,
        dataUrl:['pop-buy','pop-give'],
        PopBtn:["购买","赠送"],
        PopMt:['mall-pop-mt95','mall-pop-mt62'],
        quality:['普通','优质','稀有','传说','不朽','永恒'],
        Pages:1,
        propsNav:[{title:'DOTA2',id:1},{title:'LOL',id:2}],
        isHasMore:this.$store.state.mall.hasMallMore
      }
    },
    methods: {
      fnNavTab(title,index) {
        this.navNum=index;
        let payload ;
        this.$store.commit("mutationMallList",null);
        if(index==0){
          payload ={
            category:1,
            hot:1,
            page:1,
          }
        }else if(index==1){
          payload ={
            category:2,
            page:1,
          }
        }else if(index==2){
          payload ={
            category:1,
            page:1,
            game_id:1
          }
        }else if(index==3){
          payload ={
            category:3,
            page:1,
          }
        }
        this.$store.dispatch('dispatchMallList',payload);
      },
      fnPropsTab(title,index) {
        this.propsNavNum=index;
        let payload ={
          category:1,
          page:1,
          game_id:index+1
        };
        this.$store.dispatch('dispatchMallList',payload);
      },
      showGoodIntroduce(event){//商品提示框-划入显示
        let ele = event.currentTarget.childNodes[2];
        ele.style.display='block';
      },
      hideGoodIntroduce(event){//商品提示框-划出隐藏
        let ele = event.currentTarget.childNodes[2];
        ele.style.display='none';
      },
      showBoxIntroduce(event){//宝箱提示框-划入显示
        // let ele = event.currentTarget.childNodes[2];
        // let light_ele = event.currentTarget.parentNode.childNodes[4];
        let ele = event.currentTarget.nextElementSibling;
        let light_ele = event.currentTarget.parentNode.parentNode.childNodes[4];
        ele.style.display='block';
        light_ele.style.display='block';
      },
      hideBoxIntroduce(event){//宝箱提示框-划出隐藏
        let ele = event.currentTarget.nextElementSibling;
        let light_ele = event.currentTarget.parentNode.parentNode.childNodes[4];
        ele.style.display='none';
        light_ele.style.display='none';
      },
      noShowInTroduce(event){
         let ele = event.currentTarget;
      },
      fnShowTreasureBuy(name,quality,include,price,pic,id,origin,desc){//宝箱购买详情-显示
        const boxOptions = {
          name,quality,include,price,pic,id,origin,desc
        }
        if(this.$store.state.user.userInfo){
          this.$store.commit('changeIsBuyTreasureShow',true)
          this.$store.commit('mutationBoxBuyOptions',boxOptions)
        }else{
          this.$store.commit('showLoginDialog',true);
          this.$store.commit('isloginBooleam',true);
        }
      },
      fnPropsBuy(name,popQuality,content,price,src,id,game_id,dataType){//props buy
        let i =dataType==1?0:1;
        let payload={
          name,
          popQuality,
          content,
          price,
          src,
          id,
          game_id,
          dataType,
          url:this.dataUrl[i],
          popbtn:this.PopBtn[i],
          buymt:this.PopMt[i]
        };
        if(this.$store.state.user.userInfo){
           this.$store.commit('test',true);
           this.$store.commit('test',payload);
           this.$store.dispatch('userInfo');
        }else{
          this.$store.commit('showLoginDialog',true);
          this.$store.commit('isloginBooleam',true);
        }
      },
      fnExchange(name,price,src,id){//virtual exchange
        let dataType;
        if(name.indexOf('京东')>-1){
          dataType=5;
        }else if(name.indexOf('Q币')>-1){
          dataType=6;
        }else if(name.indexOf('话费')>-1){
          dataType=7;
        }
        const payload = {
          name,
          price,
          src,
          id,
          dataType
        }
        if(this.$store.state.user.userInfo){
          this.$store.commit('isCards',true);
          this.$store.commit('isCards',payload);
          this.$store.dispatch('userInfo');
        }else{
          this.$store.commit('showLoginDialog',true);
          this.$store.commit('isloginBooleam',true);
        }
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
      getScrollHeight(){
        let scrollHeight = 0, bodyScrollHeight = 0, documentScrollHeight = 0;
        if(document.body){
          bodyScrollHeight = document.body.scrollHeight;
        }
        if(document.documentElement){
          documentScrollHeight = document.documentElement.scrollHeight;
        }
        scrollHeight = (bodyScrollHeight - documentScrollHeight > 0) ? bodyScrollHeight : documentScrollHeight;
        return scrollHeight;
      },
      getWindowHeight(){
        let windowHeight = 0;
        if(document.compatMode == "CSS1Compat"){
          windowHeight = document.documentElement.clientHeight;
        }else{
          windowHeight = document.body.clientHeight;
        }
        return windowHeight;
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
      renderList(){
        setTimeout(()=>{
          if(!this.isHasMore) return false;
          window.addEventListener('scroll', ()=>{
            if(!this.isHasMore) return false;
            if (this.getScrollTop() + this.getWindowHeight() >= this.getScrollHeight()) {
              this.$store.commit('mutationMallListPages',this.$store.state.mall.mallListPages+1)
              if(this.isHasMore){
                let payload ;
                if(this.navNum==0){
                  payload ={
                    category:1,
                    hot:1,
                    page: this.$store.state.mall.mallListPages,
                  }
                }else if(this.navNum==1){
                  payload ={
                    category:2,
                    page: this.$store.state.mall.mallListPages,
                  }
                }else if(this.navNum==2){
                  payload ={
                    category:1,
                    page: this.$store.state.mall.mallListPages,
                    game_id:this.propsNavNum+1,
                  }
                }else if(this.navNum==3){
                  payload ={
                    category:3,
                    page: this.$store.state.mall.mallListPages,
                  }
                }
                this.$store.dispatch('dispatchMallList',payload);
              }
            }
         })
         },100)
      }
    },
    mounted() {
      this.fnNavTab('he',0);
      this.$store.dispatch('dispathchRecommendList');
      this.renderList();
    },
    computed: {
      mallListData(){//mall list data origin
        return this.$store.state.mall.mallListData || null;
      },
      recListData(){//mall list recommend commodities
        return this.$store.state.mall.recListData || null;
      }
    },
    destroyed() {
      this.navNum=0;
    },

  }
</script>

<style scoped lang="scss">
  #scMall{
    .zanwu{
      color: #dcdcdc;
      font-size: 16px;
      margin:200px auto;
    }
    .treasure{
      display: flex;
      justify-content: space-around;
      width: 100%;
      li{
        position: relative;
        .box_img_wrap{
          width: 258px;
          height: 210px;
        }
        .box_img{
          position: relative;
          z-index: 2;
          display: block;
          max-width: 100%;
          max-height: 100%;
          top:100%;
          left: 50%;
          transform: translate(-50%,-100%);

        }
        &:nth-child(1){
           .box_img{
              transform: translate(-50%,-88%);
            }
            .box_introduce{
              top:16px;
              left: 198px;
            }
            .light{
              top:-5px;
              left: -64px;
            }
            .box_buy_btn{
              margin:-6px 0 0 72px;
            }
        }
        &:nth-child(2){
          .box_img{
              transform: translate(-50%,-84%);
          }
          .light{
              top:1px;
              left: -50px;
          }
          .box_introduce{
            top: 0;
            left:196px;
          }
          .box_buy_btn{
              margin:-5px 0 0 78px;
              position: relative;
              z-index: 2;
          }
        }
        &:nth-child(3){
          .box_img{
              transform: translate(-50%,-81%);
          }
          .light{
              top:0;
              left: -90px;
          }
          .box_introduce{
            top:0;
            left: 196px;
          }
          .box_buy_btn{
              margin:-5px 0 0 74px;
          }
        }
        .box_buy_btn{//btn about bug
            width:108px;
            height: 32px;
            text-align: center;
            font-size: 14px;
            color: #fff;
            line-height: 32px;
            background: url('../assets/img/mall/box_buy_n.png')  no-repeat;position:relative;top:0;left:0; z-index:100;
            background-size: contain;
            &:hover{
              background: url('../assets/img/mall/box_buy_h.png') no-repeat;
            }
        }
      }
      .box_introduce{
        width: 262px;
        height: 264px;
        position: absolute;
        background: url('../assets/img/mall/box_introduce_bg.png') no-repeat;
        background-size: contain;
        padding:6px 10px;
        font-size: 14px;
        text-align: center;
        top:-20px;
        left: 106px;
        z-index: 3;
        display: none;
        .box_text,.box_content{
          color: #fff;
          margin:14px 0 4px 0;
        }
        .box_quailty_color_piece{
          width: 237px;
          height: 16px;
          margin:2px 9px;
          right: 0 !important;
        }
        .box_price{
          color: #c38e2a;
          margin-top:30px;
        }
        .box_content{
          text-align: left;
          padding: 0 4px 0 16px;
          position: relative;
          font-size: 12px;
        }
        .include_detail{
            line-height: 20px;
            padding-left: 40px;

        }
        .posi_txt{
          position: absolute;
          left: 20px;
          top:5px;
        }
      }
      .light{
        width: 406px;
        height: 266px;
        background: url('../assets/img/mall/light.png') no-repeat;
        background-size: 406px 266px;
        position: absolute;
        display: none;
      }
    }
    .section{
      margin:0 auto;
      display: flex;
      justify-content: space-between;
      margin-top:76px ;
      aside{
        margin-left: 10px;
      }
      .article{
        // width: 878px;
        width:920px !important;
        padding-bottom: 50px;
        background: #242426;
        nav{
          width: 100%;
          height: 62px;
          background: #3c3c44;
          border-radius: 2px;
          position: relative;
          z-index: 2;
          .navlist{
            width: 100%;
            padding:24px 0 0 26px;
            display: flex;
            background:url('../assets/img/mall/mall_nav_border.png') no-repeat bottom center;

            .navList_act{
              background: #242426;
              // border:1px solid #fff;
              // border-bottom:none;
              background:url('../assets/img/mall/mall_nav_border_hover.png') no-repeat top center;
              height: 39px;
              color: #fff;
            }
            li{
              width: 80px;
              height: 38px;
              text-align: center;
              line-height: 38px;
              color: #858585;
              font-size: 14px;
            }
          }
        }
        .itemList{
          // border-top:1px solid #fff;

          .type_wrap{
            // padding:42px 10px 0 10px;
          }
          .item_tip{
            color: rgba(191,191,10,1);
            font-size: 14px;
            line-height: 40px;
            text-align: left;
            padding-left: 26px;
          }
          .props_nav{
            display: flex;
            height: 30px;
            // justify-content: flex-end;
            line-height: 30px;
            margin-top: 16px;
            li{
              width: 80px;
              text-align: center;
              margin:0 8px;
              color: #858585;
              font-size: 14px;
            }
            .propsActive{
              background: #909090;
              color: #000;
              border-radius: 22px;
            }
          }
          .goods_list{
            width: 100%;
            display: flex;
            // justify-content: space-around;
            flex-wrap: wrap;
            // padding:42px 10px 0 10px;
            padding:16px 10px 0 10px;
            li{
              width: 188px;
              height: 350px;
              background: url("../assets/img/mall/goods_list_bg_n.png") no-repeat;
              margin: 0 4px 30px;
              position: relative;
              .box_mark{
                width: 45px;
                height: 35px;
                display: block;
                position: absolute;
                top:-20px;
                right:8px;
                z-index: 3;
                background: url("../assets/img/mall/tip.png") no-repeat;
                background-size: cover;
                font-size: 14px;
                color: #fff;
                line-height: 35px;
              }
              &:hover{
                background: url("../assets/img/mall/goods_list_bg_h.png") no-repeat;
              }
              .goods_display{
                position: relative;
              }
              .goods_img{
                width: 140px;
                height: 218px;
                display: block;
                margin:20px 26px 14px;
              }
              .goods_img_mask{
                width: 140px;
                height: 218px;
                position: absolute;
                top:0;
                left:26px;
                z-index: 2;
              }
              .goods_name{
                text-align: center;
                color: #fff;
                font-size: 14px;
              }
              .goods_price{
                text-align: center;
                color: #c38e2a;
                font-size: 18px;
                font-weight: 900;
                line-height: 26px;
              }
              .goods_opration{
                width: 100%;
                display: flex;
                justify-content: center;
                .goods_btn{
                  width: 66px;
                  height: 26px;
                  margin:2px;
                  line-height: 26px;
                  font-size: 14px;
                  color: #fff;
                  text-align: center;
                }
                .goods_buy_btn{
                  background: url('../assets/img/mall/buy.png')  no-repeat;
                  background-size: cover;
                  &:hover{
                    background: url('../assets/img/mall/buy_h.png')  no-repeat;
                    background-size: cover;
                  }
                }
                .goods_give_btn{
                  background: url('../assets/img/mall/give_n.png')  no-repeat;
                  background-size: cover;
                  &:hover{
                    background: url('../assets/img/mall/give_h.png')  no-repeat;
                    background-size: cover;
                  }
                }
              }
              .goods_exchange_btn,.goods_box_btn{
                  width: 66px;
                  height: 26px;
                  margin:0 auto;
                  line-height: 26px;
                  font-size: 14px;
                  color: #fff;
                  text-align: center;
                  background-size: cover;
              }
              .goods_exchange_btn{
                background: url('../assets/img/mall/exchange_n.png')  no-repeat;
                &:hover{
                  background: url('../assets/img/mall/exchange_h.png')  no-repeat;
                  background-size: cover;
                }
              }
              .goods_box_btn{
                background: url('../assets/img/mall/buy.png')  no-repeat;
              }
            }

          }
          .box_goods_list{
              li{
                height: 272px;
                background: url("../assets/img/mall/treasure_list_bg_n.png") no-repeat;
                &:hover{
                   background: url("../assets/img/mall/treasure_list_bg_h.png") no-repeat;
                }
                .goods_img{
                  width: 140px;
                  height: 140px;
                  display: block;
                  background: url("../assets/img/mall/treasure_bg.png") center no-repeat;
                  padding: 21px 15px;
                }
                .goods_img_mask{
                  width: 140px;
                  height: 140px;
                }
              }
          }
          .goods_introduce{
                width:190px;
                height: 88px;
                font-size: 14px;
                line-height: 20px;
                position: absolute;
                left: 188px;
                top:50px;
                z-index:2;
                padding: 3px;
                text-align: left;
                background: url('../assets/images/Mall-images/mall-case.png') no-repeat;
                background-size: 190px 88px;
                padding-left: 20px;
                display: none;
                .tipimg{
                  padding: 0;
                  margin:0;
                  width: 18px !important;
                  height: 18px !important;
                  margin-left: 20px;
                  position: absolute;
                  left: 20px;
                  top:13px;
                  display: block;
                  background:url('../assets/images/competeImg/guess_logoS.png') no-repeat;
                }
                .i1{
                  background-position:-42px -4px;
                }
                .i2{
                  background-position:-6px 0;
                }
                .i3{
                  background-position:-102px 0;
                }
                .i4{
                  background-position:-68px 0;
                }
                .tipname{
                  margin: 8px 0px 8px 40px;
                }
                .tipprice{
                  margin-top:30px;
                  text-align: center;
                  // color: #8bd102;
                }
              }
        }
      }
    }

  }
  .compete-mine-recharge {
        width: 72px;
        height: 30px;
        color: #fff;
        background: url('../assets/img/home/icon_recharge_normal.png') no-repeat center;
        position: absolute;
        top: 24px;
        right: 20px;
        line-height: 30px;
        text-align: center;
        font-size: 16px;
        cursor: pointer;
    }

    .compete-mine-recharge:hover {
        background: url('../assets/img/home/icon_recharge_hover.png') no-repeat center;
    }
</style>
