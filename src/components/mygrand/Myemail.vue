<template>
  <div id="myemail">
    <div class="top_title">
     <ul class="navaltop">
        <li class="fleft h3 theme_color"  @click="isWhich('Myinfovue')" :class="{myactive:isActive==0}">我的信息</li>
        <li class="fleft h3 theme_color"  @click="isWhich('Logontolog')" :class="{myactive:isActive==1}">登录日志</li>
     </ul>
    </div>
    <div class="main">
      <component :is="currentvue" keep-alive></component>
    </div>
    <div class="dialog" v-show='this.$store.state.home.backendstatus'>
        <Backend></Backend>
      </div>
  </div>
</template>
<script>
export default {
  data () {
      return {
          currentvue:'Myinfovue',
          num:0,
          isActive:0
      }
  },
  methods: {
    isWhich(which){
      this.currentvue=which
      if(which=='Myinfovue'){
          this.isActive=0
      }else if(which=='Logontolog'){
          this.isActive=1
      }
    },
  },
  computed: {
    level:function(){
      return this.$store.state.user.userInfo? this.$store.state.user.userInfo : null
    }
  }
}
</script>
<style lang="scss" scoped>
    #myemail{
      .top_title{
          height:61px;
          .navaltop{
            width:1008px;
            height:45px;
            background:rgba(60,60,65,1);
            border-radius:2px 2px 0px 0px;
            display: flex;
            padding:7px 0 0 26px;
          }
          li{
            width:82px;
            height:39px;
            line-height: 39px;
            text-align: center;
            color:rgba(133,133,135,1);
            border-radius:1px 1px 0px 0px;
            font-size: 14px;
          }
          .myactive{
            color:rgba(255,255,255,1);
            background:rgba(36,36,38,1);
          }
        }
    }
</style>


