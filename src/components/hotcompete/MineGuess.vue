<template>
  <div class="compete-mine" >

      <div class="compete-min-top rela">
        <div class="compete-min-top-login" v-if="getLoginStatus">
          <div class="compete-mine-tt">
            <div class="compete-mime-tpic">
              <div class="compete-mine-tp-img fl">
                <img :src="getLoginStatus.avatar" class="avatar"/>
                <span class="vip_level">{{getLoginStatus.vip_level}}</span>
              </div>
              <div class="compete-mine-tp-text fl">
                <h2>{{getLoginStatus.nickname}} <span class="level"> &nbsp;Lv{{getLoginStatus.level}}</span> </h2>
                <p>{{getLoginStatus.now_exp}}/{{getLoginStatus.expect_exp}}</p>
              </div>
            </div>

            <div v-if="getSignData">
              <div class="compete-mine-sign" @click="fnCheckSign" v-if="!getSignData.isCheckIn">签到</div>
              <div class="compete-mine-sign sign-competion" v-if="getSignData.isCheckIn">已签到</div>
              <!-- <div v-if="isShowSign">
                <div class="compete-mine-sign-reward" v-if="!getSignData.isCheckIn">您已连续签到 <span class="special">{{getSignData.this_month_count}}天</span>,前往我的菜园领取{{getSignData.reward.cai}}C+{{getSignData.reward.exp}}经验<span class="special">奖励</span><i @click="closeSign"></i></div>
              </div> -->
            </div>
            <div class="compete-mine-recharge" @click="openRecharge" style="color:#fff;">充值</div>
          </div>
          <div class="compete-mine-tt-info">
            <div class="compete-mine-tt-info-same">
              <span class="p-span">账户余额：</span>
              <p><span class="cl-red">{{thousandBitSeparator(getLoginStatus.cai)}}</span> C</p>
            </div>
            <div class="compete-mine-tt-info-same">
              <span class="p-span">道具估值：</span>
              <p><span>{{thousandBitSeparator(this.$store.state.match.cardsValue)}}</span> C</p>
            </div>
            <div class="compete-mine-tt-info-same">
              <span class="p-span">碎片：</span>
              <p><span>{{thousandBitSeparator(this.$store.state.match.iconValue)}}</span> P</p>
            </div>
          </div>
        </div>
        <div class="compete-min-top-nologin" v-if="!getLoginStatus">
           <div class="compete-mine-tp-img fl"><img src="../../assets/images/competeImg/guess_nologin.png"/></div>
           <div class="compete-mine-tp-nologin-go fr">
             <div>
               <span class="bg-yellow" @click="showLoginDialog('login')">登录</span>
               <span @click="showLoginDialog('register')">注册</span>
             </div>
             <p>登录后可获得更多的惊喜>></p>
           </div>
        </div>
      </div>

      <div class="compete-min-dn rela" v-if="getLoginStatus&&getMyguessdata&&getMyguessdata.length>0" @mouseover="unshiftData($event)">
        <div class="compete-min-dn-title rela">我的预测:<span>{{getMyguessdata.length}}</span></div>
        <div class="compete-min-dn-list">
          <div v-if="getMyguessdata&&!getMyguessdata.length">暂无数据</div>
          <div :class="'compete-mine-hover top'+scrollHoverIndex" v-if="isShowHover&&getMyGuessHoverData">
            <div class="compete-mine-hover-same">
              <div class="compete-mine-hover-title">C币预测</div>
              <div class="compete-mine-hover-text">
                <p class="compete-mine-hover-text-p">预测金额：<span>{{thousandBitSeparator(getMyGuessHoverData.cais.chip)}} c</span></p>
                <p class="compete-mine-hover-text-p">预计收益：<span>{{thousandBitSeparator(getMyGuessHoverData.cais.income)}} c</span></p>
              </div>
            </div>

            <div class="compete-mine-hover-same">
              <div class="compete-mine-hover-title">道具预测</div>
              <div class="compete-mine-hover-text">
                <p class="compete-mine-hover-text-p">预测金额：<span>{{thousandBitSeparator(getMyGuessHoverData.cards_data.chip)}} c</span></p>
                <div class="compete-mine-hover-cards" v-if="getMyGuessHoverData.cards_data.chip">
                  <dl>
                    <dt class="fl" v-for="(items,index) in getMyGuessHoverData.cards" :key="index">
                      <div :class="'ImgOut bd-c'+items.quality">
                        <span><img :src="items.pic" :alt="items.name"/></span>
                      </div>
                      <p>×{{items.count}}</p>
                    </dt>
                  </dl>
                </div>
                <p class="compete-mine-hover-text-p">预计收益：<span>{{thousandBitSeparator(getMyGuessHoverData.cards_data.income)}} c</span></p>
              </div>
            </div>
          </div>
          <div class="swiper-container">
            <div class="swiper-wrapper" ref='competecontainter' id="content_scroll">
              <ul id="compete-mine-outbox" ref='competeswiper' class="swiper-slide" >
                <li v-for="(item,index) in  getMyguessdata" :key="index" @click="handleclick(item.guess_id)" @mouseover="fnHoverDetail($event,index)" @mouseout="fnMouseout">
                  <div class="compete-min-dn-list-inside">
                      <div class="compete-min-list-li-t">
                      <h1>
                        <p class="text-over">{{item.match_name}}</p>
                      <!-- <span class="compete-min-list-time">{{item.status_name}}</span> -->
                      <span class="compete-min-list-time" :class="item.status == 'cancel'||item.status == 'clear'?'cl-graw':item.status=='wait'?item.status_name.indexOf('时')==-1&&item.status_name.indexOf('分')&&item.status_name.indexOf('开')==-1?'cl-green':'cl-blue':'cl-red'">
                        {{item.status_name}}
                      </span>
                      </h1>
                      <h2>{{item.guess_type_name}}<i v-if="item.odds_type==2" title="玩家预测时的赔率为最后收益所得赔率，例如固赔1.5，预测100C则最后获得收益150C+本金100C，合计250C。"></i></h2>
                    </div>
                    <div class="compete-min-dn-list-info">
                      <div class="compete-min-dn-list-info-same">
                        <span>预测队伍:</span>
                        <p><em class="text-over">{{item.team_name}}</em> ({{item.team_odds}})</p>
                      </div>
                      <div class="compete-min-dn-list-info-same">
                        <span>预测金额:</span>
                        <p>{{item.total_chips}} C</p>
                      </div>
                      <div class="compete-min-dn-list-info-same">
                        <span>结算收益:</span>
                        <p>{{item.total_income}} C</p>
                      </div>
                    </div>
                  </div>
                  <div class="compete-min-list-guesstime">{{item.updated_at}}</div>
                </li>
              </ul>
            </div>
            <!-- <div class="swiper-scrollbar"></div> -->

          </div>


        </div>
      </div>
      <router-link class="compete-min-dn-more" v-if="getLoginStatus" tag="div" to="/mygrand">查看更多>></router-link>
  </div>
