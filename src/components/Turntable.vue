<template>

  <div id="turntable"  v-if="getTurnData">
    <div class="container">
      <!-- 顶部 -->
      <div class="top">
        <div class="lucky">
          <!--活动TITLE-->
          <div class="luckytitle">
            <!--活动人数-->
            <div class="luckyplayer">
              <div class="luckyplayertitle">
                <i>当前活动</i>
                <div><span>奖品:</span><span>{{getRewardPoolData?getRewardPoolData.length:0}}</span></div>
                <div><span>人数:</span><span>{{this.$store.state.turntable.joinPeopleNum}}</span></div>
              </div>
            </div>
          </div>
          <!--新倒计时-->
          <div class="luckytime">
            <!--倒计时-->
            <!-- <div> -->
              <!-- <transition name="fadet">-->
              <div class="luckytimecount" v-if="getisShowCurrentTime">
                  <div class="luckytimecountthis">
                    <div><span class="countfront">0</span><span class="countback">0</span></div>
                    <!--分钟-->
                    <div><i>{{(getCountTime < 60 ? 0 :1)}}</i></div>
                    <!--十秒-->
                    <div class="thismimute" ref="thisminute" :class="{thiscount:isShowClass==true}"><i>{{getCountTime<60? parseInt(getCountTime / 10):0}}</i><span ref="countnum1" class="countfront">{{getCountTime<60? parseInt(getCountTime / 10):0}}</span><span class="countback">{{getCountTime<60? parseInt(getCountTime / 10):0}}</span></div>
                    <!--一秒-->
                    <div  ref="thissecound" :class="isTimeDownLoading?'thiscount':''"><i>{{getCountTime<60? parseInt(getCountTime % 10):0}}</i><span class="countfront" >{{getCountTime<60? parseInt(getCountTime % 10):0}}</span><span class="countback">{{getCountTime<60? parseInt(getCountTime % 10):0}}</span></div>
                    <i class="clear"></i>
                  </div>
                  <i class="clear"></i>
                </div>


               <!--</transition> -->
            <!-- </div> -->
              <div class="luckytimejoin" v-if="getisShowJoinBtn" @click="joinin"></div>
              <div v-if="getTurnData">
                <!--用户提示-->
                <div class="luckytitlefont"  v-if="this.$store.state.turntable.joinPeopleNum==0">等待您的参与</div>
                <div class="luckytitlefont"  v-else-if="this.$store.state.turntable.joinPeopleNum==1">当前有1人参与，耐心等待其他玩家~</div>
                <!-- <div class="luckytitlefont"  v-else>当前参与人数有{{getTurnData.player_num}}人参与</div> -->
                <!--额外奖励-->
                <div v-if="getAdditionalData">
                <div class="reward"  v-if="getAdditionalData.length>0">
                  <div class="reward_img">
                    <img :src="getAdditionalData[0].pic" alt="" :class="'V-'+getAdditionalData[0].quality">
                  </div>
                </div>
                </div>
              </div>
            <!--抽奖动画-->
            <!-- <transition name="fadet"> -->
              <!--抽奖动画-->
              <div class="luckytimeman">
                <div class="luckytimemanyou" v-if="getisShowAnimateBg"><img src="../assets/images/turntable/pointer.png" :class="{luckypointer:this.$store.state.turntable.isShowindicator==true}" alt=""></div>
                <!-- Swiper1 -->
                <!-- <div"> -->
                  <!-- <transition name="fade"> -->
                    <div class="swiper-no-swiping swiper-container" ref="mySwiper" v-if="getisShowAnimation">
                      <div  class="swiperall-containersss" :class="{swiperall:getisAnimationLeft}" v-show="!getisShowWinnerPlayer">
                        <div v-for="(item,index) in getjoinInplayerData" :key="index" class="swiper-slide">
                          <img :src="item.avatar" alt="" ref="thisavtar">
                          <span ref="thisname">{{item.name}}</span>
                        </div>
                        <i class="clear"></i>
                      </div>
                    <!-- </div> -->
                  <!-- </transition> -->
                </div>

                <div v-if="getisShowWinnerPlayer">
                  <!-- <transition name="edaf"> -->
                    <div class="thiswinner" v-if="getWinnerData&&getisShowAnimation">
                      <img :src="getWinnerData.avatar" alt="">
                      <span>{{getWinnerData.name}}</span>
                    </div>
                  <!-- </transition> -->
                </div>
              </div>
            <!-- </transition> -->
          </div>
        </div>
      </div>
      <!-- 左侧 -->
      <div class="left fleft">
        <!--投入道具我的背包-->
        <div class="propmybag" v-if="getisShowPull">
          <div class="prop">
            <div class="proptitle"><span class="fleft"><img src="../assets/images/turntable/joinicon.png"  class="propitem"><em>请选择投入道具</em><em style="color:#c43338;margin-left:3px;">(已投入：{{this.$store.state.turntable.pushToolData?this.$store.state.turntable.pushToolData.length+(getMybetData?parseInt(getMybetData.chips_count):0):(getMybetData?parseInt(getMybetData.chips_count):0)}}个)</em></span><span @click="bagclose" class="closemybag fright">关闭</span><i class="clear"></i></div>
            <div class="propcontent">
              <div class="proptop">
                <ul>
                  <li v-for="(item,index) in getPushToolData" :key="index" class="fleft" @click="deletePushData({'product_id':item.product_id,'product_name':item.product_name,'product_count':item.product_count,'product_cprice':item.product_cprice,'type':'delete'})" v-if="item.product_count>0" :class="'V-'+item.quality">
                    <img :src="item.product_pic" alt="">
                    <div class="x100" v-if="item.product_id==0">×{{item.product_count}}</div>
                  </li>
                  <i class="clear"></i>
                </ul>
                <div style="clear:both;"></div>
              </div>
              <!-- <div class="proptip"><span>单次预测道具数量不能大于{{getRewardPoolData?getRewardPoolData.length>90?100-getRewardPoolData.length:10:10}}个<em style="color:#fff;">({{this.$store.state.turntable.pushToolData?this.$store.state.turntable.pushToolData.length:0}}/({{getRewardPoolData?getRewardPoolData.length>90?100-getRewardPoolData.length:10:10}}))</em></span></div> -->
              <div class="proptip"><span>单次预测道具数量不能大于{{getHaveNumber}}个<em style="color:#fff;">({{this.$store.state.turntable.pushToolData?this.$store.state.turntable.pushToolData.length:0}}/{{getHaveNumber}})</em></span></div>
              <div class="propdown">
                <div class="propevaluate fleft">道具估价：
                  <span>{{thousandBitSeparator(getMinePushToolValue)}} C</span>
                </div>
                <div class="propexpect fleft">当前获胜概率：
                  <!-- <span v-if="!getRewardMainValue">100 %</span> -->
                  <span>{{getWiningProbability}}</span>
                  <!-- <span>{{(this.$store.state.turntable.isWinChance+'').slice(0,5)}}%</span> -->
                  <!-- <span v-else>0%</span> -->
                </div>
                <div class="propbtn fright" v-if="!isjoinbtnsec" @click="fnPostBet">确认参加</div>
                <div class="propbtnsec fright" v-if="isjoinbtnsec" >正在预测</div>
              </div>
            </div>
          </div>
          <div class="mybag" v-if="getMybagData">
            <div class="mybagtitle"><img src="../assets/images/turntable/bagicon.png"  class="bagicon"><em>我的背包</em></div>
            <div class="mybagcontent" :style="{height: getMybagData.length?(getMybagData.length%8==0?getMybagData.length/8-1:Math.floor(getMybagData.length/8))*100+150+'px':'150px'}">
              <transition name="fadet">
                <ul v-if="getMybagData.length>0">
                  <li v-for="(item,index) in getMybagData"  @click="fnPushTop({'product_id':item.product_id,'product_count':item.product_id==0?(item.product_count<100?item.product_count:100):1,'product_name':item.product_name,'product_pic':item.product_id!==0?item.product_small_pic:item.product_pic,'quality':item.quality,'product_cprice':item.product_id==0?(item.product_count<100?item.product_count:100):item.product_cprice,'type':'push'})" v-if="item.product_count>0" :class="'ImgOut relative V-'+item.quality" :key="index">
                    <span><img :src="item.product_id!==0?item.product_small_pic:item.product_pic" alt=""></span>
                    <div class="quality" v-if="item.product_count>0">×{{item.product_count}}</div>
                  </li>
                  <i class="clear"></i>
                </ul>
                <span v-else class="nobag">您暂无道具</span>
              </transition>
            </div>
          </div>
        </div>
        <div v-if="getisShowThird">
           <!-- 奖品池 -->
        <div class="prize">
          <div class="prizetitle">
            <span class="fleft pt1"><img src="../assets/images/turntable/prizeicon.png"  class="prizeicon">奖品池</span>
            <span class="pt3">( 总价值：{{this.$store.state.turntable.rewardMainValue}} C )</span>
            <span class="fright pt2">道具数量{{getRewardPoolData?getRewardPoolData.length:0}}/100</span>
          </div>
          <div class="prizecontent">
          <div class="propimgs" :class="{active:getRewardPoolData&&getRewardPoolData.length!=0}">
            <div class="prizeno" v-if="getRewardPoolData&&getRewardPoolData.length==0">暂无奖品投入</div>
              <ul v-for="(item,index) in Math.ceil(getRewardPoolData.length/10)" :key="index">
                <li class="propbox" v-for="(items,inindex) in getRewardPoolData" v-if="inindex>=(item-1)*10&&inindex<(item)*10" :class="'V-'+items.quality" :key="inindex">
                  <div class="ImgOut">
                    <span><img :src="items.pic" :alt="items.name" :title="items.name"></span>
                    <div class="propquality">×{{items.count}}</div>
                  </div>
                </li>
                <i class="clear"></i>
              </ul>
            </div>
            <!-- <div class="propimgsone" :style="{height: turndata.pool.length?(turndata.pool.length%10==0?turndata.pool.length/10:Math.ceil(turndata.pool.length/10))*68+'px':'120px'}"></div> -->
          </div>
        </div>
        <!--我的投注-->
        <div class="prize" v-if="getMybetData">
          <div class="prizetitle">
            <span class="fleft pt1"><img src="../assets/images/turntable/myjoinicon.png"  class="prizeicon">我的投注</span>
            <span class="pt3">( 价值：{{this.$store.state.turntable.minebetValue}} C )</span>
            <span class="fright pt2">获胜概率{{getMyWiningProbability}}</span>

          </div>
          <div class="prizecontent">
            <div class="propimgs">
              <div class="prizeno" v-if="!getMybetData.chips.length">您暂无道具投入<span class="myjoinbtn" v-show="getisShowJoinBtn"  @click="joinin">我要参与</span></div>
              <ul v-if="getMybetData&&getMybetData.chips.length>0" v-for="(item,index) in Math.ceil(getMybetData.chips.length/9)" :key="index">
                <li class="propbox" v-for="(items,indexli) in getMybetData.chips"  :class="'V-'+items.quality" v-if="indexli>=parseInt(index)*10 &&indexli<=(parseInt(index)+1)*10-1 && getMybetData.chips.length" :key="indexli">
                  <div class="ImgOut">
                    <span><img :src="items.pic" alt=""></span>
                    <div class="propquality" v-if="items.count>1">×{{items.count}}</div>
                  </div>
                </li>
                <span class="propboxadd" v-if="getMybetData&&getMybetData.chips.length>0" v-show="getisShowJoinBtn" @click="joinin"><em></em></span>
                <i class="clear"></i>
              </ul>
            </div>
          </div>
        </div>
        <!-- 中奖记录  -->
        <div class="record">
          <div class="recordtitle"><img src="../assets/images/turntable/itemicon.png"  class="recordicon"><em>历史中奖记录</em></div>
          <div  class="recordcontent" v-if="getHistoryWinnerData">
          <div v-if="getHistoryWinnerData.length<1" class="prizeno">暂时还没有中奖记录</div>
          <div v-if="getHistoryWinnerData" class="recordcontent-show">
            <div class="winer111" v-for="(items,index) in getHistoryWinnerData" :key="index">
              <div class="recordtop fleft">
                <div class="recordavatar fleft">
                  <img :src="items.avatar" alt="">
                </div>
                <div class="recordnickname fleft">{{items.name}}</div>
                <div class="recordwin fleft">以
                  <span>{{items.win_rate < 10 ? items.win_rate.toString().slice(0,4):items.win_rate.toString().slice(0,5)}}%</span>的概率获胜</div>
                <div class="recordvaluation fleft">获胜估值:</div>
                <div class="recordnum fleft">{{thousandBitSeparator(items.reward_cai)}} C</div>
              </div>
              <div class="recorddown fright">
                <ul class="recordprize">
                  <!-- 皮肤道具 -->
                  <li v-if="items.reward.cards.length" v-for="(item,demo) in items.reward.cards" :key="(demo+1)*parseInt(item.id)" :class="'ImgOut V-'+item.quality">
                    <span><img :src="item.pic" alt=""></span>
                    <div class="recordprizecount">×{{item.count}}</div>
                  </li>
                  <!-- 碎片 -->
                  <li  v-for="(item,demo) in items.reward.debris" v-if="items.reward.debris.length>0&&demo==0" :key="(demo+1)*parseInt(item.id)" :class="'ImgOut V-'+item.quality">
                    <span><img :src="item.pic" alt=""></span>
                    <div class="recordprizecount">×{{item.count}}</div>
                  </li>
                  <!-- 额外奖励 -->
                  <li v-if="items.reward.bonus.length>0" class="thisbonus" v-for="(item,demo) in items.reward.bonus" :key="(demo+1)*parseInt(item.id)" :class="'ImgOut V-'+item.quality">
                    <em><img :src="item.pic" alt=""></em>
                    <div class="recordprizecount">x{{item.count}}</div>
                    <span>奖</span>
                  </li>
                  <i class="clear"></i>
                </ul>
              </div>
              <i class="clear"></i>
            </div>

          </div>
          </div>
        </div>

        </div>

        <!-- 参与记录 -->
        <div class="takeincontent1" v-if="getisShowRecordRender">
          <div class="takeintop">
            <div class="takeintitle fleft">参与记录</div>
            <div class="dayprofit fleft">今日收益：
              <span>{{thousandBitSeparator(getMineJoinMessage.income_day)}} C</span>
            </div>
            <div class="weekprofit fleft">本周收益：
              <span>{{thousandBitSeparator(getMineJoinMessage.income_week)}} C</span>
            </div>
            <div class="winlose fleft">
              <ul>
                <li v-for="(item,index) in tabs1" :key="index" :class="index==getRecordTabsType?'white1':'gray1'" @click="tab1(index)">
                  {{item}}
                </li>
              </ul>
            </div>
            <div class="xxxx fleft" @click="close3"></div>
          </div>
          <div v-if="getWinerUserData">
            <div v-if="getWinerUserData.length<1" class="prizeno">暂无记录</div>
            <div v-for="(item,index) in getWinerUserData" :key="index" v-if="(item.is_win==1?0:1)==num1||num1==2" class="takeinwin">
              <div class="takeinwintitle">
                <div class="takeinwindata fleft">{{item.date}}</div>
                <div class="takeinwinvalue fleft">参与估值：
                  <span>{{thousandBitSeparator(item.chipsC)}} C</span>
                </div>
                <div class="takeinwinper fleft">获胜概率：
                  <span>{{(item.win_rate*100+'').slice(0,5)}}%</span>
                </div>
                <div class="takeinwinown fleft" v-if="item.is_win==1">收益估值：
                  <span>{{thousandBitSeparator(item.rewardC)}} C</span>
                </div>
              </div>
              <div class="takeinwinconcent">
                <img src="../assets/images/turntable/lose.png" alt="" v-if="item.is_win!=1" class="takeinimg">
                <img src="../assets/images/turntable/win.png" alt="" v-if="item.is_win==1" class="takeinimg">
                <!-- win第一行 -->
                <div class="takeinwinfirst" :class="{active:istakeinmorepic==(5*getRecordPage+index)}" :data-index="5*getRecordPage+index" :data-page="getRecordPage">
                  <ul>
                    <li v-for="(data,indexli) in item.is_win==1?item.reward:item.chips" :key="indexli+indexli*index">
                      <img :src="data.pic" alt="" :class="'V-'+data.quality">
                      <div class="takeinwincount">×{{data.count}}</div>
                    </li>
                    <div class="takeinwinbonus" v-if="item.bonus.length">
                      <img :src="item.bonus[0].pic" alt="" :class="'V-'+item.bonus[0].quality">
                    </div>
                  </ul>
                  <!-- <div  class="takeinwinbonus-bg" v-for="(itemser,indered) in item.is_win==1?(item.bonus.length<1?Math.ceil(item.reward.length/7):Math.ceil((item.reward.length+1)/7)):Math.ceil(item.chips.length/7)" v-if="istakeinmorepic==(5*getRecordPage+index)&&itemser%2==0" :style="{top:62*(itemser-1)+'px'}"></div> -->
                  <div v-if="istakeinmorepic!=(5*getRecordPage+index)">
                    <div class="takeinwinmore" v-if="item.is_win==1?(item.bonus.length<1?item.reward.length>8:(item.reward.length+1)>8):(item.chips.length>8)" @click="takeinmorepic(5*getRecordPage+index)">更多</div>
                  </div>
                </div>
                <!-- 点击更多 -->

              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- 右侧 -->
      <div class="right fright">
        <!-- 个人信息 -->
        <div class="personinfo" v-if="getSelfData">
          <div class="persontop">
            <div class="personavatar fleft">
              <img :src="getSelfData.avatar" alt="" style="border: 1px solid #212125" v-if="getSelfData.avatar=='https://imgcdn.api.com/img/avatar.png'">
              <img :src="getSelfData.avatar" alt="" v-else>
              <div class="isvip" v-if="getSelfData.vip_level>0">
                <img :src="'/src/assets/images/turntable/vip'+getSelfData.vip_level+'.png'" alt="">
              </div>
            </div>
            <div class="personnickname fleft">
              <span>{{getSelfData.nickname}}</span>
              <span class="personnickvip" v-if="getSelfData.vip_level!=0">VIP{{getSelfData.vip_level}}</span>
            </div>
            <div class="partake fright" @click="takeinrecord"></div>
            <div class="partakelight fright" @click="takeinrecord" v-show="islightred"></div>
          </div>
          <!--这是一条线-->
          <div class="personline"></div>
          <!--这是一条线-->
          <div class="persondown">
            <ul>
              <li class="partakenum fleft">
                <div class="partaketop">参与数</div>
                <div class="partakedown">{{getMineJoinMessage.play_times}}</div>
              </li>
              <li class="partakewin fleft">
                <div class="partaketop">胜利</div>
                <div class="partakedown">{{getMineJoinMessage.win_times}}</div>
              </li>
              <li class="partakeper fleft">
                <div class="partaketop">胜率</div>
                <div class="partakedown">{{(getMineJoinMessage.win_rate*100+'').slice(0,5)}}%</div>
              </li>
            </ul>
          </div>
          <!-- 预测提醒 -->
          <div class="competeinfo">本站所有预测均只为休闲娱乐，增加比赛趣味性，所有道具<br>和C币均不能兑换为现金</div>
        </div>
        <!-- 世界聊天 -->
        <div class="wordtalk" v-show="ischat&&getTalkingData">
          <div class="detail-dn-world">
            <div class="detail-dn-world-main">
              <ul>
                <li v-for="(data,index) in getTalkingData" :key="index" v-if="data.nickname!=''">
                  <span>{{data.nickname}}</span>
                  <em>：{{data.content}}</em>
                </li>
              </ul>
            </div>
            <div class="detail-dn-world-send">
              <input type="text" class="detail-send-input" @focus="focusInput" @blur="blusInput" placeholder="限输入50个字符" ref='talkcontent' @keyup="sendcontentEnter($event)" />
              <div class="detail-world-button" @click="sendmessage"></div>
              <div class="clear"></div>
            </div>
          </div>
        </div>
        <!-- 参与人数与玩法介绍 -->
        <div class="partakeintroduce">
          <div class="tabstitle">
            <ul>
              <li v-for="(item,index) in tabs"  :class="index==num?'white':'gray'" @click="tab(index)" :key="index">
                {{ item }}
              </li>
            </ul>
          </div>
          <div class="takeincontent"  v-if="getParticipantData&&num==0&&getParticipantData.length!=0">
            <div class="takein" v-for="(item,index) in getParticipantData" :key="index">
              <div class="takeinavatar fleft">
                <img :src="item.avatar" alt="">
              </div>
              <div class="takeinname fleft">{{item.name}}</div>
              <div class="takeinvalue fleft">投入估值：<span>{{thousandBitSeparator(item.chips_cai)}} C</span></div>
            </div>
          </div>
          <div class="takeincontent0" v-if="num==0&&getParticipantData.length==0">暂无人参与</div>
          <div class="introducecontent" v-if="num==1">
            <p>1、获胜者=玩家投入+系统奖励</p>
            <p>2、点击“我要参加”可以投入道具到奖池中，60s等待倒计时结束后，系统会抽取一名幸运玩家，获得奖品池中所有道具</p>
            <p>3、你的获奖概率是你投入道具价值占玩家奖池中道具总价值的百分比</p>
            <p>4、参与玩家达到2人后，倒计时开始。倒计时快结束时（15s内），每次投入会使倒计重置为15s。最后3秒将无法投入道具</p>
            <p>5、奖池最多容纳100件道具，投入道具达到数量上限后，直接进入3s倒计时，且其他人无法参加</p>
            <!-- <p>6、单件可投入道具1≤价值＜50,碎片100个起投且需要是100的倍数</p> -->
            <p>6、碎片100个起投且需要是100的倍数</p>
            <p>7、你每次最多可投10件道具，每局最多50件道具，已投道具无法取消</p>
            <p>8、每局奖品池内的部分道具将被系统收回，收回的比例≤5%</p>
          </div>
        </div>
      </div>
      <i class="clear"></i>
    </div>
  </div>
