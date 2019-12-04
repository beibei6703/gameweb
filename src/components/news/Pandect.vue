<template>
  <div id='pandect'>
    <!-- 标题 -->
    <div class="title">
      <div class="titlebg"></div>
      <span>✲ 显示数据以近25局为基础</span>
    </div>
    <!-- 选手图片 -->
    <div class="box" v-if="teaminfo">
      <div class="screen">
        <ul :style="{width:num*210+210+'px'}" ref="ul">
          <li v-for="(data,index) in teaminfo.team_player" :key="index" :style="{backgroundImage:'url('+data.playerLogo+')'}" @mouseover="infohover(index)" @mouseout="infoout">
            <div class="position">{{data.pos}}</div>
            <div class="playname">{{data.playerName}}</div>
          </li>
        </ul>
      </div>
      <div class="arr">
        <span id="left" @click="arrLeft"></span>
        <span id="right" @click="arrRight"></span>
      </div>
    </div>
    <!-- 选手信息 -->
    <div class="playerInfo" :style="{height:num*50+42+'px'}">
      <p class="playerTitle">
        <ul>
          <li>选手</li>
          <li>地区</li>
          <li>位置</li>
          <li>平均KDA</li>
          <li>平均参团率</li>
          <li>Carry</li>
          <li>Troll</li>
          <li>全球排行</li>
          <li>地区排行</li>
          <li>实力评级</li>
          <li>魔方价值</li>
        </ul>
      </p>
      <div class="playDetail" v-if="teaminfo">
        <ul>
          <li v-for="(data,index) in teaminfo.player_data" :key="index" :class="{active:hovernum === index}">
            <div>
              <p class="playerPic" :style="{backgroundImage:'url('+data.playerLogo+')'}"></p>
              {{data.playerName}}
            </div>
            <div><img :src="data.regionLogo" alt=""></div>
            <div>{{data.pos}}</div>
            <div>{{data.kda}}</div>
            <div>{{data.can_tuan}}</div>
            <div>{{data.carry}}</div>
            <div>{{data.troll}}</div>
            <div>{{data.global_rank}}</div>
            <div>{{data.area_rank}}</div>
            <div>{{data.score}}</div>
            <div>{{data.kda}}</div>
          </li>
        </ul>

      </div>
    </div>
    <!-- 红蓝数据  -->
    <div class="rbAnalysis">
      <div class="rbtitle">
        <div class="titlebg1"></div>
        <span class="rbword1">✲ 显示数据以近25局为基础</span>
        <div class="titlebg2"></div>
        <span class="rbword2">✲ 最佳选手实力评级</span>
      </div>
      <div class="redBlue" v-if="teaminfo">
        <div class="red">
          <ul>
            <li>红方数据</li>
            <li>胜率
              <div class="border">
                <div class="bgc" :style="{width:teaminfo.compare_data.red.winRate}"></div>
              </div>
              <span>{{teaminfo.compare_data.red.winRate}}</span>
            </li>
            <li>一血
              <div class="border">
                <div class="bgc" :style="{width:teaminfo.compare_data.red.fbRate}"></div>
              </div>
              <span>{{teaminfo.compare_data.red.fbRate}}</span>
            </li>
            <li>一塔
              <div class="border">
                <div class="bgc" :style="{width:teaminfo.compare_data.red.ftRate}"></div>
              </div>
              <span>{{teaminfo.compare_data.red.ftRate}}</span>
            </li>
            <!-- ============================================================= -->
            <li v-if="teaminfo.game_id == 2">一龙
              <div class="border">
                <div class="bgc" :style="{width:teaminfo.compare_data.red.fdRate}"></div>
              </div>
              <span>{{teaminfo.compare_data.red.fdRate}}</span>
            </li>
            <li v-else>首十杀
              <div class="border">
                <div class="bgc" :style="{width:teaminfo.compare_data.red.f10KRate}"></div>
              </div>
              <span>{{teaminfo.compare_data.red.f10KRate}}</span>
            </li>
            <!-- ============================================================= -->
            <li v-if="teaminfo.game_id == 2">首先峰
              <div class="border">
                <div class="bgc" :style="{width:teaminfo.compare_data.red.firstVanguardRate}"></div>
              </div>
              <span>{{teaminfo.compare_data.red.firstVanguardRate}}</span>
            </li>
            <li v-else>首近战兵营
              <div class="border">
                <div class="bgc" :style="{width:teaminfo.compare_data.red.firstMeleeRate}"></div>
              </div>
              <span>{{teaminfo.compare_data.red.firstMeleeRate}}</span>
            </li>
            <!-- ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ -->
            <li v-if="teaminfo.game_id == 2">首大龙
              <div class="border">
                <div class="bgc" :style="{width:teaminfo.compare_data.red.firstDragonRate}"></div>
              </div>
              <span>{{teaminfo.compare_data.red.firstDragonRate}}</span>
            </li>
            <li v-else>首肉山
              <div class="border">
                <div class="bgc" :style="{width:teaminfo.compare_data.red.frRate}"></div>
              </div>
              <span>{{teaminfo.compare_data.red.frRate}}</span>
            </li>
            <!-- ||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||| -->
            <li>20分钟塔数差
              <div class="border">
                <div class="bgc" :style="{width:(teaminfo.compare_data.red.TowerDiffat20Rate>1?1:teaminfo.compare_data.red.TowerDiffat20Rate)*169+'px'}"></div>
              </div>
              <span>{{teaminfo.compare_data.red.TowerDiffat20Rate}}</span>
            </li>
            <!-- ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^ -->
            <li v-if="teaminfo.game_id == 2">20分钟龙数
              <div class="border">
                <div class="bgc" :style="{width:(teaminfo.compare_data.red.Dragonsat20Rate>1?1:teaminfo.compare_data.red.Dragonsat20Rate)*169+'px'}"></div>
              </div>
              <span>{{teaminfo.compare_data.red.Dragonsat20Rate}}</span>
            </li>
            <li v-else>20分钟经济差
              <div class="border">
                <div class="bgc" :style="{width:(teaminfo.compare_data.red.NetWorthDiffat20Rate>1?1:teaminfo.compare_data.red.NetWorthDiffat20Rate)*169+'px'}"></div>
              </div>
              <span>{{teaminfo.compare_data.red.NetWorthDiffat20Rate}}</span>
            </li>
            <!-- *************************************************************** -->
            <li v-if="teaminfo.game_id == 2">25分钟经济差
              <div class="border">
                <div class="bgc" :style="{width:(teaminfo.compare_data.red.GoldDiffat25Rate>1?1:teaminfo.compare_data.red.GoldDiffat25Rate)*169+'px'}"></div>
              </div>
              <span>{{teaminfo.compare_data.red.GoldDiffat25Rate}}</span>
            </li>
            <li v-else>平均肉山数
              <div class="border">
                <div class="bgc" :style="{width:(teaminfo.compare_data.red.AverageRouShanRate>1?1:teaminfo.compare_data.red.AverageRouShanRate)*169+'px'}"></div>
              </div>
              <span>{{teaminfo.compare_data.red.AverageRouShanRate}}</span>
            </li>
          </ul>
        </div>
        <div class="blue">
          <ul>
            <li>蓝方数据</li>
            <li>胜率
              <div class="border">
                <div class="bgc" :style="{width:teaminfo.compare_data.blue.winRate}"></div>
              </div>
              <span>{{teaminfo.compare_data.blue.winRate}}</span>
            </li>
            <li>一血
              <div class="border">
                <div class="bgc" :style="{width:teaminfo.compare_data.blue.fbRate}"></div>
              </div>
              <span>{{teaminfo.compare_data.blue.fbRate}}</span>
            </li>
            <li>一塔
              <div class="border">
                <div class="bgc" :style="{width:teaminfo.compare_data.blue.ftRate}"></div>
              </div>
              <span>{{teaminfo.compare_data.blue.ftRate}}</span>
            </li>
            <li v-if="teaminfo.game_id == 2">一龙
              <div class="border">
                <div class="bgc" :style="{width:teaminfo.compare_data.blue.fdRate}"></div>
              </div>
              <span>{{teaminfo.compare_data.blue.fdRate}}</span>
            </li>
            <li v-else>首十杀
              <div class="border">
                <div class="bgc" :style="{width:teaminfo.compare_data.blue.f10KRate}"></div>
              </div>
              <span>{{teaminfo.compare_data.blue.f10KRate}}</span>
            </li>
            <li v-if="teaminfo.game_id == 2">首先峰
              <div class="border">
                <div class="bgc" :style="{width:teaminfo.compare_data.blue.firstVanguardRate}"></div>
              </div>
              <span>{{teaminfo.compare_data.blue.firstVanguardRate}}</span>
            </li>
            <li v-else>首近战兵营
              <div class="border">
                <div class="bgc" :style="{width:teaminfo.compare_data.blue.firstMeleeRate}"></div>
              </div>
              <span>{{teaminfo.compare_data.blue.firstMeleeRate}}</span>
            </li>
            <li v-if="teaminfo.game_id == 2">首大龙
              <div class="border">
                <div class="bgc" :style="{width:teaminfo.compare_data.blue.firstDragonRate}"></div>
              </div>
              <span>{{teaminfo.compare_data.blue.firstDragonRate}}</span>
            </li>
            <li v-else>首肉山
              <div class="border">
                <div class="bgc" :style="{width:teaminfo.compare_data.blue.frRate}"></div>
              </div>
              <span>{{teaminfo.compare_data.blue.frRate}}</span>
            </li>
            <li>20分钟塔数差
              <div class="border">
                <div class="bgc" :style="{width:(teaminfo.compare_data.blue.TowerDiffat20Rate>1?1:teaminfo.compare_data.blue.TowerDiffat20Rate)*169+'px'}"></div>
              </div>
              <span>{{teaminfo.compare_data.blue.TowerDiffat20Rate}}</span>
            </li>
            <li v-if="teaminfo.game_id == 2">20分钟龙数
              <div class="border">
                <div class="bgc" :style="{width:(teaminfo.compare_data.blue.Dragonsat20Rate>1?1:teaminfo.compare_data.blue.Dragonsat20Rate)*169+'px'}"></div>
              </div>
              <span>{{teaminfo.compare_data.blue.Dragonsat20Rate}}</span>
            </li>
            <li v-else>20分钟经济差
              <div class="border">
                <div class="bgc" :style="{width:(teaminfo.compare_data.blue.NetWorthDiffat20Rate>1?1:teaminfo.compare_data.blue.NetWorthDiffat20Rate)*169+'px'}"></div>
              </div>
              <span>{{teaminfo.compare_data.blue.NetWorthDiffat20Rate}}</span>
            </li>
            <li v-if="teaminfo.game_id == 2">25分钟经济差
              <div class="border">
                <div class="bgc" :style="{width:(teaminfo.compare_data.blue.GoldDiffat25Rate>1?1:teaminfo.compare_data.blue.GoldDiffat25Rate)*169+'px'}"></div>
              </div>
              <span>{{teaminfo.compare_data.blue.GoldDiffat25Rate}}</span>
            </li>
            <li v-else>平均肉山数
              <div class="border">
                <div class="bgc" :style="{width:(teaminfo.compare_data.blue.AverageRouShanRate>1?1:teaminfo.compare_data.blue.AverageRouShanRate)*169+'px'}"></div>
              </div>
              <span>{{teaminfo.compare_data.blue.AverageRouShanRate}}</span>
            </li>
          </ul>
        </div>
      </div>
      <div class="analysis">
        <Echarts :data='data'></Echarts>
      </div>
    </div>
  </div>
