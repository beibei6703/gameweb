<template>
  <div class="compete-list-content">
    <div class="compete-list-minNav" id="mini-nav">
      <ul>
        <li v-for="(item,index) in MiNav" @click="MinNav(index)" :class="{active:index==minIndex}" data-name="1" :data-status="item.status" :key="item.id"><p>{{item.MimNav}}</p></li>
      </ul>
      <i class="clear"></i>
    </div>
    <div class="compete-list-down" v-if="compete_list">
      <div class="guessList-data" v-if="compete_list.length==0">暂无比赛</div>
      <ul id="competeList_down">
        <li v-for="(data,index) in compete_list" :key="data.battle_id" :data-index="index" :data-id="data.battle_id" class="competeList_sur" refs="competelists" data-flag="1">
          <div @click="mouseHover($event,data.battle_id,index)" class="show-list-compete" :class="{active:getCurrentIndex==data.battle_id}"></div>
          <div class="compete-up">
            <div class="compete-logo ImgOut fl">
              <span :class="'icon_gamelogo'+data.game_id"></span>
            </div>
            <div class="compete-name fl">{{data.match.name}} <span>{{data.guess_type_name}}</span></div>
            <div class="compete-time fr" :class="data.status == 'cancel'||data.status == 'clear'?'cl-graw':data.status=='wait'?data.status_name.indexOf('时')==-1&&data.status_name.indexOf('分')==-1?'cl-green':'cl-blue':'cl-red'">
              {{data.status_name}}
              <!-- {{data.status=='wait'?data.status_name.indexOf('时')==-1&&data.status_name.indexOf('分')==-1?'可预测':data.status_name:data.status_name}} -->
            </div>
            <i class="clear"></i>
          </div>
          <div class="compete-team" :data-id='data.id' :data-battle='data.battle_id'>
            <div class="ImgOut"><span><img :src="data.match.logo"/></span></div>
            <div class="compete-team-bg"></div>
            <!--双方战队信息e-->
            <div class="compete-team-text" v-if="data.option_type==1">
              <div class="compete-team-sample fl">
                <div class="compete-team-logo fr">
                  <div class="ImgOut"><span><img :src="data.team[1].logo"/></span></div>
                  <!-- <div v-show="data.winner==1" class="compete-team-win"></div> -->
                </div>
                <div class="compete-team-lname fr">
                  <span class="text-right cl-font-red">{{data.team[1].odds}}</span>
                  <h1 class="text-right">{{data.team[1].name}}</h1>
                </div>
                <i class="clear"></i>
              </div>
              <div class="compete-team-ctext fl">
                <!-- <em>{{data.score_1}}</em> -->
                <span></span>
                <!-- <em>{{data.score_2}}</em> -->
                <!-- <i class="ellipsis" :title="data.guess_type_name">{{data.guess_type_name}}</i> -->
              </div>
              <div class="compete-team-sample fr">
                <div class="compete-team-logo fl">
                  <div class="ImgOut"><span><img :src="data.team[2].logo"/></span></div>
                  <!-- <div v-show="data.winner==2" class="compete-team-win"></div> -->
                </div>
                <div class="compete-team-lname fl">
                  <span class="text-left cl-font-blue">{{data.team[2].odds}}</span>
                  <h1 class="text-left">{{data.team[2].name}}</h1>
                </div>
                <i class="clear"></i>
              </div>
              <!--双方战队信息e-->
              <i class="clear"></i>
            </div>

            <div class="compete-team-text compete-pubg" v-if="data.option_type==2">
              <div v-for="(value,indexe) in data.hot" :key="indexe">
                <div v-for="(items,index) in data.team" v-if="index==value" class="compete-team-sample fl" :key="index">

                  <div class="compete-team-logo fr">
                    <div class="ImgOut"><span><img :src="items.logo"/></span></div>
                    <div class="compete-team-win" v-if="data.winner==index"></div>
                  </div>
                  <div class="compete-team-lname fr">
                    <span class="text-right cl-font-red">{{items.odds}}</span>
                    <h1 class="text-right">{{items.name}}</h1>
                  </div>

                <!-- <div class="compete-team-lname">{{items.name}}</div> -->
                <!-- <div class="compete-team-lodd cl-red">{{items.odds}}</div> -->
                </div>
              </div>
              <!--双方战队信息e-->
              <i class="clear"></i>
            </div>
          </div>

          <!-- 鼠标滑入展开 -->
          <transition name="collapse">
            <div class="compete-team-list" :class="{leave:getCurrentIndex!=data.battle_id}" v-show="getCurrentIndex==data.battle_id" :data-index="index" :data-id="data.battle_id" ref="shower">
              <ul class="compete_team_down">
                <li v-for="(items,indexers) in matchData[data.battle_id]" @click="handleclick(items.id,data.battle_id,items.odds_type,indexers)" :data-id='items.id' :key="indexers">
                    <div class="compete-team-list-out" v-if="items.option_type==1">
                      <div class="compete-team-list-title fl">{{items.guess_type_name}}<i v-if="items.odds_type==2" title="玩家预测时的赔率为最后收益所得赔率，例如固赔1.5，预测100C则最后获得收益150C+本金100C，合计250C。"></i></div>
                      <div class="compete-team-list-main">
                      <div class="compete-team-list-main-sample fl">
                      <div class="compete-team-list-main-name text-right fr">{{items.team[1].name}}</div>
                      <div class="compete-team-list-main-pl text-right cl-font-red fr">{{items.team[1].odds}}</div>
                      <span class="compete-team-list-main-hg fr" v-show="(items.winner==1&&items.odds_type==1)||(items.winner==1&&items.odds_type==2&&items.game_id!=6)||(items.winner==1&&items.odds_type==2&&items.guess_type!=2&&items.guess_type!=5&&items.game_id!=6)"></span>
                      <i class="clear"></i>
                      </div>
                      <div class="compete-team-list-main-vs fl">vs</div>
                      <div class="compete-team-list-main-sample fl">
                      <div class="compete-team-list-main-name fl text-left">{{items.team[2].name}}</div>
                      <div class="compete-team-list-main-pl text-left cl-font-blue fl">{{items.team[2].odds}}</div>
                      <span class="compete-team-list-main-hg fl" v-show="(items.winner==2&&items.odds_type==1)||(items.winner==2&&items.odds_type==2&&items.game_id!=6)||(items.winner==2&&items.odds_type==2&&items.guess_type!=2&&items.guess_type!=5&&items.game_id!=6)"></span>
                      <i class="clear"></i>
                      </div>
                      </div>
                      <div class="compete-time fr" :class="items.status == 'cancel'||items.status == 'clear'?'cl-graw':items.status=='wait'?items.status_name.indexOf('时')==-1&&items.status_name.indexOf('分')==-1?'cl-green':'cl-blue':'cl-red'">
                        <!-- {{items.status_name}} -->
                        {{items.status=='wait'?items.team[1].odds==0.00&&items.team[2].odds==0.00?'可预览':items.status_name.indexOf('时')==-1&&items.status_name.indexOf('分')==-1&&items.status_name.indexOf('开')==-1?'可预测':items.status_name:items.status_name}}
                      </div>
                      <i class="clear"></i>
                    </div>
                    <div v-if="items.option_type==2">
                      <div class="compete-team-list-out">
                      <div class="compete-team-list-title fl">{{items.guess_type_name}}<i v-if="items.odds_type==2"></i></div>
                      <!-- <div class="compete-time fr" :class="items.status_name.indexOf('时')==-1&&items.status_name.indexOf('分')==-1?'cl-green':'cl-blue'">{{items.status_name}}<i></i></div> -->
                      <div class="compete-time fr" :class="items.status == 'cancel'||items.status == 'clear'?'cl-graw':items.status=='wait'?items.status_name.indexOf('时')==-1&&items.status_name.indexOf('分')==-1?'cl-green':'cl-blue':'cl-red'">
                        <!-- {{items.status_name}} -->
                        {{items.status=='wait'?items.status_name.indexOf('时')==-1&&items.status_name.indexOf('分')==-1&&items.status_name.indexOf('开')==-1?'可预测':items.status_name:items.status_name}}
                        <i :class="{active:items.status=='wait'&&items.option_type}"></i>
                      </div>
                      <i class="clear"></i>
                    </div>

                    <transition name="collapse" v-if="items.status=='wait'">
                      <div class="compete-pubg-team" v-if="items.status" :class="{active:items.status==='wait'}">
                      <dl>
                        <dt v-for="(datas,index) in items.team" :key="index">
                          <span class="compete-team-list-main-hg" v-if="items.winner==index"></span>
                          <span class="text-over compete-pubg-team-name">{{datas.name}}</span>
                          <span class="cl-red compete-pubg-team-odd">{{datas.odds}}</span>
                          </dt>
                      </dl>
                      <i class="clear"></i>
                    </div>
                    </transition>

                    <transition name="collapse" v-if="items.status!=='wait'">
                       <div class="compete-pubg-team compete-pubg-team-hidden" :class="{leave:listIndexss==items.id}">
                      <dl>
                        <dt v-for="(datas,index) in items.team" :key="index">
                          <span class="compete-team-list-main-hg" v-if="items.winner==index"></span>
                          <span class="text-over compete-pubg-team-name">{{datas.name}}</span>
                          <span class="cl-red compete-pubg-team-odd">{{datas.odds}}</span>
                          </dt>
                      </dl>
                      <i class="clear"></i>
                    </div>
                    </transition>
                  </div>
                </li>
              </ul>
            </div>
          </transition>
        </li>
      </ul>



    </div>
    <div class="guessList-data-nomore" v-if="!this.$store.state.match.competeMore&&compete_list.length"><span>我是有底线的</span></div>
  </div>
