<template>
<div id="winner">
    <div class="winner">
      <div class="winner-tabcon">
        <span class="active">{{getIsShowTabcon!=2?'中奖记录':'道具说明'}}</span>
      </div>
      <div class="winner-list" v-if="getIsShowTabcon==1&&getHistoryData&&getHistoryData.length">
        <vueSeamlessScroll :data="getHistoryData">
          <ul>
            <li v-for="(item,index) in getHistoryData" :key="index" v-if="index<20">
              恭喜<span :title="item.datas[0]" class="text-over">{{item.datas[0]}}</span>
              抽中
              <em v-for="(demo,indexer) in item.datas" :key="indexer" v-if="indexer>0" class="text-over">{{demo}}<i>{{(parseInt(indexer)+1)==item.datas.length?'。':'，'}}</i></em></li>
          </ul>
        </vueSeamlessScroll>


      </div>
      <div class="winner-expend" v-if="getIsShowTabcon==2">
        <p>1.抽到的皮肤礼物和C币，均可参与赛事预测 或 兑换成相应点券</p>
        <p>道具及C币使用途径：</p>
        <p style="padding-left:10px;">· 皮肤、C币可在《丰收电竞》参与比赛预测赢取更多道具（地址：www.api.com）
        </p>
        <p style="padding-left:10px;">· 道具使用请登录《丰收电竞》—进入【我的菜园】中的背包使用道具</p>
        <p style="padding-left:10px;">· 另外C币还可用于《丰收电竞》中的商城购买皮肤礼物或其他虚拟充值卡</p>
        <p>2. 因错填账号、服务器造成充值错误，损失由玩家自行承担</p>
      </div>
  </div>
  <div class="right-mine-record">
    <div class="winner-mine" @click="fnOpenMyRecord()">我的{{getIsShowTabcon!=2?'开福袋':''}}记录>></div>
    <div class="winner-wechat">
      <!-- <div class="winner-wecha-img"></div>-->
      <div>
        <p style="width:202px;margin-left:-22px;">关注丰收电竞  领海量皮肤点券</p>
        <span>www.api.com</span>
      </div>
    </div>
  </div>
</div>
</template>
<script>
import Http from "@/common/http";
import config from '@/common/http-config'
import Vue from 'vue';
import vueSeamlessScroll from 'vue-seamless-scroll';
Vue.use(vueSeamlessScroll)

export default {
  // name:'Navigintor'
  data(){
    return{
      countDown:null,

    }
  },
  methods:{
    fnOpenMyRecord(){
      let userInfo =this.$store.state.user.userInfo;
      if(!userInfo){
        this.fnOpenLogin();
        return;
      }
      this.$store.commit('mutationsIsSHowMyRecord',true)
    },
    fnOpenLogin(){
      this.$store.commit('mutationsIsLoginAddActive',true);
      this.$store.dispatch('logout');
      this.$store.commit('showLoginDialog',true);
      setTimeout(()=>{
        this.$store.commit("istestBooleam",true);
      },100)
    },
    initWebSocket: function() {
        let self =this;
        if (this.ws) {
          this.ws.close();
          this.ws=null;
        }
        this.ws = new WebSocket(`${config.websocket}?channel=box`);
        this.ws.onmessage = function(event) {
          // self.wsdata = JSON.parse(event.data);
          let wsData =JSON.parse(event.data);
          // console.log('我链接了',JSON.parse(event.data));
          if(wsData.message.id!=undefined){
            self.$store.commit('mutationsHistoryData',wsData.message)
          }
        };
      },
  },
  components:{
    vueSeamlessScroll,
  },
  mounted() {
    this.$store.dispatch('actionsHistoryData')
    this.initWebSocket();
    this.countDown=setInterval(()=>{
      this.initWebSocket();
    },10*60*1000)
  },
  destroyed() {
    clearInterval(this.countDown);
  },
  computed:{
    getIsShowTabcon(){
      return this.$store.state.treasure.isShowTabcon;
    },
    getHistoryData(){
      return this.$store.state.treasure.historyData;
    },
  },
}
</script>
<style lang="scss" scoped src="@/assets/css/treasure.css"></style>


