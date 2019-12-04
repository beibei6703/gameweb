<template>
  <div id="shopgivepop" v-if="userlist">
    <div class="shopToolsPop" >
      <div class="shopToolsPop-bg">
        <div class="shopToolsPop-box">
          <div class="shopToolsPop-box-bd">
            <div class="shopToolsPop-box-bd-body">
              <div class="box-title">
                <span class="box-title-txt">您获得了:</span>
                <i class="close" @click="Thishide"></i>
                <i class="clear"></i>
              </div>
              <div class="package_wrap">
                <ul class='package_ul' v-if="userlist">
                  <li class='package_li' v-for="(item,index) in userlist" :key="index" :class="'V'+'-'+item.quality" :title="item.name">
                    <img :src="item.product_small_pic">
                    <span>x{{item.num}}</span>
                  </li>
                  <!-- <li class='package_li'>
                    <img src="../../assets/images/favior.png">
                    <span>x2</span>
                  </li> -->
                </ul>
              </div>
              <div class="box-btn">
                <div class="box-btn-yes" @click="Thishide" ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import Http from '@/common/http';
  export default {
    data () {
      return {
        title:"赠送提示",
//        result:1,
      }
    },
    methods:{
      Givehide:function () {
        let _this=this;
        let datas={
          product_type:this.$store.state.shop.givehide.product_type,
          product_id:this.$store.state.shop.givehide.product_id,
          name:this.$store.state.shop.givehide.name,
          num:this.$store.state.shop.givehide.num,
          receive_nickname:this.$store.state.shop.givehide.receive_nickname,
        }
        Http.post('/shop/giveProduct',datas).then(function (data) {
          if(data.data.code==0){
            _this.$store.commit('test',false);
            _this.$store.commit('givehide',false);
            _this.$store.commit('tankuang',true);
            _this.$store.commit('tankuang',datas);
            _this.$store.dispatch('userInfo');
          }else{
            let dataOption ={
              'masseges':data.data.message,
              'type':'2',
            }
            _this.$store.commit('isSigninPupopDis',true);
            _this.$store.commit('isSigninPupopDis',dataOption);
          }
        })


        this.$store.commit('givehide',false)
      },
      Givemybag:function () {
        let _this=this;
        let datas = {
          product_id:this.$store.state.shop.givehide.product_id,
          num:this.$store.state.shop.givehide.num,
          receive:this.$store.state.shop.givehide.receive,
        };
        Http.post('/shop/packageGiveProduct',datas).then(function (data) {
          if(data.data.code==0){
            let dataOption ={
              'masseges':data.data.message,
              'type':'1',
            }
            _this.$store.commit('isSigninPupopDis',true);
            _this.$store.commit('isSigninPupopDis',dataOption);
            _this.$store.commit('test',false);
            _this.$store.commit('givehide',false);
            _this.$store.dispatch('mybag');
            _this.$store.dispatch("bag_treasure_dis");
//            _this.$refs.playerNamebag.value='';
          }else{
            let dataOption ={
              'masseges':data.data.message,
              'type':'2',
            }
            _this.$store.commit('isSigninPupopDis',true);
            _this.$store.commit('isSigninPupopDis',dataOption);
          }
        })
      },
      Thishide:function () {
        this.$store.commit('treasureDia',false)
      }
    },
    mounted (){
      if(!this.$store.state.shop.userlist){
        this.$store.dispatch('userlist')
      }
    },
    computed:{
      givehide:function(){
        return this.$store.state.shop.givehide
      },
      userlist:function(){
        return this.$store.state.shop.treasureBoxList
      }
    }
  }
</script>
<style lang="scss" scoped>
  /*公用*/
  .fl{float:left;}
  .fr{float:right;}
  .clear{clear:both;margin:0;padding:0;display:block;}
  .allbody{width:1200px; margin-left:auto; margin-right:auto;}
  .hide{display: none}
  .show{display: block}
  .ImgOut{
    position:relative;left:0; top:0;overflow:hidden;
    span{
      display:table-cell; text-align:center;vertical-align: middle;
      img{max-width:100%; max-height:100%; display:inline-block;}
    }
  }
  .pr{
    position: relative;
  }
  .block{
    display: block;
  }
  .inline-block{
    display: inline-block;
  }
