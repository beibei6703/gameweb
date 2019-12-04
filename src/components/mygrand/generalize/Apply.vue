
<template>
    <div>
        <div class="appliCon" v-if="status !=2">
            <span class="applyTit">申请条件</span>
            <p class="applyText">需VIP2才能进行成为推广员</p>
            <span class="applyTit">申请须知</span>
            <div class="applycontent">
              <Protocol></Protocol>
            </div>
            <div class="checkCon">
              <div class="checks" @click="getcheck">
                <img src="../../../assets/images/promoter/checks.png" alt="" v-if="showImg==true">  
              </div>
              <span class="agreeCon">我已阅读并同意申请须知</span>
             
            </div>
             <span class="redCom" v-show="this.showImgtext" >请先阅读并同意申请须知</span>
             <button class="btn" @click="apply">立即申请</button>
        </div>
        <Promoter v-if="status ==2"></Promoter>

    </div>
</template>

<script>
import Http from "../../../common/http.js";
import Protocol from './Protocol'
export default {
  name: "Apply",
  components:{Protocol},
  data() {
    return {
      status: "",
      isPromoter: true,
      // isDisabled: false,
      isChecked: true,
      showImg: false,
      noshow:false,
      showImgtext:false,
    };
  },
  methods: {
    getcheck() {
      this.showImg = !this.showImg;
      this.showImgtext=!this.showImg
    
    },
    //判断是否为推广员
    getpromoter() {
      // user/channel/info
      
      Http.get("user/channel/info").then(response => {
        this.status = response.data.data.status;
        if (this.status == 2) {
          this.isPromoter = true;
        }else{
            this.isPromoter = false;
             this.$router.push('check')
        }
      });
    },

    apply() {
      if(this.showImg){
        this.$router.push("applyagain");
      }else{
        this.showImgtext=true;
      }
      
    }
  },
  created() {
    this.getpromoter();
  }
};
</script>

<style scoped lang="scss">
.appliCon {
  padding-bottom: 20px;
}
.applyTit {
  display: block;
  text-align: left;
  margin-left: 36px;
  margin-top: 25px;
  height: 13px;
  font-size: 15px;
  font-family: MicrosoftYaHei;
  font-weight: 400;
  color: #dcdcdc;
}
.applyText {
  height: 12px;
  font-size: 14px;
  font-family: ArialMT;
  font-weight: 400;
  color: #dcdcdc;
  width: 100%;
  text-align: left;
  margin: 25px 0 15px 74px;
}
.applycontent {
  width: 938px;
  background: rgba(54, 53, 58, 1);
  margin-left: 28px;
  margin-top: 11px;
  margin-bottom: 30px;
}

.checkCon {
  width: 100%;
  display: flex;
  justify-content: center;
   padding-top:15px;
  .agreeCon {
    margin-left: 10px;
  // margin-top:10px;
    height: 12px;
    font-size: 12px;
    font-family: MicrosoftYaHei;
    font-weight: 400;
    color: rgba(131, 131, 132, 1);
  }
}
.checks {
  width: 12px;
  height: 12px;
  border: 2px solid #838384;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  img {
    width: 100%;
  }
}
.btn {
  width: 80px;
  height: 28px;
  line-height: 28px;
  text-align: center;
  color: #7e4b08;
  font-size: 15px;
  margin-top: 20px;
  background: url(../../../assets/images/promoter/applybtnp.png) no-repeat
    center;
  border: 0;
  background-size: 100%;
  &:hover {
    background: url(../../../assets/images/promoter/applybtnh.png) no-repeat
      center;
  }
}
.redCom{
  font-size:12px;
  display: block;
  color:#f00;
  margin-top:5px;
  // display:none;
}
</style>

