<template>
  <div id="userinfo" v-if="getisShowModifyPhone">
    <div class="userinfo-bg" @click="closemodifyPopup()"></div>
    <div class="modify_bg">
      <i class="modify_close" @click="closemodifyPopup()"></i>
      <div class="modify-seat"><span class="cl-yellow1">手机号修改</span></div>
      <div class="modify_down">
        <div class="modify_dn-list">
          <div class="modify_same">
            <div class="modify_same_text fl">新手机号：</div>
            <div class="modify_same_right relative fl">
              <input type="text" ref="newPhone" class="modify_same_input modify_same_pass" value="" @focus="addNewPhone" @blur="newPhone"/>
              <span class="Error" ref="oldError" v-show="items.newPhoneShow"></span>
            </div>
            <div class="clear"></div>
          </div>
          <div class="modify_same">
            <div class="modify_same_text fl">旧手机号：</div>
            <div class="modify_same_right relative fl" ref="uersInfo">{{getUserInfo.mobile}}</div>
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
          newPhoneShow:false,
          oldVerityShow:false,
          sureShow:false,
        }
      }
    },
    methods:{
      closemodifyPopup(){
        this.$store.commit('mutationsisShowModifyPhone',false)
      },
      doSave:function(){
        let _this=this;
        let newPhone=_this.$refs.newPhone.value;
        let oldVerity=_this.$refs.oldVerity.value;
        if(newPhone=='') {
          _this.items.newPhoneShow =true;
          //_this.$refs.newPhones.classList.add('error');
          _this.$refs.oldError.innerHTML = '新手机号不能为空'
        }
        if(oldVerity=='') {
          _this.items.oldVerityShow =true;
          //_this.$refs.oldVerity.classList.add('error');
          _this.$refs.newError.innerHTML = '验证码不能为空'
        }
        if(newPhone!=''&&oldVerity!=''){
          if(_this.items.newPhoneShow==false){
            let datas={
              code:oldVerity,
            }
            Http.post('/verifyMobile',datas).then(function(data){
              let result =data.data;
             if(result.code==0){
               /*let dataOption ={
                 'masseges':'验证成功',
                 'type':'3'
               }
               _this.$store.commit('isSigninPupopDis',true);
               _this.$store.commit('isSigninPupopDis',dataOption);*/
               sessionStorage.setItem("newPhone", newPhone);
              //  _this.$router.push('../mygrand/verityphone');
              _this.$store.commit('mutationsisShowModifyPhone',false)
              _this.$store.commit('mutationsisShowVerityPhone',true)
              }else{
                let dataOption ={
                  'masseges':result.message,
                  'type':'1',
                }
                _this.$store.commit('isSigninPupopDis',true);
                _this.$store.commit('isSigninPupopDis',dataOption);



              }

            })

          }
        }
      },
      toTwo(n){
        return n<10?n='0'+n:n
      },
      addNewPhone:function(){let _this=this;_this.$refs.newPhone.classList.add('active');if(_this.$refs.newPhone.classList.contains('error')==true){_this.$refs.newPhone.classList.remove('error');};},
      addNew:function(){let _this=this;_this.$refs.oldVerity.classList.add('active');if(_this.$refs.oldVerity.classList.contains('error')==true){_this.$refs.oldVerity.classList.remove('error');};},
      newPhone:function(){
        let _this=this;
        let reg =/^1[3-9]\d{9}$/;//手机号码正则
        let password =_this.$refs.newPhone.value;
        if(_this.$refs.newPhone.classList.contains('active')==true){
          _this.$refs.newPhone.classList.remove('active');
        }
        if(password!=='') {
          if (!reg.test(password)) {
            _this.items.newPhoneShow =true;
            _this.$refs.newPhone.classList.add('error');
            _this.$refs.oldError.innerHTML = '手机格式有误，请重新输入'
          } else {
            _this.items.newPhoneShow =false;
            _this.$refs.oldError.innerHTML = ''
            if(_this.$refs.newPhone.classList.contains('error')==true){
              _this.$refs.newPhone.classList.remove('error');
            }
          }
        }else{
          _this.items.newPhoneShow =true;
          _this.$refs.newPhone.classList.add('error');
          _this.$refs.oldError.innerHTML = '手机号不能为空'
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
        let _this=this;//手机值
        let j=60,timer=null,params;
        let _box =_this.$refs.getVerity;
        let _dataName=_box.getAttribute('data-name');
        if(_dataName==1){
          params={
            verify:'1',
          }
//          console.log(params)
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
      },

    },
    mounted () {
        let _this=this;
    },
    computed:{
      getisShowModifyPhone(){
        return this.$store.state.modifymessage.isShowModifyPhone;
      },
      getUserInfo(){
        return this.$store.state.user.userInfo;
      },
    }
  }
</script>
<style lang="scss" scoped src="@/assets/css/modifyPopup.css"></style>
