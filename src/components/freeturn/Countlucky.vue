<template>
  <div id="countlucky">
    <div class="countluckycontent" :class="{active:getFreeturntype!=2}">
      <!-- luckyman阴影 -->
      <div class="cover" v-show="islastwiner"></div>
      <!-- 倒计时阴影 -->
      <div class="linecover"></div>
      <!-- 倒计时 -->
      <div class="countdown" v-if="istimedown">
        <div class="countword">倒计时</div>
        <!-- <ul :style="{paddingLeft:ishour?'0':'18px'}"> -->
        <ul>
          <li class="hour">{{theTime.hours}}</li>
          <li class="minutes">{{theTime.minutes}}
            <div class="colon1">:</div>
          </li>
          <li class="second">{{theTime.seconds}}</li>
        </ul>
        <div class="colon">:</div>
        <div class="join join-btn" @click="joinin" v-if="freeturnself" :data-type="gametype"></div>
        <div class="join joined" v-if="!freeturnself"></div>
      </div>
    </div>
  </div>
</template>

<script>
import Http from '../../common/http';
import config from '../../common/http-config';
export default {
  data() {
    return {
      bool: true,
      isfive: true,
      istimedown: true,
      iswinner: false,
      islastwiner: false,
      ishour: false,
      wsdata: {},
      isjoin: true,
      timefor: true,
      hours: '',
      minutes: '',
      seconds: '',
      name: '',
      countTime:null,
    };
  },
  props: ['players', 'pid', 'gametype'],
  methods: {
    joinin(event) {
      let el = event.currentTarget;
      let thisType = el.getAttribute('data-type');
      let datas = {
        type: thisType,
      };
      let _this = this;
      console.log(thisType, '123');
      Http.post(`/freeWheel/join`, datas)
        .then(response => {
          _this.wsdata = response.data;
          if (_this.wsdata.code == 0) {
            _this.$store.commit('getFreeturnself', false);
          } else {
            _this.$store.commit('getFreeturnself', true);
            if (_this.wsdata.code == -200) {
              let dataOption = {
                masseges: _this.wsdata.message,
                joinroll: '2',
              };
              _this.$store.commit('isSigninPupopDis', true);
              _this.$store.commit('isSigninPupopDis', dataOption);
            } else if (_this.wsdata.code == -1) {
              let dataOption = {
                masseges: _this.wsdata.message,
                nologin: '2',
              };
              _this.$store.commit('isSigninPupopDis', true);
              _this.$store.commit('isSigninPupopDis', dataOption);
            } else {
              let dataOption = {
                masseges: _this.wsdata.message,
                type: '2',
              };
              _this.$store.commit('isSigninPupopDis', true);
              _this.$store.commit('isSigninPupopDis', dataOption);
            }
          }
        })
        .catch(Http.onError);
    },
    fortakein() {
      let self=this;
      Http.get(`/self`).then(response => {
          if(response.data.code==0){
            let selfdata = response.data.data;
            self.name = selfdata.nickname;
            console.log('player是什么呢',self.players)
            for (let i = 0; i < self.players.length; i++) {
              for (const key in this.players[i]) {
                if (this.name == this.players[i][key]) {
                  console.log(this.isjoin, 'this.isjoin');
                }
              }
            }
          }
        })
        .catch(Http.onError);
    },
    // isJoinzp() {
    //   Http.get(`/freeWheel/isCanJoin`)
    //     .then(response => {
    //       if (response.data.code == 0) {
    //         this.isjoin = response.data.data;
    //       }
    //     })
    //     .catch(Http.onError);
    // },
  },
  created() {
    // this.isJoinzp();
    // this.$store.dispatch('isjoin')
  },
  computed: {
    theTime() {
      let ctx = this;
      let freeturnTime =this.$store.state.shop.freeturnTimes;
      let hours =parseInt(freeturnTime/3600)>=10?parseInt(freeturnTime/3600):'0'+parseInt(freeturnTime/3600),
          minutes=parseInt(parseInt(freeturnTime/60)%60)>=10?parseInt(parseInt(freeturnTime/60)%60):'0'+parseInt(parseInt(freeturnTime/60)%60),
          seconds=parseInt(freeturnTime%60)>=10?parseInt(freeturnTime%60):'0'+parseInt(freeturnTime%60);
          // console.log(hours,minutes,seconds)
          // clearInterval(this.countTime)
          // this.countTime=null;
          // if(!this.countTime){
          //   this.countTime =setInterval(()=>{
          //     let freeturnTimes =this.$store.state.shop.freeturnTimes;
          //     freeturnTimes--;
          //     if(freeturnTimes<=0){
          //       freeturnTimes=0;
          //       let gametype=this.$store.state.shop.gametype;
          //       console.log('执行了几次呢',freeturnTimes)
          //       this.$store.dispatch('freeturndata',{type:gametype});
          //     }else{
          //       this.$store.commit('mutationsFreeturnTimes',freeturnTimes);
          //     }
          //   },1000)
          // }
      // var x = setInterval(function() {
      //   let date = new Date();
      //   //设置截止时间
      //   let hours = date.getHours();
      //   let year = date.getFullYear();
      //   let month = parseInt(date.getMonth()) + 1 + '';
      //   let day = date.getDate();
      //   let str = '';
      //   if (hours >= 15) {
      //     if (hours == 19) {
      //       str = '' + year + '/' + month + '/' + day + ' ' + '19:59:59';
      //     } else {
      //       hours = parseInt(hours) + 1;
      //       str = '' + year + '/' + month + '/' + day + ' ' + hours + ':20:00';
      //     }
      //   } else {
      //     str = '' + year + '/' + month + '/' + day + ' ' + '15:00:00';
      //   }
      //   // Difference between the 2 dates
      //   let countDownDate = new Date(str).getTime(),
      //     nowtime = new Date().getTime(),
      //     diff = countDownDate - nowtime,
      //     // newtime = new Date('2018/05/27 00:00:00').getTime(),
      //     // Time conversion to days, hours, minutes and seconds
      //     // tdays = Math.floor(diff / (1000 * 60 * 60 * 24)),
      //     thours = Math.floor(
      //       (diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      //     ),
      //     tminutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
      //     tseconds = Math.floor((diff % (1000 * 60)) / 1000);
      //   // Keep 2 digits
      //   // ctx.days = (tdays < 10) ? '0' + tdays : tdays;
      //   if (thours == 0) {
      //     ctx.ishour = false;
      //   } else {
      //     ctx.ishour = true;
      //     ctx.hours = thours < 10 ? '0' + thours : thours;
      //   }
      //   ctx.minutes = tminutes < 10 ? '0' + tminutes : tminutes;
      //   ctx.seconds = tseconds < 10 ? '0' + tseconds : tseconds;

      //   // Check for time expiration
      //   if (diff < 0) {
      //     clearInterval(x);
      //     // ctx.expired = true;
      //   }
      // }, 1000);

      // Return data
      return {
        // days: ctx.days,
        // ishour: ctx.ishour,
        hours: hours,
        minutes: minutes,
        seconds: seconds,
      };
    },
    freeturnself: function() {
      return this.$store.state.shop.freeturnself;
    },
    getFreeturntype: function() {
      return this.$store.state.shop.gametype;
    },
  },
  // mounted() {},
  // watch: {
  //   pid: function() {
  //     this.isJoinzp();
  //   },
  // },
};
</script>

