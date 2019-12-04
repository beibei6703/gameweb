
<template>
<div>
 <span class="applyTit">填写申请</span>
    <div  class="contain">
      <div class="userTxt">
        <span class="nameTitspan">姓&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;名：</span>
        <input type="text" placeholder="请输入申请姓名"  ref="username" v-model="user.name" class="inputCon" onfocus="this.placeholder=''" onblur="this.placeholder='请输入申请姓名'" @blur="getname" :class="{warn:shownameErr}">
        <span class="error_comfir" ref="nameErr" v-show="shownameErr==true" ></span>
      </div>
      <div class="userTxt">
        <span class="nameTitspan">联系方式：</span>
        <input type="text" placeholder="请输入手机号码" ref="phone" v-model="user.mobile" class="inputCon" onfocus="this.placeholder=''"  onblur="this.placeholder='请输入手机号码'"  @blur="gettel" :class="{warn:showtelErr}">
         <span class="error_comfir" ref="telErr" v-show ="showtelErr== true"></span>
      </div>
      <div class="btns">
        <button class="subBtn" @click="getSubmit">提交申请</button>
      </div>
       <p class="bottomCon">注：若申请失败，需在7个工作日后才可再次申请</p>
         <Applydialog v-if="IsshowDialog" :userInfo="user"></Applydialog>

    </div>
   <Applyerr v-if="IsshowerrDialog" :userInfo="user"></Applyerr>
</div>
</template>

<script>
import Http from "../../../common/http";
export default {
  name: "Applyagain",
  data() {
    return {
      user: {
        name: "",
        mobile: ""
      },

      shownameErr: false,
      showtelErr: false
    };
  },
  computed: {
    IsshowDialog() {
      return this.$store.state.promoter.showdialog;
    },
    IsshowerrDialog() {
      return this.$store.state.promoter.showErrdialog;
    }
  },
  methods: {
    onSub() {
      return false;
    },
    getname() {
      let usernameReg = /^[\u4E00-\u9FA5A-Za-z\s]+(·[\u4E00-\u9FA5A-Za-z]+)*$/;
      let username = this.user.name;
      if (username) {
        if(usernameReg.test(username)){
          this.shownameErr = false;
        }else{
          // this.$refs.username.classList.add("bd-error");
          this.shownameErr = true;
          this.$refs.nameErr.innerHTML = "输入姓名格式不正确";
        }
      } else {
        // this.$refs.username.classList.add("bd-error");
        this.shownameErr = true;
        this.$refs.nameErr.innerHTML = "请输入姓名";
      }
    },
    gettel() {
      let RemailPhone = /(1[34578]\d{9}$)|(^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$)/i; //邮箱和手机号码正则
      if (this.user.mobile) {
        if (RemailPhone.test(this.user.mobile) != true) {
          this.$refs.telErr.innerHTML = "输入手机号码格式不正确";
          this.showtelErr = true;
          // this.$refs.phone.classList.add("bd-error");
        } else {
          this.showtelErr = false;
        }
      } else {
        this.$refs.phone.classList.add("bd-error");
        this.$refs.telErr.innerHTML = "请输入手机号码";
        this.showtelErr = true;
      }
    },
    getSubmit() {
      if (this.shownameErr == false && this.showtelErr == false) {
        this.$store.commit("changeshow", true);
      } else {
        // this.$refs.phone.classList.add("bd-error");
        // this.$refs.username.classList.add("bd-error");
        // this.shownameErr = true;
        // this.showtelErr = true;
        this.$refs.nameErr.innerHTML = "请输入姓名";
        this.$refs.telErr.innerHTML = "请输入手机号码";
      }
    }
  }
};
</script>

<style scoped>
.applyTit {
  display: block;
  width: 60px;
  height: 13px;
  font-size: 15px;
  font-weight: 400;
  color: rgba(220, 220, 220, 1);
  margin-top: 34px;
  margin-left: 36px;
}
.contain {
  width: 951px;
  height: 295px;
  background: rgba(54, 53, 58, 1);
  margin-top: 10px;
  padding-top: 40px;
}
.userTxt {
  width: 400px;
  height: 50px;
  position: relative;
  margin-bottom: 16px;
}
.nameTitspan {
  color: #dcdcdc;
  display: inline-block;
  width: 74px;
  height: 30px;
  line-height: 30px;
  font-size: 14px;
}
.inputCon {
  outline: none;
  background: none !important;
  width: 240px;
  height: 27px;
  margin-left: 22px;
  color: #888888;
  border: 1px solid rgba(67, 67, 67, 1);
}
.error_comfir {
  display: block;
  width: 240px;
  font-size: 14px;

  color: #ed4b4b;
  height: 20px;
  line-height: 20px;
  position: absolute;
  top: 34px;
  left: 128px;
  text-align: left;
}
.btns {
  width: 400px;
  display: flex;
  justify-content: center;
  height: 28px;
  margin-top: -5px;
}
.subBtn {
  outline: none;
  border: none;
  display: block;
  width: 80px;
  height: 28px;
  background-color: transparent;
  line-height: 28px;
  color: #7e4b08;
  cursor: pointer;
  background: url(../../../assets/images/promoter/applybtnp.png) no-repeat
    center;
}
.subBtn:hover {
  background: url(../../../assets/images/promoter/applybtnh.png) no-repeat
    center;
}

.bottomCon {
  margin:16px 0 0 80px;
  height: 12px;
  font-size: 12px;
  font-weight: 400;
  width: 265px;
  color: rgba(131, 131, 131, 1);
}
.warn {
  border: 1px solid #c02d3b;
}
</style>

