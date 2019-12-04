<template>
  <div id="onlinetalk">
    <div class="wrap">
       <a href="itms-services://?action=download-manifest&url=https://api-avatar.oss-cn-shanghai.aliyuncs.com/app/ios/Entitlements.plist"  target="_blank" class="ios fleft"></a>
      <a href="https://api-avatar.oss-cn-shanghai.aliyuncs.com/app/apk/com.shoucaidianjing.guess_V1.03.54.apk" class="andriod fright" target="_blank"></a>
    </div>
    <img src="../assets/images/mygrand/apppng.png" alt="" class="qrcode">
    <a href="" class="save"><img src="https://aqyzmedia.yunaq.com/labels/label_sm_90030.png"></a>
  </div>
</template>
<script>
import Giftbag from './Giftbag'
export default {
  data () {
      return {
          title:"onlinetalk"
      }
  },
  components: {
      Giftbag
  }
}
</script>
<style lang="scss" scoped>
  #onlinetalk{
    width:100%;
    height: 1800px;
    background-image: url("../assets/images/downbg.png");
    position: relative;
  }
  .ios{
    width:182px;
    height: 32px;
    display: block;
    background-image: url("../assets/images/ios.png")
  }
  .andriod{
    width:182px;
    height: 32px;
    display: block;
    background-image: url("../assets/images/andriod.png")
  }
  .wrap{
    position: absolute;
    width:371px;
    height: 32px;
    top:339px;
    right:242px;
  }
  .qrcode{
    position: absolute;
    width: 372px;
    height: 195px;
    display: block;
    top:446px;
    right: 242px;
  }
  .save{
    position: absolute;
    bottom: 0;
    right: 0;
  }
</style>


