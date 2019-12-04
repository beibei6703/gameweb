<template>
 <!-- <div id="signin" v-show="isshow"> -->
 <div id="signin" v-show="this.$store.state.home.whats">
      <div class="fail wrap_signin_h258 wrap_signin" >
        <i  class="x fright pointer x_258" @click="handleclose"></i>
        <h3 >领取成功</h3>
        <button class="pointer  closebtn" @click="handleclose">关闭</button>
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
          // this.$emit('closesuccess',false)
         this.$store.commit('successstatus',false)
      }
  },
  watch: {
 
  }
}
</script>
<style lang="scss" scoped>
  .fail{
    //   width: 438px;
    //   height: 256px;
      position: relative;
      top: 300px;
      left: 400px;
    //   background: red;
      h3{
          color: #dcdcdc;
          font-size: 20px;
          position: absolute;
          left: 40%;
          top:105px;
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