</template>

<script>
import Http from "../../common/http";
import Echarts from "../news/Echarts";
export default {
  data() {
    return {
      teamId: "",
      teaminfo: {
        id: 1,
        game_id: 2,
        game_code: "lol",
        team_id: 9,
        team_logo:
          "https://cdn.esportsmatrix.com/lol/Content/images/uploaded/team/6e5bcb21-dc81-43d6-8e3d-614a6f1e8682.png",
        summary:
          "\r\n                 简介： Samsung Galaxy是一只韩国战队，前身是三星白蓝的两只队伍，S4时期建立三星王朝，在白队获得S4冠军后由于赛制问题全员离队，重组之后的三星状态不稳定，但在2016夏季赛Ambition的加入后重返世界舞台,并一举拿下S6亚军。在新赛季，Samsung Galaxy 在 LCK 区域选拔赛中 3比0战胜KT，取得 LCK赛区 最后一个入围世界赛的名额。\r\n            ",
        score: "1898",
        global_rank: "全球排行：1",
        area_rank: "地区排行：1",
        match_data: [
          {
            name: "平均20分钟塔数差",
            value: "1.20"
          },
          {
            name: "平均20分钟小龙数",
            value: "0.80"
          },
          {
            name: "平均25分钟经济差",
            value: "2.22K "
          },
          {
            name: "首先锋百分比",
            value: "50%"
          },
          {
            name: "首大龙百分比",
            value: "71%"
          }
        ],
        team_player: [
          {
            playerId: "96",
            playerName: "CuVee",
            playerLogo:
              "https://cdn.esportsmatrix.com/lol/Content/images/uploaded/player/5223a235-0ba5-4b9b-bfdd-2d99696ae6ed.png",
            pos: "上单 "
          },
          {
            playerId: "2710",
            playerName: "Haru",
            playerLogo:
              "https://cdn.esportsmatrix.com/lol/Content/images/uploaded/player/717bd181-d001-4261-8405-51c02c80b988.png",
            pos: "打野 "
          },
          {
            playerId: "20",
            playerName: "Ambition",
            playerLogo:
              "https://cdn.esportsmatrix.com/lol/Content/images/uploaded/player/70276f26-74d2-4f8f-97e4-02e654cc8c1b.png",
            pos: "打野 "
          },
          {
            playerId: "94",
            playerName: "Crown",
            playerLogo:
              "https://cdn.esportsmatrix.com/lol/Content/images/uploaded/player/1d3976ce-3e82-45dd-a8c3-b891f45a0f6a.png",
            pos: "中路 "
          },
          {
            playerId: "2714",
            playerName: "Ruler",
            playerLogo:
              "https://cdn.esportsmatrix.com/lol/Content/images/uploaded/player/ce88b40d-4207-40bd-8b0a-4ca7a02e6cec.png",
            pos: "ADC "
          },
          {
            playerId: "87",
            playerName: "CoreJJ",
            playerLogo:
              "https://cdn.esportsmatrix.com/lol/Content/images/uploaded/player/1b1c377b-e251-400e-874a-65cdd0c2a9b6.png",
            pos: "辅助 "
          }
        ],
        best_group: "",
        player_data: [
          {
            playerId: "96",
            pos: "上单",
            kda: "5.9",
            can_tuan: "59%",
            carry: "44%",
            troll: "24%",
            global_rank: "21",
            area_rank: "10",
            score: "1783",
            val: "10.0M",
            playerName: "CuVee",
            playerLogo:
              "https://cdn.esportsmatrix.com/lol/Content/images/uploaded/player/5223a235-0ba5-4b9b-bfdd-2d99696ae6ed.png",
            strength: 1783,
            regionLogo:
              "https://cdn.esportsmatrix.com/lol/Content/images/uploaded/region/7d7f87f0-2648-4a18-b726-a705db19805d.png"
          },
          {
            playerId: "2710",
            pos: "打野",
            kda: "5.8",
            can_tuan: "64%",
            carry: "40%",
            troll: "20%",
            global_rank: "19",
            area_rank: "8",
            score: "1794",
            val: "9.2M",
            playerName: "Haru",
            playerLogo:
              "https://cdn.esportsmatrix.com/lol/Content/images/uploaded/player/717bd181-d001-4261-8405-51c02c80b988.png",
            strength: 1794,
            regionLogo:
              "https://cdn.esportsmatrix.com/lol/Content/images/uploaded/region/7d7f87f0-2648-4a18-b726-a705db19805d.png"
          },
          {
            playerId: "20",
            pos: "打野",
            kda: "5.4",
            can_tuan: "74%",
            carry: "52%",
            troll: "24%",
            global_rank: "20",
            area_rank: "9",
            score: "1787",
            val: "11.5M",
            playerName: "Ambition",
            playerLogo:
              "https://cdn.esportsmatrix.com/lol/Content/images/uploaded/player/70276f26-74d2-4f8f-97e4-02e654cc8c1b.png",
            strength: 1787,
            regionLogo:
              "https://cdn.esportsmatrix.com/lol/Content/images/uploaded/region/7d7f87f0-2648-4a18-b726-a705db19805d.png"
          },
          {
            playerId: "94",
            pos: "中路",
            kda: "7.3",
            can_tuan: "66%",
            carry: "36%",
            troll: "4%",
            global_rank: "42",
            area_rank: "17",
            score: "1726",
            val: "10.0M",
            playerName: "Crown",
            playerLogo:
              "https://cdn.esportsmatrix.com/lol/Content/images/uploaded/player/1d3976ce-3e82-45dd-a8c3-b891f45a0f6a.png",
            strength: 1726,
            regionLogo:
              "https://cdn.esportsmatrix.com/lol/Content/images/uploaded/region/7d7f87f0-2648-4a18-b726-a705db19805d.png"
          },
          {
            playerId: "2714",
            pos: "ADC",
            kda: "9.6",
            can_tuan: "66%",
            carry: "60%",
            troll: "4%",
            global_rank: "3",
            area_rank: "2",
            score: "1883",
            val: "12.6M",
            playerName: "Ruler",
            playerLogo:
              "https://cdn.esportsmatrix.com/lol/Content/images/uploaded/player/ce88b40d-4207-40bd-8b0a-4ca7a02e6cec.png",
            strength: 1883,
            regionLogo:
              "https://cdn.esportsmatrix.com/lol/Content/images/uploaded/region/7d7f87f0-2648-4a18-b726-a705db19805d.png"
          },
          {
            playerId: "87",
            pos: "辅助",
            kda: "9.2",
            can_tuan: "76%",
            carry: "36%",
            troll: "4%",
            global_rank: "2",
            area_rank: "1",
            score: "1884",
            val: "11.2M",
            playerName: "CoreJJ",
            playerLogo:
              "https://cdn.esportsmatrix.com/lol/Content/images/uploaded/player/1b1c377b-e251-400e-874a-65cdd0c2a9b6.png",
            strength: 1884,
            regionLogo:
              "https://cdn.esportsmatrix.com/lol/Content/images/uploaded/region/7d7f87f0-2648-4a18-b726-a705db19805d.png"
          }
        ],
        compare_data: {
          red: {
            winRate: "64%",
            fbRate: "24%",
            ftRate: "64%",
            fdRate: "64%",
            firstVanguardRate: "20%",
            firstDragonRate: "58%",
            TowerDiffat20Rate: "0.32",
            Dragonsat20Rate: "0.96",
            GoldDiffat25Rate: "1.35"
          },
          blue: {
            winRate: "68%",
            fbRate: "48%",
            ftRate: "60%",
            fdRate: "56%",
            firstVanguardRate: "50%",
            firstDragonRate: "56%",
            TowerDiffat20Rate: "1.04",
            Dragonsat20Rate: "0.72",
            GoldDiffat25Rate: "1.57"
          }
        },
        strength_map: [
          {
            pos: "上单",
            value: "1783"
          },
          {
            pos: "打野",
            value: "1787"
          },
          {
            pos: "中路",
            value: "1726"
          },
          {
            pos: "ADC",
            value: "1883"
          },
          {
            pos: "辅助",
            value: "1884"
          }
        ],
        other: {
          winRate: "80 %",
          continuityWin: "0",
          scoreLevel: "A"
        },
        updated_at: "2017-12-28 18:37:19"
      },
      count: 0,
      num: 10,
      data: [
        {
          pos: "上单",
          value: "1783"
        }
      ],
      hovernum: ""
    };
  },
  components: {
    Echarts
  },
  methods: {
    infoout(){
      this.hovernum = ''
    },
    infohover(index) {
      this.hovernum = index;
    },
    getData: function() {
      this.teamId = this.$store.state.news.team_id;
      Http.get("/team/detail?team_id=" + this.teamId)
        .then(response => {
          this.teaminfo = response.data.data;
          this.num = response.data.data.team_player.length;
          console.log(this.num, 8888888);
          this.data = response.data.data.strength_map;
        })
        .catch(Http.onError);
    },
    // 运动器
    animate(ele, target) {
      clearInterval(ele.timer);
      ele.timer = setInterval(function() {
        var current = ele.offsetLeft;
        var step = 210;
        step = target > current ? step : -step;
        if (Math.abs(target - current) > Math.abs(step)) {
          current = current + step;
          ele.style.left = current + "px";
        } else {
          ele.style.left = target + 58 + "px";
          clearInterval(ele.timer);
        }
      }, 100);
    },
    arrRight() {
      if (this.count >= this.num - 5) {
        return;
      }
      this.count++;
      this.animate(this.$refs.ul, -this.count * 210);
    },
    arrLeft() {
      if (this.count <= 0) {
        return;
      }
      this.count--;
      this.animate(this.$refs.ul, -this.count * 210);
    }
  },
  created() {
    this.getData();
  },
  watch: {
    $route() {
      if (this.$route.path=='/teaminfo') {
        this.getData();
      }
    }
  }
};
</script>

