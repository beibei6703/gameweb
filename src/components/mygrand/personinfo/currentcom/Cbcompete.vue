<template>
  <div id="cbcompete">
    <ul v-if="resultData" class="wrapul">
      <li v-for="(data,index) in resultData.items" :key="index" class="wrapli" @click="handleclick(data.guess_id,data.battle_id,data.odds_type)">
        <div class="competeinfo1 competeinfo fleft">
            <i :class="'i teamlg fleft i'+data.game_id"></i>
            <p class="cdetaildate ">{{data.updated_at}}</p>
        </div>
        <div class="competeinfo2  competeinfo fleft">
          <p class="cinfotitle ellipsis cddetail" :title="data.name">{{data.name}}</p>
          <p class="cdetail cddetail">共
            <span class="cb theme_color">{{thousandBitSeparator(parseInt(data.chip))}} C</span>
          </p>
        </div>
        <div class="competeinfo3  competeinfo fleft">
          <!-- <p class="cinfotitle ellipsis cddetail ff" :title="data.vs">{{data.vs}}</p> -->


          <!-- 这里是要的 -->
          <!-- 这里是两条开始 -->
          <div class="separate" v-if="data.option_type==1">
            <div class="cinfotitle  cddetail ff"  @mouseover="showtitlevs($event)" @mouseout="hidetitlevs($event)">
              <p class="teamvs ellipsis"><span class="options">{{data.options[1].name}}</span> vs <span class="options">{{data.options[2].name}}</span></p>
              <p class="titlevs"><span class="options">{{data.options[1].name}}</span> vs <span class="options">{{data.options[2].name}}</span></p>
            </div>
          </div>
          <!-- 这里是两条结束 -->
          <!-- 这里是多条情况开始 -->
          <div class="separate" v-if="data.option_type==2">
            <div class="cinfotitle  cddetail ff"  @mouseover="showtitlevs($event)" @mouseout="hidetitlevs($event)">
              <p class="teamvs ellipsis"><span class="options" v-for="(data,index) in data.options" :key="data.id">{{data.name}}</span></p>
              <!-- <ul  class="teamvs ellipsis"><li v-for="(data,index) in data.options" :key="data.id" id="pubgvsli" class="fleft ellipsis">{{data.name}}、</li></ul> -->
              <p class="titlevs"><span class="testpubg" v-for="(data,index) in data.options" :key="data.id">{{data.name}}、</span></p>
            </div>
          </div>
          <!-- 这里是多条情况结束 -->

          <p class="cdetail ellipsis cddetail" :title="data.team_name +''+ nFormatter(data.team_odds)">{{data.team_name}} (
            <span class="odds" style="color: #ed4b4b;"> {{nFormatter(data.team_odds)}}</span> )</p>
        </div>
        <div class="competeinfo4 competeinfo fleft loseone">
          <p class="cinfotitle ellipsis cddetail" ><span :title="data.guess_type_name">{{data.guess_type_name}}</span><i class="guessmain-ex-text-fixed" title="玩家预测时的赔率为最后收益所得赔率，例如固赔1.5，预测100C则最后获得收益150C+本金100C，合计250C。" v-if="data.odds_type==2"></i></p>
          <p class="cdetail cddetail">
            {{data.income_message}}:
            <span class="cb theme_color">{{thousandBitSeparator(parseInt(data.income))}} C</span>
          </p>
        </div>
        <div class="competeinfo competeinfo5 fleft">
          <p class="cinfotitle ellipsis cl-graw cddetail" :title="data.status_name" v-if="data.status=='win'">{{data.status_name}}</p>
          <p class="cinfotitle ellipsis cl-graw cddetail" :title="data.status_name" v-if="data.status=='lose'">{{data.status_name}}</p>
          <p class="cinfotitle ellipsis cl-red cddetail" :title="data.status_name" v-if="data.status=='start'">{{data.status_name}}</p>
          <p class="cinfotitle ellipsis cl-green cddetail" :title="data.status_name" v-if="data.status=='wait'">{{data.status_name}}</p>
          <p class="cinfotitle ellipsis cl-graw cddetail" :title="data.status_name" v-if="data.status=='cancel'">{{data.status_name}}</p>
          <p class="cinfotitle ellipsis cl-graw cddetail" :title="data.status_name" v-if="data.status=='clear'">{{data.status_name}}</p>
          <!-- 小费 -->
          <!-- <p class="cdetails" style="margin-top:20px;" v-if="data.status=='win'">小费：
            <span class="cb theme_color" >{{parseInt(data.fee).toLocaleString('en-US')}} C</span>
          </p> -->
        </div>
      </li>
    </ul>
    <!-- 分页 -->
    <div id="page" v-if="this.allpage>1">
      <div class="pagination" :style="{width:84+42*pagearr.length+'px'}">
        <div @click="turnUp" class="turnUp"><img src="../../../../assets/images/News-images/pageleft.png" alt=""></div>
        <div class="listdiv" v-for="(item,index) in pagearr" :key="index" @click="goto(item)" :class="{'active':page == item}">
          <a>{{item}}</a>
        </div>
        <div @click="turnDown" class="turnDown"><img src="../../../../assets/images/News-images/pageright.png" alt=""></div>
      </div>
    </div>
    <div class="nothing" v-if="!allpage">这里还没有数据哟</div>
  </div>
