<template>
  <div id="teamrank" v-if="gameid==1||gameid==2">
    <!-- 标题 -->
    <div class="title">
      <div class="titlebg"></div>
      <router-link :to="{path:'/teamdetail',query:{game_id:gameid}}" tag="span" @click.native="bgimage(require('@/assets/images/background.jpg'))">更多
        <i class="border"></i>
      </router-link>
    </div>
    <!-- 排名列表 -->
    <div class="list">
      <p class="listtitle">
        <span>排名</span>
        <span>战队</span>
        <span>地区</span>
      </p>
      <ul>
        <router-link v-if="data.game_id==2" tag='li' v-for="data in tendatas" :key="data.id" :to="{path:'/teaminfo',query:{team_id:data.team_id,team_name:data.format_data.TeamInfo.Name,region_logo:data.format_data.TeamInfo.Region.Logo,game_id:data.game_id}}" @click.native="bgimage(require('@/assets/images/background.jpg'))">
          <div class="rank">
            <span>{{data.format_data.Ranking}}</span>
          </div>
          <!-- ================================team logo==================================== -->
          <div class="teamlog"><img :src="data.format_data.TeamInfo.Logo" alt=""></div>
          <!-- ===============================team name===================================== -->
          <div class="teamname">
            <span>{{data.format_data.TeamInfo.Name}}</span>
          </div>
          <!-- ===============================team country================================== -->
          <div class="country"><img :src="data.format_data.TeamInfo.Region.Logo" alt=""></div>
        </router-link>
        <router-link v-if="data.game_id==1" tag='li' v-for="data in tendatas" :key="data.id" :to="{path:'/teaminfo',query:{team_id:data.team_id,team_name:data.format_data.Team.Name,region_logo:data.format_data.Region.Logo,game_id:data.game_id}}" @click.native="bgimage(require('@/assets/images/background.jpg'))">
          <div class="rank">
            <span>{{data.format_data.Ranking}}</span>
          </div>
          <!-- ================================team logo==================================== -->
          <div class="teamlog"><img :src="data.format_data.Team.Logo" alt=""></div>
          <!-- ===============================team name===================================== -->
          <div class="teamname">
            <span>{{data.format_data.Team.Name}}</span>
          </div>
          <!-- ===============================team country================================== -->
          <div class="country"><img :src="data.format_data.Region.Logo" alt=""></div>
        </router-link>
      </ul>
    </div>
  </div>
</template>


<script>
export default {
  data(){
    return{
      game_id : ''
    }
  },
  mounted() {
    if(this.game_id!=2){
      this.$store.dispatch("newsteamrankdispatch",this.game_id);
    }else{
      this.$store.dispatch("newsteamrankdispatch");
    }
  },
  computed: {
    newsteamrank: function() {
      return this.$store.state.news.newsteamrank
        ? this.$store.state.news.newsteamrank
        : null;
    },
    gameid: function() {
      console.log(this.$store.state.news.gameid,'teamrank')
      this.game_id = this.$store.state.news.gameid
      return this.$store.state.news.gameid;
    },
    tendatas: function() {
      if (!this.$store.state.news.newsteamrank) {
        return [
          {
            id: 0,
            game_id: 2,
            team_id: 0,
            data: null,
            format_data: {
              TeamInfo: {
                Region: {
                  ParentId: 45,
                  Logo:
                    "https://cdn.esportsmatrix.com/lol/Content/images/uploaded/region/7d7f87f0-2648-4a18-b726-a705db19805d.png",
                  Id: 0,
                  Name: null
                },
                Code: "SSG",
                TeamDescription: null,
                Id: 9,
                Name: "Samsung Galaxy",
                Description: null,
                Logo:
                  "https://cdn.esportsmatrix.com/lol/Content/images/uploaded/team/6e5bcb21-dc81-43d6-8e3d-614a6f1e8682.png"
              },
              Strength: 1898,
              FormBonus: 49,
              WinLoss: 80,
              Fb: 36,
              Ft: 72,
              Fd: 60,
              Fbaron: 70.833,
              Fh: 50,
              Throw: 0,
              Comeback: 16,
              ActiveState: 1,
              WinCount: 4,
              GainCount: 6,
              GlobalRanking: 1,
              RegionRanking: 1,
              Ranking: 1,
              RankingState: 0,
              TowerDiffAt20: 1.2,
              GoldDiffAt25: 2.22,
              DragonAt20: 0.8
            },
            score: "788",
            created_at: "2017-12-14 09:21:45"
          }
        ];
      }
      var tendatas = this.$store.state.news.newsteamrank.slice(0, 10);
      return tendatas;
    }
  },
  methods: {
    bgimage(str) {
      this.$store.dispatch("background", str);
    }
  },
  created(){
    if(this.$route.query.game_id){
      this.game_id = this.$route.query.game_id
    }else{
      this.game_id = this.gameid
    }
  },
  watch:{
    'gameid':function(){
      this.game_id = this.gameid
    }
  }
};
</script>

