<template>
  <div id="record">
    <div class="recordinfo">
      <div class="record-noData" v-if="winrecord&&winrecord.length<1"><span>暂无中奖记录</span></div>
      <div class="content">
        <!-- <div class="winrecord">
          <div class="time">2018-02-02 19:00:00</div>
          <div class="recordpic">
            <div class="record-pic">
              <span><img src="../../assets/images/qq.jpg" alt=""></span>
              <p class="isvip">
                <img src="../../assets/images/turntable/vip6.png" alt="">
              </p>
            </div>
            <div class="winname pointer" title="miniyellow">miniyellow</div>
          </div>
        </div> -->
        <div v-for="(item,index) in winrecord" :key="index" class="winrecord">
          <div class="time">{{item.date_time}}</div>
          <div v-for="(data,index) in item.winners" :key="index" class="recordpic">
            <div class="record-pic">
              <span><img :src="data.avatar" alt=""></span>
              <p class="isvip" v-if="data.vip_level>0">
                <img :src="require('@/assets/images/turntable/vip'+data.vip_level+'.png')">
              </p>
            </div>
            <div class="winname pointer" :title="data.name">{{data.name}}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Http from "../../common/http";
import config from "../../common/http-config";
export default {
  data() {
    return {
    }
  },
  props: ['winrecord'],
  created() {
  },
}
</script>

<style scoped lang="scss">
  #record {
    height: 570px;
    width: 412px;
    position: relative;
    background: url('../../assets/images/freeturn/recordbg.png');
    margin-top: -40px;
    margin-left: 12px;
    .record-noData{
      width: 40px;
      height: 46px;
      background: url('../../assets/images/freeturn/noone.png');
      position: absolute;
      top:50%;
      left:50%;
      transform: translate(-50%,-50%);
      span{
        position: absolute;
        top:55px;
        width: 100px;
        left:-15px;
        font-size: 12px;
        color:#382a28;
      }
    }
    .recordinfo {
      height: 420px;
      width: 352px;
      position: absolute;
      top:90px;
      left:36px;
      padding-top: 12px;
      padding-left: 20px;
      overflow-y:auto;
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
        background-color: #b11c1c;
        border-radius: 2px;
      }
      .content {
        padding-right: 20px;
        .winrecord {
          padding: 10px 10px;
          /*height: 185px;*/
          border-bottom: 1px dashed #313131;
          &:after {
            content: "";
            display: block;
            clear: both;
          }
          .time {
            color:#382a28;
            margin-top: 10px;
            margin-bottom: 10px;
          }
          .recordpic {
            width: 50px;
            height: 50px;
            float: left;
            margin-bottom: 24px;
            margin-right: 20px;
            position: relative;
            .record-pic{width:50px; height:50px; position:relative;top:0;left:0;
              .isvip{position:absolute;bottom:0; right:-5px;  width: 16px;
                height: 13px;
                img{
                  display:block; width:100%;
                }
              }
              span {display:block;
                img {
                  width: 48px;
                  height: 48px;border:#b11c1c 1px solid;
                  border-radius: 50%;
                }
              }

            }
            &:nth-child(6) {
              margin-right: 0px;
            }
            &:nth-child(11) {
              margin-right: 0px;
            }

            .winname {
              font-size: 14px;
              width: 50px;
              line-height: 20px;
              color:#382a28;
              text-align: center;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
            }
            // .allname{
            //   width: 114px;
            //   height: 30px;
            //   color:#dcdcdc;
            //   line-height: 30px;
            //   background-color: #000;
            //   position: absolute;
            //   bottom:-58px;
            //   left:0;
            //   text-align: center;
            //   .triangle{
            //     position: absolute;
            //     top:-10px;
            //     left:8px;
            //     width: 0;
            //     height: 0;
            //     border-style: solid;
            //     border-width: 0 10px 10px 10px;
            //     border-color: transparent transparent #000 transparent;
            //   }
            // }
          }
        }
      }
    }
  }
</style>
