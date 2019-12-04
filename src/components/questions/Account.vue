<template>
  <div id="account">
    <div class="box">
      <div class="tabs" v-if="flag">
        <p @click="tabs(1)">如何找回密码？</p>
        <p @click="tabs(2)">C币的获得途径及用途</p>
        <p @click="tabs(3)">行为准则</p>
        <p @click="tabs(4)">账号如何升级？</p>
        <p @click="tabs(5)">如何绑定邮箱/手机号？</p>
        <p @click="tabs(6)">新玩家注册指引</p>
      </div>
      <!-- 如何找回密码 -->
      <div v-if="num==1&&!flag" class="password">
        <div class="title">如何找回密码？</div>
        <p>第一步：打开登录页面，找到密码输入栏下方的
          <span>忘记密码？</span>，点击进入</p>
        <img src="../../assets/images/Question-images/logingurid.png" alt="">
        <p>第二步：输入注册时填写的手机号或邮箱，通过验证进入下一步</p>
        <img src="../../assets/images/Question-images/password002.jpg" alt="">
        <p>第三步：通过验证码验证后，设置新的密码</p>
        <img src="../../assets/images/Question-images/password003.jpg" alt="">
        <p>第四步：新密码设置成功</p>
        <img src="../../assets/images/Question-images/password004.jpg" alt="">
      </div>
      <!-- C币的获得途径及用途 -->
      <div v-if="num==2&&!flag" class="caibi">
        <div class="title">C币的获得途径及用途</div>
        <p>C币是丰收网特有的虚拟货币，主要功能与获取途径包括：</p>
        <p>1）通过充值C币可以直接获得（1RMB=100C币）；</p>
        <p>2）作为丰收网道具购买的中间货币，用于购买皮肤卡及虚拟卡所用；</p>
        <p>3）参与游戏比赛预测，赢得比赛的同时还能赢得C币；</p>
        <p>4）后续还将开放C币兑换周边奖品等。</p>
      </div>
      <!-- 行为准则 -->
      <div v-if="num==3&&!flag" class="behavior">
        <div class="title">行为准则</div>
        <p>1.任何用户在与 丰收网 员工沟通期间以侮辱性字眼攻击或骚扰 丰收网 员工，将面对封号一至三天的处罚。</p>
        <p>2.任何用户在“预测”页面里的聊天区，不停骚扰，攻击其他用户，散播不实消息或任何不当的行为，将面对封号一至三天的处罚。</p>
        <p>3.任何用户在“预测”页面里的聊天区，不停骚扰，攻击其他用户，散播不实消息或任何不当的行为，将面对封号一至三天的处罚。</p>
        <p>4.任何用户上载广告链接或任何广告形式推销其它诈骗网/组，第一次将进行封号一至三天，如果再犯，将面对永久封号的惩罚。</p>
        <p>5.任何用户滥用 丰收网 页面或系统的漏洞或BUG而非法得益，将面对永远封号的惩罚。</p>
        <p>6.任何重犯者将加倍惩罚，请用户三思而行。</p>
      </div>
      <!-- 账号如何升级 -->
      <div v-if="num==4&&!flag" class="level">
        <div class="title">账号如何升级？</div>
        <p>丰收网的等级可以使帐号获得更多增值服务。</p>
        <p>用户登录帐号后，可以进入“我的菜园”，查看当前等级和升级经验。</p>
        <img src="../../assets/images/Question-images/level.jpg" alt="">
        <p>用户初始等级为LV.1，通过聊天及签到均可获得相应经验，等级越高升级所需经验越多哦。</p>
      </div>
      <!-- 如何绑定邮箱/手机号？ -->
      <div v-if="num==5&&!flag" class="binding">
        <div class="title">如何绑定邮箱/手机号？</div>
        <p>绑定邮箱、手机号是为了您在使用账号的过程中可以更安全、便捷</p>
        <p>用户在注册时需填写的手机号或邮箱，完成注册即绑定其中之一</p>
        <img src="../../assets/images/Question-images/binding001.jpg" alt="">
        <p>在“我的菜园”中点击右方按钮可以进行绑定</p>
        <img src="../../assets/images/Question-images/binding002.jpg" alt="">
      </div>
      <!-- 新玩家注册指引 -->
      <div v-if="num==6&&!flag" class="register">
        <div class="title">新玩家注册指引</div>
        <p>在丰收网右上角，点击“注册”</p>
        <img src="../../assets/images/Question-images/register001.jpg" alt="">
        <p>将其中的信息填写完整，完成注册后即可使用手机号或邮箱进行登录</p>
        <img src="../../assets/images/Question-images/logingurid.png" alt="">
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      num: 0
    };
  },
  methods: {
    tabs(num) {
      this.num = num;
      this.$store.dispatch("flag", false);
    }
  },
  computed: {
    flag: function() {
      return this.$store.state.news.flag;
    }
  }
};
</script>

<style scoped lang='scss'>
#account {
  width: 925px;
  float: left;
  margin-bottom: 50px;
  .box {
    width: 925px;
    .tabs {
      width: 925px;
      height: 737px;
      padding-top: 32px;
      background-color: #242628;
      p {
        height: 50px;
        line-height: 50px;
        width: 100%;
        font-size: 16px;
        padding-left: 84px;
        text-align: left;
        position: relative;
        cursor: pointer;
        &:hover {
          color: #e1c076;
          &:before{
            background-color: #e1c076;
          }
        }
        &:before {
          content: "";
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background-color: #dcdcdc;
          top: 21px;
          position: absolute;
          left: 60px;
        }
      }
    }
    // 高度大于737px
    .password,
    .binding,
    .register {
      width: 100%;
      padding: 0 60px;
      text-align: left;
      background-color: #242628;
      padding-bottom: 50px;
      .title {
        height: 70px;
        line-height: 70px;
        text-align: center;
        font-size: 18px;
        color: #dcdcdc;
        font-weight: bold;
        background: url("../../assets/images/Question-images/accountcut.png") 0
          bottom no-repeat;
      }
      p {
        margin: 50px 0px;
        font-size: 14px;
        line-height: 20px;
        span {
          color: red;
        }
        &:first-child {
          margin-top: 40px;
        }
      }
    }
    // 高度小于737px
    .caibi,
    .behavior,
    .level {
      width: 100%;
      padding: 0 60px;
      text-align: left;
      height: 737px;
      background-color: #242628;
      padding-bottom: 50px;
      .title {
        height: 70px;
        line-height: 70px;
        text-align: center;
        font-size: 18px;
        color: #dcdcdc;
        font-weight: bold;
        background: url("../../assets/images/Question-images/accountcut.png") 0
          bottom no-repeat;
      }
      p {
        margin: 50px 0px;
        font-size: 14px;
        line-height: 20px;
        &:first-child {
          margin-top: 40px;
        }
      }
    }
  }
}
</style>