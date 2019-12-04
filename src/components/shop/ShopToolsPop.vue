<template>
  <div id="shoptoolspop">
    <div class="shopToolsPop" >
      <div class="shopToolsPop-bg">
        <div :class="'shopToolsPop-box '+isShow.url" >
          <div class="shopToolsPop-box-bd" :class="{identityBuy:userInfo.is_belong_personal_channel && isShow.dataType==1 , identityGift:userInfo.is_belong_personal_channel && isShow.dataType==2}">
            <div class="shopToolsPop-box-bd-body">
              <!--PopTitle-->
              <div class="box-title">
                <i class="close" @click="Pophide"></i>
              </div>
              <!--Pop-body-->
              <div class="box-body" :class="{identityBody:!userInfo.is_belong_personal_channel && (isShow.dataType==1 || isShow.dataType==2||isShow.dataType==3)}">
                <!--Pop-body-left-->
                <div class="box-body-left fl">
                  <div class="box-body-left-case">
                    <div class="box-body-left-pic fr">
                      <img :src="isShow.src" :alt="isShow.name" class="pop-pic">
                    </div>
                  </div>
                </div>
                <!--Pop-body-right-->
                <div class="box-body-right fr" >
                  <div class="Pop-right">
                    <div class="Pop-right-title">
                      <span class="inline-block" v-if="isShow.icon==2"><img src="../../assets/images/Mall-images/pop-icon.png" alt="游戏图标" class="popGame-icon"></span>
                      <span class="inline-block" v-if="isShow.icon==1"><img src="../../assets/images/Mall-images/dota-icon.png" alt="游戏图标" class="popGame-icon"></span>
                      <span class="popGame-name" ref="proname" :data-name="isShow.name">{{isShow.name}}</span>
                      <div class="popTxt">
                        <span class="popQuality mall_ordinaryC" v-if="isShow.popQuality==1">普通</span>
                        <span class="popQuality mall_superiorC" v-if="isShow.popQuality==2">优质</span>
                        <span class="popQuality mall_tateC" v-if="isShow.popQuality==3">稀有</span>
                        <span class="popQuality mall_storyC" v-if="isShow.popQuality==4">传说</span>
                        <span class="popQuality mall_immortalC" v-if="isShow.popQuality==5">不朽</span>
                        <span class="popQuality mall_eternityC" v-if="isShow.popQuality==6">永恒</span>
                        <span class="popGuess" v-if="isShow.icon==1">可用于预测、可充值完美刀币</span>
                        <span class="popGuess" v-if="isShow.icon==2">可用于预测、可充值英雄联盟点券</span>
                      </div>
                    </div>
                    <div :class="'Pop-right-body '+isShow.buymt">
                      <!--unitPrice-->
                      <div class="Pop-unitPrice"  style="margin-top:-30px;">
                        <span class="Pop-unitPrice-name inline-block" >账户余额：</span>
                        <span class=" inline-block warn" style="margin-left:12px;">{{thousandBitSeparator(parseInt(userInfo.cai))}} C</span>
                      </div>
                      <div class="Pop-unitPrice" v-if="parseInt(isShow.price*result)>parseInt(userInfo.cai) || (parseInt(isShow.price*result)+(parseInt(isShow.price*result)-parseFloat(userInfo.effective_flow))*0.1 >parseInt(userInfo.cai) && userInfo.is_belong_personal_channel)" style="margin:-6px 0 16px 0;">
                        <!-- <span class="Pop-unitPrice-name inline-block" >账户余额：</span> -->
                        <span class=" inline-block warn" > <i class="warnTip" >(余额不足)</i> </span>
                      </div>
                      <div class="Pop-unitPrice" v-if="isShow.dataType==1||isShow.dataType==2">
                        <span class="Pop-unitPrice-name inline-block" style="letter-spacing:15px">单价：</span>
                        <span class="Pop-unitPrice-num inline-block">{{thousandBitSeparator(parseInt(isShow.price))}} C</span>
                      </div>
                      <div class="Pop-unitPrice" v-if="isShow.dataType==3||isShow.dataType==4">
                        <span class="Pop-unitPrice-name inline-block" ref="mynums" :data-max="isShow.count">当前拥有：{{thousandBitSeparator(parseInt(isShow.count))}}</span>
                      </div>
                      <!--buyNum-->
                      <div class="Pop-buyNum">
                        <span class="Pop-buyNum-name inline-block"  v-if="isShow.dataType==1">购买数量</span>
                        <span class="Pop-buyNum-name inline-block"  v-if="isShow.dataType==2||isShow.dataType==3">赠送数量</span>
                        <span class="Pop-buyNum-name inline-block"  v-if="isShow.dataType==4">使用数量</span>
                        <span class="Pop-buyNum-num inline-block" v-if="isShow.dataType==1||isShow.dataType==2">
                          <i @click="Popminus"><img src="../../assets/images/Mall-images/sub.png" alt="减"></i>
                          <input type="tel"  class="buyNum-num" ref="inputNumber" :value="result" @blur="popblur" @click="numBring" @keyup="handleInput" maxlength="9">
                          <i @click="Popplus"><img src="../../assets/images/Mall-images/add.png" alt="加"></i>
                        </span>
                        <span class="Pop-buyNum-num inline-block" v-if="isShow.dataType==3||isShow.dataType==4">
                          <i @click="minusNum"><img src="../../assets/images/Mall-images/sub.png" alt="减"></i>
                          <input type="tel"  class="buyNum-num" ref="inputNumbers" :value="result" @blur="popblurs" @click="numsBring" @keyup="handleInputbag">
                          <i @click="plusNum"><img src="../../assets/images/Mall-images/add.png" alt="加"></i>
                        </span>
                      </div>
                      <!--buyPrice-->
                      <div class="Pop-buyPrice" v-if="isShow.dataType==1||isShow.dataType==2">
                        <span class="Pop-buyPrice-name inline-block" style="letter-spacing:15px">总计：</span>
                        <span class="Pop-buyPrice-num inline-block" ref="priceNum" v-if="userInfo.is_belong_personal_channel && parseFloat(isShow.price*result)<=parseFloat(userInfo.effective_flow)">{{thousandBitSeparator(parseInt(isShow.price*result))}} C</span>
                        <!-- -->
                        <span class="Pop-buyPrice-num inline-block" ref="priceNum" v-if="userInfo.is_belong_personal_channel && parseFloat(isShow.price*result)>parseFloat(userInfo.effective_flow)">{{thousandBitSeparator(parseInt(isShow.price*result)+(parseInt(isShow.price*result)-parseFloat(userInfo.effective_flow))*0.1)}}  C</span>
                        <span class="Pop-buyPrice-num inline-block" ref="priceNum" v-if="!userInfo.is_belong_personal_channel">{{thousandBitSeparator(parseInt(isShow.price*result))}} C</span>
                      </div>
                      <!--getPlayer-->
                      <div class="Pop-getPlayer" v-show="isShow.dataType==2">
                        <span class="Pop-getPlayer-left inline-block" style="letter-spacing:5px">赠送给：</span>
                        <input type="text" class="Pop-getPlayer inline-block" placeholder="请输入对方昵称" onfocus="this.placeholder=''" onblur="this.placeholder='请输入对方昵称'" ref="playerName" @click="giveBring"  @blur="giveNo">
                        <div class="clear"></div>
                      </div>
                      <div class="Pop-getPlayer" v-show="isShow.dataType==3">
                        <span class="Pop-getPlayer-left inline-block">赠&nbsp; 送&nbsp; 给：</span>
                        <input type="text" class="Pop-getPlayer inline-block" placeholder="请输入对方昵称" onfocus="this.placeholder=''" onblur="this.placeholder='请输入对方昵称'" ref="playerNamebag"  @click="giveBringr" @blur="giveNor">
                        <div class="clear"></div>
                      </div>
                      <div class="Pop-getPlayer" v-show="isShow.dataType==4">
                        <div style="width:80px" class="fl" v-if="isShow.icon!=5">
                          <span class="Pop-getPlayer-left block" >充值账号：</span>
                          <span class="block" style="height: 10px" v-show="isShow.icon==1"></span>
                          <span class="Pop-getPlayer-left block" v-show="isShow.icon==1">确认账号：</span>
                        </div>
                        <!-- 背包-使用-lol -->
                        <input type="text" class="Pop-getPlayer inline-block" placeholder="请输入QQ号码" onfocus="this.placeholder=''" onblur="this.placeholder='请输入QQ号码'"  ref="playerNamebagb"  @click="giveBringrr" @blur="giveNorr" @keyup="handleBtn" v-if="isShow.icon==2">
                        <!-- <input type="text" class="Pop-getPlayer inline-block" placeholder="请输入账号" onfocus="this.placeholder=''" onblur="this.placeholder='请输入账号'"  ref="playerNamebagb"  @click="giveBringrr" @blur="giveNorr" @keyup="handleBtn" v-if="isShow.icon==5"> -->
                        <input type="text"  class="Pop-getPlayer inline-block" placeholder="请输入完美账号" onfocus="this.placeholder=''" onblur="this.placeholder='请输入完美账号'"  ref="playerNamebagb"  @click="giveBringrr" @blur="giveNorr" v-if="isShow.icon==1">
                        <input type="text" style="margin-top: 10px" class="Pop-getPlayer inline-block" placeholder="请确认完美账号" onfocus="this.placeholder=''" onblur="this.placeholder='请确认完美账号'"  ref="replayerNamebagb"  @click="giveBringrr" @blur="giveNorr" v-if="isShow.icon==1">
                        <div class="clear"></div>
                      </div>
                      <div style="height: 15px"></div>
                      <div class="Pop-getPlayer" v-show="isShow.dataType==4" v-if="isShow.icon==2">
                        <span class="Pop-getPlayer-left inline-block fl" style="letter-spacing:5px">所在区：</span>
                        <select class="Pop-getPlayerList fr" ref="gamelist"  @click="giveBringrrr" @blur="giveNorrr">
                          <option value="0" key="0">请选择角色所在区</option>
                          <option v-for="(item,index) in game_list" :value="item.id" :key="item.id">{{item.name}}</option>
                        </select>
                        <i class="clear"></i>
                      </div>

                    </div>
                    <div class="clear"></div>
                  </div>
                  <div class="clear"></div>
                </div>
                 <!-- <p class="warnTxt">由于您当前有效流水为：<span style="color:#f58500;">{{thousandBitSeparator(parseFloat(userInfo.effective_flow))}}c</span></p> -->
                <div class="clear"></div>
                <div class="identity" v-if=" (isShow.dataType==1 || isShow.dataType==2) && userInfo.is_belong_personal_channel" :class="{marginIdentity:userInfo.is_belong_personal_channel && (parseFloat(isShow.price*result)>parseFloat(userInfo.effective_flow)),notEnough:parseInt(isShow.price*result)>parseInt(userInfo.cai) || (parseInt(userInfo.cai) < parseInt(isShow.price*result)+(parseInt(isShow.price*result)-parseFloat(userInfo.effective_flow))*0.1&& userInfo.is_belong_personal_channel) }">
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
                <div class="Pop-right-footer" :class="{identityFooter:!userInfo.is_belong_personal_channel && isShow.dataType==1 ,giftIdentity: isShow.dataType==2 && userInfo.is_belong_personal_channel,useFooter:isShow.dataType==4 ,bagGive:isShow.dataType==3 ,gift:isShow.dataType==2 && !userInfo.is_belong_personal_channel}">
                  <!--<h1 v-show="iserror">{{iserror}}</h1>-->
                  <div class="get-btn" @click="buyBtn($event)" ref="isShowId" :data-id="isShow.id" v-show="isShow.dataType==1" :data-type="1">购买</div>
                  <!-- 商城赠送 -->
                  <div class="get-btn" @click="PopBtn($event)" ref="isShowId" :data-id="isShow.id" v-show="isShow.dataType==2" :data-type="2">赠送</div>
                  <!-- 背包赠送 -->
                  <div class="get-btn" @click="giveBtn($event)" ref="isShowId" :data-id="isShow.id" :data-product_id="isShow.product_id" v-show="isShow.dataType==3" :data-type="3">赠送</div>
                  <!-- 背包-lol-使用 -->
                  <div class="get-btn" @click="useBtn($event)" ref="isShowId" :data-id="isShow.id" :data-product_id="isShow.product_id" v-show="isShow.dataType==4" :data-type="4" v-if="isShow.icon==2">使用</div>
                  <!-- 背包-dota2-使用 -->
                  <div class="get-btn" @click="dotaBtn($event)" ref="isShowId" :data-id="isShow.id" :data-product_id="isShow.product_id" v-show="isShow.dataType==4" :data-type="4" v-if="isShow.icon==1">使用</div>

                  <div class="cancel-btn" @click="Pophide">取消</div>
                  <!-- 宝箱使用 -->
                  <div class="cancel-btn" v-if='isShow.isTreasure==1' style="margin-right:10px;" @click="treasureShouw(isShow.product_id)">使用</div>
                  <div class="clear"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="popOK">
      <!--<ShopSuccessPop v-show="tankuang"></ShopSuccessPop>-->
      <TreasureDia  v-if='treasureDiaShow'/>
    </div>
  </div>
