<template>
  <div id="chat">
    <div class="detail-dn-world-expend">本站所有预测均只为休闲娱乐，增加比赛趣味性，所有道具和C币均不能兑换为现金
</div>
    <div class="detail-dn-world">
      <div class="detail-dn-world-main">
        <ul>
          <li v-for="(data,index) in getguesstalkdata" :key="data.id" v-if="data.nickname!=''"><span>{{data.nickname}}：</span><em>{{data.content}}</em></li>
        </ul>
      </div>
      <div class="detail-dn-world-send">
        <input type="text" class="detail-send-input" @focus="focusInput" @blur="blusInput" placeholder="限输入50个字符" ref='talkcontent'  @keyup="sendcontentEnter($event)"/>
        <button class="detail-world-button" @click="sendcontent" v-if="!waitForthree"></button>
        <button class="detail-world-button waitfor" v-if="waitForthree">{{waitForthree}}</button>
        <div class="clear"></div>
      </div>
    </div>
  </div>

</template>
<style lang="scss" scoped src="@/assets/css/guessDetail.css"></style>
<script>
  import config from '@/common/http-config'
  import {getStore,getCookie} from '@/utils/storage'
  export default {
    data() {
      return {
        isensure: false,
        getguesstalkdata: [],
        ws: null,
        isLoad: false,
        battleId:this.$store.state.match.battleId.battle_id,
        openstatus:1,
      }
    },
    computed: {
    },
    mounted: function() {
      let _self = this;
      if(_self.$store.state.match.battleId.battle_id) {
        console.log('你出来了没有啊',_self.$store.state.match.battleId.battle_id)
        let datas = {
        'battle_id': _self.$store.state.match.battleId.battle_id
      }
        _self.initWebSocket();
        _self.$store.dispatch('getguesstalkdis',datas);
        setTimeout(() => {
          _self.getMessage(_self)
        },100)
         setInterval(() => {
          // _self.getguesstalkdata=[];
           _self.initWebSocket();
           //_self.$store.dispatch('getguesstalkdis',datas);
           //_self.getMessage(_self)
         },60*1000*10)
      }
    },
    methods: {
      focusInput(){this.$refs.talkcontent.placeholder=''},
      blusInput(){this.$refs.talkcontent.value==""?this.$refs.talkcontent.placeholder='限输入50个字符':this.$refs.talkcontent.placeholder=''},
      sendcontentEnter(event){
          if(event.ctrlKey&&event.keyCode == 13){
            if(!this.waitForthree){
              this.sendcontent()
            }
          }
      },
      getMessage(_self){
        _self.getguesstalkdata = _self.$store.state.match.getguesstalkdata ? _self.$store.state.match.getguesstalkdata : [];
        if(_self.getguesstalkdata.length>9){
          var max = _self.getguesstalkdata.length-9
          for(var i=0;i<max;i++){
            _self.getguesstalkdata.shift()
          }
        }
      },
      initWebSocket: function() {
        if (this.ws) {
          this.ws.close();
          this.ws=null;
        }
        this.ws = new WebSocket(`${config.websocket}?channel=battle:${parseInt(this.battleId)}`);
        this.ws.onmessage = this.onMessage;
      },
      onOpen(event){
          console.log(event,'ws open')
      },
      onClose(event){
        console.log(event,'ws close')
        this.initWebSocket();
      },
      onMessage: function(event) {
        let message = JSON.parse(event.data)
        console.log('dqqqqq',message,new Date());
        if(message.channel == 'battle:'+parseInt(this.battleId)) {
          var params = {
            id: message.message.id,
            uid: message.sender.id,
            nickname: message.sender.nickname,
            content: message.message.content,
            created_at: message.message.sent_at
          };
          if(this.$store.state.match.getguesstalkdata.indexOf(params.id)==-1){
              console.log(params)
            if(this.getguesstalkdata.length>8){
              var max = this.getguesstalkdata.length-8
              for(var i=0;i<max;i++){
                this.getguesstalkdata.shift();
              }
            }
            this.getguesstalkdata.push(params)
          }

        }
      },
      sendcontent() {
        let _this =this;
        let value = _this.$refs.talkcontent.value;
        _this.$store.dispatch('userInfo');
        setTimeout(()=>{
          if(value!=''){
            if(this.$store.state.user.userInfo){

              _this.$store.dispatch('postguesstalkdis', {
                message: value,
                channel:'battle:'+_this.battleId
              })
              _this.$refs.talkcontent.value = '';
              this.$refs.talkcontent.placeholder='限输入50个字符';
            }else{
              _this.$store.dispatch('showLoginDialog',true);
              setTimeout(()=>{
                _this.$store.commit("istestBooleam",true);
              },100)
            }
          }else{
            let dataOption ={
              'masseges':'聊天内容不能为空',
            }
            _this.$store.commit('isSigninPupopDis',true);
            _this.$store.commit('isSigninPupopDis',dataOption);

          }

        },100)

      },
      userTexted(event) {
        let text = event.target.value;
        let textLen = text.length;
        let actualLen = 0;
        if (actualLen > 50) {
          let dataOption ={
            'masseges':'聊天内容不能超过50个字符',
          }
          _this.$store.commit('isSigninDiaShowDis',true);
          _this.$store.commit('isSigninDiaShowDis',dataOption);
        }
      },
      //倒计时弹框
      waitfor(){
        let dataOption ={
          'masseges':'聊天时间还需等待'+this.waitForthree,
        }
        this.$store.commit('isSigninPupopDis',true);
        this.$store.commit('isSigninPupopDis',dataOption);

      }
    },
    watch:{
        $route(){
          let  _self = this;
            if(_self.$route.query.battle_id){
          if(_self.battleId!=_self.$route.query.battle_id) {
            _self.battleId=_self.$route.query.battle_id;
            _self.getguesstalkdata=[];
            let datas={
              'battle_id':_self.battleId
            }
            _self.initWebSocket();
            _self.$store.dispatch('getguesstalkdis',datas);
            _self.$store.commit('isChatWaitTime',null);
            setTimeout(function() {
              _self.getMessage(_self)
            }, 100);

            setInterval(() => {
              _self.initWebSocket();
            },60*1000*10)

          }
        }
      }

    },
    computed:{
      waitForthree:function(){
          return this.$store.state.match.guessContent?this.$store.state.match.guessContent:null
      },
      getBattleId:function(){
      return this.$store.state.match.guessContent?this.$store.state.match.guessContent:null
      }
    }
  }
</script>
