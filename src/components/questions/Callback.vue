<template>
  <div id="callback">
    <div class="box">
      <!-- 问题反馈 -->
      <div class="callback">
        <div class="type">
          <div class="left">
            <span>问题类型</span>
            <span class="putin1" @click="display1">{{category}}
              <!--<i>▼</i>-->
            </span>
            <div class="select1" v-if="isselect1">
              <ul>
                <li @click="display2('账号问题')">账号问题</li>
                <li @click="display2('预测问题')">预测问题</li>
                <li @click="display2('联赛问题')">联赛问题</li>
                <li @click="display2('市场问题')">市场问题</li>
                <li @click="display2('Roll问题')">Roll问题</li>
                <li @click="display2('其他')">其他</li>
              </ul>
            </div>
          </div>
          <div class="right">
            <span>语言</span>
            <span class="putin2" @click="display3">{{language}}
              <!--<i @click="display3">▼</i>-->
            </span>
            <div class="select2" v-if="isselect2">
              <ul>
                <li @click="display4('中文')">中文</li>
                <li @click="display4('英文')">英文</li>
              </ul>
            </div>
          </div>
        </div>
        <div class="title">
          <span>问题题目</span>
          <input type="text" maxlength="60" v-model="title" @blur="check1" @focus="into1">
          <div class="tips1">还可以输入{{titlelength}}个字</div>
          <div class="warn1" v-show="flag">该项不能为空</div>
        </div>
        <div class="describe">
          <span>问题描述</span>
          <textarea id="describe" maxlength="200" v-model="content" @blur="check2" @focus="into2"></textarea>
          <div class="tips2">还可以输入{{contentlength}}个字</div>
          <div class="warn2" v-show="bool">该项不能为空</div>
        </div>
        <div class="screenshot">
          <span>相关截图</span>
          <div class="update pointer" @click="mostimg">
            <div class="tips3">最多上传4张图片</div>
            <input type="file" name="file" id="file" accept="image/png,image/gif,image/jpeg" multiple @change='upload' v-show="isinput" ref="inputimg">
          </div>
          <div id="pic">
            <div class="picroom" v-for="(item,index) in imgs" :key="index">
              <img :src="item" alt="">
              <div class="deletebtn" @click="deleteimg(index)"></div>
            </div>
          </div>
        </div>

        <div class="submit" @click="submit">提交</div>
      </div>
    </div>
    <!-- 弹窗 -->
    <div id="signin" v-show="this.$store.state.home.isSigninDiaShow">
      <div class="wrap_signin wrap_signin_h258">
        <div class="signin_top signin_top_258">
          <h3 class="theme_color fleft">提示</h3>
          <i class="x fright pointer x_258" @click="handleclose" v-if="isyes"></i>
          <i class="x fright pointer x_258" @click="handleclose1" v-if="!isyes"></i>
        </div>
        <div class="signincontent">
          <div class="signinreward">
            <img src="../../assets/images/mygrand/successcom.png" alt="" class="successpic" v-if="isyes">
            <p class="successinfo" v-if="isyes">{{message}}</p>
            <p class="successinfo1" v-if="!isyes">图片数量已达上限</p>
          </div>
          <i class="enter pointer" @click="handleclose" v-if="isyes"></i>
          <i class="enter pointer" @click="handleclose1" v-if="!isyes"></i>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Http from "../../common/http";
