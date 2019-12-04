<template>
 <!-- <div id="signin" v-show="isshow"> -->
 <div id="signin" v-if="IsshowDialog">
      <div class="fail wrap_signin_h258 wrap_signin" >
        <p style="height:38px;line-height:38px;">
        <span class="comfir"> 提示</span>
        <i  class="x fright pointer x_258" @click="handleclose"></i>
        </p>
        
        <p class="confirmCon">是否确定提交申请？</p>
       <div class="btnBottom">
         <button @click="getapply" class="confirmBtn">确定</button>
         <button @click="getcancle" class="cancleBtn">取消</button>
       </div>
      </div>
 </div>
</template>
<script>
import Http from "@/common/http";
import bus from "@/bus";
export default {
  name: "Applydialog",
  data() {
    return {};
  },
  // props:['isshow'],
  props: {
    userInfo: {
      type: Object,
      required: true
    }
  },
  computed: {
    IsshowDialog() {
      return this.$store.state.promoter.showdialog;
    }
  },
  mounted() {},
  methods: {
    handleclose() {
      this.$store.commit("changeshow", false);
    },
    /////////
    //  getStatus(){
    //     Http.get('user/channel/info').then(response=>{
    //    const status = response.data.data.status
    //     if(status ==2){
    //     this.$router.push('check')
    //     }
    //   })
    //  },
    getapply() {
      //  console.log(this.userInfo)
      Http.post("user/channel/apply", this.userInfo).then(res => {
        console.log("tuiguamhy", res.data.code);
        if (res.data.code == 0) {
          this.$router.push("check");
        } else {
          this.$store.commit("changeshow", false);
           this.$store.commit("changeShowErrdialog", true);
        }
      });
    },
    getcancle() {
      this.$store.commit("changeshow", false);
    }
  },
  beforeDestroy() {
    bus.$emit("trandata", this.userInfo);
  },
  watch: {}
};
</script>
<style lang="scss" scoped>
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
.confirmCon {
  width: 360px;
    height: 116px;
    margin: 0 auto;
    margin-top: 30px;
    padding-top: 30px;
    line-height: 26px;
     clear: both;
}
.btnBottom {
  margin-top: 15px;
  display: flex;
  justify-content: center;
  button {
    width: 80px;
    height: 28px;
    line-height: 28px;
  }
  .confirmBtn {
    border: 0;
    margin-right: 17px;
    color: #ffffff;

    background: url(../../assets/images/promoter/queren.png) no-repeat center;
  }
  .cancleBtn {
    color: #cea137;
    width: 80px;
    height: 28px;
    border: 1px solid rgba(206, 161, 55, 1);
    border-radius: 2px;
    background: none;
  }
}
.comfir{
      height: 38px;
    line-height: 38px;
    padding-left: 18px;
    font-size:24px;
    float:left;
    color: #e1c076;
}
</style>