</template>
<script>
import Http from './../../common/http';
import router from "@/router";
import { Swiper} from 'vue-awesome-swiper'
require ('../../assets/swiper/swiper.css');
require ('../../assets/swiper/swiper.js');
  let dataTypes;
  export default {
    data () {
      return {
        isShowHover:false,
        isShowIndex:null,
        isShowData:null,
        isShowSign:true,
        delta:0,//判断是否为向上(-1)还是向下(1)
        maxLength:0,//滚动的最大个数
        isMove:true,//滚动动画是否完成
        scrollPage:0,//滚动的页数
        scrollValue:0,//滚动的距离
        setAnimation:null,//滚动动画定时器,
        srcollBox:null,//滚动的载体
        scrollHoverIndex:0,//鼠标经过的索引
        liIndex:0,//鼠标经过的索引
      }
    },
    methods:{
      thousandBitSeparator(num){
        return (num || 0).toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,');
      },
      showLoginDialog: function(tab) {
        this.$store.dispatch('userInfo');
        setTimeout(() => {
          if (!this.$store.state.user.userInfo) {
            this.$store.dispatch('showLoginDialog');
            this.$store.dispatch('checkinprogessdispatch');
            this.$store.dispatch('userinfoshowdispatch');
            this.$store.dispatch('getguessdatadis');
          }
        }, 100);
      },
      closeSign(){
        this.isShowSign=false;
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
      fnCheckSign(){
        let self =this;
       Http.post("checkIn",{type:1}).then(response => {
         console.log('签到数据',response)
         if(response.data.code==0){
           let dataOption ={
            'masseges':response.data.message,
            'type':'2',
          }
          self.$store.commit('isSigninPupopDis',true);
          self.$store.commit('isSigninPupopDis',dataOption);

           self.$store.dispatch('actionSignData')
         }else{
           let dataOption ={
            'masseges':response.data.message,
            'type':'2',
          }
          self.$store.commit('isSigninPupopDis',true);
          self.$store.commit('isSigninPupopDis',dataOption);
         }

        }).catch(Http.onError);
      },
      handleclick(id){
        this.$store.commit('mutationIsIndex',1);
        this.$store.commit('mutationIsSendDispath',true)
        if(this.$store.state.match.stateGuessId&&this.$store.state.match.stateGuessId!=id){
          this.$store.commit('mutationGuessTeamData',null)
        }
        router.push(`/guess/${id}`);
        this.$store.commit('mutationStateGuessId',id)
        let params = {
                guess_id: id
              };
              // console.log('我传递了什么',params)
              this.$store.commit("mutationStateGuessId", id);
              this.$store.dispatch("getBattleId", params);
      },
      unshiftData(event){
        let self =this;
        let box =this.$refs.competecontainter;
          // document.documentElement.style.overflowY = 'hidden';
          this.srcollBox=document.getElementById('content_scroll');
          this.scrollPage =parseInt(this.srcollBox.scrollTop/232)
          this.maxLength=this.$store.state.match.myGuessDataList.length;
          if(this.maxLength<4&&!this.$store.state.match.myguessCbMore){
            return;
          }
          // console.log('this.srcollBox.scrollTop',this.srcollBox.scrollTop)
          this.fnWheelScroll();
          box.addEventListener('scroll',this.uploadData(box));
      },
      fnUpshiftData(){
        let reload =this.$store.state.match.myguessReload;
        let moreCbFlag =this.$store.state.match.myguessCbMore;
        let moreCardsFlag =this.$store.state.match.myguessCardsMore;
        let page =this.$store.state.match.myguessPage;
        if(!reload)return;
        // this.maxLength=this.$store.state.match.myGuessDataList.length
        console.log(this.maxLength-3,this.scrollPage)
        if (this.scrollPage ==(this.maxLength-4)) {
          if(!reload&&!moreCbFlag&&!moreCardsFlag)return;
          this.$store.commit('mutationMyguessReload',false);
          page+=1;
          this.$store.commit('mutationMyguessPage',page);
           let params={
              status:'wait',
              result_status:'all',
              page,
              size:3,
          }
          if(moreCbFlag){
            console.log('我是菜币，我还有很多哦',moreCbFlag,page)
            this.$store.dispatch('actionMycaiData',params);
          }else{
            console.log('hi,我是道具,菜币不够不要着急还有我',moreCardsFlag,page)
            this.$store.dispatch('actionMycardsData',params);
          }
        }
      },
      uploadData(Box){
        let reload =this.$store.state.match.myguessReload;
        let moreCbFlag =this.$store.state.match.myguessCbMore;
        let moreCardsFlag =this.$store.state.match.myguessCardsMore;
        let page =this.$store.state.match.myguessPage;
        if(!reload)return;
        let scrollTop = Box.pageYOffset || Box.scrollTop;
        if (scrollTop + Box.offsetHeight >=Box.scrollHeight) {
          if(!reload&&!moreCbFlag&&!moreCardsFlag)return;
          this.$store.commit('mutationMyguessReload',false);
          page+=1;
          this.$store.commit('mutationMyguessPage',page);
           let params={
              status:'wait',
              result_status:'all',
              page,
              size:3,
          }
          if(moreCbFlag){
            console.log('我是菜币，我还有很多哦',moreCbFlag,page)
            this.$store.dispatch('actionMycaiData',params);
          }else{
            console.log('hi,我是道具,菜币不够不要着急还有我',moreCardsFlag,page)
            this.$store.dispatch('actionMycardsData',params);
          }
        }
      },
      fnMove() {
        var value = 232*this.scrollPage;
        this.scrollValue =this.srcollBox.scrollTop;
        // console.log('scrollTop',this.scrollValue,value,this.scrollPage);
        this.liIndex-=this.delta
        if(this.delta<0){
            this.setAnimation=setInterval(()=>{
                this.scrollValue+=2;
                if(this.srcollBox.scrollTop>=value){
                    this.scrollValue=value;
                    clearInterval( this.setAnimation)
                    this.fnUpshiftData();
                    this.liIndex-=this.delta

                    return this.isMove=true;
                }else{
                    this.srcollBox.scrollTop=this.scrollValue;
                }
            },10)
        }else{

             this.setAnimation=setInterval(()=>{
                this.scrollValue-=2;
                if(this.srcollBox.scrollTop<=value){
                    this.scrollValue=value;
                    clearInterval( this.setAnimation);
                    return this.isMove=true;
                }else{
                    this.srcollBox.scrollTop=this.scrollValue;
                }
            },10)
        }

      },
      fnWheelScroll(){
        document.getElementById('content_scroll').addEventListener("onwheel" in document ? "wheel" : "mousewheel", (e)=> {
          this.scrollPage =parseInt(this.srcollBox.scrollTop/232);
          this.maxLength=this.$store.state.match.myGuessDataList.length;
          if(this.maxLength<4){
            return;
          }

          if(!this.isMove){
            e.preventDefault();
            return;
          };
          e.preventDefault();
          this.isMove=false;
          this.isShowHover=false;
          //判断滚轮滚的方向
          this.delta = e.wheelDelta / 120 || -e.deltaY / 3;
          this.scrollPage-= this.delta;
          this.maxLength = this.maxLength-3;
          // console.log('判断滚轮滚的方向',this.delta,this.isMove,this.scrollPage)
          if(this.scrollPage < 0) {
            this.isMove=true;
            return  this.scrollPage = 0;
          }
          if(this.scrollPage > this.maxLength) {
            this.isMove=true;
            return  this.scrollPage =this.maxLength;
          }

          this.fnMove();

        });
      },
      scrollSwiper(){
        new Swiper ('.swiper-container', {
          direction: 'vertical',
          slidesPerView: 'auto',
          freeMode: true,
          // 如果需要滚动条
          scrollbar: '.swiper-scrollbar',
          mousewheel: true,
        })
      },
      fnHoverDetail(event,index){
        let box =this.$refs.competeswiper;
        this.liIndex=index;
        this.isShowHover=true;
        this.$store.commit('mutationMyGuessHoverData',index);
        if(this.liIndex==this.scrollPage){
          this.scrollHoverIndex=0
        }else if(this.liIndex==this.scrollPage+1){
           this.scrollHoverIndex=1
        }else if(this.liIndex==this.scrollPage+2){
           this.scrollHoverIndex=2
        }
        // console.log('index',index,this.scrollHoverIndex)
      },
      fnMouseout(){
        this.liIndex=null;
        this.$store.commit('mutationMyGuessHoverData',null)
      },
    },
    mounted () {
      this.$store.dispatch('actionMybagValue')
      this.$store.dispatch('actionSignData')
      // setTimeout(() => {
        this.$store.commit('mutationMyguessData',null);
        this.$store.commit('mutationMyguessPage',1);
        let params={
            status:'wait',
            result_status:'all',
            page:1,
            size:3,
        }
        this.$store.dispatch('actionMycaiData',params);
      // }, 500);

    },
      //数组对象排序

    created(){
      if(this.$store.state.user.userInfo&&this.$store.state.match.myGuessDataList){
      }
    },
    watch:{
      $route(){
        if(this.$route.path.indexOf('/compete/')!=-1||this.$route.path.indexOf('/guess/')!=-1 || this.$route.path.indexOf('/mall')!=-1 || this.$route.path.indexOf('/mygrand/personinfo')!=-1){
          this.$store.dispatch('actionMybagValue')
          this.$store.dispatch('actionSignData')
          // this.$store.commit('mutationMyguessData',null);
          // this.$store.commit('mutationMyguessPage',1);
          // let params={
          //   status:'wait',
          //   result_status:'all',
          //   page:1,
          //   size:3,
          // }
          // this.$store.dispatch('actionMycaiData',params);
        }
      },
    },
    computed: {
      compete_Win:function(){
        return this.$store.state.match.compete_Win?this.$store.state.match.compete_Win:null
      },
      compete_Lose:function(){
        return this.$store.state.match.compete_Lose?this.$store.state.match.compete_Lose:null
      },
      getLoginStatus:function(){
        return this.$store.state.user.userInfo;
      },
      getSignData:function(){
        return this.$store.state.match.signData;
      },
      getMyguessdata:function(){
        this.maxLength =this.$store.state.match.myGuessDataList?this.$store.state.match.myGuessDataList.length:0;

        return this.$store.state.match.myGuessDataList;
      },
      getMyGuessHoverData:function(){
        return this.$store.state.match.myGuessHoverData;
      },
    }
  }
</script>

<style lang="scss" scoped src="@/assets/css/mineguess.css"></style>

