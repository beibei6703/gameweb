<template>
  <div id="userinfo">
    <div class="modify_bg">
      <div class="modify-seat">您的位置： <router-link to="./personinfo" tag="i">我的菜园</router-link> 》 <router-link to="./personinfo" tag="i">个人信息</router-link> 》 <span class="cl-yellow1">设置</span></div>
      <div class="modify_set">
        <div class="modify_same">
          <div class="set-left fl">当前头像</div>
          <div class="set-right fl">如果您还没有自己的头像，系统会显示为默认头像，您需要自己上传一张新的照片来作为自己的个人头像</div>
          <div class="clear"></div>
        </div>
        <div class="modify_same border-bottom">

          <div class="set-pic fl">
            <VueCropper ref="cropper" style="background-image:none;background-color:#000;" :img="image" :autoCrop="true" :autoCropWidth="90" :autoCropHeight="90" :fixedBox="true" @realTime="realPreview"></VueCropper>
            <div class="set-pic-upload" style="display:none">
              <img :src="userInfo.avatar" ref="image" />

              <input ref="file" type="file" accept="image/*" style="display:none" @change="onChange" />
            </div>
            <div class="set-pic-btn">
              <div class="set-pic-save modify_save fl" @click="onSaveAvatar">保存</div>
              <div class="set-pic-save modify_save fr" @click="onLoad">上传</div>
              <div class="clear"></div>
            </div>

          </div>

          <div class="set-pic-pic fl" v-if="previews">
            <div class="show-preview relative">
              <div class="circle-big">
                <img :src="previews.url" :style="previews.img" v-if="previews.url!=''">

              </div>
              <div class="circle-big-png"></div>

              <p>大头像90X90</p>
            </div>
            <div class="show-preview relative">
              <div class="circle-small">
                <div v-if="previews.url!=''"><img :src="previews.url" :style="previews.img" ref="smallPic"></div>
              </div>
              <div class="circle-small-png"></div>
              <p class="circle-small-p">小头像50X50</p>
            </div>

          </div>

          <div class="clear"></div>

        </div>


        <div class="modify_same padding-top">
          <div class="set-left fl">昵  称</div>
          <div class="set-right fl">
            <input type="text" class="set-input set-name " ref="nicknames" v-model="userInfo.nickname" v-if="nicknameShow" readonly="readonly" />
            <input type="text" class="set-input set-name focusborder" ref="nickname" v-model="userInfo.nickname" v-if="nicknameShows" />
            <!-- <button class="set-revise modify_same_modify ensuremodify" v-if="nicknameShow" @click="modifyfocus">修改</button> -->
            <!-- <button class="set-revise modify_same_modify" @click="modifyNickname" v-if="nicknameShows">保存</button> -->
            <div class="linewrap">
                <i class="wream-ts fleft">每30天只能修改一次昵称</i>
                <button class="set-revise modify_same_modify ensuremodify fright" v-if="nicknameShow" @click="modifyfocus">修改</button>
                <button class="set-revise modify_same_modify fright" @click="modifyNickname" v-if="nicknameShows">保存</button>
            </div>
          </div>
          <div class="clear"></div>
        </div>
        <div class="modify_same border-bottom">
          <div class="set-left fl">个人签名</div>
          <div class="set-right fl">
            <textarea class="set-textarea set-input" ref="bio" v-model="userInfo.bio"></textarea>
            <!--<textarea class="set-textarea set-input" ref="bio" v-if="userInfo.bio=='这个人很懒，什么都没留下'" :placeholder="userInfo.bio"  onfocus="this.placeholder=''" onblur="this.placeholder='这个人很懒，什么都没留下'"></textarea>-->
           <div class="linewraplong">
              <i class="wream-ts fleft">还可以输入 {{lengthArc}}个字符</i>
              <button class="set-textarea-btn set-submit fright" @click="modifyBio">保存</button>
           </div>
          </div>
          <div class="clear"></div>

        </div>

        <div class="modify_same">
          <h1 class="cl-yellow1">绑定以下第三方账号信息后，可以进行快捷登录</h1>
          <div class="set-third">
            <ul>
              <li v-if="!qqBind">
                <div class="third-icon fl"><span class="icon_qq"></span>QQ账号</div>
                <div class="third-bind fl">未绑定</div>
                <div class="third-bottom set-submit fr" @click="onBind('qq')">绑定</div>
                <div class="clear"></div>
              </li>
              <li v-if="!wechatBind">
                <div class="third-icon fl"><span class="icon_wx"></span>微信账号</div>
                <div class="third-bind fl">未绑定</div>
                <div class="third-bottom set-submit fr" @click="onBind('wechat')">绑定</div>
                <div class="clear"></div>
              </li>
              <li v-if="!weiboBind">
                <div class="third-icon fl"><span class="icon_wb"></span>微博账号</div>
                <div class="third-bind fl">未绑定</div>
                <div class="third-bottom set-submit fr" @click="onBind('weibo')">绑定</div>
                <div class="clear"></div>
              </li>
              <li v-if="qqBind" class="active">
                <div class="third-icon fl"><span class="icon_qq"></span>QQ账号</div>
                <div class="third-bind fl">已绑定</div>
                <div class="third-bottom set-submit fr" @click="onUnbind('qq')">解绑</div>
                <div class="clear"></div>
              </li>
              <li v-if="wechatBind" class="active">
                <div class="third-icon fl"><span class="icon_wx"></span>微信账号</div>
                <div class="third-bind fl">已绑定</div>
                <div class="third-bottom set-submit fr" @click="onUnbind('wechat')">解绑</div>
                <div class="clear"></div>
              </li>
              <li v-if="weiboBind" class="active">
                <div class="third-icon fl"><span class="icon_wb"></span>微博账号</div>
                <div class="third-bind fl">已绑定</div>
                <div class="third-bottom set-submit fr" @click="onUnbind('weibo')">解绑</div>
                <div class="clear"></div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <router-view></router-view>
    <div class="clear"></div>
  </div>
