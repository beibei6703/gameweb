<template>
    <div id="mygrand">
        <Myguesslist />
        <div class="margin wrap">
            <div class="sidebar fleft">
                <ul>
                    <router-link  tag="li" :to="`/mygrand/${val.path}`" :class="{active: homelight[key]==true}"  v-for="(val,key) in navList" :key="key">{{val.name}}</router-link>
                </ul>
            </div>
            <div class="main fright">
                <router-view></router-view>
            </div>
        </div>
        <ModifyEmailPopup/>
        <ModifyPasswordPopup/>
        <ModifyPhonePopup/>
        <UnbindEmailPopup/>
        <UnbindPhonePopup v-if="this.$store.state.modifymessage.isShowUnbindPhone"/>
        <VerityEmailPopup/>
        <VerityPhonePopup v-if="this.$store.state.modifymessage.isShowVerityPhone"/>
    </div>

</template>
<script>
import Mygrandtop from "./mygrand/Mygrandtop"
export default {
    data () {
        return {
            isShow:false,
            navList:[{path:'personinfo',name:'账户信息'},{path:'forecastingRc',name:'预测记录'},{path:'Warehouse/current=1',name:'我的背包'},{path:'taskachievment',name:'任务成就'},{path:'myemail',name:'我的邮箱'},{path:'accountrecords',name:'账户记录'},{path:'accountSetting',name:'账户设置'},{path:'generalize',name:'推广员'}]
        }
    },
    mounted(){
      if(window.location.href.indexOf('personinfo') != -1) {
        this.homelight[0] = true;
      }
    },
    components: {
        Mygrandtop,
    },
    methods: {
        // getpromoter(){
        //     if(this.$route.path.indexOf('forecastingRc') != -1)
        // }

    },

  computed:{
    homelight() {
      var menuClist = new Array(false, false, false, false, false, false, false,false);

      if(this.$route.path.indexOf('personinfo') != -1||this.$route.path.indexOf('modifypassword') != -1||this.$route.path.indexOf('setinfor') != -1||this.$route.path.indexOf('modifyphone') != -1||this.$route.path.indexOf('modifyemail') != -1||this.$route.path.indexOf('modifyphone') != -1||this.$route.path.indexOf('modifyemail') != -1||this.$route.path.indexOf('verityemail') != -1||this.$route.path.indexOf('verityphone') != -1||this.$route.path.indexOf('unbindemail') != -1||this.$route.path.indexOf('unbindphone') != -1) {
        menuClist[0] = true;
      }
      if(this.$route.path.indexOf('forecastingRc') != -1) {
        menuClist[1] = true;
      }
      if(this.$route.path.indexOf('Warehouse') != -1) {
        menuClist[2] = true;
        this.$store.dispatch("mybag");
        this.$store.dispatch("bag_treasure_dis");
      }
      if(this.$route.path.indexOf('taskachievment') != -1||this.$route.path.indexOf('achievment') != -1) {
        menuClist[3] = true;
      }
      if(this.$route.path.indexOf('myemail') != -1) {
        menuClist[4] = true;
      }
      if(this.$route.path.indexOf('letterinstation') != -1) {
        menuClist[4] = true;
      }
      if(this.$route.path.indexOf('accountrecords') != -1) {
        menuClist[5] = true;
      }
      if(this.$route.path.indexOf('accountSetting') != -1) {
        menuClist[6] = true;
      }
        if(this.$route.path.indexOf('generalize') != -1 ||this.$route.path.indexOf('applyagain') != -1 || this.$route.path.indexOf('check') != -1 ){
        menuClist[7] = true;
      }
      return menuClist;
    }
  }
}
</script>
<style scoped lang="scss">
    #mygrand{
        height:1260px;
        margin-bottom:30px;
        .wrap{

            width:1200px;
            height:1260px;
            margin:0 auto;
        }
        .active{
            color: #fff;
            background: url("../assets/img/mybag/nav.png") no-repeat;
            background-size: cover;
        }
        .sidebar{
            width: 180px;
            height: 1260px;
            background-color: #242425;
            ul{
                height: 310px;
                text-align: center;
                li{
                    height: 60px;
                    line-height: 60px;
                    font-size: 14px;
                    position: relative;
                    left: 0px;
                    top:0px;
                    color: #b8b8b8;
                }
            }
        }
        .main{
            width: 1010px;//待确定
            min-height: 1260px;
            margin-left: 10px;
            background-color: #242425;
        }

    }
</style>



