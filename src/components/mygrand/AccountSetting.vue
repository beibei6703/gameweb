<template>
  <div id="basicSetting">
    <p class="component_name">基本信息</p>
    <div class="infoSetting clear">
      <div class="userpicture clear">
        <p class="block_title fleft">用户头像</p>
        <div class="upload_avatar fleft">
          <div class="upload fleft">

            <div class="upload_mask">
              <VueCropper ref="cropper" v-show="image" style="background-image:none;background-color:#000;" :img="image" :autoCrop="true" :autoCropWidth="90" :autoCropHeight="90" :fixedBox="true" @realTime="realPreview"></VueCropper>
              <div class="set-pic-upload" style="display:none">
                  <img :src="userInfo.avatar" ref="image" />
                  <input ref="file" type="file" accept="image/*" style="display:none" @change="onChange" />
                </div>
              <div class="upload_mask_up" v-if="isShowAddBtn">
                <p class="add_avatar" @click="onLoad"><img src="../../assets/img/garden/add.png" alt=""></p>
                <p class="tip">选择一张本地的图片上传为图像</p>
                <p class="tip">仅支持JPG,PNG格式</p>
              </div>

            </div>
            <div class="btns">
              <p class="save_btn fleft" @click="onSaveAvatar">保存</p>
              <p class="cancel_btn fright" @click="onCancel">取消</p>
            </div>
          </div>
          <div class="ninePixel fleft">
            <p class="txt_tip">90x90像素</p>
            <p class="txt_tip">自动生成</p>
            <span><img :src="previews.url" :style="previews.img" alt="" class="ninePixel_img"></span>
          </div>
          <div class="fivePixel fleft">
            <div class="fivePixel-text">
              <p class="txt_tip">50x50像素</p>
              <p class="txt_tip">自动生成</p>
            </div>
            <span><img :src="previews.url" :style="previews.img" alt="" class="fivePixel_img"></span>
          </div>
          <div class="twentyPixel fleft">
            <div class="pos_wrap">
              <p class="txt_tip">20x20像素</p>
              <p class="txt_tip">自动生成</p>
            </div>
            <span><img :src="previews.url" :style="previews.img" alt="" class="fivePixel_img"></span>
          </div>
        </div>
      </div>
      <div class="nickname margin-top clear">
        <p class="block_title fleft">用户昵称</p>
        <div class="nickname_wrap fleft">
          <div class="input_wrap">
            <input type="text" ref="nicknames" class="input_nickname fleft" v-model="userInfo.nickname"  v-if="nicknameShow" readonly="readonly" >
            <input type="text" ref="nickname" class="input_nickname fleft" v-model="userInfo.nickname"  v-if="nicknameShows" :class="{active:nicknameShows}">
            <p class="save_nickname fleft" v-if="nicknameShow" @click="modifyfocus">修改</p>
            <p class="save_nickname fleft" @click="modifyNickname" v-if="nicknameShows">保存</p>
          </div>
          <p class="change_tip">每30天只能修改一次昵称</p>
        </div>
      </div>
      <div class="introduce margin-top clear">
        <p class="block_title fleft">个人签名</p>
        <div class="introduce_wrap  fleft" :class="{focus:infocus}">

          <textarea ref="bio" v-model="userInfo.bio" @focus="getFocus" @blur="clearFucus"></textarea>
          <p class="theRemaining">还可以输入{{lengthArc}}个字符</p>
          <p class="edit_btn" @click="modifyBio">编辑</p>
        </div>
      </div>
      <div class="upgrade margin-top clear">
        <p class="block_title fleft">账号等级:</p>
        <p class="yourLevel fleft">lv{{getUserInfo.level}} <span class="yellow">(预测,做任务可以获得更多经验值加快升级)</span></p>
      </div>
      <div class="upgrade clear" >
        <p class="block_title fleft">VIP等级:</p>
        <p class="yourLevel fleft">Vip{{getUserInfo.vip_level}} <span class="yellow">(充值可以获得vip经验值,1元=1vip经验)</span></p>
      </div>
    </div>
    <div class="accountSetting clear">
      <div class="binding_state">
        <div class="binding_details clear">
          <p class="binding_title fleft">邮箱绑定</p>
          <input type="text" :value="getUserInfo.email?getUserInfo.email:'未绑定'" readonly :class="'input'+(getUserInfo.email?' active':'')">
          <p @click="openModifyPopup(getUserInfo.email?'ModifyEmail':'UnbindEmail')" class="bind_btn">{{getUserInfo.email?'更改':'绑定'}}</p>
        </div>
        <div class="binding_details clear">
          <p class="binding_title fleft">手机绑定</p>
          <input type="text" :value="getUserInfo.mobile?getUserInfo.mobile:'未绑定'" readonly :class="'input'+(getUserInfo.mobile?' active':'')">
          <p @click="openModifyPopup(getUserInfo.mobile?'ModifyPhone':'UnbindPhone')" class="bind_btn">{{getUserInfo.mobile?'更改':'绑定'}}</p>
        </div>
        <div class="binding_details clear">
          <p class="binding_title fleft">密码设置</p>
          <input type="text" value="未绑定" style="opacity:0;filter:alpha(opacity=0)" readonly class="input">
          <p @click="openModifyPopup('ModifyPassword')" class="bind_btn">更改</p>
        </div>
      </div>
      <div class="thirdPartyLogin clear">
        <p class="block_tip">绑定以下第三方账号信息后,可以进行快捷登录</p>
        <div class="thirdPartyLogin_block">
          <ul class="thirdPartyLogin_ul">
            <li v-for="(val,key) in getThirdMessage" :key="key" :class="{active:val.isbind}">
              <p class="bind_type fleft">
                <span class="bind_icon" :class="`bind_icon${val.id}`"></span>
                <span class="bind_classify">{{val.title}}</span>
              </p>
              <p class="toBind_btn fright"  @click="onBind(val.value,val.isbind?1:2)">{{val.isbind?'解绑':'绑定'}}</p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
