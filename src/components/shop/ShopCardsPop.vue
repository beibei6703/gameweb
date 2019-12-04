<template>
  <div id="shopcardspop">
    <div class="shopToolsPop">
      <div class="shopToolsPop-bg">
        <div class="shopToolsPop-box" :class="{identityBuy:userInfo.is_belong_personal_channel}">
          <div class="shopToolsPop-box-bd">
            <div class="shopToolsPop-box-bd-body">
              <!--PopTitle-->
              <div class="box-title">
                <i class="close" @click="Cardshide">
                </i>
              </div>
              <!--Pop-body-->
              <div class="box-body" ref="dataId" :data-id="isCards.id">
                <!--Pop-body-left-->
                <div class="box-body-left fl">
                  <div class="box-body-left-pic">
                    <div class="box-body-left-pict">
                      <img :src="isCards.src" :alt="isCards.name"  class="pop-pic">
                    </div>
                    <!--<div class="box-body-left-text">-->
                    <!--<span class="text-tip inline-block yellow fl">提示：虚拟卡充值每日限额200元次日0点更新，24小时内到账</span>-->
                    <!--<div class="clear"></div>-->
                    <!--</div>-->
                  </div>
                </div>
                <!--Pop-body-right-->
                <div class="box-body-right fr">
                  <div class="Pop-right">
                    <div class="Pop-right-title">
                      <span class="popGame-name">{{isCards.name}}</span>
                    </div>
                    <div class="Pop-right-body">
                      <!--buyNum-->
                      <div class="Pop-buyNum" v-show="isCards.dataType==6">
                        <span class="Pop-buyNum-name inline-block">购买数量</span>
                        <span class="Pop-buyNum-num inline-block">
                          <i @click="Cardsminus"><img src="../../assets/images/Mall-images/sub.png" alt="减"></i>
                          <input type="text" @blur="popblur" @click="numBring" class="buyNum-num" :value="result" ref="inputNumber" @keyup="handleInput">
                          <i @click="Cardsplus"><img src="../../assets/images/Mall-images/add.png" alt="加"></i>
                        </span>
                      </div>
                      <div style="margin-bottom: 50px" v-show="isCards.dataType==5"></div>
                      <div style="margin-bottom: 50px" v-show="isCards.dataType==7"></div>
                      <div class="youAccount"  :class="{phoneIdentity:isCards.dataType==6}">
                        <span class="Pop-buyPrice-name inline-block" >账户余额：</span>
                        <span class=" inline-block warn" style="margin-left:12px;">{{thousandBitSeparator(parseInt(userInfo.cai))}} C</span>
                      </div>
                      <div class="youAccount" v-if="parseInt(isCards.price*result)>parseInt(userInfo.cai) || (parseInt(isCards.price*result)+(parseInt(isCards.price*result)-parseFloat(userInfo.effective_flow))*0.1>parseInt(userInfo.cai) && userInfo.is_belong_personal_channel)" style="margin:-6px 0 16px 0;">
                        <span class=" inline-block warn" > <i class="warnTip" >(余额不足)</i> </span>
                      </div>
                      <!--buyPrice-->
                      <div class="Pop-buyPrice">
                        <span class="Pop-buyPrice-name inline-block" v-show="isCards.dataType==6">总&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;计：</span>
                        <span class="Pop-buyPrice-name inline-block" v-show="isCards.dataType==5">单&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;价：</span>
                        <span class="Pop-buyPrice-name inline-block" v-show="isCards.dataType==7">单&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;价：</span>
                        <span class="Pop-buyPrice-num inline-block" v-if="userInfo.is_belong_personal_channel && parseFloat(isCards.price*result)<=parseFloat(userInfo.effective_flow)">{{thousandBitSeparator(parseInt(isCards.price*result))}} C</span>
                        <span class="Pop-buyPrice-num inline-block" v-if="userInfo.is_belong_personal_channel && parseFloat(isCards.price*result)>parseFloat(userInfo.effective_flow)">{{thousandBitSeparator(parseInt(isCards.price*result)+(parseInt(isCards.price*result)-parseFloat(userInfo.effective_flow))*0.1)}} C</span>
                        <span class="Pop-buyPrice-num inline-block" v-if="!userInfo.is_belong_personal_channel">{{thousandBitSeparator(parseInt(isCards.price*result))}} C</span>
                      </div>
                      <!--getPlayer-->
                      <div class="Pop-getPlayer" v-show="isCards.dataType==6" :class="{qqIdentity:isCards.dataType==6}">
                        <span class="Pop-getPlayer-left inline-block">充值QQ号：</span>
                        <input type="text" class="Pop-getPlayer inline-block" placeholder="请写所要充值的QQ号" onfocus="this.placeholder=''" onblur="this.placeholder='请写所要充值的QQ号'" ref="inputName"  @click="giveBring"  @blur="giveNo">
                        <div class="clear"></div>
                      </div>
                      <div class="Pop-getPlayer" v-show="isCards.dataType==7">
                        <span class="Pop-getPlayer-left inline-block">充值手机号：</span>
                        <input type="text" class="Pop-getPlayer inline-block" placeholder="请写所要充值的手机" onfocus="this.placeholder=''" onblur="this.placeholder='请写所要充值的手机'" ref="iphoneName"  @click="iphoneBring"  @blur="iphoneNo">
                        <div class="clear"></div>
                      </div>
                      <div class="Pop-getPlayer" v-show="isCards.dataType==6">
                        <span class="Pop-getPlayer-left inline-block">确认QQ号：</span>
                        <input type="text" class="Pop-again inline-block" ref="inputNameSure" placeholder="再次输入一遍QQ号" onfocus="this.placeholder=''" onblur="this.placeholder='再次输入一遍QQ号'"  @click="casdsBring"  @blur="casdsNo">
                        <div class="clear"></div>
                      </div>
                      <div class="Pop-getPlayer" v-show="isCards.dataType==7">
                        <span class="Pop-getPlayer-left inline-block">确认手机号：</span>
                        <input type="text" class="Pop-again inline-block" ref="iphoneNameSure" placeholder="再次输入一遍手机" onfocus="this.placeholder=''" onblur="this.placeholder='再次输入一遍手机'"  @click="iphonesBring"  @blur="iphonesNo">
                        <div class="clear"></div>
                      </div>
                      <div class="Pop-JDtext" v-show="isCards.dataType==5">
                        <span>提示：</span><span>京东购物卡兑换成功后将以卡密的形式发送至您的菜园邮箱， 请您注意查收。</span>
                      </div>
                    </div>
                    <div class="clear"></div>
                  </div>
                  <div class="clear"></div>
                </div>
                <div class="clear"></div>
                <div class="identity" v-if=" userInfo.is_belong_personal_channel" >
                  <p class="warnTxt" style="white-space:nowrap; ">由于您当前有效流水为：<span style="color:#f58500;">{{thousandBitSeparator(parseFloat(userInfo.effective_flow))}}c</span></p>
                  <p class="warnTxt">仅可购买价值此数量菜币道具,超出部分将额外收取10%菜币.</p>
                  <div class="tipWrap">
                    <p class="tipTitle">提高有效流水 <img src="../../assets/img/mall/question.png" alt="" class="question" > </p>
                    <div class="tipConent">
                      <p class="tipTxt">单边失利流水=预测菜币</p>
                      <p class="tipTxt">单边获胜流水=预测菜币x预测赔率（大于1的赔率均计算为1）</p>
                      <p class="tipTxt">对冲预测流水=（单边获胜流水-单边失利流水）取绝对值</p>
                      <p class="tipTxt">以上流水计算不含奖池盘口，购买皮肤卡会减少对应的有效流水。</p>
                    </div>
                  </div>
                </div>
                <!--Pop-body-btn-->
                <div class="Pop-right-footer" :class="{identityFooter:userInfo.is_belong_personal_channel}">
                  <div class="get-btn" @click="CardsBuy($event)" v-show="isCards.dataType==6" :data-type="3">确定</div>
                  <div class="get-btn" @click="PhoneBuy($event)" v-show="isCards.dataType==7" :data-type="3">确定</div>
                  <div class="get-btn" @click="JDBuy($event)" v-show="isCards.dataType==5" :data-type="3">确定</div>
                  <div class="cancel-btn" @click="Cardshide">取消</div>
                  <div class="clear"></div>
                </div>
                <!-- <img src="../../assets/img/mall/virture_flow.png" alt=""> -->
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Http from "./../../common/http";
import { mapMutations, mapState } from "vuex";
import ShopSuccessPop from "./ShopSuccessPop";
export default {
  data() {
    return {
      isclose: true,
      result: 1,
      CaiC: this.$store.state.user.userInfo
        ? this.$store.state.user.userInfo.cai
        : 0
    };
  },
  methods: {
    handleInput(e) {
      e.target.value = e.target.value.replace(/\D/g, "");
      if (
        parseInt(this.$refs.inputNumber.value) <= 1 ||
        this.$refs.inputNumber.value == ""
      ) {
        this.$refs.inputNumber.value = "1";
      }
      if (this.$refs.inputNumber.value[0] == 0) {
        this.$refs.inputNumber.value = this.$refs.inputNumber.value.slice(1);
      }
    },
    Cardshide: function() {
      this.$store.commit("isCards", false);
      this.result = "1";
      this.$refs.inputName.value = "";
      this.$refs.iphoneName.value = "";
      this.$refs.inputNameSure.value = "";
      this.$refs.iphoneNameSure.value = "";
    },
    Cardsplus: function() {
      this.result++;
      this.$emit("input", { res: this.result, other: "++" });
    },
    Cardsminus: function() {
      this.result--;
      if (this.result <= 1) {
        this.result = 1;
      } else {
        this.$emit("input", { res: this.result, other: "--" });
      }
    },
    popblur: function() {
      this.result = this.$refs.inputNumber.value;
      this.$refs.inputNumber.style = "box-shadow: 0 0 0 #a4975f";
    },
    giveBring: function() {
      this.$refs.inputName.style = "box-shadow: 0.5px 0.5px 4px #a4975f";
    },
    iphoneBring: function() {
      this.$refs.iphoneName.style = "box-shadow: 0.5px 0.5px 4px #a4975f";
    },
    giveNo: function() {
      this.$refs.inputName.style = "box-shadow: 0 0 0 #a4975f";
    },
    iphoneNo: function() {
      this.$refs.iphoneName.style = "box-shadow: 0 0 0 #a4975f";
    },
    casdsBring: function() {
      this.$refs.inputNameSure.style = "box-shadow: 0.5px 0.5px 4px #a4975f";
    },
    iphonesBring: function() {
      this.$refs.iphoneNameSure.style = "box-shadow: 0.5px 0.5px 4px #a4975f";
    },
    numBring: function() {
      this.$refs.inputNumber.style = "box-shadow: 0.5px 0.5px 4px #a4975f";
    },
    casdsNo: function() {
      this.$refs.inputNameSure.style = "box-shadow: 0 0 0 #a4975f";
    },
    iphonesNo: function() {
      this.$refs.iphoneNameSure.style = "box-shadow: 0 0 0 #a4975f";
    },
    JDBuy: function(event) {
      let _this = this;
      let el = event.currentTarget;
      // let moneyMy =document.getElementById('mymoney').getAttribute('data-money');
      let moneyMy = this.$store.state.user.userInfo
        ? this.$store.state.user.userInfo.cai
        : null;
      let moneyPr = parseInt(this.isCards.price * this.result);
      let userInfo = this.$store.state.user.userInfo;
      let flow = this.thousandBitSeparator(parseFloat(userInfo.effective_flow));
      if (parseInt(moneyMy) >= moneyPr) {
        let thisType = el.getAttribute("data-type");
        let _input = _this.$refs.inputNumber.value;
        let carder = {
          product_type: thisType,
          product_id: _this.$refs.dataId.getAttribute("data-id"),
          num: "1"
        };
        let optionMsg = {
          product_type: thisType,
          product_id: _this.$refs.dataId.getAttribute("data-id"),
          num: _input,
          type: "1"
        }
        this.$store.commit('virtualOption',optionMsg);
        if(!userInfo.is_belong_personal_channel || parseFloat(this.isCards.price*this.result)<=parseFloat(userInfo.effective_flow)){
          Http.post("/shop/card/recharge", carder).then(function(data) {
            if (data.data.code == 0) {
              let dataOption = {
                product_type: thisType,
                product_id: _this.$refs.dataId.getAttribute("data-id"),
                num: _input,
                masseges: data.data.message,
                type: "1"
              };
              _this.$store.commit("tankuang", true);
              _this.$store.commit("tankuang", dataOption);
              _this.result = "1";
              _this.$store.commit("isCards", false);
              _this.$store.dispatch("userInfo");
            } else {
              let dataOption = {
                masseges: data.data.message,
                type: "1"
              };
              _this.$store.commit("isSigninPupopDis", true);
              _this.$store.commit("isSigninPupopDis", dataOption);
            }
          });
        }else{
          let dataOption = {
            masseges: `由于您当前有效流水为：${flow}c,仅可购买价值此数量菜币道具超出部分将额外收取10%菜币.`,
            type: "2"
          };
          _this.$store.commit('identityItemBuy',carder);
          _this.$store.commit("isSigninPupopDis", true);
          _this.$store.commit("isSigninPupopDis", dataOption);
          _this.$store.commit("isIdentitySecondEnsure", {ensure:true,type:4});
        }
      } else {
        let dataOption = {
          masseges: "你的账户余额不足，是否需要充值？",
          typePay: "2"
        };
        _this.$store.commit("isSigninPupopDis", true);
        _this.$store.commit("isSigninPupopDis", dataOption);
        _this.result = "1";
        _this.$store.commit("isCards", false);
      }
    },
    CardsBuy: function(event) {
      let _this = this;
      let el = event.currentTarget;
      let thisType = el.getAttribute("data-type");
      let _input = _this.$refs.inputNumber.value;
      let _popName = _this.$refs.inputName.value;
      let _sureName = _this.$refs.inputNameSure.value;
      // let moneyMy =document.getElementById('mymoney').getAttribute('data-money');
      let moneyMy = this.$store.state.user.userInfo
        ? this.$store.state.user.userInfo.cai
        : null;
      let moneyPr = parseInt(this.isCards.price * this.result);
      let reg = new RegExp("^[0-9]*$");
      let userInfo = this.$store.state.user.userInfo;
      let flow = this.thousandBitSeparator(parseFloat(userInfo.effective_flow));
      if (_popName != "") {
        if (reg.test(_popName)) {
          if (_popName == _sureName) {
            if (parseInt(moneyMy) >= moneyPr) {
              let carder = {
                product_type: thisType,
                product_id: _this.$refs.dataId.getAttribute("data-id"),
                num: _input,
                game_account: _popName
              };
              let optionMsg = {
                product_type: thisType,
                product_id: _this.$refs.dataId.getAttribute("data-id"),
                num: _input,
                game_account: _popName,
                masseges: "兑换成功，将于24小时内到账",
                type: "1"
              }
              this.$store.commit('virtualOption',optionMsg);
              if(!userInfo.is_belong_personal_channel || parseFloat(this.isCards.price*this.result)<=parseFloat(userInfo.effective_flow)){
                Http.post("/shop/card/recharge", carder).then(function(data) {
                  if (data.data.code == 0) {
                    let dataOption = {
                      product_type: thisType,
                      product_id: _this.$refs.dataId.getAttribute("data-id"),
                      num: _input,
                      game_account: _popName,
                      masseges: "兑换成功，将于24小时内到账",
                      type: "1"
                    };
                    _this.$store.commit("tankuang", true);
                    _this.$store.commit("tankuang", dataOption);
                    _this.result = "1";
                    _this.$refs.inputName.value = "";
                    _this.$refs.inputNameSure.value = "";
                    _this.$store.commit("isCards", false);
                    _this.$store.dispatch("userInfo");
                  } else {
                    let dataOption = {
                      masseges: data.data.message,
                      type: "1"
                    };
                    _this.$store.commit("isSigninPupopDis", true);
                    _this.$store.commit("isSigninPupopDis", dataOption);
                  }
                });
              }else{
                 let dataOption = {
                    masseges: `由于您当前有效流水为：${flow}c,仅可购买价值此数量菜币道具超出部分将额外收取10%菜币.`,
                    type: "2"
                  };
                  _this.$store.commit('identityItemBuy',carder);
                  _this.$store.commit("isSigninPupopDis", true);
                  _this.$store.commit("isSigninPupopDis", dataOption);
                  _this.$store.commit("isIdentitySecondEnsure", {ensure:true,type:2});
              }
            } else {
              let dataOption = {
                masseges: "你的账户余额不足，是否需要充值？",
                typePay: "2"
              };
              _this.$store.commit("isSigninPupopDis", true);
              _this.$store.commit("isSigninPupopDis", dataOption);
              _this.result = "1";
              _this.$refs.inputName.value = "";
              _this.$refs.inputNameSure.value = "";
              _this.$store.commit("isCards", false);
            }
          } else {
            let dataOption = {
              masseges: "两次输入不一致，请重新输入",
              type: "1"
            };
            _this.$store.commit("isSigninPupopDis", true);
            _this.$store.commit("isSigninPupopDis", dataOption);
          }
        } else {
          let dataOption = {
            masseges: "格式错误，请重新输入",
            type: "5"
          };
          _this.$store.commit("isSigninPupopDis", true);
          _this.$store.commit("isSigninPupopDis", dataOption);
        }
      } else {
        let dataOption = {
          masseges: "充值账号不能为空",
          type: "4"
        };
        _this.$store.commit("isSigninPupopDis", true);
        _this.$store.commit("isSigninPupopDis", dataOption);
      }
    },
    PhoneBuy: function(event) {
      let _this = this;
      let el = event.currentTarget;
      let thisType = el.getAttribute("data-type");
      let _input = _this.$refs.inputNumber.value;
      let _popName = _this.$refs.iphoneName.value;
      let _sureName = _this.$refs.iphoneNameSure.value;
      // let moneyMy =document.getElementById('mymoney').getAttribute('data-money');
      let moneyMy = this.$store.state.user.userInfo
        ? this.$store.state.user.userInfo.cai
        : null;
      let moneyPr = parseInt(this.isCards.price * this.result);
      let reg = /^1[0-9]{10}$/;
      let userInfo = this.$store.state.user.userInfo;
      let flow = this.thousandBitSeparator(parseFloat(userInfo.effective_flow));
      if (_popName != "") {
        if (reg.test(_popName)) {
          if (_popName == _sureName) {
            if (parseInt(moneyMy) >= moneyPr) {
              let carder = {
                product_type: thisType,
                product_id: _this.$refs.dataId.getAttribute("data-id"),
                num: "1",
                game_account: _popName
              };
              let optionMsg = {
                product_type: thisType,
                product_id: _this.$refs.dataId.getAttribute("data-id"),
                num: _input,
                game_account: _popName,
                masseges: "兑换成功，将于24小时内到账",
                type: "1"
              }
              this.$store.commit('virtualOption',optionMsg);
              if(!userInfo.is_belong_personal_channel || parseFloat(this.isCards.price*this.result)<=parseFloat(userInfo.effective_flow)){
                Http.post("/shop/card/recharge", carder).then(function(data) {
                  if (data.data.code == 0) {
                    let dataOption = {
                      product_type: thisType,
                      product_id: _this.$refs.dataId.getAttribute("data-id"),
                      num: _input,
                      game_account: _popName,
                      masseges: "兑换成功，将于24小时内到账",
                      type: "1"
                    };
                    _this.$store.commit("tankuang", true);
                    _this.$store.commit("tankuang", dataOption);
                    _this.result = "1";
                    _this.$refs.iphoneName.value = "";
                    _this.$refs.iphoneNameSure.value = "";
                    _this.$store.commit("isCards", false);
                    _this.$store.dispatch("userInfo");
                  } else {
                    let dataOption = {
                      masseges: data.data.message,
                      type: "1"
                    };
                    _this.$store.commit("isSigninPupopDis", true);
                    _this.$store.commit("isSigninPupopDis", dataOption);
                  }
                });
              }else{
                let dataOption = {
                  masseges: `由于您当前有效流水为：${flow}c,仅可购买价值此数量菜币道具,超出部分将额外收取10%菜币.`,
                  type: "2"
                };
                _this.$store.commit('identityItemBuy',carder);
                _this.$store.commit("isSigninPupopDis", true);
                _this.$store.commit("isSigninPupopDis", dataOption);
                _this.$store.commit("isIdentitySecondEnsure", {ensure:true,type:3});
              }
            } else {
              let dataOption = {
                masseges: "你的账户余额不足，是否需要充值？",
                typePay: "2"
              };
              _this.$store.commit("isSigninPupopDis", true);
              _this.$store.commit("isSigninPupopDis", dataOption);
              _this.result = "1";
              _this.$refs.iphoneName.value = "";
              _this.$refs.iphoneNameSure.value = "";
              _this.$store.commit("isCards", false);
            }
          } else {
            let dataOption = {
              masseges: "两次输入不一致，请重新输入",
              type: "1"
            };
            _this.$store.commit("isSigninPupopDis", true);
            _this.$store.commit("isSigninPupopDis", dataOption);
          }
        } else {
          let dataOption = {
            masseges: "手机格式错误，请重新输入",
            type: "5"
          };
          _this.$store.commit("isSigninPupopDis", true);
          _this.$store.commit("isSigninPupopDis", dataOption);
        }
      } else {
        let dataOption = {
          masseges: "充值账号不能为空",
          type: "4"
        };
        _this.$store.commit("isSigninPupopDis", true);
        _this.$store.commit("isSigninPupopDis", dataOption);
      }
    }
  },
  mounted: function() {},
  computed: {
    isCards: function() {
      return this.$store.state.shop.isCards;
    },
    mycb: function() {
      return this.$store.state.shop.self;
    },
    userInfo() {
      return this.$store.state.user.userInfo || null;
    }
  },
  components: {
    ShopSuccessPop
  }
};
</script>
<style scoped lang="scss">
//公用
.fl {
  float: left;
}
.fr {
  float: right;
}
.clear {
  clear: both;
  margin: 0;
  padding: 0;
  display: block;
}
.allbody {
  width: 1200px;
  margin-left: auto;
  margin-right: auto;
}
.hide {
  display: none;
}
.show {
  display: block;
}
.ImgOut {
  position: relative;
  left: 0;
  top: 0;
  overflow: hidden;
  span {
    display: table-cell;
    text-align: center;
    vertical-align: middle;
    img {
      max-width: 100%;
      max-height: 100%;
      display: inline-block;
    }
  }
}
.pr {
  position: relative;
}
.block {
  display: block;
}
.inline-block {
  display: inline-block;
}
.yellow {
  color: #867037;
}
.white {
  color: #929292;
}
.warn{
  color: #FF4C22;
  font-size: 16px;
}
.warnTip{
  color: #A92F29;
  font-size: 14px;
}
//道具卡弹出框
.shopToolsPop {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  outline: 0;
  z-index: 999999;
  .shopToolsPop-bg {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    outline: 0;
    background: rgba(5, 6, 6, 0.8);
    .shopToolsPop-box {
      position: fixed;
      top: 50%;
      left: 50%;
      margin: -282px 0 0 -251px;
      display: block;
      z-index: 2;
      width: auto;
      transform: translate(0, 0);
      background: url("../../assets/images/Mall-images/cardspop-bg.png")
        no-repeat;
      border-radius: 5px;
      .shopToolsPop-box-bd {
        display: table-cell;
        vertical-align: middle;
        box-sizing: border-box;
        .shopToolsPop-box-bd-body {
          width: 540px !important;
          height: 492px;
          padding: 16px 27px 40px;
          .box-title {
            position: relative;
            width: 100%;
            .close {
              width: 19px;
              height: 19px;
              background: url("../../assets/images/Mall-images/pop-close.png")
                no-repeat;
              position: absolute;
              right: 0;
              top: 5px;
              cursor: pointer;
              /*display: block;*/
              display: none;
              transition: all 0.5s;
            }
            .close:hover {
              background: url("../../assets/images/Mall-images/pop-close1.png")
                no-repeat;
              /*background-position: 1px 1px;*/
            }
          }
          .box-body {
            padding: 100px 5px 0 25px;
            .box-body-left {
              .box-body-left-pic {
                width: 161px;
                height: 230px;
                border: 1px solid #cc9955;
                padding: 10px 9px;
                .box-body-left-pict {
                  width: 142px;
                  height: 208px;
                  overflow: hidden;
                  .pop-pic {
                    display: block;
                    width: 100%;
                    height: 100%;
                    overflow: hidden;
                    transition: all 0.5s;
                  }
                  .pop-pic:hover {
                    transform: scale(1.1);
                    -webkit-transform: scale(1.1);
                    -moz-transform: scale(1.1);
                    -o-transform: scale(1.1);
                    -ms-transform: scale(1.1);
                  }
                }

                .box-body-left-text {
                  margin-top: 40px;
                  font-size: 12px;
                }
              }
            }
            .box-body-right {
              .Pop-right {
                width: 230px;
                padding-top: 6px;
                margin-right: 25px;
                .Pop-right-title {
                  text-align: left;
                  height: 22px;
                  .popGame-icon {
                    width: 22px;
                    height: 22px;
                  }
                  .popGame-name {
                    width: 152px;
                    display: inline-block;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                    font-size: 18px;
                    color: #ffd35e;
                    line-height: 23px;
                    font-weight: 600;
                  }
                  .popTxt {
                    margin-top: 4px;
                    text-align: left;
                    height: 12px;
                    line-height: 12px;
                    .popQuality {
                      font-size: 12px;
                      color: #ffa22a;
                    }
                    .popGuess {
                      font-size: 12px;
                      color: #dcdcdc;
                      margin-left: 6px;
                    }
                  }
                }
                .Pop-right-body {
                  margin-top: 20px;
                  .Pop-unitPrice {
                    text-align: left;
                    margin-bottom: 22px;
                    .Pop-unitPrice-name {
                      color: #dcdcdc;
                    }
                    .Pop-unitPrice-num {
                      color: #dcdcdc;
                    }
                  }
                  .Pop-buyNum {
                    text-align: left;
                    margin-bottom: 13px;
                    .Pop-buyNum-name {
                      color: #dcdcdc;
                    }
                    .Pop-buyNum-num {
                      margin-left: 10px;
                      i {
                        display: inline-block;
                        cursor: pointer;
                        img {
                          vertical-align: middle;
                        }
                      }
                      .buyNum-num {
                        width: 57px;
                        height: 25px;
                        line-height: 25px;
                        border: 2px solid #a4975f;
                        background: #15161a;
                        text-align: center;
                        color: #dcdcdc;
                        margin: 0 5px;
                        outline: none;
                      }
                    }
                  }
                  .Pop-buyPrice {
                    text-align: left;
                    margin-bottom: 50px;
                    .Pop-buyPrice-name {
                      color: #dcdcdc;
                    }
                    .Pop-buyPrice-num {
                      color: #e1c076;
                    }
                    .cbIcon {
                      position: relative;
                      top: 2px;
                      left: 6px;
                    }
                  }
                  .youAccount{
                    text-align: left;
                    margin:-40px 0 10px 0 ;
                  }
                  .phoneIdentity{
                    margin:-8px 0 10px 0 ;
                  }
                  .Pop-getPlayer {
                    text-align: left;
                    .Pop-getPlayer-left {
                      color: #dcdcdc;
                    }
                    .Pop-getPlayer {
                      width: 132px;
                      height: 26px;
                      line-height: 26px;
                      border: 1px solid #a4975f;
                      background: #15161a;
                      color: #929292;
                      float: right;
                      text-align: center;
                      outline: none;
                    }
                    .Pop-again {
                      width: 132px;
                      height: 26px;
                      line-height: 26px;
                      border: 1px solid #a4975f;
                      background: #15161a;
                      color: #929292;
                      float: right;
                      text-align: center;
                      outline: none;
                    }
                  }
                  .Pop-getPlayer {
                    margin-bottom: 6px;
                    line-height: 30px;
                  }
                  .qqIdentity{
                    margin-top: -30px;
                  }
                  .Pop-JDtext {
                    text-align: left;
                    font-size: 12px;
                    width: 180px;
                    line-height: 20px;
                    span:nth-child(1) {
                      color: #bf9f49;
                    }
                    span:nth-child(2) {
                      color: #808081 !important;
                    }
                  }
                }
                .Pop-right-footer {
                  width: 100%;
                }
              }
            }
            .Pop-right-footer {
              margin: 55px 0 0;
              padding: 0 50px;
              div {
                height: 42px;
                width: 150px;
                text-align: center;
                line-height: 42px;
                cursor: pointer;
              }
              .get-btn {
                background: url("../../assets/images/Mall-images/left-btn.png")
                  no-repeat;
                float: left;
                color: #794e0d;
                transition: all 0.2s;
              }
              .get-btn:hover {
                background: url("../../assets/images/Mall-images/left-btnh.png")
                  no-repeat;
              }
              .cancel-btn {
                float: right;
                color: #ffcd75;
                background: url("../../assets/images/Mall-images/cancel-btn.png")
                  no-repeat;
                transition: all 0.2s;
              }
              .cancel-btn:hover {
                background: url("../../assets/images/Mall-images/cancel-btnh.png")
                  no-repeat;
              }
            }
            .identityFooter{
              margin: 16px 0 0;
            }
          }
          .identity {
            margin-top: 5px;
            .warnTxt {
              width: 100%;
              color: #a92f29;
              text-align: left;
              line-height: 22px;
              font-size: 14px;
            }
            .why {
              color: #a92f29;
              text-align: left;
              line-height: 22px;
              font-size: 14px;
            }
            .tipWrap {
              text-align: left;
              font-size: 14px;
              line-height: 18px;
            }
            .tipTitle {
              color: #dcdcdc;
            }
            .tipConent {
              width: 436px;
              height: 80px;
              color: #a5a5a5;
              font-size: 12px;
              padding: 7px;
              background: url("../../assets/img/mall/identity_tip.png")
                no-repeat;
            }
            .question {
              width: 12px;
              height: 12px;
              display: inline-block;
            }
          }
        }
      }
    }
    .identityBuy{
      background: url("../../assets/img/mall/virture_flow.png") no-repeat;
      padding-bottom: 36px;
    }
  }
}
</style>


