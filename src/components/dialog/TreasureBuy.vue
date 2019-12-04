<template>
  <div id="treasureBuy">
    <div class="treasureBuy_mask">
      <div class="treasureBuy_main" v-if="pageInfo">
       <p class="title" v-if="pageInfo.origin=='buy'">购买详情</p>
       <p class="title" v-if="pageInfo.origin=='open'">宝箱开启</p>
       <div class="treasure_introduce">
         <img :src="pageInfo.pic" alt="" class="box_img" />
         <div class="text">
           <p class="box_name">{{pageInfo.name}}</p>
           <p class="box_quailty"  :class="`tiplv-${pageInfo.quality}`">{{quality[pageInfo.quality-1]}}</p>
           <!-- <p class="box_content" v-if="pageInfo.desc && pageInfo.origin=='open'">说明:{{pageInfo.desc}}</p> -->
           <!-- <div class="box_content" v-if="pageInfo.include && pageInfo.origin=='buy'">
              <span class="pos_txt">包含：</span>
              <p class="include_details" v-for="(item,key) in pageInfo.include" :key="key">{{item}}</p>
          </div> -->
          <div class="box_content" v-if="pageInfo.desc">
              <span class="pos_txt">包含：</span>
              <p class="include_details" v-html="pageInfo.desc"></p>
          </div>
         </div>
       </div>
        <div class="order_details">
           <p class="options_list" v-if="pageInfo.origin=='buy'">
             <span class="options_title">单&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;价：</span>
             <span class="theUnitPrice">{{thousandBitSeparator(pageInfo.price)}}c</span>
           </p>
           <p class="options_list">
             <span class="options_title" v-if="pageInfo.origin=='buy'">购买数量：</span>
             <span class="options_title" v-if="pageInfo.origin=='open'">开启数量：</span>
             <span class="buy_num" >
              <i @click="Popminus" class="pointer no-select">-</i>
              <input type="tel"  class="buyNum" ref="inputNumber" :value="result>=99?99:result" @blur="popblur" @input="fnNumChange" @keyup="handleInput" maxlength="9">
              <i @click="Popplus" class="pointer no-select">+</i>
             </span>
           </p>
            <p class="options_list" v-if="pageInfo.origin=='buy'">
             <span class="options_title">总&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;计：</span>
             <span class="theUnitPrice">{{thousandBitSeparator((result>99?99:result)*pageInfo.price)}}c</span>
           </p>
        </div>
        <!-- <div class="tip" v-if="pageInfo.desc && pageInfo.origin=='open'">
          <span class="pos_txt">包含：</span>
           <p class="include_details" v-html="pageInfo.desc"></p>
        </div> -->
        <div class="operation_btn" :class="{open_operation_btn:pageInfo.origin=='open'}">
          <p class="ensure_btn pointer" @click="fnBuyEnsure(pageInfo.id,pageInfo.price,pageInfo.name)" v-if="pageInfo.origin=='buy'">确定</p>
          <p class="ensure_btn pointer" @click="fnOpenEnsure(pageInfo.id,pageInfo.price,pageInfo.name)" v-if="pageInfo.origin=='open'">确定</p>
          <img src="../../assets/img/mybag/openGif.gif" alt="" class="opengif" v-if="isGifShow">
          <p class="cancel_btn pointer" @click="fnCancel()">取消</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Http from "../../common/http.js";
  export default {
    data() {
      return {
         result:1,
         isGifShow:false,
         quality:['普通','优质','稀有','传说','不朽','永恒']
      }
    },
    methods: {
      Popminus() {
        if(this.result>99){
          this.result=99;
        }
        this.result--;
        if(this.result <=1){
          this.result = 1;
        }else {
          this.$emit('input',{res:this.result,other:'--'})
        }
      },
      Popplus(){
        this.result++;
        const pageInfo = this.$store.state.mall.boxOptions || null;
        if(pageInfo.origin=='open'){
            if(this.result>=pageInfo.count){
              this.result=pageInfo.count;
            }
            if(this.result>99){
              this.result=99;
            }
        }
        this.$emit('input',{res:this.result,other:'++'});
      },
      popblur() {
        this.result=this.$refs.inputNumber.value > 99 ? 99 : this.$refs.inputNumber.value;
        const pageInfo = this.$store.state.mall.boxOptions || null;
        if(pageInfo.origin=='open'){
            if(this.result>=pageInfo.count){
              this.result=pageInfo.count;
            }
        }
      },
      fnNumChange(){
        this.result=this.$refs.inputNumber.value > 99 ? 99 : this.$refs.inputNumber.value;
      },
      handleInput(e){
        e.target.value=e.target.value.replace(/\D/g,'')
        if(parseInt(this.$refs.inputNumber.value)<=1||this.$refs.inputNumber.value==''){
          this.$refs.inputNumber.value = '1'
        }
        if(this.$refs.inputNumber.value[0]==0){
          this.$refs.inputNumber.value=this.$refs.inputNumber.value.slice(1)
        }
      },
      fnBuyEnsure(product_id,price,name){//ensure to buy treasure chest
        const count = this.result*price;//total price you need pay;
        const theAccountBalance = this.$store.state.user.userInfo ? this.$store.state.user.userInfo.cai:null;
        const payload = {
          product_id,
          num:this.result
        };
        const options = {
          name,
          price,
          nums:this.result
        }
        if(this.$store.state.user.userInfo){// whether to log in
          if(parseInt(theAccountBalance)>=parseInt(count)){
            Http.post('shop/treasureBoxes/buy',payload).then(res=>{
            if(res.data.code==0){
              this.$store.commit('mutationBoxGetSucOptions',options);
              this.$store.commit('changeisTreasureBuyScsShow',true);
              this.$store.commit('changeIsBuyTreasureShow',false);
              this.$store.dispatch('userInfo')
              this.result='1';
            }else{
              let dataOption ={
                'masseges':res.data.message,
                'type':'1',
              }
              this.$store.commit('isSigninPupopDis',true);
              this.$store.commit('isSigninPupopDis',dataOption);
              this.result='1';
              this.$store.commit('test',false);
            }
          }).catch(Http.onError);
          }else{
            let dataOption ={
              'masseges':'你的账户余额不足，是否需要充值？',
              'typePay':'2',
            }
            this.$store.commit('isSigninPupopDis',true);
            this.$store.commit('isSigninPupopDis',dataOption);
            this.result='1';
          }
        }else{
           this.$store.commit('showLoginDialog',true);
           this.$store.commit('isloginBooleam',true);
           this.result='1';
        }
      },
      fnOpenEnsure(box_id,price,name){//ensure to open the treasure chest
        const payload = {
          box_id,
          num:this.result
        };
        if(this.$store.state.user.userInfo){//whether to log in
            Http.post('shop/treasureBoxes/open',payload).then(res=>{
            if(res.data.code==0){
              this.isGifShow=true;
              setTimeout(() => {
                let response = res.data.data;
                this.isGifShow=false;
                this.$store.commit('mutationPrizeBoxShow',true)
                this.$store.commit('changeIsBuyTreasureShow',false);
                this.$store.commit('mutationPrizeOfTreasure',response);
                this.$store.commit('mutationTreasureName',name)
                if(response.prop.length>0){
                  let newSkinCd =  [];
                  // response.forEach((val,key) => {
                  //   newSkinCd.push(val.id);
                  // });
                  Object.keys(response.prop).forEach((val,key)=>{
                    newSkinCd.push(response.prop[key].product_id);
                  })
                  this.$store.commit('mutationShowRedpoint',true);
                  this.$store.commit('mutationNewSkinCd',newSkinCd);
                }
                this.$store.dispatch('userInfo');
                this.result='1';
              }, 1000);

            }else{
              let dataOption ={
                'masseges':res.data.message,
                'type':'1',
              }
              this.$store.commit('isSigninPupopDis',true);
              this.$store.commit('isSigninPupopDis',dataOption);
              this.result='1';
            }
            }).catch(Http.onError);
        }else{
           this.$store.commit('showLoginDialog',true);
           this.$store.commit('isloginBooleam',true);
           this.result='1';
        }
      },
      fnCancel(){//cancle to buy treasure chest
        this.$store.commit('changeIsBuyTreasureShow',false);
      }
    },
    computed: {
      pageInfo() {
        return this.$store.state.mall.boxOptions || null;
      }
    },
    watch: {
      result(newValue, oldValue) {
        if(newValue>99){
          oldValue = 99;
        }
      }
    },
  }
