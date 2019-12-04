<template>
  <div id="signin" v-show="this.$store.state.home.isSigninDiaShow">
      <div class="wrap_signin_h476 wrap_signin ">
          <div class="signin_top">
              <h3 class="theme_color">邮件信息</h3>
              <i  class="x pointer" @click="handleclose"></i>
          </div>
          <div class="signincontent">
              <div class="signinreward">
                    <div class="reward " v-if="emaildialog.content[0]">
                      <p class="title">标题：&nbsp;&nbsp;
                          <span class="info" v-if="emaildialog.content[0]">{{emaildialog.content[0].title}}</span>
                      </p>
                      <div class="title bigtext">
                          <span class="text">内容：</span>
                          &nbsp;&nbsp;
                          <!-- <span class="info infodetail wd-break" v-if="emaildialog.content[0]">{{emaildialog.content[0].content}}*{{emaildialog.content[0].num}}</span> -->
                          <p class="info infodetail wd-break">
                              <span class="vhtml" v-html="emaildialog.content[0].content"></span>
                              <span class="giftnums " v-if="emaildialog.content[0].gift">奖励：<i class=" theme_color">{{emaildialog.content[0].gift.cai}} C</i></span>
                          </p>

                      </div>
                    </div>
                    <div class="picinfo" v-if="emaildialog.content[0].img">
                        <img :src="emaildialog.content[0].img" alt="" class="pic" v-if="emaildialog.content[0].img">
                        <span class="num" v-if="emaildialog.content[0].num">x&nbsp;{{emaildialog.content[0].num}}</span>
                    </div>
                    <!-- <div class="giftnum" v-if="emaildialog.content[0].gift">
                        <span class="giftnums theme_color" v-if="emaildialog.content[0]">{{emaildialog.content[0].gift.cai}} C</span>
                    </div> -->
              </div>

              <div class="btns" v-if="emaildialog.ftype==3 || emaildialog.ftype==5">
                    <i class="enter  pointer btn" @click="handlesend(emaildialog.ftype)" v-if="this.$store.state.home.echostatus==0">领取</i>
                    <i class="ready  pointer btn"  v-if="this.$store.state.home.echostatus==1">已领取</i>
              </div>
              <!-- <div class="btns" v-else>
                  <button class="pointer  closebtn" @click="handleclose">关闭</button>
              </div> -->
              <!-- <div class="btns" v-if="emaildialog.ftype==5">
                    <i class="enter  pointer btn" @click="handlesend" v-if="this.$store.state.home.echostatus==0">领取</i>
                    <i class="ready  pointer btn"  v-if="this.$store.state.home.echostatus==1">已领取</i>
              </div> -->
              <div class="btns" v-else>
                  <button class="pointer  closebtn" @click="handleclose">关闭</button>
              </div>
          </div>
      </div>
  </div>
