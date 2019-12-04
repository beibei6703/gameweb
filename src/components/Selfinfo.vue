<template>
  <div class="selfinfo">
    <div class="picwrap">
      <div class="pic" v-if="userinfoshowlist">
        <img src="../assets/images/vips/v0.png" alt="" class="vipimg fleft valign" v-if="userinfoshowlist.vip_level==0">
        <img :src="require('@/assets/images/vips/VIP'+userinfoshowlist.vip_level+'.png')" alt="" class="vipimg fleft valign" v-if="userinfoshowlist.vip_level>=1">
        <div class="tip fleft">
          <div class="tiptop">
            <p class="needs fleft" v-if="userinfoshowlist">
              <span class="help" @mouseover="helptipshows" @mouseout="helptiphides"></span>
              还需{{vipexp}}vip经验可升级到 <span class="vip" >VIP{{userinfoshowlist.vip_level+1}}</span>
            </p>
            <!-- 特权暂时不需要，需要时取消注释即可 -->
            <!-- <button class="vipbtn pointer" @click="showVipInfo=true">VIP特权</button> -->
          </div>
          <div class="helptip" v-if="helptiphide">
              <!-- <h3 class="helptip_info">每充值或预测预测100C,均可获得1点VIP经验.</h3> -->
              <h3 class="helptip_info">每充值1元，可以获得1点VIP经验.</h3>
          </div>
          <div class="progress">
            <span class="blue" :style="{width: width+'px'}" v-if="width"></span>
            <span class="exp" v-if="userinfoshowlist">{{userinfoshowlist.now_vip_exp}}/{{userinfoshowlist.expect_vip_exp}}</span>
          </div>
        </div>
        <img :src="require('@/assets/images/vips/VIP'+(userinfoshowlist.vip_level+1)+'.png')" alt="" class="vipimg fleft valign" >
      </div>
    </div>
    <Privilege :isShow="showVipInfo" @closeme="showVipInfo=false"></Privilege>
  </div>
</template>
<script>
  import Privilege from "@/components/dialog/Privilege"
  export default {
    data() {
      return {
        showVipInfo:false,
        helptiphide:false,
      }
    },
    computed: {
      width() {
        if(!this.$store.state.home.userinfoshowlist) return 0;
        return 352 / this.$store.state.home.userinfoshowlist.expect_vip_exp * this.$store.state.home.userinfoshowlist.now_vip_exp
      },
      vipexp() {
        if(!this.$store.state.home.userinfoshowlist) return 0;
        return this.$store.state.home.userinfoshowlist.expect_vip_exp - this.$store.state.home.userinfoshowlist.now_vip_exp
      },
      userinfoshowlist() {
        return this.$store.state.home.userinfoshowlist ? this.$store.state.home.userinfoshowlist : null
      }
    },
    mounted() {
      if(!this.$store.state.home.userinfoshowlist) {
        this.$store.dispatch('userinfoshowdispatch')
      }
    },
    components:{
      Privilege
    },
    methods: {
      helptipshows(){
        this.helptiphide=!this.helptiphide
      },
      helptiphides(){
        this.helptiphide=!this.helptiphide
      },
    }
  }
</script>
<style lang="scss" scoped>
  .selfinfo {
    height: 124px;
    .tip{
      position: relative;
      left: 0px;
      bottom: 0px;
    }
    .helptip{
      width: 154px;
      height: 64px;
      background: url("../assets/images/mygrand/deeptip.png") no-repeat;
      position: absolute;
      top:48px;
      left: -6px;
      z-index: 8;
      .helptip_info{
        font-size: 12px;
        color: #989898;
        width: 134px;
        line-height: 18px;
        text-align: left;
        margin:18px auto;
      }
    }
    .picwrap {
      background: url("../assets/images/mygrand/paybg.jpg") center no-repeat;
      height: 124px;
    }
    .pic {
      height: 100px;
      width: 700px;
      margin: 20px auto;
    }
    .needs {
      font-size: 14px;
      color: #fff;
      .vip {
        color: #e4c670;
      }
    }
    .vipbtn {
      width: 80px;
      height: 30px;
      background: linear-gradient(to bottom, #eed574, #e4ba63);
      color: #632000;
      border: none;
      border-radius: 3px;
      font-size: 14px;
      font-weight: 900;
      border: 1px solid #c39845;
      margin-bottom: 10px;
    }
    .progress {
      width: 352px;
      height: 20px;
      background: #15161a;
      border-radius: 3px;
      position: relative;
      left: 0;
      top: 0;
      .blue {
        background: linear-gradient(to right, #007c85, #013b46);
        width: 20px;
        height: 20px;
        display: inline-block;
        position: absolute;
        left: 0;
        top: 0;
        border-radius: 3px;
        z-index: 2;
      }
      .exp {
        width: 60px;
        font-size: 10px;
        color: #a5b3bc;
        position: absolute;
        right: 0;
        bottom: 0;
        line-height: 20px;
        text-align: right;
        padding-right: 3px;
        z-index: 2;
      }
    }
    .vipimg {
      width: 110px;
      height: 100px;
      margin: 10px 30px;
    }
    .tiptop {
      height: 44px;
      margin-top: 16px;
      padding-left: 12px;
      line-height: 44px;
    }
    .needs {
      // background: url("../assets/images/mygrand/help.png") 2px 15px no-repeat;
      padding-left: 22px;
      position: relative;
      left: 0px;
      top: 0px;
    }
    .help{
      width: 32px;
      height: 32px;
      background: url("../assets/images/mygrand/help.png") 8px center no-repeat;
      // background-size: 32px 32px;
      position: absolute;
      left: -6px;
      top: 6px;
    }
  }
</style>
