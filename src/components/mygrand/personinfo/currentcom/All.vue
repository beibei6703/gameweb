<template>
  <div id="signin" v-show="isshow" >
      <div class="wrap_signin wrap_signin_checkin">
          <div class="signin_top signin_top_checkin">
              <h3 class="theme_color">领取成功</h3>
              <i  class="x x_258" @click="handleclick"></i>
          </div>
          <div class="signincontent">
              <div class="signinreward">
                    <div class="reward ">
                        <div class="caibi fleft rewardinfo">
                            <p class="rewardname">C币</p>
                            <p class="rewardnum theme_color" v-if="getcheckindatalist">+{{thousandBitSeparator(getcheckindatalist.config[number].reward.cai)}}</p>
                        </div>
                        <div class="experience fleft rewardinfo">
                            <p class="rewardname">碎片</p>
                            <p class="rewardnum theme_color" v-if="getcheckindatalist">+{{getcheckindatalist.config[number].reward.debris}}</p>
                        </div>
                    </div>
                    <!-- <p class="signinfo" v-if="checkininfo" >继续签到{{checkininfo.goal}}天可获得<span class="what theme_color" >{{checkininfo.goalReward.cai}}C+{{checkininfo.goalReward.debris}}经验值</span></p> -->
              </div>
              <!-- <i class="enter" @click="handleclose"></i> -->
              <button @click="handleclick" class="btn">确认</button>
          </div>
      </div>
      <!-- <img src= alt=""> -->
  </div>
</template>
<script>
export default {
  data () {
      return {

      }
  },
  props:['isshow','number'],
  methods: {
      handleclose(){
          this.$store.commit('isSigninDiaShowDis',false)
      },
      handleclick(){
          this.$emit('closeme',false);
          this.$store.dispatch('userinfoshowdispatch');
          this.$store.dispatch("checkinprogessdispatch");
          this.$store.dispatch('actionMybagValue');
          this.$store.commit('checkinRewardShow',false);
      },

  },
  computed: {
      checkininfo:function(){
          return this.$store.state.home.checkininfo?this.$store.state.home.checkininfo:null
      },
      getcheckindatalist:function(){
          return this.$store.state.home.getcheckindatalist? this.$store.state.home.getcheckindatalist:null
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
            // background-image: url('../../assets/images/mygrand/enter.png');
            &:hover{
                // background-image: url('../../assets/images/mygrand/hoverenter.png');
            }
        }
        .btn{
            background: url("../../../../assets/images/competeImg/guess_b2.png") repeat;
            width: 76px;
            height: 32px;
            border-radius: 3px;
            margin:20px auto;
            line-height: 32px;
            border: none;

        }
    }
}
</style>

