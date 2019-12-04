<template>
  <div id="Inequality" v-if="this.$store.state.match.Inequality.show" :class="{active:getIsShow}">
    <div class="Inequality-bg"></div>
    <div class="Inequality-content">
      <div class="close" @click="handleclose"></div>
      <div class="Inequality-text">
        <h1 class="cl-red">本次登录设备与之前登录不一致，为确保账户安全
请您输入验证码后登录</h1>
        <div class="Inequality-text-con">
          <ul>
            <li>
              <div class="Inequality-text-left fl">{{this.$store.state.match.Inequality.text}}</div>
              <div class="Inequality-text-right fr">{{this.$store.state.match.Inequality.phoneTell}}</div>
              <div class="clear"></div>
            </li>
            <li>
              <div class="Inequality-text-left fl">验证码：</div>
              <div class="Inequality-text-right fr">
                <input type="text" class="inequality_input fl" ref="verityCode" placeholder="请输入验证码"/>
                <input type="button" class="inequality_send fr" ref="getVerity" @click.self="sendDevice" :data-name="this.$store.state.match.upDataName" :value="this.$store.state.match.uptimeText"/>
                <div class="clear"></div>
              </div>
              <div class="clear"></div>
            </li>

          </ul>
          <div class="clear"></div>
        </div>

        <div class="Inequality_sure" @click="sendCode">确定</div>
      </div>
    </div>
  </div>
</template>
<style scoped lang="scss">
.clear{clear:both;padding:0;margin:0;display:block;}
#Inequality{position:fixed;top:0; left:0; width:100%; height:100%; z-index:999999999;  }
#Inequality .Inequality-bg{position:fixed;top:0; left:0; width:100%; height:100%; z-index:1;background:#000;opacity:0.5;}
#Inequality .Inequality-content{position:fixed;top:50%; left:50%; width:440px; height:301px; z-index:2;background:url('../../assets/images/competeImg/inequality_bg.jpg') no-repeat;margin:-150px 0 0 -220px;}
#Inequality .Inequality-content .close{width:22px; height:22px;position:absolute;top:15px; right:15px; background:url('../../assets/images/competeImg/inequality_i.png') no-repeat center;cursor:pointer;}
#Inequality .Inequality-content .close:hover{background-image:url('../../assets/images/competeImg/inequality_ih.png')}
#Inequality .Inequality-text{padding-top:70px;width:335px; margin:0 auto;}
#Inequality .Inequality-text>h1{font-size:15px; line-height:20px; text-align:left;}
#Inequality .Inequality-text .Inequality-text-con{padding-top:10px;font-size:15px;}
#Inequality .Inequality-text .Inequality-text-con li{padding:5px 0;}
#Inequality .Inequality-text .Inequality-text-left{line-height:32px; color:#989898;padding-right:4px; text-align: right;width:66px;}
#Inequality .Inequality-text .Inequality-text-right{width:265px; line-height:32px; font-size:18px; text-align: left;}
#Inequality .Inequality-text input{background:none; outline:none;border:0;}

#Inequality .Inequality-text .inequality_input{height:30px; line-height:30px; background:#15161a;border:#535353 1px solid;padding:0 10px;width:135px;color:#989898;}
#Inequality .Inequality-text .inequality_send{height:32px; line-height:32px; background:#7f7562;width:105px; text-align: center;color:#fefefe; font-size:14px;cursor:pointer; }
#Inequality .Inequality_sure{clear:both;margin:35px auto 0;cursor:pointer; width:93px; height:35px; background:url('../../assets/images/competeImg/guess_b2_ih.png') repeat-x; color:#925f11; line-height:35px; text-align: center;border-radius:4px;}
#Inequality .Inequality_sure:hover{background-image:url('../../assets/images/competeImg/guess_b2_h.jpg');}

