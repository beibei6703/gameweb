<template>
  <div id="signin" v-show="isshows">
      <div class="wrap_signin wrap_signin_checkin">
          <div class="signin_top signin_top_checkin">
              <h3 class="theme_color">签到成功</h3>
              <i  class="x x_258" @click="handleclose"></i>
          </div>
          <div class="signincontent">
              <div class="signinreward">
                    <div class="reward ">
                        <div class="caibi fleft rewardinfo">
                            <p class="rewardname">C币</p>
                            <p class="rewardnum theme_color" v-if="checkininfo">+{{checkininfo.reward.cai}}</p>
                        </div>
                        <div class="experience fleft rewardinfo">
                            <p class="rewardname">经验值</p>
                            <p class="rewardnum theme_color" v-if="checkininfo">+{{checkininfo.reward.exp}}</p>
                        </div>
                    </div>
                    <p class="signinfo" v-if="checkininfo && checkininfo.goalReward" >继续签到{{checkininfo.goal}}天可获得<span class="what theme_color" >{{checkininfo.goalReward.cai}}C+{{checkininfo.goalReward.debris}}碎片</span></p>
              </div>
              <i class="enter" @click="handleclose"></i>
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
  props:['isshows'],
  methods: {
      handleclose(){
        //   this.$store.commit('isSigninDiaShowDis',false)
        this.$emit('closesigndia',false)
        this.$store.dispatch('userinfoshowdispatch');
        this.$store.dispatch("checkinprogessdispatch");
      }
  },
  computed: {
      checkininfo:function(){
          return this.$store.state.home.checkininfo?this.$store.state.home.checkininfo:null
      }
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
        }
        .reward{
                height:90px;
                width:354px;
                margin:0 auto;
                text-align: center;
                padding: 0 100px;
        }
        .rewardinfo{
            height: 50px;
            width:74px;
            p{
                width:74px;
            }
        }
        .rewardname{
            font-size: 16px;
            line-height: 26px;
            margin-bottom: 5px;
        }
        .caibi{
            border-right:1px solid #535353;
             margin-right:5px;
        }
        .experience{
            padding-left:20px;
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

