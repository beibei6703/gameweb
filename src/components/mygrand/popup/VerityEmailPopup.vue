<template>
  <div id="userinfo" v-if="getisShowVerityEmail">
    <div class="userinfo-bg" @click="closemodifyPopup()"></div>
    <div class="modify_bg modify_bg_verity">
      <i class="modify_close" @click="closemodifyPopup()"></i>
      <div class="modify-seat"><span class="cl-yellow1">邮箱绑定</span></div>
      <div class="modify_down">
        <div class="modify_dn-list">
          <div class="modify_same">
            <div class="modify_same_text fl">确认邮箱：</div>
            <div class="modify_same_right relative fl" :data-phone="oldEmail">
              <input type="text" class="modify_same_input modify_same_newphone fl" v-show="items.isShowPhone" v-model="items.newEmails" readonly="readonly" ref="newPhonese"/>
              <input type="text" class="modify_same_input modify_same_newphone fl" v-show="items.isShowPhoneedit" @blur="newEmail" @focus="addNew" ref="newPhones" v-model="items.newEmails"/>
              <input type="button" class="modify_same_modify" ref="modifyEmail" @click="modifyEmail" data-name="1" value="修改"/>
              <span class="Error" ref="oldError" v-show="items.newEmailShow"></span>
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
              <input type="text" class="modify_same_input modify_same_verity fl" ref="newPassword" value="" @focus="addverity" @blur="newPassword"/>
              <input type="button" class="modify_same_bottom" ref="getVerity" @click="sendVerity" data-name="1" value="获取验证码"/>
              <span class="Error" ref="newError" v-show="items.newPasswordShow"></span>
            </div>
            <div class="clear"></div>
          </div>
          <div class="modify_same">
            <div class="modify_same_text fl"></div>
            <div class="modify_same_right relative fl">
              <button class="modify_save fl" @click="doSave">保存</button>
              <a href="javascript:;" @click="returnPrev" class="modify_save fr">返回</a>
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
          newEmailShow:false,
          newPasswordShow:false,
          sureShow:false,
          newEmails:null,
          isShowPhone:true,
          isShowPhoneedit:false,
          pswShow:false,
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
        this.$store.commit('mutationsisShowVerityEmail',false)
      },
      returnPrev(){
        this.$store.commit('mutationsisShowModifyEmail',true)
        this.$store.commit('mutationsisShowVerityEmail',false)
      },
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
        let newEmail=_this.items.newEmails;
        let newPassword=_this.$refs.newPassword.value;
        let pws = _this.$refs.psw.value;
        if(newEmail==='') {
          _this.items.newEmailShow =true;
          _this.$refs.newPhonese.classList.add('error');
          _this.$refs.oldError.innerHTML = '邮箱不能为空'
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
        if(newEmail!=''&&newPassword!=''  && pws){
          if(_this.items.newEmailShow==false){
            let datas={
              email:newEmail,
              code:newPassword,
              password:pws,
            }

            Http.post('/updateEmail',datas).then(function(data){
              let result =data.data;
              if(result.code==0){
                let dataOption ={
                  'masseges':'修改成功',
                  'typesucceed':'1',
                }
                _this.$store.commit('isSigninPupopDis',true);
                _this.$store.commit('isSigninPupopDis',dataOption);
                _this.$store.commit('oldEmailMutation',null);
                _this.$store.dispatch('userInfo')
                _this.$store.commit('mutationsisShowVerityEmail',false)
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
      modifyEmail:function(){
        if(this.$refs.modifyEmail.getAttribute('data-name')=='1'){
          this.items.isShowPhone=!this.items.isShowPhone;
          this.items.isShowPhoneedit=!this.items.isShowPhoneedit;
          this.$refs.newPhones.classList.add('active');
          setTimeout(()=>{
            this.$refs.newPhones.focus()
          },100)
          this.$refs.newPhones.focus()
          this.$refs.modifyEmail.setAttribute('data-name','2')
        }else{
          this.$refs.newPhones.classList.remove('active');
          this.items.isShowPhone=!this.items.isShowPhone;
          this.items.isShowPhoneedit=!this.items.isShowPhoneedit;
          this.$refs.modifyEmail.classList.remove('active');

          this.$refs.modifyEmail.setAttribute('data-name','1')
        }


      },
      newEmail:function(){
        let _this=this;
        let reg = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;//邮箱正则
        let Newphone= _this.items.newEmails;
        if (_this.$refs.newPhones.classList.contains('active') == true) {
          _this.$refs.newPhones.classList.remove('active');
          this.items.isShowPhone=!this.items.isShowPhone;
          this.items.isShowPhoneedit=!this.items.isShowPhoneedit;
          this.$refs.modifyEmail.classList.remove('active');

          this.$refs.modifyEmail.setAttribute('data-name','1')
        }
        if (Newphone !== '') {
          if (!reg.test(Newphone)) {
            _this.items.newEmailShow = true;
            _this.$refs.newPhones.classList.add('error');
            _this.$refs.oldError.innerHTML = '邮箱格式有误，请重新输入'
          } else {
            _this.items.newEmailShow = false;
            _this.$refs.oldError.innerHTML = ''
            if (_this.$refs.newPhones.classList.contains('error') == true) {
              _this.$refs.newPhones.classList.remove('error');
            }
          }
        } else {
          _this.items.newEmailShow = true;
          _this.$refs.newPhones.classList.add('error');
          _this.$refs.oldError.innerHTML = '邮箱不能为空'
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
        let RemailPhone = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;//邮箱正则
        let TemailPhone =this.items.newEmails,_this=this;//手机值
        let pws = _this.$refs.psw.value;
        let Rpassword = /^[a-zA-Z0-9]{6,14}$/; //6-14密码数字加字母的正则
        let j=60,timer=null,params;
        let _box =_this.$refs.getVerity;
        let _dataName=_box.getAttribute('data-name');
        if(RemailPhone.test(TemailPhone) && Rpassword.test(pws)){
          if(_this.items.newEmailShow==false){
            _this.items.newEmailShow=false;
            _this.$refs.oldError.innerHTML='';
            if(_dataName==1){
              params={
                email:TemailPhone,
                template:'bind',
              }
              console.log(params,'verity 邮箱');
              Http.post('/email',params).then(function(response){
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
          _this.$refs.oldError.innerHTML='邮箱/密码格式有误，请重新输入';
          _this.items.pswShow = true;
          _this.$refs.oldPsw.innerHTML = "邮箱/密码格式有误d，请重新输入";
        }
      },

    },

    created(){


    },
    components:{
    },
    computed:{
      getisShowVerityEmail(){
        return this.$store.state.modifymessage.isShowVerityEmail;
      },
      getUserInfo() {
        return this.$store.state.user.userInfo;
      },
      oldEmail(){
        this.items.newEmails =  this.$store.state.garden.oldEmail || null;
        return this.$store.state.garden.oldEmail || null;
      }
    }
  }
</script>
<style lang="scss" scoped src="@/assets/css/modifyPopup.css"></style>
