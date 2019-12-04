<template>
  <div id="home">
    <!-- 居中显示 -->
    <div class="margin_1200">
      <!-- banner+公告开始 -->
        <div class="banner_announce">
          <!-- 轮播图开始 -->
          <div class="banner" id="bswiper">
            <div class="swiper-container1" v-if="bswiperlist && bswiperlist.length>0">
              <swiper :options="swiperOption" ref="mySwiper" id="swiperTest">
                <swiper-slide v-for='data in bswiperlist' :key='data.id' >
                  <a :href="data.url" target="_blank" class='anone' >
                    <img :src="data.img_uri" :title="data.title">
                    <div class="bmask">
                        <span class="h3">{{data.title}}</span>
                    </div>
                  </a>
                </swiper-slide>
                <div class="swiper-pagination"  slot="pagination"></div>
              </swiper>
            </div>
          </div>
          <!-- 轮播图结束 -->
          <!-- 公告+世界喊话开始 -->
          <div class="announce">
            <!-- 公告+世界导航条开始 -->
            <ul class="announce_tab">
              <li
                v-for="(item,index) in tabs"
                :class="{annouce_active:index == num}"
                @click="tab(index)" :key="index">{{item}}</li>
            </ul>
            <!-- 公告+世界导航条结束 -->
            <!-- 公告+世界主体开始 -->
            <div class="announce_tab_content" v-for="(item,index) in 2 " :key="index" v-show=" index == num">
              <!-- 公告开始 -->
              <div class="announce_content" v-if="index==0">
                <h3 class="theme_title" v-if="getannouncedatalist">{{getannouncedatalist.title}}</h3>
                <p class="txt-indent wd-break"  v-html="getannouncedatalist.content" v-if="getannouncedatalist"></p>
              </div>
              <!-- 公告结束 -->
              <!-- 世界喊话开始 -->
              <div class="chat_content" v-if="index==1" id="worldtalk">
                <!-- 消息列表开始 -->
                <div class="worldtalkurl">
                  <ul>
                    <li class="ellipsis" v-for="(data) in getworldtalkdata" :key="data.id">
                      <span class="name">{{data.nickname}} : </span>
                      <em class="content">{{data.content}}</em>
                    </li>
                  </ul>
                </div>
                <!-- 消息列表结束 -->
                <div class="input">
                  <input type="text" name="hhhhh" class="fleft ipt" placeholder="输入喊话内容(888C币一次)" ref='talkcontent' @keyup="userTexted"  onfocus="this.placeholder=''"  onblur="this.placeholder='输入喊话内容(888C币一次)'"  @keyup.ctrl.enter="sendcontent" v-if="iswait30s==false"/>
                  <input type="text" name="hhhhh" class="fleft ipt" placeholder="输入喊话内容(888C币一次)" ref='talkcontent' @keyup="userTexted"  onfocus="this.placeholder=''"  onblur="this.placeholder='输入喊话内容(888C币一次)'"  v-if="iswait30s==true"/>
                  <!-- old style -->
                    <!-- <button class="btn fleft" @click="sendcontent" v-if="iswait30s==false">发送</button>
                    <button class="btn1 fleft" v-if="iswait30s==true">{{howlong}}s</button> -->
                  <!-- old style -->
                  <div class="btn_send fleft pointer" @click="sendcontent" v-if="!iswait30s">发送</div>
                  <div class="btn_send fleft" v-else>{{howlong}}s</div>
                  <!-- new style -->
                  <!-- <div class="quickStart fleft pointer">快捷喊话</div> -->
                   <!-- new style -->
                  <!-- old style -->
                    <label for="quicktalk" class="fleft label">
                      <input type="checkbox" name="quicktalk" id="quicktalk " v-model="isChecked" @click="isCheck" keep-alive required>
                      <span class="testquick pointer">快捷喊话</span>
                    </label>
                  <!-- old style -->
                </div>
                <div class="needensure" v-if="isSigninDiaShow">
                  <Commondialog @testclick="choose">
                    <p slot="yourcontent">本次喊话将消耗888C,是否确认?</p>
                  </Commondialog>
                </div>
                <div class="nofullmoney">
                  <Nofullmoney :isshow='isensure' @closeme='closeChild'></Nofullmoney>
                </div>
                <div class='backed' v-show='backendstatus'>
                  <Backend></Backend>
                </div>
              </div>
              <!-- 世界喊话结束 -->
            </div>
            <!-- 公告+世界主体结束 -->
          </div>
        </div>
        <!-- banner+公告结束 -->

        <!-- 预测开始 -->
        <div class="prediction">
          <!-- 预测导航条开始 -->
          <ul class="prediction_tab">
            <li
              v-for="(item,index) in prediction_tabs"
              :class="{prediction_active:index == prediction_num}"
              @click="predictiontab(item.game,index)" :key="index">{{item.tab}}</li>
          </ul>
          <!-- 预测导航条结束 -->
          <!-- 预测主体开始 -->
          <div class="prediction_tab_content" v-for="(item,index) in 6" :key="index" v-if="index==prediction_num ">
            <!-- 这里开始 -->
            <div class="prediction_content" >
              <div class="swiper-container" :data-use="quizData">
                  <swiper :options="swiperOption_quiz" ref="mySwiper_quiz" class="swiper_wraps">
                      <swiper-slide v-for='(data) in hotcompetelistdata' :key='data.id' class="swiper_block"  >
                        <!-- 预测小块开始 -->
                          <div class="block_quiz">
                            <div class="block_up"  :class="`block_up${data.game_id}`">
                              <span class="game_icon" :class="`game_icon${data.game_id}`"></span>
                              <p class="quiz_time">{{data.short_date}}</p>
                              <p class="quiz_status">{{data.status_name}}</p>
                              <!-- 战队信息开始 -->
                              <!-- 两队情况 -->
                              <div class="quiz_team" v-if="data.option_type==1">
                                <!-- 战队A -->
                                <div class="team_info">
                                  <div class="ImgOut team_logo">
                                    <span><img :src="data.team[1].logo" alt=""></span>
                                  </div>
                                  <p class="team_name team_name_left margin_2px" :class="{margin_6px:data.game_id==4}">{{data.team[1].name}}</p>
                                </div>
                                <p class="test_vs">VS</p>
                                <!-- 战队B -->
                                <div class="team_info">
                                   <div class="ImgOut team_logo">
                                    <span><img :src="data.team[2].logo" alt=""></span>
                                  </div>

                                  <p class="team_name team_name_right margin_2px" :class="{margin_6px:data.game_id==4}">{{data.team[2].name}}</p>
                                </div>
                              </div>
                              <!-- 多队情况 -->
                              <div class="quiz_team" v-if="data.option_type==2">
                                <!-- 战队A -->
                                <div class="multiteam" v-for="(value,key) in data.hot" :key="key">
                                  <div class="team_info multi_team_info" v-for="(items,index) in data.team" v-if="value==index" :key="items.id">
                                    <!-- <img :src="items.logo" alt="" class="team_logo multi_team_logo"> -->
                                     <div class="ImgOut team_logo multi_team_logo">
                                      <span><img :src="items.logo" alt=""></span>
                                    </div>
                                    <p class="team_name team_name_left multi_team_name">{{items.name}}</p>
                                  </div>
                                </div>
                              </div>
                              <!-- 战队信息结束 -->
                            </div>
                            <div class="block_btm">
                              <p class="game_info"><span class="match_name">{{data.match.name}}</span>- <span class="match_typ">总胜负</span></p>
                              <p class="partin_btn" @click="handleToGuess(data.id)">预测</p>
                            </div>
                          </div>
                          <!-- 预测小块结束 -->
                      </swiper-slide>
                    <!-- <div class="swiper-button-prev" slot="button-prev" v-if="hotcompetelistdata && hotcompetelistdata.length>4"  @click="fnPrePage"></div>
                    <div class="swiper-button-next" slot="button-next" v-if="hotcompetelistdata && hotcompetelistdata.length>4"  @click="fnNextPage"></div> -->
                    <div class="swiper-button-prev" slot="button-prev" @click="fnPrePage" :class="{nextArrow:hotcompetelistdata &&hotcompetelistdata.length<4}"></div>
                    <div class="swiper-button-next" slot="button-next" @click="fnNextPage" :class="{nextArrow:hotcompetelistdata &&hotcompetelistdata.length<4}"></div>
                  </swiper>
              </div>
            </div>
            <div class="noData">暂无数据,敬请期待~</div>
          </div>
          <!-- 预测主体结束 -->
        </div>
        <!-- 预测结束 -->

        <!-- 剩余总体部分开始 -->
        <div class="home_main">
          <!-- 左部分开始 -->
          <div class="section_left">
            <!-- 热门资讯开始 -->
            <div class="popular_info">
              <div class="part_title">热门资讯</div>
              <div v-if="hotnewslist && hotnewslist.length>0">
                <router-link tag="div" :to="{name:'newsdetail',query:{article_id:hotnewslist[0].id,game_id:hotnewslist[0].game_id}}" class="themost_info pointer" v-if="hotnewslist" >
                  <img :src="hotnewslist[0].picture" alt="" class="headline_img" @mouseover="changeWhite($event)" @mouseout="changeDefault($event)">
                  <div class="headline_text" >
                    <p class="headline_title">{{hotnewslist[0].title}}</p>
                    <p class="headline_content">{{hotnewslist[0].summary}}</p>
                  </div>
                </router-link>
                <ul class="theothers_info">
                  <router-link :to="{name:'newsdetail',query:{article_id:data.id,game_id:data.game_id}}" tag="li"  v-for="(data,index) in hotnewslist " v-if="index>0" :key="data.id">
                    <p class="info_left"><span class="info_type" :class="'info_type_cl'+newClass[data.category_name]">{{data.category_name}}</span> <span class="info_content ">{{data.title}}</span></p>
                    <p class="info_left info_time">{{data.publish_time.substring(5,10)}}</p>
                  </router-link>
                </ul>
              </div>
              <div class="noData" v-else style="margin:398px auto;">暂无数据,敬请期待~</div>
            </div>
            <!-- 热门资讯结束 -->

            <!-- 热门商品开始 -->
            <div class="popular_goods">
              <div class="part_title">热门商品</div><div class="compete-mine-recharge" @click="openRecharge">充值</div>
              <ul class="goods_show" v-if="recomgoodslist && recomgoodslist.length>0">
                <router-link tag="li" to="mall" v-for="(data) in recomgoodslist" :key="data.id" @mouseover.native="showtip($event)" @mouseout.native="hidetip($event)" @click.native="tiphides($event)">
                  <div class="normal_item" :class="{special_item:data.category==3}">
                    <img :src="data.product_pic"  alt="" class="normal_item_img" :class="{special_item_img:data.category==3}">
                    <div class="normal_item_info" :class="{special_item_info:data.category==3}">
                      <div class="item_info_wrap">
                        <p class="item_name">{{data.product_name}}</p><p class="item_price">{{thousandBitSeparator(data.cprice)}}c</p>
                      </div>
                    </div>
                  </div>
                  <div class="tip"  ref="testshow" :class="{special_tip:data.category==3}">
                    <div class="tiptop" ref="aaa">
                      <i  class="tipimg i1" v-if="data.game_id==1"></i>
                      <i  class="tipimg i2" v-if="data.game_id==2"></i>
                      <i  class="tipimg i3" v-if="data.game_id==3"></i>
                      <i  class="tipimg i4" v-if="data.game_id==4"></i>
                     <p class="tipname"> {{data.product_name}}</p>
                    </div>
                    <p class="tipquality"  :class="`tiplv-${data.quality}`">{{quality[data.quality-1]}}</p>
                    <p class="tipprice theme_color" >售价:{{thousandBitSeparator(data.cprice)}} C</p>
                 </div>
                </router-link>
              </ul>
              <div class="noData" v-else style="margin:298px auto;">暂无数据,敬请期待~</div>
            </div>
            <!-- 热门商品结束 -->

          </div>
          <!-- 左部分结束 -->
          <!-- 右部分开始 -->
          <div class="section_right">
            <!-- 战略合作开始 -->
            <div class="cooperation">
              <div class="part_title">战略合作</div>
              <div class="coop">
                <div class="swiper-container" v-if="eventcenterlist && eventcenterlist.length>0">
                  <swiper :options="swiperOption_coop" ref="mySwiper_coop">
                    <swiper-slide v-for='data in eventcenterlist' :key='data.id'>
                      <a :href="data.url" target="_blank">
                        <img :src="data.img_uri" :title="data.title">
                        <h3>{{data.title}}</h3>
                      </a>
                    </swiper-slide>
                    <div class="swiper-button-prev " slot="button-prev"></div>
                    <div class="swiper-button-next " slot="button-next"></div>
                  </swiper>
                </div>
                <div class="noData" v-else >暂无数据,敬请期待~</div>
              </div>
            </div>
            <!-- 战略合作结束 -->

            <!-- 财富榜开始 -->
              <div class="fortune_list" >
                <div v-if="richlistofbefore && richlistofbefore.length>0">
                  <div class="special_three" >
                    <div class="forturn_first" >
                      <img :src="richlistofbefore[0].user.avatar" alt="" class="first_img special_img"  @mouseover="fortuneshowtip($event)" @mouseout="fortunehidetip($event)">
                      <p class="first_cprice special_cprice">{{thousandBitSeparator(richlistofbefore[0].cai)}}</p>
                      <p class="first_username special_username">{{strIntercept(richlistofbefore[0].user.name)}}</p>
                      <!-- 提示框开始 -->
                      <div class="tip special_tip" ref="testshow">
                        <div class="aaa" ref="aaa">
                          <img :src="richlistofbefore[0].user.avatar" alt="" class="fleft tipimg" v-if="richlistofbefore[0].user.vip_level==0">
                          <img :src="richlistofbefore[0].user.avatar" alt="" class="fleft tipimg yellowborder" v-if="richlistofbefore[0].user.vip_level>=1">
                          <div class="tipright">
                            <img :src="require('@/assets/images/mygrand/viplevel/v-17-'+(richlistofbefore[0].user.vip_level)+'.png')" alt="" class="testvip fleft" v-if="richlistofbefore[0].user.vip_level>=1">
                            <p class="tipname"> {{strIntercept(richlistofbefore[0].user.name)}}</p>
                            <p class="tipvip theme_color">LV{{richlistofbefore[0].user.level}}</p>
                          </div>
                        </div>
                        <p class="tipc">拥有: <span class="tipname">{{thousandBitSeparator(richlistofbefore[0].cai)}}</span> <span class="theme_color">C</span></p>
                        <p class="tipsign">个人签名</p>
                        <p class="tipcontent wd-break">{{richlistofbefore[0].user.bio}}</p>
                      </div>
                      <!-- 提示框结束 -->
                    </div>
                    <div class="forturn_two">
                      <img :src="richlistofbefore[1].user.avatar" alt="" class="first_img special_img" @mouseover="fortuneshowtip($event)" @mouseout="fortunehidetip($event)">
                      <p class="first_cprice special_cprice">{{thousandBitSeparator(richlistofbefore[1].cai)}}</p>
                      <p class="first_username special_username">{{strIntercept(richlistofbefore[1].user.name)}}</p>
                      <!-- 提示框开始 -->
                      <div class="tip special_tip_2" ref="testshow">
                        <div class="aaa" ref="aaa">
                          <img :src="richlistofbefore[1].user.avatar" alt="" class="fleft tipimg" v-if="richlistofbefore[1].user.vip_level==0">
                          <img :src="richlistofbefore[1].user.avatar" alt="" class="fleft tipimg yellowborder" v-if="richlistofbefore[1].user.vip_level>=1">
                          <div class="tipright">
                            <img :src="require('@/assets/images/mygrand/viplevel/v-17-'+(richlistofbefore[1].user.vip_level)+'.png')" alt="" class="testvip fleft" v-if="richlistofbefore[1].user.vip_level>=1">
                            <p class="tipname"> {{strIntercept(richlistofbefore[1].user.name)}}</p>
                            <p class="tipvip theme_color">LV{{richlistofbefore[1].user.level}}</p>
                          </div>
                        </div>
                        <p class="tipc">拥有: <span class="tipname">{{thousandBitSeparator(richlistofbefore[1].cai)}}</span> <span class="theme_color">C</span></p>
                        <p class="tipsign">个人签名</p>
                        <p class="tipcontent wd-break">{{richlistofbefore[1].user.bio}}</p>
                      </div>
                      <!-- 提示框结束 -->
                    </div>
                    <div class="forturn_three">
                      <img :src="richlistofbefore[2].user.avatar" alt="" class="first_img special_img" @mouseover="fortuneshowtip($event)" @mouseout="fortunehidetip($event)">
                      <p class="first_cprice special_cprice">{{thousandBitSeparator(richlistofbefore[2].cai)}}</p>
                      <p class="first_username special_username">{{strIntercept(richlistofbefore[2].user.name)}}</p>
                      <!-- 提示框开始 -->
                      <div class="tip special_tip_2" ref="testshow">
                        <div class="aaa" ref="aaa">
                          <img :src="richlistofbefore[2].user.avatar" alt="" class="fleft tipimg" v-if="richlistofbefore[2].user.vip_level==0">
                          <img :src="richlistofbefore[2].user.avatar" alt="" class="fleft tipimg yellowborder" v-if="richlistofbefore[2].user.vip_level>=1">
                          <div class="tipright">
                            <img :src="require('@/assets/images/mygrand/viplevel/v-17-'+(richlistofbefore[2].user.vip_level)+'.png')" alt="" class="testvip fleft" v-if="richlistofbefore[2].user.vip_level>=1">
                            <p class="tipname"> {{strIntercept(richlistofbefore[2].user.name)}}</p>
                            <p class="tipvip theme_color">LV{{richlistofbefore[2].user.level}}</p>
                          </div>
                        </div>
                        <p class="tipc">拥有: <span class="tipname">{{thousandBitSeparator(richlistofbefore[2].cai)}}</span> <span class="theme_color">C</span></p>
                        <p class="tipsign">个人签名</p>
                        <p class="tipcontent wd-break">{{richlistofbefore[2].user.bio}}</p>
                      </div>
                      <!-- 提示框结束 -->
                    </div>
                  </div>
                  <ul class="fortune_list_ul" >
                    <li v-for=' (data,index)  in richlistofbefore' :key="data.id" v-if="index>2" class="default">
                      <p class="forturn_left">
                        <span class="rank">{{index+1}}</span>
                        <img :src="data.user.avatar" alt="" class="user_img yellowborder" @mouseover="imgshowtip($event)" @mouseout="imghidetip($event)" v-if="data.user.vip_level>=1">
                        <img :src="data.user.avatar" alt="" class="user_img" @mouseover="imgshowtip($event)" @mouseout="imghidetip($event)" v-else>
                        <img :src="require('@/assets/images/mygrand/viplevel/v-13-'+(data.user.vip_level)+'.png')" alt="" class="showsvip fleft" v-if="data.user.vip_level>=1">
                        <span class="user_name">{{strIntercept(data.user.name)}}</span><span class="user_level">Lv{{data.user.level}}</span>
                      </p>
                      <p class="user_cainum">{{thousandBitSeparator(data.cai)}}c</p>
                      <!-- 提示框开始 -->
                      <div class="tip" ref="testshow">
                          <div class="aaa" ref="aaa">
                            <img :src="data.user.avatar" alt="" class="fleft tipimg" v-if="data.user.vip_level==0">
                            <img :src="data.user.avatar" alt="" class="fleft tipimg yellowborder" v-if="data.user.vip_level>=1">
                            <div class="tipright">
                              <img :src="require('@/assets/images/mygrand/viplevel/v-17-'+(data.user.vip_level)+'.png')" alt="" class="testvip fleft" v-if="data.user.vip_level>=1">
                              <p class="tipname"> {{strIntercept(data.user.name)}}</p>
                              <p class="tipvip theme_color">LV{{data.user.level}}</p>
                            </div>
                          </div>
                          <p class="tipc">拥有: <span class="tipname">{{thousandBitSeparator(data.cai)}}</span> <span class="theme_color">C</span></p>
                          <p class="tipsign">个人签名</p>
                          <p class="tipcontent wd-break">{{data.user.bio}}</p>
                      </div>
                      <!-- 提示框结束 -->
                    </li>
                  </ul>
                </div>
                <div class="noData" v-else style="margin:428px auto;">暂无数据,敬请期待~</div>
                <div class="comepte-onthelist" @click="fnOnthelist"></div>
              </div>
            <!-- 财富榜结束 -->

            <!-- 热门兑换开始 -->
              <div class="exchange">
                <div class="part_title">热门兑换</div>
                <div class="exchange_main">
                  <div class="swiper-container" v-if="bswiperlist && bswiperlist.length>0" >
                    <swiper :options="swiperOption_exchange" ref="mySwiper_exchange" style="padding-top:40px;">
                      <swiper-slide v-for="(data) in exchangelist" :key="data.id">
                        <router-link tag="div" to="mall" class='anone'>
                          <!-- <a href="http://www.api.com/home" target="_blank" class='anone' > -->
                            <img :src="data.product_pic" class="exchange_img">
                            <div class="bmask">
                                <p class="item_name">{{data.product_name}}</p>
                                <p class="item_cprice">{{thousandBitSeparator(data.cprice)}}c</p>
                            </div>
                          <!-- </a> -->
                        </router-link>
                      </swiper-slide>
                      <div class="swiper-pagination"  slot="pagination"></div>
                    </swiper>
                  </div>
                  <div class="noData" v-else>暂无数据,敬请期待~</div>
                </div>
              </div>
            <!-- 热门兑换结束 -->
          </div>
          <!-- 右部分结束 -->
        </div>
        <!-- 剩余总体部分结束 -->

    </div>
    <!-- 居中显示 -->
    <!-- <img src="../assets/images/competeImg/guess_logoS.png" alt=""> -->
  </div>
