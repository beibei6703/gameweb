<template>
  <div id="detail" v-if="getmainData">
    <div id="detail-main_infor">
      <div class="detail-main detail-pubg" v-if="getmainData.club_type==2">
        <div class="detail-main-up"><span :class="'icon_gamelogo'+getmainData.game_id"></span>{{getmainData.match.name}}</div>
        <div class="detail-main-cn">
          <!-- <div class="detail-main-pubg-cn" v-if="getTeamLen>5" :style="{'margin-top':'-55px','width':Math.ceil(getTeamLen/5)*232+'px','margin-left':'-'+(Math.ceil(getTeamLen/5)*232+40)/2+'px'}"> -->
          <div class="detail-main-pubg-cn">
            <!-- <ul class="detail-main-phbg-list detail-main-phbg-list-ul fl" v-for="(items,index) in Math.ceil(getTeamLen/5)" v-if="getTeamLen/5>1" :key="index"> -->
            <ul class="detail-main-phbg-list detail-main-phbg-list-ul">
              <!-- <li v-for="(demos,indexe) in getmainData.club_data" v-if="indexe>parseInt(index)*5 &&indexe<=(parseInt(index)+1)*5" :key="indexe"> -->
              <li v-for="(demos,indexe) in getmainData.club_data" :key="indexe">
              <div>

                <!-- <i v-for="(value,demos) in getmainData.hot" :key="demos"><i class="detail-mian-pubg-hot" v-if="value==indexe"></i></i> -->
                <span>
                <span class="fl">{{indexe}}.</span>
                <div class="ImgOut fl"><span><img :src="demos.logo"/></span></div>
                <span class="text-over fl">{{demos.name}}</span>
                <!-- <span class="cl-red">（{{nFormatter(demos.odds)}}）</span> -->
              </span>
              <!-- <em class="compete-team-list-main-hg" v-if="getmainData.winner==indexe"></em> -->
              </div>
              </li>
            </ul>
          </div>
          <!-- <div class="detail-main-pubg-cn" v-if="Object.keys(getmainData.club_data).length<=5" :style="{'margin-top':'-22px','width':(Math.ceil(getTeamLen)*232+40)+'px','margin-left':'-'+(Math.ceil(getTeamLen)*232+40)/2+'px'}">
            <ul class="detail-main-phbg-list detail-main-phbg-list-xy5">
              <li v-for="(demos,indexe) in getmainData.club_data" :key="indexe">
                <div>
                  <span>
                  <span>{{indexe}}.</span>
                  <span class="text-over">{{demos.name}}</span>
                  <span class="cl-red">（{{nFormatter(demos.odds)}}）</span>
                </span>
                </div>
              </li>
            </ul>
          </div> -->
          <div class="detail-main-time">{{getmainData.started_at}}</div>
        </div>
        <div class="clear"></div>
      </div>
      <div class="detail-main" v-if="getmainData.club_type==1">
        <div class="detail-main-up"><span :class="'icon_gamelogo'+getmainData.game_id"></span>{{getmainData.match.name}}</div>
        <div class="detail-main-cn">
          <div class="detail-main-cn-l fl">
            <div class="detail-main-cn-team padding-left fr">
              <div class="ImgOut"><span><img :src="getmainData.club_data[1].logo"/></span></div>
            </div>
            <div class="detail-main-cn-odds fr">
              <h1>{{getmainData.club_data[1].name}}</h1>
            </div>
            <div class="clear"></div>
          </div>
          <div class="detail-main-vs fl">
           <p v-if="getmainData.game_id!=4" style="color:#0084ff;">{{getmainData.round}}</p>
          <h1></h1>
          <p v-if="getmainData.game_id!=4">{{getmainData.score_1}} - {{getmainData.score_2}}</p>
          </div>
          <div class="detail-main-cn-l fr">
            <div class="detail-main-cn-team padding-right fl">
              <div class="ImgOut"><span><img :src="getmainData.club_data[2].logo"/></span></div>
            </div>
            <div class="detail-main-cn-odds fl">
              <h1 class="text-left">{{getmainData.club_data[2].name}}</h1>
            </div>
            <div class="clear"></div>
          </div>
          <div class="detail-main-time">{{getmainData.started_at}}</div>
        </div>
        <div class="clear"></div>
      </div>
    </div>
    <div class="detail-down">
      <div class="detail-dn-l fl">
        <div class="guess-nav" v-if="getmainData">
          <ul>
            <li v-for="(datas,index) in getmainData.upper_data" :key="index" @click="handleclick(index,getBattleIdData.battle_id)" :data-id="index" :class="{active:index==getBattleIdData.upper_id}">
              <span :style="index==0?'font-size:16px; color:#fff;':''">{{datas.name}}-</span>
              <span :class="datas.status=='open'?'cl-green':datas.status=='start'?'cl-red':'cl-graw'">{{datas.status=='open'?'未开始':datas.status=='start'?'进行中':'已结束'}}</span>
            </li>
          </ul>
          <div class="clear"></div>
        </div>
        <!--直播地址s-->
        <div class="guessmain-video" v-if="getmainData.upper_data[getBattleIdData.upper_id].status=='start'&&getmainData.upper_data[getBattleIdData.upper_id].live_url">
          <div v-if="getmainData.upper_data[getBattleIdData.upper_id].live_url.indexOf('http')!=0" v-html="getmainData.upper_data[getBattleIdData.upper_id].live_url">{{getmainData.upper_data[getBattleIdData.upper_id].live_url}}</div>
          <div class="guessmain-video-text" v-if="getmainData.upper_data[getBattleIdData.upper_id].live_url.indexOf('http')==0">
            <a :href="getmainData.upper_data[getBattleIdData.upper_id].live_url" target="_blank"><em></em>  &lt;&lt;点击观看直播 &gt;&gt; </a>
            </div>
        </div>
        <!-- 直播地址e -->
         <!-- 多个战队的时候s -->
        <div class="guessmain guessmain-pubg-xh" v-if="getmainData" v-for="(items,index) in getgGuessTeamData" :key="index" :class="{active:getsetGuessValue==items.id}" :data-minevalue="getMineBetValue">
          <!--战队的赔率信息s-->
          <div class="guessmain-top" @click="fnChooseGuess($event,items.id,index,items.battle_id,items.odds_type)">
            <div class="guessmain-expend guessmain-pubg-expend" :data-index="index">
              <div class="guessmain-ex-text-fixed" v-if="items.odds_type==2" title="玩家预测时的赔率为最后收益所得赔率，例如固赔1.5，预测100C则最后获得收益150C+本金100C，合计250C。">固盘<i></i></div>
              <div class="guessmain-ex-text"><span style="font-size:14px;color:#fff;">{{toTwo(index+1)+'. '+items.guess_type_name+' | '}}</span><span style="color:#dcdcdc;font-size:12px;">{{getisUpdateOdds&&itemsTeam.guess_id==items.id&&getisShowDesc&&getisShowDesc.typeGuess?getisShowDesc.desc:items.desc}}</span><p v-if="items.status!='canccel'&&items.guess_desc_extra" class="cl-yellow">[{{getisUpdateOdds&&itemsTeam.guess_id==items.id&&getisShowDesc&&getisShowDesc.typeGuess?getisShowDesc.guess_desc_extra:items.guess_desc_extra}}]</p></div>
              <!-- <div class="guessmain-ex-time" :class="items.status=='wait'?'cl-green':items.status=='start'?'cl-red':'cl-graw'">{{items.status_name}}<p v-if="items.status=='cancel'"><span>{{items.cancel_reason}}</span></p></div> -->
              <div class="guessmain-ex-time" :class="items.status == 'cancel'||items.status == 'clear'?'cl-graw':items.status=='wait'?items.status_name.indexOf('时')==-1&&items.status_name.indexOf('分')==-1?'cl-green':'cl-blue':'cl-red'">
              {{items.status != 'start'?items.status_name:'已封盘'}}<p v-if="items.status=='cancel'"><span>{{items.cancel_reason}}</span></p>
            </div>
            </div>
          </div>
          <div class="guessmain-ex-team rela" :data-index="index" v-if="items.option_type==1">
            <div class="guessmain-sample fl" @click="choiceTeam($event,1,index,0,1,items.team[1].odds,items.team[2].odds,items.team[1].name,items.id,(items.status=='wait'?1:2),items.odds_type,items.battle_id)" :class="{guessbtngraw:items.status!='wait'}">
              <div class="guessmain-team-text text-right fl">
                <h1>
                <i v-if="(items.winner==1&&items.odds_type==1)||(items.winner==1&&items.odds_type==2&&items.game_id!=6)||(items.winner==1&&items.odds_type==2&&items.guess_type!=2&&items.guess_type!=5&&items.game_id!=6)" style="margin-right:5px;"></i>
                赔率<span>{{getisUpdateOdds&&itemsTeam.guess_id==items.id?nFormatter(getisShowNewsOdds[1]):nFormatter(items.team[1].odds)}}</span></h1>
                <h2 class="text-over">
                <span v-if="items.guess_type==2">(主)</span>
                {{items.team[1].name}}
                <em style="color:#fff;" v-if="items.guess_type==2">
                {{!getisUpdateOdds?(items.handicap_team==1?'(让'+items.handicap+')':null):(itemsTeam.guess_id==items.id&&getisShowDesc.team_x==1?'(让'+getisShowDesc.score_x+')':null)}}
                </em>

                </h2>
                <!-- <h3 class="fr" v-if="items.winner==1"></h3> -->
              </div>
              <div class="guessmain-team-sup bg-red fl" v-if="items.status=='wait'" :class="{active:items.odds_type==2&&items.team[1].odds==0.00&&items.team[2].odds==0.00}" style="right:auto;left:110px;">{{items.odds_type==2&&items.team[1].odds==0.00&&items.team[2].odds==0.00?'敬请期待':'预测'}}</div>
              <div class="clear"></div>
            </div>

            <div class="guessmain-sample fr" @click="choiceTeam($event,1,index,1,2,items.team[2].odds,items.team[1].odds,items.team[2].name,items.id,(items.status=='wait'?1:2),items.odds_type,items.battle_id)" :class="{guessbtngraw:items.status!='wait'}" data-flag="1">

              <div class="guessmain-team-text  text-left fr">
                <h1><span>{{getisUpdateOdds&&itemsTeam.guess_id==items.id?nFormatter(getisShowNewsOdds[2]):nFormatter(items.team[2].odds)}}</span>赔率<i v-if="(items.winner==2&&items.odds_type==1)||(items.winner==2&&items.odds_type==2&&items.game_id!=6)||(items.winner==2&&items.odds_type==2&&items.guess_type!=2&&items.guess_type!=5&&items.game_id!=6)" style="margin-left:5px;"></i></h1>
                <h2 class="text-over">
                {{items.team[2].name}}
                <em style="color:#fff;" v-if="items.guess_type==2">
                {{!getisUpdateOdds?items.handicap_team==2?'(让'+items.handicap+')':null:itemsTeam.guess_id==items.id&&getisShowDesc.team_x==2?'(让'+getisShowDesc.score_x+')':null}}
                </em>
                <span v-if="items.guess_type==2">(客)</span>
                </h2>

              </div>
              <div class="guessmain-team-sup bg-blue fr" v-if="items.status=='wait'" :class="{active:items.odds_type==2&&items.team[2].odds==0.00&&items.team[1].odds==0.00}">{{items.odds_type==2&&items.team[1].odds==0.00&&items.team[2].odds==0.00?'敬请期待':'预测'}}</div>

              <div class="clear"></div>
            </div>
            <div class="guessmain-team-add-vs">
              <!-- <span v-if="items.guess_type==2" style="text-indent:5px;">{{getisUpdateOdds&&itemsTeam.guess_id==items.id?getisShowDesc.team_x==1?getisShowDesc.score_x:'-'+getisShowDesc.score_x:items.handicap_team==1?items.handicap:'-'+items.handicap}}</span> -->
              <span v-if="items.guess_type==5">{{getisUpdateOdds&&itemsTeam.guess_id==items.id?getisShowDesc.score:items.score}}</span>
            </div>
          </div>

          <div class="guessmain-pubg-guess-list" v-if="items.option_type==2">
            <!-- 我出来了码 -->
            <div class="guessmain-pubg-guess-same rela fl" v-for="(demos,indexin) in items.team" :key="indexin" :class="{guessbtngraw:items.status!='wait'}" @click="choiceTeampubg($event,2,index,(parseInt(indexin)-1),indexin,demos.odds,demos.name,items.id,(items.status!='wait'?2:1),items.odds_type,items.battle_id)"  data-flag="1">
              <div class="guessmain-pubg-guess-same-l">
                <i class="guessmain-pubg-guess-same-hg" v-if="items.winner==indexin"></i>
                <div class="guessmain-pubg-guess-ImgOut ImgOut fl">
                  <span><img :src="demos.logo"/></span>
                </div>
                <div class="guessmain-pubg-guess-text fl">
                  <h2 :data-index="indexin">赔率<span>{{getisUpdateOdds&&itemsTeam.guess_id==items.id?nFormatter(getisShowNewsOdds[indexin]):nFormatter(demos.odds)}}</span><em :class="{active:demos.odds==0.00&&items.odds_type==2}">{{demos.odds==0.00&&items.odds_type==2?'敬请期待':'预测'}}</em></h2>
                  <h1 class="text-over">{{demos.name}}</h1>
                </div>
                <i class="clear"></i>
              </div>
            </div>
            <i class="clear"></i>

            <!--战队的预测信息 多队s-->
            <div class="guessguess guessguess-typeoption2" ref="guessguessmybet" v-if="gettamename&&itemMessage.choiceBoxIndex==index&&itemMessage.choiceOptionType==2&&items.status=='wait'">
              <div class="guessInfo-twoteam border bd-red" :class="{active:itemMessage.choiceOptionType==2}">
                <div class="guessInfo-twoteam-sangle sangle-left" :class="'left'+itemMessage.isshowSangleLeft"></div>
                <div class="guessInfo-tab" v-if="itemsGuess">
                  <span v-for="(items,index) in itemsGuess.menu" @click="tabGuess(index)" :class="{active:index==itemsGuess.num}" :key="items.id">{{items.name}}</span>
                  <div class="clear"></div>
                </div>
                <div class="guessInfo-Cb" v-show="itemsGuess.showCbi">
                  <div class="guessInfo-Cb-cn">
                    <div class="guessInfo-Cb-left">
                      <div class="guessInfo-Cb-list">
                        <div class="fl guess-padding-right fl">
                          预测金额：<input type="text" class="guessInfo-Cb-nubmer choiceMoney" placeholder="最小额度为100c" data-index="3" ref="choiceMoneys" v-model="itemsInput.type1"  @click="choiceCbi($event,3,itemsInput.type1,items.odds_type,(items.guess_limit-itemsTeam.mineBetValue))"/><em class="cl-yellow">C</em><i class="guess-clear" @click="clearNumber">清零</i>
                        </div>
                        <span data-index="0" class="choiceMoney" @click="choiceCbi($event,0,100,items.odds_type,(items.guess_limit-itemsTeam.mineBetValue))" data-value="100"><i>+</i>100<em>C</em></span>
                        <span data-index="1" class="choiceMoney" @click="choiceCbi($event,1,10000,items.odds_type,(items.guess_limit-itemsTeam.mineBetValue))" data-value="1000"><i>+</i>10,000 <em>C</em></span>
                        <span data-index="2" class="choiceMoney" @click="choiceCbi($event,2,500000,items.odds_type,(items.guess_limit-itemsTeam.mineBetValue))" data-value="10000"><i>+</i>500,000 <em>C</em></span>
                        <span data-index="4" class="choiceMoney" @click="choiceCbi($event,4,isLoginUserCai,items.odds_type,(items.guess_limit-itemsTeam.mineBetValue))" style="width:50px;">最大 </span>

                        <div class="clear"></div>
                      </div>
                      <div class="clear"></div>
                    </div>
                    <div class="guessInfo-Cb-right rela" v-if="itemsTeam&&itemsTeamCai">
                      <p><span>预计收益：</span><em class="cl-yellow"><i>{{thousandBitSeparator(parseInt(myMoneySum)+parseInt((myMoneySum*itemsTeam.odds)))}}</i> C</em></p>
                      <p><span>可用余额：</span><em class="cl-yellow"><i ref="uersInfo">{{thousandBitSeparator(parseInt(isLoginUserCai))}}</i> C</em></p>
                      <p><span>盘口上限：</span><em class="cl-yellow"><i>{{thousandBitSeparator(parseInt(items.guess_limit-itemsTeam.mineBetValue))}}</i> C</em></p>
                      <div class="guess_bet_info_paymoney fl" @click="openRecharge">点击充值>></div>
                      <div class="clear"></div>
                      <div class="guess_bet_info_btn"  @click="hurryUpBetCai($event,items.odds_type,(getisUpdateOdds&&itemsTeam.guess_id==items.id?getisShowDesc.team_x:items.handicap_team),(getisUpdateOdds&&itemsTeam.guess_id==items.id?getisShowDesc.score_x:items.handicap),(getisUpdateOdds&&itemsTeam.guess_id==items.id?getisShowDesc.score:items.score),items.guess_type,items.desc,items.guess_desc_extra,items.guess_limit)">确认预测</div>
                      <div class="guess_bet_odd_update" @click="acceptNewOdds" :class="{active:acceptNewodds}" v-if="items.odds_type==2">接受最新盘口信息</div>
                    </div>
                    <div class="clear"></div>
                  </div>
                  <!--C币预测e-->
                </div>
                <div class="guessInfo-tool" v-if="itemsGuess.showTools">
                  <div class="guess_bet_info">
                    <div class="guess_bet_info_betList">
                      <div class="guess_bet_info_betList_in" ref="pushdiv" v-if="push_tools">
                        <div v-for="(items,index) in push_tools" v-if="items.product_count!=0" :class="'ImgOut fl bd-c'+items.quality" @click="deleData($event,items.product_count,items.product_id,items.product_cprice,items.product_small_pic,items.product_name,items.quality,index)" :key="index">
                          <span><img :src="items.product_small_pic"/></span><p>×{{items.product_count}}</p>
                        </div>
                        <div class="guess-bet-add-cards" @click="openMybag">+</div>
                        <div class="clear"></div>
                      </div>
                    </div>

                  </div>
                  <div class="guess_bet_mybag" v-if="myBag_tools">
                    <div class="guess_bet_mybag_title" @click="openMybag" v-if="!itemMessage.isShowMybag">我的背包<i :class="{active:itemMessage.isShowMybag}"></i></div>
                    <div class="guess_bet_mybag_title" @click="closeMybag" v-if="itemMessage.isShowMybag">我的背包<i class="active"></i></div>
                    <div class="guess_bet_mybag_list"  v-show="itemMessage.isShowMybag">
                      <ul>
                        <li v-for="(items,index) in myBag_tools" v-if="items.product_count!=0" @click="handlePop($event,items.product_count,items.product_id,items.product_cprice,items.product_small_pic,items.product_name,items.quality,index)" :key="index">
                          <div :class="'ImgOut bd-c'+items.quality"><span><img :src="items.product_small_pic"/></span><p>×{{items.product_count}}</p></div>
                        </li>
                      </ul>
                      <div class="clear"></div>
                    </div>
                  </div>
                  <div class="guess_bet_info_info rela">
                      <div class="guess_bet_info_btn fl" @click="hurryUpBetCards($event,items.odds_type,(getisUpdateOdds&&itemsTeam.guess_id==items.id?getisShowDesc.team_x:items.handicap_team),(getisUpdateOdds&&itemsTeam.guess_id==items.id?getisShowDesc.score_x:items.handicap),(getisUpdateOdds&&itemsTeam.guess_id==items.id?getisShowDesc.score:items.score),items.guess_type,items.desc,items.guess_desc_extra,items.guess_limit)" style="margin-right:40px;">确认预测</div>
                      <!-- <div class="guess_bet_info_name fl">预测 <span>{{gettamename}}</span></div> -->
                      <div class="guess_bet_info_price fl">预计估值：<span class="cl-yellow">{{thousandBitSeparator(parseInt(sumNum))}} C</span></div>
                      <div class="guess_bet_info_yuji fl">预计收益：<span class="cl-yellow">{{thousandBitSeparator(parseInt(sumNum)+parseInt(sumNum*itemsTeam.odds))}} C</span></div>
                      <div class="guess_bet_info_yuji fl">盘口上限：<span class="cl-yellow"><i>{{thousandBitSeparator(parseInt(items.guess_limit-itemsTeam.mineBetValue))}}</i> C</span></div>
                      <div class="guess_bet_odd_update card_bet fl" @click="acceptNewOdds" :class="{active:acceptNewodds}" v-if="items.odds_type==2">接受最新盘口信息</div>
                      <div class="clear"></div>
                    </div>
                </div>
              </div>
              <div class="guess_bet_info_font">注意:请先阅读丰收网预测规则，预测后视为您同意遵守本规则。 <span class="cl-yellow" @click="lookRule">点击查看</span></div>
            </div>
            <i class="clear"></i>
          </div>
          <!--战队的预测信息 多队e-->

          <!--战队的预测信息 两队e-->
          <div class="guessguess" v-if="gettamename&&itemMessage.choiceBoxIndex==index&&itemMessage.choiceOptionType==1&&items.status=='wait'">
            <div class="guessInfo-twoteam border" :class="itemMessage.choiceOption==1?'bd-red':'bd-blue'">
              <div class="guessInfo-twoteam-sangle" :class="itemMessage.choiceOption==1?'sangle-left':'sangle-right'"></div>
              <div class="guessInfo-tab" v-if="itemsGuess">
                <span v-for="(items,index) in itemsGuess.menu" @click="tabGuess(index)" :class="{active:index==itemsGuess.num}" :key="items.id">{{items.name}}</span>
                <div class="clear"></div>
              </div>
              <div class="guessInfo-Cb" v-show="itemsGuess.showCbi">
                <div class="guessInfo-Cb-cn">
                  <div class="guessInfo-Cb-left">
                    <div class="guessInfo-Cb-list">
                      <div class="fl guess-padding-right fl">
                        预测金额：<input type="text" class="guessInfo-Cb-nubmer choiceMoney" placeholder="最小额度为100c" ref="choiceMoneys" v-model="itemsInput.type1"  @click="choiceCbi($event,3,itemsInput.type1,items.odds_type,(items.guess_limit-itemsTeam.mineBetValue))"/><em class="cl-yellow">C</em><i class="guess-clear" @click="clearNumber">清零</i>
                      </div>
                      <span data-index="0" class="choiceMoney" @click="choiceCbi($event,0,100,items.odds_type,(items.guess_limit-itemsTeam.mineBetValue))" data-value="100"><i>+</i>100<em>C</em></span>
                      <span data-index="1" class="choiceMoney" @click="choiceCbi($event,1,10000,items.odds_type,(items.guess_limit-itemsTeam.mineBetValue))" data-value="1000"><i>+</i>10,000 <em>C</em></span>
                      <span data-index="2" class="choiceMoney" @click="choiceCbi($event,2,500000,items.odds_type,(items.guess_limit-itemsTeam.mineBetValue))" data-value="10000"><i>+</i>500,000 <em>C</em></span>
                      <span data-index="4" class="choiceMoney" @click="choiceCbi($event,4,isLoginUserCai,items.odds_type,(items.guess_limit-itemsTeam.mineBetValue))" style="width:50px;">最大 </span>
                      <div class="clear"></div>
                    </div>
                    <div class="clear"></div>
                  </div>

                  <div class="guessInfo-Cb-right rela" v-if="itemsTeam&&itemsTeamCai">
                    <p><span>预计收益：</span><em class="cl-yellow"><i>{{thousandBitSeparator(parseInt(myMoneySum)+parseInt(myMoneySum*itemsTeam.odds))}}</i> C</em></p>
                    <p><span>可用余额：</span><em class="cl-yellow"><i ref="uersInfo">{{thousandBitSeparator(parseInt(isLoginUserCai))}}</i> C</em></p>
                    <p><span>盘口上限：</span><em class="cl-yellow"><i>{{thousandBitSeparator(parseInt(items.guess_limit-itemsTeam.mineBetValue))}}</i> C</em></p>
                    <div class="guess_bet_info_paymoney fl" @click="openRecharge">点击充值>></div>
                    <div class="clear"></div>
                    <div class="guess_bet_info_btn"  @click="hurryUpBetCai($event,items.odds_type,(getisUpdateOdds&&itemsTeam.guess_id==items.id?getisShowDesc.team_x:items.handicap_team),(getisUpdateOdds&&itemsTeam.guess_id==items.id?getisShowDesc.score_x:items.handicap),(getisUpdateOdds&&itemsTeam.guess_id==items.id?getisShowDesc.score:items.score),items.guess_type,items.desc,items.guess_desc_extra,items.guess_limit)">确认预测</div>
                    <div class="guess_bet_odd_update" @click="acceptNewOdds" :class="{active:acceptNewodds}" v-if="items.odds_type==2">接受最新盘口信息</div>
                  </div>

                  <div class="clear"></div>
                </div>
                <!--C币预测e-->
              </div>
              <div class="guessInfo-tool" v-if="itemsGuess.showTools">
                <div class="guess_bet_info">
                  <div class="guess_bet_info_betList">
                    <div class="guess_bet_info_betList_in" ref="pushdiv" v-if="push_tools">
                      <div v-for="(items,index) in push_tools" v-if="items.product_count!=0" :class="'ImgOut fl bd-c'+items.quality" @click="deleData($event,items.product_count,items.product_id,items.product_cprice,items.product_small_pic,items.product_name,items.quality,index)" :key="index">
                        <span><img :src="items.product_small_pic"/></span><p>×{{items.product_count}}</p>
                      </div>
                      <div class="guess-bet-add-cards" @click="openMybag">+</div>
                      <div class="clear"></div>
                    </div>
                  </div>

                </div>
                <div class="guess_bet_mybag" v-if="myBag_tools">
                  <div class="guess_bet_mybag_title" @click="openMybag" v-if="!itemMessage.isShowMybag">我的背包<i :class="{active:itemMessage.isShowMybag}"></i></div>
                  <div class="guess_bet_mybag_title" @click="closeMybag" v-if="itemMessage.isShowMybag">我的背包<i class="active"></i></div>
                  <div class="guess_bet_mybag_list"  v-show="itemMessage.isShowMybag">
                    <ul>
                      <li v-for="(items,index) in myBag_tools" v-if="items.product_count!=0" @click="handlePop($event,items.product_count,items.product_id,items.product_cprice,items.product_small_pic,items.product_name,items.quality,index)" :key="index">
                        <div :class="'ImgOut bd-c'+items.quality"><span><img :src="items.product_small_pic"/></span><p>×{{items.product_count}}</p></div>
                      </li>
                    </ul>
                    <div class="clear"></div>
                  </div>
                </div>
                <div class="guess_bet_info_info rela">
                    <div class="guess_bet_info_btn fl" @click="hurryUpBetCards($event,items.odds_type,(getisUpdateOdds&&itemsTeam.guess_id==items.id?getisShowDesc.team_x:items.handicap_team),(getisUpdateOdds&&itemsTeam.guess_id==items.id?getisShowDesc.score_x:items.handicap),(getisUpdateOdds&&itemsTeam.guess_id==items.id?getisShowDesc.score:items.score),items.guess_type,items.desc,items.guess_desc_extra,items.guess_limit)" style="margin-right:40px;">确认预测</div>

                    <!-- <div class="guess_bet_info_name fl">预测 <span>{{gettamename}}</span></div> -->
                    <div class="guess_bet_info_price fl">预计估值：<span class="cl-yellow">{{thousandBitSeparator(parseInt(sumNum))}} C</span></div>
                    <div class="guess_bet_info_yuji fl">预计收益：<span class="cl-yellow">{{thousandBitSeparator(parseInt(sumNum)+parseInt(sumNum*itemsTeam.odds))}} C</span></div>
                    <div class="guess_bet_info_yuji fl">盘口上限：<span class="cl-yellow"><i>{{thousandBitSeparator(parseInt(items.guess_limit-itemsTeam.mineBetValue))}}</i> C</span></div>
                    <div class="guess_bet_odd_update card_bet fl" @click="acceptNewOdds" :class="{active:acceptNewodds}" v-if="items.odds_type==2">接受最新盘口信息</div>
                    <div class="clear"></div>
                  </div>
              </div>
            </div>
            <div class="guess_bet_info_font">注意:请先阅读丰收网预测规则，预测后视为您同意遵守本规则。 <span class="cl-yellow" @click="lookRule">点击查看</span></div>
          </div>
           <!--战队的预测信息 两队e-->

        <!--当前预测当前用户预测情况e-->
        <!--当前预测用户预测情况s-->
        <div v-if="itemMessage.showUser&&getsetGuessValue==items.id">
          <div class="guessInfo-tab" v-if="itemsMyBet">
            <span v-for="(item,indexer) in itemsMyBet.menu" @click="tabMyBet(indexer)" :class="{active:indexer==itemsMyBet.num}" :key="indexer">{{item.name}}</span>
            <div class="clear"></div>
          </div>
          <div v-if="itemsMyBet.showCbi" class="guessInfo-data-containter">
            <div class="guessNo-data" v-if="!caimy_list||caimy_list.length==0">您尚未进行预测！</div>
            <div class="" v-if="caimy_list&&caimy_list.length>0">
              <div class="guessInfo-data-top-title" :class="{active:items.guess_type==2||items.guess_type==5}">
                <div class="guessInfo-data-top-title1 fl">时间</div>
                <div class="guessInfo-data-top-title2 fl">预测战队</div>
                <div class="guessInfo-data-top-title6 fl" v-if="items.guess_type==2||items.guess_type==5">{{items.guess_type==2?'让分':'大小分'}}</div>
                <div class="guessInfo-data-top-title5 fl">赔率</div>
                <div class="guessInfo-data-top-title3 fl">预测C币</div>
                <div class="guessInfo-data-top-title4 fr">预测结果</div>
                </div>
              <div class="guessInfo-data-tool" v-for="(item,indexer) in caimy_list" :key="indexer">
                <div class="guessInfo-data-tool-title" :class="{active:items.guess_type==2||items.guess_type==5}">
                  <div class="guessInfo-data-top-title1 fl">{{item.date}}</div>
                  <div class="guessInfo-data-top-title2 text-center fl">{{item.team_name}}</div>
                  <div class="guessInfo-data-top-title6 text-center fl" v-if="items.guess_type==2||items.guess_type==5"><em class="cl-yellow">{{items.guess_type==2?item.option==item.team_x?'让'+item.score_x:'受让'+item.score_x:item.score}}</em></div>
                  <div class="guessInfo-data-top-title5 text-center fl"><em class="cl-yellow">{{item.odds}}</em></div>
                  <div class="guessInfo-data-top-title3 fl"><em class="cl-yellow">{{thousandBitSeparator(parseInt(item.chip))}} C</em></div>
                  <div class="guessInfo-data-top-title4 fr"><span>{{item.income_message}} </span><em class="cl-yellow">{{thousandBitSeparator(parseInt(item.income))}} C</em></div>
                  <!-- <div class="guessInfo-data-tool-btn fr" :data-option="item.option" data-type="0" v-if="item.can_switch==true&&items.option_type==2 && items.game_id!=5" @click="openchangeTeams($event,0,item.option,items.id,Object.keys(items.team).length,getgGuessTeamData[index])">换队</div> -->
                  <!-- <div class="guessInfo-data-tool-btn fr" :data-option="item.option" data-type="0" v-if="item.can_switch==true&&items.option_type==1 && items.game_id!=5" @click="changeTeams($event)">换队</div> -->
                  <div class="clear"></div>
                </div>
              </div>
            </div>
          </div>
          <div v-if="itemsMyBet.showTools" class="guessInfo-data-containter">
            <div class="guessNo-data" v-if="!skinsmy_list||skinsmy_list.length==0">您尚未进行预测！</div>
            <div v-if="skinsmy_list&&skinsmy_list.length>0">
              <div class="guessInfo-data-top-title" :class="{active:items.guess_type==2||items.guess_type==5}">
                <div class="guessInfo-data-top-title1 fl">时间</div>
                <div class="guessInfo-data-top-title2 fl">预测战队</div>
                <div class="guessInfo-data-top-title6 fl" v-if="items.guess_type==2||items.guess_type==5">{{items.guess_type==2?'让分':'大小分'}}</div>
                <div class="guessInfo-data-top-title5 fl">赔率</div>
                <div class="guessInfo-data-top-title3 fl">预测道具</div>
                <div class="guessInfo-data-top-title4 fr">预测结果</div>
                </div>
              <div class="guessInfo-data-tool" v-for="(item,indexer) in skinsmy_list" :key="indexer">
                <div class="guessInfo-data-tool-title" :class="{active:items.guess_type==2||items.guess_type==5}">
                  <div class="guessInfo-data-top-title1 fl">{{item.date}}</div>
                  <div class="guessInfo-data-top-title2 text-over fl"> {{item.team_name}}</div>
                  <div class="guessInfo-data-top-title6 text-center fl" v-if="items.guess_type==2||items.guess_type==5"><em class="cl-yellow">{{items.guess_type==2?item.option==item.team_x?'让'+item.score_x:'受让'+item.score_x:item.score}}</em></div>
                  <div class="guessInfo-data-top-title5 text-center fl"><em class="cl-yellow">{{item.odds}}</em></div>
                  <div class="guessInfo-data-top-title3 fl">
                    <div class="guessInfo_tool_img" :style="'width:'+57*item.cards.length+'px;margin:0 auto'">
                      <div v-for="(datas,indexers) in item.cards" :class="'ImgOut bd-c'+datas.quality+' fl'" :key="indexers"><img :class="'bd-c'+datas.quality" :src="datas.pic" width="40" height="40"/><p>×{{datas.count}}</p></div>
                      <div class="clear"></div>
                    </div>
                  </div>
                  <div class="guessInfo-data-top-title4 fr"><span>{{item.income_message}} </span><em class="cl-yellow">{{thousandBitSeparator(parseInt(item.income))}} C</em></div>
                  <!-- <div class="guessInfo-data-tool-btn fr" :data-option="item.option" data-type="1" v-if="item.can_switch==true&&items.option_type==2 && items.game_id!=5" @click="openchangeTeams($event,1,item.option,items.id,Object.keys(items.team).length,getgGuessTeamData[index])">换队</div> -->
                  <!-- <div class="guessInfo-data-tool-btn fr" :data-option="item.option" data-type="1" v-if="item.can_switch==true&&items.option_type==1 && items.game_id!=5" @click="changeTeams($event)">换队</div> -->
                  <div class="clear"></div>
                </div>

              </div>
            </div>
          </div>

        </div>
        <!--当前预测用户预测情况e-->
        </div>
      <!-- </div> -->
      </div>
      <div class="detail-dn-r fr">
        <!--世界喊话s-->
           <!-- <Chat v-if="this.$store.state.match.isShowStatu"></Chat> -->
        <!--世界喊话e-->
        <!--财富榜s-->
        <div class="detail-dn-rich">
          <MineGuess></MineGuess>
          <!-- <WinLose></WinLose> -->
          <Richrank></Richrank>
        </div>
        <!--财富榜e-->
      </div>
      <div class="clear"></div>
    </div>
    <CompetePop></CompetePop>
    <CompetePopTeam></CompetePopTeam>
    <!-- <RechargePop></RechargePop> -->
  </div>