export default {
  data() {
    return {
      num: 0,
      flag: false,
      bool: false,
      isinput: true,
      isyes: true,
      category: "账号问题",
      title: "",
      content: "",
      language: "中文",
      titlelength: 60,
      contentlength: 200,
      params: { category: "账号问题", language: "中文" ,pic:[]},
      message: "",
      imgs: [],
      isselect1: false,
      isselect2: false,
      issameimg: true,
      sameimgupload: true,
      isimg1: false
    };
  },
  methods: {
    deleteimg(index) {
      // 点图片小×来删除数据，value = '' 用来解决图片删除后还能再次上传该图片
      this.imgs.splice(index, 1);
      this.isinput = true;
      this.$refs.inputimg.value = "";
    },
    mostimg() {
      // 判断弹窗是否显示（由于一个页面存在两个弹窗，所以用isyes来控制弹窗显示内容）
      if (this.imgs.length >= 4) {
        this.isyes = false;
        this.$store.commit("isSigninDiaShowDis", true);
      }
    },
    display1() {
      this.isselect1 = !this.isselect1;
    },
    display2(newV) {
      this.isselect1 = !this.isselect1;
      this.category = newV;
    },
    display3() {
      this.isselect2 = !this.isselect2;
    },
    display4(newV) {
      this.isselect2 = !this.isselect2;
      this.language = newV;
    },
    upload(e) {
      this.isimg1 = false;
      this.issameimg = true;
      let reader = new FileReader();
      let img1 = e.target.files[0];
      if (img1) {
        reader.readAsDataURL(img1);
        reader.onloadend = e => {
          // 遍历图片数组，查找上传的图片是否有相同的
          for (let i = 0; i < this.imgs.length; i++) {
            if (reader.result == this.imgs[i]) {
              this.issameimg = false;
              this.isinput = true;
            }
          }
          if (this.issameimg) {
            this.imgs.push(reader.result);
            this.params.pic.push(e.target.result)
          }
        };
        this.isimg1 = true;
      }
      // 判断input是否显示,this.imgs.length >= 3用来判断数组中图片个数；
      // this.issameimg用来判断是否有重复图片；this.isimg1判断是否选择了图片
      if (this.imgs.length >= 3 && this.issameimg && this.isimg1) {
        this.isinput = false;
      }
    },
    submit() {
      console.log(this.params.title, 11);
      console.log(this.params.category, 22);
      console.log(this.params.content, 33);
      console.log(this.params.pic, 44);
      console.log(this.params.language, 55);
      if (
        this.params.title &&
        this.params.category &&
        this.params.content &&
        this.params.language
      ) {
        console.log(this.params.title, 1);
        console.log(this.params.category, 2);
        console.log(this.params.content, 3);
        console.log(this.params.pic, 4444);
        console.log(this.params.language, 5);
        this.isyes = true;
        this.$store.commit("isSigninDiaShowDis", true);
        Http.post("/feedback", this.params)
          .then(response => {
            this.message = response.data.message;
          })
          .catch(Http.onError);
      } else {
        this.check1();
        this.check2();
        return;
      }
    },
    check1() {
      if (!this.title) {
        this.flag = true;
      }
    },
    into1() {
      this.flag = false;
    },
    check2() {
      if (!this.content) {
        this.bool = true;
      }
    },
    into2() {
      this.bool = false;
    },
    // ------------------------弹窗------------------------
    handleclose() {
      this.isyes = true;
      this.$store.commit("isSigninDiaShowDis", false);
      this.title = "";
      this.category = "账号问题";
      this.content = "";
      this.language = "中文";
      this.imgs = [];
    },
    handleclose1() {
      this.$store.commit("isSigninDiaShowDis", false);
    }
  },
  watch: {
    title(newV) {
      this.titlelength = 60 - newV.length;
      this.params.title = newV;
    },
    category(newV) {
      this.params.category = newV;
    },
    content(newV) {
      this.contentlength = 200 - newV.length;
      this.params.content = newV;
    },
    language(newV) {
      this.params.language = newV;
    }
  },
  mounted() {
    let _this = this;
    document.body.addEventListener("click", function(e) {
      if (e.target.className != "putin1") {
        _this.isselect1 = false;
      }
      if (e.target.className != "putin2") {
        _this.isselect2 = false;
      }
    });
  }
};
</script>
<style scoped lang='scss'>
#callback {
  width: 925px;
  float: left;
  margin-bottom: 50px;
  .box {
    width: 925px;
    .callback {
      width: 925px;
      padding: 0 60px;
      height: 737px;
      padding-top: 40px;
      background-color: #242628;
      .type {
        height: 30px;
        .left {
          float: left;
          width: 400px;
          text-align: left;
          position: relative;
          span {
            float: left;
            height: 30px;
            width: 200px;
            position: relative;
            line-height: 30px;
            &:first-child {
              width: 100px;
            }
            &:nth-child(2) {
              font-size: 14px;
              width: 200px;
              height: 30px;
              padding-left: 4px;
              cursor: pointer;
              padding-right: 4px;
              text-align: left;
              /*background:#15161a;*/
              background: #15161a
                url("../../assets/images/Question-images/problem_icon.png")
                no-repeat right center;
              border-right: 1px solid #414141;
              border-bottom: 1px solid #414141;
              /*i {
                position: absolute;
                font-size: 12px;
                right: 4px;
                top: 0px;
              }*/
            }
          }
          .select1 {
            position: absolute;
            width: 200px;
            height: 124px;
            background-color: #15161a;
            border: 1px solid #414141;
            line-height: 20px;
            top: 29px;
            z-index: 10;
            padding-bottom: 4px;
            font-size: 14px;
            left: 100px;
            ul {
              width: 200px;
              height: 120px;
              li {
                width: 100%;
                height: 20px;
                padding-left: 4px;
                line-height: 20px;
                &:hover {
                  background-color: #292b2f;
                }
              }
            }
          }
        }
        .right {
          width: 270px;
          float: left;
          float: left;
          width: 400px;
          text-align: left;
          position: relative;
          span {
            float: left;
            height: 30px;
            width: 200px;
            position: relative;
            line-height: 30px;
            &:first-child {
              width: 100px;
            }
            &:nth-child(2) {
              font-size: 14px;
              width: 200px;
              height: 30px;
              padding-left: 4px;
              cursor: pointer;
              padding-right: 4px;
              text-align: left;
              /*background-color: #15161a;*/
              background: #15161a
                url("../../assets/images/Question-images/problem_icon.png")
                no-repeat right center;
              border-right: 1px solid #414141;
              border-bottom: 1px solid #414141;
              i {
                position: absolute;
                font-size: 12px;
                right: 4px;
                top: 0px;
              }
            }
          }
          .select2 {
            position: absolute;
            width: 200px;
            height: 44px;
            background-color: #15161a;
            border: 1px solid #414141;
            line-height: 20px;
            top: 29px;
            z-index: 10;
            padding-bottom: 4px;
            font-size: 14px;
            left: 100px;
            ul {
              width: 200px;
              height: 40px;
              li {
                width: 100%;
                height: 20px;
                padding-left: 4px;
                line-height: 20px;
                &:hover {
                  background-color: #292b2f;
                }
              }
            }
          }
        }
      }
      .title {
        height: 35px;
        margin-top: 35px;
        position: relative;
        margin-bottom: 40px;
        span {
          float: left;
          margin-right: 36px;
          line-height: 35px;
        }
        input {
          border: 0;
          width: 632px;
          height: 35px;
          float: left;
          color: #dcdcdc;
          font-size: 20px;
          border-radius: 2px;
          line-height: 35px;
          outline: none;
          padding-left: 4px;
          background-color: #15161a;
          border-right: 1px solid #414141;
          border-bottom: 1px solid #414141;
        }
        .tips1 {
          position: absolute;
          font-size: 10px;
          color: #989898;
          bottom: -20px;
          right: 70px;
        }
        .warn1 {
          position: absolute;
          font-size: 10px;
          color: #ed4b4b;
          bottom: -20px;
          left: 100px;
        }
      }
      .describe {
        height: 230px;
        position: relative;
        span {
          float: left;
          margin-right: 32px;
        }
        textarea {
          border: 0;
          width: 632px;
          height: 230px;
          float: left;
          resize: none;
          color: #dcdcdc;
          font-size: 20px;
          border-radius: 2px;
          line-height: 23px;
          outline: none;
          padding-left: 4px;
          margin-left: 4px;
          background-color: #15161a;
          border-right: 1px solid #414141;
          border-bottom: 1px solid #414141;
        }
        .tips2 {
          position: absolute;
          font-size: 10px;
          color: #989898;
          bottom: -20px;
          right: 70px;
        }
        .warn2 {
          position: absolute;
          font-size: 10px;
          color: #ed4b4b;
          bottom: -20px;
          left: 100px;
        }
      }
      .screenshot {
        height: 150px;
        margin-top: 40px;
        span {
          float: left;
          margin-right: 32px;
        }
        .update {
          position: relative;
          width: 150px;
          float: left;
          color: #414141;
          height: 150px;
          background: url("../../assets/images/Question-images/inputfile.png")
            center 44px no-repeat;
          border: 1px dashed #414141;
          input {
            cursor: pointer;
            opacity: 0;
            border-radius: 2px;
            width: 150px;
            height: 150px;
          }
          .tips3 {
            position: absolute;
            font-size: 14px;
            color: #535353;
            top: 90px;
            left: 20px;
          }
        }
        #pic {
          width: 500px;
          height: 150px;
          float: left;
          margin-left: 20px;
          .picroom {
            position: relative;
            width: 100px;
            height: 150px;
            float: left;
            display: table-cell;
            vertical-align: middle;
            line-height: 150px;
            margin-right: 10px;
            overflow: hidden;
            img {
              width: 100px;
              height: auto;
              vertical-align: middle;
            }
            .deletebtn {
              background: url("../../assets/images/Question-images/delete.png");
              position: absolute;
              width: 15px;
              height: 15px;
              right: 0;
              top: 10px;
              cursor: pointer;
            }
          }
        }
      }
      .submit {
        width: 90px;
        height: 35px;
        color: #8f5708;
        cursor: pointer;
        border-radius: 2px;
        margin-left: 96px;
        margin-top: 40px;
        line-height: 35px;
        font-size: 16px;
        background: url("../../assets/images/Question-images/2.0_04.png")
          repeat-x;
        &:hover {
          background: url("../../assets/images/Question-images/22_02.png")
            repeat-x;
        }
      }
    }
  }
  #signin {
    .wrap_signin {
      .signinreward {
        width: 354px;
        height: 126px;
        margin: 0 auto;
        margin-top: 30px;
        // border-bottom: 1px solid #535353;
        .successinfo {
          margin-top: 20px;
        }
        .successinfo1 {
          margin-top: 20px;
          padding-top: 34px;
          font-size: 18px;
        }
      }
      .enter {
        display: block;
        width: 96px;
        height: 36px;
        margin: 0 auto;
        margin-top: 15px;
        background-image: url("../../assets/images/mygrand/enter.png");
        &:hover {
          background-image: url("../../assets/images/mygrand/hoverenter.png");
        }
      }
    }
  }
}
</style>
