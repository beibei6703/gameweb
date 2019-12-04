<template>
  <div id="loginin">
    <div class="tips">本站所有预测均只为休闲娱乐，增加比赛趣味性，所有饰品和C币均不能兑换为现金。<span>提示</span></div>
    <div class="personinfo">
      <div class="persontop">
        <!--<div class="info">点击左侧“我要参加”即可参与抽奖</div>-->
        <div class="personnickname">欢迎您，亲爱的 {{selftest.nickname}}</div>
        <div class="personavatar" >
          <span><img :src="selftest.avatar" alt=""></span>
          <div class="isvip" v-if="selftest.vip_level>0">
            <img :src="require('@/assets/images/turntable/vip'+selftest.vip_level+'.png')">
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
  import Http from "../../common/http";
  import config from "../../common/http-config";
  export default {
    data () {
      return {
        selfdata:{}
      }
    },
    methods: {
      getdata(){
        Http.get(`/self`)
        .then(response => {
          this.selfdata = response.data.data
          console.log(this.selfdata,'个人数据')
        })
        .catch(Http.onError);
      }
    },
    created () {
      this.getdata()
    },
    computed: {
      selftest:function(){
        return this.$store.state.user.userInfo ? this.$store.state.user.userInfo :null
      }
    }
  }
</script>

<style scoped lang="scss">
#loginin{
  height: 210px;
  width: 400px;
  padding-left:20px;
  .tips{
    height: 80px;
    padding-top: 20px;
    padding-left: 72px;
    padding-right:10px;
    position: relative;
    font-size: 12px;
    color:#fff;
    line-height: 20px;
    background: url('../../assets/images/freeturn/tipsbg.png');
    span{
      position: absolute;
      top:0;
      left:16px;
      width: 38px;
      height: 38px;
      text-align: center;
      padding-top:10px;
      background: url('../../assets/images/freeturn/tips.png');
    }
  }
  .personinfo {
    height: 157px;
    margin-top: 2px;
    background:url('../../assets/images/freeturn/login.png');
    .persontop {
      height: 100%;
      .info{
        margin-bottom:20px;
      }
      .personavatar {
        width: 50px;
        height: 50px;
        position: relative;top:0;left:0;margin:0 auto;
        span{width:50px;height:50px;display:block; border-radius:100%; margin:20px auto 0;
          img {
            width: 100%;
            height: 100%;
            border-radius: 50%;
          }
        }
        .isvip {
          width: 50px;
          height: 50px;
          top: 0;
          position: absolute;
          border: 2px solid rgb(255, 204, 1);
          border-radius: 50%;
          img {
            width: 16px;
            height: 13px;
            position: absolute;
            right: -5px;
            bottom: 0;
          }
        }
      }
      .personnickname {
        text-align:center;
        font-size: 14px;
        color: #fff;
        padding-top: 26px;line-height:20px;
      }
      .partake {
        width: 120px;
        height: 31px;
        font-size: 16px;
        line-height: 31px;
        text-align: center;
        margin-right: 27px;
        margin-top: 6px;
        cursor: pointer;
        background-color: #313131;
        border: 1px solid #424242;
      }
    }
  }
}

</style>
