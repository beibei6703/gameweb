<template>
 <!-- <div id="signin" v-show="isshow"> -->
 <div id="signin" v-if="this.$store.state.rebate.showDrawView">
      <div class="fail wrap_signin_h258 wrap_signin" >
        <i  class="x fright pointer x_258" @click="handleclose"></i>
        <h2 class="congratulation">恭喜您</h2>
        <p class="bonus">获得 <span>{{this.$store.state.rebate.rechargedata.rebate_count}}</span>
          元红利，您可继续前往预测获得更多收益，是否继续</p>
        <!-- <h3 >领取成功</h3> -->
        <button class="pointer  closebtn" @click="goForword" >前往预测</button>
   </div>
 </div>
</template>
<script>
export default {
  name:"Draw",
  data () {
      return {
      }
  },
  props:['isshow'],
   methods: {
     handleclose(){
       this.$store.commit ("closeDrawDialog",false)
       this.$store.dispatch('getStatus')
     },
    goForword(){
      this.$router.push("compete/Quizzeszone?ID=all")
    }

  },
  watch: {



  },

}
</script>
<style lang="scss" scoped>
  .fail{
      position: relative;
      top: 300px;
      left: 400px;
     .congratulation{
        margin-top:10px;
        margin-left:150px;
        width: 108px;
        height: 54px;
         line-height:54px;
        font-size: 36px;
        text-align: left;
        font-family: SourceHanSansSC-regular;

      }
     .bonus{
        line-height: 20px;
        margin-top:50px;
        font-size: 14px;
        text-align: center;
        font-family: Roboto;

     }
      .closebtn{
        border: none;
        background: url("../../assets/images/competeImg/guess_b2.png") repeat;
        width: 94px;
        height: 32px;
        line-height: 32px;
        color: #794e0d;
        border-radius: 3px;
        position: absolute;
        top:200px;
        left: 40%;
        &:hover{
            background: url("../../assets/images/mygrand/c_h_1_32.png") repeat;
            color: #794e0d;
        }
    }
  }
</style>


