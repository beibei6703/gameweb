<template>
  <div id="dialong" v-if="isCanSystheticShow&&!isFirstGetPropsShow &&!isTipPropsCanGuessShow&& this.$route.path.indexOf('/Warehouse/')!=-1">
    <div class="dialog_bg"></div>
    <div class="dialog_mask">
      <div class="main"  :style="'top:'+(getmygrandGuessData&&getmygrandGuessData.length>0?'464':'185')+'px'">
        <div class="left" @click="closeCurrentPages">
          <div class="img_wrap" :class="`V-${mybag[0].quality}`">
            <img :src="mybag[0].product_pic" alt="" class="img" v-if="mybag[0].product_id==0"/>
          </div>
          <p class="nums" v-if="mybag[0].product_id==0">{{mybag[0].product_name}} x {{mybag[0].product_count}}</p>
          <p class="nums" v-else>{{mybag[0].product_name}} x {{mybag[0].product_count}}</p>
          <div class="pretend_btns">
            <!-- <p class="btn_give btn">赠送</p> -->
            <p class="btn_use btn" @click="closeCurrentPages">合成</p>
          </div>
        </div>
          <p class="pretend_btn" @click="closeCurrentPages">合成</p>
          <img src="../../assets/img/guide/systhetic.png" alt="" class="theme">
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    methods: {
      closeCurrentPages() {
        this.$store.dispatch("setNewGuidanceStepDispatch",{guidanceNum:7});
        this.$store.commit("mutationCanSystheticShow",false);
        this.$store.commit("mutationUserFirstGetDebris",false);
        document.documentElement.style.overflowY='auto';
        document.body.style.overflowY='auto';
      }
    },
    computed: {
      isCanSystheticShow() {
        return this.$store.state.isDialogShow.isCanSystheticShow || false;
      },
      mybag(){
        return this.$store.state.shop.mybag||null;
      },
      getmygrandGuessData(){
        return this.$store.state.match.mygrandGuessData || [];
      },
      isFirstGetPropsShow() {
        return this.$store.state.isDialogShow.isFirstGetPropsShow || false;
      },
      isTipPropsCanGuessShow(){
        return this.$store.state.isDialogShow.isTipPropsCanGuessShow || false;
      },
    },
    mounted() {
      if(this.$store.state.isDialogShow.isCanSystheticShow){
        document.documentElement.scrollTop =314;
        document.body.scrollTop = 314;
      }


    },
    updated() {
    // setTimeout(() => {
      let mygrandGuessData=this.$store.state.match.mygrandGuessData
      let isShowTask=this.$store.state.isDialogShow.isCanSystheticShow
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
    width: 600px;
    position: absolute;
    top:464px;
    left: 50%;
    margin-left: -223px;
    .pretend_btn{
      width: 80px;
      height: 40px;
      text-align: center;
      line-height: 40px;
      font-size: 14px;
      color: #fff;
      // border: 1px solid #fff;
      border-bottom: none;cursor: pointer;position: relative;z-index:10;
      &::before{
          width:90px; height:46px;content: '';display:block; position:absolute;top:-3px;left:-5px;
          background:url('../../assets/img/guide/systhetic_title_bk.png');
          background-size:cover;
        }
    }
    .theme{
      width: 201px;
      height: 109px;
      display: block;
      position: absolute;
      top:15px;
      left: 95px;
    }
    .left{
      width: 189px;
      height: 212px;
      position:absolute;top:63px;left:-144px;
      &::before{
        content: '';display:block;width:208px;; height:229px;position:absolute;top:-11px;left:-12px;
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
        justify-content: space-around;cursor: pointer;
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
        background-size: cover;cursor: pointer;
      }
    }
  }
</style>