#Inequality{
  &.active{
    .Inequality-content{
       background-image:url('https://imgcdn.api.com/images/treasure/login_tishi_bg.png') !important;width:442px;margin-left:-221px;
    }
    .close{
      background-image:url('https://imgcdn.api.com/images/treasure/close.png') !important;
      &:hover{
        background-image:url('https://imgcdn.api.com/images/treasure/close_hover.png') !important;
      }
    }
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
    .Inequality-text-left{color:#8f8fc9;}
    .inequality_input{color:#8f8fc9;border-color:#3f42a0 !important;}
    .inequality_send{ background:#3E59D2 !important;}
    .Inequality_sure{
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

  }
}
</style>
<script>
  import Http from '@/common/http';
  import { mapMutations, mapState } from 'vuex';
  import { setStore,getStore,removeStore} from '@/utils/storage.js';
  export default {
    data () {
      return {
          itemsBool:{
            type:'',
          }
      }
    },
    methods: {
      handleclose(){
        if(this.isInequalityShow.typeLogin){
          setTimeout(()=>{
            this.$store.commit("istestBooleam",true);
          },100)

        }
          var datas={
            show:false,
            text:'',
            phoneTell:'',
            username:'',
            password:'',
            remember_me:'',
          }
        this.$store.commit('isInequalityShowDis',datas)
//        this.$store.state.match.loginBooleam=true;
//        this.$store.commit("istestBooleam", false);

        this.$store.state.match.timeUp=null;

      },
      toTwo(n){
        return n<10?n='0'+n:n
      },
      //发送验证码
      sendDevice(){
        let j=10,timeOut=null,self=this,_thisdataName;
        let _thisbox =self.$refs.getVerity;
        _thisdataName=_thisbox.getAttribute('data-name');
        console.log(_thisdataName)
        if(_thisdataName==1){
          var params = {
            'username':this.$store.state.match.Inequality.username,
            'password':this.$store.state.match.Inequality.password,
            'remember_me':this.$store.state.match.Inequality.remember_me,
            challenge:this.$store.state.match.challenge_gee?this.$store.state.match.challenge_gee:null
          };
          console.log('再次发送',params)
          self.$store.dispatch('login',params).then(function(response){
            console.log(response.data.code)
            if(response.data.code==0){
              self.$emit("close");
              self.$store.commit('userInfo');
              if(self.$route.query.id){
                let datas={
                  guess_id:self.$route.query.id
                }
                self.$store.dispatch('caimy_list',datas)
                self.$store.dispatch('skins_list',datas)
                self.$store.dispatch('skinsmy_list',datas)
//                self.$store.state.match.loginBooleam=true;
              }
            }else if(response.data.code==41005){
              self.$store.state.match.uptimeTrue=true;
              clearInterval(self.$store.state.match.timeUp)
              self.$store.commit('isInequalityShowDis',{
                show:self.$store.state.match.Inequality.show,
                text:self.$store.state.match.Inequality.text,
                phoneTell:self.$store.state.match.Inequality.phoneTell,
                username:self.$store.state.match.Inequality.username,
                password:self.$store.state.match.Inequality.password,
                remember_me:self.$store.state.match.Inequality.remember_me,
                typeLogin:'2'

              })

            }else{
              let dataOption ={
                'masseges':response.data.message,
                'type':'2',
              }
              self.$store.commit('isSigninPupopDis',true);
              self.$store.commit('isSigninPupopDis',dataOption);
            }
          });
        }
      },
      sendCode(){
        let _this=this,params;
        let code =_this.$refs.verityCode.value;
        params={
          'username':this.$store.state.match.Inequality.username,
          'password':this.$store.state.match.Inequality.password,
          'remember_me':this.$store.state.match.Inequality.remember_me,
          'code':code,
           challenge:this.$store.state.match.challenge_gee?this.$store.state.match.challenge_gee:null
        }
//        return console.log('返回参数',params)
        Http.post('login',params).then(function(response){
          _this.$store.commit("istestBooleam",false);

            console.log(response.data)
           if(response.data.code==0){
             _this.$store.dispatch("userInfo");
             _this.$store.commit("hideLoginDialog");
             _this.$store.commit('isInequalityShowDis',false);


           }else{
             console.log('执行了嘛')
             _this.errUserName = true
             _this.errUserNameMessage = response.data.message
            let dataOption
            if(response.data.code==41001){
               dataOption ={
               'masseges':'验证码错误',
             }
            }else if (response.data.code==-200){
              dataOption ={
               'masseges':'验证码格式不正确',
              }
            }else if (response.data.code==41005){
                dataOption ={
                'masseges':'请输入验证码',
                }
            }else{
                dataOption ={
                'masseges':response.data.message,
              }
            }

             console.log(dataOption,'dataOptiondataOptiondataOption')
             _this.$store.commit('isSigninPupopDis',true);
             _this.$store.commit('isSigninPupopDis',dataOption);
           }
        });



      }
    },
    mounted () {
    },
    computed: {
      isInequalityShow:function(){
        return this.$store.state.match.Inequality;
      },
      getIsShow(){
        return this.$store.state.treasure.isLoginAddActive
      },
    }
  }
</script>
