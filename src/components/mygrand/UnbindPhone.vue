<template>
  <div id="userinfo">
    <div class="modify_bg">
      <div class="modify-seat">您的位置： <router-link to="./personinfo" tag="i">我的菜园</router-link> 》 <router-link to="./personinfo" tag="i">账户信息</router-link> 》 <span class="cl-yellow1">手机号绑定</span></div>
      <div class="modify_down">
        <div class="modify_dn-list">
          <div class="modify_same">
            <div class="modify_same_text fl">输入手机号：</div>
            <div class="modify_same_right relative fl">
              <input type="text" ref="oldPassword" class="modify_same_input modify_same_pass" value="" @focus="addOld" @blur="oldPassword"/>
              <span class="Error" ref="oldError" v-show="items.oldPasswordShow"></span>
            </div>
            <div class="clear"></div>
          </div>
          <div class="modify_same">
            <div class="modify_same_text fl">输入密码：</div>
            <div class="modify_same_right relative fl">
              <input type="text" ref="psw" class="modify_same_input modify_same_pass" value="" @focus="addpsw" @blur="oldPsw"/>
              <span class="Error" ref="oldPsw" v-show="items.pswShow"></span>
            </div>
            <div class="clear"></div>
          </div>
          <div class="modify_same">
            <div class="modify_same_text fl">验证码：</div>
            <div class="modify_same_right relative fl">
              <input type="text" class="modify_same_input modify_same_verity fl" ref="newPassword" value="" @focus="addNew" @blur="newPassword"/>
              <!-- <input type="button" class="modify_same_bottom" ref="getVerity" @click="sendVerity" data-name="1" value="获取验证码"/> -->
              <input type="button" class="modify_same_bottom" id="verify_btn" ref="getVerity" data-name="1" value="获取验证码"/>
              <span class="Error" ref="newError" v-show="items.newPasswordShow"></span>
            </div>
            <div class="clear"></div>
          </div>
          <div class="modify_same">
            <div class="modify_same_text fl"></div>
            <div class="modify_same_right relative fl">
              <button class="modify_save fl" @click="doSave">保存</button>
              <a href="javascript:history.go(-1)" class="modify_save fr">返回</a>
              <div class="clear"></div>
            </div>
            <div class="clear"></div>
          </div>
        </div>

      </div>
    </div>
    <router-view></router-view>
    <div class="clear"></div>
  </div>
