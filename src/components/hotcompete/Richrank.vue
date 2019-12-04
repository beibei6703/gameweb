<template>
  <div class="compete-winLose" v-if="compete_Win">
    <div class="compete-get-menu">
      <h3></h3>
    </div>
    <div class="compete-get-down">
      <div class="noData-sc" v-if="compete_Win.length<1">暂无排名</div>

      <div class="compete-get-inside">
        <ul>
          <li v-for="(item,index) in compete_Win" :data-bio="item.user.bio" :data-level="item.user.level" :key="index">
            <div class="ranking fl">{{index+1}}.</div>
            <div class="ranking-pic fl">
              <div class="ranking-pic-img" :class="{rankbk:item.user.vip_level>0}">
                <img :src="item.user.avatar"/>
              </div>
              <img :src="require('@/assets/images/mygrand/viplevel/v-13-'+(item.user.vip_level)+'.png')" alt="" class="testvip" v-if="item.user.vip_level>0">

              <div class="tip" ref="testshow">
                <!-- <img src="../../assets/images/richlisttip.png" alt=""> -->
                <div class="aaa" ref="aaa">
                  <img :src="item.user.avatar" alt="" class="fleft tipimg" v-if="item.user.vip_level==0">
                  <img :src="item.user.avatar" alt="" class="fleft tipimg yellowborder" v-if="item.user.vip_level>0">
                  <div class="tipright">
                    <img :src="require('@/assets/images/mygrand/viplevel/v-13-'+(item.user.vip_level)+'.png')" alt="" class="testvip fleft" v-if="item.user.vip_level>=1">
                    <p class="tipname"> {{item.user.name}}</p>
                    <p class="tipvip theme_color">LV{{item.user.level}}</p>
                  </div>
                </div>
                <!--<p class="tipc">拥有: <span class="tipname">{{item.user.cai}}</span> <span class="theme_color">C</span></p>-->
                <p class="tipsign">个人签名</p>
                <p class="tipcontent wd-break">{{item.user.bio}}</p>
              </div>
            </div>
            <div class="ranking-name fl">{{item.user.name}}</div>
            <div class="ranking-money fr">{{thousandBitSeparator(item.cost)}} C</div>
            <div class="clear"></div>
          </li>
        </ul>
      </div>
      <div class="comepte-onthelist" @click="fnOnthelist"></div>
    </div>
  </div>
</template>
<script>
import router from "@/router";
  let dataTypes;
  let getGarden=[
    {'garden':'丰收榜'},
    {'garden':'天台榜'}
  ]
  export default {
    data () {
      return {
        Garden:getGarden,
        gardenum:0,
      }
    },
    mounted () {
      this.$store.dispatch('actionsguessDataWin',{
        game:'all',
        status:'open',
        page:1
      })

    },
    methods:{
        thousandBitSeparator(num){
          return (num || 0).toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,');
        },
        getScrollTop() {
          var scrollTop = 0,
            bodyScrollTop = 0,
            documentScrollTop = 0;
          if (document.body) {
            bodyScrollTop = document.body.scrollTop;
          }
          if (document.documentElement) {
            documentScrollTop = document.documentElement.scrollTop;
          }
          scrollTop =
            bodyScrollTop - documentScrollTop > 0
              ? bodyScrollTop
              : documentScrollTop;
          return scrollTop;
        },
          openRecharge: function() {
          if(this.$store.state.user.userInfo){
            console.log("滚轮高顿", this.getScrollTop());
            this.$store.commit("mutationScrolltopValue", this.getScrollTop());
            this.$store.commit("mutationIsShowRecharge", true);
          }else{
            this.$store.dispatch("logout");
            this.$store.commit("showLoginDialog", true);
            setTimeout(() => {
              this.$store.commit("istestBooleam", true);
            }, 100);
          }
          },
        fnOnthelist(){
          let guessListData =this.$store.state.match.guessDataWin?this.$store.state.match.guessDataWin:null;
          if(guessListData&&guessListData.length>0){
            console.log('我执行的是谁',guessListData[0].id)
            // this.$store.commit('mutationIsIndex',1)
            this.$store.commit('mutationIsSendDispath',true)
            router.push(`/guess/${guessListData[0].id}`);
            this.$store.commit('mutationStateGuessId',guessListData[0].id);
            this.$store.commit("mutationSetGuessValue", {
              guessId: guessListData[0].id,
              oddsType: guessListData[0].odds_type,
              battleId: guessListData[0].battle_id
            });
             let params = {
                guess_id: guessListData[0].id
              };
              // console.log('我传递了什么',params)
              this.$store.commit("mutationStateGuessId", guessListData[0].id);
              this.$store.dispatch("getBattleId", params);
          }else{
            this.openRecharge();
          }
        },
    },
    computed: {
      compete_Win:function(){
        return this.$store.state.match.richRank?this.$store.state.match.richRank:null
      }
    }
  }