.package_wrap{
  border:1px solid #535353;
  padding:10px;
  margin:20px;
}
.package_ul{
  display:flex;
  justify-content:space-around;
  .package_li{
    width:70px;
    height:70px;
    margin-bottom:4px;
    // border:1px solid #f99;
    img{
      width:68px;
      height:50px;
      display:flex;
      margin:0 auto;
      // border:1px solid #f9f;
    }
    span{
      width:68px;
      height:18px;
      line-height:18px;
      display:inline-block;
      text-align:center;
      background:#535353;
    }
  }
}
  //框
  .shopToolsPop {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    outline: 0;
    z-index: 9999999;
    .shopToolsPop-bg{
      position: fixed;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      outline: 0;
      background: rgba(5,6,6,0.8);
      .shopToolsPop-box {
        position: fixed;
        top: 50%;
        left: 50%;
        margin: -130px 0 0 -251px;
        display: block;
        z-index: 2;
        width: auto;
        transform: translate(0, 0);
        border-radius: 5px;
        .shopToolsPop-box-bd{
          display: table-cell;
          vertical-align: middle;
          box-sizing: border-box;
          .shopToolsPop-box-bd-body{
            width: 440px !important;
            height: 301px;
            background: url('../../assets/images/Mall-images/givepopbg.png') no-repeat;
            .box-title{
              position: relative;
              height: 60px;
              width: 100%;
              /*margin-bottom: 100px;*/
              .box-title-txt{
                position: absolute;
                left:18px;
                top:16px;
                color: #ffd35e;
                font-size: 18px;
              }
              .close{
                width: 19px;
                height: 19px;
                background: url('../../assets/images/Mall-images/pop-close.png')no-repeat;
                position: absolute;
                right:30px;
                top:17px;
                cursor: pointer;
                display: block;
                transition: all .5s;
              }
              .close:hover{
                background: url('../../assets/images/Mall-images/pop-close1.png')no-repeat ;
                /*background-position: 1px 1px;*/
              }
            }
            .box-head{
              width: 183px;
              height: 69px;
              border: 1px solid #2c2c2f;
              border-radius: 1px;
              margin: 0 auto;
              padding: 2px;
              .box-head-bor{
                width: 100%;
                height: 100%;
                border: 1px solid #4e4e4e;
                background: -webkit-linear-gradient(#17191c, #2e2f33); /* Safari 5.1 - 6.0 */
                background: -o-linear-gradient(#17191c, #2e2f33); /* Opera 11.1 - 12.0 */
                background: -moz-linear-gradient(#17191c, #2e2f33); /* Firefox 3.6 - 15 */
                background: linear-gradient(#17191c, #2e2f33); /* 标准的语法 */
                padding: 7px 7px 3px;
                .box-head-pic{
                  width: 60px;
                  height: 51px;
                  position: relative;
                  .box-head-picleft{
                    width: 48px;
                    height: 48px;
                    border-radius: 50%;
                    position: absolute;
                      img{
                        width: 100%;
                        height: 100%;
                        border-radius: 50%;
                      }
                  }
                  .box-head-picright{
                    width: 21px;
                    height: 21px;
                    border-radius: 50%;
                    border: 1px solid #ac8d53;
                    position: absolute;
                    background: #000;
                    left: 35px;
                    top: 30px;
                    font-size: 10px;
                    line-height: 18px;
                  }
                }
                .box-head-picvip{
                  width: 60px;
                  height: 51px;
                  position: relative;
                  .box-head-picleft{
                    width: 48px;
                    height: 48px;
                    border-radius: 50%;
                    position: absolute;
                    border: 2px solid #ffcc01;
                    img{
                      width: 100%;
                      height: 100%;
                      border-radius: 50%;
                    }
                  }
                  .box-head-picright{
                    width: 21px;
                    height: 21px;
                    border-radius: 50%;
                    position: absolute;
                    left: 35px;
                    top: 30px;
                    line-height: 18px;
                  }
                }
                .box-head-text{
                  width: 97px;
                  height: 38px;
                  text-align: left;
                  .box-head-text-top{
                    margin: 7px 0 7px ;
                    overflow: hidden;
                    text-overflow:ellipsis;
                    white-space: nowrap;
                    height: 18px;
                  }
                  .box-head-text-down{
                    font-size: 12px;
                    color: #b59456;
                    font-weight: bold;
                  }

                }
              }
            }
            .box-text{
              font-size: 15px;
              color: #989898;
              margin-top: 30px ;
            }
            .box-btn{
              margin-top: 65px;
              .box-btn-yes{
                width: 95px;
                height: 36px;
                margin:0 auto;
                background: url('../../assets/images/Mall-images/give-yes.png')no-repeat;
                cursor: pointer;
                transition: all .5s;
              }
              .box-btn-yes:hover{
                background: url('../../assets/images/Mall-images/give-yes.png')no-repeat;
              }
            }
          }
        }
      }
    }
  }
</style>


