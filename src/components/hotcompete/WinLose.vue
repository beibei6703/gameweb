<template>
  <div class="compete-winLose">
    <div class="compete-get-menu">
      <ul>
        <li v-for="(item,index) in Garden" @click="tabs(index)" :class="{active:index==gardenum}" :key="index"><span>{{item.garden}}</span></li>
      </ul>
      <div class="compete-get-menu-bg"></div>
      <div class="clear"></div>
    </div>
    <div class="compete-get-down" v-if="compete_Win">
      <div class="noData-sc" v-if="compete_Win.length==0">暂无排名</div>

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
                <!-- <p class="tipcontent ellipsis">{{data.bio}}</p> -->
                <p class="tipcontent wd-break">{{item.user.bio}}</p>
              </div>
            </div>
            <div class="ranking-name fl">{{item.user.name}}</div>
            <div class="ranking-money fr">{{thousandBitSeparator(item.income)}} C</div>
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
        dataType:['guesses/winRank','guesses/loseRank'],
        isShow:false,
      }
    },
    mounted () {
      this.tabs(this.gardenum);
      this.$store.dispatch('actionsguessDataWin',{
        game:'all',
        status:'open',
        page:1
      })

    },
    methods:{
        tabs:function(index){
            this.gardenum=index;
            dataTypes=this.dataType[this.gardenum];
          this.$store.dispatch("compete_Win",dataTypes);
        },
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
          // this.$store.dispatch('')
          let guessListData =this.$store.state.match.guessDataWin?this.$store.state.match.guessDataWin:null;
          if(guessListData&&guessListData.length>0){
            this.$store.commit('mutationIsIndex',1)
            this.$store.commit('mutationIsSendDispath',true)
            router.push(`/guess/${guessListData[0].id}`);
            this.$store.commit('mutationStateGuessId',guessListData[0].id)
          }else{
            this.openRecharge();
          }
        },

    },
    computed: {
      compete_Win:function(){
        return this.$store.state.match.compete_Win?this.$store.state.match.compete_Win:null
      },
      compete_Lose:function(){
        return this.$store.state.match.compete_Lose?this.$store.state.match.compete_Lose:null
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
  .compete-winLose{background:#242426;}
  .compete-get-menu{
    // .compete-get-menu-bg{width:1px;height:46px;background:#dcdcdc; position:absolute;top:0; left:155px;}
    height:45px; line-height:44px;position:relative;top:0; left:0; margin-top:5px;
    li{-webkit-transition: all 0.5s;position:relative;;top:0;left:0;
      width:50%;
      // border-top:#535353 1px solid;border-bottom:#535353 1px solid;
       text-align: center; color:#b8b8b8;font-size:14px;float:left;position:relative;top:0; left:0;

      .testvip{}

      // &:first-child{border-left:#535353 1px solid;margin-right:1px; }
      // &:last-child{border-right:#535353 1px solid;}
      span{
        border-bottom:#242426 1px solid; height:44px; display: inline-block;
      }

      &.active,&:hover{
       color:#fff;
      //  border-color:#989898;
      }
       &.active span,&:hover span{
       color:#fff;
       border-color:#fff;
      }
      /*&:hover{background:#292b2f;}*/
    }
  }
    .compete-get-down{position:relative; top:0; left:0;background:#3c3b41;padding-bottom:1px;
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
      .ranking-money{/*background:url(../../assets/images/gold.png) no-repeat right center;padding-right:30px;*/font-size:12px;overflow: hidden; font-family:Arial, Helvetica, sans-serif; text-align: right;  text-overflow: ellipsis; white-space: nowrap;}
    }
  }
  .comepte-onthelist{width:114px; height:44px; background:url('../../assets/img/home/icon_onthelist_normal.png') no-repeat; margin:0 auto 20px;cursor:pointer;}
  .comepte-onthelist:hover{background:url('../../assets/img/home/icon_onthelist_hover.png');}

</style>

