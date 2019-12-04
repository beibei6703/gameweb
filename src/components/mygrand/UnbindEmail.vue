<template>
  <div id="userinfo">
    <div class="modify_bg">
      <div class="modify-seat">您的位置： <router-link to="./personinfo" tag="i">我的菜园</router-link> 》 <router-link to="./personinfo" tag="i">个人信息</router-link> 》 <span class="cl-yellow1">邮箱绑定</span></div>
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
          inputEmailShow:false,
          inputVerityShow:false,
          sureShow:false,
        }
      }
    },
    methods:{
      toTwo(n){
        return n<10?n='0'+n:n
      },
      doSave:function(){
        let _this=this;
        let inputEmail=_this.$refs.inputEmail.value;
        let inputVerity=_this.$refs.inputVerity.value;
        if(inputEmail==='') {
          _this.items.inputEmailShow =true;
          _this.$refs.inputEmail.classList.add('error');
          _this.$refs.oldError.innerHTML = '邮箱不能为空'
        }
        if(inputVerity==='') {
          _this.items.inputVerityShow =true;
          _this.$refs.inputVerity.classList.add('error');
          _this.$refs.newError.innerHTML = '验证码不能为空'
        }
        if(inputEmail!=''&&inputVerity!=''){
          if(_this.items.inputEmailShow==false){
            let datas={
              email:inputEmail,
              code:inputVerity,
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
        let j=60,timer=null,params;
        let _box =_this.$refs.getVerity;
        let _dataName=_box.getAttribute('data-name');
        if(!TemailPhone){
          _this.items.inputEmailShow=true;
          _this.$refs.oldError.innerHTML='请输入邮箱';
          return;
        }
        if(RemailPhone.test(TemailPhone)){
          if(_this.items.inputEmailShow==false){
            _this.items.inputEmailShow=false;
            _this.$refs.oldError.innerHTML='';
            setTimeout(()=>{
              if(_dataName==1){
                params={
                  email:TemailPhone,
                  template:'bind',
                }
//              console.log(params)
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
          _this.$refs.oldError.innerHTML='邮箱格式有误，请重新输入';
        }
      },

    },
    mounted () {

    },
    computed:{
    }
  }
</script>
<style lang="scss" scoped src="@/assets/css/modify.css"></style>
