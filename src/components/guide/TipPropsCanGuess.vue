<template>
  <div id="dialong" v-if="isTipPropsCanGuessShow && this.$route.path.indexOf('/Warehouse/')!=-1" >
    <div class="dialog_bg"></div>
    <div class="dialog_mask">
      <div class="main"  :class="{onemain : mybag[0].product_id!=0}" v-if="mybag" :style="'top:'+(getmygrandGuessData&&getmygrandGuessData.length>0?'528':'249')+'px'">
        <div class="left">
          <div class="img_wrap" :class="`V-${mybag[0].quality}`">
            <img :src="mybag[0].product_pic" alt="" class="img" v-if="mybag[0].product_id!=0">
            <img :src="mybag[1].product_pic" alt="" class="img" v-else>
          </div>
          <p class="nums" v-if="mybag[0].product_id!=0">{{mybag[0].product_name}} x {{mybag[0].product_count}}</p>
          <p class="nums" v-else>{{mybag[1].product_name}} x {{mybag[1].product_count}}</p>
          <div class="pretend_btns">
            <p class="btn_give btn">赠送</p>
            <p class="btn_use btn">使用</p>
          </div>
        </div>
        <div class="theme">
          <!-- <img src="../../assets/img/guide/eleven_close.png" alt="" class="close pointer"> -->
          <p class="txt"><span @click="closeCurrentPages"></span></p>
          <p  class="operation_btn pointer"  @click="toGuess"></p>
        </div>
      </div>
    </div>
    <div style="opacity:0;filter:alpha(opacity=0)" v-if="getmygrandGuessData&&getmygrandGuessData.length>0">{{getmygrandGuessData.length>0?'1':'0'}}</div>
  </div>
</template>

<script>
 import router from "@/router";
  export default {
    computed: {
      mybag(){
        return this.$store.state.shop.mybag||null;
      },
      isTipPropsCanGuessShow(){
        return this.$store.state.isDialogShow.isTipPropsCanGuessShow || false;
      },
      getmygrandGuessData(){
        return this.$store.state.match.mygrandGuessData || [];
      },
      isFirstGetPropsShow() {
        return this.$store.state.isDialogShow.isFirstGetPropsShow || false;
      },
    },
    methods: {
      closeCurrentPages() {
        this.$store.dispatch("setNewGuidanceStepDispatch",{guidanceNum:6});
        this.$store.commit("mutationTipPropsCanGuessShow",false);
        this.$store.commit("mutationUserFirstGetProps",false);
        document.documentElement.style.overflowY='auto';
        document.body.style.overflowY='auto';
      },
      toGuess(){
        this.$store.dispatch("setNewGuidanceStepDispatch",{guidanceNum:6});
        this.$store.commit("mutationTipPropsCanGuessShow",false);
        this.$store.commit("mutationUserFirstGetProps",false);
        document.documentElement.style.overflowY='auto';
        document.body.style.overflowY='auto';
        setTimeout(() => {
          router.push({ path: '/compete/Quizzeszone?ID=all' });
        }, 500);
      }
    },
    mounted() {
      //  document.documentElement.style.overflowY='hidden';
      //   document.body.style.overflowY='hidden';
      // document.documentElement.scrollTop =314;
      // document.body.scrollTop = 314;
    },
    updated() {
    // setTimeout(() => {
      let mygrandGuessData=this.$store.state.match.mygrandGuessData
      let isShowTask=this.$store.state.isDialogShow.isTipPropsCanGuessShow
      if(isShowTask&&mygrandGuessData&&mygrandGuessData.length>0){
        document.documentElement.scrollTop =314;
        document.body.scrollTop = 314;

      }
    // }, 100);
    },
    destroyed() {
        document.documentElement.style.overflowY='auto';
        document.body.style.overflowY='auto';
    },
  }
</script>

<style scoped lang="scss">
#dialong{
  z-index:8309 !important;
}
.dialog_bg{
    position: fixed;width:100%;height:100%;
    top: 0;
    left: 0;
    outline: 0;
    background: rgba(5, 6, 6, .8);
    z-index:8210 !important;
}
.dialog_mask{
  z-index:8211 !important;position:absolute;background:none;
}
  .main{
    width: 800px;
    position: absolute;
    top:528px;
    left: 50%;
    margin-left: -161px;

    .theme{
      width: 290px;
      height: 296px;
      display: block;
      position: absolute;
      left: 190px;
      top:0px;
      // background: url("../../assets/img/guide/eleven_bg.png") no-repeat;
      background-size: cover;
      .close{
        width: 16px;
        height: 16px;
        display: block;
        position: absolute;
        top: 14px;
        right: 14px;
      }
      .txt{
        font-size: 20px;
        color: #fff;
        text-align: center;
        // padding:100px 0 80px 36px;
        margin-top:20px;
        width:362px; height:89px; background: url("../../assets/img/guide/eleven_text.png") no-repeat;position:relative;top:0;left:0;
        span{width:20px; height:20px;position:absolute;top:5px; right:5px;display:block;cursor: pointer;}
      }
      .operation_btn{
        width: 132px;
        height: 36px;
        // border-radius: 22px;
        text-align: center;
        // line-height: 46px;
        // background: #feed50;
        // color: #a18a25;
        margin-left: 127px;
        margin-top:20px;
        background: url("../../assets/img/guide/eleven_goguess.png") no-repeat;
      }
    }
    .left{
      width: 189px;
      height: 212px;
      &::before{
        content: '';display:block;width:208px;; height:229px;position:absolute;top:-11px;left:-14px;
        background:url('../../assets/img/guide/eleven_bk.png') no-repeat center;
      }

      .img_wrap{
        position: relative;
        background: #000;
        height: 130px;
        width: 130px;
        margin: 10px auto;
        padding: 12px;
      }
      .img{
        width: 106px;
        height: 106px;
        display: block;
      }
      .nums{
        text-align: center;
        font-size: 14px;
        color: #bbb;
      }
      .pretend_btns{
        width: 180px;
        margin-top: 13px;
        padding: 0 15px;
        display: flex;
        justify-content: space-around;
      }
      .btn{
        width: 72px;
        height: 24px;
        line-height: 24px;
        margin-left: 4px;
        font-size: 12px;
        color: #fff;
        background-size: cover;
        text-align: center;
      }
      .btn_give{
        background: url('../../assets/img/mall/give_n.png')  no-repeat;
        background-size: cover;
      }
      .btn_use{
        background: url('../../assets/img/mall/buy.png')  no-repeat;
        background-size: cover;
      }
    }
  }
  .onemain{
    margin-left: -368px;
  }
</style>
