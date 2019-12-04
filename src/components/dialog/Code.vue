<template>
 <!-- <div id="signin" v-show="isshow"> -->
 <div id="signin" v-if="Isshowcode">
      <div class="fail wrap_signin_h258 wrap_signin" >
        <i  class="x fright pointer x_258" @click="handleclose"></i>
       <div class="imgscon">
        <img :src="wap" alt="" class="imgCode">
       </div>
       <div class="btnBottom">
         <button @click="saves('imgCode')" class="savebtn">保存</button>  
       </div>
      </div>
 </div>
</template>
<script>
import Http from "@/common/http";
export default {
  name: "Cose",
  data() {
    return {
      wap: ""
    };
  },
  props: {
    // userInfo: {
    //   type: Object,
    //   required: true
    // }
  },
  computed: {
    Isshowcode() {
      return this.$store.state.promoter.showCode;
    }
  },
  created() {
    this.getdata();
  },
  methods: {
    handleclose() {
      this.$store.commit("changecode", false);
    },
    getdata() {
      Http.get("user/channel/details").then(res => {
        // console.log("tuinnm",res.data.code)
        if (res.data.code == 0) {
          this.wap = res.data.data.links.wap;
        }
      });
    },
    saves(selector, name) {
         var a = document.createElement('a')
        // 将a的download属性设置为我们想要下载的图片名称
        a.download = name || 'pic'
        // 将生成的URL设置为a.href属性
        a.href = this.wap
        // 触发a的单击事件
        a.click();
    }
  },
  watch: {}
};
</script>
<style lang="scss" scoped>
#signin .wrap_signin_h258 {
  margin-top: -130px !important;
  margin-left: -220px !important;
  width: 600px;
  height: 480px;
  background: url(/static/img/com_dia_bg.77cdc81.jpg) no-repeat;
  background-size: cover;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
}
.fail {
  position: relative;
  top: 300px;
  left: 400px;
  .congratulation {
    margin-top: 10px;
    margin-left: 150px;
    width: 108px;
    height: 54px;
    line-height: 54px;
    font-size: 36px;
    text-align: left;
    font-family: SourceHanSansSC-regular;
  }
  .bonus {
    line-height: 20px;
    margin-top: 65px;
    font-size: 14px;
    text-align: center;
    font-family: Roboto;
  }
  .closebtn {
    border: none;
    background: url("../../assets/images/competeImg/guess_b2.png") repeat;
    width: 94px;
    height: 32px;
    line-height: 32px;
    color: #794e0d;
    border-radius: 3px;
    position: absolute;
    top: 200px;
    left: 40%;
    &:hover {
      background: url("../../assets/images/mygrand/c_h_1_32.png") repeat;
      color: #794e0d;
    }
  }
}
.imgscon {
  width: 240px;
  height: 240px;
  display: flex;
  justify-content: center;
  align-items: center;
  img {
    width: 100%;
  }
}
.btnBottom {
  margin-top: 34px;
  display: flex;
  justify-content: center;
  .savebtn {
    outline: none;
    width: 117px;
    height: 40px;
    text-align: center;
    border: 1px solid rgba(220, 220, 220, 1);
    font-size: 16px;
    font-family: SourceHanSansCN-Light;
    font-weight: 300;
    color: rgba(220, 220, 220, 1);
    background: none;
  }
}
</style>