<style scoped lang='scss'>
#countlucky {
  margin-bottom: 15px;
  .countluckycontent {
    height: 240px;
    position: relative;
    background: url('../../assets/images/freeturn/top-banner.png') no-repeat;
    .bgcwhite {
      background-color: #fff;
    }

    .bgcnone {
      background-color: transparent;
    }
    .cover {
      position: absolute;
      height: 210px;
      width: 100%;
      top: 0;
      background-color: #000;
      opacity: 0.3;
      z-index: 10;
    }
    .countdown {
      height: 80px;
      color: #000;
      position: absolute;
      top: 50%;
      left: 50%;
      width: 140px;
      height: 78px;
      transform: translate(-50%, -50%);
      .countword {
        position: absolute;
        top: 10px;
        left: 46px;
        font-size: 14px;
        color: #382a28;
      }
      ul {
        position: absolute;
        width: 120px;
        top: 56%;
        left: 50%;
        transform: translate(-50%, -50%);
        li {
          font-size: 26px;
          line-height: 26px;
          float: left;
          margin-right: 16px;
          color: #382a28;
          font-family: Arial, Helvetica, sans-serif;
          &:last-child {
            margin-right: 0;
          }
        }
        .minutes {
          position: relative;
        }
      }
      .colon {
        position: absolute;
        left: 43px;
        font-size: 26px;
        top: 28px;
        color: #382a28;
      }
      .colon1 {
        position: absolute;
        left: 34px;
        font-size: 26px;
        top: -3px;
        color: #382a28;
      }
      .join {
        width: 150px;
        height: 42px;
        background: url('../../assets/images/freeturn/join.png');
        position: absolute;
        cursor: pointer;
        top: 98px;
        left: 49%;
        transform: translateX(-50%);
      }
      .join-btn:active {
        background: url('../../assets/images/freeturn/joining.png');
      }
      .joined {
        background: url('../../assets/images/freeturn/joined.png');
      }
    }
    .luckyman {
      width: 100%;
      height: 100%;
      padding-left: 78px;
      padding-top: 22px;
      .swiper-container {
        margin-right: 37px;
        margin-left: -37px;
        height: 60px;
        .swiper-slide {
          height: 60px;
          width: 60px;
          img {
            height: 60px;
            width: 60px;
            border-radius: 50%;
          }
        }
      }
      .winner {
        font-size: 12px;
        color: #ffd35e;
        z-index: 11;
        position: absolute;
        top: 30px;
        left: 50%;
        transform: translateX(-50%);
      }
      .winnername {
        font-size: 12px;
        z-index: 11;
        color: #dcdcdc;
        position: absolute;
        top: 50px;
        left: 50%;
        transform: translateX(-50%);
      }
      .winneravatar {
        width: 90px;
        height: 120px;
        left: 50%;
        top: 70px;
        z-index: 11;
        transform: translateX(-50%);
        position: absolute;
        background: url('../../assets/images/turntable/lucyman.png') center
          bottom no-repeat;
        img {
          width: 90px;
          height: 90px;
          border-radius: 50%;
          border: 1px solid #313131;
        }
      }
    }
  }
  .countluckycontent.active {
    background: url('../../assets/images/freeturn/dota-banner.png') no-repeat !important;
  }
}
</style>
