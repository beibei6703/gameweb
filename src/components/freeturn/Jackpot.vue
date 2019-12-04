<template>
  <div id="jackpot">
    <div class="prizes">
      <ul>
        <li v-for="index in 10" :key="index" :style="{border:getFreeturnPlayers>=index?'1px solid #b11c1c':'1px solid #705e54'}" v-if="pooldata">
          <div class="imgpic" :style="{background:'url('+pooldata.pic+') no-repeat'}" :class="getFreeturnPlayers<index?'blur':''">
          <!-- <div class="imgpic" :class="pooldata.count<index?'blur':''"> -->
          </div>
          <div class="question" v-if="getFreeturnPlayers<index"></div>
        </li>
        <!-- <li>
          <div class="imgpic blur"></div>
          <div class="question"></div>
        </li> -->
      </ul>
    </div>
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
      'pooldata'
    ],
    created () {
    },
    computed:{
      getFreeturnPlayers(){
        let playerNum=this.$store.state.shop.freeturnplayer?this.$store.state.shop.freeturnplayer.length:0;
        // let playerNum=900;
        let count =parseInt((playerNum)/100)+1;
        // console.log(count,'count')

      return count;
    },
    },
  }
</script>

<style scoped lang="scss">
#jackpot{
  height: 620px;
  position: relative;
  background: url('../../assets/images/freeturn/jackpotbg.png') no-repeat;
  .prizes{
      height: 382px;
      width: 664px;
      // background-color: #fff;
      position: absolute;
      top:150px;
      left:58px;
      padding-top:45px;
      padding-left:32px;
    li{
      width: 98px;
      height: 128px;
      margin-right:20px;
      margin-bottom: 25px;
      border:1px solid #b11c1c;
      cursor: default;
      float: left;
      position: relative;
      .imgpic{
        width: 90px;
        height: 120px;
        margin: 3px;
        border-radius: 3px;
        background: url('https://imgcdn.api.com//avatar/aa/5b7f05dc7f9078dbeecd9e23e6c402.png');
        background-size: 90px 120px !important;
        // background: url('../../assets/images/qq.jpg') no-repeat;
      }
      .question{
        width: 34px;
        height: 34px;
        border-radius: 50%;
        position: absolute;
        left:50%;
        top:50%;
        text-align: center;
        transform: translate(-50%,-50%);
        background: url('../../assets/images/freeturn/question.png');
      }
      // .cover{
      //   position: absolute;
      //   width: 90px;
      //   height: 120px;
      //   border-radius: 3px;
      //   background: #fff url('../../assets/images/mark.png') center center no-repeat;
      //   top:8px;
      //   left:9px;
      //   opacity: .7;
      // }
      .blur {
          -webkit-filter: blur(10px); /* Chrome, Opera */
            -moz-filter: blur(10px);
              -ms-filter: blur(10px);
                  filter: blur(10px);
      }
    }
  }
}
</style>