</template>
<script>
  let matchWords;
  import Http from './../../common/http';
  import { mapMutations, mapState } from 'vuex';
  import VueCropper from 'vue-cropper'
  const socials = {'1':'qq','2':'steam','3':'wb','4':'wx'};
  import axios from 'axios';
  export default {
    data () {
      return {
        userInfo:{'id':0,'nickname':'','bio':'','avatar':''},
        'image':'',
        previews: {
          'url': '',
          'img': {},

        },
        'smallImg':'',
        qqBind:false,
        wechatBind:false,
        weiboBind:false,
        steamBind:false,
        nicknameShow:true,
        nicknameShows:false,
        channel:'',
        lengthArc:60,
        textLength:0,
        nickNameLen:false,
//        userName:userInfo.nickname
      }
    },
    created:function(){
      this.getUserInfo();
    },
    mounted: function() {
      //this.userInfo = this.$store.state.user.userInfo ? this.$store.state.user.userInfo : this.userInfo;
      //console.log('用户数据',this.$store.state)
      //this.image = this.$refs.image
      var span = document.querySelectorAll('span.cropper-view-box');
      span[0].setAttribute('style',"outline:none");
      this.loadSocial();
    },
    computed:{

    },
    components:{
      VueCropper
    },
    methods:{
      modifyfocus(){
          let self =this;
        Http.get('/lastUpdatedNickname').then(function(res) {
            // console.log('昵称信息',res)
            if(res.data.code==0){
              if(res.data.data.canUpdate==true){
                self.nicknameShow = !self.nicknameShow
                self.nicknameShows = !self.nicknameShows;

                if (self.nicknameShows == true) {
                  // console.log('ssssssss',)
      //              this.$refs.nickname.focus
                  setTimeout(() => {
                    self.done()
                  }, 100)

                }
              }else{
                self.alert('每30天只能修改一次昵称')
              }
            }else{
              self.alert(res.data.message)
            }
        });

      },
      done(){
//        this.$refs.nickname.classList.add('focus');
        this.$refs.nickname.focus()
      },
      loadSocial:function(){
        var self = this;
        Http.get('socials').then(function(response){
          if(response.data.code==0){
            var res = response.data.data;
            if(res.length>0){
              for(var i=0;i<res.length;i++){
                if(res[i].social_type==1){
                  self.qqBind=true;
                  self.$store.commit("mutationQqBind",true);
                }
                if(res[i].social_type==2) {
                  self.steamBind=true;
                }
                if(res[i].social_type==3) {
                  self.weiboBind=true;
                  self.$store.commit("mutationWbBind",true);
                }
                if(res[i].social_type==4) {
                  self.wechatBind=true;
                  self.$store.commit("mutationWxBind",true);
                }
              }
            }
          }
        });
      },
      onLoad:function(){
        this.$refs.file.click();
      },
      onChange:function(e){
        //this.image = this.$refs.file.value
        this.uploadImg(e,1)
      },
      realPreview:function(data){
        if(data.h==0)return;
        console.log(data)
        this.previews = data;

      },
      uploadImg (e, num) {
        //上传图片
        // this.option.img
        var file = e.target.files[0];
        if (!/\.(gif|jpg|jpeg|png|bmp|GIF|JPG|PNG)$/.test(e.target.value)) {
          if(e.target.value!=e.target.value){;
          this.alert('图片类型必须是.gif,jpeg,jpg,png,bmp中的一种')
          }
          return false
        }


        var reader = new FileReader()
        reader.onload = (e) => {
          let data
          if (typeof e.target.result === 'object') {
            // 把Array Buffer转化为blob 如果是base64不需要
            data = window.URL.createObjectURL(new Blob([e.target.result]))
          } else {
            data = e.target.result
          }
          if (num === 1) {
            this.image = data
          }
        }
        // 转化为base64
        // reader.readAsDataURL(file)
        // 转化为blob
        reader.readAsArrayBuffer(file)
      },
      onSaveAvatar:function(){
//        console.log('upload start');
        var self = this
        this.$refs.cropper.getCropData(function(data){
          Http.post('updateAvatar',{'avatar':data}).then(function(res){
            //console.log(res);
            if(res.data.code==0){
              self.$store.dispatch('userInfo')
              self.alert('头像上传成功');
              self.$store.dispatch('getNews');
              self.getUserInfo();
              if(self.previews.url){
                  if(self.$refs.smallPic.classList.contains('focus')==true){
                    self.$refs.smallPic.classList.remove('focus')
                  }

              }


            }else{
              self.alert(res.data.message);
            }
          });
        });
      },
      getUserInfo:function(){
        var self = this
        this.$store.dispatch('userInfo').then(function(res){
          self.userInfo = res.data.data
          console.log('用户信息', self.userInfo)
          self.previews = {'url':res.data.data.avatar}
        });
        Http.get('socials').then(function(res){
//          console.log(res.data)
        });
      },
      modifyNickname:function(){
        var self = this;
        var inputNum = this.userInfo.nickname.replace(/[^\x00-\xff]/g, "**").length; //得到输入的字节数
        if (inputNum >= 4) {
          if (inputNum <= 14) {
            matchWords =this.userInfo.nickname.length;
            this.nickNameLen=true;


            setTimeout(()=>{
//              return console.log(this.$refs.nickname.value)
              if(this.nickNameLen==true){
                Http.post('updateNickname',{'nickname':this.$refs.nickname.value}).then(function(response){
                  console.log('修改昵称',response)
                  if(response.data.code==0){
//            self.$store.dispatch('userInfo')
                    self.getUserInfo()
                    self.alert('修改成功');
                    self.nicknameShow = true
                    self.nicknameShows =false;
                    self.$store.dispatch('getNews');
                  }else{
                    self.alert(response.data.message)
                  }
                });
              }
            },200)
          }else{
            this.alert('昵称设置最多7个中文或14个字符')

          }
        }else{
          this.alert('昵称设置最少2个中文或4个字符')
        }



      },
      modifyBio:function(){
        var self = this
        //console.log(this.$refs.nickname)
        Http.post('updateBio',{'bio':this.$refs.bio.value}).then(function(response){
          if(response.data.code==0){
            self.alert('修改成功');
          }else if(response.data.code==41000){
            self.alert(response.data.data.bio[0])
//            console.log(response.data)

          }else{
            self.alert(response.data.message)
          }
        });
      },
      onBind:function(channel){
        var self = this
        var params = {
          'channel':
          channel
        }
        var client = axios.create({'baseURL':'https://www.api.com'});
        client.post('social/bind',params).then(function(response){
          //response = JSON.parse(response)
//          console.log(response)
          // alert('第三方',response)
          if(response.data.code==0){
              self.openWin(response.data.data.url,channel);
          }else{
            self.alert(response.data.message)
          }
        })
      },
      onUnbind:function(channel){
        var self = this
        var params = {
          'channel':channel
        }
        Http.post('social/unbind',params).then(response=>{

          if(response.data.code==0){
            /*let dataOption ={
              'masseges':response.data.message,
              'typeUnbind':'1',
            }
            self.$store.commit('isSigninPupopDis',true);
            self.$store.commit('isSigninPupopDis',dataOption);*/
            self.alert(response.data.message)
            setTimeout(() => {
              window.location.reload();
            }, 200)
            self.loadSocial();

          }
          self.alert(response.data.message)

        })
      },
      openWin:function(url,type){
        var setWin = {
          'qq':'qq----TencentLogin----width=616,height=616,menubar=0,scrollbars=1,resizable=1,status=1,titlebar=0,toolbar=0,location=1',
          'wechat':'wechat----TencentLogin----width=616,height=616,menubar=0,scrollbars=1,resizable=1,status=1,titlebar=0,toolbar=0,location=1',
          'weibo':'weibo----WeiboLogin----width=616,height=616,menubar=0,scrollbars=1,resizable=1,status=1,titlebar=0,toolbar=0,location=1'
        };
        setTimeout(()=>{
          var arr = setWin[type].split('----');
          var new_win = window.open('', arr[1], arr[2]);
          window.oauthLogin = this.closeWin;
          this.channel = type
          window.addEventListener && window.addEventListener('message', this.closeWin);
          new_win.location.href = url;
        },300)

      },
      closeWin:function(obj){
        var self = this;
//        console.log(obj)
        var o = JSON.parse(obj.data);
        if(o.origin != 'bind') return;
        if (o.error !== undefined) {
          return;
        }
        var client = axios.create({'baseURL':'https://www.api.com'});
        var params = {'code':o.code,'state':o.state,'channel':this.channel}
        client.post('social/bindSocial',params).then(function(response){
          if(response.data.code==0){
            self.loadSocial();
            self.alert('绑定成功')
          }else{
            self.alert(response.data.message)
          }
//          console.log(response.data)
        });
      },

  },
    computed:{

    },
    watch:{
      userInfo:{
        handler:function(val,oldval){
          var inputNum = val.bio.replace(/[^\x00-\xff]/g, "**").length; //得到输入的字节数
          if (inputNum < 61) {
            matchWords = val.bio.length;
            this.lengthArc=60;
            this.lengthArc=this.lengthArc-inputNum;
          }
          if (inputNum > 60) {
            this.userInfo.bio = val.bio.substring(0, matchWords); //如果超过200字节，就截取到200字节
          }

        },
        deep:true,
      }

  }
  }
</script>
<style lang="scss" scoped src="@/assets/css/modify.css"></style>
<style >
  .cropper-crop-box span{
    /* border-radius: 100%; */
  }
  .cropper-view-box{
    outline:none;
    outline-color:none
  }
  .linewrap{
    width:342px;
    height: 46px;
    overflow: hidden;
  }
    .linewraplong{
    width:520px;
    height: 46px;
    overflow: hidden;
  }
  .ensuremodify{
    color: #8f5708;
    line-height: 35px;
    height:35px;
    padding:0 10px;
    background:#e1c076;
    font-size:16px;
     text-align: center;
     border-radius:3px;
     cursor: pointer;
  }
</style>
