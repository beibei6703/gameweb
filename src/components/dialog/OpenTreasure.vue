<template>
  <div id="openTreasure">
    <div class="openTreasureMask">
      <div class="openTreasureMain" v-if="prizeOfTreasureData">
           <p class="close pointer" @click="fnClose()">X</p>
          <img src="../../assets/img/mybag/top.png" alt="" class="top">
          <div class="main">
          <div class="getCai"  v-if="prizeOfTreasureData.totalCai>0" :class="{onlyCai:prizeOfTreasureData.totalDebris<=0 && prizeOfTreasureData.prop.length<0}">
            <img src="../../assets/img/mybag/cai.png" alt="" class="cai_img">
            <p class="get_nums" >菜币{{thousandBitSeparator(prizeOfTreasureData.totalCai)}} c</p>
          </div>
          <div class="getDebris" v-if="prizeOfTreasureData.totalDebris>0" :class="{onlyDebris:prizeOfTreasureData.totalCai<=0 &&  prizeOfTreasureData.prop.length<0}">
              <img src="../../assets/img/mybag/debris.png" alt="" class="debris_img">
              <p class="get_nums">碎片{{thousandBitSeparator(prizeOfTreasureData.totalDebris)}} p</p>
          </div>
          <ul class="getItems" v-if="prizeOfTreasureData.prop.length>0">
            <li v-for="item in prizeOfTreasureData.prop" :key="item.product_id">
              <img :src="item.product_pic" alt="" class="items_img">
              <p class="img_mask"></p>
              <p class="names_nums">{{item.product_name}} x {{item.num}}</p>
            </li>
          </ul>
         </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {

      }
    },
    computed: {
      prizeOfTreasureData(){
        return this.$store.state.mall.prizeOfTreasureData || null;
      },
      treasureName(){
        return this.$store.state.mall.treasureName || null;
      }
    },
    methods: {
      fnClose() {
        this.$store.dispatch("mybag");
        this.$store.dispatch("bag_treasure_dis");
        this.$store.commit('mutationPrizeBoxShow',false)
      }
    },
  }
</script>

<style scoped lang="scss">
  #openTreasure{
    width: 100%;
    height: 100%;
    position: fixed;
    top:0;
    right: 0;
    bottom: 0;
    left: 0;
    outline: 0;
    z-index: 88;
    .openTreasureMask{
      position: fixed;
      top:0;
      right: 0;
      bottom: 0;
      left: 0;
      outline: 0;
      background: rgba(5,6,6,.8);
      .openTreasureMain{
        width: 643px;
        min-height: 200px;
        position: fixed;
        top:50%;
        left: 50%;
        transform: translate(-50%,-50%);
        z-index: 2;
        padding-bottom: 10px;
        border:1px solid #fee54d;
        background: #202126;
        box-shadow: 0px 0px 5px #dcdcdc;
        .top{
          width: 640px;
          height: 98px;
        }
        .close{
          position: absolute;
          top:10px;
          right: 24px;
          color: #999;
          font-size: 20px;
        }
        .title{
          text-align: center;
          font-size: 30px;
          line-height: 66px;
          color: #fee54d;
        }
        .congratulations{
          text-align: center;
          font-size: 18px;
          color: #d1a228;
          line-height: 76px;
        }
        .getCai,.getDebris{
          width: 100%;
          height: 72px;
          display: flex;
          justify-content: center;
        }
        .getDebris{
          background: url("../../assets/img/mybag/sperate.png") center no-repeat;
          padding: 0 70px;
          height: 88px;
        }
        .cai_img,.debris_img{
          display: block;
          margin-right: 18px;
          margin-top: 30px;
        }
        .cai_img{
          width: 26px;
          height: 18px;
          margin-top: 26px;
        }
        .debris_img{
          width: 30px;

          height: 28px;
        }
        .get_nums{
          font-size: 16px;
          color: #fff;
          line-height: 88px;
        }
        .getItems{
          display: flex;
          padding: 0  40px;
          justify-content: space-around;
          flex-wrap: wrap ;
          margin-top:20px;
          li{
            position: relative;
            width:110px;
            height: 120px;
            padding: 12px;
            margin-bottom: 18px;
            .img_mask{
              width: 84px;
              height: 85px;
              position: absolute;
              top:5px;
              left: 7px;
              z-index: 2;
              background: url("../../assets/img/mybag/propsBorder.png") center  no-repeat;
              background-size: cover;
            }
            .items_img{
              width: 76px;
              height: 76px;
              display: block;
            }
            .names_nums{
              text-align: center;
              color: #fff;
              font-size: 14px;
              margin-top: 8px;
              transform: scale(0.8);
              width: 166px;
              margin-left: -44px;
            }
          }
        }
        .onlyCai{
          margin-top:70px;
          background: url("../../assets/img/mybag/sperate.png") center no-repeat;
        }
        .onlyDebris{
          margin-top: 60px;
        }
      }
    }
  }
</style>