</template>
<script>
import  Fail from "../dialog/fail"
export default {
  data () {
      return {
         text:'领取',
         isdisabled:true,
         isReceive:false,
         successis:false,
      }
  },
  methods: {
      handleclose(){
            this.$store.commit('isSigninDiaShowDis',false);
            this.$store.commit('echostatusmu',1);
            this.$store.dispatch("userInfo");
            this.$store.dispatch('userinfo');
            this.$store.dispatch('self');
            this.$store.dispatch('getemaildis',{page: this.$store.state.garden.emailType.page,category: this.$store.state.garden.emailType.type});
      },
      handlesend(ftypes){
            this.$store.dispatch('getemaildis',{page: this.$store.state.garden.emailType.page,category: this.$store.state.garden.emailType.type});
            this.$store.dispatch("userInfo");
            this.$store.dispatch('userinfo');
            this.$store.dispatch('self');
            var _this = this;
            if(ftypes==3){
                this.$store.dispatch('getrewardemaildis',{message_id:this.$store.state.home.emaildialog.message_id}).then(function(response){
                    if(response.data.code==0){
                        _this.$store.commit('isSigninDiaShowDis',false);
                        _this.$store.commit('echostatusmu',1);
                        _this.$emit('reloadData');
                        _this.$store.dispatch("userInfo");
                        _this.$store.dispatch('userinfo');
                        _this.$store.dispatch('self');
                    }else{
                        _this.$store.commit('isSigninDiaShowDis',false);
                        _this.alert(response.data.message);
                    }
                });
            }
            if(ftypes==5){
               this.$store.dispatch('getrewardgiftdis',{message_id:this.$store.state.home.emaildialog.message_id}).then(function(response){
                    if(response.data.code==0){
                        _this.$store.commit('isSigninDiaShowDis',false);
                        _this.$store.commit('echostatusmu',1)
                        _this.$emit('reloadData');
                        _this.$store.dispatch("userInfo");
                        _this.$store.dispatch('userinfo');
                        _this.$store.dispatch('self');
                    }else{
                        _this.$store.commit('isSigninDiaShowDis',false);
                        _this.alert(response.data.message);
                    }
                });
            }
      },
      closechild(value){
          this.successis=value
      }
  },
  computed: {
    emaildialog(){
        return this.$store.state.home.emaildialog?this.$store.state.home.emaildialog:{content:{'content':'戒骄戒躁','img':null,num:0,title:'踏踏实实'},message_id:1,status:1,nums:0}
    },
    echostatus(){
        return this.$store.state.home.echostatus?this.$store.state.home.echostatus:0
    }
  },
  components: {
      Fail
  }
}
</script>
<style lang="scss" scoped>
#signin{
    .reward{
       .infodetail{
           height:auto;
       } 
    }
    .wrap_signin_h476{
        .signin_top{
            height: 70px;
            text-align: center;
            position: relative;
            left: 0px;
            top:0px;
            line-height: 78px;
            .x{
                top:27px;
            }
        }
        .signinreward{
            width:432px;
            height: 300px;
            margin:0 auto;
            margin-top:30px;
            .reward{
              height:180px;
            }
        }
        .signincontent{
            height: 376px;
        }
        .picinfo{
            width:80px;
            height: 80px;
            border:1px solid #e1c076;
            padding:2px;
            position: relative;
            top: 20px;
            left:0;
            // left: 40%;
            margin:0 auto;
            .pic{
                width:74px;
                height: 74px;
            }
            .num{
                 display: inline-block;
                position: absolute;
                right: 2px;
                bottom: 2px;
                height: 15px;
                width: 34px;
                background-color: #15161a;
                opacity: .85;
                font-size: 10px;
                line-height: 15px;
               text-align: center;
            }
        }
        .giftnums{//待修改
            margin-top:20px;
            display: block;
            text-align: left;
        }
        .infodetail{
            min-height: 146px;
            padding:5px;
            margin-left: 55px;
            line-height: 20px;
            font-size: 14px;
            float:right;
        }
        .bigtext{
            position: relative;
            left: 0px;
            top: 0px;
        }
        .text{
            position: absolute;
            left: 0px;
            top: 0px;
        }
        .enter{
            display: block;
            width:104px;
            height:40px;
            margin-left: 216px;
            line-height: 40px;
            font-size: 18px;
            color: #946011;
            background-image: url('../../assets/images/mygrand/normal.png');
            &:hover{
                background-image: url('../../assets/images/mygrand/hover.png');
            }
        }
        .ready{
            width:104px;
            height: 40px;
            background: #535353;
            border-radius: 3px;
            color: #dcdcdc;
            margin: 0 auto;
        }
        .closebtn{
            border: none;
            background: url("../../assets/images/competeImg/guess_b2.png") repeat;
            width: 94px;
            height: 32px;
            line-height: 32px;
            color: #794e0d;
            border-radius: 3px;
            &:hover{
                background: url("../../assets/images/mygrand/c_h_1_32.png") repeat;
                color: #794e0d;
            }
        }
    }
}
</style>

