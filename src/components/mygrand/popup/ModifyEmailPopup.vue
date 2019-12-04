<template>
  <div id="userinfo" v-if="getisShowModifyEmail">
    <div class="userinfo-bg" @click="closemodifyPopup()"></div>
    <div class="modify_bg">
      <i class="modify_close" @click="closemodifyPopup()"></i>
      <div class="modify-seat"><span class="cl-yellow1">邮箱修改</span></div>
      <div class="modify_down">
        <div class="modify_dn-list">
          <div class="modify_same">
            <div class="modify_same_text fl">输入邮箱：</div>
            <div class="modify_same_right relative fl">
              <input type="text" ref="newEmail" class="modify_same_input modify_same_pass" value="" @focus="addnewEmail" @blur="newEmail"/>
              <span class="Error" ref="oldError" v-show="items.newEmailShow"></span>
            </div>
            <div class="clear"></div>
          </div>
          <div class="modify_same">
            <div class="modify_same_text fl">原邮箱：</div>
            <div class="modify_same_right relative fl" ref="uersInfo">{{getUserInfo.email}}</div>
            <div class="clear"></div>
          </div>
          <div class="modify_same">
            <div class="modify_same_text fl">验证码：</div>
            <div class="modify_same_right relative fl">
              <input type="text" class="modify_same_input modify_same_verity fl" ref="oldVerity" value="" @focus="addNew" @blur="oldVerity"/>
              <input type="button" class="modify_same_bottom" ref="getVerity" @click="sendVerity" data-name="1" value="获取验证码"/>
              <span class="Error" ref="newError" v-show="items.oldVerityShow"></span>
            </div>
            <div class="clear"></div>
          </div>
          <div class="modify_same">
            <div class="modify_same_text fl"></div>
            <div class="modify_same_right relative fl">
              <button class="modify_save fl" @click="doSave">下一步</button>
              <a href="javascript:;" @click="closemodifyPopup()"  class="modify_save fr">取消</a>
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
          oldVerityShow:false,
          sureShow:false,
        }
      }
    },
    methods:{
      closemodifyPopup(){
        this.$store.commit('mutationsisShowModifyEmail',false)
      },
      toTwo(n){
        return n<10?n='0'+n:n
      },
      doSave:function(){
        let _this=this;
        let newEmail=_this.$refs.newEmail.value;
        let oldVerity=_this.$refs.oldVerity.value;
        if(newEmail==='') {
          _this.items.newEmailShow =true;
          _this.$refs.newEmail.classList.add('error');
          _this.$refs.oldError.innerHTML = '新邮箱不能为空'
        }
        if(oldVerity==='') {
          _this.items.oldVerityShow =true;
          _this.$refs.oldVerity.classList.add('error');
          _this.$refs.newError.innerHTML = '验证码不能为空'
        }
        if(newEmail!=''&&oldVerity!=''){
          if(_this.items.newEmailShow==false){
            let datas={
              code:oldVerity,
            }
            Http.post('/verifyEmail',datas).then(function(data){
              let result =data.data;
              if(result.code==0){
                // sessionStorage.setItem("newEmail", newEmail);
                // _this.$router.push('../mygrand/verityemail');
                _this.$store.commit('mutationsisShowVerityEmail',true)
                _this.$store.commit('mutationsisShowModifyEmail',false)

                _this.$store.commit('oldEmailMutation',newEmail);
              }else{
                let dataOption ={
                  'masseges':result.message,
                }
                _this.$store.commit('isSigninPupopDis',true);
                _this.$store.commit('isSigninPupopDis',dataOption);
              }
            })
          }
        }
      },
      addnewEmail:function(){let _this=this;_this.$refs.newEmail.classList.add('active');if(_this.$refs.newEmail.classList.contains('error')==true){_this.$refs.newEmail.classList.remove('error');};},
      addNew:function(){let _this=this;_this.$refs.oldVerity.classList.add('active');if(_this.$refs.oldVerity.classList.contains('error')==true){_this.$refs.oldVerity.classList.remove('error');};},
      newEmail:function(){
        let _this=this;
        let reg =/^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;//邮箱码正则
        let password =_this.$refs.newEmail.value;
        if(_this.$refs.newEmail.classList.contains('active')==true){
          _this.$refs.newEmail.classList.remove('active');
        }
        if(password!=='') {
          if (!reg.test(password)) {
            _this.items.newEmailShow =true;
            _this.$refs.newEmail.classList.add('error');
            _this.$refs.oldError.innerHTML = '邮箱格式有误，请重新输入'
          } else {
            _this.items.newEmailShow =false;
            _this.$refs.oldError.innerHTML = ''
            if(_this.$refs.newEmail.classList.contains('error')==true){
              _this.$refs.newEmail.classList.remove('error');
            }
          }
        }else{
          _this.items.newEmailShow =true;
          _this.$refs.newEmail.classList.add('error');
          _this.$refs.oldError.innerHTML = '邮箱不能为空'
        }
      },
      oldVerity:function(){
        let _this=this;
        if(_this.$refs.oldVerity.classList.contains('active')==true){
          _this.$refs.oldVerity.classList.remove('active');
        }
        let password =_this.$refs.oldVerity.value;
        if (password==='') {
          _this.items.oldVerityShow =true;
          _this.$refs.oldVerity.classList.add('error');
          _this.$refs.newError.innerHTML = '验证码不能为空'
        } else {
          _this.items.oldVerityShow =false;
          _this.$refs.newError.innerHTML = '';
          if(_this.$refs.oldVerity.classList.contains('error')==true){
            _this.$refs.oldVerity.classList.remove('error');
          }
        }
      },
      sendVerity(){
        let _this=this;//邮箱值
        let j=60,timer=null,params;
        let _box =_this.$refs.getVerity;
        let _dataName=_box.getAttribute('data-name');
        let email = this.$refs.newEmail.value;
        if(_dataName==1){
          params={
            template:'verify',
            email,
          }
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
      },

    },
    mounted () {
      let _this=this;

    },
    computed:{
      getisShowModifyEmail(){
        return this.$store.state.modifymessage.isShowModifyEmail;
      },
      getUserInfo(){
        return this.$store.state.user.userInfo;
      },
    }
  }
</script>
<style lang="scss" scoped src="@/assets/css/modifyPopup.css"></style>
