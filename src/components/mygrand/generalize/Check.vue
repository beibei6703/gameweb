
<template>
    <!--<div>-->
      <div clsee="contain" :data-status="status">
         <div class="applyknow">
          <span class="applyfill">填写申请:</span>
          <div class="konwCon1" :data-user="user">
            <p class="nameinput">
              <span>姓 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;名：</span>
              <input type="text" v-model="user.name" readonly>
            </p>
            <p class="nameinput margins">
              <span>联系方式：</span>
              <input type="text" v-model="user.mobile" readonly>
            </p>
          </div>
        </div>
        <p class="botom1" v-if="status==1" style="margin-bottom:25px">申请已提交，正在审核中……</p>
        <div class="failCon" v-if="status==-1" style="margin-bottom:25px">
          <span class="aplog">很抱歉，本次申请未能通过</span>
          <span>7个工作日后可再次申请</span>
        </div>
        <p class="botom" v-if="status==-2" style="margin-bottom:25px">您的推广资格已被取消，若有疑问请联系客服</p>
        <div class="applyknow">
          <span class="applynotic">申请须知:</span>
          <div class="konwCon">
            <Protocol></Protocol>

          </div>
        </div>

      </div>

    <!--</div>-->
</template>

<script>
import Http from "@/common/http";
import bus from "@/bus";
import Protocol from './Protocol'
export default {
  name: "Check",
  components:{Protocol},
  data() {
    return {

      show: 2,
      status: "",
      user: {}
    };
  },
  created() {
    this.getstatus();
    // bus.$on("trandata", this.handledata);
  },
  beforeDestroy() {
    // bus.$off("trandata", this.handledata);
  },
  methods: {
    handledata(res) {
      this.user = res;
      // console.log(this.user)
    },
    getstatus() {
      Http.get("user/channel/info").then(response => {
        if(response.data.code ==0){
           this.status = response.data.data.status;
          console.log("zhekidssdjdsjdsj", this.status)
          this.user =  response.data.data
          if(this.status ==2){
            this.$router.push("generalize")
          }
        } 
      });
    }
  }
};
</script>

<style scoped lang="scss">
.contain{
  margin-bottom:30px;
  // padding-bottom:30px;
}
.applyknow {
  clear: both;
  .applynotic {
    display: block;
    text-align: left;
    font-size: 16px;
    margin-left: 37px;
    margin-top: 20px;
  }
  .applyfill {
    display: block;
    text-align: left;
    font-size: 16px;
    margin-left: 37px;
    margin-top: 16px;
  }
  .konwCon {
    margin-top: 11px;
    margin-left: 29px;
    width: 951px;
    // height: 340px;
    background: rgba(54, 53, 58, 1);

  }
  .konwCon1 {
    padding-top: 41px;
    margin-top: 11px;
    margin-left: 29px;
    width: 950px;
    height: 180px;
    background: rgba(54, 53, 58, 1);
  }
}
.botom {
  margin-top: 20px;
  font-size: 15px;
  color: #838383;
}
.botom1 {
  margin-top: 20px;
  font-size: 15px;
  color: #c29836;
}
.failCon {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .aplog {
    margin-top: 20px;
    color: #ba323b;
  }
  span {
    font-size: 15px;
    color: #838383;
    margin-bottom: 8px;
  }
}
.margins {
  margin-top: 20px;
}
.nameinput {
  // display: block;
  // width:56px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  height: 28px;
  line-height: 28px;
  font-size: 14px;
  font-family: MicrosoftYaHei;
  font-weight: 400;
  color: rgba(220, 220, 220, 1);
  span {
    margin-left: 47px;
    height: 28px;
    line-height: 28px;
    text-align: right;
    display: block;
    text-align: justify;
  }
  input {
    color: #ffffff;
    height: 28px;
    background: none;
    width: 240px;
    margin-left: 21px;
    outline: none;
    border: 1px solid #434343;
    padding-left:12px;
  }
}
</style>

