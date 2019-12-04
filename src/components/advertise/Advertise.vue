<template>
  <div class="adwraper" v-if="getisshow && userInfo && imgurl==null">
    <div class="advertise">
      <a :href="geturl" target="_blank" class="linksimg">
        <img :src="getImgurl" alt class="imgclass">
      </a>
      <div class="closead" @click="getclose">×</div>
    </div>
  </div>
</template>
<script>
import Http from "@/common/http";
import { setTimeout } from 'timers';
import {
    getCookie,
    setCookie,
    removeCookie
} from "../../utils/storage.js";
export default {
  name: "Advertise",
  data() {
    return {
      imgurl:getCookie("imgUrl")
    };
  },
  watch:{
    imgurl(newvalue,oldvalue){
      // console.log(newvalue,oldvalue,"我正在金婷img")
      if(newvalue==null){
         clearTimeout(this.timer);
      }
    }

  },
  computed:{
      userInfo(){
          return this.$store.state.user.userInfo
      },
      getImgurl(){
          return this.$store.state.advertise.imgurl
      },
      getisshow(){
          return this.$store.state.advertise.isShow
      },
      geturl(){
           return this.$store.state.advertise.link_url
           
      },
  
  },
  methods: {
    setCookie1(name, value, expire) {   
      window.document.cookie = name + "=" + escape(value) + ((expire == null) ? "" : ("; expires=" + expire.toGMTString()));
    },

    getclose() {
        // removeCookie("imgUrl")
        this.$store.commit('mutationsisShow',false)
        this.$store.dispatch("getNewGuidanceDispatch", { guidanceNum: 2 });
        var today = new Date()
        var expires = new Date();
        expires.setTime(today.getTime() + 1000*24*60*60);
          // setCookie("cookievalue", name, expires);
        this.setCookie1('imgUrl',this.$store.state.advertise.imgurl, expires)
          // this.imgurl = getCookie("imgUrl")
        　this.timer = setInterval(()=>{
            this.imgurl = getCookie("imgUrl")
            this.$store.commit('mutationsisShow',true)
          // console.log( this.imgurl,"ytrututr")
        },1000)
    },
  }
};
</script>
<style scoped lang="scss">
.adwraper {
 
  width:100%;
    height:100%;
  position: fixed;
  top:0;
  left:0;
  z-index: 8211;
  background: rgba(5, 6, 6, .8);
}
.linksimg {
  display: block;
}
.advertise {
  position: fixed;
  left: 50%;
  top: 50%;
  z-index: 8211;
  padding: 50px 90px 0px 50px;
  transform: translate(-50%, -50%);
  img {
    max-width: 1100px;
    max-height: 700px;
    text-align: center;
    vertical-align: middle;
  }
  .closead {
    cursor: pointer;
    width: 24px;
    height: 24px;
    font-size: 24px;
    position: fixed;
    color: #eee;
    top: 0;
    right: 0;
    z-index: 8211;
  }
}
</style>


