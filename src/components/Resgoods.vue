<template>
    <div id="pay">
        <div class="left fleft">
            <p class="theme">账户充值 <span class="arrow">></span></p>
            <p class="test pointer" @click="handleshow">show</p>
        </div>
        <div class="right fleft">
            <Topup/>
        </div>
        <div class="wxdialog">
            <Wx  :isshow ='isStatus'  @closeme='closechild'></Wx>
        </div>
    </div>
</template>
<script>
import Topup from "./mygrand/Topup"
import Paysuccess from './mygrand/Paysuccess'
import Wx from "./dialog/Wx"
export default {
  data () {
      return {
          isStatus:false
      }
  },
  components: {
      Topup,
      Paysuccess,
      Wx
  },
  methods: {
      handleshow(){
          this.isStatus=!this.isStatus
      },
      closechild(value){
          this.isStatus=value;
      }
  }
}
</script>
<style lang='scss'scoped>
    #pay{
        height: 938px;
        width: 1200px;
        margin:50px auto;
        .left{
            width: 270px;
            height: 938px;
            background-color: #15161a;
        }
        .right{
            width: 930px;
            height: 938px;
            background-color: #242628;
        }
        .theme{
            color: #e1c076;
            height: 66px;
            line-height: 66px;
            font-size: 18px;
            text-align: center;
            position: relative;
            left: 0;
            top: 0;
        }
        .arrow{
            position: absolute;
            right: 14px;
            top:-2px;
        }
    }
</style>


