<template>
<div id="dialog">
  <div class="dialog_mask">
    <div class="dialog_main">
      <div class="letterinstation ">
          <router-link class="close pointer" tag="div" to="/mygrand/myemail">X</router-link>
          <div class="lettertop">站内邮件</div>
          <div class="lettermain">
            <div class="recipient thethird">
              <span class="titletext fleft">接收人 :</span>
              <input type="text" :placeholder="nickplace" class="fleft textinput" ref="nickname" onfocus="this.placeholder=''" onblur="this.placeholder='请输入对方昵称'">
            </div>
            <div class="title thethird">
              <span class="titletext fleft">标&nbsp;&nbsp;&nbsp;题 :</span>
              <input type="text" :placeholder="titleplace" class="fleft textinput" ref="titles" onfocus="this.placeholder=''" onblur="this.placeholder='标题最多可输入15个中文'">
            </div>
            <div class="text thethird">
              <span class="titletext fleft">正&nbsp;&nbsp;&nbsp;文 :</span>
              <textarea :placeholder="textplace" id="" cols="30" rows="10" class="fleft texttextarea" ref="texts" onfocus="this.placeholder=''" onblur="this.placeholder='内容最多可输入100个中文'"></textarea>
            </div>
            <p class="sendbtn pointer" @click="handlesend()" >确认发送</p>
          </div>
          <div class="dialog" v-show='this.$store.state.home.backendstatus'>
            <Backend></Backend>
          </div>
      </div>
      </div>
    </div>
</div>
</template>
<script>
 import Backend from '../../dialog/Backend.vue'
export default {
  data () {
    return {
      nickplace:"请输入对方昵称",
      titleplace:"标题最多可输入15个中文",
      textplace:"内容最多可输入100个中文",
    }
  },
  methods: {
    handlesend(){
      var nick= this.$refs.nickname.value;
      var titles = this.$refs.titles.value;
      var texts=this.$refs.texts.value;
      console.log(texts.replace(/[\u4E00-\u6FA5]/g,"**").length,'我是长度我是长度')
      // console.log(nick,titles,texts,'什么呀');
      if(titles.replace(/[\u4E00-\u6FA5]/g,"**").length>30){
        this.$store.commit('backendclose',true)
         this.$store.commit('worldtakstatus','标题长度不能超过15个中文哦')
         return
      }else if(texts.replace(/[\u4E00-\u6FA5]/g,"**").length>200){
         this.$store.commit('backendclose',true)
         this.$store.commit('worldtakstatus','内容长度不能超过100个中文哦')
         return
      }
      if(nick.length<=0 || titles.length<=0 || texts.length<=0){
         this.$store.commit('backendclose',true)
         this.$store.commit('worldtakstatus','接收人/标题/正文都不能为空哦')
         return
      }
      // console.log(nick,titles,texts,'什么呢')
      this.$store.dispatch("letterinstationdis",{"nickname":nick,'title':titles,'content':texts})
      // if(this.$store.state.user.userInfo.level<4){
      //    this.$store.commit('backendclose',true)
      //    this.$store.commit('worldtakstatus','当前等级不足,需LV4才可使用该功能')
      //    return
      // }
      // console.log(this.$store.state.user.userInfo,'这里打印用户信息')
      setTimeout(()=>{
          if(this.$store.state.home.lettersuccessed==true){
            console.log('成功成功')
              this.$refs.nickname.value='';
              this.$refs.titles.value='';
              this.$refs.texts.value='';
          }
      },500)
    }
  },
  components: {
    Backend
  },
  computed: {
    lettersuccessed:function(){
      return this.$store.state.home.lettersuccessed ? this.$store.state.home.lettersuccessed :false
    }
  }
}
</script>
<style lang="scss" scoped>
.dialog_main{
    width:760px;
    height:643px;
    background:rgba(27,28,31,0.54);
    .close{
      position: absolute;
      right: 98px;
      top: 35px;
      color: #424242;
    }
   .letterinstation{
      width:600px;
      height:570px;
      background:rgba(27,28,31,1);
      border:1px solid rgba(49,49,49,1);
      margin:23px auto;
      padding-top: 21px;
    .lettertop{
      width:63px;
      height:18px;
      font-size:15px;
      font-weight:bold;
      color:rgba(255,255,255,1);
      line-height:18px;
      text-align: center;
      margin:20px auto;
    }
    .thethird{
     padding-left: 72px;
     margin-bottom: 24px;
    }
    .recipient{
      height: 44px;
    }
    .title{
      height: 44px;
    }
    .text{
      height: 238px;
    }
    .titletext{
      font-size: 16px;
      color: #dcdcdc;
      line-height: 44px;
      margin-right: 20px;
    }
    .textinput{
      width: 368px;
      height: 44px;
      background: #15161a;
      border:none;
      border-bottom: 1px solid #414141;
      border-right: 1px solid #414141;
      outline: none;
      padding-left: 12px;
      color: #dcdcdc;
    }
    .texttextarea{
      width: 368px;
      height: 228px;
      background: #15161a;
      border:none;
      border-bottom: 1px solid #414141;
      border-right: 1px solid #414141;
      outline: none;
      padding-left: 12px;
      padding-top:12px;
      color: #dcdcdc;
      resize:none;
    }
    .sendbtn{
      width:117px;
      height:40px;
      line-height: 40px;
      font-size: 15px;
      color:rgba(152,152,152,1);
      background:rgba(49,49,49,1);
      border:1px solid rgba(61,62,62,1);
      margin:0 auto;
    }
  }
  }
</style>


