<template>
  <div id="signin" v-show="isshow">
      <div class="wrap_signin_h258 wrap_signin">
          <div class="signin_top signin_top_258">
              <h3 class="theme_color fleft">提示</h3>
              <i  class="x fright pointer x_258" @click="handleclose"></i>
          </div>
          <div class="signincontent">
              <div class="signinreward ">
                    <p class="successinfo">账户余额不足，是否需要充值？</p>
              </div>
              <router-link  class="enter fleft nfl" tag="i" to="/paymoney"></router-link>
               <i class="cancel fright pointer nfr" @click="handleclose">取消</i>
          </div>
      </div>
  </div>
</template>
<script>
export default {
  data () {
      return {
         
      }
  },
  props:['isshow'],
  methods: {
      handleclose(){
          this.$emit('closeme',false)
          this.$store.commit('isSigninDiaShowDis',false)
      }
  },
  mounted () {
     
  },
  computed: {
      
  }
}
</script>
<style lang="scss" scoped>
#signin{
    .wrap_signin{
        .signinreward{
            width:354px;
            height: 126px;
            margin:0 auto;
            margin-top:30px;
            border-bottom:1px solid #535353;
            .successinfo{
               line-height: 106px;
            }
        }
        .enter{
            display: block;
            width:96px;
            height:36px;
            margin:0 auto;
            margin-top:15px;
            margin-left:72px;
            background-image: url('../../assets/images/mygrand/gomoney.png');
            &:hover{
                background-image: url('../../assets/images/mygrand/hovergomoney.png');
            }
        }
        .cancel{
            display: block;
            width:96px;
            height:34px;
            margin:0 auto;
            margin-top:15px;
            margin-right:72px;
            border-radius: 3px;
            border: 1px solid #e1c076;
            line-height: 33px;
            font-size: 16px;
            &:hover{
                background-color: #706857;
            }
        }
    }
}
</style>