let matchWords;
import Http from "./../../common/http";
import { mapMutations, mapState } from "vuex";
import VueCropper from "vue-cropper";
import axios from "axios";
export default {
  data() {
    return {
      channel: "",
      lengthArc: 60,
      textLength: 0,
      nickNameLen: false,
      nicknameShow: true,
      nicknameShows: false,
      userInfo: { id: 0, nickname: "", bio: "", avatar: "" },
      image: "",
      previews: {
        url: "",
        img: {}
      },
      isShowAddBtn: true,
      infocus:false,
    };
  },
  methods: {
    openModifyPopup(type){
      let userInfo = this.$store.state.user.userInfo || null ;
      if(type=='ModifyEmail'){
        this.$store.commit('mutationsisShowModifyEmail',true)
      }else if(type=='UnbindEmail'){
        this.$store.commit('mutationsisShowUnbindEmail',true)
      }else if(type=='ModifyPhone'){
        this.$store.commit('mutationsisShowModifyPhone',true)
      }else if(type=='UnbindPhone'){
        this.$store.commit('mutationsisShowUnbindPhone',true)
      }else if(type=='ModifyPassword'){
        if(!userInfo.email && !userInfo.mobile){
          let dataOption ={
            'masseges':'请先绑定手机/邮箱',
          }
          this.$store.commit('isSigninPupopDis',true);
          this.$store.commit('isSigninPupopDis',dataOption);
        }else{
          this.$store.commit('mutationsisShowModifyPassword',true)
        }
      }
    },
    modifyfocus() {
      let self = this;
      Http.get("/lastUpdatedNickname").then(function(res) {
        // console.log('昵称信息',res)
        if (res.data.code == 0) {
          if (res.data.data.canUpdate == true) {
            self.nicknameShow = !self.nicknameShow;
            self.nicknameShows = !self.nicknameShows;
            if (self.nicknameShows == true) {
              setTimeout(() => {
                self.done();
              }, 100);
            }
          } else {
            self.alert("每30天只能修改一次昵称");
          }
        } else {
          self.alert(res.data.message);
        }
      });
    },
    getFocus(){
      this.infocus=true;
    },
    clearFucus(){
      this.infocus=false;
    },
    done() {
      this.$refs.nickname.focus();
    },
    modifyNickname: function() {
      var self = this;
      var inputNum = this.userInfo.nickname.replace(/[^\x00-\xff]/g, "**")
        .length; //得到输入的字节数
      if (inputNum >= 4) {
        if (inputNum <= 14) {
          matchWords = this.userInfo.nickname.length;
          this.nickNameLen = true;

          setTimeout(() => {
            //              return console.log(this.$refs.nickname.value)
            if (this.nickNameLen == true) {
              Http.post("updateNickname", {
                nickname: this.$refs.nickname.value
              }).then(function(response) {
                console.log("修改昵称", response);
                if (response.data.code == 0) {
                  self.$store.dispatch("userInfo");
                  // self.getUserInfo();
                  // self.alert('修改成功');
                  self.nicknameShow = true;
                  self.nicknameShows = false;
                  self.$store.dispatch("getNews");
                  let dataOption = {
                    masseges: "修改成功！",
                    type: "2"
                  };
                  self.$store.commit("isSigninPupopDis", true);
                  self.$store.commit("isSigninPupopDis", dataOption);
                } else {
                  self.alert(response.data.message);
                }
              });
            }
          }, 200);
        } else {
          this.alert("昵称设置最多7个中文或14个字符");
        }
      } else {
        this.alert("昵称设置最少2个中文或4个字符");
      }
    },
    onLoad: function() {
      this.$refs.file.click();
    },
    onChange: function(e) {
      this.uploadImg(e, 1);
    },
    realPreview: function(data) {
      if (data.h == 0) return;
      this.isShowAddBtn = false;
      console.log("我是什么呀", data);

      this.previews = data;
    },
    uploadImg(e, num) {
      //上传图片
      // this.option.img
      var file = e.target.files[0];
      if (!/\.(gif|jpg|jpeg|png|bmp|GIF|JPG|PNG)$/.test(e.target.value)) {
        if (e.target.value != e.target.value) {
          this.alert("图片类型必须是.gif,jpeg,jpg,png,bmp中的一种");
        }
        return false;
      }

      var reader = new FileReader();
      reader.onload = e => {
        let data;
        if (typeof e.target.result === "object") {
          // 把Array Buffer转化为blob 如果是base64不需要
          data = window.URL.createObjectURL(new Blob([e.target.result]));
        } else {
          data = e.target.result;
        }
        if (num === 1) {
          this.image = data;
        }
      };
      reader.readAsArrayBuffer(file);
    },
    onSaveAvatar: function() {
      var self = this;
      this.$refs.cropper.getCropData(function(data) {
        Http.post("updateAvatar", { avatar: data }).then(function(res) {
          if (res.data.code == 0) {
            self.$store.dispatch("userInfo");
            self.alert("头像上传成功");
            // self.$store.dispatch('getNews');
          } else {
            self.alert(res.data.message);
          }
        });
      });
    },
    onCancel() {
      this.isShowAddBtn = true;
      this.image = "";
      this.previews.url = this.$store.state.user.userInfo.avatar;
      this.previews.img = {};
    },
    onBind: function(channel, type) {
      var self = this;
      var params = {
        channel: channel
      };
      if (type == 2) {
        var client = axios.create({ baseURL: "https://www.api.com" });
        client.post("social/bind", params).then(function(response) {
          if (response.data.code == 0) {
            self.openWin(response.data.data.url, channel);
          } else {
            self.alert(response.data.message);
          }
        });
      } else {
        Http.post("social/unbind", params).then(response => {
          if (response.data.code == 0) {
            self.alert(response.data.message);
            setTimeout(() => {
              window.location.reload();
            }, 200);
            self.$store.dispatch("actionsThirds");
          }
          self.alert(response.data.message);
        });
      }
    },
    openWin: function(url, type) {
      var setWin = {
        qq:
          "qq----TencentLogin----width=616,height=616,menubar=0,scrollbars=1,resizable=1,status=1,titlebar=0,toolbar=0,location=1",
        wechat:
          "wechat----TencentLogin----width=616,height=616,menubar=0,scrollbars=1,resizable=1,status=1,titlebar=0,toolbar=0,location=1",
        weibo:
          "weibo----WeiboLogin----width=616,height=616,menubar=0,scrollbars=1,resizable=1,status=1,titlebar=0,toolbar=0,location=1"
      };
      setTimeout(() => {
        var arr = setWin[type].split("----");
        var new_win = window.open("", arr[1], arr[2]);
        window.oauthLogin = this.closeWin;
        this.channel = type;
        window.addEventListener &&
          window.addEventListener("message", this.closeWin);
        new_win.location.href = url;
      }, 300);
    },
    closeWin: function(obj) {
      var self = this;
      var o = JSON.parse(obj.data);
      if (o.origin != "bind") return;
      if (o.error !== undefined) {
        return;
      }
      var client = axios.create({ baseURL: "https://www.api.com" });
      var params = { code: o.code, state: o.state, channel: this.channel };
      client.post("social/bindSocial", params).then(function(response) {
        if (response.data.code == 0) {
          // self.loadSocial();
          self.$store.dispatch("actionsThirds");
          self.alert("绑定成功");
        } else {
          self.alert(response.data.message);
        }
      });
    },
    modifyBio: function() {
      var self = this;
      Http.post("updateBio", { bio: this.$refs.bio.value }).then(function(
        response
      ) {
        if (response.data.code == 0) {
          self.alert("修改成功");
        } else if (response.data.code == 41000) {
          self.alert(response.data.data.bio[0]);
        } else {
          self.alert(response.data.message);
        }
      });
    },
    getuserinfos: function() {
      var self = this;
      this.$store.dispatch("userInfo").then(function(res) {
        self.userInfo = res && res.data.data;
        self.previews.url = res.data.data.avatar;
        console.log("我是用户信息吗", self.previews.url, res.data.data);
      });
    }
  },
  created: function() {
    // this.getuserinfos();
  },
  mounted() {
    this.getuserinfos();
    this.$store.dispatch("actionsThirds");
  },
  computed: {
    getUserInfo() {
      return this.$store.state.user.userInfo;
    },
    getThirdMessage() {
      console.log('第三方绑定',this.$store.state.user.thirdMessage);
      return this.$store.state.user.thirdMessage;
    }
  },
  watch: {
    userInfo: {
      handler: function(val, oldval) {
        var inputNum = val.bio.replace(/[^\x00-\xff]/g, "**").length; //得到输入的字节数
        if (inputNum < 61) {
          matchWords = val.bio.length;
          this.lengthArc = 60;
          this.lengthArc = this.lengthArc - inputNum;
        }
        if (inputNum > 60) {
          this.userInfo.bio = val.bio.substring(0, matchWords); //如果超过200字节，就截取到200字节
        }
      },
      deep: true
    }
  },
  components: {
    VueCropper
  }
};
</script>

