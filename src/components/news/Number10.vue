<template>
  <div id="number10" v-if="gameid==1||gameid==2">
    <!-- 标题 -->
    <div class="title">
      <div class="titlebg"></div>
    </div>
    <!-- 列表 -->
    <div class="list">
      <ul>
        <li v-for="(data,index) in newsnumber10" :key="index" :style="{backgroundImage:'url('+data.player_logo+')'}">
          <div class="content">
            <span class="one">{{index+1}}</span>
            <span class="teamlog" v-if="data.game_id==2" :style="{backgroundImage:'url('+data.format_data.PlayerBasicInfo.TeamLogo+')'}"></span>
            <span class="teamlog" v-else-if="data.game_id==1" :style="{backgroundImage:'url('+data.format_data.Team.Logo+')'}"></span>
            <div class="data">
              <span class="name">{{data.player_name}}</span>
              <span class='number'>战力：
                <i>{{data.strength}}</i>
              </span>
            </div>
          </div>

        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  mounted() {
    if (!this.$store.state.news.newsnumber10) {
      this.$store.dispatch("newsnumber10dispatch");
    }
  },
  computed: {
    newsnumber10: function() {
      return this.$store.state.news.newsnumber10
        ? this.$store.state.news.newsnumber10
        : null;
    },
    gameid: function() {
      return this.$store.state.news.gameid;
    }
  }
};
</script>

<style scoped lang='scss'>
#number10 {
  width: 800px;
  height: 100%;
  margin-top:30px;
  .title {
    width: 98px;
    height: 25px;
    margin-bottom: 15px;
    .titlebg {
      width: 98px;
      height: 25px;
      margin-left: 8px;
      background: url("../../assets/images/News-images/sprite.png") 0 -601px no-repeat;
    }
  }
  .list {
    width: 800px;
    height: 444px;
    background-color: #15161a;
    ul {
      width: 800px;
      height: 444px;
      padding-top: 24px;
      padding-bottom: 24px;
      li {
        position: relative;
        width: 140px;
        height: 170px;
        float: left;
        margin-right: 25px;
        background-color: #fff;
        background-position: center center;
        background-repeat: no-repeat;
        background-size: 95%;
        cursor: default;
        &:nth-child(-n + 5) {
          margin-bottom: 58px;
        }
        &:nth-child(5) {
          margin-right: 0;
        }
        &:nth-child(10) {
          margin-right: 0;
        }
        .one {
          width: 32px;
          height: 20px;
          line-height: 20px;
          text-align: center;
          color: #fff;
          background-color: #d9a35a;
          font-size: 14px;
          position: absolute;
          top: 0;
          right: 0;
        }
        .teamlog {
          width: 30px;
          height: 30px;
          position: absolute;
          top: 4px;
          left: 6px;
          background-position: center center;
          background-repeat: no-repeat;
          background-size: 100%;
        }
        .data {
          height: 26px;
          width: 100%;
          line-height: 26px;
          position: absolute;
          bottom: 0;
          background-color: #323333;
          .name {
            font-size: 14px;
            color: #fff;
          }
          .number {
            font-size: 12px;
            color: #d9a35a;
            i {
              font-style: normal;
            }
          }
        }
      }
    }
  }
}
</style>