</script>

<style scoped lang="scss">
  #treasureBuy{
    width: 100%;
    height: 100%;
    position: fixed;
    top:0;
    right: 0;
    bottom: 0;
    left: 0;
    outline: 0;
    z-index: 88;
    .treasureBuy_mask{
      position: fixed;
      top:0;
      right: 0;
      bottom: 0;
      left: 0;
      outline: 0;
      background: rgba(5,6,6,.8);
      .treasureBuy_main{
        width: 420px;
        height: 432px;
        position: fixed;
        top:50%;
        left: 50%;
        transform: translate(-50%,-50%);
        z-index: 2;
        background: url("../../assets/img/mall/treasure_buy.png") no-repeat;
        background-size: cover;
        padding-top: 10px;
        .opengif{
          position: fixed;
          top:50%;
          left: 50%;
          transform: translate(-50%,-50%);
          width: 896px;
          height: 774px;
          z-index: 3;
        }
        .title{
          line-height: 40px;
          text-align: center;
          color: #c38e2a;
          font-size: 16px;
        }
        .treasure_introduce{
          padding:24px 50px;
          display: flex;
          justify-content: space-between;
        }
        .box_img{
          width: 108px;
          height: 108px;
          display: block;
          border: 1px solid #d3ded3;
        }
        .text{
          width: 218px;
          margin-left: 10px;
        }
        .box_name{
          text-align: left;
          color: #dcdcdc;
          font-size: 16px;
          font-weight: 900;
        }
        .box_quailty{
          width: 140px;
          height:18px ;
          color: #fff;
          font-size: 14px;
          text-align: center;
          line-height: 18px;
          margin:4px 0;
          position: relative !important;
          right: 0;
        }
        .box_content{
          text-align: left;
          word-wrap:break-word;
          color: #dcdcdc;
          font-size: 12px;
          line-height: 18px;
          position: relative;
        }
        .pos_txt{
          position: absolute;
          top:1px;
        }
        .include_details{
          line-height: 20px;
          padding-left: 38px;
        }
        .options_list{
          height: 36px;
          line-height: 36px;
          padding:0 60px;
          display: flex;
          justify-content: space-between;
        }
        .buyNum{
          width: 42px;
          background: transparent;
          border:none;
          outline:none;
          border-bottom: 1px solid #737373;
          text-align: center;
          color: #dcdcdc;
          margin:0 16px;
        }
        .theUnitPrice{
          margin-right: 20px;
        }
        .operation_btn{
          display: flex;
          justify-content: center;
          margin-top: 10px;
          p{
            width: 80px;
            height: 26px;
            border-radius: 2px;
            margin:0 10px;
            line-height: 26px;
            font-size: 14px;
          }
        }
        .open_operation_btn{
          margin-top:46px;
        }
        .ensure_btn{
          background: url("../../assets/img/mall/dialog_buy_n.png") no-repeat;
          background-size: cover;
          &:hover{
             background: url("../../assets/img/mall/dialog_buy_h.png") no-repeat;
          }
        }
        .cancel_btn{
          border:1px solid #c38e2a;
          color: #c38e2a
        }
        .tip{
          margin-top: 14px;
          padding:0 60px;
          font-size: 12px;
          line-height: 16px;
          color: #999;
          text-align: left;
          word-wrap:break-word;
          position: relative;
        }
      }
    }
  }
</style>
