<template>
  <div id="userinfo" v-if="getisShowModifyPassword">
    <div class="userinfo-bg" @click="closemodifyPopup()"></div>
    <div class="modify_bg modify_bg_password">
      <i class="modify_close" @click="closemodifyPopup()"></i>
      <div class="modify-seat"><span class="cl-yellow1">密码修改</span></div>
      <div class="modify_down">
        <div class="modify_dn-list">
          <div class="modify_same">
            <div class="modify_same_text fl">旧密码：</div>
            <div class="modify_same_right relative fl">
              <input type="password" ref="oldPassword" class="modify_same_input modify_same_pass" value="" @focus="addOld" @blur="oldPassword"/>
              <em class="icon_eye" @click="seePassword($event)" data-name="1"></em>
              <span class="Error" ref="oldError" v-show="items.oldPasswordShow"></span>
              <i @click="forgetPassword">忘记密码?</i>
            </div>
            <div class="clear"></div>
          </div>
          <div class="modify_same">
            <div class="modify_same_text fl">新密码：</div>
            <div class="modify_same_right relative fl">
              <input type="password" class="modify_same_input modify_same_pass" ref="newPassword" value="" @focus="addNew" @blur="newPassword"/>
              <em class="icon_eye" @click="seePassword($event)" data-name="1"></em>
              <span class="Error" ref="newError" v-show="items.newPasswordShow"></span>
            </div>
            <div class="clear"></div>
          </div>
          <div class="modify_same">
            <div class="modify_same_text fl">确认密码：</div>
            <div class="modify_same_right relative fl">
              <input type="password" class="modify_same_input modify_same_pass" ref="surePassword" value="" @focus="addSure" @blur="surePassword"/>
              <em class="icon_eye" @click="seePassword($event)" data-name="1"></em>
              <span class="Error" ref="sureError" v-show="items.sureShow"></span>
            </div>
            <div class="clear"></div>
          </div>
          <div class="modify_same">
            <div class="modify_same_text fl"></div>
            <div class="modify_same_right relative fl">
              <button class="modify_save fl" @click="doSave">保存</button>
              <a href="javascript:;" class="modify_save fr" @click="closemodifyPopup">取消</a>
              <div class="clear"></div>
            </div>
            <div class="clear"></div>
          </div>
        </div>
        <div class="modify_prompt">
          <h1>温馨提示：</h1>
          <p>为了保护您账号安全，请不要将丰收网密码设为与其他网站（如：论坛、邮箱、聊天工具等）相同的密码。</p>

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
          oldPasswordShow:false,
          newPasswordShow:false,
          sureShow:false,
        }
      }
    },
    methods:{
      closemodifyPopup(){
        this.$store.commit('mutationsisShowModifyPassword',false)
      },
      //忘记密码
      forgetPassword:function(){
        this.$store.commit('showForget',true)

      },
      //显示隐藏密码
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
      doSave:function(){
        let _this=this;
        let oldPassword=_this.$refs.oldPassword.value;
        let newPassword=_this.$refs.newPassword.value;
        let surePassword=_this.$refs.surePassword.value;
        if(oldPassword==='') {
          _this.items.oldPasswordShow =true;
          _this.$refs.oldPassword.classList.add('error');
          _this.$refs.oldError.innerHTML = '旧密码不能为空'
        }
        if(newPassword==='') {
          _this.items.newPasswordShow =true;
          _this.$refs.newPassword.classList.add('error');
          _this.$refs.newError.innerHTML = '新密码不能为空'
        }
        if(surePassword==='') {
          _this.items.sureShow = true;
          _this.$refs.surePassword.classList.add('error');
          _this.$refs.sureError.innerHTML = '确认密码不能为空'
        }
        if(oldPassword!=''&&newPassword!=''&&surePassword!=''){

          if(_this.items.oldPasswordShow==false&&_this.items.newPasswordShow==false){
            if(surePassword==newPassword){
                if(newPassword==oldPassword){
                  let dataOption ={
                    'masseges':'新旧密码不能相同',
                  }
                  _this.$store.commit('isSigninPupopDis',true);
                  _this.$store.commit('isSigninPupopDis',dataOption);
                  return;

                }
              let datas={
                old_password:oldPassword,
                new_password:newPassword,
                re_password:surePassword,
              }

              Http.post('/updatePassword',datas).then(function(data){
                let result =data.data;
                if(result.code!=0){
                  let dataOption ={
                    'masseges':result.message,
                    'type':'1',
                  }
                  _this.$store.commit('isSigninPupopDis',true);
                  _this.$store.commit('isSigninPupopDis',dataOption);
                }else{
                  let dataOption ={
                    'masseges':'密码修改成功',
                    'typesucceed':'2',
                  }
                  _this.$store.commit('isSigninPupopDis',true);
                  _this.$store.commit('isSigninPupopDis',dataOption);
                  _this.$store.commit('mutationsisShowModifyPassword',false)
                }

              })

            }else{
              _this.items.sureShow =true;
              _this.$refs.surePassword.classList.add('error');
              _this.$refs.sureError.innerHTML = '两次密码输入不一致，请重新输入'
            }

          }
        }
      },
      addOld:function(){let _this=this;_this.$refs.oldPassword.classList.add('active');if(_this.$refs.oldPassword.classList.contains('error')==true){_this.$refs.oldPassword.classList.remove('error');};},
      addNew:function(){let _this=this;_this.$refs.newPassword.classList.add('active');if(_this.$refs.newPassword.classList.contains('error')==true){_this.$refs.newPassword.classList.remove('error');};},
      addSure:function(){let _this=this;_this.$refs.surePassword.classList.add('active');if(_this.$refs.surePassword.classList.contains('error')==true){_this.$refs.surePassword.classList.remove('error');}},
      oldPassword:function(){
        let _this=this;
        let reg = /^[a-zA-Z0-9]{6,14}$/;//6-14密码数字/字母的正则
        let password =_this.$refs.oldPassword.value;
        if(_this.$refs.oldPassword.classList.contains('active')==true){
          _this.$refs.oldPassword.classList.remove('active');
        }
        if(password!=='') {
          if (!reg.test(password)) {
            _this.items.oldPasswordShow =true;
            _this.$refs.oldPassword.classList.add('error');
            _this.$refs.oldError.innerHTML = '密码必须是6-14位字母及数字'
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
          _this.$refs.oldError.innerHTML = '旧密码不能为空'
        }
      },
      newPassword:function(){
        let _this=this;
        let surePassword=_this.$refs.surePassword.value;
        if(_this.$refs.newPassword.classList.contains('active')==true){
          _this.$refs.newPassword.classList.remove('active');
        }
        let reg = /^[a-zA-Z0-9]{6,14}$/;//6-14密码数字/字母的正则
        let password =_this.$refs.newPassword.value;
        if(password!=='') {
          if (!reg.test(password)) {
            _this.items.newPasswordShow =true;
            _this.$refs.newPassword.classList.add('error');
            _this.$refs.newError.innerHTML = '密码必须是6-14位字母及数字'
          } else {
            _this.items.newPasswordShow =false;
            _this.$refs.newError.innerHTML = '';
            if(_this.$refs.newPassword.classList.contains('error')==true){
              _this.$refs.newPassword.classList.remove('error');
            }
            if(surePassword){
                if(password!=surePassword){
                  _this.items.sureShow = true;
                  _this.$refs.surePassword.classList.add('error');
                  _this.$refs.sureError.innerHTML = '两次密码输入不一致，请重新输入'

                }else{
                  _this.items.sureShow = false;
                  if(_this.$refs.surePassword.classList.contains('error')==true){
                    _this.$refs.surePassword.classList.remove('error');
                  }
                  _this.$refs.sureError.innerHTML = ''
                }

            }
          }
        }else{
          _this.items.newPasswordShow =true;
          _this.$refs.newPassword.classList.add('error');
          _this.$refs.newError.innerHTML = '新密码不能为空'
        }

      },
      surePassword(){
        let _this=this;
        if(_this.$refs.surePassword.classList.contains('active')==true){
          _this.$refs.surePassword.classList.remove('active');
        }
        let Tpassword =_this.$refs.newPassword.value;//密码值
        let TpasswordSure =_this.$refs.surePassword.value;//密码值
        if(TpasswordSure!=='') {
          if (TpasswordSure !== Tpassword) {
            _this.items.sureShow = true;
            _this.$refs.surePassword.classList.add('error');
            _this.$refs.sureError.innerHTML = '两次密码输入不一致，请重新输入'
          } else {
            _this.items.sureShow = false;
            _this.$refs.sureError.innerHTML = '';
            if(_this.$refs.surePassword.classList.contains('error')==true){
              _this.$refs.surePassword.classList.remove('error');
            }
          }
        }else{
          _this.items.sureShow = true;
          _this.$refs.surePassword.classList.add('error');
          _this.$refs.sureError.innerHTML = '确认密码不能为空'
        }
      },
    },
    mounted () {

    },
    computed:{
      getisShowModifyPassword(){
        return this.$store.state.modifymessage.isShowModifyPassword;
      },
    }
  }
</script>
<style lang="scss" scoped src="@/assets/css/modifyPopup.css"></style>