<style scoped lang='scss'>
#pandect {
  height: 1246px;
  width: 100%;
  padding-top: 45px;
  padding-right: 30px;
  padding-left: 30px;
  background-color: #1b1c1f;
  margin-bottom: 30px;
  .title {
    height: 38px;
    width: 100%;
    text-align: right;
    font-size: 14px;
    color: #989898;
    line-height: 38px;
    span {
      line-height: 38px;
    }
    .titlebg {
      width: 98px;
      height: 25px;
      float: left;
      margin-top: 7px;
      margin-left: 8px;
      background: url("../../assets/images/News-images/sprite.png") 0 -526px no-repeat;
    }
    span {
      float: right;
    }
  }
  .box {
    width: 100%;
    height: 238px;
    border: 1px solid #2f2f30;
    background-color: #15161a;
    position: relative;
    margin-bottom: 18px;
    .screen {
      width: 1082px;
      height: 238px;
      overflow: hidden;
      position: relative;
      ul {
        position: absolute;
        left: 58px;
        top: 33px;
        li {
          width: 178px;
          height: 176px;
          border: 1px solid #535353;
          background-position: center top;
          background-repeat: no-repeat;
          background-size: 80%;
          overflow: hidden;
          float: left;
          margin-right: 32px;
          &:hover {
            border: 1px solid #d9a35a;
          }
          .position {
            float: right;
            width: 46px;
            height: 25px;
            font-size: 14px;
            color: #fff;
            text-align: center;
            line-height: 25px;
            background-color: #d9a35a;
          }
          .playname {
            height: 37px;
            width: 100%;
            background-color: #313131;
            color: #d9a35a;
            line-height: 37px;
            font-size: 20px;
            margin-top: 137px;
          }
        }
      }
    }
    .arr {
      #left {
        width: 56px;
        height: 238px;
        position: absolute;
        left: 0px;
        top: 50%;
        margin-top: -119px;
        border-bottom: 1px solid #313131;
        border-top: 1px solid #313131;
        cursor: pointer;
        background: #15161a url("../../assets/images/ecleft.png") center center
          no-repeat;
        &:hover {
          background: #15161a
            url("../../assets/images/News-images/left-hover.png") center center
            no-repeat;
        }
      }
      #right {
        width: 56px;
        height: 238px;
        position: absolute;
        right: 0px;
        top: 50%;
        margin-top: -119px;
        border-bottom: 1px solid #313131;
        border-top: 1px solid #313131;
        cursor: pointer;
        background: #15161a url("../../assets/images/ecright.png") center center
          no-repeat;
        &:hover {
          background: #15161a
            url("../../assets/images/News-images/right-hover.png") center center
            no-repeat;
        }
      }
    }
  }
  .playerInfo {
    width: 100%;
    border: 1px solid #313131;
    margin-bottom: 28px;
    p {
      height: 42px;
      width: 100%;
      background: url("../../assets/images/News-images/playerinfo.png") repeat-x;
      ul {
        height: 42px;
        width: 100%;
        li {
          height: 42px;
          float: left;
          font-size: 15px;
          color: #fefefe;
          line-height: 42px;
          text-align: left;
          &:first-child {
            width: 190px;
            padding-left: 35px;
          }
          &:nth-child(2) {
            width: 80px;
          }
          &:nth-child(3) {
            width: 78px;
          }
          &:nth-child(4) {
            width: 106px;
          }
          &:nth-child(5) {
            width: 126px;
          }
          &:nth-child(6) {
            width: 88px;
          }
          &:nth-child(7) {
            width: 80px;
          }
          &:nth-child(8) {
            width: 100px;
          }
          &:nth-child(9) {
            width: 100px;
          }
          &:nth-child(10) {
            width: 100px;
          }
          &:nth-child(11) {
            width: 90px;
          }
        }
      }
    }
    .playDetail {
      height: (100%-42)px;
      width: 100%;
      ul {
        width: 100%;
        height: 100%;
        li {
          height: 50px;
          cursor: default;
          background-color: #131418;
          &:nth-child(odd) {
            background-color: #191a1d;
          }
          &:hover,&.active {
            background-color: #292b2f;
          }
          div {
            height: 50px;
            float: left;
            font-size: 14px;
            color: #dcdcdc;
            line-height: 50px;
            text-align: left;
            &:first-child {
              width: 190px;
              padding-left: 35px;
              position: relative;
              padding-left: 78px;
              p {
                width: 32px;
                height: 32px;
                border-radius: 50%;
                position: absolute;
                top: 10px;
                left: 35px;
                background-color: #fff;
                background-size: contain;
              }
            }
            &:nth-child(2) {
              width: 80px;
              img {
                width: 26px;
                height: 18px;
                margin-top: 16px;
              }
            }
            &:nth-child(3) {
              width: 78px;
            }
            &:nth-child(4) {
              width: 106px;
              padding-left: 21px;
            }
            &:nth-child(5) {
              width: 126px;
              padding-left: 28px;
            }
            &:nth-child(6) {
              width: 88px;
              padding-left: 7px;
            }
            &:nth-child(7) {
              width: 80px;
            }
            &:nth-child(8) {
              width: 100px;
              padding-left: 21px;
            }
            &:nth-child(9) {
              width: 100px;
              padding-left: 21px;
            }
            &:nth-child(10) {
              width: 100px;
              padding-left: 14px;
            }
            &:nth-child(11) {
              width: 90px;
              padding-left: 21px;
            }
          }
        }
      }
    }
  }
  .rbAnalysis {
    height: 425px;
    width: 100%;
    & > div {
      height: 40px;
      width: 100%;
      position: relative;
      .titlebg1 {
        position: absolute;
        width: 188px;
        height: 28px;
        left: 8px;
        top: 8px;
        background: url("../../assets/images/News-images/sprite.png") 0 -811px no-repeat;
      }
      .titlebg2 {
        position: absolute;
        width: 146px;
        left: 802px;
        top: 10px;
        height: 25px;
        background: url("../../assets/images/News-images/sprite.png") 0 -786px no-repeat;
      }
      span {
        line-height: 40px;
        font-size: 14px;
        color: #989898;
        float: left;
      }
      .rbword1 {
        margin-left: 606px;
      }
      .rbword2 {
        float: right;
      }
    }
    .redBlue {
      width: 782px;
      height: 405px;
      border: 1px solid #313131;
      background-color: #15161a;
      padding-top: 25px;
      text-align: left;
      float: left;
      margin-bottom: 50px;
      .red {
        width: 347px;
        height: 350px;
        float: left;
        margin-left: 23px;
        color: #dcdcdc;
        li {
          height: 35px;
          width: 100%;
          position: relative;
          line-height: 35px;
          padding-left: 4px;
          cursor: default;
          border: 1px solid #15161a;
          &:first-child {
            color: #be2e3e;
            &:hover {
              border: 1px solid #15161a;
            }
          }
          &:hover {
            border: 1px solid #9f7947;
          }
          span {
            position: absolute;
            top: 0;
            right: 12px;
          }
          .border {
            width: 171px;
            height: 20px;
            margin-top: 8px;
            border: 1px solid #be2e3e;
            margin-right: 52px;
            float: right;
            .bgc {
              height: 18px;
              background-color: #592028;
            }
          }
        }
      }
      .blue {
        width: 347px;
        height: 350px;
        float: right;
        margin-left: 30px;
        color: #dcdcdc;
        li {
          height: 35px;
          width: 98%;
          position: relative;
          line-height: 35px;
          padding-left: 4px;
          cursor: default;
          border: 1px solid #15161a;
          &:first-child {
            color: #3b80e8;
            &:hover {
              border: 1px solid #15161a;
            }
          }
          &:hover {
            border: 1px solid #9f7947;
          }
          span {
            position: absolute;
            top: 0;
            right: 12px;
          }
          .border {
            width: 171px;
            height: 20px;
            margin-top: 8px;
            border: 1px solid #3b80e8;
            margin-right: 52px;
            float: right;
            .bgc {
              height: 18px;
              background-color: #24406c;
            }
          }
        }
      }
    }
    .analysis {
      width: 344px;
      height: 350px;
      float: right;
      border: 1px solid #313131;
      background-color: #15161a;
    }
  }
}
</style>
