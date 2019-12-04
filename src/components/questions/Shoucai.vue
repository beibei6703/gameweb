<template>
  <div id="api">
    <div class="box">
      <!-- 公司简介 -->
      <div  class="api">
        <div class="title">公司简介</div>
        <p>杭州丰收网络科技有限公司 成立于2017年9月，是一家专注电竞赛事分析，战队合作的平台，致力于为广大电竞用户提供专业的电竞比赛资讯服务。</p>
        <p>公司位于杭州市西湖区文二路西湖国际C座</p>
        <img src="../../assets/images/Question-images/map.jpg" alt="">
        <p>公司目标：成为传播快乐的互联网平台</p>
        <p>公司使命：为电竞爱好者提供全方面的网络服务</p>
        <p>公司价值观：诚信，创新，开放，责任</p>
        <p>诚信：团队之间要诚信，对待用户守诚信，合作伙伴讲诚信</p>
        <p>创新：掌握市场动向，时刻保持着激情与进取的心态</p>
        <p>开放：以合作达到共赢为目标，与各行业的公司精诚合作</p>
        <p>责任：对用户，合作伙伴，公司，坚持原则基础上有着强烈的责任感</p>
        <p>联系方式</p>
        <p>联系电话：0571-89990601</p>
        <p>公司地址：浙江省杭州市下城区环城北路139号1幢328室</p>
        <p>杭州丰收网络科技有限公司  ©版权所有</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      num: 0,
      flag: true
    };
  },
  methods: {
    tabs(num) {
      this.num = num;
      this.flag = false;
    }
  }
};
</script>

<style scoped lang='scss'>
#api {
  width: 925px;
  float: left;
  margin-bottom: 50px;
  .box {
    width: 925px;
    // 高度大于737px
    .api {
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
        &:first-child {
          margin-top: 40px;
        }
      }
    }
  }
}
</style>
