<template>
  <div id="treasureBuySuccess" v-if="this.$store.state.isDialogShow.isTreasureBuyScsShow">
    <div class="buySuccessMask">
      <div class="buySuccessMain">
          <b class="pointer" @click="fnClose()">x</b>
          <div class="content">
            <h3>购买成功</h3>
            <p class="order_detail">
              <span class="items">恭喜您获得：{{options.name}} x {{options.nums}}</span>
              <span class="items_price">价值：{{thousandBitSeparator(parseFloat(options.price)*parseInt(options.nums))}}c</span>
            </p>
            <router-link tag="p" class="open_btn pointer" to="/mygrand/Warehouse/current=0" @click.native="fnClose()">开启宝箱</router-link>
          </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        key: 'value'
      }
    },
    methods: {
      fnClose() {
        this.$store.commit('changeisTreasureBuyScsShow',false);
      }
    },
    computed: {
      options() {
        return this.$store.state.mall.sucOptions || null;
      }
    },
  }
</script>

<style scoped lang="scss">
  #treasureBuySuccess{
    width: 100%;
    height: 100%;
    position: fixed;
    top:0;
    right: 0;
    bottom: 0;
    left: 0;
    outline: 0;
    z-index: 88;
    .buySuccessMask{
      position: fixed;
      top:0;
      right: 0;
      bottom: 0;
      left: 0;
      outline: 0;
      background: rgba(5,6,6,.8);
      .buySuccessMain{
        width: 420px;
        height: 240px;
        position: fixed;
        top:50%;
        left: 50%;
        transform: translate(-50%,-50%);
        background: url("../../assets/img/mall/treasure_buy_success.png") no-repeat;
        background-size: cover;
        b{
          width: 420px;
          display: inline-block;
          font-size: 28px;
          text-align: right;
          line-height: 50px;
          padding-right: 18px;
          color: #333;
        }
        .content{
          margin-top: 18px;
          h3{
            line-height: 50px;
            text-align: center;
            font-size: 18px;
            color: #c38e2a;
          }
        }
        .order_detail{
          text-align: center;
          font-size: 15px;
          .items{
            color: #dcdcdc;
          }
          .items_price{
            color: #c38e2a;
          }
        }
        .open_btn{
          width: 82px;
          height: 28px;
          margin:20px auto;
          background: url("../../assets/img/mall/dialog_buy_n.png") no-repeat;
          background-size: cover;
          text-align: center;
          font-size: 14px;
          line-height: 28px;
          &:hover{
            background: url("../../assets/img/mall/dialog_buy_h.png") no-repeat;
            background-size: cover;
          }
        }
      }
    }
  }
</style>