</template>
<script>
import Http from "../../../../common/http";
import router from "@/router";
export default {
  data() {
    return {
      // 分页
      page: 1,
      allpage: 0,
      pagearr: [],
      resultData: {}
    };
  },
  created() {
    this.getData();
  },
  mounted () {

  },
  methods: {
    turnUp() {
      if (this.page > 1) {
        this.page--;
        if (this.allpage > 5) {
          this.pagearr = [];
          let left, right;
          if (this.allpage >= 5) {
            if (this.page > 3 && this.page < this.allpage - 2) {
              left = this.page - 2;
              right = this.page + 2;
            } else {
              if (this.page <= 3) {
                left = 1;
                right = 5;
              } else {
                right = this.allpage;
                left = this.allpage - 4;
              }
            }
          }
          while (left <= right) {
            this.pagearr.push(left);
            left++;
          }
        }
        Http.get(`/guess/caiLogs?status=all&result_status=all&size=3&page=${this.page}`)
          .then(response => {
            this.resultData = response.data.data;
          })
          .catch(Http.onError);
      }
    },
    turnDown() {
      if (this.page < this.allpage) {
        this.page++;
        if (this.allpage > 5) {
          let left, right;
          this.pagearr = [];
          if (this.allpage >= 5) {
            if (this.page > 3 && this.page < this.allpage - 2) {
              left = this.page - 2;
              right = this.page + 2;
            } else {
              if (this.page <= 3) {
                left = 1;
                right = 5;
              } else {
                right = this.allpage;
                left = this.allpage - 4;
              }
            }
          }
          while (left <= right) {
            this.pagearr.push(left);
            left++;
          }
        }
        Http.get(`/guess/caiLogs?status=all&result_status=all&size=3&page=${this.page}`)
          .then(response => {
            this.resultData = response.data.data;
          })
          .catch(Http.onError);
      }
    },
    goto(item) {
      this.page = item;
      Http.get(`/guess/caiLogs?status=all&result_status=all&size=3&page=${this.page}`)
        .then(response => {
          this.resultData = response.data.data;
        })
        .catch(Http.onError);
    },
    handleclick(id,battleId,oddsType){
      this.$store.commit('mutationIsSendDispath',true)
      if(this.$store.state.match.stateGuessId&&this.$store.state.match.stateGuessId!=id){
        this.$store.commit('mutationGuessTeamData',null)
      }
      router.push(`/guess/${id}`);
      this.$store.commit('mutationStateGuessId',id)
    },
    getData() {
      this.pagearr = [];
      this.page = 1;
      Http.get(`/guess/caiLogs?status=all&result_status=all&size=3&page=${this.page}`)
        .then(response => {
          this.resultData = response.data.data;
          this.allpage = this.resultData.meta.total_page;
          if (this.allpage < 5) {
            while (this.allpage > 0) {
              this.pagearr.unshift(this.allpage);
              this.allpage--;
            }
          } else {
            this.pagearr = [1, 2, 3, 4, 5];
          }
          this.allpage = this.resultData.meta.total_page;
        })
        .catch(Http.onError);
    },
    showtitlevs(event){
      var ele = event.currentTarget.childNodes[2]
      ele.style.display='block'
      // ele.style.visibility='visible'
    },
    hidetitlevs(event){
      var ele = event.currentTarget.childNodes[2]
      // ele.style.visibility='hidden'
       ele.style.display='none'
    },
    nFormatter(num){
        if(num>=1000000000){
          return (num/1000000000).toFixed(1).replace(/.0$/,'')+'G'
        }
        if (num >= 1000000) {
          return (num/1000000).toFixed(1).replace(/.0$/, '') + 'M';
        }
        if (num >= 1000) {
          return (num/1000).toFixed(1).replace(/.0$/, '') + 'K';
        }
        return num;
    },

  }
};
</script>
<style lang="scss" scoped>
.guessmain-ex-text-fixed {
    display: inline-block;
    margin-left: 3px;
    /* background: -webkit-linear-gradient(#dab63b 40%, #cea839); */
    background: url('../../../../assets/images/competeImg/guess_list_g.png') no-repeat center;
    /* padding: 0 6px 0 5px; */
    position: relative;
    top: 0;
    left: 0;
    color: #371726;
    border-radius: 0 0 10px 0;
    line-height: 18px;
    font-size: 12px;
    height: 18px;
    width: 20px;
    vertical-align: -3px;
}
#cbcompete {
  min-height: 158px;
  padding-bottom: 10px;
  position: relative;
  .i {
    background: url("../../../../assets/images/competeImg/guess_logoS.png")
      no-repeat;
    width: 32px !important;
  }
  .i1 {
    background-position: -35px 0px;
  }
  .i2 {
    background-position: -2px 0px;
  }
  .i3 {
    background-position: -100px 0px;
  }
  .i4 {
    background-position: -68px 0px;
  }
  .i5 {
    background-position: -132px 0px;
  }
  .nothing {
    font-size: 14px;
    color: #989898;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    position: absolute;
  }
  ul {
    min-height: 20px;
    padding-bottom: 20px;
    li {
      color: #989898;
      height: 110px;
      border-top: 1px solid #313131;
      padding-bottom: 6px;
      &:nth-child(1){
           border-top: none;
      }
      // .ff{
      //   position: relative;
      // }
      // .teamvs{
      //   height:24px;
      //   width: 200px;
      //   // white-space: nowrap;
      //   // text-overflow: ellipsis;
      //   // overflow: hidden;
      //   color: #989898;
      //   #pubgvsli{
      //     height:24px !important;
      //     text-align: center;
      //   }
      // }
      // .cinfotitle {
      //    .titlevs{
      //       position:absolute;
      //       // top:40px;
      //       top:28px;
      //       // left:294px;
      //       left:0;
      //       background: #4a4d51;
      //       display: none;
      //       padding:0 4px 4px 4px;
      //       width:200px;
      //       word-wrap:break-word !important;
      //       word-break:break-all !important;
      //       z-index:2;
      //       // visibility: hidden;
      //       .testpubg{
      //         height: 20px;
      //         display:inline-block;
      //         padding-left:2px;
      //         text-align: left;
      //       }
      //     }
      // }
      .teamlg {
        display: block;
        width: 20px;
        height: 20px;
        // margin-top: 16px;
        position: relative;
        left: 36px !important;
        top: 5px;
      }
      .cdetaildate{
        margin-top:44px;
      }
      .competeinfo {
        color: #989898;
        // width: 270px;
        height: 92px;
        margin-top: 16px;
        font-size: 14px;
        line-height: 24px;
        text-align: center;
        .cdetail {
          margin-top: 20px;
        }
        ul {
          min-height: 20px;
          li {
            height: 80px;
            color: #989898;
            text-align: center;
            .cinfotitle {
              //    color: #989898;
              // width: 220px;
              white-space: nowrap;
              text-overflow: ellipsis; /* IE, Safari (WebKit) */
              -o-text-overflow: ellipsis; /*Opera*/
              overflow: hidden;
            }
            .teamlg {
              display: block;
              width: 20px;
              height: 20px;
              margin-top: 16px;
              position: relative;
              left: 20px;
              top: 5px;
            }
            .competeinfo {
              color: #989898;
              // width: 200px;
              margin-top: 16px;
              margin-left: 20px;
              font-size: 14px;
              line-height: 24px;
              .cdetail {
                margin-top: 10px;
              }

            }
            .odds {
                color: #ed4b4b;
              }
          }
        }
      }
      .competeinfo1{
        width: 100px;
        margin-left: 20px;
      }
      .competeinfo2{
        width: 120px;
        margin-left: 20px;
      }
      .competeinfo3{
        width: 220px;
        margin-left: 20px;
      }
      .competeinfo4{
        width: 170px;
        margin-left: 20px;
      }
      .competeinfo5{
        width: 120px;
        margin-left: 20px;
      }
    }
  }
  #page {
    height: 39px;
    margin-top:20px;
    position: relative;
    .pagination {
      position: absolute;
      height: 39px;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      .active {
        background: #ba9665;
        a {
          color: #fff;
        }
      }
      div {
        float: left;
        width: 37px;
        height: 39px;
        font-size: 20px;
        line-height: 39px;
        margin-right: 5px;
        cursor: pointer;
        text-align: center;
        border: 1px solid #535353;
        &:hover {
          border: 1px solid #ba9665;
          a {
            color: #ba9665;
          }
        }
        a {
          color: #535353;
        }
        img {
          width: 16px;
          height: auto;
        }
      }
    }
  }
}

</style>


