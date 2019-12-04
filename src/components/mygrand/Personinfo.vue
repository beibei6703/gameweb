<template>
  <div id="userinfo" >
    <BasicInfo/>
  </div>
</template>
<script>
export default {
  data () {
      return {

      }
  },
  watch:{
    $route(){
      if(this.$route.path.indexOf('/mygrand/personinfo')!=-1){
        // this.$store.dispatch('checkinprogessdispatch')
        // this.$store.dispatch('userinfoshowdispatch')
        this.$store.dispatch('getguessdatadis');
      }
    },
  },
  mounted () {
    // this.$store.dispatch('checkinprogessdispatch')
    // this.$store.dispatch('userinfoshowdispatch')
    this.$store.dispatch('getguessdatadis');
    if(this.$store.state.user.login==false){
        this.$router.push({path: "/home"});
    }else{
      // console.log('jjjiiiaaalllooonnnggg')
    }
  },
}
</script>
<style lang="scss" scoped>
  #userinfo{
    min-height:1260px;
    box-sizing: border-box;
    .top_title{
      height:61px;
      border-bottom: 1px solid #535353;
      margin-bottom: 25px;
      background: url("../../assets/images/mygrand/light.png") no-repeat;
      background-position: 14px 1px;
      h3{
        // width:240px;
        font-size: 20px;
        font-weight: 900;
        line-height: 56px;
        text-align: left;
        padding-left: 48px;
        // color: #cdbe91;
        color: #e3dbc8;
        &:hover{
          color: #e3dbc8;
          transition:all 1.2s;
        }
      }
    }
    .userinfo_main{
      min-height: 1170px;
      width: 892px;
      background-color: #15161a;
      margin:0 auto;
      padding: 26px 21px 0 22px;
      .userdetail{
        height: 168px;
      }
      .checkinharvest{
        margin:25px 0;
        height: 200px;
      }
    }
    .myprediction{
      margin-top:30px;
    }
  }
</style>


