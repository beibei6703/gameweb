<template>
  <div id="userinfo" v-if="getisShowUnbindEmail">
    <div class="userinfo-bg" @click="closemodifyPopup()"></div>
    <div class="modify_bg modify_bg_verity">
      <i class="modify_close" @click="closemodifyPopup()"></i>
      <div class="modify-seat"><span class="cl-yellow1">邮箱绑定</span></div>
      <div class="modify_down">
        <div class="modify_dn-list">
          <div class="modify_same">
            <div class="modify_same_text fl">输入邮箱：</div>
            <div class="modify_same_right relative fl">
              <input type="text" ref="inputEmail" class="modify_same_input modify_same_pass" value="" @focus="addOld" @blur="inputEmail"/>
              <span class="Error" ref="oldError" v-show="items.inputEmailShow"></span>
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
              <input type="text" class="modify_same_input modify_same_verity fl" ref="inputVerity" value="" @focus="addNew" @blur="inputVerity"/>
              <input type="button" class="modify_same_bottom" ref="getVerity" @click="sendVerity" data-name="1" value="获取验证码"/>
              <span class="Error" ref="newError" v-show="items.inputVerityShow"></span>
            </div>
            <div class="clear"></div>
          </div>
          <div class="modify_same">
            <div class="modify_same_text fl"></div>
            <div class="modify_same_right relative fl">
              <button class="modify_save fl" @click="doSave">保存</button>
              <a href="javascript:;" @click="closemodifyPopup()" class="modify_save fr">取消</a>
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
          inputEmailShow:false,
          inputVerityShow:false,
          sureShow:false,
          pswShow:false,
        }
      }
    },
    methods:{
      closemodifyPopup(){
        this.$store.commit('mutationsisShowUnbindEmail',false)
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
        let inputEmail=_this.$refs.inputEmail.value;
        let inputVerity=_this.$refs.inputVerity.value;
        let pws = _this.$refs.psw.value;
        if(inputEmail==='') {
          _this.items.inputEmailShow =true;
          _this.$refs.inputEmail.classList.add('error');
          _this.$refs.oldError.innerHTML = '邮箱不能为空'
        }
        if(!pws){
          _this.items.pswShow = true;
          _this.$refs.psw.classList.add("error");
          _this.$refs.oldPsw.innerHTML = "密码不能为空";
        }
        if(inputVerity==='') {
          _this.items.inputVerityShow =true;
          _this.$refs.inputVerity.classList.add('error');
          _this.$refs.newError.innerHTML = '验证码不能为空'
        }
        if(inputEmail!=''&&inputVerity!='' && pws){
          if(_this.items.inputEmailShow==false){
            let datas={
              email:inputEmail,
              code:inputVerity,
              password:pws,
            }
//            return console.log(datas)
            Http.post('/updateEmail',datas).then(function(data){
              let result =data.data;
              if(result.code==0){
                let dataOption ={
                  'masseges':'绑定成功',
                  'typesucceed':'1',
                }
                _this.$store.commit('isSigninPupopDis',true);
                _this.$store.commit('isSigninPupopDis',dataOption);
                _this.$store.commit('mutationsisShowUnbindEmail',false)
//                _this.$router.push('/mygrand/')
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
      addOld:function(){let _this=this;_this.$refs.inputEmail.classList.add('active');if(_this.$refs.inputEmail.classList.contains('error')==true){_this.$refs.inputEmail.classList.remove('error');};},
      addNew:function(){let _this=this;_this.$refs.inputVerity.classList.add('active');if(_this.$refs.inputVerity.classList.contains('error')==true){_this.$refs.inputVerity.classList.remove('error');};},
      inputEmail:function(){
        let _this=this;
        let reg =/^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;//邮箱码正则
        let password =_this.$refs.inputEmail.value;
        if(_this.$refs.inputEmail.classList.contains('active')==true){
          _this.$refs.inputEmail.classList.remove('active');
        }
        if(password!=='') {
          if (!reg.test(password)) {
            _this.items.inputEmailShow =true;
            _this.$refs.inputEmail.classList.add('error');
            _this.$refs.oldError.innerHTML = '邮箱格式有误，请重新输入'
          } else {
            _this.items.inputEmailShow =false;
            _this.$refs.oldError.innerHTML = ''
            if(_this.$refs.inputEmail.classList.contains('error')==true){
              _this.$refs.inputEmail.classList.remove('error');
            }
          }
        }else{
          _this.items.inputEmailShow =true;
          _this.$refs.inputEmail.classList.add('error');
          _this.$refs.oldError.innerHTML = '邮箱不能为空'
        }
      },
      inputVerity:function(){
        let _this=this;
        if(_this.$refs.inputVerity.classList.contains('active')==true){
          _this.$refs.inputVerity.classList.remove('active');
        }
        let password =_this.$refs.inputVerity.value;
        if (password==='') {
          _this.items.inputVerityShow =true;
          _this.$refs.inputVerity.classList.add('error');
          _this.$refs.newError.innerHTML = '验证码不能为空'
        } else {
          _this.items.inputVerityShow =false;
          _this.$refs.newError.innerHTML = '';
          if(_this.$refs.inputVerity.classList.contains('error')==true){
            _this.$refs.inputVerity.classList.remove('error');
          }
        }
      },
      sendVerity(){
        let RemailPhone = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;//邮箱码正则
        let TemailPhone =this.$refs.inputEmail.value,_this=this;//邮箱值
        let pws = _this.$refs.psw.value;
        let Rpassword = /^[a-zA-Z0-9]{6,14}$/; //6-14密码数字加字母的正则
        let j=60,timer=null,params;
        let _box =_this.$refs.getVerity;
        let _dataName=_box.getAttribute('data-name');
        if(!TemailPhone){
          _this.items.inputEmailShow=true;
          _this.$refs.inputEmail.classList.add("error");
          _this.$refs.oldError.innerHTML='请输入邮箱';
        }
        if(!pws){
          _this.items.pswShow = true;
          _this.$refs.psw.classList.add("error");
          _this.$refs.oldPsw.innerHTML = "密码不能为空";
        }
        if(RemailPhone.test(TemailPhone) && Rpassword.test(pws)){
          if(_this.items.inputEmailShow==false){
            _this.items.inputEmailShow=false;
            _this.$refs.oldError.innerHTML='';
            setTimeout(()=>{
              if(_dataName==1){
                params={
                  email:TemailPhone,
                  password:pws,
                  template:'bind',
                }
               console.log(params,'镇镇长')
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
            },100)

          }
        }else{
          _this.items.nameShow=true;
          _this.$refs.oldError.innerHTML='邮箱/密码格式有误，请重新输入';
          _this.items.pswShow = true;
          _this.$refs.oldPsw.innerHTML = "邮箱/密码格式有误，请重新输入";
        }
      },

    },
    mounted () {

    },
    computed:{
      getisShowUnbindEmail(){
        return this.$store.state.modifymessage.isShowUnbindEmail;
      },
      getUserInfo() {
        return this.$store.state.user.userInfo;
      },
    }
  }
</script>
<style lang="scss" scoped src="@/assets/css/modifyPopup.css"></style>