<style scoped lang="scss">
#teamrank {
  margin-top: 24px;
  height: 554px;
  width: 380px;
  .title {
    width: 380px;
    height: 46px;
    padding-top:12px;
    color: #989898;
    font-size: 12px;
    line-height: 25px;
    text-align: right;
    background-color: #1b1c1f;
    .titlebg {
      width: 98px;
      height: 25px;
      margin-left: 8px;
      float: left;
      background: url("../../assets/images/News-images/sprite.png") 0 -501px no-repeat;
    }
    span {
      cursor: pointer;
      float: right;
      &:hover {
        color: #e1bf75;
        .border {
          font-size: 0;
          line-height: 0;
          border-width: 5px;
          border-color: #e1bf75;
          border-right-width: 0;
          border-style: dashed;
          border-left-style: solid;
          border-top-color: transparent;
          border-bottom-color: transparent;
          display: inline-block;
          margin-left: 2px;
          margin-right: 2px;
        }
      }
    }
    .border {
      font-size: 0;
      line-height: 0;
      border-width: 5px;
      border-color: #989898;
      border-right-width: 0;
      border-style: dashed;
      border-left-style: solid;
      border-top-color: transparent;
      border-bottom-color: transparent;
      display: inline-block;
      margin-left: 2px;
      margin-right: 2px;
    }
  }
  .list {
    height: 514px;
    width: 380px;
    .listtitle {
      width: 100%;
      height: 44px;
      background-color: #15161a;
      margin-bottom: 1px;
      font-size: 16px;
      color: #e1c076;
      line-height: 44px;
      span {
        float: left;
        &:nth-child(1) {
          margin-left: 22px;
        }
        &:nth-child(2) {
          margin-left: 22px;
        }
        &:nth-child(3) {
          margin-left: 224px;
        }
      }
    }
    ul {
      height: 450px;
      width: 380px;
      li {
        width: 380px;
        height: 47px;
        background-color: #15161a;
        margin-bottom: 1px;
        font-size: 16px;
        color: #fff;
        line-height: 47px;
        text-align: left;
        &:hover {
          background: url('../../assets/images/News-images/smalltrank-hover.png');
        }
        div {
          float: left;
        }
        span {
          margin-left: 31px;
        }
        .rank {
          width: 70px;
          height: 44px;
        }
        .teamname {
          width: 196px;
          height: 44px;
          font-size: 14px;
        }
        .teamlog {
          width: 54px;
          height: 44px;
          display: table-cell;
          vertical-align: middle;
          img {
            width: 34px;
            height: 30px;
            margin-left: 4px;
            vertical-align: middle;
          }
        }
        .country {
          width: 60px;
          height: 44px;
          display: table-cell;
          vertical-align: middle;
          text-align: center;
          img {
            width: 40px;
            height: 30px;
            vertical-align: middle;
          }
        }
      }
    }
  }
}
</style>
