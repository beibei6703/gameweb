<template>
  <div id="userinfo" v-if="getisShowVerityPhone">
    <div class="userinfo-bg" @click="closemodifyPopup()"></div>
    <div class="modify_bg modify_bg_verity">
      <i class="modify_close" @click="closemodifyPopup()"></i>
      <div class="modify-seat"><span class="cl-yellow1">手机号绑定</span></div>
      <div class="modify_down">
        <div class="modify_dn-list">
          <div class="modify_same">
            <div class="modify_same_text fl">确认手机号：</div>
            <div class="modify_same_right relative fl">
              <input type="text" class="modify_same_input modify_same_newphone fl" v-show="items.isShowPhone" v-model="items.newTells" readonly="readonly" ref="newPhonese"/>
              <input type="text" class="modify_same_input modify_same_newphone fl" v-show="items.isShowPhoneedit" @blur="newTell" @focus="addNew" ref="newPhones" v-model="items.newTells"/>
              <input type="button" class="modify_same_modify" ref="modifyPhone" @click="modifyPhone" data-name="1" value="修改"/>
              <span class="Error" ref="oldError" v-show="items.newTellShow"></span>
            </div>
            <div class="clear"></div>
          </div>
          <div class="modify_same">
            <div class="modify_same_text fl">{{!getUserInfo.mobile && !getUserInfo.email ? '设置新密码' : '输入密码'}}：</div>
            <div class="modify_same_right relative fl">
              <input type="text" ref="psw" class="modify_same_input modify_same_pass" value="" @focus="addpsw" @blur="oldPsw"/>
              <span class="Error" ref="oldPsw" v-show="items.pswShow"></span>
            </div>
            <div class="clear"></div>
          </div>
          <div class="modify_same">
            <div class="modify_same_text fl">验证码：</div>
            <div class="modify_same_right relative fl">
              <input type="text" class="modify_same_input modify_same_verity  fl" ref="newPassword" value="" @focus="addverity" @blur="newPassword"/>
              <!-- <input type="button" class="modify_same_bottom" ref="getVerity" id="verify_btn" @click="sendVerity" data-name="1" value="获取验证码"/> -->
              <input type="button" class="modify_same_bottom" ref="getVerity" id="verify_btn" data-name="1" value="获取验证码"/>
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
    <div class="clear"></div>
  </div>
