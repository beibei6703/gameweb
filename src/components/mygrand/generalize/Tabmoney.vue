<template>
 <div class="tabsCon">
        <p class="promoterfare">推广员福利</p>
        <span class="itemcon">1.推广员福利结算时间：每周一下午6：00点前结算，每次结算后会重新计算；</span>

        <span class="itemcon">2.推广员福利奖励；收益为推广者充值的10%；</span>
    <!-- <div class="tablewap">  
            <div class="tabone">
            <span class="titlename">每周下线充值奖励</span>
            <p class="items">
                <span>充值金额（c币）</span>
                <span>奖励金额（c币）</span>
            </p>
             <p class="items_money">
                <span>100000</span>
                <span>500</span>
            </p>
             <p class="items_money">
                <span>300000</span>
                <span>1500</span>
            </p>
             <p class="items_money">
                <span>600000</span>
                <span>3000</span>
            </p>
             <p class="items_money">
                <span>1000000</span>
                <span>5000</span>
            </p>
             <p class="items_money">
                <span>2000000</span>
                <span>10000</span>
            </p>
             <p class="items_money">
                <span>4000000</span>
                <span>20000</span>
            </p>
             <p class="items_money">
                <span>6000000</span>
                <span>30000</span>
            </p>
            </div>
             <div class="tabone">
            <span class="titlename">每周下线流水奖励（只计算下注负分流水）</span>
            <p class="items">
               <span>固盘流水金额（c币）</span>
                <span>奖金金额（c币）</span>
            </p>
             <p class="items_money">
                <span>100000</span>
                <span>200</span>
            </p>
             <p class="items_money">
                <span>300000</span>
                <span>600</span>
            </p>
             <p class="items_money">
                <span>600000</span>
                <span>12000</span>
            </p>
             <p class="items_money">
                <span>1000000</span>
                <span>20000</span>
            </p>
             <p class="items_money">
                <span>2000000</span>
                <span>40000</span>
            </p>
             <p class="items_money">
                <span>4000000</span>
                <span>80000</span>
            </p>
             <p class="items_money">
                <span>6000000</span>
                <span>120000</span>
            </p>
             <p class="items">
                <span>对冲盘流水金额（c币）</span>
                <span>奖金金额（c币）</span>
            </p>
              <p class="items_money">
                <span>100000</span>
                <span>200</span>
            </p>
             <p class="items_money">
                <span>300000</span>
                <span>600</span>
            </p>
             <p class="items_money">
                <span>600000</span>
                <span>12000</span>
            </p>
             <p class="items_money">
                <span>1000000</span>
                <span>20000</span>
            </p>
             <p class="items_money">
                <span>2000000</span>
                <span>40000</span>
            </p>
             <p class="items_money">
                <span>4000000</span>
                <span>80000</span>
            </p>
             <p class="items_money">
                <span>6000000</span>
                <span>120000</span>
            </p>
            </div>
              
        </div> -->
        <span class="itemcon">3.若推广员推广期间出现作弊行为，将取消其推广员资格；</span>
        <span class="itemcon">4.本次推广活动解释权归《丰收电竞》所有；</span>


    </div>
    
</template>
<script>
export default {
  name: "Tabmoney"
};
</script>
<style scoped lang='scss'>
.tabsCon {
  width: 951px;
  padding-bottom: 55px;
  background: rgba(54, 53, 58, 1);
  margin-left: 30px;
  .promoterfare {
    font-size: 14px;
    font-family: MicrosoftYaHei;
    font-weight: 400;
    color: rgba(220, 220, 220, 1);
    line-height: 48px;
    margin-left: 23px;
    text-align: left;
  }
  .itemcon {
    display: block;
    width: 500px;
    font-size: 13px;
    font-family: ArialMT;
    font-weight: 400;
    color: rgba(220, 220, 220, 1);
    line-height: 32px;
    text-align: left;
    margin-left: 47px;
  }
}
.tablewap {
  width: 401px;
  margin-left: 62px;
  .titlename {
    display: block;
    text-align: left;
    font-size: 13px;
    font-family: MicrosoftYaHei;
    font-weight: 400;
    color: rgba(220, 220, 220, 1);
    line-height: 25px;
  }
}
.tabone {
  width: 100%;
  margin-bottom: 30px;
  .items {
    display: flex;
    width: 100%;
    background: rgba(74, 74, 80, 1);
    span {
      flex: 1;
      font-size: 14px;
      border: 1px solid #434343;
      height: 24px;
      align-items: center;
      line-height: 24px;
      color: #080808;
    }
  }
  .items_money {
    display: flex;
    width: 100%;
    span {
      font-size: 13px;
      flex: 1;
      border: 1px solid #434343;
      height: 24px;
      align-items: center;
      line-height: 24px;
      color: #000;
      color: #dcdcdc;
    }
  }
}
</style>


