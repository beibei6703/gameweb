<template>
  <div id="signin" v-show="this.$store.state.home.isSigninDiaShow">
      <div class="wrap_signin wrap_signin_h258">
          <div class="signin_top signin_top_258">
              <h3 class="theme_color fleft">提示</h3>
              <i  class="x fright pointer x_258" @click="handleclose"></i>
          </div>
          <div class="signincontent">
              <div class="signinreward">
                    <p class="successinfo">预测失败，预测总值已达上限，最高可预测价值为<span class="theme_color">2.000.000</span>&nbsp;C</p>
              </div>
              <i class="enter pointer" @click="handleclose"></i>
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
  methods: {
      handleclose(){
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
               line-height: 30px;
            }
        }
        .enter{
            display: block;
            width:96px;
            height:36px;
            margin:0 auto;
            margin-top:15px;
            background-image: url('../../assets/images/mygrand/enter.png');
            &:hover{
                background-image: url('../../assets/images/mygrand/hoverenter.png');
            }
        }
    }
}
</style>