</template>
<script>
  import Http from '@/common/http';
  import { mapMutations, mapState } from 'vuex';
  export default {
    data () {
      return {
        items: {
          newTellShow:false,
          newPasswordShow:false,
          sureShow:false,
          newTells:sessionStorage.getItem("newPhone"),
          isShowPhone:true,
          isShowPhoneedit:false,
        }
      }
    },
    watch:{
      items:{
        handler:function(val,oldval){
        },
        deep:true
      }
    },

    methods:{
      closemodifyPopup(){
        this.$store.commit('mutationsisShowVerityPhone',false)
      },
      returnPrev(){
        this.$store.commit('mutationsisShowModifyPhone',true)
        this.$store.commit('mutationsisShowVerityPhone',false)
      },
      toTwo(n){
        return n<10?n='0'+n:n
      },
      doSave:function(){
        let _this=this;
        let newTell=_this.items.newTells;
        let pws = _this.$refs.psw.value;
        let newPassword=_this.$refs.newPassword.value;
        if(newTell==='') {
          _this.items.newTellShow =true;
          _this.$refs.newPhonese.classList.add('error');
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
        if(newTell!=''&&newPassword!='' && pws){
            if(_this.items.newTellShow==false){
              let datas={
                mobile:newTell,
                password:pws,
                code:newPassword,
                challenge:this.$store.state.match.challenge_gee?this.$store.state.match.challenge_gee:null
              }
              Http.post('/updateMobile',datas).then(function(data){
                let result =data.data;
                if(result.code==0){
                  let dataOption ={
                    'masseges':'修改成功',
                    'typesucceed':'1',
                  }
                  _this.$store.commit('isSigninPupopDis',true);
                  _this.$store.commit('isSigninPupopDis',dataOption);
                  _this.$store.dispatch('userInfo')
                  sessionStorage.removeItem("newPhone")
                  _this.$store.commit('mutationsisShowVerityPhone',false)
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
      addNew:function(){
        let _this=this;
        if(_this.$refs.newPhones.classList.contains('active')!=true) {
          _this.$refs.newPhones.classList.add('active');
        }
          if(_this.$refs.newPhones.classList.contains('error')==true){
              _this.$refs.newPhones.classList.remove('error');
          };
        },
      addverity:function(){
          let _this=this;
          _this.$refs.newPassword.classList.add('active');
          if(_this.$refs.newPassword.classList.contains('error')==true){
              _this.$refs.newPassword.classList.remove('error');
          };
      },
      modifyPhone:function(){
          if(this.$refs.modifyPhone.getAttribute('data-name')=='1'){
            this.items.isShowPhone=!this.items.isShowPhone;
            this.items.isShowPhoneedit=!this.items.isShowPhoneedit;
            this.$refs.newPhones.classList.add('active');
            setTimeout(()=>{
              this.$refs.newPhones.focus()
            },100)
            this.$refs.modifyPhone.setAttribute('data-name','2')
          }else{
            this.$refs.newPhones.classList.remove('active');
            this.items.isShowPhone=!this.items.isShowPhone;
            this.items.isShowPhoneedit=!this.items.isShowPhoneedit;
            this.$refs.modifyPhone.classList.remove('active');

            this.$refs.modifyPhone.setAttribute('data-name','1')
          }


      },
      newTell:function(){
        let _this=this;
        let reg = /^1[3-9]\d{9}$/;//手机号码正则
        let Newphone= _this.items.newTells;
          if (_this.$refs.newPhones.classList.contains('active') == true) {
            _this.$refs.newPhones.classList.remove('active');
            this.items.isShowPhone=!this.items.isShowPhone;
            this.items.isShowPhoneedit=!this.items.isShowPhoneedit;
            this.$refs.modifyPhone.classList.remove('active');

            this.$refs.modifyPhone.setAttribute('data-name','1')
          }
          if (Newphone != '') {
            if (!reg.test(Newphone)) {
              _this.items.newTellShow = true;
              _this.$refs.oldError.innerHTML = '手机格式有误，请重新输入'
            } else {
              _this.items.newTellShow = false;
              _this.$refs.oldError.innerHTML = ''
              if (_this.$refs.newPhones.classList.contains('error') == true) {
                _this.$refs.newPhones.classList.remove('error');
              }
            }
          } else {
            _this.items.newTellShow = true;
            _this.$refs.newPhones.classList.add('error');
            _this.$refs.oldError.innerHTML = '手机号不能为空';
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
        let TemailPhone =this.items.newTells,_this=this;//手机值

        let j=60,timer=null,params;
        let _box =_this.$refs.getVerity;
        let _dataName=_box.getAttribute('data-name');
        if(RemailPhone.test(TemailPhone)){
          if(_this.items.newTellShow==false){
            _this.items.newTellShow=false;
            _this.$refs.oldError.innerHTML='';
            if(_dataName==1){
              params={
                phone:TemailPhone,
                verify:'0',
              }
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
    },

    created(){
// http://localhost:8080/mygrand/accountSetting
    },
    components:{
    },
    computed:{
      getisShowVerityPhone(){
        return this.$store.state.modifymessage.isShowVerityPhone;
      },
      getUserInfo() {
        return this.$store.state.user.userInfo;
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
          let TemailPhone = this.$refs.newPhones.value;
          let Rpassword = /^[a-zA-Z0-9]{6,14}$/; //6-14密码数字加字母的正则
          let Tpassword = this.$refs.psw.value; //密码值
          if (TemailPhone === "") {
            this.items.newTellShow = true;
            this.$refs.newPhones.classList.add("error");
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
              username: this.$refs.newPhonese.value,
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
  }
</script>
<style lang="scss" scoped src="@/assets/css/modifyPopup.css"></style>
