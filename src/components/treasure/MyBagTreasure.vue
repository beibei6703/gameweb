<template>
<div id="mybag" v-if="getIsShowTabcon==2">
  <div class="mybag-list" v-if="getMycardsData">
    <div class="noData" v-if="getMycardsData.length==0">暂无道具</div>
     <vue-scroll :ops="ops" v-if="getMycardsData.length>0">
      <ul>
        <li v-for="(item,key) in getMycardsData" :key="key">
          <div class="mybag-count">{{item.product_count}}</div>
          <div class="ImgOut">
            <span><img :src="item.product_small_pic"/></span>
          </div>
          <div class="reward-list-text active">
            <p>{{item.product_name}}<span>{{item.product_cprice/100}}元 </span></p>
          </div>
        </li>

      </ul>
     </vue-scroll>
  </div>
  <div class="mybag-down">
    <!-- <div class="mybag-list-title"></div> -->
    <div class="mybag-guess-btn-out">
      <a href="https://www.api.com/compete/Quizzeszone?ID=all" target="_blank" class="mybag-guess-btn guess fleft">玩预测 <div class="mybag-surprise">预测赢豪礼，更多惊喜等着你!</div></a>
      <a  href="https://www.api.com/mygrand/mybag" target="_blank" class="mybag-guess-btn exchange fright">去兑换</a>
    </div>
    <div class="mybag-guess">
      <div class="mybag-guess-tabcon">
        <span class="active">赛事推荐</span>
      </div>
      <div class="mybag-guess-list" v-if="getGuessData&&getGuessData.items">
        <div class="noData" v-if="getGuessData.items.length==0">暂无比赛</div>

        <ul v-if="getGuessData&&getGuessData.items.length>0">
          <li v-for="(items,key) in getGuessData.items" :key="key" v-if="key<=1">
          <a :href="'https://www.api.com/guess/'+items.id" target="_blank">
            <div v-if="items.option_type==1" target="_blank">
              <div class="mybag-guess-list-top">
                {{items.guess_type_name}}
                <span>{{items.status_name}}</span>
              </div>
              <div class="mybag-list-contain">
                <div class="mybag-list-contain-same fl">
                  <div class="ImgOut fr">
                    <span>
                      <img :src="items.team[1].logo" height="48"/>
                    </span>
                  </div>
                  <div class="mybag-list-contain-name name-left text-over fr">{{items.team[1].name}}</div>
                </div>
                <div class="mybag-list-contain-vs">vs</div>
                <div class="mybag-list-contain-same fr">
                  <div class="ImgOut fl">
                    <span>
                      <img :src="items.team[2].logo"  height="48"/>
                    </span>
                  </div>
                  <div class="mybag-list-contain-name name-right text-over fl">{{items.team[2].name}}</div></div>
              </div>
            </div>
            <div v-if="items.option_type==2" class="guess-list-pubg">
              <div class="mybag-guess-list-top">
                {{items.guess_type_name}}
                <span>{{items.status_name}}</span>
              </div>
              <div class="mybag-list-contain">
                <div v-for="(value,indexe) in items.hot" :key="indexe" class="mybag-list-contain-same fl">
                  <div v-for="(demo,key) in items.team" v-if="key==value" :key="key">
                    <div class="ImgOut fr">
                      <span>
                        <img :src="demo.logo" height="48"/>
                      </span>
                    </div>
                    <div class="mybag-list-contain-name name-left text-over fr">{{demo.name}}</div>
                  </div>
                </div>
              </div>
            </div>
            </a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</div>
</template>
<script>
export default {
  data(){
    return{
      ops: {
          vuescroll: {
            mode: 'native',
            sizeStrategy: 'percent',
            detectResize: true
          },
          scrollPanel: {
            initialScrollY: 0,
            initialScrollX: false,
            scrollingX: false,
            scrollingY: true,
            speed: 300,
            // easing: 'easeInQuad',
            padding: true,
          },
          rail: {
            background: '#0e0f2b',
            opacity: 0.5,
            /** Rail's size(Height/Width) , default -> 6px */
            size: '4px',
            /** Specify rail and bar's border-radius, or the border-radius of rail and bar will be equal to the rail's size. default -> false **/
            specifyBorderRadius: false,
            /** Rail the distance from the two ends of the X axis and Y axis. **/
            gutterOfEnds: '1px',
            /** Rail the distance from the side of container. **/
            gutterOfSide: '1px'
          },
          bar: {
            /** 当不做任何操作时滚动条自动消失的时间 */
            showDelay: 300,
            /** 是否只在滚动的时候现实滚动条 */
            onlyShowBarOnScroll: true,
            /** 是否保持显示*/
            keepShow: false,
            /** 背景色*/
            background: '#a7aaf5',
            /**  透明度  */
            opacity: 1,
            /** 当你鼠标移动到滚动条的时候滚动条的样式， 返回一个style对象， 和现在的对象融合*/
            hoverStyle: false
          }
        }

    }
  },
  methods:{


  },
  mounted() {

  },
  computed:{
    getMycardsData(){
      return this.$store.state.treasure.myCardsData;
    },
    getGuessData(){
      return this.$store.state.treasure.guessData;
    },
    getIsShowTabcon(){
      return this.$store.state.treasure.isShowTabcon;
    }
  },
}
</script>
<style lang="scss" scoped src="@/assets/css/treasure.css"></style>


