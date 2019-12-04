<template>
  <div class="compete-list-menu" id="compete_nav">
    <ul>
      <router-link v-for="(item,index) in Menu" activeClass="active" :data-name="item.game" ref="game" :to="item.href+'?ID='+item.game" tag="li" :key="item.id"><span :class="'icon_logo'+index"></span>{{item.tab}}</router-link>
    </ul>
    <i class="clear"></i>
  </div>
  <!-- <img src="../../assets/images/matchcenter/wzry_icon.png" alt=""> -->
</template>
<style scoped lang="scss">
.compete-list-menu {
  height: 40px;
  line-height: 40px;
  text-align: center;
  font-size: 13px;
  border-top: #5a5b5d 2px solid;
  ul {
    display: flex;
    justify-content: space-around;
    height:38px;
    border: #1f1b1c 1px solid;
  }
  li::before{content:'';display:block; width:2px; height:100%; position:absolute;top:0;right:0; background: url("../../assets/images/competeImg/guess_menuBg.jpg") no-repeat center; }
  li:last-child:before{display:none; }
  li {
    // width: 160px;
    width:16.7%;
    float: left;
    background: url("../../assets/images/competeImg/guess_menuH.png") no-repeat;position:relative;top:0;left:0;
    // text-shadow: #070a11 1px 3px 10px;
    color:#b8b8b8;
    span {
      width: 32px;
      height: 20px;
      background: url("../../assets/images/competeImg/guess_logoG.png")
        no-repeat;
      display: inline-block;
      vertical-align: -4px;
      -webkit-transition: all 0.5s;

    }
    .icon_logo0 {
      display: none !important;
      width: 0;
      height: 0;
      background: none !important;
    }
    .icon_logo1 {
      background-position: 0 0;
    }
    .icon_logo2 {
      background-position: -32px 0;
    }
    // .icon_logo3 { //pubg
    //   background-position: -64px 0;
    // }
    .icon_logo4 {
      background-position: -96px 0;
    }
    .icon_logo5 {
      background-position: -128px 0;
    }
    .icon_logo3 {//王者荣耀
      width: 32px;
      height: 22px;
      display: inline-block;
      background: url("../../assets/images/matchcenter/wzry_icon.png") no-repeat;
      // background-position: -128px 0;
    }
  }

  li:hover,
  li.active {
    background-image: url("../../assets/images/competeImg/guess_menuA.png");
    color:#fff;
    span {
      background-image: url("../../assets/images/competeImg/guess_logoS.png");
    }
     .icon_logo3 {//王者荣耀
        width: 32px;
        height: 22px;
        display: inline-block;
        background: url("../../assets/images/matchcenter/wzry_icon_lh.png") no-repeat;
      }
  }
}
</style>
<script>
let menu = [
  { tab: "全部比赛", game: "all", href: "./Quizzeszone" },
  { tab: "英雄联盟", game: "lol", href: "./Lol" },
  { tab: "DOTA2", game: "dota", href: "./Dota2" },
  // { tab: "绝地求生", game: "pubg", href: "./Jedi" },
  { tab: "王者荣耀", game: "wzry", href: "./ArenaOfValor" },
  { tab: "CSGO", game: "csgo", href: "./Csgo" },
  { tab: "体育频道", game: "football", href: "./Sport" }
];
export default {
  data() {
    return {
      Menu: menu,
      num: 0
    };
  },
  methods: {
    tabs: function(index) {
      this.num = index;
    }
  }
};
</script>