</template>
<script>
  import Http from './../../common/http';
  import { mapMutations, mapState } from 'vuex';
  import router from "@/router";
  let _gameName,_status,gameP,pageStatus,Pages=1;
  //滚动条在Y轴上的滚动距离

  export default {
    data () {
      return {
        MiNav:[
          {"MimNav":'全部','status':'all'},
          {"MimNav":'未开始',"status":'open'},
          {"MimNav":'进行中','status':'start'},
          {"MimNav":'已结束','status':'close'},
        ],
        minIndex:this.$store.state.match.competeIndex,
        itemsbattle:{
            battleId:''
        },
        currentBattleId:0,
        isClickTab:false,

        matchData:[],
        compete_single:[],
        // currentIndex:'',
        status:false,
        currentPage:this.$store.state.match.competePages,
        currentBooleam:this.$store.state.match.competeBooleams,
        listIndexss:'',
//        testindexshow:this.$store.state.match.firstCompete,
      }
    },
    methods: {

      handleclick(id,battleId,oddsType,index){
        // type==1?router.push(`/guess/${id}`):router.push(`/guesspubg/${id}`);
        // router.push('/guess/987');
        this.$store.commit('mutationIsSendDispath',true)
        this.$store.commit('mutationIsIndex',index)
        console.log('我的列表页',this.$store.state.match.stateGuessId,id)
        if(this.$store.state.match.stateGuessId&&this.$store.state.match.stateGuessId!=id){
          // console.log('我执行了么')
          this.$store.commit('mutationGuessTeamData',null)
        }
        // return;
        router.push(`/guess/${id}`);
        this.$store.commit('mutationStateGuessId',id)
        // let params ={
        //   guessId:id,
        //   oddsType:oddsType,
        //   battleId:battleId
        // }
        // this.$store.commit('mutationSetGuessValue',params)
      },
      getScrollTop(){
        var scrollTop = 0, bodyScrollTop = 0, documentScrollTop = 0;
        if(document.body){
          bodyScrollTop = document.body.scrollTop;
        }
        if(document.documentElement){
          documentScrollTop = document.documentElement.scrollTop;
        }
        scrollTop = (bodyScrollTop - documentScrollTop > 0) ? bodyScrollTop : documentScrollTop;
        return scrollTop;
      },
      getScrollHeight(){
        var scrollHeight = 0, bodyScrollHeight = 0, documentScrollHeight = 0;
        if(document.body){
          bodyScrollHeight = document.body.scrollHeight;
        }
        if(document.documentElement){
          documentScrollHeight = document.documentElement.scrollHeight;
        }
        scrollHeight = (bodyScrollHeight - documentScrollHeight > 0) ? bodyScrollHeight : documentScrollHeight;
        return scrollHeight;
      },
      getWindowHeight(){
        var windowHeight = 0;
        if(document.compatMode == "CSS1Compat"){
          windowHeight = document.documentElement.clientHeight;
        }else{
          windowHeight = document.body.clientHeight;
        }
        return windowHeight;
      },
      //赔率排序
      compare(property){
         return function(obj1,obj2){
             var value1 = parseInt(obj1[property]);
             var value2 = parseInt(obj2[property]);
             return value1 - value2;     // 升序
         }
      },
      MinNav: function(index){
        this.itemsbattle.battleId='';
        this.currentBattleId='';
        this.matchData=[];
        this.compete_single=[];
        this.minIndex=index;
        this.$store.commit('getMutationCurrentIndex',null);
        this.$store.commit('isCompeteIndex',index)
        this.$store.commit('isCompetePages',1);
        this.$store.commit('isCompeteBooleams',false);
        gameP = {
          game:this.$route.query.ID,
          status:this.MiNav[this.$store.state.match.competeIndex].status,
          page:this.$store.state.match.competePages
        }
        if(this.currentPage==1){
          this.isClickTab=true;
        }
        console.log('当前b布尔值',this.isClickTab)
        console.log('状态',gameP,this.minIndex,this.currentPage)
        this.$store.dispatch("compete_list",gameP);

        setTimeout(() => {
          let eBoxList =this.$refs.competelists;
          if(eBoxList!=undefined){
            for(var i=0;i<eBoxList.length;i++){
              eBoxList[1].setAttribute('data-flag','1')
            }
          }
        }, 100);


//        console.log('第一个盘口',gameP,this.compete_singles[0],this.compete_singles)
        /*setTimeout(()=>{
          if(this.compete_singles){
            let battleId=this.compete_singles[0].battle_id;
            this.matchData[battleId] = this.$store.state.match.compete_single
            this.$set(this.matchData,battleId,this.matchData[battleId])

          }
        },400,()=>{
          this.$store.commit('IsFirstCompeteShow',true);
        })*/

      },
      mouseHover:function(event,battleId,elIndex) {
        let el = event.currentTarget.parentNode;
        if(this.isClickTab){
          el.setAttribute('data-flag',1);
          this.isClickTab=false;
        }

        let elFlag=el.getAttribute('data-flag')

        // let elIndex =el.getAttribute('data-index');
        // this.$store.commit('IsFirstCompeteShow',false);
        // let battleId =el.getAttribute('data-id');
        let _boxBoxer =el.parentNode;
        let _boxLi =_boxBoxer.getElementsByClassName('competeList_sur');
        for(var i=0;i<_boxLi.length;i++){
          if(i!=elIndex){
            _boxLi[i].setAttribute('data-flag','1');
          }
        }
        let Index=parseInt(el.getAttribute('data-index'));
        //  console.log('我尽力啊了吗',elFlag)
        if(elFlag=='1'){
          el.setAttribute('data-flag','2');
          // this.currentIndex = battleId;
          this.$store.commit('getMutationCurrentIndex',battleId)
        }else{
          el.setAttribute('data-flag','1');
          this.$store.commit('getMutationCurrentIndex',null)
          // this.currentIndex = null;

        }
        // if(Index==0){
        //   this.$store.commit('IsFirstCompeteShow',true);
        // }

        // this.itemsbattle.battleId=battleId;
          // console.log('我是多少呢',this.currentBattleId,battleId)
        if(this.currentBattleId!=battleId) {
          // console.log('我进来了么',elFlag,this.currentBattleId,this.matchData[battleId])
          var self = this
          self.currentBattleId = battleId;
          if(!self.matchData[battleId]) {
            // console.log('我又进来了一次',battleId)
            // if(Index==0&&this.$store.state.match.competePages==1){

            //   console.log('第一条',self.compete_singles)
            //   self.matchData[battleId] = self.compete_singles
            //   self.$set(self.matchData,battleId,self.matchData[battleId])
            // }else{
              self.$store.dispatch('compete_single', {battle_id: battleId}).then(function (res) {
                self.matchData[battleId] = res.data.data
                self.$set(self.matchData,battleId,self.matchData[battleId])
              });

            // }

          }
        }
      },
      unshiftData(){
        let _box = this;
        setTimeout(()=> {
          if(_box.$store.state.match.competeMore==false) return false;
          if(_box.$route.path.indexOf('/compete/') == -1) return false;
          window.addEventListener('scroll', function () {
            if(_box.$store.state.match.competeMore==false) return false;
            if (_box.getScrollTop() + _box.getWindowHeight() == _box.getScrollHeight()) {
              if(_box.$store.state.match.isReload==true) return false;
              console.log('是否可以下拉',_box.$store.state.match.competeMore);
              Pages = _box.$store.state.match.competePages;
              _box.$store.commit('isCompeteBooleams', true);
              if (_box.$store.state.match.competeBooleams == false) return false;
              _box.$store.commit('isCompeteBooleams', false);
              Pages += 1;
              _box.$store.commit('isCompetePages', Pages)
              if(_box.$store.state.match.competeMore == true){
                gameP = {
                  game: _box.$route.query.ID,
                  status: _box.MiNav[_box.$store.state.match.competeIndex].status,
                  page: Pages
                }
                console.log('下拉状态', _box.$store.state.match.competeIndex, gameP)
                _box.$store.dispatch("compete_list", gameP);
                _box.$store.commit('isReloading', true);
              }
            }else{

            }
          })
        },300)
      }
    },

    mounted () {
      if(this.$route.path.indexOf('/compete/')!=-1) {
        this.MinNav(this.$store.state.match.competeIndex);
        this.unshiftData()
      }

    },
    watch:{

      currentBattleId:function(){
        if(this.$route.path.indexOf('/compete/')!=-1){
          if(this.matchData[this.currentBattleId]){
            this.compete_single = this.matchData[this.currentBattleId]
          }
        }
      },
      $route:function(){
        if(this.$route.path.indexOf('/compete/')!=-1){
          this.currentBattleId=null;
          this.$store.commit('getMutationCurrentIndex',null)
            this.MinNav(this.$store.state.match.competeIndex);
        }
      }

    },
    computed: {
      compete_list: function () {
        console.log('我是什么呢',this.$store.state.match.compete_list)
        return this.$store.state.match.compete_list ? this.$store.state.match.compete_list : null
      },
       compete_singles: function () {
        return this.$store.state.match.compete_singlefirst ? this.$store.state.match.compete_singlefirst : null
      },
      testindexshow:function(){
        return this.$store.state.match.firstCompete
      },
      testindexshowIn:function(){
        return this.$store.state.match.firstCompeteIn
      },
      getCurrentIndex:function(){
        return this.$store.state.match.isCurrentIndex;
      }
    }

  }

</script>
<style lang="scss" scoped src="@/assets/css/guessList.css"></style>
<style lang="scss" scoped>
//   .competeList_down ul>li:nth-child(1) .compete-team-list{display:block !important;}
// .competeList_sur{
//   &:nth-child(1){
//     background: red !important;
//      .henfan{
//       display: block !important;
//     }
//   }
// }
</style>