</template>
<script>
  import Http from './../../common/http';
  import { mapMutations, mapState } from 'vuex';
  export default {
    data () {
      return {
        items: {
          oldPasswordShow:false,
          newPasswordShow:false,
          sureShow:false,
        }
      }
    },
    methods:{
      toTwo(n){
        return n<10?n='0'+n:n
      },
      addpsw(){
        let _this = this;
        _this.$refs.psw.classList.add("active");
        if (_this.$refs.psw.classList.contains("error") == true) {
          _this.$refs.psw.classList.remove("error");
        }
      },
      oldPsw() {
        let _this = this;
        let Rpassword = /^[a-zA-Z0-9]{6,14}$/; //6-14密码数字加字母的正则
        let Tpassword = this.$refs.psw.value; //密码值
        if (_this.$refs.psw.classList.contains("active") == true) {
          _this.$refs.psw.classList.remove("active");
        }
        if (Tpassword !== "") {
          if (!Rpassword.test(Tpassword)) {
            _this.items.pswShow = true;
            _this.$refs.psw.classList.add("error");
            _this.$refs.oldPsw.innerHTML = "密码格式有误，请重新输入";
          } else {
            _this.items.pswShow = false;
            _this.$refs.oldPsw.innerHTML = "";
            if (_this.$refs.psw.classList.contains("error") == true) {
              _this.$refs.psw.classList.remove("error");
            }
          }
        } else {
          _this.items.pswShow = true;
          _this.$refs.psw.classList.add("error");
          _this.$refs.oldPsw.innerHTML = "密码不能为空";
        }
      },
      doSave:function(){
        let _this=this;
        let oldPassword=_this.$refs.oldPassword.value;
        let pws = _this.$refs.psw.value;
        let newPassword=_this.$refs.newPassword.value;
        if(oldPassword==='') {
          _this.items.oldPasswordShow =true;
          _this.$refs.oldPassword.classList.add('error');
          _this.$refs.oldError.innerHTML = '手机号不能为空'
        }
        if(!pws){
          _this.items.pswShow = true;
          _this.$refs.psw.classList.add("error");
          _this.$refs.oldPsw.innerHTML = "密码不能为空";
        }
        if(newPassword==='') {
          _this.items.newPasswordShow =true;
          _this.$refs.newPassword.classList.add('error');
          _this.$refs.newError.innerHTML = '验证码不能为空'
        }
        if(oldPassword!=''&&newPassword!='' && pws){
            if(_this.items.oldPasswordShow==false){
              let datas={
                mobile:oldPassword,
                password:pws,
                code:newPassword,
                challenge:this.$store.state.match.challenge_gee?this.$store.state.match.challenge_gee:null
              }
//              console.log(datas)
              Http.post('/updateMobile',datas).then(function(data){
                let result =data.data;
                if(result.code==0){
                  let dataOption ={
                    'masseges':'绑定成功',
                    'typesucceed':'1',
                  }
                  _this.$store.commit('isSigninPupopDis',true);
                  _this.$store.commit('isSigninPupopDis',dataOption);
                }else{
                  let dataOption ={
                    'masseges':result.message,
                    'type':'2',
                  }
                  _this.$store.commit('isSigninPupopDis',true);
                  _this.$store.commit('isSigninPupopDis',dataOption);

                }

              })

            }
        }
      },
      addOld:function(){let _this=this;_this.$refs.oldPassword.classList.add('active');if(_this.$refs.oldPassword.classList.contains('error')==true){_this.$refs.oldPassword.classList.remove('error');};},
      addNew:function(){let _this=this;_this.$refs.newPassword.classList.add('active');if(_this.$refs.newPassword.classList.contains('error')==true){_this.$refs.newPassword.classList.remove('error');};},
      oldPassword:function(){
        let _this=this;
        let reg =/^1[3-9]\d{9}$/;//手机号码正则
        let password =_this.$refs.oldPassword.value;
        if(_this.$refs.oldPassword.classList.contains('active')==true){
          _this.$refs.oldPassword.classList.remove('active');
        }
        if(password!=='') {
          if (!reg.test(password)) {
            _this.items.oldPasswordShow =true;
            _this.$refs.oldPassword.classList.add('error');
            _this.$refs.oldError.innerHTML = '手机格式有误，请重新输入'
          } else {
            _this.items.oldPasswordShow =false;
            _this.$refs.oldError.innerHTML = ''
            if(_this.$refs.oldPassword.classList.contains('error')==true){
              _this.$refs.oldPassword.classList.remove('error');
            }
          }
        }else{
          _this.items.oldPasswordShow =true;
          _this.$refs.oldPassword.classList.add('error');
          _this.$refs.oldError.innerHTML = '手机号不能为空'
        }
      },
      newPassword:function(){
        let _this=this;
        if(_this.$refs.newPassword.classList.contains('active')==true){
          _this.$refs.newPassword.classList.remove('active');
        }
        let password =_this.$refs.newPassword.value;
          if (password==='') {
            _this.items.newPasswordShow =true;
            _this.$refs.newPassword.classList.add('error');
            _this.$refs.newError.innerHTML = '验证码不能为空'
          } else {
            _this.items.newPasswordShow =false;
            _this.$refs.newError.innerHTML = '';
            if(_this.$refs.newPassword.classList.contains('error')==true){
              _this.$refs.newPassword.classList.remove('error');
            }
          }
      },
      sendVerity(){
        let RemailPhone = /^1[3-9]\d{9}$/;//手机号码正则
        let TemailPhone =this.$refs.oldPassword.value,_this=this;//手机值

        let j=60,timer=null,params;
        let _box =_this.$refs.getVerity;
        let _dataName=_box.getAttribute('data-name');
        if(RemailPhone.test(TemailPhone)){
          if(_this.items.oldPasswordShow==false){
            _this.items.oldPasswordShow=false;
            _this.$refs.oldError.innerHTML='';
            if(_dataName==1){
              params={
                phone:TemailPhone,
                verify:'0',
              }
//              console.log(params)
              Http.post('/sms/bindMobile',params).then(function(response){
                let result =response.data;
                if(result.code==0){
                  _box.value='重新获取 '+_this.toTwo(j)+'s';
                  _box.style.cursor='default';
                  timer = setInterval(function(){
                    j--;
                    if(j >0 ){
                      _box.value='重新获取 '+_this.toTwo(j)+'s';
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
          _this.$refs.oldError.innerHTML='手机号格式有误，请重新输入';
        }
      },

    },
     mounted() {
    initSense(
      {
        id: "8544de89de785ffd903af4ae58ea11d4",
        onError: err => {
          let dataOption = {
            masseges: "非常抱歉，你操作过于频繁，请稍后再试！",
            type: "2"
          };
          this.$store.commit("isSigninPupopDis", true);
          this.$store.commit("isSigninPupopDis", dataOption);
        }
      },
      sense => {
        document.getElementById("verify_btn").addEventListener("click", () => {
          // alert(1);
          let RemailPhone = /^1[3-9]\d{9}$/; //手机号码正则
          let TemailPhone = this.$refs.oldPassword.value;
          let Rpassword = /^[a-zA-Z0-9]{6,14}$/; //6-14密码数字加字母的正则
          let Tpassword = this.$refs.psw.value; //密码值
          if (TemailPhone === "") {
            this.items.oldPasswordShow = true;
            this.$refs.oldPassword.classList.add("error");
            this.$refs.oldError.innerHTML = "手机号不能为空";
          }
          if(!Tpassword){
            this.items.pswShow = true;
            this.$refs.psw.classList.add("error");
            this.$refs.oldPsw.innerHTML = "密码不能为空";
          }
          if (TemailPhone && RemailPhone.test(TemailPhone) && Tpassword && Rpassword.test(Tpassword)) {
            sense.sense();
          }
        });
        sense
          .setInfos(() => {
            return {
              interactive: 2
            };
          })
          .onSuccess(data => {
            let challenge = data.challenge;
            this.$store.commit("challenge_muta", challenge);
            let deepKnowParams = {
              challenge,
              username: this.$refs.oldPassword.value,
              sceneId: 2,
              sourceType: "web"
            };
            Http.post("geetest/gtVerify", deepKnowParams)
              .then(res => {
                console.log(res, "deepknow");
                if (res.data.code == 0) {
                  if (res.data.data.isWarning == 0) {
                    this.sendVerity();
                  } else {
                    let dataOption = {
                      masseges: "非常抱歉，你操作过于频繁，请稍后再试！",
                      type: "2"
                    };
                    this.$store.commit("isSigninPupopDis", true);
                    this.$store.commit("isSigninPupopDis", dataOption);
                  }
                } else {
                  let dataOption = {
                    masseges: res.data.message,
                    type: "2"
                  };
                  this.$store.commit("isSigninPupopDis", true);
                  this.$store.commit("isSigninPupopDis", dataOption);
                }
              })
              .catch(Http.onError);
            // this.logindis(challenge);
          })
          .onClose(() => {
            // alert("请先完成验证");
            console.log("用户关闭了验证");
          })
          .onError(err => {
            console.warn("验证出错,稍后再试");
            sense.reset();
          });
      }
    );
  },
    computed:{
    }
  }
</script>
<style lang="scss" scoped src="@/assets/css/modify.css"></style>