</script>
<style scoped lang="scss">

  .noData-sc{color:#989898;font-size:14px; line-height:100px; text-align:center;}
  .compete-get-inside li:hover .tip{display:block;}
  .compete-get-inside{display:block;}
  .yellowborder{
    border:2px solid #ffcc01;
  }
  .compete-winLose{}
  .compete-get-menu{
    // .compete-get-menu-bg{width:1px;height:46px;background:#dcdcdc; position:absolute;top:0; left:155px;}
    height:32px; position:relative;top:0; left:0; margin-top:5px;
    h3{
      width: 104px;
      height: 24px;
      float: left;
      background: url("../../assets/images/mygrand/scipt1.png") no-repeat;
      margin-left: 8px;
      background-position: 0px -482px;margin-top:0;height:24px;
    }
  }
    .compete-get-down{position:relative; top:0; left:0;background:#3c3b41;
    li{height:64px; line-height:40px;padding:12px 12px;
    // border-bottom:#262626 1px solid;
    -webkit-transition: all 0.5s;position:relative;top:0; left:0;
      .ranking{
        width:30px; height:30px; line-height:30px; margin-top:1px;font-size:14px; color:#fff;
        // margin-right:16px;
      }
      &:hover{
        background:#292b2f;

      }
      &:nth-child(even){
        background:#343338;

      }

      // &:nth-child(1){
      //   .ranking{
      //     text-indent:-9999999px;background:url(../../assets/images/first.png) no-repeat center;
      //   }
      // }
      // &:nth-child(2){
      //   .ranking{
      //     text-indent:-9999999px;background:url(../../assets/images/second.png) no-repeat center;
      //   }
      // }
      // &:nth-child(3){
      //   .ranking{
      //     text-indent:-9999999px;background:url(../../assets/images/third.png) no-repeat center;
      //   }
      // }
      .ranking-pic{width:35px; height:35px;margin-right:10px;position:relative;top:0;left:0;
        .ranking-pic-img{width:35px; height:35px; overflow:hidden; border-radius:100%;position:relative;top:0; left:0;

        }
        .testvip{display:block;position:absolute;bottom:-2px;right:-8px;}
        .ranking-pic-img.rankbk{border: 2px solid #ffcc01;}
        .ranking-pic-img.rankbk img{width:31px; height:31px;}
        .ranking-pic-img img{width:35px; height:35px; border-radius:100%;display:block; }


        .tip{//消息框
          display:none;
          width:206px;
          height: 232px;
          line-height: 20px;
          position: absolute;
          left: 42px;
          top:-12px;
          z-index:2;
          background: #15161a;
          text-align: left;
          padding: 13px 0 0 20px;
          font-size: 14px;
          background: url('../../assets/images/richlisttip.png') no-repeat;
          color: #808081;
          .tipimg{
            width: 52px;
            height: 52px;
            border-radius: 100%;
            margin-right: 20px;
            // border:2px solid #ffcc01;
          }
          .tipimg.yellowborder{width:48px; height:48px;}
          .tipname{
            color: #dcdcdc;font-size:14px;
          }
          .testvip{
            position: absolute;
            left: 36px;
            top: 48px;
            // font-size: 13px;
            // color: #ffcc01;
            // font-style: italic;
            // font-weight: 900;
            // font-family: 'Helvetica Neue LT Pro ';
            // -webkit-text-stroke: .8px #9d6b0c;
          }
          .tipright{
            position: relative;
            left: 0px;
            top:-10px;
            font-size: 16px;
            padding-top: 20px;

            .tipvip{
              font-size: 14px;
              margin-top:3px;
            }
            .tiplv{
              position: absolute;
              left: 35px;
              top:40px;
              width:23px;
              height: 23px;
              border-radius: 50%;
              background: #111317;
              border: 1px solid #e1c076;
              text-align: center;
            }
          }
          .tipc{
            margin-top:3px;
            line-height: 24px;
          }
          .tipsign{
            background:url("../../assets/images/richlistsign.png") left 5px no-repeat;
            background-size: 8px 12px;
            padding-left: 12px;margin-top:20px;
          }
          .tipcontent{
            margin-top:12px;
            width: 180px;
            height: 100px;
            line-height: 22px;
          }
        }
        &:hover .tip{
          display:block;

        }

      }
      .ranking-name{width:115px; text-align: left;font-size:14px;overflow: hidden;  text-overflow: ellipsis; white-space: nowrap;}
      .ranking-money{/*background:url(../../assets/images/gold.png) no-repeat right center;padding-right:30px;*/font-size:12px;overflow: hidden; text-align: right;  text-overflow: ellipsis; white-space: nowrap;}
    }
  }
  .comepte-onthelist{width:114px; height:44px; background:url('../../assets/img/home/icon_onthelist_normal.png') no-repeat; margin:10px auto 20px;cursor:pointer;}
  .comepte-onthelist:hover{background:url('../../assets/img/home/icon_onthelist_hover.png');}
</style>

