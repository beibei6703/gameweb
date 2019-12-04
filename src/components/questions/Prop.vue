<template>
  <div id="prop">
    <div class="box">
      <div class="tabs" v-if="flag">
        <p @click="tabs(1)">道具碎片是什么</p>
        <p @click="tabs(2)">如何购买道具</p>
      </div>
      <!-- 道具碎片是什么 -->
      <div v-if="num==1&&!flag" class="piece">
        <div class="title">道具碎片是什么</div>
        <p>用户通过道具预测获胜所得的道具赔付小于本网站最小道具时，将以道具碎片的形式发放至用户背包。注：1个碎片=1个C币</p>
      </div>
      <!-- 如何购买道具 -->
      <div v-if="num==2&&!flag" class="buy">
        <div class="title">如何购买道具</div>
        <p>平台所有道具均可在商城中购买，道具的C币价值均以丰收网为准。</p>
        <p>用户集齐相应的碎片可以通过合成功能合成完整道具。</p>
        <p>道具碎片不具备赠送功能。</p>
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
#prop {
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
    // 高度小于737px；
    .piece,
    .buy {
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