</template>

<script>
  import { swiper, swiperSlide } from 'vue-awesome-swiper';
  import config from '../common/http-config.js';
  import {getStore,getCookie} from '@/utils/storage';
  import router from "@/router";
  export default {
    data() {
      return {
        newClass:{
          '赛事新闻':1,
          '八卦娱乐':2,
          '游戏资讯':3,
          '更新日志':4,
          '推荐买点':5},
        swiperOption: {
          speed: 2000,
          loop:true,
          autoplay: {
            delay: 2000,
            disableOnInteraction:false
          },
          pagination: {
            el: '.swiper-pagination',
            type: 'bullets',
            clickable: true,
          },
          prevButton:true,
          grabCursor : true,
          nextButton:true,
          preventClicks:true,
          navigation: {
              nextEl: '.swiper-button-next',
              prevEl: '.swiper-button-prev',
              disabledClass: 'my-button-disabled',
          },
          observer:true,//修改swiper自己或子元素时，自动初始化swiper
          observeParents:true,
        },
        tabs:['平台公告','世界喊话'],
        num: 0,
        // prediction_tabs:[{tab:'全部赛事',game:'all',path:''},{tab:'英雄联盟',game:'lol',path:''},{tab:'DOTA2',game:'dota',path:''},{tab:'绝地求生',game:'pubg',path:''},{tab:'CS:GO',game:'csgo',path:''},{tab:'体育赛事',game:'football',path:''}],
        prediction_tabs:[{tab:'全部赛事',game:'all',path:''},{tab:'英雄联盟',game:'lol',path:''},{tab:'DOTA2',game:'dota',path:''},{tab:'王者荣耀',game:'wzry',path:''},{tab:'CS:GO',game:'csgo',path:''},{tab:'体育赛事',game:'football',path:''}],
        prediction_num:0,
        swiperOption_quiz:{
          speed: 2000,
          loop:true,
          slidesPerView : 4,
          slidesPerGroup : 1,
          prevButton:true,
          grabCursor : true,
          nextButton:true,
          preventClicks:true,
          navigation: {
              nextEl: '.swiper-button-next',
              prevEl: '.swiper-button-prev',
              // disabledClass: 'my-button-disabled',
          },
          observer:true,//修改swiper自己或子元素时，自动初始化swiper
          observeParents:true,
        },
        ismulti:false,
        caiprice:1234567,
        swiperOption_coop: {
          speed: 2000,
          loop:true,
          // autoplay: {
          //   delay: 8000,
          //   disableOnInteraction: false
          // },
          prevButton: true,
          grabCursor: true,
          nextButton: true,
          preventClicks: true,
          navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
            disabledClass: 'my-button-disabled',
          },
          observer:true,//修改swiper自己或子元素时，自动初始化swiper
          observeParents:true,
        },
        swiperOption_exchange: {
          speed: 1000,
          loop:true,
          autoplay:false,
          pagination: {
            el: '.swiper-pagination',
            type: 'bullets',
            clickable: true,
          },
          prevButton:true,
          grabCursor : true,
          nextButton:true,
          preventClicks:true,
          observer:true,//修改swiper自己或子元素时，自动初始化swiper
          observeParents:true,
          initialSlide :2,
          effect : 'coverflow',
          slidesPerView: 3,
          centeredSlides: true,
          coverflowEffect: {
            rotate: 30,
            depth: 60,
            modifier: 2,
            slideShadows : false
          },
        },
        isChecked: false,
        isensure: false,
        getworldtalkdata: [],
        ws: null,
        isLoad: false,
        howlong:30,
        hotcompetelistdata:[],
        quality:['普通','优质','稀有','传说','不朽','永恒'],
        countDown:null,
        guessPage:1,
        currentGame:'all',
      }
    },
    computed: {
      bswiperlist:function(){
        return this.$store.state.home.bswiperlist?this.$store.state.home.bswiperlist:[];
      },
      eventcenterlist: function() {
        return this.$store.state.home.eventcenterlist ? this.$store.state.home.eventcenterlist : [];
      },
      getannouncedatalist:function(){
        return this.$store.state.home.getannouncedatalist?this.$store.state.home.getannouncedatalist:[];
      },
      announcetime(){
        return this.$store.state.home.getannouncedatalist.created_at.substring(5,10);
      },
      iswait30s(){
        let timer=null;
        if(this.$store.state.home.iswait30s==true){

          if(timer){

          }else{
            timer = setInterval(()=>{
              if(this.howlong>0){
                this.howlong--
              }else{
                this.howlong=0
                this.$store.commit('wait30s',false)

                clearInterval(timer)
              }
            },1000)
          }
        }else{
          this.howlong=30
          clearInterval(timer)
        }
        return this.$store.state.home.iswait30s ? this.$store.state.home.iswait30s : false;
      },
      isSigninDiaShow(){
        return this.$store.state.home.isSigninDiaShow ? this.$store.state.home.isSigninDiaShow :null;
      },
      backendstatus(){
        return this.$store.state.home.backendstatus ? this.$store.state.home.backendstatus : null;
      },
      hotcompetelist:function(){
          return this.$store.state.home.hotcompetelist?this.$store.state.home.hotcompetelist:[];
      },
      hotnewslist:function(){
        return this.$store.state.home.hotnewslist?this.$store.state.home.hotnewslist:[];
      },
      recomgoodslist:function(){
        return this.$store.state.home.recomgoodslist?this.$store.state.home.recomgoodslist:[];
      },
      richlistofbefore:function(){
        return this.$store.state.home.richlistofbefore?this.$store.state.home.richlistofbefore:[];
      },
      exchangelist:function(){
        return this.$store.state.home.exchangelist?this.$store.state.home.exchangelist:[];
      },
      quizData(){
        return this.$store.state.home.hotcompetelist || null ;
      }
    },
    mounted() {
      this.$store.dispatch("bswiperdispatch");
      this.$store.dispatch("eventcenterdispatch");
      this.$store.dispatch('getannouncedatadis');
      if(this.isLoad == false) {
        setTimeout(()=>{
          this.getMessages(this)
        },500);
        if(!this.countDown){
          this.countDown = setInterval(()=>{
            this.initWebSocket();
          },61000);
        }
      }
      let guessParams = {
        game:'all',
        status:'open',
        page:1,
      };
      this.$store.dispatch('hotcompetedispatch',guessParams);
      this.$store.dispatch("hotnewslistdispatch");
      this.$store.dispatch("recomgoodslistdispatch");
      this.$store.dispatch("richlistdispatch");
      this.$store.dispatch('exchangedispatch');
      setTimeout(() => {
        this.hotcompetelistdata = this.$store.state.home.hotcompetelist;
        this.getworldtalkdata = this.$store.state.home.getworldtalkdata;
        if(!this.hotcompetelistdata){
          setTimeout(() => {
            this.hotcompetelistdata = this.$store.state.home.hotcompetelist;
          }, 500);
        }
        console.log(this.hotcompetelistdata,'没有');
        if(!this.getworldtalkdata){
          setTimeout(() => {
            this.getworldtalkdata = this.$store.state.home.getworldtalkdata;
          }, 500);
        }
      }, 800);
    },
    methods: {
      tab(index) {//tab切换
          this.num = index;
          if(this.num==1){
            this.$store.dispatch('getworldtalkdis');
          }
      },
      predictiontab(game,index){//预测tab切换
          this.hotcompetelistdata=[];
          this.prediction_num=index;
          this.guessPage = 1;
          this.currentGame = game;
          let guessParams = {
            game,
            status:'open',
            page:this.guessPage,
          };
          this.$store.dispatch('hotcompetedispatch',guessParams);
          setTimeout(() => {
             console.log(this.$store.state.home.hotcompetelist,'这边是几条');
             this.hotcompetelistdata = this.$store.state.home.hotcompetelist;
          }, 300);

      },
      initWebSocket: function() {//世界喊话-websocktet初始化
        if (this.ws) {
          this.ws.close()
          this.ws=null;
        }
        this.ws = new WebSocket(`${config.websocket}?channel=world`);
        this.ws.onmessage = this.onMessage;
      },
      getMessages(that){//世界喊话-websocket获取消息
        let date= new Date();
        console.log( this.$store.state.home.getworldtalkdata,'top没有？');
        this.getworldtalkdata = this.$store.state.home.getworldtalkdata ? this.$store.state.home.getworldtalkdata : [];
        console.log(this.getworldtalkdata,'bottom没有？');
        this.isLoad = true;
        if(this.getworldtalkdata.length>10){
          let max = this.getworldtalkdata.length-10;
          for(let i=0;i<max;i++){
            this.getworldtalkdata.shift();
          }
        }
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
        this.openRecharge();
      },
      onMessage: function(event) {//世界喊话-websocket接收数据
        let message = JSON.parse(event.data);
        let _self =this;
        if(message){
          if(message.channel == 'world') {
            let params = {
              id: message.message.id,
              uid: message.sender.id,
              nickname: message.sender.nickname,
              content: message.message.content,
              created_at: message.message.sent_at,
              channel:message.channel
            };
            _self.$store.commit('runninglistmutation',params);
            console.log(_self.$store.state.home.getworldtalkdata,'onmessage这里有吗');
            if(_self.$store.state.home.getworldtalkdata.indexOf(params.id)==-1){
                if(_self.getworldtalkdata.length>6){
                  let max = _self.getworldtalkdata.length-6;
                  for(let i =0; i<max; i++ ){
                    _self.getworldtalkdata.shift();
                  }
              }
              _self.getworldtalkdata.push(params);
            }
          }
        }
      },
      sendcontent() {//世界喊话-发送消息
        let value = this.$refs.talkcontent.value?this.$refs.talkcontent.value:this.$refs.talkcontent[0].value;
        let valueLen = value.replace(/[^\x00-\xff]/g,"01").length;
        if(valueLen>120){
          let dataOption ={
            'masseges':'最多不超过60个汉字或120个字符哦~',
            'type':'2',
          }
          this.$store.commit('isSigninPupopDis',true);
          this.$store.commit('isSigninPupopDis',dataOption);
        }else{
          if(this.isChecked == false) {
            this.$store.commit('isSigninDiaShowDis', true);
          } else {
            this.$store.dispatch('posttalkdis', {
              message: value
            })
          }
          this.$store.dispatch("userInfo");
        }
      },
      valueempty(){//世界喊话-清空输入框
        setTimeout(()=>{
          if(this.$store.state.home.isemptyvalue==true){
            // this.$refs.talkcontent.value= '';
            this.$refs.talkcontent[0].value = '';
            this.$store.commit('emptyvalue',false)
          }
        },500)
      },
      isCheck() {//世界喊话-确认框选中
        this.isChecked = !this.isChecked
      },
      choose(value) {//世界喊话-消耗188c确认框
        if(value == 'ensure') {
          let iptvalue = this.$refs.talkcontent.value?this.$refs.talkcontent.value:this.$refs.talkcontent[0].value
          this.$store.dispatch('posttalkdis', {
            message: iptvalue
          })
        }
      },
      closeChild(value) {//世界喊话-关闭弹窗
        this.isensure = value;
      },
      userTexted(event) {//世界喊话-用户输入限制
        let value = this.$refs.talkcontent.value?this.$refs.talkcontent.value:this.$refs.talkcontent[0].value;
        let valueLen = value.replace(/[^\x00-\xff]/g,"01").length;
        if(valueLen>120){
          let dataOption ={
            'masseges':'最多不超过60个汉字或120个字符哦~',
            'type':'2',
          }
          this.$store.commit('isSigninPupopDis',true);
          this.$store.commit('isSigninPupopDis',dataOption);
        }
      },
      strIntercept(str){//用户名-限制
        let reg =/[\u4e00-\u9fa5]/;
        let a,b,newstr;
        if(reg.test(str)){
          if(str.length<=5){
              return str;
          }else{
            a=str.substr(0,2);
            b=str.substr(str.length-2,2);
            newstr = a  + '**' +b;
            return newstr;
          }
        }else{
          if(str.length<=10){
            return str;
          }else{
            a = str.substr(0,5);
            b = str.substr(str.length-2,2);
            newstr = a + '**' + b;
            return newstr;
          }
        }
      },
      showtip(event){//热门商品提示框-划入显示
        let ele = event.currentTarget.childNodes[2];
        ele.style.display='block';
      },
      hidetip(event){//热门商品提示框-划出隐藏
        let ele = event.currentTarget.childNodes[2];
        ele.style.display='none';
      },
      tiphides(event){//热门商品提示框-点击隐藏
        let ele = event.currentTarget.childNodes[2];
        ele.style.display='none';
      },
      imgshowtip(event){//财富榜提示框-划入显示
        let ele = event.target.parentNode.parentNode.childNodes[4];
        ele.style.display='block';
      },
      imghidetip(event){//财富榜提示框-划出隐藏
        let ele = event.target.parentNode.parentNode.childNodes[4];
        ele.style.display='none';
      },
      fortuneshowtip(event){//财富榜提示框-划入显示
        let ele = event.target.parentNode.childNodes[6];
        ele.style.display='block';
      },
      fortunehidetip(event){//财富榜提示框-划出隐藏
        let ele = event.target.parentNode.childNodes[6];
        ele.style.display='none';
      },
      changeWhite(event){//头条划过
        let title = event.target.nextElementSibling.childNodes[0];
        let content = event.target.nextElementSibling.childNodes[2];
        title.style.color="white";
        content.style.color="white";
      },
      changeDefault(event){//头条划过
        let title = event.target.nextElementSibling.childNodes[0];
        let content = event.target.nextElementSibling.childNodes[2];
        title.style.color="#dcdcdc";
        content.style.color="#dcdcdc";
      },
      handleToGuess(id){//预测
        this.$store.commit('mutationIsIndex',1);
        this.$store.commit('mutationIsSendDispath',true);
        router.push(`/guess/${id}`);
      },
      fnPrePage(){//预测-翻页上
        if(this.guessPage<=1){
          this.guessPage = 1;
          return;
        }else{
          this.guessPage--;
        }
        let guessParams = {
          game:this.currentGame,
          status:'open',
          page:this.guessPage,
        };
        this.$store.dispatch('hotcompetedispatch',guessParams);
      },
      fnNextPage(){//预测-翻页下
        let isGuessHasMore = this.$store.state.home.isGuessHasMore;
        if(isGuessHasMore){
          this.guessPage++;
        }else{
          return;
        }
        let guessParams = {
          game:this.currentGame,
          status:'open',
          page:this.guessPage,
        };
        this.$store.dispatch('hotcompetedispatch',guessParams);
        setTimeout(() => {
          this.hotcompetelistdata = this.$store.state.home.hotcompetelist;
        }, 300);
      },
    },
    created() {
      this.initWebSocket();
      this.$store.dispatch('getworldtalkdis');
      // let guessParams = {
      //   game:'all',
      //   status:'open',
      //   page:1,
      // };
      // this.$store.dispatch('hotcompetedispatch',guessParams);
      // setTimeout(() => {
      //   this.hotcompetelistdata = this.$store.state.home.hotcompetelist;
      //   if(!this.hotcompetelistdata){
      //     setTimeout(() => {
      //       this.hotcompetelistdata = this.$store.state.home.hotcompetelist;
      //     }, 500);
      //   }
      // }, 300);
    },
    updated() {
      this.valueempty();
    },
    destroyed() {
       this.hotcompetelistdata = [];
       clearInterval(this.countDown);
    },
  }
