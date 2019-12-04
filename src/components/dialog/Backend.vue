<template>
 <div id="signin" v-show="this.$store.state.home.backendstatus">
         <div class="fail wrap_signin_h258 wrap_signin " >
            <i  class="x fright pointer x_258" @click="handleclose"></i>
            <h3 >{{this.$store.state.home.worldtalkinfo}}</h3>
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
          this.$store.commit('backendclose',false)
      }
  },
  computed: {
      showis(){
          return this.$store.state.home.backendstatus?this.$store.state.home.backendstatus:null
      }
  }
}
</script>
<style lang="scss" scoped>
  .fail{
      h3{
        color: #dcdcdc;
        font-size: 20px;
        width:360px;
        position: absolute;
        left: 0;
        right:0;
        margin:0 auto;
        top:105px;
        color:#ffd35e;
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


