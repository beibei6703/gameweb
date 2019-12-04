<template>
  <div id="dialog" v-if="!getuserInfo&&!getIsHaveTid&&getIsShowPropaganda">
    <div class="dialog_mask"></div>
    <div class="dialog_main dialog_propaganda">
      <div class="dialog_close" @click="closeDialog"></div>
      <div class="dialog_enroll" @click="showLoginDialog('register')"></div>

    </div>
  </div>
</template>
<script>
export default {
  data(){
    return{}
  },
  methods:{
    closeDialog(){
      this.$store.commit('mutationIsShowPropaganda',false);
      this.$store.dispatch('setNewGuidanceStepDispatch',{guidanceNum:1})
    },
    showLoginDialog: function(tab) {
      this.$store.commit('mutationIsShowPropaganda',false);
      this.$store.dispatch('userInfo');
      setTimeout(() => {
        if (!this.$store.state.user.userInfo) {
          this.$store.dispatch('showLoginDialog');
        }
      }, 100);
    },
  },
  computed:{
    getuserInfo(){
      return this.$store.state.user.userInfo;
    },
    getIsHaveTid(){
      return this.$store.state.user.isHavetid;
    },
    getIsShowPropaganda(){
      console.log('我出来的是什么呢',this.$store.state.isDialogShow.isShowPropaganda)
      return this.$store.state.isDialogShow.isShowPropaganda;
    },
  }
}
</script>
<style lang="scss" scoped>
#dialog{z-index:10000;}
.dialog_propaganda{
  width:588px; height:600px; background:url('../../assets/img/guide/dialog_propaganda.png') no-repeat center;background-size:cover;
  .dialog_close{width:48px; height:48px; position: absolute;top:0;right:0; background:url('../../assets/img/guide/dialog_close.png') no-repeat center;cursor: pointer;}
  .dialog_enroll{width:380px; height:88px; position:absolute;bottom:18px; left:50%;margin-left:-190px; display:block; cursor: pointer;}

  }
</style>


