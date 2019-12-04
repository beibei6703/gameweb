<template>
  <div id="signin" v-show="this.$store.state.home.isSigninDiaShow">
      <div class="wrap_signin">
          <div class="signin_top">
              <h3 class="theme_color">虚拟卡兑换</h3>
              <i  class="x" @click="handleclose"></i>
          </div>
          <div class="signincontent">
              <div class="signinreward">
                    <div class="reward ">
                        <div class="picinfo fleft rewardinfo">
                            <img src="" alt="" class="themepic">
                        </div>
                        <div class="wordinfo fleft rewardinfo">
                            <h3 class="title theme_color">京东购物卡100元</h3>
                            <div class="buydetail">
                                
                            </div>
                        </div>
                    </div>
                    
              </div>
              <i class="enter fleft" @click="handleclose"></i>
              <i class="cancel  enter fright" @click="handleclose"></i>
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
      if(!this.$store.state.home.checkinlist){
          this.$store.dispatch('checkindispatch')
      }
  },
  computed: {
      checkinlist:function(){
          if(!this.$store.state.home.checkinlist){
              return [{
                "reward": {
                    "cai": 10,
                    "exp": 20
                },
                "is_show": true,
                "goal": 4,
                "goalReward": {
                    "cai": 20,
                    "debris": 10
                 }
               }]
          }
          return this.$store.state.home.checkinlist?this.$store.state.home.checkinlist:null
      }
  }
}
</script>
<style lang="scss" scoped>
#signin{
    width:100%;
    position: absolute;
    z-index: 999999999999999;
    background: rgba(5, 6, 6, 0.8);
    .wrap_signin{
        box-sizing: border-box;
        width:538px;
        height: 476px;
        margin:0 auto;
        border:1px solid #e1c076;
        background-image: url('../../assets/images/mygrand/signinbg.jpg');
        background-size:538px 476px;
        .signin_top{
            height: 70px;
            text-align: center;
            position: relative;
            left: 0px;
            top:0px;
            line-height: 78px;
            // .x{
            //     position: absolute;
            //     right: 20px;
            //     top:31px;
            //     display: block;
            //     width:16px;
            //     height: 15px;
            //     background-image: url('../../assets/images/mygrand/X.png');
            //     background-size:15px 15px;
            //     &:hover{
            //          background-image: url('../../assets/images/mygrand/hoverX.png');
            //          background-size:15px 15px;
            //     }
            // }
        }
        .signinreward{
            width:354px;
            height: 292px;
            margin:0 auto;
            margin-top:30px;
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
            
        }
        .picinfo{
            width:198px;
            height: 206px;
            border:1px solid #e1c076;
            padding:42px 7px;
            .themepic{
                width:194px;
                height: 120px;
                border-radius: 5px;
            }
        }
        .wordinfo{
           width:212px;
           height: 206px;
        }
        .enter{
            display: block;
            width:96px;
            height:36px;
            margin:0 auto;
            margin-top:15px;
            margin-left:74px;
            background-image: url('../../assets/images/mygrand/enter.png');
            &:hover{
                background-image: url('../../assets/images/mygrand/hoverenter.png');
            }
        }
         .cancel{
            display: block;
            width:96px;
            height:36px;
            margin:0 auto;
            margin-top:15px;
            margin-right:74px;
            background-image: url('../../assets/images/mygrand/enter.png');
            &:hover{
                background-image: url('../../assets/images/mygrand/hoverenter.png');
            }
        }
    }
}
</style>

