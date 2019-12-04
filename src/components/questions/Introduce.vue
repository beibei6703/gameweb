<template>
  <div id="introduce">
    <div class="box">
      <div class="tabs" v-if="flag">
        <p @click="tabs(1)">工程介绍</p>
        <p @click="tabs(2)">申请流程</p>
        <p @click="tabs(3)">FAQ</p>
        <p @click="tabs(4)">申请资料下载</p>
      </div>
      <!-- 工程介绍 -->
      <div v-if="num==1&&!flag" class="introduce">
        <div class="title">工程介绍</div>
        <p>“网络游戏未成年人家长监护工程”是一项由文化部指导，网络游戏企业自主发起并参与实施，旨在加强家长对未成年人参与网络游戏的监护，引导未成年人健康、绿色参与网络游戏，构建和谐家庭关系的行业自律行动。</p>
        <p>它提供了一种切实可行的方法，一种家长实施监控的管道，使家长纠正部分未成年子女沉迷游戏的行为成为可能。该项社会公益行动充分反映了中国网络游戏行业高度的社会责任感，对未成年玩家合法权益的关注及对用实际行动营造和谐社会的愿望。</p>
        <p>“家长监护机制”是丰收网在这一公益行动中，针对目前未成年人缺乏自控及自律能力，容易陷入沉迷；少数监护人缺少时间照顾孩子，不能及时监督孩子游戏时间的现状，而推出的一种可由家长实施监控，纠正部分未成年子女沉迷游戏的保护机制。</p>
        <p>供申请监护方式：</p>
        <p>A.屏蔽帐号：根据监护人意愿屏蔽相关游戏应用登陆。</p>
        <p>B.与客服人员协商解决等多种方式。</p>
        <p>其他要求：</p>
        <p>1.申请人应提交较完备的申请材料，对未提供的信息及时补充；可请熟知电脑、互联网、游戏的人员进行协助，以便提供详实资料；</p>
        <p>2.申请人应保证提交的信息真实有效；对于提供虚假信息或伪造证件，我司将保留进一步追究法律责任的权利。</p>
      </div>
      <!-- 申请流程 -->
      <div v-if="num==2&&!flag" class="procedure">
        <div class="title">申请流程</div>
        <p>具体实施细则如下：</p>
        <p>一、申请条件</p>
        <p>1、申请人需为被监护未成年人的法定监护人；</p>
        <p>2、申请人的被监护人年龄小于18周岁；</p>
        <p>3、申请人需为大陆公民，不含港、澳、台人士。</p>
        <p>二、申请需要提交材料：</p>
        <p>1、监护人信息表（包含监护人的身份证明复印件）；</p>
        <p>2、被监护人信息表（包含被监护人所玩游戏相关信息及身份证明复印件）；</p>
        <p>3、填写网络游戏未成年人家长监护申请书、保证书、授权书并手工签字（需下载，填写并打印，签字）；</p>
        <p>4、申请人与被监护人的监护关系证明文件（户口簿或有关机关出具的证明文件）。</p>
        <p>注：提交资料后，申请人可致电询问申请进度。</p>
        <p>三、咨询及申请方式：</p>
        <p>1.电话服务</p>
        <p>监护人可以来电咨询，来电号码：0571-89990601 (每日9:00-18:00)</p>
        <p>2.接待服务</p>
        <p>监护人可以直接上门进行申请，接待服务受理时间：工作日9：00-18：00，地址：杭州市西湖区西湖国际科技大厦C幢806</p>
        <p>3.EMAIL服务</p>
        <p>监护人可以通过EMAIL咨询或者发送相关资料，EMAIL地址：kefu@api.com</p>
        <p>四、其他要求：</p>
        <p>1.申请人应提交较完备的申请材料，对未提供的信息及时补充；可请熟知电脑、互联网、游戏的人员进行协助，以便提供详实资料；</p>
        <p>2.申请人应保证提交的信息真实有效；对于提供虚假信息或伪造证件，我司将保留进一步追究法律责任的权利。</p>
      </div>
      <!-- FAQ -->
      <div v-if="num==3&&!flag" class="FAQ">
        <div class="title">FAQ</div>
        <p>Q：家长监护系统这项服务是收费的吗？</p>
        <p>A：这项服务是免费的。</p>
        <p>Q：申请监督的帐号有什么要求？</p>
        <p>A：帐号所属人必须未满18周岁。</p>
        <p>Q：申请人有什么要求？</p>
        <p>A：1、申请人应提交较完备的申请材料，对未提供的信息及时补充；可请熟知电脑、互联网、游戏的人员进行协助，以便提供详实资料；</p>
        <p>2、申请人应保证提交的信息真实有效；对于提供虚假信息或伪造证件，受理公司将保留进一步追究法律责任的权利。</p>
        <p>Q：申请人提交申请后，多久可以处理完成？</p>
        <p>A：我们将以最快的速度进行核实处理，由于您提供的材料不同，任何步骤有疑问，我们都会与您联系。</p>
        <p>Q：申请成功后，如果需要取消监督如何操作？</p>
        <p>A： 1、您可以通过上门或传真方式提供申请监督时的相关信息，申请解除监督；</p>
        <p>2、被监护帐号所属人年满18周岁可提供申请监督时的相关信息进行申请结束监督；</p>
        <p>Q：相关资料寄往哪里呢？</p>
        <p>A：请将相关资料邮寄至：（请在信封表面写上“家长监控服务申请书”的字样）</p>
        <p>收件人：杭州丰收网网络科技有限公司客服组</p>
        <p>地　址：杭州市西湖区西湖国际科技大厦C幢806</p>
        <p>邮　编：310000</p>
      </div>
      <!-- 申请资料下载 -->
      <div v-if="num==4&&!flag" class="downLoad">
        <div class="title">申请资料下载</div>
        <p>
          <a href="/static/download/监护人信息表.doc" download>附件一：监护人信息表</a>
        </p>
        <p>
          <a href="/static/download/被监护人信息表.doc" download>附件二：被监护人信息表</a>
        </p>
        <p>
          <a href="/static/download/家长监护申请书.doc" download>附件三：家长监护申请书</a>
        </p>
        <a href="/static/download/申请材料.rar" download class="alldown">下载全部</a>
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
#introduce {
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
          &:before {
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
    .procedure,
    .FAQ,
    .introduce {
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
    .downLoad {
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
        a {
          color: #dcdcdc;
        }
      }
      .alldown {
        display: block;
        width: 120px;
        height: 35px;
        line-height: 35px;
        text-align: center;
        border-radius: 3px;
        color: #8f5708;
        background: url('../../assets/images/Question-images/1_02.png') repeat-x;
        &:hover{
          background: url('../../assets/images/Question-images/11_02.png') repeat-x;
        }
      }
    }
  }
}
</style>