</template>
<script>
import ShopSuccessPop from "./ShopSuccessPop";
import ShopGivePop from "./ShopGivePop";
import TreasureDia from "../dialog/TreasureDia";
import Http from "./../../common/http";
import { mapMutations, mapState } from "vuex";
export default {
  props: {
    Poptype: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      isclose: true,
      result: 1,
    };
  },
  methods: {
    showIdentityTip(event){
      let ele = event.currentTarget.parentNode.nextElementSibling;
      ele.style.display='block';
    },
    hideIdentityTip(event){

      let ele = event.currentTarget.parentNode.nextElementSibling;
      ele.style.display='none';
    },
    handleBtn(e) {
      e.target.value = e.target.value.replace(/\D/g, "");
    },
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
    handleInputbag(e) {
      e.target.value = e.target.value.replace(/\D/g, "");
      if (
        parseInt(this.$refs.inputNumbers.value) >
        parseInt(this.$refs.mynums.getAttribute("data-max"))
      ) {
        this.$refs.inputNumbers.value = this.$refs.mynums.getAttribute(
          "data-max"
        );
      }
      if (
        parseInt(this.$refs.inputNumbers.value) <= 1 ||
        this.$refs.inputNumbers.value == ""
      ) {
        this.$refs.inputNumbers.value = "1";
      }
      if (this.$refs.inputNumbers.value[0] == 0) {
        this.$refs.inputNumbers.value = this.$refs.inputNumbers.value.slice(1);
      }
    },
    Pophide: function() {
      this.$store.commit("test", false);
      this.$store.commit("treasureDia", false);
      // this.$store.commit("game_list",null);
      this.result = "1";
      this.$refs.playerName.value = "";
      this.$refs.playerNamebag.value = "";
      this.$refs.playerNamebagb ? (this.$refs.playerNamebagb.value = "") : "";
      this.$refs.replayerNamebagb
        ? (this.$refs.replayerNamebagb.value = "")
        : "";
    },
    treasureShouw: function(box_id) {


      this.$store.commit("treasureDia", true);
      let payload = { box_id };
      this.$store.dispatch("openTreasure", payload);
      setTimeout(() => {
        this.$store.dispatch("bag_treasure_dis");
      }, 500);
    },
    Popplus: function() {
      this.result++;
      this.$emit("input", { res: this.result, other: "++" });
    },
    Popminus: function() {
      this.result--;
      if (this.result <= 1) {
        this.result = 1;
      } else {
        this.$emit("input", { res: this.result, other: "--" });
      }
    },
    minusNum: function() {
      this.result = this.$refs.inputNumbers.value;
      this.result--;
      if (this.result <= 1) {
        this.result = 1;
      } else {
        this.$emit("input", { res: this.result, other: "--" });
      }
    },
    plusNum: function() {
      this.result = this.$refs.inputNumbers.value;
      if (
        parseInt(this.result) <
        parseInt(this.$refs.mynums.getAttribute("data-max"))
      ) {
        this.result++;
        this.$emit("input", { res: this.result, other: "++" });
      }
    },
    popblur: function() {
      this.result = this.$refs.inputNumber.value;
      this.$refs.inputNumber.style = "box-shadow: 0 0 0 #a4975f";
    },
    popblurs: function() {
      this.$refs.inputNumbers.style = "box-shadow: 0 0 0 #a4975f";
    },
    giveBring: function() {
      this.$refs.playerName.style = "box-shadow: 0.5px 0.5px 4px #a4975f";
      /*box-shadow: 0.5px 0.5px 5px #a4975f;*/
    },
    giveBringr: function() {
      this.$refs.playerNamebag.style = "box-shadow: 0.5px 0.5px 4px #a4975f";
      /*box-shadow: 0.5px 0.5px 5px #a4975f;*/
    },
    giveBringrr: function() {
      this.$refs.playerNamebagb.style = "box-shadow: 0.5px 0.5px 4px #a4975f";
      this.$refs.replayerNamebagb
        ? (this.$refs.replayerNamebagb.style =
            "box-shadow: 0.5px 0.5px 4px #a4975f;margin-top:10px")
        : "";
      /*box-shadow: 0.5px 0.5px 5px #a4975f;*/
    },
    giveBringrrr: function() {
      this.$refs.gamelist.style = "box-shadow: 0.5px 0.5px 4px #a4975f";
      /*box-shadow: 0.5px 0.5px 5px #a4975f;*/
    },
    numBring: function() {
      this.$refs.inputNumber.style = "box-shadow: 0.5px 0.5px 4px #a4975f";
    },
    numsBring: function() {
      this.$refs.inputNumbers.style = "box-shadow: 0.5px 0.5px 4px #a4975f";
    },
    giveNo: function() {
      this.$refs.playerName.style = "box-shadow: 0 0 0 #a4975f";
    },
    giveNor: function() {
      this.$refs.playerNamebag.style = "box-shadow: 0 0 0 #a4975f";
    },
    giveNorr: function() {
      this.$refs.playerNamebagb.style = "box-shadow: 0 0 0 #a4975f";
      this.$refs.replayerNamebagb
        ? (this.$refs.replayerNamebagb.style =
            "box-shadow: 0 0 0 #a4975f;margin-top:10px")
        : "";
    },
    giveNorrr: function() {
      this.$refs.gamelist.style = "box-shadow: 0 0 0 #a4975f";
    },
    //商城赠送
    PopBtn: function(event) {
      let _this = this;
      let el = event.currentTarget;
      let thisType = el.getAttribute("data-type");
      let _input = _this.$refs.inputNumber.value;
      // let moneyMy =document.getElementById('mymoney').getAttribute('data-money');
      let moneyMy = this.$store.state.user.userInfo
        ? this.$store.state.user.userInfo.cai
        : null;
      let moneyPr = parseInt(this.isShow.price * this.result);
      let userInfo = this.$store.state.user.userInfo;
      let flow = this.thousandBitSeparator(parseFloat(userInfo.effective_flow));
      let datas = {
        product_type: thisType,
        product_id: this.$refs.isShowId.getAttribute("data-id"),
        name: this.$refs.proname.getAttribute("data-name"),
        num: _input,
        receive_nickname: this.$refs.playerName.value,
        nickname: this.$refs.playerName.value,
        type: thisType
      };
      let userInfo_vip = _this.$store.state.user.userInfo
        ? _this.$store.state.user.userInfo.vip_level
        : null;
      if (userInfo_vip > 1) {
        if (datas.receive_nickname != "") {
          if (parseInt(moneyMy) >= moneyPr) {
            if(!userInfo.is_belong_personal_channel || parseFloat(this.isShow.price*this.result)<parseFloat(userInfo.effective_flow)){
              Http.get("/user/getByNickname", datas).then(function(data) {
                if (data.data.code == 0) {
                  _this.$store.commit("givehide", true);
                  _this.$store.commit("givehide", datas);
                  _this.$store.commit("userlist", data.data.data);
                  _this.result = "1";
                  _this.$refs.playerName.value = "";
                  _this.$store.commit("test", false);
                } else if (data.data.code == 41000) {
                  let dataOption = {
                    masseges: "至少4个字符",
                    type: "2"
                  };
                  _this.$store.commit("isSigninPupopDis", true);
                  _this.$store.commit("isSigninPupopDis", dataOption);
                } else {
                  let dataOption = {
                    masseges: data.data.message,
                    type: "2"
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
              _this.$store.commit('identityItemBuy',datas);
              _this.$store.commit("isSigninPupopDis", true);
              _this.$store.commit("isSigninPupopDis", dataOption);
              _this.$store.commit("isIdentitySecondEnsure", {ensure:true,type:5});
            }
          } else {
            let dataOption = {
              masseges: "你的账户余额不足，是否需要充值？",
              typePay: "2"
            };
            _this.$store.commit("isSigninPupopDis", true);
            _this.$store.commit("isSigninPupopDis", dataOption);
            _this.result = "1";
            _this.$store.commit("test", false);
          }
        } else {
          let dataOption = {
            masseges: "赠送账号不能为空",
            type: "2"
          };
          _this.$store.commit("isSigninPupopDis", true);
          _this.$store.commit("isSigninPupopDis", dataOption);
        }
      } else {
        let dataOption = {
          masseges: "您尚未达到VIP2，无法使用该功能",
          type: "2",
          showrecharge: 1
        };
        _this.$store.commit("isSigninPupopDis", true);
        _this.$store.commit("isSigninPupopDis", dataOption);
      }
    },
    buyBtn: function(event) {
      let _this = this;
      let el = event.currentTarget;
      let thisType = el.getAttribute("data-type");
      let _input = _this.$refs.inputNumber.value;
      // let moneyMy =document.getElementById('mymoney').getAttribute('data-money');
      let userInfo = this.$store.state.user.userInfo;
      let flow = this.thousandBitSeparator(parseFloat(userInfo.effective_flow));
      let moneyMy = userInfo
        ? userInfo.cai
        : null;
      let moneyPr = parseInt(this.isShow.price * this.result);
      let dataser = {
        product_type: thisType,
        product_id: this.$refs.isShowId.getAttribute("data-id"),
        name: this.$refs.proname.getAttribute("data-name"),
        num: _input,
        type: thisType
      };
      //        Http.get('/self').then(function(data){
      if (userInfo) {
        if (parseInt(moneyMy) >= moneyPr) {
          console.log(!userInfo.is_belong_personal_channel, parseFloat(this.isShow.price*this.result)<=parseFloat(userInfo.effective_flow));
          if(!userInfo.is_belong_personal_channel || parseFloat(this.isShow.price*this.result)<parseFloat(userInfo.effective_flow)){
            Http.post("/shop/exchangeProduct", dataser).then(function(data) {
              if (data.data.code == 0) {
                _this.$store.commit("tankuang", true);
                _this.$store.commit("tankuang", dataser);
                _this.result = "1";
                _this.$store.commit("test", false);
                //                  _this.shopmoney=shopmoney-moneyPr
                _this.$store.dispatch("userInfo");
              } else {
                let dataOption = {
                  masseges: data.data.message,
                  type: "1"
                };
                _this.$store.commit("isSigninPupopDis", true);
                _this.$store.commit("isSigninPupopDis", dataOption);
                _this.result = "1";
                _this.$store.commit("test", false);
              }
            });
          }else{
            let dataOption = {
              masseges: `由于您当前有效流水为：${flow}c,仅可购买价值此数量菜币道具,超出部分将额外收取10%菜币.`,
              type: "2"
            };
            _this.$store.commit('identityItemBuy',dataser);
            _this.$store.commit("isSigninPupopDis", true);
            _this.$store.commit("isSigninPupopDis", dataOption);
            _this.$store.commit("isIdentitySecondEnsure", {ensure:true,type:1});
            // _this.result = "1";
            // _this.$store.commit("test", false);
          }
        } else {
          let dataOption = {
            masseges: "你的账户余额不足，是否需要充值？",
            typePay: "2"
          };
          _this.$store.commit("isSigninPupopDis", true);
          _this.$store.commit("isSigninPupopDis", dataOption);
          _this.result = "1";
          _this.$store.commit("test", false);
        }
      } else {
        _this.$store.commit("showLoginDialog", true);
        _this.$store.commit("isloginBooleam", true);
        _this.result = "1";
        _this.$store.commit("test", false);
        if (_this.$refs.uersInfo) {
          _this.$refs.uersInfo.innerHTML = "0";
        }
      }
    },
    giveBtn: function(event) {
      //菜园背包赠送
      let _this = this;
      let el = event.currentTarget;
      let _input = _this.$refs.inputNumbers.value;
      let datas = {
        product_id: this.$refs.isShowId.getAttribute("data-product_id"),
        num: _input,
        receive: this.$refs.playerNamebag.value,
        nickname: this.$refs.playerNamebag.value,
        name: this.$refs.proname.getAttribute("data-name")
      };
      let userInfo_vip = _this.$store.state.user.userInfo
        ? _this.$store.state.user.userInfo.vip_level
        : null;
      if (userInfo_vip > 1) {
        if (datas.receive != "") {
          Http.get("/user/getByNickname", datas).then(function(data) {
            if (data.data.code == 0) {
              _this.$store.commit("givehide", true);
              _this.$store.commit("givehide", datas);
              _this.$store.commit("userlist", data.data.data);

              _this.result = "1";
              _this.$refs.playerNamebag.value = "";
            } else {
              let dataOption = {
                masseges: data.data.message,
                type: "2"
              };
              _this.$store.commit("isSigninPupopDis", true);
              _this.$store.commit("isSigninPupopDis", dataOption);
            }
          });
        } else {
          let dataOption = {
            masseges: "赠送账号不能为空",
            type: "2"
          };
          _this.$store.commit("isSigninPupopDis", true);
          _this.$store.commit("isSigninPupopDis", dataOption);
        }
        //
      } else {
        let dataOption = {
          masseges: "您尚未达到VIP2，无法使用该功能",
          type: "2",
          showrecharge: 1
        };
        _this.$store.commit("isSigninPupopDis", true);
        _this.$store.commit("isSigninPupopDis", dataOption);
      }
    },
    useBtn: function() {
      let _this = this;
      let _box = _this.$refs.gamelist;
      let _index = _box.selectedIndex;
      let _input = _this.$refs.inputNumbers.value;
      let digitreg = /^\d{5,}$/;
      let datas = {
        product_id: this.$refs.isShowId.getAttribute("data-product_id"),
        num: _input,
        game_account: this.$refs.playerNamebagb.value,
        game_area: _box.options[_index].value
      };
      if(!digitreg.test(this.$refs.playerNamebagb.value)){
        let dataOption = {
          masseges: "请填写正确的QQ号码",
          type: "2"
        };
        _this.$store.commit("isSigninPupopDis", true);
        _this.$store.commit("isSigninPupopDis", dataOption);
      }else{
        if(_box.options[_index].value==0){
          let dataOption = {
            masseges: '请选择角色所在区，如有疑问，请咨询客服：1056387396',
            type: "2"
          };
          this.$store.commit("isSigninPupopDis", true);
          this.$store.commit("isSigninPupopDis", dataOption);
          return;
        }
        Http.post("/shop/packageUseProduct", datas).then(function(data) {
          if (data.data.code == 0) {
            let dataOption = {
              masseges: data.data.message,
              type: "1"
            };
            _this.$store.commit("isSigninPupopDis", true);
            _this.$store.commit("isSigninPupopDis", dataOption);
            _this.$store.commit("test", false);
            _this.$store.dispatch("mybag");
            _this.$refs.playerNamebagb.value = "";
          } else {
            let dataOption = {
              masseges: data.data.message,
              type: "2"
            };
            _this.$store.commit("isSigninPupopDis", true);
            _this.$store.commit("isSigninPupopDis", dataOption);
          }
        });
      }
    },
    dotaBtn: function(event) {
      let _this = this;
      let _input = _this.$refs.inputNumbers.value;
      let reinput = _this.$refs.replayerNamebagb.value;
      let thisinput = _this.$refs.playerNamebagb.value;
      let datas = {
        product_id: this.$refs.isShowId.getAttribute("data-product_id"),
        num: _input,
        game_account: this.$refs.playerNamebagb.value,
        regame_account: this.$refs.replayerNamebagb.value
      };
      let RemailPhone = /(1[345789]\d{9}$)|(^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$)/i; //邮箱和手机号码正则
      if (reinput != "") {
        if (reinput == thisinput) {
          if (RemailPhone.test(_this.$refs.playerNamebagb.value)) {
            Http.post("/shop/packageUseProduct", datas).then(function(data) {
              if (data.data.code == 0) {
                let dataOption = {
                  masseges: data.data.message,
                  type: "1"
                };
                _this.$store.commit("isSigninPupopDis", true);
                _this.$store.commit("isSigninPupopDis", dataOption);
                _this.$store.commit("test", false);
                _this.$refs.playerNamebagb.value = "";
                _this.$refs.replayerNamebagb.value = "";
                _this.$store.dispatch("mybag");
              } else {
                let dataOption = {
                  masseges: data.data.message,
                  type: "2"
                };
                _this.$store.commit("isSigninPupopDis", true);
                _this.$store.commit("isSigninPupopDis", dataOption);
              }
            });
          } else {
            let dataOption = {
              masseges: "请填写正确的完美账号",
              type: "2"
            };
            _this.$store.commit("isSigninPupopDis", true);
            _this.$store.commit("isSigninPupopDis", dataOption);
          }
        } else {
          let dataOption = {
            masseges: "账号必须输入一致",
            type: "2"
          };
          _this.$store.commit("isSigninPupopDis", true);
          _this.$store.commit("isSigninPupopDis", dataOption);
        }
      } else {
        let dataOption = {
          masseges: "确认账号不可为空",
          type: "2"
        };
        _this.$store.commit("isSigninPupopDis", true);
        _this.$store.commit("isSigninPupopDis", dataOption);
      }
    }
  },

  mounted() {
    if (!this.$store.state.shop.game_list) {
    }
   this.$store.dispatch("game_list");

  },
  computed: {
    isShow: function() {
      return this.$store.state.shop.isShow;
    },
    treasureDiaShow: function() {
      return this.$store.state.shop.treasureDiaShow;
    },
    pop_getbtn: function() {
      return this.$store.state.shop.pop_getbtn
        ? this.$store.state.shop.pop_getbtn
        : null;
    },
    pop_buybtn: function() {
      return this.$store.state.shop.pop_buybtn
        ? this.$store.state.shop.pop_buybtn
        : null;
    },
    tankuang: function() {
      return this.$store.state.shop.tan_kuang;
    },
    givehide: function() {
      return this.$store.state.shop.givehide;
    },
    game_list: function() {
      return this.$store.state.shop.game_list
        ? this.$store.state.shop.game_list
        : null;
    },
    userInfo(){
      return this.$store.state.user.userInfo || null;
    }
  },
  components: {
    ShopSuccessPop,
    ShopGivePop,
    TreasureDia
  },
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
.warn{
  color: #FF4C22;
  font-size: 16px;
}
.warnTip{
  color: #A92F29;
  font-size: 14px;
}
.identity{
  margin-top: -5px;
  .warnTxt{
    width: 100%;
    color: #A92F29;
    text-align: left;
    line-height: 22px;
    font-size: 14px;
  }
  .why{
    color: #A92F29;
    text-align: left;
    line-height: 22px;
    font-size: 14px;
  }
  .tipWrap{
    text-align: left;
    font-size: 14px;
    line-height: 18px;
  }
  .tipTitle{
    color: #dcdcdc;
  }
  .tipConent{
    width: 436px;
    height: 80px;
    color: #A5A5A5;
    font-size: 12px;
    padding: 7px;
    background: url("../../assets/img/mall/identity_tip.png") no-repeat;
  }
  .question{
    width: 12px;
    height: 12px;
    display: inline-block;
  }
}
.marginIdentity{
  margin-top:0;
}
.notEnough{
  margin-top: -22px;
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
.pop-buy {
  background: url("../../assets/images/Mall-images/pop-buy.png") no-repeat !important;
}
.identityBuy{
   background: url("../../assets/img/mall/pop_buy_bg.png") no-repeat !important;
}
.identityGift{
   background: url("../../assets/img/mall/identity_gift.png") no-repeat !important;
}
.pop-give {
  background: url("../../assets/images/Mall-images/toolspop-bg.png") no-repeat !important;
}
.pop-use {
  background: url("../../assets/images/Mall-images/popUse.png") no-repeat !important;
}
.mall-pop-mt62 {
  margin-top: 62px !important;
}
.mall-pop-mt95 {
  margin-top: 75px !important;
}
.mall_ordinaryC {
  //普通 白色
  color: #fff !important;
}
.mall_superiorC {
  //优质 绿色
  color: #ade55c !important;
}
.mall_tateC {
  //稀有 蓝色
  color: #4b69ff !important;
}
.mall_storyC {
  //传说 紫色
  color: #8847ff !important;
}
.mall_immortalC {
  //不朽 橙色
  color: #ffa22a !important;
}
.mall_eternityC {
  //永恒 红色
  color: #b11c1c !important;
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
      border-radius: 5px;
      .shopToolsPop-box-bd {
        display: table-cell;
        vertical-align: middle;
        box-sizing: border-box;
        .shopToolsPop-box-bd-body {
          width: 540px !important;
          min-height: 525px;
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
              transition: all 0.5s;
              display: none;
            }
            .close:hover {
              background: url("../../assets/images/Mall-images/pop-close1.png")
                no-repeat;
              /*background-position: 1px 1px;*/
            }
          }
          .box-body {
            padding: 80px 25px 0;
            .box-body-left {
              .box-body-left-case {
                width: 182px;
                height: 258px;
                border: 1px solid #cc9955;
                padding: 7px;
                .box-body-left-pic {
                  width: 100%;
                  height: 100%;
                  overflow: hidden;
                  .pop-pic {
                    display: block;
                    width: 100%;
                    height: 100%;
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
              }
            }
            .box-body-right {
              .Pop-right {
                width: 230px;
                padding-top: 12px;
                .Pop-right-title {
                  text-align: left;
                  height: 22px;
                  .popGame-icon {
                    width: 22px;
                    height: 22px;
                    display: inline-block;
                  }
                  .popGame-name {
                    width: 200px;
                    display: inline-block;
                    white-space:nowrap;
                    overflow: hidden;
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
                      color: #989898;
                      margin-left: 6px;
                    }
                  }
                }
                .Pop-right-body {
                  margin-top: 62px;
                  .Pop-unitPrice {
                    text-align: left;
                    margin-bottom: 22px;
                    .Pop-unitPrice-name {
                      color: #dcdcdc;
                    }
                    .Pop-unitPrice-num {
                      color: #e1c076;
                    }
                  }
                  .Pop-buyNum {
                    text-align: left;
                    margin-bottom: 22px;
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
                    margin-bottom: 22px;
                    .Pop-buyPrice-name {
                      color: #dcdcdc;
                    }
                    .Pop-buyPrice-num {
                      color: #e1c076;
                      width: 128px;
                      overflow: hidden;
                      text-overflow: ellipsis;
                      white-space: nowrap;
                    }
                    .cbIcon {
                      position: relative;
                      top: 2px;
                      left: 6px;
                    }
                  }
                  .Pop-getPlayer {
                    text-align: left;
                    line-height: 30px;
                    width: 230px;
                    .Pop-getPlayer-left {
                      color: #dcdcdc;
                    }
                    .Pop-getPlayerList {
                      width: 134px;
                      height: 30px;
                      line-height: 30px;
                      border: 1px solid #a4975f;
                      background: #15161a;
                      color: #929292;
                      outline: none;
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
                  }
                }
                .Pop-right-footer {
                  width: 100%;
                }
              }
            }
            .Pop-right-footer {
              margin: 20px 0 0;
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
              margin:62px 0 0 ;
            }
            .giftIdentity{
              margin:12px 0 0 ;
            }
            .gift{
               margin:50px 0 0 ;
            }
            .useFooter{
              margin:74px 0 0 ;
            }
            .bagGive{
              margin:82px 0 0 ;
            }
          }
          .identityBody{
            padding:80px 25px 0 ;
          }
        }
      }
    }
  }
}
</style>


