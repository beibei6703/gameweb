<template>
  <div id="takein">
    <!-- <div class="title">参与人数：12人</div> -->
    <div class="title">参与人数：{{playernum}}人</div>
    <!-- <div class="takeinavatar" :style="{height:players.length<60?'610px':Math.ceil((players.length-60)/10)*85+610+'px'}"> -->
    <div class="takeinavatar">
      <!-- <div class="takeinavatar-border" v-for="(items,index) in Math.ceil(players.length/10)" :keys="index" :style="{top:32+120*index+'px'}"></div> -->
      <ul>
        <li v-for="(item,index) in players" :key="index">
          <img :src="item.avatar" alt="">
        </li>
      </ul>
    </div>



    <!-- <div class="takeinavatar">
      <ul>
        <li><img src="../../assets/images/404.png" alt=""></li>
        <li><img src="../../assets/images/404.png" alt=""></li>
        <li><img src="../../assets/images/404.png" alt=""></li>
        <li><img src="../../assets/images/404.png" alt=""></li>
        <li><img src="../../assets/images/404.png" alt=""></li>
        <li><img src="../../assets/images/404.png" alt=""></li>
        <li><img src="../../assets/images/404.png" alt=""></li>
        <li><img src="../../assets/images/404.png" alt=""></li>
        <li><img src="../../assets/images/404.png" alt=""></li>
        <li><img src="../../assets/images/404.png" alt=""></li>
        <li><img src="../../assets/images/404.png" alt=""></li>
        <li><img src="../../assets/images/404.png" alt=""></li>
        <li><img src="../../assets/images/404.png" alt=""></li>
        <li><img src="../../assets/images/404.png" alt=""></li>
        <li><img src="../../assets/images/404.png" alt=""></li>
        <li><img src="../../assets/images/404.png" alt=""></li>
        <li><img src="../../assets/images/404.png" alt=""></li>
        <li><img src="../../assets/images/404.png" alt=""></li>
        <li><img src="../../assets/images/404.png" alt=""></li>
        <li><img src="../../assets/images/404.png" alt=""></li>
        <li><img src="../../assets/images/404.png" alt=""></li>
        <li><img src="../../assets/images/404.png" alt=""></li>
        <li><img src="../../assets/images/404.png" alt=""></li>
        <li><img src="../../assets/images/404.png" alt=""></li>
        <li><img src="../../assets/images/404.png" alt=""></li>
        <li><img src="../../assets/images/404.png" alt=""></li>
        <li><img src="../../assets/images/404.png" alt=""></li>
        <li><img src="../../assets/images/404.png" alt=""></li>
        <li><img src="../../assets/images/404.png" alt=""></li>
        <li><img src="../../assets/images/404.png" alt=""></li>
        <li><img src="../../assets/images/404.png" alt=""></li>
        <li><img src="../../assets/images/404.png" alt=""></li>
        <li><img src="../../assets/images/404.png" alt=""></li>
        <li><img src="../../assets/images/404.png" alt=""></li>
        <li><img src="../../assets/images/404.png" alt=""></li>
        <li><img src="../../assets/images/404.png" alt=""></li>
        <li><img src="../../assets/images/404.png" alt=""></li>
        <li><img src="../../assets/images/404.png" alt=""></li>
        <li><img src="../../assets/images/404.png" alt=""></li>
        <li><img src="../../assets/images/404.png" alt=""></li>
        <li><img src="../../assets/images/404.png" alt=""></li>
        <li><img src="../../assets/images/404.png" alt=""></li>
        <li><img src="../../assets/images/404.png" alt=""></li>
        <li><img src="../../assets/images/404.png" alt=""></li>
        <li><img src="../../assets/images/404.png" alt=""></li>
        <li><img src="../../assets/images/404.png" alt=""></li>
        <li><img src="../../assets/images/404.png" alt=""></li>
        <li><img src="../../assets/images/404.png" alt=""></li>
        <li><img src="../../assets/images/404.png" alt=""></li>
        <li><img src="../../assets/images/404.png" alt=""></li>
        <li><img src="../../assets/images/404.png" alt=""></li>
        <li><img src="../../assets/images/404.png" alt=""></li>
        <li><img src="../../assets/images/404.png" alt=""></li>
        <li><img src="../../assets/images/404.png" alt=""></li>
        <li><img src="../../assets/images/404.png" alt=""></li>
        <li><img src="../../assets/images/404.png" alt=""></li>
        <li><img src="../../assets/images/404.png" alt=""></li>
        <li><img src="../../assets/images/404.png" alt=""></li>
        <li><img src="../../assets/images/404.png" alt=""></li>
        <li><img src="../../assets/images/404.png" alt=""></li>
        <li><img src="../../assets/images/404.png" alt=""></li>
        <li><img src="../../assets/images/404.png" alt=""></li>
        <li><img src="../../assets/images/404.png" alt=""></li>
        <li><img src="../../assets/images/404.png" alt=""></li>
        <li><img src="../../assets/images/404.png" alt=""></li>
      </ul>
      <div class="clear"></div>
    </div> -->
  </div>
</template>

<script>
  import Http from "../../common/http";
  import config from "../../common/http-config";
  export default {
    data () {
      return {
      }
    },
    props: [
      'players',
      'playernum'
    ],
    created () {
    },
  }
</script>

<style scoped lang="scss">
#takein{
  height: 448px;
  margin-top:30px;
  position: relative;
  background: url('../../assets/images/freeturn/takeinbg.png');
  .title{
    height: 14px;
    font-size: 14px;
    font-weight: 700;
    color:#e6ded4;
    position: absolute;
    top:56px;
    right:86px;
  }
  .takeinavatar{
    width: 628px;
    height: 286px;
    position:absolute;
    top:74px;
    left:91px;
    padding-left:30px;
    padding-top:34px;
    overflow-y:auto;
    &::-webkit-scrollbar {
        width:4px;
    }
    &::-webkit-scrollbar-button {
      display: none;
    }
    &::-webkit-scrollbar-track{
      background-color: transparent;
    }
    &::-webkit-scrollbar-thumb{
      background-color: #b11c1c;
      border-radius: 2px;
    }
    li{
      width: 50px;
      height: 50px;
      margin-bottom: 30px;
      margin-right:22px;
      float: left;
      border-radius: 50%;
      border:1px solid #b11c1c;
      img{
        width: 48px;
        border-radius: 50%;
        height: 48px;
      }
    }
  }
}

</style>
