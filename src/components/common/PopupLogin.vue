<template>
  <Popup :title="title" :open="show" @close="close">
    <div slot="content">
      <div class="box-nav">
        <div class="login-nav fl" :class="{active:activeLogin}" @click="tab('login')">登录</div>
        <div class="register-nav fr" :class="{active:activeRegister}" @click="tab('register')">注册</div>
      </div>
      <div class="clear"></div>
      <div class="box-text clear" v-show="activeLogin">
        <span class="box-text-title text-left">丰收网账号登录</span>
        <div class="box-user">
          <input type="text" v-model="loginForm.username" placeholder="手机号/邮箱"  onfocus="this.placeholder=''" onblur="this.placeholder='手机号/邮箱'" class="loginInput userName" ref="userName" id="userName" @blur="loginName">
          <i class="userIcon"><img src="../../assets/images/LoginImage/username-icon.png"/></i>
          <span class="error_text" ref="loginnameError" v-show="items.loginnameShow"></span>
        </div>
        <div class="box-pass">
          <input type="password" v-model="loginForm.password" placeholder="密码" @blur="loginchangePassword"  onfocus="this.placeholder=''" onblur="this.placeholder='密码'" ref="passwordInputs" class="loginInput passWord" id="passWord">
          <i class="passIcon"><img src="../../assets/images/LoginImage/password-icon.png"/></i>
          <span class="error_text" ref="loginpasswordError" v-show="items.loginpasswordShow"></span>
        </div>
        <div class="icheckbox">
          <label class="fl pr"><input type="checkbox" ref="rememberMe" id="autoLogin">下次自动登录</label>
          <span @click="forgetPassword" class="forgot-pass fr">忘记密码？</span>
        </div>
        <!-- <div class="login-btn" @click="doLogin" id="loginnow">立即登录</div> -->
        <div class="login-btn"  id="loginnow">立即登录</div>
        <div class="login-else clear">
          <div class="else-login fl">
            <a :href="'/qq?redirect='+pathUrl" class="block">
              <span class="loginQQ"></span>
              <span>QQ登录</span>
            </a>
          </div>
          <div class="else-login fl">
            <a :href="'/wechat?redirect='+pathUrl" class="block">
              <span class="loginWeChat"></span>
              <span>微信登录</span>
            </a>
          </div>
          <div class="else-login fl">
            <a :href="'/weibo?redirect='+pathUrl" class="block">
              <span class="loginWeibo"></span>
              <span>微博登录</span>
            </a>
          </div>
           <div class="else-login fl">
						<a :href="'/zhanqi?redirect='+pathUrl" class="block">
							<span class="loginZhanqi"></span>
							<span>战旗登录</span>
						</a>
					</div>
          <div class="clear"></div>
        </div>
      </div>
      <div class="box-text"  v-show="activeRegister">
        <div class="register-down">
          <ul>
            <li>
              <input type="text" d="ipt" class="regiter-input regiter-name" placeholder="请输入手机号" onfocus="this.placeholder=''" onblur="this.placeholder='请输入手机号'"  value="" @blur="changeName" ref="namePhone" autocomplete="off"  />
              <!-- <input type="text" style="display:none;" redonly disabled id="ipt"> -->
              <span class="error_text" ref="nameError" v-show="items.nameShow"></span>
            </li>
            <li>
              <input type="password" style="display:none;" redonly disabled name="enpsw">
              <input type="password" class="regiter-input  regiter-name" name="enpsw" placeholder="请输入6-14位密码,只许字母及数字" onfocus="this.placeholder=''" onblur="this.placeholder='请输入6-14位密码,只许字母及数字'" value="" @blur="changePassword" ref="passwordInput" autocomplete="new-password" >
              <span class="error_text" ref="passwordError" v-show="items.passwordShow"></span>
            </li>
            <li>
              <input type="password" class="regiter-input regiter-name" placeholder="请再次输入密码" onfocus="this.placeholder=''" onblur="this.placeholder='请再次输入密码'" value="" @blur="surePassword" ref="surePasswords" autocomplete="new-password" />
              <span class="error_text" ref="sureError" v-show="items.sureShow"></span>
            </li>
            <li>
              <input type="text"  class="regiter-input regiter-input-verity" @blur="codenumber" placeholder="请输入验证码" onfocus="this.placeholder=''" onblur="this.placeholder='请输入验证码'" ref="inputVerity"/>
              <!-- <input type="button" value="获取验证码" id="getVerity" data-name="2" ref="getVerity" @click="sendVerity"/> -->
              <input type="button" value="获取验证码" id="getVerity" data-name="2" ref="getVerity"/>
              <span class="error_text" ref="codeError" v-show="items.codeShow"></span>
            </li>
            <li >
              <label @click="AgreenXY">
                <input type="checkbox" ref="agreenXy"/>我已阅读并同意<router-link @click.native="closeLogin" :to="{name:'userprotocol'}" tag="i">《 丰收网服务协议 》</router-link>
              </label>

              <span class="error_text" ref="agreenError" v-show="items.agreenShow"></span>

            </li>
            <li>
              <input type="button" class="regiter-button" @click="doRegiter" value='立即注册'/>
               <!-- <input type="button" class="regiter-button" value='立即注册' id="regnow"/> -->
            </li>
          </ul>
        </div>
      </div>
    </div>
  </Popup>
</template>

