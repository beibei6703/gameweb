<template>
  <div id="dialog" v-if="isFirstGetPropsShow && getUserInfo">
    <div class="dialog_mask">
      <div class="mian">
        <div class="top">
          <router-link tag="p" :to="{path:'/mygrand/Warehouse/current=1'}" class="pretend_btn" @click.native="showTipPropsCanGuess">我的菜园</router-link>
        </div>
        <img src="../../assets/img/guide/ten_get_props.png" alt="" class="theme">
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    showTipPropsCanGuess(){
      this.$store.commit("mutationUserFirstGetProps",false);
      this.$store.commit("mutationTipPropsCanGuessShow", true);
      // this.$store.dispatch("getNewGuidanceDispatch", { guidanceNum: 6 });
      document.documentElement.style.overflowY='hidden';
      document.body.style.overflowY='hidden';
    },
    // showCanSysthetic(){
    //   this.$store.commit("mutationUserFirstGetProps",false);
    //   document.documentElement.style.overflowY='hidden';
    //   document.body.style.overflowY='hidden';
    // },
  },
  computed: {
    isFirstGetPropsShow() {
      return this.$store.state.isDialogShow.isFirstGetPropsShow;
    },
    getUserInfo(){
      return this.$store.state.user.userInfo ||null;
    },
    isTipPropsCanGuessShow(){
      return this.$store.state.isDialogShow.isTipPropsCanGuessShow || false;
    },
    isCanSystheticShow() {
      return this.$store.state.isDialogShow.isCanSystheticShow || false;
    },
  },
};
</script>

<style scoped lang="scss">
#dialog {
  z-index: 8210;
  .mian {
    width: 1200px;
    height: 100px;
    position: absolute;
    top: 58px;
    left: 50%;
    margin-left: -431px;
    .top {
      width: 180px;
      display: flex;
      justify-content: space-between;
      position: absolute;
      right:80px;
      .pretend_btn {
        width: 82px;
        height: 41px;
        line-height: 41px;
        text-align: center;
        font-size: 14px;
        color: #fff;
        background: #232628;cursor: pointer;position:relative;top:0;left:0;z-index:10;
        &::before{
          width:120px; height:79px;content: '';display:block; position:absolute;top:-18px;left:-18px;
          background:url('../../assets/img/guide/dialog_carry_bk.png') no-repeat center;
        }
      }
      .close {
        font-size: 14px;
        color: #666;
      }
    }
    .theme {
      width: 446px;
      height: 242px;
      display: block;
      position: absolute;
      top: 15px;
      right: 85px;
      &.active{width:286px;height:230px;}
    }
  }
}
</style>
