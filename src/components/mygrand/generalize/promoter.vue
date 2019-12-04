<template>
    <div class="promocon">
    <span class="promotertit">推广链接</span>
    <div class="linkCon">
        <p class="linktext">
            <span>{{links}}</span>
        </p>
        <span class="codes" @click="getcodes">二维码</span>
    </div>
    <div class="waterCon">
        <div class="firCon">
            <span class="spanName">本周推广总充值</span>
            <span class="valuseClass">{{recharge.value}}c</span>
          
        </div>
        <div class="firCon">
            <span class="spanName">本周收益 </span>
            <span class="welfare">{{reword}}c</span>
        </div>

    </div>
    <promoterline></promoterline>
    <tabmoney></tabmoney>
   
    <Code></Code>
     <button class="btnPro" @click="lookPro">查看推广员协议</button>
   
    </div>
</template>
<script>
import tabmoney from "./Tabmoney";
import promoterline from "./Promoterline";
import Http from "@/common/http";

export default {
  name: "Promoter",
  components: {
    tabmoney
  },
  data() {
    return {
      links: "",
      recharge:{},
      guess_fixed:{},
      guess_pool:{},
      reword:''


    };
  },
  computed: {
    //  guess_pool_progress(){
    //    let getValue =this.guess_pool.value==undefined?0:this.guess_pool.value;
    //    let getnextGoal =this.guess_pool.next_goal==undefined?1:this.guess_pool.next_goal;
    //       let progressdata = ((getValue/getnextGoal).toFixed(2))*100*2.4
    //       // console.log("23",this.guess_pool.value,getValue,getnextGoal,progressdata)
    //       return progressdata;
    //   },
    //    recharge_progress(){
    //      let getValue =this.recharge.value==undefined?0:this.recharge.value;
    //     let getnextGoal =this.recharge.next_goal==undefined?1:this.recharge.next_goal;
    //     let progressdata = ((getValue/getnextGoal).toFixed(2))*100*2.4
    //       return progressdata;
    //   },
    //   guess_fixed_progress(){
    //     let getValue =this.guess_fixed.value==undefined?0:this.guess_fixed.value;
    //     let getnextGoal =this.guess_fixed.next_goal==undefined?1:this.guess_fixed.next_goal;
    //       let progressdata = ((getValue/getnextGoal).toFixed(2))*100*2.4
    //         return progressdata;
    //   },
    Isshowcode() {
      return this.$store.state.promoter.showCode;
    }
  },
  created() {
    this.getdata();
  },
  methods: {
    getdata() {
      Http.get("user/channel/details").then(res => {
        if (res.data.code == 0) {
          this.links = res.data.data.links.web;
          // this.guess_pool = res.data.data.stats.guess_pool
          // this.guess_fixed = res.data.data.stats.guess_fixed
          this.recharge = res.data.data.stats.recharge
          this.reword = res.data.data.reward
       
        }
      });
    },
    getcodes() {
      console.log(11);
      this.$store.commit("changecode", true);
    },
     lookPro(){
      // console.log(1111)
      this.$router.push("/question?num=6")
    }
  },
 
};
</script>
<style scoped lang="scss">
.promotertit {
  display: block;
  width: 60px;
  height: 13px;
  line-height: 13px;
  font-size: 15px;
  font-family: MicrosoftYaHei;
  font-weight: 400;
  color: rgba(220, 220, 220, 1);
  margin: 34px 0 11px 37px;
}
.linkCon {
  height: 32px;
  margin-left: 29px;
  .linktext {
    width: 290px;
    height: 32px;
    background: rgba(54, 53, 58, 1);
    line-height: 32px;
    text-align: left;
    float: left;
    span {
      margin-left: 10px;
    }
  }
  .codes {
    cursor: pointer;
    float: left;
    width: 72px;
    height: 32px;
    background: rgba(54, 53, 58, 1);
    border-radius: 2px;
    margin-left: 8px;
    line-height: 32px;
  }
}
.valuseClass{
  width:230px;
  text-align: left;
 padding-left:20px;
  height:30px;
  line-height:30px;
  background: #3b3a40;
}
.firCon {
  width: 100%;
  height: 18px;
  margin-bottom: 30px;
}
.waterCon {
  width: 951px;
  //   height: 205px;
  padding-top: 45px;
  padding-bottom: 16px;
  background: rgba(54, 53, 58, 1);
  margin: 20px 0 19px 30px;
  span {
    float: left;
  
    font-size: 14px;
  }
  .welfare {
   width:230px;
    text-align: left;
     background: #3b3a40;
    font-size: 16px;
    height:30px;
    padding-left:20px;
    line-height: 30px;
    font-family: Arial-BoldMT;
    font-weight: bold;
    color: rgba(194, 152, 54, 1);
  }
  .spanName {
    margin-left: 20px;
    margin-right: 21px;
    width: 98px;
    text-align: right;
    font-size: 14px;
    font-family: MicrosoftYaHei;
    font-weight: 400;
    display:inline-block;
    height:30px;
    line-height: 30px;
    color: rgba(220, 220, 220, 1);
  }
  .progressCon {
    width: 240px;
    height: 18px;
    background: rgba(100, 100, 100, 1);
    float: left;
    margin-left: 10px;
    span {
      width: 173px;
      height: 18px;
      background: rgba(115, 138, 176, 1);
      float: left;
    }
  }
  .dirCon {
    margin-left: 13px;
    line-height: 18px;
    font-size: 14px;
    font-family: MicrosoftYaHei;
    font-weight: 400;
    color: rgba(220, 220, 220, 1);
  }
}
.btnPro{
 width:117px;
height:40px;
// font-size:16px;
outline: none;
border:1px solid rgba(220,220,220,1);
line-height: 40px;
text-align: center;
margin-top:15px;
margin-bottom:25px;
background: none;
color:#dcdcdc;
cursor: pointer;

}
</style>



