<template>
  <div class="forget-pop" :class="{active:getIsShow}">
    <div class="popup-mask"></div>
    <div class="popup-box">
      <div class="pop-close" @click="closeForget"></div>
      <div class="pop-title">密码找回</div>
      <div class="forget-content">
        <div class="forget-box" v-show="activeVerity">
          <div class="forget-content-up">
            <h1>1.验证身份</h1>
            <div class="forget-content-up-status">
              <span class="active"></span>
              <span></span>
              <span></span>
              <i></i>
              <div class="clear"></div>
            </div>
          </div>
          <div class="forget-content-down">
            <ul>
              <li>
                <div class="forget-content-dn-inside">
                  <i class="icon_name"></i>
                  <input type="text" class="forget-input forget-name" placeholder="请输入邮箱 / 手机号" onfocus="this.placeholder=''" onblur="this.placeholder='请输入邮箱 / 手机号'" value="" @blur="changeName" ref="namePhone"/>
                  <em class="icon_chacha"  @click="clearText"></em>
                  <span class="error-text" ref="nameError" v-show="items.nameShow"></span>
                </div>
              </li>
              <li>
                <input type="text" class="forget-input forget-verity" placeholder="请输入验证码" onfocus="this.placeholder=''" onblur="this.placeholder='请输入验证码'" @blur="codenumber" ref="inputVerity"/>
                <!-- <input type="button" class="forget-send" id="sendVerity" value="获取验证码" data-name="2" ref="getVerity" @click="sendVerity"/> -->
                <input type="button" class="forget-send" id="sendVerity" value="获取验证码" data-name="2" ref="getVerity" />
                <span class="error_text" ref="codeError" v-show="items.codeShow"></span>
              </li>
              <li>
                <input type="button" class="regiter-button" value='验证'  @click="doRegiter"/>
              </li>
            </ul>
          </div>
        </div>
        <div class="forget-box" v-show="activeModify">
          <div class="forget-content-up">
            <h1>2.重置密码</h1>
            <div class="forget-content-up-status">
              <span></span>
              <span class="active"></span>
              <span></span>
              <i></i>
              <div class="clear"></div>
            </div>
          </div>
          <div class="forget-content-down">
            <ul>
              <li>
                <div class="forget-content-dn-inside">
                  <input type="password" class="forget-input forget-password" id="resetpsw" placeholder="请输入密码" onfocus="this.placeholder=''" onblur="this.placeholder='请输入密码'" value="" @blur="changePassword" ref="passwordInput" autocomplete="new-password"/>
                  <input type="password" style="display:none;" redonly disabled id="resetpsw">
                  <em class="icon_eye" @click="seePassword($event)" data-name="1"></em>
                  <span class="error_text" ref="passwordError" v-show="items.passwordShow"></span>
                </div>
              </li>
              <li>
                <div class="forget-content-dn-inside">
                  <input type="password" style="display:none;" redonly disabled id="psw">
                  <input type="password" class="forget-input forget-password" id="psw" placeholder="请再次输入密码" onfocus="this.placeholder=''" onblur="this.placeholder='请再次输入密码'" value="" @blur="surePassword" data-name="1" ref="surePasswords" autocomplete="new-password"/>
                  <em class="icon_eye" @click="seePassword($event)"></em>
                  <span class="error_text" ref="sureError" v-show="items.sureShow"></span>
                </div>
              </li>
              <li>
                <!-- <input type="button" class="regiter-button" @click="doSure" value='确认'/> -->
                <button class="regiter-button" @click="doSure">确认</button>
              </li>
            </ul>
          </div>
        </div>
        <div class="forget-box" v-show="activeSuccess">
          <div class="forget-content-up">
            <h1>3.修改成功</h1>
            <div class="forget-content-up-status">
              <span></span>
              <span></span>
              <span class="active"></span>
              <i></i>
              <div class="clear"></div>
            </div>
          </div>
          <div class="forget-content-down">
            <div class="forget-succeed"></div>
            <ul>
              <li>
                <input type="button" class="regiter-button" @click="clickLogin" value='立即登录'/>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped lang="scss">
  //公用
  .fl {float: left;  }
  .fr {float: right;  }
  input{outline:none;}
  .clear {clear: both;  margin: 0;  padding: 0;  display: block;  }
  .allbody {  width: 1200px;  margin-left: auto;  margin-right: auto;  }
  .hide { display: none  }
  .show { display: block  }
  .block{display: block; }
  .forget-pop {/*display:none;*/position: fixed;top: 0;right: 0; bottom: 0;left: 0;outline: 0;z-index:1000000;width:100%;height:100%;

    .popup-mask {position: fixed;top: 0;right: 0;bottom: 0;left: 0;outline: 0;  background: rgba(5, 6, 6, 0.8);  }
    .popup-box {
      position: fixed;  top: 50%;  left: 50%;  margin: -286px 0 0 -241px;width:442px;height:562px;display: block;z-index: 100000000;background: url('../../assets/images/LoginImage/login-bg.png') no-repeat;border-radius: 5px

    }
    .pop-close {
      position:absolute;top:20px; right:25px;width:22px; height:22px;cursor:pointer;background:url('../../assets/images/competeImg/inequality_i.png') no-repeat center;
      &:hover{
        background-image:url('../../assets/images/competeImg/inequality_ih.png');
      }
    }

    .pop-title{padding:16px; line-height:95px;padding-left:30px;font-size:34px;color:#deae6e; text-align: left; background: -webkit-linear-gradient(#f5e8c5 50%, #a4865c);-webkit-background-clip: text;
      -webkit-text-fill-color: transparent;}
    .forget-content{
      width:384px; margin:0 auto; text-align: left;
      .forget-content-up{ text-align: center;
        h1{font-weight:normal;font-size:18px; line-height:50px; color:#d9a35a;}
        .forget-content-up-status{text-align: center;
          height:10px;position:relative;top:0; left:0;
          i{display:block; position:absolute;top:50%; height:1px; width:100%; background:#535353; z-index: -1;}
          span{
            display:inline-block; width:9px; height:9px;background:#989898; border-radius:100%;margin:0 40px; vertical-align: 4px;
            &.active{background:#d9a35a;}
          }
        }


      }
      .forget-content-down{padding-top:50px;
        li{
          clear:both;height:80px;position:relative;top:0; left:0;
          .forget-input{background:none; border:0;float:left; display:block; height:38px;outline:none;color:#989898;font-size:14px;background:#0e0f11;}
          span{background:url('../../assets/images/competeImg/icon_ts.png') no-repeat left center;cursor: default; height:26px; position:absolute; bottom:10px;left:0;font-size:12px;text-indent:20px; line-height:26px; color:#c02d3b;}
          .forget-content-dn-inside{
            height:42px; line-height:42px; border:#535353 1px solid; background:#0e0f11;
            .icon_name{height:42px; background:url('../../assets/images/LoginImage/username-icon.png') no-repeat center;display:block; float:left; width:30px;}
            .icon_eye{
              height:42px; background:url('../../assets/images/LoginImage/forget_eye.png') no-repeat center;display:block; float:left; width:30px;
              &.active{
                background-image:url('../../assets/images/competeImg/eye_b.png');
              }
            }

            .forget-name{width:320px;}
            .forget-password{width:328px;padding:0 10px;}

            .icon_chacha{height:40px; width:20px;background:url('../../assets/images/LoginImage/forget_cha.png') no-repeat center; display:block; float:left;cursor:pointer;}

          }
          .forget-verity{padding:0 15px;  border:#535353 1px solid; height:40px;width:200px; }
          #sendVerity{float:right;width:136px; height:42px; line-height:42px;display:block; background:#847a68; border:0; color:#fefefe; font-size:16px; text-align: center; cursor:pointer;}
          &:last-child{margin-top:30px;}
          .regiter-button{
            -webkit-transition: all 0.5s;margin:0 auto;height:48px; line-height:48px; text-align:center; font-size:18px; color:#fff;display:block;cursor:pointer; background:url('../../assets/images/LoginImage/login-btn.png') no-repeat;border:0; width:100%;text-shadow: 1px 1px 2px #7e6028;
            &:hover{background: url('../../assets/images/LoginImage/login-btnh.png') no-repeat;}
          }

          }
      }
    }
    .forget-succeed{width:247px; height:154px; margin:0 auto;background:url('../../assets/images/LoginImage/forget_su.png') no-repeat;}
    &.active{
      .popup-box{
        background-image: url('https://imgcdn.api.com/images/treasure/enroll_bg.png') !important;
      }
      .forget-content-up{
          h1{color:#fff !important;}
          .forget-content-up-status{text-align: center;
            height:10px;position:relative;top:0; left:0;
            i{ background:#5659a0;}
            span{
              background:#3E59D2;
              &.active{background:#fff;}
            }
          }
        }
        .forget-content-dn-inside{
          border-color:#3f42a0 !important;color:#8f8fc9 !important;
        }
        .forget-input,.forget-verity{border-color:#3f42a0 !important;color:#8f8fc9 !important;}

        input::-webkit-input-placeholder {
            color: #797ab3;
        }

        input:-moz-placeholder,
        {
            color: #797ab3;
        }

        input::-moz-placeholder,
        {
            color: #797ab3;
        }

        input:-ms-input-placeholder {
            color: #797ab3;
        }
        .pop-close{background-image:url('https://imgcdn.api.com/images/treasure/close.png') !important;
          &:hover{
            background-image:url('https://imgcdn.api.com/images/treasure/close_hover.png') !important;
          }
        }
        #sendVerity{ background:#3E59D2 !important;}
        .regiter-button{
          background: #3538c5 !important;
          box-shadow: 0px 0px 20px #99baf9 inset !important;
          border-radius: 6px !important;
          color: #fff !important;
          &:hover{
            background: #4e51de !important;
            box-shadow: 0px 0px 20px #99baf9 inset !important;
            border-radius: 6px !important;
          }
        }
        .forget-succeed{background-image:url('../../assets/images/LoginImage/forget_su_1.png') !important;}
        .pop-title{color:#fff !important;background: -webkit-linear-gradient(#fff 50%, #fff)  !important;-webkit-background-clip: text  !important;}


    }
  }

</style>
<script>
  import Http from './../../common/http';
  import { mapMutations, mapState } from 'vuex';
  export default {
    data() {
      return {
        activeVerity:true,
        activeModify:false,
        activeSuccess:false,
        chachaShow:false,
        nameShow:false,
        nameError:false,
        items:{
          type1:'',
          nameShow:false,
          codeShow:false,
          passwordShow:false,
          sureShow:false,
        }
      }
    },
    methods:{
      clearText:function(){
        this.$refs.namePhone.value='';
      },
      toTwo(n){
        return n<10?n='0'+n:n
      },
      changeName(){
        let _this=this;
        let RemailPhone = /(1[34578]\d{9}$)|(^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$)/i;//邮箱和手机号码正则
        let TemailPhone =_this.$refs.namePhone.value,param;//手机和邮箱值
        let _box =_this.$refs.getVerity;
//        console.log(TemailPhone)
        if(TemailPhone!=''){
          if(!RemailPhone.test(TemailPhone)){
            _this.items.nameShow=true;
            _this.$refs.nameError.innerHTML='邮箱/手机号格式有误，请重新输入'
          }else{

            _this.items.nameShow=false;
            _this.$refs.nameError.innerHTML='';
            _box.setAttribute('data-name','1');

          }
        }else{
          _this.items.nameShow=true;
          _this.$refs.nameError.innerHTML='邮箱/手机号不能为空'
        }
      },
      //发送验证码
      sendVerity(){
        let _this=this;
        let RemailPhone = /(1[34578]\d{9}$)|(^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$)/i;//邮箱和手机号码正则
        let TemailPhone =_this.$refs.namePhone.value;//手机和邮箱值
        let j=60,timer=null,params;
        let _box =_this.$refs.getVerity;
        let _dataName=_box.getAttribute('data-name');
        if(TemailPhone!=''){
          if(RemailPhone.test(TemailPhone)){
            if(_this.items.nameShow==false){
              _this.items.nameShow=false;
              _this.$refs.nameError.innerHTML='';
              if(_dataName==1){
                params={
                  username:TemailPhone,
                }
//                console.log(params)
                Http.post('/passwordResetToken',params).then(function(response){
                  let result =response.data;
                  console.log(result)
                  if(result.code==0){
                    _box.value='重新获取 '+_this.toTwo(j)+'s';
                    _box.style.background='#9a9998';
                    _box.style.cursor='default';
                    timer = setInterval(function(){
                      j--;
                      if(j >0 ){
                        _box.value='重新获取 '+_this.toTwo(j)+'s';
                        _box.style.background='#9a9998';
                        _box.style.cursor='default';
                        _box.setAttribute('data-name','2')
                      }else{
                        _box.value='获取验证码';
                        _box.removeAttribute('style');
                        _box.setAttribute('data-name','1');
                        clearInterval(timer);
                      }
                    },1000);
                    let dataOption ={
                      'masseges':result.message,
                      'type':'2',
                    }
                    _this.$store.commit('isSigninPupopDis',true);
                    _this.$store.commit('isSigninPupopDis',dataOption);
//                    alert(result.message)

                  }else{
                    let dataOption ={
                      'masseges':result.message,
                      'type':'2',
                    }
                    _this.$store.commit('isSigninPupopDis',true);
                    _this.$store.commit('isSigninPupopDis',dataOption);
                  }
                });
              }
            }
          }else{
            _this.items.nameShow=true;
            _this.$refs.nameError.innerHTML='邮箱/手机号格式有误，请重新输入';
          }
        }else{
          _this.items.nameShow=true;
          _this.$refs.nameError.innerHTML='邮箱/手机号格式不能为空';
        }
      },
      codenumber(){
        if(this.$refs.inputVerity.value!=''){
          this.items.codeShow=false;
          this.$refs.codeError.innerHTML='';
        }else{
          this.items.codeShow=true;
          this.$refs.codeError.innerHTML='验证码不能为空';
        }
      },
      doRegiter(){
        let _this =this,datas;
        let Name =_this.$refs.namePhone.value;
        let inputVerity =_this.$refs.inputVerity.value;
        let _box =_this.$refs.getVerity;
        if(Name===''){
          _this.items.nameShow=true;
          _this.$refs.nameError.innerHTML='邮箱/手机号不能为空';
        }
        if(inputVerity===''){
          _this.items.codeShow=true;
          _this.$refs.codeError.innerHTML='验证码不能为空';
        }
        if(Name!=''&&inputVerity!=''){
          if(_this.items.nameShow==false&&_this.items.codeShow==false){
            datas={
              username:Name,
              code:inputVerity,
            }
            Http.post('/verifyResetCode',datas).then(function(response){
              let result =response.data;
              if(result.code==0){
                _this.activeVerity=false;
                _this.activeModify=true;
                _this.$refs.passwordInput.value='';

                _this.$refs.passwordInput.setAttribute('data-username',Name)
                _box.value='获取验证码';
                _box.removeAttribute('style');
                _box.setAttribute('data-name','1');
              }else{
                let dataOption ={
                  'masseges':result.message,
                  'type':'2',
                }
                _this.$store.commit('isSigninPupopDis',true);
                _this.$store.commit('isSigninPupopDis',dataOption);
              }
            });
          }else{
//            console.log('参数有误')
          }
        }
      },
      changePassword(){
        let Rpassword = /^[a-zA-Z0-9]{6,14}$/;//6-14密码数字加字母的正则
        let Tpassword =this.$refs.passwordInput.value;//密码值
        if(Tpassword!='') {
          if (!Rpassword.test(Tpassword)) {
            this.items.passwordShow = true;
            this.$refs.passwordError.innerHTML = '密码必须是6-14位字母及数字'
          } else {
            this.items.passwordShow = false;
            this.$refs.passwordError.innerHTML = ''
          }
        }else{
          this.items.passwordShow = true;
          this.$refs.passwordError.innerHTML = '登录密码不能为空'
        }
      },
      //确认密码
      surePassword(){
        let Tpassword =this.$refs.passwordInput.value;//密码值
        let TpasswordSure =this.$refs.surePasswords.value;//密码值
        if(TpasswordSure!='') {
          if (TpasswordSure != Tpassword) {
//            console.log('两次密码不一致')
            this.items.sureShow = true;
            this.$refs.sureError.innerHTML = '两次密码输入不一致，请重新输入'
          } else {
            this.items.sureShow = false;
            this.$refs.sureError.innerHTML = ''
          }
        }else{
          this.items.sureShow = true;
          this.$refs.sureError.innerHTML = '确认密码不能为空'
        }
      },
      seePassword:function(event){
        let el =event.currentTarget;
        if(el.getAttribute('data-name')==1){
          el.previousElementSibling.type='text';
          el.classList.add('active');

          el.setAttribute('data-name','2')
        }else{
          el.previousElementSibling.type='password';
          el.classList.remove('active');
          el.setAttribute('data-name','1')
        }
      },
      doSure(){
        let _this =this,datas;
        let passwordInput =_this.$refs.passwordInput.value;
        let usernmae =_this.$refs.passwordInput.getAttribute('data-username');
        let surePasswords =_this.$refs.surePasswords.value;
        if(passwordInput===''){
          _this.items.nameShow=true;
          _this.$refs.passwordError.innerHTML='登录密码不能为空';
        }
        if(surePasswords===''){
          _this.items.codeShow=true;
          _this.$refs.sureError.innerHTML='确认密码不能为空';
        }
        if(passwordInput!=''&&surePasswords!=''){
          if(_this.items.passwordShow==false&&_this.items.sureShow==false){
            datas={
              username:usernmae,
              password:passwordInput,
              re_password:surePasswords,
              challenge:_this.$store.state.match.challenge_gee?_this.$store.state.match.challenge_gee:null
            }
            Http.post('/resetPassword',datas).then(function(response){
              let result =response.data;
              if(result.code==0){
                _this.activeVerity=false;
                _this.activeModify=false;
                _this.activeSuccess=true;



              }else{
                let dataOption ={
                  'masseges':result.message,
                  'type':'2',
                }
                _this.$store.commit('isSigninPupopDis',true);
                _this.$store.commit('isSigninPupopDis',dataOption);
//                alert(result.message)
              }
            });
          }else{
//            console.log('参数有误')
          }
        }
      },
      clickLogin:function(){
        if(this.$store.state.user.userInfo){
          this.closeForget();
        }else {
          this.$store.commit('showLoginDialog',true)
          this.$store.commit('showForget',false)
          this.activeVerity = true;
          this.activeModify = false;
          this.activeSuccess = false;
        }
      },
      closeForget:function(){

        if(this.$refs.getVerity){
          this.$refs.namePhone.value='';
          this.$refs.inputVerity.value='';
          this.$refs.getVerity.value='获取验证码';
          this.$refs.getVerity.removeAttribute('style');
          this.$refs.getVerity.setAttribute('data-name','1');
        }

        this.activeVerity=true;
        this.activeModify=false;
        this.activeSuccess=false;
        this.$store.commit('showForget',false);
        this.items.type1=''
        this.items.nameShow=false
        this.items.codeShow=false
        this.items.passwordShow=false
        this.items.sureShow=false

      }
    },
    mounted() {
      Http.post(`/geetest/register?t=${new Date().getTime()}`, {
        geetest_challenge: "39e384d2cf27d82accd723a594454f11",
      }).then(response => {

        if (response.data.code == 0) {
          initGeetest(
            {
              gt: response.data.data.gt,
              challenge: response.data.data.challenge,
              offline: !response.data.data.offline,
              new_captcha: true,
              product: "bind",
              width: "100%"
            },
            captchaObj => {
              captchaObj
                .onReady(function() {
                  $("#wait").hide();
                })
                .onSuccess(() => {
                  var result = captchaObj.getValidate();
                  if (!result) {
                    return alert("请完成验证");
                  }
                  Http.post("/geetest/verify", {
                    geetest_challenge: result.geetest_challenge,
                    geetest_validate: result.geetest_validate,
                    geetest_seccode: result.geetest_seccode
                  }).then(response => {
                    var challenge = result.geetest_challenge;
                     this.$store.commit('challenge_muta',challenge);
                    if(response.data.data.status=='fail'){
                      let dataOption ={
                        'masseges':'验证失败，请稍后再试！',
                        'type':'2',
                      }
                      this.$store.commit('isSigninPupopDis',true);
                      this.$store.commit('isSigninPupopDis',dataOption);
                    }
                    if (response.data.data.status == "success") {
                      // alert('验证成功')
                      this.sendVerity();
                      // this.logindis(challenge);
                    } else {
                      captchaObj.reset();
                    }
                  });
                });

              $("#sendVerity").click(() => {
                  let _this =this,datas;
                  let Name =_this.$refs.namePhone.value;
                  let inputVerity =_this.$refs.inputVerity.value;
                  let _box =_this.$refs.getVerity;
                  if(Name===''){
                    _this.items.nameShow=true;
                    _this.$refs.nameError.innerHTML='邮箱/手机号不能为空';
                  }else{
                    captchaObj.verify();
                  }
              });

            }
          );
        }
      });

    },
    watch:{
      items:{
        handler:function(val,oldVal){
        },
        deep:true
      }
     },
     computed:{
      getIsShow(){
        return this.$store.state.treasure.isLoginAddActive
      },
    },
  }
</script>
