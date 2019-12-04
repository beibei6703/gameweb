<template>
  <div id="signin" v-show="this.$store.state.home.isSigninDiaShow">
      <div class="wrap_signin wrap_signin_h258">
          <div class="signin_top signin_top_258">
              <h3 class="theme_color fleft">提示</h3>
              <i  class="x fright pointer x_258" @click="handleclose"></i>
          </div>
          <div class="signincontent">
              <div class="signinreward">
                    <p class="successinfo">更换预测队伍<span>XXXXX</span>是否确定？<span class="theme_color">开赛前10分钟无法换队</span></p>
              </div>
              <i class="enter fleft pointer" @click="handleclose"></i>
              <i class="cancel  fright pointer" @click="handleclose">取消</i>
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
}
</script>
<style lang="scss" scoped>
#signin{
    .wrap_signin{
        .signinreward{
            width:230px;
            height: 116px;
            margin:0 auto;
            margin-top:30px;
            border-bottom:1px solid #535353;
            .successinfo{
                padding-top:10px;
               line-height: 30px;
            }
        }
        // 确认
        .enter{
            display: block;
            width:96px;
            height:36px;
            margin:0 auto;
            margin-top:15px;
            margin-left:74px;
            border-radius: 3px;
            background-image: url('../../assets/images/mygrand/enter.png');
        }
        // 取消
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