<script>
import Popup from "./Popup";
import Http from "./../../common/http";
import { mapMutations, mapState } from "vuex";
import { setStore, getStore, removeStore } from "./../../utils/storage.js";
// require("../../assets/gt.js");
import Qs from "qs";
export default {
  props: {
    show: {
      type: Boolean,
      default: false,
      timer: null,

    }
  },
  data() {
    return {
      pathUrl:this.$route.path,
      title: "欢迎登录丰收网",
      activeLogin: true,
      activeRegister: false,
      width: 442,
      height: 563,
      loginForm: {
        username: "",
        password: "",
        errMsg: ""
      },
      errUserName: false,
      errUserNameMessage: "",
      errPassword: false,
      items: {
        nameShow: false,
        passwordShow: false,
        sureShow: false,
        codeShow: false,
        agreenShow: false,
        codeShow: false,
        loginnameShow: false,
        loginpasswordShow: false
      }
    };
  },
  methods: {
    urlencode (str) {
        str = (str + '').toString();

        return encodeURIComponent(str).replace(/!/g, '%21').replace(/'/g, '%27').replace(/\(/g, '%28').
        replace(/\)/g, '%29').replace(/\*/g, '%2A').replace(/%20/g, '+');
    },
    tab: function(act) {
      if (act == "login") {
        this.activeLogin = true;
        this.activeRegister = false;
        this.height = 563;
        this.errUserName = false;
        this.items.nameShow = false;
        this.items.passwordShow = false;
        this.items.sureShow = false;
        this.items.agreenShow = false;
        this.items.codeShow = false;
        this.items.loginnameShow = false;
        this.items.loginpasswordShow = false;
        this.$refs.namePhone.value="";
        this.$refs.passwordInput.value="";
        this.$refs.surePasswords.value="";
        this.$refs.inputVerity.value="";
        if (this.$refs.namePhone.classList.contains("bd-error") == true) {
          this.$refs.namePhone.classList.remove("bd-error");
        }
        if (this.$refs.surePasswords.classList.contains("bd-error") == true) {
          this.$refs.surePasswords.classList.remove("bd-error");
        }
        if (this.$refs.inputVerity.classList.contains("bd-error") == true) {
          this.$refs.inputVerity.classList.remove("bd-error");
        }
        if (this.$refs.userName.classList.contains("bd-error") == true) {
          this.$refs.userName.classList.remove("bd-error");
        }
        if (this.$refs.passwordInputs.classList.contains("bd-error") == true) {
          this.$refs.passwordInputs.classList.remove("bd-error");
        }
      } else if (act == "register") {
        this.activeLogin = false;
        this.activeRegister = true;
        this.height = 740;
        this.items.nameShow = false;
        this.items.passwordShow = false;
        this.items.sureShow = false;
        this.items.agreenShow = false;
        this.items.codeShow = false;
        if (this.$refs.userName.classList.contains("bd-error") == true) {
          this.$refs.userName.classList.remove("bd-error");
        }
        if (this.$refs.passwordInput.classList.contains("bd-error") == true) {
          this.$refs.passwordInput.classList.remove("bd-error");
        }
        this.$refs.getVerity.value = "获取验证码";
        this.$refs.getVerity.setAttribute("data-name", "1");
        this.$refs.getVerity.removeAttribute("style");
        clearInterval(this.timer);
      }
    },
    doLogin: function() {
      let remenber = this.$refs.rememberMe.checked ? "1" : "0";
      let Rpassword = /^[a-zA-Z0-9]{6,14}$/; //6-14密码数字加字母的正则
      let RemailPhone = /(1[345789]\d{9}$)|(^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$)/i; //邮箱和手机号码正则

      if (this.loginForm.username == "") {
        this.items.loginnameShow = true;
        this.$refs.loginnameError.innerHTML = "手机号/邮箱不能为空";
        this.$refs.userName.classList.add("bd-error");
        return;
      }
      if (this.loginForm.password == "") {
        this.items.loginpasswordShow = true;
        this.$refs.loginpasswordError.innerHTML = "登录密码不能为空";
        this.$refs.passwordInputs.classList.add("bd-error");
        return;
      }
      if (!RemailPhone.test(this.loginForm.username)) {
        this.items.loginnameShow = true;
        this.$refs.loginnameError.innerHTML = "手机号/邮箱格式有误，请重新输入";
        this.$refs.userName.classList.add("bd-error");
        return;
      } else {
        this.items.loginnameShow = false;
        this.$refs.loginnameError.innerHTML = "";
        if (this.$refs.userName.classList.contains("bd-error") == true) {
          this.$refs.userName.classList.remove("bd-error");
        }
      }
      if (!Rpassword.test(this.loginForm.password)) {
        this.items.loginpasswordShow = true;
        this.$refs.loginpasswordError.innerHTML = "密码必须是6-14位字母及数字";
        this.$refs.passwordInput.classList.add("bd-error");
        return;
      } else {
        this.items.loginpasswordShow = true;
        this.$refs.loginpasswordError.innerHTML = "";
        if (this.$refs.passwordInput.classList.contains("bd-error") == true) {
          this.$refs.passwordInput.classList.remove("bd-error");
        }
      }
      var params = {
        username: this.loginForm.username,
        password: this.loginForm.password,
        remember_me: remenber
        // 'remember_me':'0',
      };
      console.log("ddddd", params);
      var self = this;
      self.$store.dispatch("login", params).then(function(response) {
        self.$store.commit("istestBooleam", false);
        if (response.data.code == 0) {
          self.$emit("close");
          // self.$store.commit("userInfo");
          // self.$store.dispatch("userInfo");
          // self.$store.dispatch("runninglistdis");
          if (self.$route.query.id) {
            let datas = {
              guess_id: self.$route.query.id
            };
            self.$store.dispatch("caimy_list", datas);
            self.$store.dispatch("skins_list", datas);
            self.$store.dispatch("skinsmy_list", datas);
            // self.$store.state.match.loginPupop = false;
          }
          if(self.$route.path.indexOf('treasure')!= -1){
            self.$store.dispatch('actionsFreeCount')
            self.$store.dispatch('actionsEnergyData');
            self.$store.dispatch('actionsMycardsData');
          }
           if(self.$route.path.indexOf('rebate')!= -1){
            self.$store.dispatch('getStatus')
            // self.$store.dispatch('actionsEnergyData');
            // self.$store.dispatch('actionsMycardsData');
          }
          if(self.$route.path.indexOf('freeturn')!= -1){
            self.$store.dispatch('freeturnself',{type:self.getFreeturntype})
          }
          if(self.$route.path.indexOf('/compete/')!=-1||self.$route.path.indexOf('/guess/')!=-1){
            self.$store.commit('mutationMyguessData',null);
            self.$store.commit('mutationMyguessPage',1);
            let params={
                status:'wait',
                result_status:'all',
                page:1,
                size:3,
            }
            self.$store.dispatch('actionMycaiData',params);
            self.$store.dispatch('actionMybagValue');
            self.$store.dispatch('actionSignData');
          }

          self.$store.commit("istestBooleam", false);
          if (self.$route.path == "/newsdetail") {
            window.location.href = window.location.href;
          }
        } else if (response.data.code == 41005) {
          let params = response.data.data.credentials,
            phonenum,
            phoneText;
          self.$store.state.match.uptimeTrue = true;
          self.$store.state.match.timeUp = null;
          if (params.mobile) {
            phonenum = params.mobile;
            phoneText = "手机号：";
          } else {
            phonenum = params.email;
            phoneText = "邮箱：";
          }
          self.$store.commit("isInequalityShowDis", {
            show: true,
            text: phoneText,
            phoneTell: phonenum,
            username: self.loginForm.username,
            password: self.loginForm.password,
            remember_me: remenber,
            // remember_me:'0',
            typeLogin: "2"
          });
        } else {
          let dataOption = {
            masseges: response.data.message,
            typeLogin: "2"
          };
          self.$store.commit("isSigninPupopDis", true);
          self.$store.commit("isSigninPupopDis", dataOption);
        }
      });
    },
    close: function() {
      this.$emit("close");
      this.$refs.namePhone.value="";
      this.$refs.passwordInput.value="";
      this.$refs.surePasswords.value="";
      this.$refs.inputVerity.value="";
    },
    //忘记密码
    forgetPassword: function() {
      this.$emit("close");
      this.$store.commit("showForget", true);
    },
    toTwo(n) {
      return n < 10 ? (n = "0" + n) : n;
    },
    closeLogin: function() {
      this.$emit("close");
    },
    //发送验证码
    sendVerity() {
      let RemailPhone = /(1[345789]\d{9}$)|(^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$)/i; //邮箱和手机号码正则
      let TemailPhone = this.$refs.namePhone.value,
        _this = this; //手机和邮箱值
      let j = 60,
        params;
      let _box = _this.$refs.getVerity;
      let _dataName = _box.getAttribute("data-name");
      if (RemailPhone.test(TemailPhone) && TemailPhone != "") {
        if (_this.items.nameShow == false) {
          _this.items.nameShow = false;
          _this.$refs.nameError.innerHTML = "";
          if (_dataName == 1) {
            params = {
              phone: TemailPhone,
              verify: "1",
              challenge:_this.$store.state.match.challenge_gee?_this.$store.state.match.challenge_gee:null
            };
            Http.post("/sms/register", params).then(function(response) {
              let result = response.data;
              _this.$store.commit("istestBooleam", false);
              if (result.code == 0) {
                _box.value = "重新获取 " + _this.toTwo(j) + "s";
                _box.style.background = "#9a9998";
                _box.style.cursor = "default";
                _this.timer = setInterval(function() {
                  j--;
                  if (j > 0) {
                    _box.value = "重新获取 " + _this.toTwo(j) + "s";
                    _box.style.background = "#9a9998";
                    _box.style.cursor = "default";
                    _box.setAttribute("data-name", "2");
                  } else {
                    _box.value = "获取验证码";
                    _box.removeAttribute("style");
                    _box.setAttribute("data-name", "1");
                    clearInterval(_this.timer);
                  }
                }, 1000);
                let dataOption = {
                  masseges: result.message,
                  typeLogin: "2"
                };
                _this.$store.commit("isSigninPupopDis", true);
                _this.$store.commit("isSigninPupopDis", dataOption);
              } else {
                let dataOption = {
                  masseges: result.message,
                  typeLogin: "2"
                };
                _this.$store.commit("isSigninPupopDis", true);
                _this.$store.commit("isSigninPupopDis", dataOption);
              }
            });
          }
        }
      } else {
        _this.items.nameShow = true;
        _this.$refs.nameError.innerHTML = "手机号/邮箱格式有误，请重新输入";
      }
    },
    //输入用户名
    changeName() {
      // let RemailPhone = /(1[345789]\d{9}$)|(^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$)/i; //邮箱和手机号码正则
       let RemailPhone = /^1(3|4|5|7|8)\d{9}$/;
      let _this = this,
        TemailPhone = _this.$refs.namePhone.value,
        param; //手机和邮箱值

      let _box = _this.$refs.getVerity;
      if (TemailPhone != "") {
        if (!RemailPhone.test(TemailPhone)) {
          _this.items.nameShow = true;
          _this.$refs.nameError.innerHTML = "手机号格式有误，请重新输入";
          this.$refs.namePhone.classList.add("bd-error");
        } else {
          _this.items.nameShow = false;
          _this.$refs.nameError.innerHTML = "";
          if (this.$refs.namePhone.classList.contains("bd-error") == true) {
            this.$refs.namePhone.classList.remove("bd-error");
          }
          param = {
            username: TemailPhone
          };
          Http.post("/checkAccount", param).then(function(response) {
            let result = response.data;
            if (result.code == 0) {
              _this.items.nameShow = false;
              _this.$refs.nameError.innerHTML = "";
              _box.setAttribute("data-name", "1");
            } else {
              _this.items.nameShow = true;
              _this.$refs.nameError.innerHTML = result.message;
              _box.setAttribute("data-name", "2");
            }
          });
        }
      } else {
        _this.items.nameShow = true;
        _this.$refs.nameError.innerHTML = "手机号不能为空";
        this.$refs.namePhone.classList.add("bd-error");
      }
    },
    //登录验证用户名格式
    loginName() {
      let RemailPhone = /(1[345789]\d{9}$)|(^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$)/i; //邮箱和手机号码正则
      let TemailPhone = this.loginForm.username; //手机和邮箱值

      if (TemailPhone != "") {
        if (this.istestBooleam == true) {
          if (!RemailPhone.test(TemailPhone)) {
            console.log("aaaaaaaaaa", TemailPhone);
            this.items.loginnameShow = true;
            this.$refs.loginnameError.innerHTML =
              "手机号/邮箱格式有误，请重新输入";
            this.$refs.userName.classList.add("bd-error");
          } else {
            this.items.loginnameShow = false;
            this.$refs.loginnameError.innerHTML = "";
            let param = {
              username: TemailPhone
            };
            Http.post("/checkAccount", param).then((response)=> {
              let result = response.data;
              console.log(result,'你是正常的吧');
              if (result.code == 0) {
                this.items.loginnameShow = true;
                this.$refs.loginnameError.innerHTML =
                  "您当前还没有注册哦";
                this.$refs.userName.classList.add("bd-error");
                this.$store.commit('hasnoregister',true);
              } else {
                this.$store.commit('hasnoregister',false);
              }
            });
            if (this.$refs.userName.classList.contains("bd-error") == true) {
              this.$refs.userName.classList.remove("bd-error");
            }
          }
        } else {
          this.items.loginnameShow = true;
          this.$refs.loginnameError.innerHTML = "手机号/邮箱不能为空";
          this.$refs.userName.classList.add("bd-error");
        }
      }
    },
    //输入密码
    changePassword() {
      let Rpassword = /^[a-zA-Z0-9]{6,14}$/; //6-14密码数字加字母的正则
      let Tpassword = this.$refs.passwordInput.value; //密码值
      if (Tpassword != "") {
        if (!Rpassword.test(Tpassword)) {
          this.items.passwordShow = true;
          this.$refs.passwordError.innerHTML = "密码必须是6-14位字母及数字";
          this.$refs.passwordInput.classList.add("bd-error");
        } else {
          this.items.passwordShow = false;
          this.$refs.passwordError.innerHTML = "";
          if (this.$refs.passwordInput.classList.contains("bd-error") == true) {
            this.$refs.passwordInput.classList.remove("bd-error");
          }
        }
      } else {
        this.items.passwordShow = true;
        this.$refs.passwordError.innerHTML = "登录密码不能为空";
        this.$refs.passwordInput.classList.add("bd-error");
      }
    },
    //登录验证密码格式
    loginchangePassword() {
      if (this.istestBooleam == true) {
        let Rpassword = /^[a-zA-Z0-9]{6,14}$/; //6-14密码数字加字母的正则
        let Tpassword = this.loginForm.password; //密码值
        if (Tpassword != "") {
          if (!Rpassword.test(Tpassword)) {
            this.items.loginpasswordShow = true;
            this.$refs.loginpasswordError.innerHTML =
              "密码必须是6-14位字母及数字";
            this.$refs.passwordInputs.classList.add("bd-error");
          } else {
            this.items.loginpasswordShow = false;
            this.$refs.loginpasswordError.innerHTML = "";
            if (
              this.$refs.passwordInputs.classList.contains("bd-error") == true
            ) {
              this.$refs.passwordInputs.classList.remove("bd-error");
            }
          }
        } else {
          this.items.loginpasswordShow = true;
          this.$refs.loginpasswordError.innerHTML = "登录密码不能为空";
          this.$refs.passwordInputs.classList.add("bd-error");
        }
      }
    },
    //确认密码
    surePassword() {
      let Tpassword = this.$refs.passwordInput.value; //密码值
      let TpasswordSure = this.$refs.surePasswords.value; //密码值
      if (TpasswordSure != "") {
        if (TpasswordSure != Tpassword) {
          this.items.sureShow = true;
          this.$refs.sureError.innerHTML = "两次密码输入不一致，请重新输入";
          this.$refs.surePasswords.classList.add("bd-error");
        } else {
          this.items.sureShow = false;
          this.$refs.sureError.innerHTML = "";
          if (this.$refs.surePasswords.classList.contains("bd-error") == true) {
            this.$refs.surePasswords.classList.remove("bd-error");
          }
        }
      } else {
        this.items.sureShow = true;
        this.$refs.sureError.innerHTML = "确认密码不能为空";
        this.$refs.surePasswords.classList.add("bd-error");
      }
    },
    codenumber() {
      if (this.$refs.inputVerity.value != "") {
        this.items.codeShow = false;
        this.$refs.codeError.innerHTML = "";
        if (this.$refs.inputVerity.classList.contains("bd-error") == true) {
          this.$refs.inputVerity.classList.remove("bd-error");
        }
      } else {
        this.items.codeShow = true;
        this.$refs.codeError.innerHTML = "验证码不能为空";
        this.$refs.inputVerity.classList.add("bd-error");
      }
    },
    AgreenXY() {
      let _this = this;
      let agreenXy = _this.$refs.agreenXy.checked;
      if (agreenXy != "") {
        _this.items.agreenShow = false;
        _this.$refs.agreenError.innerHTML = "";
      } else {
        _this.items.agreenShow = true;
        _this.$refs.agreenError.innerHTML = "注册条款必须同意才能注册";
      }
    },
    doRegiter() {

      let _this = this,

      // var  = ?_this.$store.state.match.challenge_gee:null
        datas;
      let Name = _this.$refs.namePhone.value;
      let passwords = _this.$refs.passwordInput.value;
      let surepasswords = _this.$refs.surePasswords.value;
      let inputVerity = _this.$refs.inputVerity.value;
      let agreenXy = _this.$refs.agreenXy.checked;
      if (agreenXy != "") {
      } else {
        _this.items.agreenShow = true;
        _this.$refs.agreenError.innerHTML = "注册条款必须同意才能注册";
      }
      if (Name === "") {
        _this.items.nameShow = true;
        _this.$refs.nameError.innerHTML = "手机号不能为空";
        _this.$refs.namePhone.classList.add("bd-error");
      }
      if (passwords === "") {
        _this.items.passwordShow = true;
        _this.$refs.passwordError.innerHTML = "登录密码不能为空";
        _this.$refs.passwordInput.classList.add("bd-error");
      }
      if (surepasswords === "") {
        _this.items.sureShow = true;
        _this.$refs.sureError.innerHTML = "确认密码不能为空";
        _this.$refs.surePasswords.classList.add("bd-error");
      }
      if (inputVerity === "") {
        _this.items.codeShow = true;
        _this.$refs.codeError.innerHTML = "验证码不能为空";
        _this.$refs.inputVerity.classList.add("bd-error");
      }
      if (
        Name != "" &&
        passwords != "" &&
        surepasswords != "" &&
        inputVerity != "" &&
        agreenXy != ""
      ) {
        if (
          _this.items.nameShow == false &&
          _this.items.passwordShow == false &&
          _this.items.sureShow == false &&
          _this.items.agreenShow == false &&
          _this.items.codeShow == false
        ) {
          if (agreenXy != "") {
            agreenXy = 1;
          } else {
            agreenXy = 0;
          }
          datas = {
            username: Name,
            password: passwords,
            re_password: surepasswords,
            agreement: agreenXy,
            code: inputVerity,
            challenge:_this.$store.state.match.challenge_gee?_this.$store.state.match.challenge_gee:null
          };
          Http.post("/register", datas).then(function(response) {
            let result = response.data;
            // console.log(response,'怕又是个妖精')
            _this.$store.commit("istestBooleam", false);
            if (result.code == 0) {
              let dataOption = {
                masseges: "注册成功",
                type: "2"
              };
              _this.$store.commit("isSigninPupopDis", true);
              _this.$store.commit("isSigninPupopDis", dataOption);

              // _this.$store.state.match.loginPupop = false;
              _this.$emit("close");
              _this.$store.dispatch("userInfo");
              _this.$store.dispatch("getNews");
              _this.$refs.namePhone.value=''
              _this.$refs.passwordInput.value=''
              _this.$refs.inputVerity.value=''
              _this.$refs.surePasswords.value=''
              _this.$refs.agreenXy.checked=false;
              if(_this.$route.path.indexOf('treasure')!= -1){
                _this.$store.dispatch('actionsFreeCount')
                _this.$store.dispatch('actionsEnergyData');
                _this.$store.dispatch('actionsMycardsData');
              }
               if( _this.$route.path.indexOf('rebate')!= -1){
                  _this.$store.dispatch('getStatus')
              }
            } else {
              let dataOption = {
                masseges: result.message,
                typeLogin: "2"
              };
              _this.$store.commit("isSigninPupopDis", true);
              _this.$store.commit("isSigninPupopDis", dataOption);
            }
          });
        } else {
        }
      }
    },
    loginver() {
      let remenber = this.$refs.rememberMe.checked ? "1" : "0";
      let Rpassword = /^[a-zA-Z0-9]{6,14}$/; //6-14密码数字加字母的正则
      let RemailPhone = /(1[345789]\d{9}$)|(^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$)/i; //邮箱和手机号码正则

      if (this.loginForm.username == "") {
        this.items.loginnameShow = true;
        this.$refs.loginnameError.innerHTML = "手机号/邮箱不能为空";
        this.$refs.userName.classList.add("bd-error");
        return;
      }
      if (this.loginForm.password == "") {
        this.items.loginpasswordShow = true;
        this.$refs.loginpasswordError.innerHTML = "登录密码不能为空";
        this.$refs.passwordInputs.classList.add("bd-error");
        return;
      }
      if (!RemailPhone.test(this.loginForm.username)) {
        this.items.loginnameShow = true;
        this.$refs.loginnameError.innerHTML = "手机号/邮箱格式有误，请重新输入";
        this.$refs.userName.classList.add("bd-error");
        return;
      } else {
        this.items.loginnameShow = false;
        this.$refs.loginnameError.innerHTML = "";
        if (this.$refs.userName.classList.contains("bd-error") == true) {
          this.$refs.userName.classList.remove("bd-error");
        }
      }
      if (!Rpassword.test(this.loginForm.password)) {
        this.items.loginpasswordShow = true;
        this.$refs.loginpasswordError.innerHTML = "密码必须是6-14位字母及数字";
        this.$refs.passwordInput.classList.add("bd-error");
        return;
      } else {
        this.items.loginpasswordShow = true;
        this.$refs.loginpasswordError.innerHTML = "";
        if (this.$refs.passwordInput.classList.contains("bd-error") == true) {
          this.$refs.passwordInput.classList.remove("bd-error");
        }
      }

    },
    logindis(chan) {
      let remenber = this.$refs.rememberMe.checked ? "1" : "0";
      var params = {
        username: this.loginForm.username,
        password: this.loginForm.password,
        remember_me: remenber,
        challenge:chan
        // 'remember_me':'0',
      };
      console.log("登录的参数", params);
      var self = this;
      self.$store.dispatch("login", params).then(function(response) {
        self.$store.commit("istestBooleam", false);
        console.log(response,'妖精快现身')
        if (response.data.code == 0) {
          self.$emit("close");
          // self.$store.commit("userInfo");
          // self.$store.dispatch("userInfo");
          // self.$store.dispatch("runninglistdis");
          if (self.$route.query.id) {
            let datas = {
              guess_id: self.$route.query.id
            };
            self.$store.dispatch("caimy_list", datas);
            self.$store.dispatch("skins_list", datas);
            self.$store.dispatch("skinsmy_list", datas);
            // self.$store.state.match.loginPupop = false;
          }
           if(self.$route.path.indexOf('rebate')!= -1){
            self.$store.dispatch('getStatus')
          }

          if(self.$route.path.indexOf('home')!= -1 || self.$route.path.indexOf('guess')!= -1){
            self.$store.dispatch('checkinprogessdispatch');
          }
          if(self.$route.path.indexOf('turntable')> -1){
            self.$store.commit('mutationRecordTabsType',2)
            self.$store.dispatch('actionUserNowChips')
            // 我的背包
            self.$store.dispatch('actionMybagdata')
            self.$store.dispatch('actionJoinRecord')
          }
          if(self.$route.path.indexOf('treasure')!= -1){
            self.$store.dispatch('actionsFreeCount')
            self.$store.dispatch('actionsEnergyData');
            self.$store.dispatch('actionsMycardsData');
          }
          if(self.$route.path.indexOf('freeturn')!= -1){
            self.$store.dispatch('freeturnself',{type:self.getFreeturntype})
          }

          if(self.$route.path.indexOf('/compete/')!=-1||self.$route.path.indexOf('/guess/')!=-1){
            self.$store.commit('mutationMyguessData',null);
            self.$store.commit('mutationMyguessPage',1);
            let params={
                status:'wait',
                result_status:'all',
                page:1,
                size:3,
            }
            self.$store.dispatch('actionMycaiData',params);
            self.$store.dispatch('actionMybagValue');
            self.$store.dispatch('actionSignData');
          }
          self.$store.commit("istestBooleam", false);
          if (self.$route.path == "/newsdetail") {
            window.location.href = window.location.href;
          }
        } else if (response.data.code == 41005) {
          let params = response.data.data.credentials,
            phonenum,
            phoneText;
          self.$store.state.match.uptimeTrue = true;
          self.$store.state.match.timeUp = null;
          if (params.mobile) {
            phonenum = params.mobile;
            phoneText = "手机号：";
          } else {
            phonenum = params.email;
            phoneText = "邮箱：";
          }
          self.$store.commit("isInequalityShowDis", {
            show: true,
            text: phoneText,
            phoneTell: phonenum,
            username: self.loginForm.username,
            password: self.loginForm.password,
            remember_me: remenber,
            // remember_me:'0',
            typeLogin: "2",
            challenge:chan
          });
        } else {
          let dataOption = {
            masseges: response.data.message,
            typeLogin: "2"
          };
          self.$store.commit("isSigninPupopDis", true);
          self.$store.commit("isSigninPupopDis", dataOption);
        }
      });
    },
  },
  mounted() {
    this.items.loginnameShow = false;
    if (this.$refs.userName.classList.contains("bd-error") == true) {
      this.$refs.userName.classList.remove("bd-error");
    }
    (document.getElementsByTagName("body")[0].onkeyup = function(event) {
      if (event.keyCode == 13) {
        if (_thiser.istestBooleam == true && _thiser.activeLogin == true) {
          // _thiser.doLogin();
        } else if (
          _thiser.istestBooleam == true &&
          _thiser.activeRegister == true
        ) {
          // _thiser.doRegiter();
        }
      }
    }),
      // login deepknow
      initSense(
        {
          id: "8544de89de785ffd903af4ae58ea11d4",
          onError: err => {
            console.warn("initsense warn:", err);
            let dataOption ={
              'masseges':'非常抱歉，你操作过于频繁，请稍后再试！',
              'type':'2',
            }
            this.$store.commit('isSigninPupopDis',true);
            this.$store.commit('isSigninPupopDis',dataOption);
          }
        },
        sense => {
          document.getElementById("loginnow").addEventListener("click",()=>{
            // $("#loginnow").click(() => {
            let remenber = this.$refs.rememberMe.checked ? "1" : "0";
            let Rpassword = /^[a-zA-Z0-9]{6,14}$/; //6-14密码数字加字母的正则
            let RemailPhone = /(1[345789]\d{9}$)|(^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$)/i; //邮箱和手机号码正则
            // let RemailPhone = /^1(3|4|5|7|8)\d{9}$/;

            if (this.loginForm.username == "") {
              this.items.loginnameShow = true;
              this.$refs.loginnameError.innerHTML = "手机号/邮箱不能为空";
              this.$refs.userName.classList.add("bd-error");
              return;
            }
            if (this.loginForm.password == "") {
              this.items.loginpasswordShow = true;
              this.$refs.loginpasswordError.innerHTML = "登录密码不能为空";
              this.$refs.passwordInputs.classList.add("bd-error");
              return;
            }
            if (!RemailPhone.test(this.loginForm.username)) {
              this.items.loginnameShow = true;
              this.$refs.loginnameError.innerHTML =
                "手机号/邮箱格式有误，请重新输入";
              this.$refs.userName.classList.add("bd-error");
              return;
            } else {
              this.items.loginnameShow = false;
              this.$refs.loginnameError.innerHTML = "";
              if (this.$refs.userName.classList.contains("bd-error") == true) {
                this.$refs.userName.classList.remove("bd-error");
              }
            }
            if (!Rpassword.test(this.loginForm.password)) {
              this.items.loginpasswordShow = true;
              this.$refs.loginpasswordError.innerHTML =
                "密码必须是6-14位字母及数字";
              this.$refs.passwordInput.classList.add("bd-error");
              return;
            } else {
              this.items.loginpasswordShow = true;
              this.$refs.loginpasswordError.innerHTML = "";
              if (
                this.$refs.passwordInput.classList.contains("bd-error") == true
              ) {
                this.$refs.passwordInput.classList.remove("bd-error");
              }
            }
            if (this.$store.state.home.isnoregister) {
              this.items.loginnameShow = true;
              this.$refs.loginnameError.innerHTML = "您当前还没有注册哦";
              this.$refs.userName.classList.add("bd-error");
              return;
            } else {
              this.items.loginnameShow = false;
              this.$refs.loginnameError.innerHTML = "";
              if (this.$refs.userName.classList.contains("bd-error") == true) {
                this.$refs.userName.classList.remove("bd-error");
              }
            }
            if (
              this.loginForm.username &&
              this.loginForm.password &&
              RemailPhone.test(this.loginForm.username) &&
              Rpassword.test(this.loginForm.password) &&
              !this.$store.state.home.isnoregister
            ) {
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
                username: this.loginForm.username,
                sceneId: 2,
                sourceType: "web"
              };
              Http.post("geetest/gtVerify", deepKnowParams)
                .then(res => {
                  console.log(res, "deepknow");
                  if(res.data.code==0){
                    if(res.data.data.isWarning==0){
                      this.logindis(challenge);
                    }else{
                      let dataOption ={
                        'masseges':'非常抱歉，你操作过于频繁，请稍后再试！',
                        'type':'2',
                      }
                      this.$store.commit('isSigninPupopDis',true);
                      this.$store.commit('isSigninPupopDis',dataOption);
                    }
                  }else{
                    let dataOption ={
                      'masseges':res.data.message,
                      'type':'2',
                    }
                    this.$store.commit('isSigninPupopDis',true);
                    this.$store.commit('isSigninPupopDis',dataOption);
                  }
                })
                .catch(Http.onError);
              // this.logindis(challenge);
            })
            .onClose(() => {
              // alert("请先完成验证");
              console.log('用户关闭了验证');
            })
            .onError(err => {
              console.warn("验证出错,稍后再试");
              sense.reset();
            });
        }
      );
      // register deepknow
      initSense(
        {
          id: "8544de89de785ffd903af4ae58ea11d4",
          onError: err => {
            console.log("gt error", err);
            let dataOption ={
              'masseges':'非常抱歉，你操作过于频繁，请稍后再试！',
              'type':'2',
            }
            this.$store.commit('isSigninPupopDis',true);
            this.$store.commit('isSigninPupopDis',dataOption);
          }
        },
        sense => {
          document.getElementById("getVerity").addEventListener("click",()=>{
           // $("#getVerity").click(() => {
            let _this = this,
              datas;
            let Name = _this.$refs.namePhone.value;
            let passwords = _this.$refs.passwordInput.value;
            let surepasswords = _this.$refs.surePasswords.value;
            let inputVerity = _this.$refs.inputVerity.value;
            let agreenXy = _this.$refs.agreenXy.checked;
            let RemailPhone = /^1(3|4|5|7|8)\d{9}$/;
            if (agreenXy != "") {
            } else {
              _this.items.agreenShow = true;
              _this.$refs.agreenError.innerHTML = "注册条款必须同意才能注册";
            }
            if (Name === "" ) {
              _this.items.nameShow = true;
              _this.$refs.nameError.innerHTML = "手机号不能为空";
              _this.$refs.namePhone.classList.add("bd-error");
            }
            if (passwords === "") {
              _this.items.passwordShow = true;
              _this.$refs.passwordError.innerHTML = "登录密码不能为空";
              _this.$refs.passwordInput.classList.add("bd-error");
            }
            if (surepasswords === "") {
              _this.items.sureShow = true;
              _this.$refs.sureError.innerHTML = "确认密码不能为空";
              _this.$refs.surePasswords.classList.add("bd-error");
            }
            if (agreenXy && Name && passwords && surepasswords && RemailPhone.test(Name)) {
              sense.sense();
            }
          });
          sense
            .setInfos(() => {
              return {
                interactive: 1
              };
            })
            .onSuccess(data => {
              let challenge = data.challenge;
              this.$store.commit("challenge_muta", challenge);
              let deepKnowParams = {
                  challenge,
                  username: this.$refs.namePhone.value,
                  sceneId: 1,
                  sourceType: "web"
                };
                Http.post("geetest/gtVerify", deepKnowParams)
                  .then(res => {
                    console.log(res, "deepknow");
                    if(res.data.code==0){
                      if(res.data.data.isWarning==0){
                        this.sendVerity();
                      }else{
                        let dataOption ={
                          'masseges':'非常抱歉，你操作过于频繁，请稍后再试！',
                          'type':'2',
                        }
                        this.$store.commit('isSigninPupopDis',true);
                        this.$store.commit('isSigninPupopDis',dataOption);
                      }
                    }
                  })
                  .catch(Http.onError);
              // this.sendVerity();
            })
            .onClose(() => {
              // alert("请先完成验证");
              console.log('用户关闭了验证');
            })
            .onError(err => {
              console.warn("验证出错,稍后再试");
              sense.reset();
            });
        }
      );
  },
  updated() {
    this.pathUrl=this.urlencode(this.$route.query=="{}"?this.$route.path:this.$route.path+'?'+Qs.stringify(this.$route.query));
    let _thiser = this;
    if (this.istestBooleam == false) {
      this.items.nameShow = false;
      this.items.passwordShow = false;
      this.items.sureShow = false;
      this.items.agreenShow = false;
      this.items.codeShow = false;
      this.items.loginnameShow = false;
      this.items.loginpasswordShow = false;

      if (this.$refs.namePhone.classList.contains("bd-error") == true) {
        this.$refs.namePhone.classList.remove("bd-error");
      }
      if (this.$refs.passwordInput.classList.contains("bd-error") == true) {
        this.$refs.passwordInput.classList.remove("bd-error");
      }
      if (this.$refs.passwordInputs.classList.contains("bd-error") == true) {
        this.$refs.passwordInputs.classList.remove("bd-error");
      }
      if (this.$refs.surePasswords.classList.contains("bd-error") == true) {
        this.$refs.surePasswords.classList.remove("bd-error");
      }
      if (this.$refs.inputVerity.classList.contains("bd-error") == true) {
        this.$refs.inputVerity.classList.remove("bd-error");
      }
      if (this.$refs.userName.classList.contains("bd-error") == true) {
        this.$refs.userName.classList.remove("bd-error");
      }
    }
    document.getElementsByTagName("body")[0].onkeyup = function(event) {
      if (event.keyCode == 13) {
        if (_thiser.istestBooleam == true && _thiser.activeLogin == true) {
          // _thiser.doLogin();
        } else if (
          _thiser.istestBooleam == true &&
          _thiser.activeRegister == true
        ) {
          // _thiser.doRegiter();
        }
      }
    };
  },
  computed: {
    autoHeight() {
      return this.height;
    },
    isloginBooleam: function() {
      return this.$store.state.match.loginBooleam;
    },
    istestBooleam: function() {
      return this.$store.state.user.testTrue;
    },
    getFreeturntype:function(){
      return this.$store.state.shop.gametype
    },
  },
};
</script>

