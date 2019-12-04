<template>
  <div id="pay">
    <div class="left fleft">
      <p class="theme">账户充值 <span class="arrow">></span></p>
    </div>
    <div class="right fleft">
      <Topup/>
    </div>
  </div>
</template>
<script>
  import Topup from "./mygrand/Topup"
  import Paysuccess from './mygrand/Paysuccess'
  import { getCookie } from '@/utils/storage'
  export default {
    data() {
      return {

      }
    },
    mounted: function() {
      this.checkLogin();
    },
    beforeCreate() {
      this.$store.commit('changetitlemutation', '充值-丰收网')
      document.title = this.$store.state.home.title
    },
    created: function() {
      this.checkLogin();
      this.$nextTick(function() {
        this.checkLogin();
        this.$store.dispatch('userinfoshowdispatch');
      })
    },
    methods: {
      checkLogin: function() {
        if(getCookie('cid') == null && this.$route.path=='/paymoney') {
          // this.$store.commit('showLoginDialog', true);
          // this.$router.replace('home');
        }
      }
    },
    components: {
      Topup,
      Paysuccess
    },
    watch: {
      '$route': 'checkLogin'
    }
  }
</script>
<style lang='scss' scoped>
  #pay {
    height: 938px;
    width: 1200px;
    margin: 50px auto;
    .left {
      width: 270px;
      height: 938px;
      background-color: #15161a;
      .theme {
        color: #e1c076;
        height: 66px;
        line-height: 66px;
        font-size: 18px;
        text-align: center;
        position: relative;
        left: 0;
        top: 0;
      }
      .arrow {
        position: absolute;
        right: 14px;
        top: -2px;
      }
    }
    .right {
      width: 930px;
      height: 938px;
      background-color: #242628;
    }
  }
</style>