</script>

<style scoped lang="scss">
  #home{
    .noData{
      margin:168px auto;
    }
    .banner_announce{//第一部分轮播+公告
      display: flex;
      justify-content: space-between;

      .banner{//banner
        width:768px;
        height: 300px;
      }
      #bswiper{//banner
        .swiper-container {
          width:768px;
          height: 300px;
          margin-left: auto;
          margin-right: auto;
        }
        .swiper-slide {
          text-align: center;
          font-size: 18px;
          background: #fff;
          display: -webkit-box;
          display: -ms-flexbox;
          display: -webkit-flex;
          display: flex;
          -webkit-box-pack: center;
          -ms-flex-pack: center;
          -webkit-justify-content: center;
          justify-content: center;
          -webkit-box-align: center;
          -ms-flex-align: center;
          -webkit-align-items: center;
          align-items: center;
          img{
              width:768px;
              height: 300px;
              display:block;
          }
          .h3{
              position: absolute;
              left:0;
              width:100%;
              text-align:left;
              text-indent:50px;
              bottom:-20px;
              color:#dcdcdc;
              font-size:16px;
              font-weight:400;
              line-height:90px;
              opacity: 1 !important;
              z-index: 2;
          }
        }
        .swiper-pagination{
          height:30px;
          width:168px;
          position:relative;
          left:620px;
          bottom:32px;
          .swiper-pagination-bullet{
            width:20px;
            height:20px;
            opacity:1;
          }
        }
      }

      .announce{//公告+世界喊话
        width:422px;
        height: 300px;
        margin-left: 12px;
        padding-left: 32px;
        background: url("../assets/img/home/announce_bg.png") no-repeat;

        .announce_tab{
          display: flex;
          // margin-top:16px;
          font: 900 14px/26px '\5FAE\8F6F\96C5\9ED1';
          color: #dcdcdc;

          li{
            padding:0 16px;
            line-height: 36px;
          }
        }
        .annouce_active{
          color: #fff;
          position: relative;
          &::after{
            content: "";
            width: 0;
            height: 0;
            border-style: solid;
            border-width: 0 5px 5px 5px;
            border-color: transparent transparent #ffffff transparent;
            position: absolute;
            bottom: 0;
            left: 50%;
            transform: translateX(-50%);
          }
          &::before{
            content: "";
            width: 36px;
            height: 1px;
            border-bottom: 1px solid #fff;
            position: absolute;
            bottom: 0;
            left: 50%;
            transform: translateX(-50%);
          }
        }
        .announce_content{
          width: 388px;
          height: 234px;
          margin-left: -20px;
          overflow-y: auto;
          &::-webkit-scrollbar {
            width:4px;
          }
          &::-webkit-scrollbar-button {
            display: none;
          }
          &::-webkit-scrollbar-track{
            background-color: transparent;
          }
          &::-webkit-scrollbar-thumb{
            background-color: gray;
            border-radius: 2px;
          }
          h3{
           margin-top:14px;
           text-align: center;
           color: #dcdcdc;
           font-size: 14px;
          }
          p{
            overflow: hidden;
            max-height: 260px;
            text-align: left;
            width: 360px;
            margin:10px auto;
            line-height: 24px;
            font-size: 14px;
          }
        }

        #worldtalk {//世界喊话
          height: 300px;
          width: 380px;
          position: relative;
          left: -20px;
          top: 0px;
          overflow: hidden;
        .worldtalkurl {
          position:absolute;
          left:0;
          width:380px;
          height: 204px;
          font-size: 14px;
          padding-left: 10px;
          margin-top: 8px;
          // overflow: hidden;
          overflow-y: auto;
          &::-webkit-scrollbar {
            width:4px;
          }
          &::-webkit-scrollbar-button {
            display: none;
          }
          &::-webkit-scrollbar-track{
            background-color: transparent;
          }
          &::-webkit-scrollbar-thumb{
            background-color: gray;
            border-radius: 2px;
          }
          ul{
            position:absolute;
            bottom:0px;
            left:0;
            height: 210px;
          }
          li {
            width: 100%;
            color: #989898;
            text-align: left;
            display:-webkit-box;
            line-height: 24px;
            padding-left: 8px;
            span{
              display:inline-block;
              // max-width:94px;
              overflow:hidden;
              text-overflow:ellipsis;
              white-space: nowrap;
              vertical-align: -4px;
            }
          }
          .content {
            color: #fff;
            display:block;
            vertical-align: 0px;
            max-width:310px;
            word-break: break-all;
            -webkit-box-flex: 1;
            white-space: pre-wrap;
            word-wrap: break-word;
            line-height:23px;
            padding:0 0 0px 3px;
          }
        }
        .ipt {
          width: 210px;
          height: 22px;
          background-color: #0a0b0d;
          border: 1px solid #070709;
          line-height: 22px;
          padding-left: 6px;
          color: #989898;
          outline: none;
        }
        .btn {
          width: 34px;
          height: 26px;
          background-color: #313131;
          border: none;
          outline: none;
          background: url("../assets/images/competeImg/icon_send.png") center no-repeat;
          background-size: 34px 24px;
        }
        .btn1 {
          width: 34px;
          height: 26px;
          color: #dcdcdc;
          background-color: #313131;
          border: none;
          outline: none;
          background-size: 34px 24px;
        }
        .btn_send{
          width: 38px;
          height: 24px;
          line-height: 24px;
          text-align: center;
          background: #6e6e6e;
          font-size: 12px;
          color: #b8b8b8;
        }
        .input {
          position: absolute;
          left: 20px;
          bottom: 52px;
        }
        .label{
          margin:4px 0 0 6px;
          font-size: 12px;
          color: #b8b8b8;
        }
        .quickStart {
          width: 64px;
          height: 24px;
          line-height: 22px;
          font-size: 12px;
          text-align: center;
          margin-left: 18px;
          color: #838383;
          border: 1px solid #838383;
        }
        .testquick{
          position: relative;
          top:-2px;
        }
      }
      }
    }

    .prediction{//第二部分预测
      width:100%;
      height: 408px;
      margin:24px 0 48px 0 ;
      .prediction_tab{//预测导航条
        width: 100%;
        height: 70px;
        display: flex;
        background: url("../assets/img/home/home_quiz_bg.png") no-repeat;
        margin-bottom: 34px;
        padding-left: 217px;
        color:#dcdcdc;
        font-size: 14px;
        li{
          width:126px;
          text-align: center;
          margin:36px 0px 0 0px;
          padding-top: 8px;
          &:nth-child(1){
              background-position: -3px -3px;
          }
          &:nth-child(2){
              background-position: -2px -3px;
              margin-left:1px;
          }
          &:nth-child(3){
              background-position: 0px -3px;
              margin-left:2px;
          }
          &:nth-child(4){
              background-position: 1px -3px;
              margin-left:1px;
          }
          &:nth-child(5){
              background-position: -1px -3px;
              margin-left:3px;
          }
          &:nth-child(6){
              background-position: 0px -3px;
              margin-left:1px;
          }
          &:hover{
            background: url("../assets/img/home/home_quiz_li_bg.png") center no-repeat;
          }
        }
      }
      .prediction_tab_content{//预测主体
        width: 100%;
        height: 300px;
        .prediction_content{//预测轮播图
           .swiper-container{
                .swiper-wrapper{
                  display: flex;
                  justify-content: space-around;
                }
                .swiper_wraps{
                  padding-left: 0px;
                  display: flex;
                  justify-content: space-around;
                  .swiper_block{
                    width: 252px !important;
                    margin:0 30px 0 19px;
                  }
                }
                .swiper-button-prev{
                  background:url("../assets/img/home/ecleft.png") no-repeat;
                  left:0px;
                }
                .swiper-button-next{
                  background:url("../assets/img/home/ecright.png") no-repeat;
                  right:-20px;
                }
                .nextArrow{
                  display: none;
                }
              .block_quiz{//预测小块
                // width:276px;
                // width:260px;
                height: 300px;
                .game_icon{//游戏图标
                  width:17px;
                  height: 17px;
                  display: block;
                  margin:0 auto;
                  margin-top:18px;
                  // background: url("../assets/img/small_pic/c_g_img.png") no-repeat;
                  background: url("../assets/images/competeImg/guess_logoS.png") no-repeat;
                  background-size: cover;
                }
                .game_icon1{
                  background-position: -32px 0px;
                  // background-position: 0 -77px;
                }
                .game_icon2{
                  background-position: -5px 0px;
                  // background-position: 0 -16px;
                }
                .game_icon3{
                  background-position: -87px 0px;
                  // background-position: 0 0px;
                }
                .game_icon4{
                  width: 20px;
                  height: 12px;
                  background-position: -39px 0px;
                  // background-position: 0 -130px;
                }
                .game_icon5{
                  background-position: -114px 0px;
                  // background-position: 0 -120px;
                }
                .game_icon6{
                  background-position: -114px 0px;
                  // background-position: 0 -120px;
                }
                .game_icon7{
                  // background-position: -114px 0px;
                  // background-position: 0 -120px;
                  display: inline-block;
                  width: 32px;
                  height: 22px;
                  background: url("../assets/images/matchcenter/wzry_icon_lh.png") no-repeat;
                }
                .quiz_time{
                  font:18px/24px '\5FAE\8F6F\96C5\9ED1';
                  color: #dcdcdc;
                  text-align: center;
                  margin-top:8px;
                }
                .quiz_status{
                  font: 14px/22px '\5FAE\8F6F\96C5\9ED1';
                  color: #21f3fa;
                  text-align: center;
                  margin-bottom: 10px;
                }
                .quiz_team{//战队信息
                  display: flex;
                  justify-content: space-around;
                  .multiteam{
                    .multi_team_name{
                      // background: url("../assets/img/home/game_name_bg.png") center no-repeat;
                      background: url("../assets/img/home/game_name_bg_hover.png") center no-repeat;
                    }
                    &:nth-child(1){
                      .team_logo{
                        margin-left:54px;
                      }
                      .multi_team_name{
                        background-position: 42px 0px;
                        text-align: right;
                        padding-right: 0px;
                      }
                    }
                    &:nth-child(2){
                      .multi_team_name{
                        background-position: -90px 0px;
                        text-align: center;
                      }
                    }
                    &:nth-child(3){
                      .team_logo{
                        margin-right:54px;
                      }
                      .multi_team_name{
                        background-position: -233px 0px;
                        text-align: left;
                      }
                    }
                  }
                  .team_logo{
                    width:64px;
                    height: 64px;
                    display: block;
                    margin:0 auto;
                    span{
                       width:64px;
                      height: 64px;
                    }
                  }

                  .test_vs{
                    font: 900 18px/22px '\5FAE\8F6F\96C5\9ED1';
                    color:#fff;
                    margin-top:64px;
                  }
                  .team_name{
                    width:118px;
                    height: 40px;
                    color: #fff;
                    font:900 14px/40px '\5FAE\8F6F\96C5\9ED1';
                    margin-top:6px;
                  }
                  .margin_2px{
                    margin-top: 2px;
                  }
                  .margin_6px{
                    margin-top: 6px;
                  }
                  .team_name_left{
                    background: url("../assets/img/home/team_a.png") 100% no-repeat;
                    text-align: center;
                  }
                  .team_name_right{
                    background: url("../assets/img/home/team_b.png") 0% no-repeat;
                    text-align: center;
                  }

                }
                .block_up{
                  height: 204px;
                  // width:276px;
                  // width:260px;
                  overflow: hidden;
                }
                .block_up1{//dota
                  background: url("../assets/img/home/quiz-bg-dota2.png") no-repeat;
                  &:hover{
                    background: url("../assets/img/home/quiz-bg-dota2_hover.png") no-repeat;
                  }
                }
                .block_up2{//lol
                  background: url("../assets/img/home/quiz-bg-lol.png") no-repeat;
                  &:hover{
                    background: url("../assets/img/home/quiz-bg-lol_hover.png") no-repeat;
                  }
                }
                .block_up3{//csgo
                  background: url("../assets/img/home/quiz-bg-csgo.png") no-repeat;
                  &:hover{
                    background: url("../assets/img/home/quiz-bg-csgo_hover.png") no-repeat;
                  }
                }
                .block_up4{//pubg
                  background: url("../assets/img/home/quiz-bg-pubg.png") no-repeat;
                  &:hover{
                    background: url("../assets/img/home/quiz-bg-pubg_hover.png") no-repeat;
                  }
                }
                .block_up5{//sport
                  background: url("../assets/img/home/quiz-bg-sport.png") no-repeat;
                  &:hover{
                    background: url("../assets/img/home/quiz-bg-sport_hover.png") no-repeat;
                  }
                }
                .block_up6{//sport
                  background: url("../assets/img/home/quiz-bg-sport.png") no-repeat;
                  &:hover{
                    background: url("../assets/img/home/quiz-bg-sport_hover.png") no-repeat;
                  }
                }
                .block_up7{//sport
                  background: url("../assets/img/home/quiz_bg_wzry.png") no-repeat;
                  &:hover{
                    background: url("../assets/img/home/quiz_bg_wzry_hover.png") no-repeat;
                  }
                }
                .block_btm{
                  height: 94px;
                  background: #2f2f33;
                  overflow: hidden;

                  .game_info{
                    font:13px/18px '\5FAE\8F6F\96C5\9ED1';
                    // margin:12px 0;
                    margin:12px 0 -1px 0;
                    color:#fff;
                    text-align: center;
                  }
                  .partin_btn{
                    width:110px;
                    height: 40px;
                    margin:0 auto;
                    color: #fff;
                    text-align: center;
                    background: url("../assets/img/home/partin_btn.png") no-repeat;
                    background-size: cover;
                    line-height: 46px;
                    font-size: 14px;
                    text-shadow: 1px 0px 10px #4e2711;
                    &:hover{
                      background: url("../assets/img/home/partin_btn_hover.png") no-repeat;
                      background-size: cover;
                    }
                  }
                }
              }
           }
        }
        .testNo{
          display: none;
        }
      }
    }

    .home_main{//第三部分主体
      display: flex;
      // margin-top: 26px;
      .section_left{//left

        .popular_info{//热门资讯
          width: 712px;
          height: 832px;
          margin-bottom: 48px;

          .themost_info{//头条
            width:700px;
            height: 426px;
            background: url("../assets/img/home/headline.png")  no-repeat;
            padding:48px 12px;
            position: relative;
            .headline_img{//头条-图片
              width:672px;
              height: 360px;
              display: block;
            }

            .headline_text{
              width:672px;
              height: 96px;
              background: #37373c;
              opacity: .9;
              position: absolute;
              bottom: 18px;
              z-index: 2;
              padding: 20px 0 0 24px;
              &:hover{
                .headline_title,.headline_content{
                  color: #fff;
                }
              }
              .headline_title{
                font: 900 15px '\5FAE\8F6F\96C5\9ED1';
                color: #dcdcdc;
                text-align: left;
              }

              .headline_content{
                font:12px '\5FAE\8F6F\96C5\9ED1';
                color: #dcdcdc;
                overflow : hidden;
                text-overflow: ellipsis;
                display: -webkit-box;
                -webkit-line-clamp: 2;
                -webkit-box-orient: vertical;
                text-align: left;
              }
            }
          }

          .theothers_info{//其余几条新闻
            height:340px;
            margin-top:24px;
            li{
              height:40px ;
              display: flex;
              justify-content: space-between;

              &:hover{
                background: url("../assets/img/home/news_li.png") no-repeat;
                .info_type{
                  background: #fff;
                  color: #c17705 !important;
                  font-weight:bold;

                }
                .info_content,.info_time{
                  color: #fff;
                }
              }

              .info_type{
                display: inline-block;
                width:52px;
                height: 20px;
                border:1px solid #464646;
                border-radius: 2px;
                font: 12px/18px '\5FAE\8F6F\96C5\9ED1';
                color: #dcdcdc;
                text-align: center;
                margin-left: 12px;
                &.info_type_cl1{
                  color:#10caff

                }
                &.info_type_cl2{
                  color:#ffd040

                }
                &.info_type_cl3{
                  color:#14d9cf

                }
                &.info_type_cl4{
                  color:#896fee

                }
                &.info_type_cl5{
                  color:#eb4432

                }
              }
              .info_content{
                font: 14px/40px '\5FAE\8F6F\96C5\9ED1';
                color: #dcdcdc;
                padding-left: 10px;
              }
              .info_time{
                font: 12px/40px '\5FAE\8F6F\96C5\9ED1';
                color: #dcdcdc;
                padding-right: 20px;
              }
            }
          }
        }

        .popular_goods{//热门商品
          width:710px;
          padding-bottom: 10px;position:relative;top:0;left:0;
          .goods_show{//商品展示
            display: flex;
            justify-content: space-around;
            margin-top: 26px;
            flex-wrap: wrap;
            li{
              margin-bottom:24px;
              position: relative;
              .tip{
                width:190px;
                height: 88px;
                font-size: 14px;
                line-height: 20px;
                position: absolute;
                left: 168px;
                top:0px;
                z-index:8208;
                padding: 3px;
                text-align: left;
                background: url('../assets/images/Mall-images/mall-case.png') no-repeat;
                background-size: 190px 88px;
                padding-left: 20px;
                display: none;
                .tipimg{
                  padding: 0;
                  margin:0;
                  width: 18px !important;
                  height: 18px !important;
                  margin-left: 20px;
                  position: absolute;
                  left: 20px;
                  top:13px;
                  display: block;
                  background:url('../assets/images/competeImg/guess_logoS.png') no-repeat;
                }
                .i1{
                  background-position:-42px -4px;
                }
                .i2{
                  background-position:-6px 0;
                }
                .i3{
                  background-position:-102px 0;
                }
                .i4{
                  background-position:-68px 0;
                }
                .tipname{
                  margin: 8px 0px 8px 40px;
                }
                .tipprice{
                  margin-top:30px;
                  text-align: center;
                  // color: #8bd102;
                }
              }
              .special_tip{
                left: 348px;
              }
            }
            .item_name{//商品名
              text-align: center;
              font:15px '\5FAE\8F6F\96C5\9ED1';
              color: #b0b0b0;
            }
            .item_price{//商品价格
              text-align: center;
              font:14px '\5FAE\8F6F\96C5\9ED1';
              color: #dcdcdc;
            }
            .normal_item{//普通商品
              width:168px;
              height: 244px;
              position: relative;
              .normal_item_img{
                width:136px;
                height: 216px;
                display: block;
                margin:11px 0 0 16px;
              }
              .normal_item_info{
                width:168px;
                height: 244px;
                background: url("../assets/img/home/goods_normal.png") no-repeat;
                position: absolute;
                bottom: 10px;
                &:hover{
                  background: url("../assets/img/home/mall_hover_small.png") no-repeat;
                  .item_name{
                    color:#fff !important;
                  }
                  .item_price{
                    color: #c38e2a !important;
                  }
                }
                .item_info_wrap{
                  width: 100%;
                  position: absolute;
                  bottom: 24px;
                  left:50%;
                  transform: translateX(-50%);
                }
              }

            }
            .special_item{//特殊物品
              width:348px;
              height: 244px;
              position: relative;
              .special_item_img{
                width:318px;
                height: 216px;
                padding: 21px 59px;
                display: block;
                background: url("../assets/img/home/treasure_bg.png") center no-repeat;
              }
              .special_item_info{
                width:348px;
                height: 244px;
                position: absolute;
                bottom: 10px;
                background: url("../assets/img/home/goods_special.png") no-repeat;
                &:hover{
                  background: url("../assets/img/home/mall_hover_big.png") no-repeat;
                }
                .item_info_wrap{
                  width: 100%;
                  position: absolute;
                  bottom: 24px;
                  left:50%;
                  transform: translateX(-50%);
                }
              }
            }
          }
        }
      }

      .section_right{//right
        margin-left: 36px;

        .cooperation{//战略合作
          width:456px;
          height: 338px;
          margin-bottom: 48px;

          .coop{//战略合作轮播
            width:456px;
            height: 262px;
            margin-top: 24px;

            .swiper-container{
              height: 262px;
              position: relative;
              .swiper-button-prev, .swiper-button-next{
                top:90%;
                margin-top:-16px;
              }
              .swiper-button-prev{
                background:url("../assets/img/home/ecleft.png") no-repeat;
              }
              .swiper-button-next{
                background:url("../assets/img/home/ecright.png") no-repeat;
              }
              img{
                width: 456px;
                height: 262px;
                display: block;
              }
              h3{
                width:100%;
                position: absolute;
                bottom: 0;
                color: #fff;
                font:900 16px/54px '	\5FAE\8F6F\96C5\9ED1';
                text-align: center;
                background: #37373c;
                opacity: .8;
                height: 54px;
              }
            }
          }
        }

        .fortune_list{//财富榜
          width:600px;
          // height: 764px;
          height: 800px;
          background: url("../assets/img/home/fortunebg.png") no-repeat;
          overflow: hidden;
          position: absolute;
          z-index: 8207;
          .tip{//消息框
            width:206px;
            height: 232px;
            line-height: 20px;
            position: absolute;
            left: 84px;
            top:-12px;
            z-index:2;
            background: #15161a;
            text-align: left;
            padding: 13px 0 0 20px;
            font-size: 14px;
            background: url('../assets/images/richlisttip.png') no-repeat;
            color: #808081;
            display: none;
            .yellowborder{
              border:2px solid #ffcc01;
            }
            .tipimg{
              width: 50px;
              height: 50px;
              border-radius: 50%;
              margin-right: 20px;
            }
            .tipname{
              color: #dcdcdc;
            }
            .testvip{
              position: absolute;
              left: 39px;
              top: 46px;
            }
            .tipright{
              position: relative;
              left: 0px;
              top:-10px;
              font-size: 14px;
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
                background:url("../assets/images/richlistsign.png") left 5px no-repeat;
                background-size: 8px 12px;
                padding-left: 12px;
            }
            .tipcontent{
                margin-top:12px;
                width: 180px;
                height: 100px;
                line-height: 22px;
            }
          }
          .special_tip{
            left:47px;
            top:11px;
          }
          .special_tip_2{
            left:38px;
            top:-12px;
          }
          .special_three{
            position: relative;
            overflow: hidden;
            display: flex;
            // height: 200px;
            height: 386px;
            // margin-top:50px;
            // margin-top: 70px;
            margin:70px  0 0 22px;
            .special_img{
              display: block;
              border-radius: 50%;
            }
            .special_cprice{
              color: #dfca4c;
              font-family: 'airal-regular';
            }
            .special_username{
              color: #fff;
              font-family: '\5FAE\8F6F\96C5\9ED1-regular';
              font-size: 12px;
            }
            .forturn_first{
              position:absolute;
              // top:40%;
              top:22.8%;
              left:40.3%;
              transform: translateX(-52%);
              margin:0 auto;
              z-index:2;
              .first_img{
                width:50px;
                height: 50px;
                margin-left: -5px;
              }
              .first_cprice{
                font-size: 12px;
                font-weight: 900;
                margin:28px 0 0 -10px;;
              }
              .first_username{
                margin-top: 10px;
                margin-left:-7px;
              }
            }
            .forturn_two,.forturn_three {
              position:absolute;
              // top:58%;
              top:32.3%;
              margin:0 auto;
              .first_img{
                width:36px;
                height: 36px;
              }
              .first_cprice{
                font-size: 12px;
                font-weight: 900;
                margin-top:26px;
                margin-left:-13px;
              }
              .first_username{
                margin-top: 8px;
                margin-left:-10px;
              }
            }
            .forturn_two{
              left:10.6%;
              .first_img{
                margin-left:1px;
              }
            }
            .forturn_three{
              left:61%;
            }
          }
          .fortune_list_ul{
            // margin-top:62px;
            width:456px;
            // margin-top:-124px;
            margin: -136px 0 0 21px;
          }
          li{
            display: flex;
            justify-content: space-between;
            padding: 0 44px;
            position: relative;
            &:nth-child(7){
              .showsvip{
                left: 38px;
              }
              .user_name{
                color: #f99;
              }
            }
            &:hover{
              background: url("../assets/img/home/fortune_hover.png") 16% center no-repeat;
              .user_name{
                color: #fff;
              }
            }
            .forturn_left{
              display: flex;
              position: relative;
              .rank{
                font:  12px/48px 'arial-bold';
                color: #dcdcdc;
              }
              .user_img{
                width:24px;
                height: 24px;
                border-radius: 50%;
                display: block;
                margin:12px 12px 0 6px;
                border:2px
              }
              .yellowborder{
                border:2px solid #ffcc01;
              }
              .showsvip{
                position: absolute;
                left:30px;
                top:26px;
              }
              .user_name{
                font:14px/48px '\5fae\8f6f\96c5\9ed1 regular';
                color: #dcdcdc;
              }
              .user_level{
                font:10px/50px 'arial-bold';
                color: #eb4330;
                margin-left: 6px;
              }
            }
            .user_cainum{
              font:14px/48px '\5fae\8f6f\96c5\9ed1 regular';
              color: #dcdcdc;
            }
          }
        }

        .exchange{//热门兑换
          width: 456px;
          height: 460px;
          // margin-top: 48px;
          margin-top: 832px;
          .exchange_main{
            margin-top:24px;
            .swiper-container{
              .swiper-slide-active{
                .bmask{
                  display: block;
                  width: 204px;
                  bottom: 43px;
                  left: -14px;
                }
                .exchange_img{
                  width: 204px;
                  height: 330px;
                  display: block;
                  opacity: 1;
                  position: absolute;
                  top:-43px;
                  left: -14px;
                }
              }
              .swiper-pagination{
                bottom: 0;
                .swiper-pagination-bullet{
                  background: #666;
                }
                .swiper-pagination-bullet-active{
                  background: #fff !important;
                }
              }

            }
            .bmask{
              width:174px;
              height: 64px;
              // background:#292b23;
              background: url("../assets/img/home/exchange_bg.png") no-repeat;
              background-size: cover;
              text-align: center;
              display: none;
              position: absolute;
              bottom:74px;
              .item_name{
                font:16px/24px 'airal-bold';
                color: #fff;
                margin-top:8px;
              }
              .item_cprice{
                font:14px/22px '\5FAE\8F6F\96C5\9ED1-regular';
                color: #dcdcdc;
              }
            }
            .anone{
              width:174px;
              height: 330px;
              position: relative;
              display: block;
            }
            .exchange_img{
              display: block;
              width:174px;
              height: 256px;
              opacity: .7;
            }
          }
        }
      }
    }
  }
  .compete-mine-recharge {
      width: 72px;
      height: 30px;
      color: #fff;
      background: url('../assets/img/home/icon_recharge_normal.png') no-repeat center;
      position: absolute;
      top: 10px;
      right: 0;
      line-height: 30px;
      text-align: center;
      font-size: 16px;
      cursor: pointer;
  }
  .compete-mine-recharge:hover {
      background: url('../assets/img/home/icon_recharge_hover.png') no-repeat center;
  }
  .comepte-onthelist{
    width:114px;
    height:44px;
    background:url('../assets/img/home/icon_onthelist_normal.png') no-repeat;
    margin-left:188px;
    margin-top:10px;
    cursor:pointer;
  }
  .comepte-onthelist:hover{
    background:url('../assets/img/home/icon_onthelist_hover.png');
  }

</style>