<style scoped lang="scss">
input:-webkit-autofill {
  -webkit-box-shadow: 0 0 0 1000px #15161a inset;
  -webkit-text-fill-color: #989898;
  width: 384px !important;
}
input:-webkit-autofill:focus {
  border-color: #989898;
}

.loginInput {
  display: block;
  width: 384px !important;
  background: #15161a;
  border: #535353 1px solid;
  height: 42px !important;
  line-height: 42px !important;
  outline: 0;
  text-indent: 35px;
  color: #989898;
}
.loginInput:focus {
  border-color: #dcdcdc;
}
.login-nav.active,
.register-nav.active {
  background: url("../../assets/images/LoginImage/login-nav.png") no-repeat;
  border: none !important;
  height: 48px;
}
.error_text {
  display: block;
  background: url("../../assets/images/competeImg/icon_ts.png") no-repeat left
    center;
  cursor: default;
  height: 26px;
  position: absolute;
  bottom: 0;
  left: 0; /*min-width:100px;*/
  font-size: 12px;
  text-indent: 20px;
  line-height: 26px;
  color: #c02d3b;
}
.popup-box-content {
  .box-nav {
    width: 100%;
    font-size: 18px;
    text-align: center;
    color: #fff;
    background: #1e2024;
    position: relative;
    text-shadow: 1px 1px 2px #6f491e;
    clear: both;
    .register-nav {
      width: 50%;
      min-height: 42px;
      line-height: 42px;
      text-align: center;
      border: 1px solid #808081;
      border-left: none;
      cursor: pointer;
    }
    .login-nav {
      width: 50%;
      min-height: 42px;
      line-height: 42px;
      text-align: center;
      border: 1px solid #808081;
      border-right: none;
      cursor: pointer;
    }
  }
  .box-text {
    .box-text-title {
      font-size: 14px;
      color: #989898;
      display: inline-block;
      margin: 30px 0 13px;
      display: block;
    }
    .box-user {
      position: relative;
      top: 0;
      left: 0;
      height: 74px;
      .userIcon {
        position: absolute;
        left: 10px;
        top: 50%;
        margin-top: -20px;
      }
      .errUserName {
        width: 386px;
        height: 25px;
        line-height: 25px;
        color: #c02d3b;
        text-align: left;
        font-size: 12px;
        display: inline-block;
        .err-icon {
          margin-left: 12px;
          vertical-align: middle;
        }
      }
    }
    .box-pass {
      position: relative;
      height: 74px;
      top: 0;
      left: 0;
      .passIcon {
        position: absolute;
        left: 10px;
        top: 50%;
        margin-top: -20px;
      }
      .errPassWord {
        width: 100%;
        height: 25px;
        line-height: 25px;
        color: #c02d3b;
        text-align: left;
        font-size: 12px;
        display: inline-block;
        margin-bottom: 29px;
        .err-icon {
          margin-left: 12px;
          vertical-align: middle;
        }
      }
    }
    .icheckbox {
      width: 100%;
      font-size: 14px;
      color: #d9a35a;
      height: 24px;
      .forgot-pass {
        cursor: pointer;
        color: #d9a35a;
      }
      #autoLogin {
        vertical-align: -2px;
        outline: none;
      }
    }
    .login-btn {
      width: 100%;
      height: 50px;
      line-height: 50px;
      text-align: center;
      text-shadow: 1px 1px 2px #7e6028;
      background: url("../../assets/images/LoginImage/login-btn.png") no-repeat;
      margin-top: 10px;
      cursor: pointer;
      color: #fff;
      font-size: 18px;
    }
    .login-btn:hover {
      background: url("../../assets/images/LoginImage/login-btnh.png") no-repeat;
    }
    .login-else {
      padding: 44px 40px 0;
      .else-login {
        // width: 100px;
        width: 77px;
        span:last-child {
          display: block;
          padding-top: 8px;
        }
        a {
          width: 56px;
          font-size: 14px;
          color: #707172;
          margin: 0 auto;

          .loginQQ {
            background: url("../../assets/images/LoginImage/login-qq.png")
              no-repeat;
            display: inline-block;
            width: 40px;
            height: 40px;
          }
          .loginWeChat {
            background: url("../../assets/images/LoginImage/login-weixin.png")
              no-repeat;
            display: inline-block;
            width: 40px;
            height: 40px;
          }
          .loginWeibo {
            background: url("../../assets/images/LoginImage/login-weibo.png")
              no-repeat;
            display: inline-block;
            width: 40px;
            height: 40px;
          }
          .loginZhanqi {
							background: url('../../assets/images/LoginImage/login-zq.png')no-repeat;
							display: inline-block;
							width: 40px;
							height: 40px;
						}
          &:hover .loginQQ {
            background: url("../../assets/images/LoginImage/login-qqh.png")
              no-repeat;
            transition: all 0.5s;
          }
          &:hover .loginWeChat {
            background: url("../../assets/images/LoginImage/login-weixinh.png")
              no-repeat;
            transition: all 0.5s;
          }
          &:hover .loginWeibo {
            background: url("../../assets/images/LoginImage/login-weiboh.png")
              no-repeat;
            transition: all 0.5s;
          }
          &:hover .loginZhanqi {
              background: url('../../assets/images/LoginImage/login-zqh.png')no-repeat;
              transition: all .5s;
            }
          &:hover {
            color: #dcdcdc;
          }
        }
      }
    }
  }
}
/*注册样式*/
.register-down {
  padding-top: 26px;
  li {
    height: 70px;
    position: relative;
    top: 0;
    left: 0;
    text-align: left;
    input {
      outline: none;
      color: #989898;
      padding: 0 !important;
    }

    .regiter-input {
      display: block;
      width: 384px !important;
      background: #15161a;
      border: #535353 1px solid;
      height: 42px !important;
      line-height: 42px !important;
      outline: 0;
      text-indent: 15px;
      color: #989898;
      &:focus {
        border-color: #989898;
      }
    }
    #captcha {
      background: #15161a;
      // border:#535353 1px solid;
      width: 386px;
      height: 42px;
      line-height: 30px;
      font-size: 14px;
      color: #dcdcdc;
      text-align: center;
    }
    .regiter-input-verity {
      width: 210px !important;
      float: left;
      background: #15161a;
      &:focus {
        border-color: #989898;
      }
      &.bd-error {
        border-color: #c02d3b;
      }
    }
    #getVerity {
      float: right;
      width: 136px;
      height: 44px;
      line-height: 44px;
      display: block;
      background: #847a68;
      border: 0;
      color: #fefefe;
      font-size: 16px;
      text-align: center;
      cursor: pointer;
    }
    span {
      display: block;
      background: url("../../assets/images/competeImg/icon_ts.png") no-repeat
        left center;
      cursor: default;
      height: 26px;
      position: absolute;
      bottom: 0;
      left: 0; /*min-width:100px;*/
      font-size: 12px;
      text-indent: 20px;
      line-height: 26px;
      color: #c02d3b;
    }
    label {
      text-align: left;
      line-height: 30px;
      font-size: 14px;
      color: #989898;
      > input {
        width: 14px;
        height: 14px;
        display: block;
        float: left;
        border: #595b5d 1px solid;
        background: none;
        margin-right: 10px;
        margin-top: 8px;
      }
      > i {
        color: #ffd35e;
        cursor: pointer;
      }
    }
    &:nth-child(5) {
      height: 50px;
    }
    .regiter-button {
      -webkit-transition: all 0.5s;
      margin: 0 auto;
      height: 48px;
      line-height: 48px;
      text-align: center;
      font-size: 18px;
      color: #fff;
      display: block;
      cursor: pointer;
      background: url("../../assets/images/LoginImage/login-btn.png") no-repeat;
      border: 0;
      width: 100%;
      text-shadow: 1px 1px 2px #7e6028;
      &:hover {
        background: url("../../assets/images/LoginImage/login-btnh.png")
          no-repeat;
      }
    }
  }
}
.bd-error {
  border-color: #c02d3b !important;
}
</style>
