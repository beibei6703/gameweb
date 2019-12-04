<template>
  <div id="ShopSuccessPop"  >
    <div class="shopToolsPop" >
      <div class="shopToolsPop-bg">
        <div class="shopToolsPop-box">
          <div class="shopToolsPop-box-bd">
            <div class="shopToolsPop-box-bd-body">
              <div class="box-title">
                <i class="close" @click="Pophide"></i>
                <i class="clear"></i>
              </div>
              <!--购买-->
              <div class="box-body" v-if="tankuang.product_type==1">
                <!--购买icon-->
                <div class="box-body-pic"  >
                  <img src="../../assets/images/Mall-images/buy-success.png" >
                </div>
                <!--购买-->
                <div class="box-body-text-give"  style="text-align: center">
                  <div class="box-body-give"><span class="give-name inline-block">成功购买：</span><span class="give-namethis">{{tankuang.name}} x{{tankuang.num}}</span></div>
                  <div style="height: 20px"></div>
                </div>
                <!--按钮-->
                <div class="box-body-btn">
                  <span class="box-boyd-btn-ok block" @click="Pophide"></span>
                </div>
              </div>
              <!--赠送-->
              <div class="box-body" v-if="tankuang.product_type==2">
                <!--赠送icon-->
                <div class="box-body-pic">
                  <img src="../../assets/images/Mall-images/give-success.png" >
                </div>
                <!--赠送-->
                <div class="box-body-text-give">
                  <div class="box-body-give"><span class="give-name inline-block">赠送道具：</span><span class="give-namethis">{{tankuang.name}} x{{tankuang.num}}</span></div>
                  <div style="height: 20px"></div>
                  <div class="box-body-give"><span class="give-nameget inline-block">赠送给：</span><span class="give-nameplayer">{{tankuang.receive_nickname}}</span></div>
                </div>
                <!--按钮-->
                <div class="box-body-btn">
                  <span class="box-boyd-btn-ok block" @click="Pophide"></span>
                </div>
              </div>
              <!--兑换-->
              <div class="box-body" v-if="tankuang.product_type==3">
                <!--兑换icon-->
                <div class="box-body-pic">
                  <img src="../../assets/images/Mall-images/exchange-success.png" >
                </div>
                <!--兑换-->
                <div class="box-body-text-give" style="font-size: 12px;text-align: center">
                  <div class="box-body-give"><span class="give-name inline-block">提示：</span><span class="give-namethis">{{tankuang.masseges}}</span></div>
                  <div style="height: 20px"></div>
                </div>
                <!--兑换-->
                <div class="box-body-btn">
                  <span class="box-boyd-btn-ok block" @click="Pophide"></span>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        isclose:false,
      }
    },
    methods:{
      Pophide:function () {
        this.$store.commit('tankuang',false);
      }
    },
    computed:{
      tankuang:function(){
        return this.$store.state.shop.tan_kuang
      }
    }
  }
</script>
<style scoped lang="scss">
  /*公用*/
  .fl{float:left;}
  .fr{float:right;}
  .clear{clear:both;margin:0;padding:0;display:block;}
  .allbody{width:1200px; margin-left:auto; margin-right:auto;}
  .hide{display: none}
  .show{display: block}
  .ImgOut{
    position:relative;left:0; top:0;overflow:hidden;
  span{
    display:table-cell; text-align:center;vertical-align: middle;
  img{max-width:100%; max-height:100%; display:inline-block;}
  }
  }
  .pr{
    position: relative;
  }
  .block{
    display: block;
  }
  .inline-block{
    display: inline-block;
  }

  //框
  .shopToolsPop {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    outline: 0;
    z-index: 999999;
    .shopToolsPop-bg{
      position: fixed;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      outline: 0;
      background: rgba(5,6,6,0.8);
      .shopToolsPop-box{
        position:fixed;
        top:50%;
        left:50%;
        margin:-282px 0 0 -251px;
        display: block;
        z-index:2;
        width: auto;
        transform: translate(0,0);
        border-radius: 5px;
        .shopToolsPop-box-bd{
          display: table-cell;
          vertical-align: middle;
          box-sizing: border-box;
          .shopToolsPop-box-bd-body{
            width: 442px !important;
            height: 562px;
            background: url('../../assets/images/Mall-images/success-bg.png') no-repeat;
            .box-title{
              position: relative;
              height: 60px;
              width: 100%;
              .close{
                width: 19px;
                height: 19px;
                background: url('../../assets/images/Mall-images/pop-close.png')no-repeat;
                position: absolute;
                right:30px;
                top:17px;
                cursor: pointer;
                display: block;
                transition: all .5s;
              }
              .close:hover{
                background: url('../../assets/images/Mall-images/pop-close1.png')no-repeat ;
                /*background-position: 1px 1px;*/
              }
            }
            .box-body{
              width: 100%;
              .box-body-pic{
                margin-bottom: 40px;
                img{

                }
              }
              /*赠送*/
              .box-body-text-give{
                text-align: left;
                width: 250px;
                height: 60px;
                margin: 0 auto;
                .box-body-give{
                  .give-namethis{
                    color: #c5b78c;
                    line-height: 20px;
                  }
                  .give-nameplayer{
                    color:#989898;
                  }
                  .give-nameget{
                    letter-spacing:5px;
                  }
                }
              }
              /*确定按钮*/
              .box-body-btn{
                span{
                  width: 102px;
                  height: 38px;
                  line-height: 38px;
                  margin: 58px auto 0;
                  border-radius: 3px;
                  color: #996e21;
                  text-align: center;
                  background: url('../../assets/images/Mall-images/success-btn.png') no-repeat;
                  cursor: pointer;
                }
              }
            }
          }
        }
      }
    }
  }
</style>


