<template>
  <div id='freeturn'>
    <div class="container">
      <div id="shopnav">

        <!--Free导航-->
        <div class="mall-nav clear">
          <ul class="mall-list">
            <li v-for="(item,index) in Menu" activeClass="active"  :class="{active:index==getgameIndex}" :data-name="item.game" :key="item.id" @click="toggleTabs(index)">
              <span style="display: none" ></span>
              <i >{{item.tab}}</i>

            </li>
          </ul>
        </div>
      </div>
        <!-- 左侧 -->
        <div class="left fleft" v-if="freeturndata">
          <Countlucky  :players='getFreeturnPlayers' :gametype="getFreeturntype" :pid='pid'/>
          <jackpot :pooldata='freeturndata.pool'/>
          <Takein :players='getFreeturnPlayers' :playernum='getFreeturnPlayers?getFreeturnPlayers.length:0'/>
        </div>
        <!-- 右侧 -->
        <div class="right fright">
          <loginin></loginin>
          <introduction :gametype="getFreeturntype"></introduction>
          <record :winrecord='freeturnWinner'></record>
        </div>
      </div>
  </div>
</template>
<script>
import Http from "../common/http";
import config from "../common/http-config";
import Countlucky from "./freeturn/Countlucky";
import Introduction from "./freeturn/Introduction";
import Jackpot from "./freeturn/Jackpot";
import Loginin from "./freeturn/Loginin";
import Record from "./freeturn/Record";
import Takein from "./freeturn/Takein";
import router from "@/router";
let menu=[
  {"tab":"英雄联盟",'game':'lol',href:'./FreeturnLol'},
  {"tab":"DOTA2",'game':'dota',href:'./FreeturnDota2'},
]
export default {
  data() {
    return {
      Menu:menu,
      num:0,
      data: {},
      winrecord: [],
      pid: true,
      nowIndex:0,
//      gameType:2,
      gameName:'lol',
      countDown:null,
    };
  },
  methods: {
    toggleTabs:function(index){
      this.$store.commit('getGameIndex',index)
      clearInterval(this.countDown);
      this.countDown=null;
      if(this.getgameIndex==0){
        this.$store.commit('getfreeturntype',2)
        this.gameName='lol';
      }else{
        this.$store.commit('getfreeturntype',1)
        this.gameName='dota2';
      }
      router.push(`/freeturn/${this.gameName}`);

      this.$store.dispatch('freeturndata',{type:this.getFreeturntype})
      this.$store.dispatch('freeturnself',{type:this.getFreeturntype})
      this.initWebSocket();
      if(!this.countDown){
        this.countDown=setInterval(() => {
          this.initWebSocket();
        }, 10 * 1000 * 60);
      }
    },
    initWebSocket() {
      let self = this;
      if (this.ws) {
        this.ws.close();
        this.ws = null;
      }
      this.ws = new WebSocket(`${config.websocket}?channel=free_wheel:${this.getFreeturntype}`);
      this.ws.onmessage = function(event) {
        self.wsdata = JSON.parse(event.data);
        console.log(self.wsdata, "wsdata");
        if (self.wsdata.pid == 1) {
          self.$store.commit('mutationsFreeturnplayer',{type:2,data:self.wsdata.data.player});
        } else if (self.wsdata.pid == 2) {
          self.pid = !self.pid;
          if(self.wsdata.data!=undefined||self.wsdata.data){
            console.log('wo shi duideme',self.wsdata.data)
            let params={
              date_time:self.wsdata.data.time,
              winners:self.wsdata.data.winners==undefined?[]:self.wsdata.data.winners
            }
            self.$store.commit('mutationsWinRecord',{type:2,data:params});
          }
        } else if (self.wsdata.pid == 3) {

          // self.$store.commit('mutationsFreeturnplayer',{type:3,data:[]});
          self.$store.commit('freeturnself',true)
          clearInterval(self.countDown);
          self.countDown=null;
          self.$store.commit('mutationsFreeturnTimes',self.wsdata.data.count_down);
          self.$store.commit('mutationsFreeturnplayer',{type:3,data:[]});
          // self.$store.dispatch('freeturndata',{type:self.getFreeturntype});
          if(!self.countDown){
            self.countDown=setInterval(() => {
              self.initWebSocket();
            }, 10 * 1000 * 60);
          }
        }
      };
    },
  },
  created() {
    router.push(`/freeturn/${this.gameName}`);
    this.initWebSocket();
    this.$store.dispatch('freeturndata',{type:this.getFreeturntype})
    this.$store.dispatch('freeturnself',{type:this.getFreeturntype})
  },
  mounted() {
    clearInterval(this.countDown);
    this.countDown=null;
    if(!this.countDown){
      this.countDown=setInterval(() => {
        this.initWebSocket();
      }, 10 * 1000 * 60);
    }
  },
  // destroyed() {
  //   this.ws.close();
  //   clearInterval(this.countDown);
  //   this.countDown=null;
  // },
  watch:{
    $route(){
      if(this.$route.path.indexOf('/freeturn/')==-1){
        this.ws.close();
        clearInterval(this.countDown);
        this.countDown=null;
      }
    },
  },
  computed: {
    freeturndata:function(){
      return this.$store.state.shop.freeturndata?this.$store.state.shop.freeturndata:null
    },
    getFreeturnPlayers(){
      return this.$store.state.shop.freeturnplayer?this.$store.state.shop.freeturnplayer:null
    },
    freeturnWinner:function(){
      return this.$store.state.shop.winRecord?this.$store.state.shop.winRecord:null
    },
    getFreeturntype:function(){
      return this.$store.state.shop.gametype
    },
    getgameIndex:function(){
      return this.$store.state.shop.gameIndex
    }
  },
  components: {
    Countlucky,
    Introduction,
    Jackpot,
    Loginin,
    Record,
    Takein
  },
};
</script>

<style scoped lang="scss">
#freeturn {
  .container {
    width: 1200px;
    height: 100%;
    min-height: 1000px;
    margin: 0 auto;
    position: relative;
    text-align: left;
    .left {
      width: 800px;
    }
    .right {
      width: 380px;
    }
  }
  .active{
    color: #7ccd42;
  }
  .mall-nav{
    .mall-list{
      height:45px; line-height:45px; text-align:center; font-size:16px;

      li{
        -webkit-transition: all 0.5s;
        width:120px; float:left;  text-shadow:#070a11 1px 3px 10px;-webkit-transition: all 0.5s;
        font-weight: 600;
        span{
          width:32px;height:20px;display:inline-block; vertical-align: -4px;-webkit-transition: all 0.5s;
        }
        i{
          display: inline-block;
          border-bottom: 0px solid;
          .activei{
          border-bottom: 2px solid !important;
          }
        }
        .icon_logo0{background-position:0 0;}
        .icon_logo1{background-position:-32px 0;}
      }
      li:hover,li.active{
        // span{;}
        i{
          border-bottom: 2px solid !important;
        }
      }
    }
  }
}
</style>
