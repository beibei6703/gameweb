<template>
  <div  id="signin" v-show="isshow">
      <div class="wrapmain">
          <div class="top">
              <p class="fleft title">微信支付</p>
              <p class="x fleft wxx" @click="handclose"></p>
          </div>
          <div class="content">
              <div class="left fleft">
                  <div class="ltop">
                      <img src="../../assets/images/mygrand/saoma.png" alt="" class="fleft">
                      <p class="tip">请使用微信二维码扫描二维码支付</p>
                  </div>
                  <div class="lbtom">
                      <img :src="src" alt="" class="wxsao">
                      <p class="timetip">二维码有效时长为6分钟，请尽快支付！</p>
                  </div>
              </div>
              <div class="right fleft">
                  <img src="../../assets/images/mygrand/phone.png" alt="" class="rimg">
              </div>
          </div>
      </div>
  </div>
</template>
<script>
export default {
  data () {
      return {
          
      }
  },
  props:['isshow','src'],
  methods: {
      handclose(){
          this.$emit('closeme',false)
      }
  }
}
</script>
<style lang="scss" scoped>
    #signin{
        .wrapmain{
            width: 810px;
            height: 480px;
            margin: 180px auto;
            position:absolute;
            top:50%;
            left: 50%;
            margin-left:-405px;
            margin-top: -240px;
            background: url("../../assets/images/mygrand/wxbg.jpg") center no-repeat;
            .top{
                width: 810px;
                height:40px;
                position: relative;
                left: 0;
                top: 0;
                // background: #393b41;
            }
            .title{
                width: 100px;
                line-height: 40px;
                font-size: 16px;
                color: #ffd35e;
                padding-left: 22px;
            }
            .wxx{
                top:12px;
            }
            .content{
                // background: #1b1d22;
                height:442px ;
                padding: 50px 0 54px 0;
                box-sizing: border-box;
            }
            .left{
                width:408px;
                
            }
            .ltop{
                width: 188px;
                height: 55px;
                margin:0 auto;
                img{
                    width: 45px;
                    height: 45px;
                    display: block;
                    margin-right: 6px;
                }
            }
            .tip{
                width: 180px;
                text-align: left;
                font-size: 16px;
                line-height: 24px;
            }
            .lbtom{
                height:300px ;
                width: 288px;
                margin:10px auto;
                .wxsao{
                    display: block;
                    width: 218px;
                    height: 218px;
                    border-radius: 3px;
                    padding: 30px;
                    border:1px solid #3d3d3f;
                    margin:0 auto;
                }
                .timetip{
                    font-size: 14px;
                    color: #989898;
                    line-height: 21px;
                    margin-top: 22px;      
                }
            }
            .rimg{
                width:240px;
                height: 334px;
                margin-left: 38px;
            }
        }
    }
</style>


