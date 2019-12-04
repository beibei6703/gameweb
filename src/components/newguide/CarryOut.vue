<template>
  <div id="dialog" v-if="getIsSHowCarryEnroll">
    <div class="dialog_mask"></div>
    <div class="dialog_main_carryenroll">
      <span @click="gotoMygrand">我的菜园</span>
      <div class="dialog_main_carryenroll_hover"></div>
    </div>
    <div class="dialog_main dialog_propaganda" @click="closeDialog">
      <!-- <div class="dialog_main dialog_propaganda_current" ></div> -->
      <!-- <div class="dialog_close" @click="closeDialogCurrent"></div> -->
    </div>
  </div>
</template>
<script>
 import router from "@/router";
  import Http from '@/common/http';
export default {
  data(){
    return{}
  },
  methods:{
    closeDialog(){

      this.$store.dispatch('actionsICompeteAll');
      this.$store.commit('mutationIsSHowCarryEnroll',false);

    },
    closeDialogCurrent(){

      this.$store.commit('mutationIsSHowCarryEnroll',false);

    },
    gotoMygrand(){
      this.$store.commit('mutationIsSHowCarryEnroll',false);
      setTimeout(() => {
        this.$store.commit('mutationIsShowTask',true);
      }, 100);

      router.push('/mygrand');

    },
  },

  computed:{
    getIsSHowCarryEnroll(){
      return this.$store.state.isDialogShow.isSHowCarryEnroll;
    },
  }
}
</script>
<style lang="scss" scoped>
#dialog{
  z-index:10000;
  .dialog_main_carryenroll{
    width:1200px;position:fixed;top:58px;left:50%;margin-left:-600px;
    span{
      padding:0 10px; height:42px; line-height:42px; color:#fff; text-align: center;z-index:10;position:absolute;right:0; top:0;cursor: pointer;
       background:url('../../assets/img/home/nav_top_bg.png') no-repeat center;
      font-size: 16px;
      &::before{
        width:120px; height:79px;content: '';display:block; position:absolute;top:-18px;left:-18px;
        background:url('../../assets/img/guide/dialog_carry_bk.png') no-repeat center;
      }
    }
    .dialog_main_carryenroll_hover{
      width:240px; height:134px;position:absolute;top:69px; right:-53px;
       background:url('../../assets/img/guide/dialog_carry_unget.png') no-repeat center;
       &::before{
         content:'';display:block;position:absolute;top:-51px;right:-41px;width:89px; height:131px;
         background:url('../../assets/img/guide/dialog_carry_qx.png') no-repeat center;
       }
    }
  }
  .dialog_propaganda{

  width:385px; height:89px; background:url('../../assets/img/guide/dialog_carry_old.png') no-repeat center;cursor: pointer;
  // .dialog_propaganda_current{cursor:pointer;position:absolute; top: 50%;
  //   left: 50%;width:100%;height:100%;}
  .dialog_close{
    width:43px; height:77px; position: absolute;top:-70px;right:-2px; background:url('../../assets/img/guide/dialog_carry_close.png') no-repeat center;cursor: pointer;
  }

}
}

</style>