<style scoped lang="scss">
input,
textarea {
  outline: none;
  border: 0;
  background: none;
}

input::-webkit-input-placeholder {
  color: #dcdcdc;
}
input::-moz-input-placeholder {
  color: #dcdcdc;
}
input::-o-input-placeholder {
  color: #dcdcdc;
}
input::-ms-input-placeholder {
  color: #dcdcdc;
}
div::after,
ul::after,
li::after {
  content: "";
  display: block;
  clear: both;
  margin: 0;
  padding: 0;
}
#basicSetting {
  padding: 26px 0 0 30px;
  .component_name {
    color: #dcdcdc;
    font-size: 15px;
    text-align: left;
  }
  .infoSetting,
  .accountSetting {
    width: 950px;
    background: #2e2e31;
  }
  .infoSetting {
    padding-top: 50px;
    margin: 14px 0 12px 0;
    padding-bottom: 40px;
    .upload_avatar {
      .upload {
        width: 215px;
        margin-right: 50px;
        .upload_mask {
          width: 215px;
          height: 215px;
          background: #888888;
          .upload_mask_up {
            padding-top: 68px;
          }
          .add_avatar {
            width: 50px;
            height: 50px;
            line-height: 50px;
            border: #b8b8b8 1px solid;
            cursor: pointer;
            margin: 0 auto 16px;
          }
          .tip {
            line-height: 18px;
            font-size: 12px;
            color: #565656;
            text-align: center;
          }
        }
        .btns {
          width: 108px;
          margin: 12px auto 0;
          p {
            width: 46px;
            height: 24px;
            border: #989898 1px solid;
            text-align: center;
            line-height: 24px;
            border-radius: 2px;
            font-size: 14px;
            color: #989898;
            cursor: pointer;
          }
        }
      }
    }
    .ninePixel {
      width: 90px;
      height: 135px;
      overflow: hidden;
      margin-right: 50px;
      font-size: 14px;
      margin-top: 84px;
      line-height: 18px;
      color: #989898;
      span {
        width: 90px;
        height: 90px;
        display: block;
        // border-radius: 50%;
        overflow: hidden;
        margin: 10px auto;
        // transform: scale(0.71);
      }
      img {
        width: 90px;
        height: 90px;
      }
    }
    .fivePixel {
      width: 90px;
      height: 135px;
      position: relative;
      top: 0;
      left: 0;
      overflow: hidden;
      font-size: 12px;
      font-size: 14px;
      margin-top: 84px;
      line-height: 18px;
      color: #989898;
      .fivePixel-text {
        position: absolute;
        top: 36px;
        left: 6px;
        color: #989898;
      }
      span {
        width: 90px;
        height: 90px;
        display: block;
        overflow: hidden;
        position: absolute;
        bottom: -20px;
        left: -5px;
        // border-radius: 50%;
        transform: scale(0.56);
      }
      img {
        width: 90px;
        height: 90px;
      }
    }
    .twentyPixel{
      width: 90px;
      height: 135px;
      overflow: hidden;
      margin-right: 50px;
      font-size: 14px;
      margin-top: 84px;
      line-height: 18px;
      color: #989898;
      position: relative;
      .pos_wrap{
        position: absolute;
        top: 66px;
        left: 18px;
        color: #989898;
      }
      span {
        width: 90px;
        height: 90px;
        display: block;
        border-radius: 50%;
        overflow: hidden;
        margin: 10px auto;
        transform: scale(0.22);
        position: absolute;
        top:70px;
        left: 10px;
      }
      img {
        width: 90px;
        height: 90px;
      }
    }
    .nickname {
      height: 50px;
      .nickname_wrap {
        height: 30px;
        .input_wrap {
          .input_nickname {
            height: 26px;
            line-height: 26px;
            border: #434343 1px solid;
            padding: 0 10px;
            display: block;
            float: left;
            color: #dcdcdc;
            font-size: 14px;
            background: none;
            margin-right: 6px;
          }
          input.active:focus {
            border-color: #cb9646 !important;
          }
          .save_nickname {
            width: 58px;
            height: 28px;
            text-align: center;
            font-size: 14px;
            color: #7e4b08;
            cursor: pointer;
            line-height: 28px;
            background: url("../../assets/img/garden/btn_n.png") no-repeat;
          }
        }
        .change_tip {
          color: #cb9646;
          font-size: 12px;
          padding-top: 10px;
          text-align: left;
        }
      }
    }
    .introduce {
      height: 130px;
      .introduce_wrap {
        padding: 3px 10px;
        min-width: 480px;
        max-width: 480px;
        max-height: 86px;
        min-height: 86px;
        line-height: 20px;
        font-size: 15px;
        color: #565656;
        position: relative;
        top: 0;
        left: 0;
        border: #434343 1px solid;
        textarea {
          min-width: 460px;
          max-width: 460px;
          max-height: 60px;
          min-height: 60px;
          color: #565656;
          display: block;
          background: none;
          padding: 0;
          margin: 0;
        }
        .theRemaining {
          position: absolute;
          right: 10px;
          text-align: right;
          font-size: 14px;
          bottom: 0;
          line-height: 20px;
          color: #565656;
        }
        .edit_btn {
          position: absolute;
          bottom: -40px;
          left: 0;
          width: 58px;
          height: 28px;
          text-align: center;
          font-size: 14px;
          color: #7e4b08;
          cursor: pointer;
          line-height: 28px;
          background: url("../../assets/img/garden/btn_n.png") no-repeat;
        }
      }
      .focus{
        border: 1px solid #cb9646;
      }
    }
    .upgrade {
      .yourLevel {
        height: 30px;
        line-height: 30px;
        font-size: 14px;
      }
    }
  }

  .block_title,
  .binding_title {
    padding-left: 48px;
    padding-right: 20px;
    font-size: 14px;
    color: #dcdcdc;
    line-height: 30px;
    text-align: right;
    width: 130px;
  }
  .accountSetting {
    padding: 40px 0;
    .binding_details {
      padding-bottom: 30px;
      .input {
        float: left;
        width: 240px;
        height: 26px;
        border: #434343 1px solid;
        line-height: 26px;
        padding: 0 10px;
        margin-right: 6px;
        color: #888;
        font-size: 15px;
        &.active {
          color: #dcdcdc;
        }
      }
      .bind_btn {
        float: left;
        width: 58px;
        height: 28px;
        text-align: center;
        font-size: 14px;
        color: #7e4b08;
        cursor: pointer;
        line-height: 28px;
        background: url("../../assets/img/garden/btn_n.png") no-repeat;
      }
    }
    .thirdPartyLogin {
      .block_tip {
        font-size: 14px;
        color: #dcdcdc;
        line-height: 30px;
        text-align: left;
        padding-left: 48px;
      }
      .thirdPartyLogin_block {
        background: #3e3e3e;
        padding: 30px 50px 30px 90px;
        li {
          height: 28px;
          line-height: 28px;
          margin-bottom: 12px;

          .bind_type {
            .bind_icon {
              width: 28px;
              height: 28px;
              display: block;
              float: left;
              margin-right: 10px;
            }
            .bind_icon1 {
              background: url("../../assets/img/garden/bqq_n.png") no-repeat
                center;
            }
            .bind_icon2 {
              background: url("../../assets/img/garden/bwx_n.png") no-repeat
                center;
            }
            .bind_icon3 {
              background: url("../../assets/img/garden/bwb_n.png") no-repeat
                center;
            }

            .bind_classify {
              font-size: 15px;
              color: #9d9d9d;
              display: block;
              float: left;
            }
          }
           &.active{
             .bind_icon1 {
              background: url("../../assets/img/garden/bqq_a.png") no-repeat
                center;
            }
            .bind_icon2 {
              background: url("../../assets/img/garden/bwx_a.png") no-repeat
                center;
            }
            .bind_icon3 {
              background: url("../../assets/img/garden/bwb_a.png") no-repeat
                center;
            }
            .toBind_btn{
              width: 58px;
              height: 28px;
              border:#d5a649 1px solid;border-radius:4px;
              color:#d5a649;
              background:none;
            }

           }
          .toBind_btn {
            width: 58px;
            height: 28px;
            text-align: center;
            font-size: 14px;
            color: #7e4b08;
            cursor: pointer;
            line-height: 28px;
            background: url("../../assets/img/garden/btn_n.png") no-repeat;
          }
        }
      }
    }
  }
}

.yellow {
  color: #9f5b03;
}
.margin-top {
  margin-top: 25px;
}
</style>