</template>

<script>
import Http from "../common/http";
import config from "../common/http-config";
import router from "@/router";
import { swiper, swiperSlide } from "vue-awesome-swiper";
require("../assets/swiper/swiper.css");
require("../assets/swiper/swiper.js");
export default {
  data() {
    return {
      //按钮
      isjoinbtnsec:false,
      ischat:false,
      islightred:false,
      ws: null,
      //
      thisfont:true,
      // 聊天
      onmessage: "",
      tabs: ["参与人数", "玩法介绍"],
      tabs1: ["赢", "输", "全部"],
      num: 0,
      num1: 2,
      // 数据
      // talkdata: {},
      // 预测数据
      message: "",
      // 参与人数
      wsdata: null,//websoket数据
      sendtalk: {
        message: "",
        type: 1
      },
      istakeinmorepic: null,
      isTimeDownLoading:null,
      isShowClass:false,
      // isShowRecordType:0,
      recordStatus:['win','lose','all',],
      pageThis:1,
      countDown:null,
    };
  },
  components: {
    swiper,
    swiperSlide
  },
  methods: {
    thousandBitSeparator(num){
      return (num || 0).toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,');
    },
    takeinmorepic(tag) {
      this.istakeinmorepic = tag;
    },
    focusInput() {
      this.$refs.talkcontent.placeholder = "";
    },
    blusInput() {
      this.$refs.talkcontent.value == ""
        ? (this.$refs.talkcontent.placeholder = "限输入50个字符")
        : (this.$refs.talkcontent.placeholder = "");
    },
    sendcontentEnter(event) {
      if (event.ctrlKey && event.keyCode == 13) {
        this.sendmessage();
      }
    },
    sendmessage() {
      let value = this.$refs.talkcontent.value;
      if (value == "") {
        let dataOption ={
          'masseges':'聊天内容不能为空',
          'type':'2',
        }
        this.$store.commit('isSigninPupopDis',true);
        this.$store.commit('isSigninPupopDis',dataOption);
        return;
      } else if (value.length > 50) {
        let dataOption ={
          'masseges':'最多不超过25个汉字或50个字符',
          'type':'2',
        }
        this.$store.commit('isSigninPupopDis',true);
        this.$store.commit('isSigninPupopDis',dataOption);
        return;
      } else {
        this.sendtalk.message = value;
        Http.post(`wheel/chat`, this.sendtalk).then(response => {
            if (response.data.code == 0) {
              // this.gettalkdata();
              this.$refs.talkcontent.value = "";
              this.$refs.talkcontent.placeholder = "限输入50个字符";
            }else{
              let dataOption ={
                'masseges':response.data.message,
                'type':'2',
              }
              this.$store.commit('isSigninPupopDis',true);
              this.$store.commit('isSigninPupopDis',dataOption);
            }
          }).catch(Http.onError);
      }
    },
    initWebSocket: function() {
      if (this.ws) {
        this.ws.close();
        this.ws = null;
      };
      this.ws = new WebSocket(`${config.websocket}?channel=wheel:1`);
      let self = this;
      this.ws.onmessage = function(event) {
        self.wsdata = JSON.parse(event.data);
        self.$store.commit('mutationIsShowCountTime',false)
        console.log('即时通讯',self.wsdata.pid,self.wsdata)
        self.$store.commit('mutationWebSocketData',self.wsdata)
        if(self.wsdata.pid==1){
          self.$store.commit('mutationWebSocketData',self.wsdata)
        }
        if (self.wsdata.pid == 5) {
        }
        if (self.wsdata.pid == 6) {
          self.talkdata.messages.push({
            nickname: self.wsdata.data.sender.nickname,
            content: self.wsdata.data.message.content
          });
        }
      };
    },
    tab(index) {
      this.num = index;
    },
    tab1(index) {
      // this.num1 = index;
      this.$store.commit('mutationRecordTabsType',index)
      this.$store.commit('mutationRecordPage',1)
      this.$store.commit('mutationWinerUserData',null)
      this.$store.dispatch('actionWinerUser',{status:this.recordStatus[index],'page':this.$store.state.turntable.recordPage})
    },
    // 获取数据、
    getdata() {
      this.$store.dispatch('actionWheeldata',{'type':'1'})
      // 我的投注
      this.$store.dispatch('actionUserNowChips')
      // 我的背包
      this.$store.dispatch('actionMybagdata')
      // 个人信息  头像vip
      console.log('this.$store.state.user.userInfo',this.$store.state.user.userInfo)
      // if(!this.$store.state.user.userInfo){
      //   this.$store.commit("istestBooleam", true);
      //   this.$store.commit("showLoginDialog", true);
      // }
      // 参与记录
      this.$store.dispatch('actionJoinRecord')
    },
    gettalkdata() {
      // 聊天数据
      this.$store.dispatch('actionTalkingdata',{type:1});
      // Http.get(`/wheel/getChatMsg?type=1`).then(response => {
      //   this.talkdata = response.data.data;
      // }).catch(Http.onError);
    },
    //点击参与记录
    takeinrecord() {
      // this.num1 = 2;
      this.$store.commit('mutationWinerUserData',null)
      this.$store.commit('mutationRecordTabsType',2)
      this.unshiftData()
      this.$store.commit('mutationIsShowRender',{type:3})
      this.$store.commit('mutationRecordPage',1)
      this.$store.commit('mutationWinerUserData',null)
      let params ={
        'status':this.recordStatus[2],
        'page':this.$store.state.turntable.recordPage
        }
      this.$store.dispatch('actionWinerUser',params)
    },
    // 参加预测
    joinin() {
      let userInfo_vip = this.$store.state.user.userInfo?this.$store.state.user.userInfo.vip_level:null;
      if(userInfo_vip<1){
        let dataOption ={
          'masseges':'您尚未达到VIP1，无法使用该功能',
          'type':'2',
          'showrecharge':1
        }
        this.$store.commit('isSigninPupopDis',true);
        this.$store.commit('isSigninPupopDis',dataOption);
      }else{
        this.$store.commit('mutationIsShowRender',{type:1})
        this.$store.commit('mutationRecordPage',1)
        this.$store.commit('mutationWinerUserData',null)
      }


    },
    //关闭投入和背包
    bagclose(){
      this.$store.commit('mutationIsShowRender',{type:2})
    },
    //关闭参与记录
    close3() {
      this.$store.commit('mutationIsShowRender',{type:2})
      this.$store.commit('mutationRecordPage',1)
      this.$store.commit('mutationWinerUserData',null)
    },
    //投入道具
    fnPushTop(params){
      let singerPushLen =this.$store.state.turntable.pushToolData.length;
      let mineBetCardsLen =this.$store.state.turntable.mineBetCardsLen;
      if(params.product_count<100&&params.product_id==0){
        let dataOption ={
          'masseges':'碎片100个起投且需要是100的倍数',
          'type':'2',
        }
        this.$store.commit('isSigninPupopDis',true);
        this.$store.commit('isSigninPupopDis',dataOption);
        return;
      }
      if(params.product_id==0){
        if(this.$store.state.turntable.singerPushIconValue==0){
          if(singerPushLen+1>10){
            let dataOption ={
              'masseges':'已达投注个数上限',
              'type':'2',
            }
            this.$store.commit('isSigninPupopDis',true);
            this.$store.commit('isSigninPupopDis',dataOption);
            return;
          }

        }else if(this.$store.state.turntable.singerPushIconValue==21000){
          let dataOption = {
              'masseges': '碎片单次投入最高限额为21,000',
              'type': '2',
          }
          this.$store.commit('isSigninPupopDis',true);
          this.$store.commit('isSigninPupopDis',dataOption);
          return;
        }
      }else{
        if(singerPushLen+1>10){
          let dataOption ={
          'masseges':'已达投注个数上限',
          'type':'2',
        }
        this.$store.commit('isSigninPupopDis',true);
        this.$store.commit('isSigninPupopDis',dataOption);
        return;
        }
      }

      this.$store.commit('mutationMybagData',params)
      this.$store.commit('mutationPushToolData',params)
    },
    //删除投入的道具
    deletePushData(params){
      console.log('删除数据',params)
      this.$store.commit('mutationMybagData',params)
      this.$store.commit('mutationPushToolData',params)
    },
    // 确认按钮
    fnPostBet() {
      let self =this;
      if(!this.$store.state.turntable.isShowJoinBtn){
        return;
      }
      let pushData =this.$store.state.turntable.pushToolData;
      let cards = this.$store.state.turntable.cardsData;
      let debris=this.$store.state.turntable.singerPushIconValue;

      let params={
        type:1,
        debris:debris,
        cards:JSON.stringify(cards),
      };
      if(debris==0&&JSON.stringify(cards)=='{}'){
          let dataOption ={
            'masseges':'尚未选择投入道具',
            'type':'2',
          }
          this.$store.commit('isSigninPupopDis',true);
          this.$store.commit('isSigninPupopDis',dataOption);
          return;
      }
      this.isjoinbtnsec=true;
      let minGuessValue=this.$store.state.turntable.minePushValue;
      Http.post('/wheel/bet', params).then(response => {
        if (response.data.code == 0) {
          self.isjoinbtnsec = false;
          self.$store.commit('mutationPushToolData',null);
          if (self.$store.state.turntable.turnData.pool_num >= 100) {
              self.$store.commit('mutationTurnCountTime',5);
          }
          let dataOption ={
            'masseges':response.data.message,
            'type':'2',
          }
          self.$store.commit('isSigninPupopDis',true);
          self.$store.commit('isSigninPupopDis',dataOption);
          self.$store.commit('mutationIsShowRender',{type:2});
          self.$store.dispatch('actionUserNowChips')
          self.$store.dispatch('actionMybagdata')
          // 重置数据
        }else{
          let dataOption ={
            'masseges':response.data.message,
            'type':'2',
          }
          self.$store.commit('isSigninPupopDis',true);
          self.$store.commit('isSigninPupopDis',dataOption);
          self.isjoinbtnsec = false;
        }
      }).catch(Http.onError);

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
    //下拉加载
    unshiftData(){
      let self = this,Pages;
      window.addEventListener('scroll', function () {
        if(!self.$store.state.turntable.isShowRecordRender)return false;
        if(!self.$store.state.turntable.isShowNext) return false;
        if (self.getScrollTop() + self.getWindowHeight() >= self.getScrollHeight()-60) {
          console.log('是否可以下拉',self.$store.state.turntable.isShowNext)
          if(!self.$store.state.turntable.isreload)return false;
          Pages = self.$store.state.turntable.recordPage;
          Pages += 1;
          self.$store.commit('mutationRecordPage',Pages)
          self.$store.commit('mutationIsreload',false);

          let params ={
            'status':self.recordStatus[self.$store.state.turntable.recordTabsType],
            'page':self.$store.state.turntable.recordPage
            }

          self.$store.dispatch('actionWinerUser',params)
        }
      })
    },
  },
  destroyed() {

  },
  // watch:{
  //   $route(){
  //     let self =this;
  //     if(this.$route.path.indexOf('turntable')>-1){
  //       self.$store.commit('mutationPushToolData',null);
  //       self.$store.commit('mutationRecordTabsType',2)
  //       self.initWebSocket();
  //       if(!self.countDown){
  //         self.countDown=setInterval(()=>{
  //           self.initWebSocket();
  //         },1000*60*10)
  //       }
  //       self.$store.dispatch('actionUserNowChips')
  //       // 我的背包
  //       self.$store.dispatch('actionMybagdata')
  //       self.$store.dispatch('actionJoinRecord')
  //       console.log('测试一下')
  //     }
  //   }
  // },
  mounted() {
    let self =this;
    if(self.$route.path.indexOf('turntable')>-1){
      self.$store.commit('mutationPushToolData',null);
      self.$store.commit('mutationRecordTabsType',2)
      self.initWebSocket();
       if(!self.countDown){
          self.countDown=setInterval(()=>{
            self.initWebSocket();
          },1000*60*10)
       }
      self.$store.dispatch('actionWheeldata',{'type':'1'})
      // 我的投注
      self.$store.dispatch('actionUserNowChips')
      // 我的背包
      self.$store.dispatch('actionMybagdata')
      // 参与记录
      self.$store.dispatch('actionJoinRecord')
      self.gettalkdata();
      self.unshiftData();
    }
  },
  destroyed() {
    clearInterval(this.countDown)
  },
  computed:{
    getMineJoinMessage:function(){
      return this.$store.state.turntable.mineJoinMessage;
    },
    getWinerUserData:function(){
      // console.log('ddddddddd',this.$store.state.turntable.winerUserData)
      return this.$store.state.turntable.winerUserData;
    },
    getMybetData:function(){
      return this.$store.state.turntable.mybetData;
    },
    getWinChance:function(){
      return this.$store.state.turntable.isWinChance;
    },
    getIsShowMore:function(){
      return this.$store.state.turntable.isShowNext;
    },
    getRecordPage:function(){
      console.log('page,',this.$store.state.turntable.recordPage)
      return this.$store.state.turntable.recordPage;
    },
    getTurnData:function(){
      return this.$store.state.turntable.turnData?this.$store.state.turntable.turnData:null;
    },
    getRewardPoolData:function(){
      return this.$store.state.turntable.rewardPoolData?this.$store.state.turntable.rewardPoolData:null;
    },
    getMybagData:function(){
      return this.$store.state.turntable.mybagData;
    },
    getTalkingData:function(){
      console.log('聊天数据',this.$store.state.turntable.talkingData)
      return this.$store.state.turntable.talkingData?this.$store.state.turntable.talkingData.messages:null;
    },
    //个人信息
    getSelfData:function(){
      if(this.$store.state.user.userInfo){
        this.$store.commit('mutationMineId',this.$store.state.user.userInfo.id)
      }
      console.log('个人信息',this.$store.state.user.userInfo);
      return this.$store.state.user.userInfo?this.$store.state.user.userInfo:null;
    },
    getHistoryWinnerData:function(){
      return this.$store.state.turntable.historyWinnerData?this.$store.state.turntable.historyWinnerData:null;
    },
    getAdditionalData:function(){
      return this.$store.state.turntable.additionalData?this.$store.state.turntable.additionalData:null;
    },
    getParticipantData:function(){
      let participantData=this.$store.state.turntable.participantData?this.$store.state.turntable.participantData:null;
      return participantData;
    },
    getjoinInplayerData:function(){
      console.log('参与的动画',this.$store.state.turntable.joinInplayerData)
      return this.$store.state.turntable.joinInplayerData?this.$store.state.turntable.joinInplayerData:null;
    },
    getPushToolData:function(){
      return this.$store.state.turntable.pushToolData;
    },
    getMinePushToolValue:function(){
      return this.$store.state.turntable.minePushValue;
    },
    getRewardMainValue:function(){
      return this.$store.state.turntable.rewardMainValue;
    },
    getMinebetValue:function(){
      return this.$store.state.turntable.minebetValue;
    },
    //当前获胜概率
    getWiningProbability:function(){
      let RewardMainValue=parseInt(this.$store.state.turntable.rewardMainValue);//奖池里面的总价值
      let MinebetValue=parseInt(this.$store.state.turntable.minebetValue);//我已投注的总价值
      let MinePushToolValue=parseInt(this.$store.state.turntable.minePushValue);//我将要投注的总价值
      let winnerprice=0;
      let sumValue =RewardMainValue+MinePushToolValue;
      let mineValue =MinebetValue+MinePushToolValue;

      winnerprice=sumValue?((mineValue/sumValue)*100).toString().slice(0,5):0;
      console.log('概率',winnerprice,'奖池总价值',RewardMainValue,'全部价值',sumValue,'投注的总价值',MinePushToolValue,'我已投注的总价值',MinebetValue,)
      return winnerprice+'%';
    },
    //获胜概率
    getMyWiningProbability:function(){
      let RewardMainValue=parseInt(this.$store.state.turntable.rewardMainValue);//奖池里面的总价值
      let MinebetValue=parseInt(this.$store.state.turntable.minebetValue);//我已投注的总价值

      let winnerprice=0;
      winnerprice=RewardMainValue?((MinebetValue/RewardMainValue)*100).toString().slice(0,5):0;
      return winnerprice+'%';
    },
    getCountTime:function(){
      return this.$store.state.turntable.turnCountTime;
    },
    getWinnerData:function(){
      console.log('获奖者的信息',this.$store.state.turntable.winnerData)
      return this.$store.state.turntable.winnerData;
    },
    getisShowJoinBtn:function(){
      return this.$store.state.turntable.isShowJoinBtn;
    },
    getisShowAnimation:function(){
      return this.$store.state.turntable.isShowAnimation;
    },
    getisShowAnimateBg:function(){
      return this.$store.state.turntable.isShowAnimateBg;
    },
    getisShowPull:function(){
      return this.$store.state.turntable.isShowPull;
    },
    getisShowThird:function(){
      return this.$store.state.turntable.isShowThird;
    },
    getisShowRecordRender:function(){
      return this.$store.state.turntable.isShowRecordRender;
    },
    getisShowCurrentTime:function(){
      return this.$store.state.turntable.isShowCurrentTime;
    },
    getisShowWinnerPlayer:function(){
      return this.$store.state.turntable.isShowWinnerPlayer;
    },
    getisAnimationLeft:function(){
      return this.$store.state.turntable.isAnimationLeft;
    },
    getHaveNumber:function(){
      let rewardLen=this.$store.state.turntable.rewardPoolLen;
      // let myPushLen=this.$store.state.turntable.pushToolData?this.$store.state.turntable.pushToolData.length:0;
      let maxLen=10;
      let sumLen =rewardLen
      maxLen =sumLen<10?10:100-parseInt(rewardLen)>=10?10:100-parseInt(rewardLen)
      console.log('我是多少个',sumLen,maxLen)
      return maxLen
    },
    getRecordTabsType:function(){
      return this.$store.state.turntable.recordTabsType;
    },

  }
}
</script>

<style lang="scss" scoped src="@/assets/css/turntable.css"></style>