</template>
<script>
let BattleId, datas, dataOptions, guessId, Mybetsum;
import Http from "./../common/http";
import { mapMutations, mapState } from "vuex";

import router from "@/router";
import Richrank from "./hotcompete/Richrank";
import Chat from "./hotcompete/Chat";
import CompetePop from "./dialog/CompetePop";
import CompetePopTeam from "./dialog/CompetePopTeam";
import WinLose from "./hotcompete/WinLose";
import MineGuess from "./hotcompete/MineGuess";
import {
  setStore,
  getStore,
  removeStore,
  getCookie,
  setCookie,
  removeCookie
} from "@/utils/storage.js";
// import RechargePop from "./dialog/RechargePop";
export default {
  data() {
    return {
      itemMessage: {
        dataId: this.$route.params.echoid,
        battle: this.$store.state.match.battleId.battle_id,
        num: 0,
        isShowGuess: false,
        MyCaisum: this.$store.state.match.Caisum,
        MyCardssum: this.$store.state.match.Cardssum,
        showUser: true,
        userBetMarginTop: this.$store.state.match.pubgmarginTop,
        myBetTop: 197,
        teamListMarginTop: this.$store.state.match.teamListMarginTop,
        choiceTeamIndex: this.$store.state.match.choiceTeamIndex,
        // teamLeng:this.$store.state.match.guessMessageTeamLen,
        pullToolsH: this.$store.state.match.pullToolsH,
        myToolsHeight: 0,
        pullToolsHeight: 0,
        choiceOption: 1,
        choiceBoxIndex: null,
        choiceOptionType: 1,
        isShowMybag: true,
        isshowSangleLeft: 1,
        isShowPosition: null,
        // choiceBoxNodeIndex:null,
        choiceChildNode: null,
        guessId: null
      },
      itemsLogin: {
        userInfo: this.$store.state.user.login
      },
      // itemsTeamLength:this.$store.state.match.guessMessageTeamLen,
      itemsGuess: {
        num: 0,
        menu: [
          { name: "C币预测", show: true },
          { name: "道具预测", show: false }
        ],
        showTools: false,
        showCbi: true,
        userInfoCb: "0"
      },
      itemsMyBet: {
        num: 0,
        menu: [
          { name: "我的C币预测", show: true },
          { name: "我的道具预测", show: false }
        ],
        showCbi: true,
        showTools: false
      },
      itemsInfo: {
        num: 0,
        showTools: true,
        showCbi: false,
        menuInfo: [
          { name: "当前道具预测", show: true },
          { name: "当前C币预测", show: false }
        ],
        teams: ["/guess/switchSideCai", "/guess/switchSideCard"]
      },
      itemsTeam: {
        option: "",
        odds: "0",
        guess_id: "",
        name: this.$store.state.match.TeamName,
        mineBetValue:0,
      },
      itemsTeamCai: {
        money: "0"
      },
      itemsTeamCards: {
        money: "0",
        cards: []
      },
      itemsInput: {
        type1: "",
        maxValue:0,
        flag: true
      },
      listData: this.$store.state.match.guessTeam_message,
      maxBetValue: ["2000000", "2000000"],
      oddsType: null,
      // maxBetValue:['2000','5000'],
      acceptNewodds:0,
    };
  },
  components: {
    Richrank,
    Chat,
    CompetePop,
    CompetePopTeam,
    WinLose,
    MineGuess
    // RechargePop
  },
  methods: {
    nFormatter(num) {
      if (num >= 1000000000) {
        return (num / 1000000000).toFixed(1).replace(/.0$/, "") + "G";
      }
      if (num >= 1000000) {
        return (num / 1000000).toFixed(1).replace(/.0$/, "") + "M";
      }
      if (num >= 1000) {
        return (num / 1000).toFixed(1).replace(/.0$/, "") + "K";
      }
      return num;
    },
    thousandBitSeparator(num) {
      return (num || 0).toString().replace(/(\d)(?=(?:\d{3})+$)/g, "$1,");
    },
    toTwo(n) {
      return n < 10 ? (n = "0" + n) : n;
    },
    getBattleId() {
      let params = {
        guess_id: this.$route.params.echoid
      };
      // console.log('我传递了什么',params)
      this.$store.commit("mutationStateGuessId", this.$route.params.echoid);
      this.$store.dispatch("getBattleId", params);
    },

    handleclick(upperId, battleId) {
      let isCanClick = this.$store.state.match.isUpdatedData;
      // console.log
      // console.log('isCanClick',isCanClick)

      if (!isCanClick) {
        let dataOption = {
          masseges: "请勿频繁操作",
          type: "2"
        };
        this.$store.commit("isSigninPupopDis", true);
        this.$store.commit("isSigninPupopDis", dataOption);
        return;
      }
      this.$store.commit("mutationIsUpdatedData", false);
      let documentBox = null;
      if (document.compatMode == "CSS1Compat") {
        documentBox = document.documentElement;
      } else {
        documentBox = document.body;
      }
      documentBox.scrollTop = "0px";
      let eBox = document.getElementsByClassName("guessmain-ex-team");
      this.$store.commit("richRank", null);
      this.$store.commit("mutationGuessTeamData", null);
      this.$store.commit("mutationIsSendDispath", true);
      for (var i = 0; i < eBox.length; i++) {
        if (eBox[i].classList.contains("active")) {
          eBox[i].classList.remove("active");
        }
      }
      for (var i = 0; i < eBox.length; i++) {
        if (eBox[i].classList.contains("active")) {
          let _box = eBox[i].getElementsByClassName("guessmain-sample");
          for (var h = 0; h < _box.length; h++) {
            if (h == Index) {
              _box[h].classList.add("active");
            } else {
              if (_box[h].classList.contains("active") == true) {
                _box[h].classList.remove("active");
              }
            }
          }
        } else {
          let _box = eBox[i].getElementsByClassName("guessmain-sample");
          for (var h = 0; h < _box.length; h++) {
            if (_box[h].classList.contains("active") == true) {
              _box[h].classList.remove("active");
            }
          }
        }
      }
      this.$store.commit("isBattleId", {
        battle_id: battleId,
        upper_id: upperId
      });
      this.$store.dispatch("guessTeam_message", {
        battle_id: battleId,
        upper_id: upperId
      });
      // this.getBattleId()
      let params = {
        isShow: false,
        optionFrom: null,
        optionTo: null,
        guessId: this.$route.params.echoid,
        dataType: "",
        Length: this.getTeamLen
      };
      this.$store.commit("isShowPubgPup", params);
      this.$store.state.match.pull_tools = [];
      this.itemsInput.type1 = "";
      this.$store.commit("getTeamName", "");
      this.$store.commit("getchoiceTeamType", "cai");
      this.itemsMyBet.num = 0;
      this.itemsMyBet.menu[0].show = true;
      this.itemsMyBet.showCbi = true;
      this.itemsMyBet.menu[1].show = false;
      this.itemsMyBet.showTools = false;
      this.$store.commit("isMyMoney", 0);
      this.$store.commit("mutationIsUpdatedData", false);
    },
    lookRule() {
      router.push(`/question?num=2&bool=1`);
      this.$store.dispatch("flag", true);
    },
    handlePop(event, sum, id, value, pic, name, quality, index) {
      let el = event.currentTarget;
      console.log("");
      let datas = {
        quality: quality,
        product_small_pic: pic,
        product_cprice: value,
        product_count: sum,
        product_name: name,
        product_id: id,
        popvalue: "1",
        type: 2
      };
      console.log("datas", sum, id, value, pic, name, quality);
      this.$store.commit("isSigninTools", true);
      this.$store.commit("isSigninTools", datas);
    },
    deleData(event, sum, id, value, pic, name, quality, index) {
      let el = event.currentTarget;
      let datas = {
        product_id: id,
        product_count: sum,
        product_small_pic: pic,
        quality: quality,
        product_name: name,
        product_cprice: value,
        typeReduce: 1
      };
      this.$store.commit("push_tools", datas);
      this.$store.commit("myBag_tools", datas);
      let _box = document.getElementsByClassName("guessmain-pubg-guess-same");
    },
    //导航的输出
    detailNav() {
      BattleId = this.itemMessage.battle;
      this.$store.commit("mutationIsIndex", 0);
      let documentBox = null;
      if (document.compatMode == "CSS1Compat") {
        documentBox = document.documentElement;
      } else {
        documentBox = document.body;
      }
      documentBox.scrollTop = "0px";
      datas = {
        battle_id: BattleId
      };
      this.$store.dispatch("getMenuList", datas);
    },
    //导航选项卡
    tabcon(event, index) {
      let _this = this;
      if (event) {
        let el = event.currentTarget;
        index = el.getAttribute("data-id");
        this.itemMessage.dataId = index;
      } else {
        index = this.itemMessage.dataId;
      }
      datas = {
        guess_id: index
      };

      this.fnRemoveOthers();
      this.$store.commit("mutationStateGuessId", datas);
      this.$store.commit("isMyMoney", 0);
    },
    //预测的选项卡
    tabGuess(index) {
      this.itemsGuess.num = index;
      let _box = this.itemMessage.choiceChildNode;
      let Index = this.getchoiceteamIndex;
      this.acceptNewodds=0;
      let stringIndex = (Index / 4).toString();
      let params = {
        index: Index,
        strings: stringIndex
      };
      this.$store.commit("getDetailIndexAndStrings", params);

      if (index == 1) {
        this.$store.dispatch("myBag_tools");
        this.$store.commit("getchoiceTeamType", "cards");
        setTimeout(() => {
          this.itemsGuess.showTools = true;
          this.itemsGuess.showCbi = false;
        }, 100);
      } else {
        if (
          !this.$store.state.match.pull_tools ||
          this.$store.state.match.pull_tools.length == 0
        ) {
          //  this.itemMessage.isShowMybag=null;
        }

        this.$store.commit("getchoiceTeamType", "cai");
        this.itemsGuess.showTools = false;
        this.itemsGuess.showCbi = true;
      }
      this.itemsInput.type1 = "";
      this.$store.commit("isMyMoney", 0);
      if (this.itemMessage.choiceOptionType == 2) {
        // this.getTeamListTop(_box,Index,stringIndex);
      }
    },
    //选择队伍其他战队向上的距离
    getTeamListTop(box, index, strings) {
      let eboxs = document.getElementsByClassName("guessmain-pubg-guess-list");
      let boxIndex = this.$store.state.match.choiceBoxNodeIndex;
      for (var i = 0; i < eboxs.length; i++) {
        if (i != boxIndex) {
          console.log("我在吗");
          let boxChild = eboxs[i].getElementsByClassName(
            "guessmain-pubg-guess-same"
          );
          for (var h = 0; h < boxChild.length; h++) {
            if (boxChild[h].attributes["style"]) {
              boxChild[h].removeAttribute("style");
            }
            if (boxChild[h].classList.contains("active")) {
              boxChild[h].classList.remove("active");
            }
          }
        }
      }
      for (var i = 0; i < box.length; i++) {
        if (box[i].attributes["style"]) {
          box[i].removeAttribute("style");
        }
      }
      for (var i = 0; i < box.length; i++) {
        if (i == index) {
          box[i].classList.add("active");
          if (strings.indexOf(".") < 0) {
            for (var h = index + 4; h < index + 8 && h < box.length; h++) {
              box[h].style.marginTop = this.computeheight + "px";
            }
          } else if (strings.indexOf(".25") > 0) {
            for (var h = index + 3; h < index + 7 && h < box.length; h++) {
              box[h].style.marginTop = this.computeheight + "px";
            }
          } else if (strings.indexOf(".5") > 0) {
            for (var h = index + 2; h < index + 6 && h < box.length; h++) {
              box[h].style.marginTop = this.computeheight + "px";
            }
          } else if (strings.indexOf(".75") > 0) {
            for (var h = index + 1; h < index + 5 && h < box.length; h++) {
              box[h].style.marginTop = this.computeheight + "px";
            }
          }
        }
      }
    },
    tabMyBet(index) {
      this.itemsMyBet.num = index;
      if (index == 0) {
        this.itemsMyBet.showTools = false;
        this.itemsMyBet.showCbi = true;
      } else {
        this.itemsMyBet.showTools = true;
        this.itemsMyBet.showCbi = false;
      }
    },
    getUersInfo() {
      let _this = this;
      _this.$store.dispatch("userInfo");
    },
    //当前id所有用户预测的情况选项卡
    tabInfo(index) {
      this.itemsInfo.num = index;
      if (index == 0) {
        this.itemsInfo.showTools = true;
        this.itemsInfo.showCbi = false;
      } else {
        this.itemsInfo.showTools = false;
        this.itemsInfo.showCbi = true;
      }
    },
    //打开弹出框
    openchangeTeams(event, dataType, option, guessId, Length, data) {
      // let dataType =parseInt(event.currentTarget.getAttribute('data-type'));
      let params = {
        isShow: true,
        optionFrom: option,
        optionTo: null,
        guessId: guessId,
        dataType: dataType,
        Length: Length,
        teamData: data
      };
      this.$store.commit("isShowPubgPup", params);
    },
    //换队
    changeTeams(event) {
      let _this = this;
      let el = event.currentTarget;
      let thisOption = el.getAttribute("data-option");
      let OptionTo = thisOption == "1" ? "2" : "1";
      let dataType = parseInt(el.getAttribute("data-type"));
      let guessId = this.$route.params.echoid;
      dataOptions = {
        guess_id: guessId,
        option_from: thisOption,
        option_to: OptionTo
      };
      let _url = _this.itemsInfo.teams[dataType];
      Http.post(_url, dataOptions).then(function(data) {
        let result = data.data;
        if (result.code == 0) {
          let dataOption = {
            masseges: result.message,
            type: "2"
          };
          _this.$store.commit("isSigninPupopDis", true);
          _this.$store.commit("isSigninPupopDis", dataOption);
          if (dataType == 0) {
            datas = {
              guess_id: guessId
            };
            _this.$store.dispatch("caimy_list", datas);
            _this.$store.dispatch("cbi_list", datas);
          } else {
            datas = {
              guess_id: guessId
            };
            _this.$store.dispatch("skins_list", datas);
            _this.$store.dispatch("skinsmy_list", datas);
          }
        } else {
          let dataOption = {
            masseges: result.message,
            type: "2"
          };
          _this.$store.commit("isSigninPupopDis", true);
          _this.$store.commit("isSigninPupopDis", dataOption);
        }
      });
    },
    fnRemoveOthers() {
      let eBoxtype1 = document.getElementsByClassName("guessmain-ex-team");
      for (var i = 0; i < eBoxtype1.length; i++) {
        if (eBoxtype1[i].classList.contains("active")) {
          eBoxtype1[i].classList.remove("active");
        }
        let box = eBoxtype1[i].getElementsByClassName("guessmain-sample");
        for (var h = 0; h < box.length; h++) {
          if (box[h].classList.contains("active")) {
            box[h].classList.remove("active");
            box[h].setAttribute("data-flag", "1");
          }
          if (box[h].attributes["style"]) {
            box[h].removeAttribute("style");
          }
        }
      }
      let eBoxtype2 = document.getElementsByClassName(
        "guessmain-pubg-guess-list"
      );
      for (var i = 0; i < eBoxtype2.length; i++) {
        if (eBoxtype2[i].classList.contains("active")) {
          eBoxtype2[i].classList.remove("active");
        }
        let box = eBoxtype2[i].getElementsByClassName(
          "guessmain-pubg-guess-same"
        );
        for (var h = 0; h < box.length; h++) {
          if (box[h].classList.contains("active")) {
            box[h].classList.remove("active");
            box[h].setAttribute("data-flag", "1");
          }
          if (box[h].attributes["style"]) {
            box[h].removeAttribute("style");
          }
        }
      }

      if (this.itemMessage.choiceOptionType == 2) {
        // this.itemMessage.isShowPosition=null;
      } else {
        // this.itemMessage.isShowPosition=null;
      }
    },
    //选择战队
    choiceTeam(event,optionType,boxIndex,Index,option,oddOption,oddOption1,guessName,guessID,flag,oddsTypes,battleId){
      if (flag == 2 ||( oddOption == 0.0&&oddOption1 == 0.0&&oddsTypes==2)) return;
      this.oddsType = oddsTypes;
      let _this = this;
      if (!_this.$store.state.user.userInfo) {
        _this.$store.dispatch("logout");
        _this.$store.commit("showLoginDialog", true);
        setTimeout(() => {
          _this.$store.commit("istestBooleam", true);
        }, 100);
        return;
      }

      let el = event.currentTarget.parentNode;
      this.itemMessage.choiceOption = option;
      let thisFlag = event.currentTarget.getAttribute("data-flag");
      if (thisFlag == 2) {
        return;
      }
      event.currentTarget.setAttribute("data-flag", "2");
      // let boxIndex =parseInt(el.getAttribute('data-index'));
      this.itemMessage.choiceBoxIndex = boxIndex;
      this.itemMessage.choiceOptionType = optionType;
      this.tabGuess(0);
      this.fnRemoveOthers();
      //更新当前id我的预测
      if (this.$store.state.match.stateGuessId != guessID) {
        let params = {
          guess_id: guessID
        };
        this.$store.dispatch("caimy_list", params);
        this.$store.dispatch("skinsmy_list", params);
      }

      // new guidance step five
      if (!this.$store.state.isDialogShow.isCompleteAll) {
        this.$store.dispatch("getNewGuidanceFiveStepDispatch");
      }

      this.$store.commit("mutationIsSendDispath", false);

      this.$store.commit("mutationStateGuessId", guessID);
      this.$store.commit("mutationSetGuessValue", {
        guessId: guessID,
        oddsType: oddsTypes,
        battleId: battleId
      });
      router.push(`/guess/${guessID}`);

      let eBox = document.getElementsByClassName("guessmain-ex-team");

      if (!el.classList.contains("active")) {
        el.classList.add("active");
      }
      for (var i = 0; i < eBox.length; i++) {
        if (el == eBox[i]) {
          if (!eBox[i].classList.contains("active")) {
            eBox[i].classList.add("active");
          }
        } else {
          if (eBox[i].classList.contains("active")) {
            eBox[i].classList.remove("active");
          }
        }
      }
      // _this.$store.dispatch('userInfo');
      setTimeout(() => {
        if (_this.$store.state.user.userInfo) {
          _this.itemsTeam.option = option;
          _this.itemsTeam.odds = oddOption;
          _this.itemsTeam.guess_id = guessID;
          // _this.gettamename=guessName;
          _this.$store.commit("getTeamName", guessName);
          for (var i = 0; i < eBox.length; i++) {
            if (eBox[i].classList.contains("active")) {
              let _box = eBox[i].getElementsByClassName("guessmain-sample");
              for (var h = 0; h < _box.length; h++) {
                if (h == Index) {
                  _box[h].classList.add("active");
                } else {
                  if (_box[h].classList.contains("active") == true) {
                    _box[h].classList.remove("active");
                  }
                }
              }
            } else {
              let _box = eBox[i].getElementsByClassName("guessmain-sample");
              for (var h = 0; h < _box.length; h++) {
                if (_box[h].classList.contains("active") == true) {
                  _box[h].classList.remove("active");
                }
              }
            }
          }
        } else {
          _this.$store.dispatch("logout");
          _this.$store.commit("showLoginDialog", true);
          setTimeout(() => {
            _this.$store.commit("istestBooleam", true);

          }, 100);
        }
      }, 100);
    },
    //选择战队
    choiceTeampubg(event,optionType,boxIndex,Index,option,oddOption,guessName,guessID,flag,oddsTypes,battleId){
      if (flag == 2 || oddOption == 0.0&&oddsTypes==2) return;
      this.oddsType = oddsTypes;
      let _this = this;
      let el = event.currentTarget;
      if (!_this.$store.state.user.userInfo) {
        _this.$store.dispatch("logout");
        _this.$store.commit("showLoginDialog", true);
        setTimeout(() => {
          _this.$store.commit("istestBooleam", true);
        }, 100);
        return;
      }
      let thisFlag = el.getAttribute("data-flag");
      if (thisFlag == 2) {
        return;
      }
      el.setAttribute("data-flag", "2");
      this.itemMessage.choiceBoxIndex = boxIndex;
      this.itemMessage.choiceOptionType = optionType;
      let eBox = el.parentNode;
      let eboxs = document.getElementsByClassName("guessmain-pubg-guess-list");
      let _box = eBox.getElementsByClassName("guessmain-pubg-guess-same");
      this.tabGuess(0);
      this.fnRemoveOthers();
      //更新当前id我的预测
      if (this.$store.state.match.stateGuessId != guessID) {
        let params = {
          guess_id: guessID
        };
        this.$store.dispatch("caimy_list", params);
        this.$store.dispatch("skinsmy_list", params);
      }
      // new guidance step five
      if (!this.$store.state.isDialogShow.isCompleteAll) {
        this.$store.dispatch("getNewGuidanceFiveStepDispatch");
      }
      this.$store.commit("mutationIsSendDispath", false);
      this.$store.commit("mutationStateGuessId", guessID);
      this.$store.commit("mutationSetGuessValue", {
        guessId: guessID,
        oddsType: oddsTypes,
        battleId: battleId
      });
      router.push(`/guess/${guessID}`);
      for (var i = 0; i < eboxs.length; i++) {
        if (eboxs[i] == eBox) {
          this.$store.commit("mutationChoiceBoxNodeIndex", i);
          console.log("我存在码", i);
        }
      }
      this.itemMessage.choiceChildNode = _box;
      setTimeout(() => {
        if (_this.$store.state.user.userInfo) {
          _this.itemsTeam.option = option;
          _this.itemsTeam.odds = oddOption;
          _this.itemsTeam.guess_id = guessID;
          // _this.gettamename=guessName;
          _this.$store.commit("getTeamName", guessName);
          _this.$store.commit("getchoiceTeamType", "cai");
          // _this.itemMessage.choiceTeamIndex=Index
          _this.$store.commit("getChoiceTeamIndex", Index);
          let distanceH = 197 + (Math.ceil((Index + 1) / 4) - 1) * 90;
          _this.itemMessage.myBetTop = distanceH;
          _this.$store.commit("getPubgmarginTop", 261);
          let stringIndex = (Index / 4).toString();
          if (stringIndex.indexOf(".") < 0) {
            this.itemMessage.isshowSangleLeft = 1;
          } else if (stringIndex.indexOf(".25") > -1) {
            this.itemMessage.isshowSangleLeft = 2;
          } else if (stringIndex.indexOf(".5") > -1) {
            this.itemMessage.isshowSangleLeft = 3;
          } else if (stringIndex.indexOf(".75") > -1) {
            this.itemMessage.isshowSangleLeft = 4;
          }
          // this.getTeamListTop(_box,Index,stringIndex);

          for (var i = 0; i < _box.length; i++) {
            if (i == Index) {
              _box[i].classList.add("active");
            } else {
              if (_box[i].classList.contains("active") == true) {
                _box[i].classList.remove("active");
              }
            }
          }
          setTimeout(() => {
            let refBox = this.$refs.guessguessmybet[0];
            if (Math.ceil(_box.length / 4) == Math.ceil((Index + 1) / 4)) {
              // _this.itemMessage.isShowPosition=null;
              _box[_box.length - 1].parentNode.insertBefore(
                refBox,
                _box[_box.length - 1].nextSibling
              );
            } else {
              // _this.itemMessage.isShowPosition=Math.ceil((Index+1)/4);
              console.log("我实现了码", Math.ceil((Index + 1) / 4) * 4 - 1);
              _box[Math.ceil((Index + 1) / 4) * 4 - 1].parentNode.insertBefore(
                refBox,
                _box[Math.ceil((Index + 1) / 4) * 4 - 1].nextSibling
              );
            }
          }, 10);
        } else {
          _this.$store.dispatch("logout");
          _this.$store.commit("showLoginDialog", true);
          setTimeout(() => {
            _this.$store.commit("istestBooleam", true);
          }, 100);
        }
      }, 100);
    },
    fnChooseGuess(event, id, index, battleId, oddsType) {
      this.listData = this.$store.state.match.guessTeam_message;
      this.$store.commit("mutationIsSendDispath", false);

      if (this.$store.state.match.stateGuessId == id) {
        return;
      }
      let params = {
        guess_id: id
      };
      this.$store.dispatch("caimy_list", params);
      this.$store.dispatch("skinsmy_list", params);
      //更新当前id我的预测
      router.push(`/guess/${id}`);
      this.$store.commit("mutationStateGuessId", id);
      this.$store.commit("mutationSetGuessValue", {
        guessId: id,
        oddsType: oddsType,
        battleId: battleId
      });
      this.itemMessage.choiceBoxIndex = null;
      this.fnRemoveOthers();
    },
    openMybag() {
      this.itemMessage.isShowMybag = true;
    },
    closeMybag() {
      this.itemMessage.isShowMybag = false;
    },
    //菜币选择
    choiceCbi(event, index, value, oddsType,maxbetvalue) {
      let myCai = this.$store.state.user.userInfo.cai;
      let _this = this;
      let el = event.currentTarget;
      // let myBetSumValue =this.$store.state.match.Caisum + this.$store.state.match.Cardssum;
      // let myCanBetValue = parseInt(oddsType != 2? parseInt(this.maxBetValue[0]) - myBetSumValue: parseInt(this.maxBetValue[1]) - myBetSumValue);
      let myCanBetValue = maxbetvalue;
      this.itemsInput.maxValue=maxbetvalue;
      // console.log("我的账dddd户余额", maxbetvalue);
      let mymoney = 0;
      if (index != 3) {
        if (!this.itemsInput.type1) {
          this.itemsInput.type1 = 0;
        }
        if (
          parseInt(this.itemsInput.type1) + parseInt(value) >=
          myCanBetValue
        ) {
          this.itemsInput.type1 =
            myCanBetValue >= 0 ? myCanBetValue.toString() : "0";
        } else {
          this.itemsInput.type1 =
            myCanBetValue >= 0
              ? (parseInt(this.itemsInput.type1) + parseInt(value)).toString()
              : "0";
          console.log("我走这里了吗", this.itemsInput.type1);
        }
        if (index == 4) {
          console.log(myBetSumValue,'***',myCai,'***',myCanBetValue);
            if(parseFloat(this.maxBetValue[0]) <parseFloat(myCai)){
              this.itemsInput.type1 =myCanBetValue;
            }else{
              this.itemsInput.type1 =myCai;
            }
        }
      } else {
      }
      mymoney = parseInt(this.itemsInput.type1);

      setTimeout(() => {
        this.$store.commit("isMyMoney", mymoney);
      }, 100);
    },
    clearNumber: function() {
      let _box = document.getElementsByClassName("choiceMoney");
      for (var i = 0; i < _box.length; i++) {
        if (_box[i].classList.contains("active") == true) {
          _box[i].classList.remove("active");
        }
      }
      this.itemsInput.type1 = "";
    },
    hurryUpBetCai(event,oddsType,handicapTeam,handicap,score,guessType,desc,escExtra,guessLimit){
      let _this = this;
      _this.$store.dispatch("userInfo");
      // let maxBetValue = oddsType == 1 ? this.maxBetValue[0] : this.maxBetValue[1];
      let maxBetValue =guessLimit;
      setTimeout(() => {
        if (_this.$store.state.user.userInfo) {
          let _sumMoney = parseInt(this.myMoneySum);
          let userMoney = parseInt(this.isLoginUserCai);
          console.log("userMoney", userMoney);
          // Mybetsum =this.$store.state.match.Caisum + this.$store.state.match.Cardssum;
          Mybetsum =this.itemsTeam.mineBetValue
          if (userMoney < _sumMoney) {
            let dataOption = {
              masseges: "你的账户余额不足，是否需要充值？",
              typePay: "2"
            };
            _this.$store.commit("isSigninPupopDis", true);
            _this.$store.commit("isSigninPupopDis", dataOption);
          } else {
            if (_sumMoney >= 100) {
              if (Mybetsum + _sumMoney <= maxBetValue) {
                datas = {
                  cai: _sumMoney,
                  guess_id: _this.itemsTeam.guess_id,
                  option: _this.itemsTeam.option,
                  is_accept_change:oddsType == 1?0:_this.acceptNewodds,
                  odds:oddsType == 1?0:_this.itemsTeam.odds,
                  team_x:oddsType == 1?0:handicapTeam,
                  score_x:oddsType == 1?0:handicap,
                  score:oddsType == 1?0:score,
                };
                // return
                Http.post("/guess/guess", datas).then(function(data) {
                  if (data.data.code == 0) {
                    let dataOption = {
                      masseges: data.data.message,
                      type: "2"
                    };
                    _this.itemsInput.type1 = "";
                    // _this.$store.commit('mutationsisUpdateOdds',false);
                    _this.$store.dispatch("userInfo");

                    setTimeout(() => {
                      _this.itemsGuess.userInfoCb = _this.$store.state.user
                        .userInfo
                        ? _this.$store.state.user.userInfo.cai
                        : 0;
                    }, 100);

                    _this.$store.commit("isSigninPupopDis", true);
                    _this.$store.commit("isSigninPupopDis", dataOption);
                    datas = {
                      guess_id: _this.itemsTeam.guess_id
                    };
                    // _this.$store.dispatch('cbi_list', datas)
                    _this.$store.dispatch("caimy_list", datas);
                    // if(_this.$store.state.match.setGuessValue.oddsType==1){
                    //   _this.$store.dispatch("richRank", datas)
                    // }

                    _this.$store.commit("mutationMyguessData", null);
                    _this.$store.commit("mutationMyguessPage", 1);

                    let params = {
                      status: "wait",
                      result_status: "all",
                      page: 1,
                      size: 3
                    };
                    _this.$store.dispatch("actionMycaiData", params);
                    //预测成功收起预测
                    _this.itemMessage.choiceBoxIndex = null;
                    _this.fnRemoveOthers();
                  }else if(data.data.code == -101){
                    //  dataOption;
                    // if(guessType==2||guessType==5){

                    // }else{
                    //   dataOption = {
                    //     masseges: _this.gettamename+'队',
                    //     masseges2: data.data.message,
                    //     newOdds:data.data.data.odds,
                    //     oldOdds:_this.itemsTeam.odds,
                    //     option: _this.itemsTeam.option,
                    //     typeGuess: guessType
                    //   };
                    // }
                     let dataOption = {
                        masseges: _this.gettamename+'队',
                        masseges2: data.data.message,
                        newOdds:data.data.data.odds,
                        oldOdds:_this.itemsTeam.odds,
                        option: _this.itemsTeam.option,
                        typeGuess:guessType,
                        team_x:data.data.data.team_x,
                        score_x:data.data.data.score_x,
                        score:data.data.data.score,
                        desc:data.data.data.desc,
                        desc_extra:data.data.data.desc_extra,
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
                    _this.$store.commit('mutationsisUpdateOdds',false);
                  }
                });
              } else {
                let dataOption = {
                  masseges:
                    "预测总值已达上限，最高可预测价值为" +
                    _this.thousandBitSeparator(maxBetValue) +
                    " C，当前不能预测",
                  betType: true
                };
                _this.$store.commit("isSigninPupopDis", true);
                _this.$store.commit("isSigninPupopDis", dataOption);
              }
            } else {
              let dataOption = {
                masseges: "预测失败，预测最小额度为100C",
                type: "2"
              };
              _this.$store.commit("isSigninPupopDis", true);
              _this.$store.commit("isSigninPupopDis", dataOption);
            }
          }
        } else {
          _this.$store.dispatch("logout");
          _this.$store.commit("showLoginDialog", true);
          setTimeout(() => {
            _this.$store.commit("istestBooleam", true);
          }, 100);
        }
      }, 100);
    },
    hurryUpBetCards(event, oddsType,handicapTeam,handicap,score,guessType,desc,escExtra,guessLimit) {
      let _this = this,
        dataakin = new Object(),
        stringA,
        stringB;
      // let maxBetValue =oddsType == 1 ? this.maxBetValue[0] : this.maxBetValue[1];
      let maxBetValue =guessLimit;
      let _box = document.getElementsByClassName("guessmain-pubg-guess-same");
      _this.$store.dispatch("userInfo");
      setTimeout(() => {
        if (_this.$store.state.user.userInfo) {
          let attrObj = _this.$store.state.match.pull_tools;
          console.log("attrObj", attrObj);
          let MySkinSum = this.$store.state.match.sumNum;
          // Mybetsum =this.$store.state.match.Caisum + this.$store.state.match.Cardssum;
          Mybetsum =this.itemsTeam.mineBetValue
          console.log(MySkinSum + Mybetsum);

          if (attrObj.length > 0) {
            for (var i = 0; i < attrObj.length; i++) {
              if (attrObj[i].product_count != 0) {
                stringA = attrObj[i].product_id;
                stringB = attrObj[i].product_count;
                dataakin["" + stringA + ""] = stringB;
              }
            }
            datas = {
              guess_id: _this.itemsTeam.guess_id,
              option: _this.itemsTeam.option,
              is_accept_change:oddsType == 1?0:_this.acceptNewodds,
              odds:oddsType == 1?0:_this.itemsTeam.odds,
              cards: JSON.stringify(dataakin),
              team_x:oddsType == 1?0:handicapTeam,
              score_x:oddsType == 1?0:handicap,
              score:oddsType == 1?0:score,
            };
            console.log("datas", datas);
            if (Mybetsum + MySkinSum <= maxBetValue) {
              if (JSON.stringify(dataakin).length > 2) {
                Http.post("/guess/guess", datas).then(function(data) {
                  if (data.data.code == 0) {
                    let dataOption = {
                      masseges: data.data.message,
                      type: "2"
                    };
                    _this.$store.commit("clearpulltools", []);
                    _this.$store.commit("getsumNum", 0);
                    _this.$store.commit("isSigninPupopDis", true);
                    _this.$store.commit("isSigninPupopDis", dataOption);
                    let datas = {
                      guess_id: _this.itemsTeam.guess_id
                    };
                    // _this.$store.dispatch('cbi_list', datas)
                    _this.$store.dispatch("skinsmy_list", datas);
                    // if(_this.$store.state.match.setGuessValue.oddsType==1){
                    //   _this.$store.dispatch("richRank", datas)
                    // }
                    _this.$store.commit("mutationMyguessData", null);
                    _this.$store.commit("mutationMyguessPage", 1);
                    let params = {
                      status: "wait",
                      result_status: "all",
                      page: 1,
                      size: 3
                    };
                    _this.$store.dispatch("actionMycaiData", params);

                    //预测成功收起预测
                    _this.itemMessage.choiceBoxIndex = null;
                    _this.fnRemoveOthers();

                    setTimeout(() => {
                      let toolsHeight =
                        217 +
                        _this.getMyTollsHeight +
                        _this.getPullTollsHeight +
                        40;
                      _this.$store.commit("getPubgmarginTop", toolsHeight);
                      _this.$store.commit("getTeamListMarginTop", toolsHeight);
                    }, 100);
                  }else if(data.data.code == -101){
                    let dataOption;
                    if(guessType==2||guessType==5){

                      dataOption = {
                        masseges: _this.gettamename+'队',
                        masseges2: data.data.message,
                        newOdds:data.data.data.odds,
                        oldOdds:_this.itemsTeam.odds,
                        option: _this.itemsTeam.option,
                        typeGuess:guessType,
                        team_x:data.data.data.team_x,
                        score_x:data.data.data.score_x,
                        score:data.data.data.score,
                      };
                    }else{
                      dataOption = {
                        masseges: _this.gettamename+'队',
                        masseges2: data.data.message,
                        newOdds:data.data.data.odds,
                        oldOdds:_this.itemsTeam.odds,
                        option: _this.itemsTeam.option,
                        typeGuess: guessType
                      };
                    }
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
              } else {
                let dataOption = {
                  masseges: "至少选择一种皮肤预测",
                  type: "2"
                };
                _this.$store.commit("isSigninPupopDis", true);
                _this.$store.commit("isSigninPupopDis", dataOption);
              }
            } else {
              let dataOption = {
                masseges:
                  "预测总值已达上限，最高可预测价值为" +
                  _this.thousandBitSeparator(maxBetValue) +
                  " C，当前不能预测",
                betType: true
              };
              _this.$store.commit("isSigninPupopDis", true);
              _this.$store.commit("isSigninPupopDis", dataOption);
            }
          } else {
            let dataOption = {
              masseges: "至少选择一种皮肤预测",
              type: "2"
            };
            _this.$store.commit("isSigninPupopDis", true);
            _this.$store.commit("isSigninPupopDis", dataOption);
          }
        } else {
          _this.$store.dispatch("logout");
          _this.$store.commit("showLoginDialog", true);
          setTimeout(() => {
            _this.$store.commit("istestBooleam", true);
          }, 100);
        }
      }, 100);
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
    openRecharge() {
      console.log("滚轮高顿", this.getScrollTop());
      if(this.$store.state.user.userInfo){
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
    acceptNewOdds(){
      if(!this.acceptNewodds){
        this.acceptNewodds=1;
      }else{
        this.acceptNewodds=0;
      }

    },
  },
  mounted() {
    let params = {
      guess_id: this.$route.params.echoid
    };
    this.$store.dispatch("userInfo");
    this.getBattleId();
    this.$store.dispatch("caimy_list", params);
    this.$store.dispatch("skinsmy_list", params);
  },
  updated() {
    let self = this;
    let isCompeteFour = !getCookie("isCompeteFour")
      ? false
      : getCookie("isCompeteFour") == undefined
        ? false
        : true;
    let isCompleteAll = this.$store.state.isDialogShow.isCompleteAll;
    let isSHowCarryEnroll = this.$store.state.isDialogShow.isSHowCarryEnroll;
    console.log("isCompeteFour", isCompeteFour);
    setTimeout(() => {
      if (
        this.$route.params.echoid &&
        this.$store.state.match.isIndex == 0 &&
        document.querySelector("div.guessmain-pubg-xh.active")
      ) {
        self.$store.commit("mutationisScrollTop", 85);
        self.$store.commit("mutationisThisScrollTop", 81);
        if (!isCompeteFour && !isCompleteAll && !isSHowCarryEnroll) {
          self.$store.dispatch("actionsGuideStepFourStart");
        }
        self.$store.commit("mutationisEndAnimate", true);
      }
    }, 500);
    setTimeout(() => {
      if (
        this.$route.params.echoid &&
        this.$store.state.match.guessTeam_message &&
        this.$store.state.match.isSendDispath &&
        this.$route.params.echoid &&
        this.$store.state.match.isIndex > 0
      ) {
        // console.log('我是什么呢',this.$store.state.match.isIndex)
        // let documentBox=null;
        // if(document.compatMode == "CSS1Compat"){
        //   documentBox = document.documentElement;
        // }else{
        //   documentBox = document.body;
        // }

        // documentBox.scrollTop=730
        setTimeout(() => {
          let listActive = document.querySelector(
            "div.guessmain-pubg-xh.active"
          );

          // let scrollTopH =documentBox.scrollTop;
          let scrollTopH = self.getScrollTop();
          let scrollAllH =listActive?listActive.offsetTop+100:100;
          let seAnimatiton = setInterval(() => {
            scrollTopH += 40;
            if (scrollTopH >= scrollAllH) {
              scrollTopH = scrollAllH;
              clearInterval(seAnimatiton);
              let guessMainData = self.$store.state.match.guessMainData;
              let typeBox1 = document.querySelector(
                "div.guessmain-pubg-xh.active .guessmain-ex-team"
              );
              let typeBox2 = document.querySelector(
                "div.guessmain .guessmain-pubg-guess-list"
              );
              let distanceTop =
                guessMainData.club_type == 1
                  ? typeBox1?typeBox1.offsetTop:0
                  : typeBox2?typeBox2.offsetTop:0;
              self.$store.commit("mutationisScrollTop", listActive?listActive.offsetTop:0);
              self.$store.commit("mutationisThisScrollTop", distanceTop);

              self.$store.commit("mutationIsSendDispath", false);
              // self.$store.commit('mutationIsShowGuessBetGuide',true);
              if (!isCompeteFour && !isCompleteAll && !isSHowCarryEnroll) {
                self.$store.dispatch("actionsGuideStepFourStart");
              }
              self.$store.commit("mutationisEndAnimate", true);
            }
            if (document.body) {
              document.body.scrollTop = scrollTopH;
            }
            if (document.documentElement) {
              document.documentElement.scrollTop = scrollTopH;
            }
          }, 20);
        }, 100);
      }
    }, 500);
  },
  watch: {
    itemsInput: {
      handler: function(val, oldval) {
        let myCai = this.$store.state.user.userInfo.cai;
        console.log("我的菜币", val,val.maxValue);
        let reg = /^[0-9]*$/;
        if (this.$refs.choiceMoneys.value != 0 &&this.$refs.choiceMoneys.value != "") {
          if (!reg.test(val.type1)) {
            if (val.type1.length == 1) {
              val.type1 = "";
            } else {
              val.type1 = parseInt(val.type1);
            }
          }
          if(val.type1>=val.maxValue){
            val.type1 = val.maxValue;
            this.$store.commit("isMyMoney", parseInt(val.type1));
            return;
          }

          if (val.type1.length > 1 && val.type1[0] == 0) {
            val.type1 = val.type1.slice(1);
          }

          if (val.type1.length < 9) {
            if (val.type1 >= 100) {
              this.$store.commit("isMyMoney", parseInt(val.type1));
              return val.type1;
            } else {
              this.$store.commit("isMyMoney", 0);
            }
          } else {
            val.type1 = val.type1.slice(0, 8);
            this.$store.commit("isMyMoney", parseInt(val.type1));
          }

        } else {
          this.$store.commit("isMyMoney", 0);
        }
      },
      deep: true
    },
    $route() {
      if (this.$route.params.echoid) {
        setTimeout(() => {
          if (!this.$store.state.match.isSendDispath) {
            return;
          }
          this.$store.commit("clearmytools", []);
          this.$store.commit("clearpulltools", []);
          this.$store.commit("getsumNum", 0);
          this.$store.commit("getchoiceTeamType", "cai");
          this.itemsInput.type1 = "";
          this.$store.commit("getTeamName", "");
          this.$store.commit("isMyMoney", 0);
          this.fnRemoveOthers();
          this.itemsMyBet.num = 0;
          this.itemsMyBet.menu[0].show = true;
          this.itemsMyBet.showCbi = true;
          this.itemsMyBet.menu[1].show = false;
          this.itemsMyBet.showTools = false;
          let params = {
            guess_id: this.$route.params.echoid
          };
          this.$store.dispatch("caimy_list", params);
          this.$store.dispatch("skinsmy_list", params);
        }, 100);
      }
    }
  },
  computed: {
    getMyUserInfo: function() {
      console.log("a", this.$store.state.user.userInfo);
      return this.$store.state.user.userInfo;
    },
    getBattleIdData: function() {
      return this.$store.state.match.battleId
        ? this.$store.state.match.battleId
        : null;
    },
    getmainData: function() {
      return this.$store.state.match.guessMainData
        ? this.$store.state.match.guessMainData
        : null;
    },
    getgGuessTeamData: function() {
      console.log('this.$store.state.match.guessTeam_message',this.$store.state.match.guessTeam_message)
      return this.$store.state.match.guessTeam_message
        ? this.$store.state.match.guessTeam_message
        : null;
    },
    caimy_list: function() {
      console.log("我的菜币预测", this.$store.state.match.caimy_list);
      return this.$store.state.match.caimy_list
        ? this.$store.state.match.caimy_list
        : null;
    },
    skinsmy_list: function() {
      console.log("我的道具预测", this.$store.state.match.skinsmy_list);
      return this.$store.state.match.skinsmy_list
        ? this.$store.state.match.skinsmy_list
        : null;
    },
    myBag_tools: function() {
      return this.$store.state.match.myBag_tools;
    },
    push_tools: function() {
      return this.$store.state.match.pull_tools;
    },
    sumNum: function() {
      return this.$store.state.match.sumNum
        ? this.$store.state.match.sumNum
        : 0;
    },
    login: function() {
      return this.$store.state.user.login;
    },
    isLoginUserCai: function() {
      let self = this;
      let Cai;
      if (self.$store.state.user.userInfo) {
        if (self.$store.state.user.userInfo.cai) {
          Cai = self.$store.state.user.userInfo.cai;
        } else {
          Cai = 0;
        }
      } else {
        Cai = 0;
      }
      return Cai;
    },
    myMoneySum: function() {
      return this.$store.state.match.myMoney
        ? this.$store.state.match.myMoney
        : 0;
    },
    getThisUserMarginTop: function() {
      let choiceIndex = this.getchoiceteamIndex;
      let teamLength = this.getTeamLen;
      if (this.getchoiceteamIndex) {
        console.log(
          "取整",
          parseInt(choiceIndex / 3),
          parseInt(teamLength / 3)
        );
        if (parseInt(choiceIndex / 3) == parseInt(teamLength / 3)) {
          // return this.$store.state.match.pubgmarginTop
          if (this.$store.state.match.choiceTeamType == "cai") {
            return 251;
          } else {
            return 207 + this.getMyTollsHeight + this.getPullTollsHeight;
          }
        } else {
          return 0;
        }
      } else {
        return 0;
      }
    },
    getTeamLen: function() {
      return this.$store.state.match.guessMessageTeamLen;
    },
    getMyTollsHeight: function() {
      return this.$store.state.match.myToolsHeight;
    },
    getPullTollsHeight: function() {
      return this.$store.state.match.pullToolsHeight;
    },
    gettamename: function() {
      return this.$store.state.match.TeamName;
    },
    getchoiceteamIndex: function() {
      return this.$store.state.match.choiceTeamIndex;
    },
    computeheight: function() {
      let matgintopH = 0;
      console.log(this.$store.state.match.choiceTeamType, "类型");
      if (this.$store.state.match.choiceTeamType == "cai") {
        matgintopH = 291;
      } else {
        matgintopH = 257 + this.getMyTollsHeight + this.getPullTollsHeight;
        console.log(matgintopH, "matgintopH");
      }
      return matgintopH;
    },
    getChoiceBoxNodeIndex: function() {
      return this.$store.state.match.choiceBoxNodeIndex;
    },
    getsetGuessValue: function() {
      // console.log('getsetGuessValue',this.$store.state.match.stateGuessId)
      return this.$store.state.match.stateGuessId;
    },
    getisUpdateOdds(){
      return this.$store.state.match.isUpdateOdds;
    },
    getisShowNewsOdds(){
       this.itemsTeam.odds=this.$store.state.match.isShowNewsOdds[this.itemsTeam.option];
      return this.$store.state.match.isShowNewsOdds;
    },
    getisShowDesc(){
      console.log('描述我更新了没有呢',this.$store.state.match.isShowNewsDesc)
      return this.$store.state.match.isShowNewsDesc;
    },
    getMineBetValue(){
      let myCaiData =this.$store.state.match.caimy_list?this.$store.state.match.caimy_list:null;
      let myCardsData =this.$store.state.match.skinsmy_list?this.$store.state.match.skinsmy_list:null;
      let minebetCai=0,minebetCards=0;
      if(myCaiData){
      Object.keys(myCaiData).forEach((key)=>{
        if(myCaiData[key].option==this.itemsTeam.option){
          minebetCai+=parseInt(myCaiData[key].chip)
        }
      })
      }
      if(myCardsData){
      Object.keys(myCardsData).forEach((key)=>{
        if(myCardsData[key].option==this.itemsTeam.option){
          minebetCards+=parseInt(myCardsData[key].chip)
        }
      });
      }
      this.itemsTeam.mineBetValue=minebetCai+minebetCards;
    },
  }
};
</script>
<style lang="scss" scoped src="@/assets/css/guessDetail.css"></style>


