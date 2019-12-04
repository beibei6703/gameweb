<template>
  <div id='table'>
    <ul class="table cmcardtab">
      <li ref="tab2" @click="tab(2,require('@/assets/images/News-images/news-lolbg.jpg'))" :class="{active:currentLi==2}"><span class="cpic c2"></span>英雄联盟</li>
      <li ref="tab1" @click="tab(1,require('@/assets/images/News-images/news-dota2bg.jpg'))" :class="{active:currentLi==1}"><span class="cpic c3"></span>DOTA2</li>
      <!-- <li ref="tab4" @click="tab(4,require('@/assets/images/News-images/news-pubgbg.jpg'))" :class="{active:currentLi==4}"><span class="cpic c4"></span>绝地求生</li> -->
      <li ref="tab7" @click="tab(7,require('@/assets/images/matchcenter/wzry.png'))" :class="{active:currentLi==7}"><span class="cpicc"></span>王者荣耀</li>
      <li ref="tab3" @click="tab(3,require('@/assets/images/News-images/news-csgobg.jpg'))" :class="{active:currentLi==3}"><span class="cpic c5"></span>CSGO</li>
      <li ref="tab5" @click="tab(5,require('@/assets/images/matchcenter/news_banner_bg.jpg'))" :class="{active:currentLi==5}"><span class="cpic c6"></span>体育频道</li>
    </ul>
    <!-- <img src="../../assets/images/matchcenter/wzry_icon_lh.png" alt=""> -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      currentLi: ""
    };
  },
  props:['gameid'],
  methods: {
    tab(num,str) {
      this.$store.dispatch("newshotnewslistdispatch", num);
      this.$store.dispatch("newsteamrankdispatch", num);
      this.$store.dispatch("newsnumber10dispatch", num);
      this.$store.dispatch("setid", num);
      this.$store.dispatch("background", str);
      this.currentLi = num;
    }
  },
  created() {
    console.log(this.gameid,'????')
    this.tab(2,require('@/assets/images/News-images/news-lolbg.jpg'))
  },
  watch:{
    'gameid':function(){
      if(this.gameid == 2){
        this.tab(2,require('@/assets/images/News-images/news-lolbg.jpg'))
      }else if(this.gameid == 1){
        this.tab(1,require('@/assets/images/News-images/news-dota2bg.jpg'))
      }else if(this.gameid == 4){
        this.tab(4,require('@/assets/images/News-images/news-pubgbg.jpg'))
      }else if(this.gameid == 3){
        this.tab(3,require('@/assets/images/News-images/news-csgobg.jpg'))
      }else if(this.gameid == 5){
        this.tab(5,require('@/assets/images/matchcenter/news_banner_bg.jpg'))
      }else if(this.gameid == 7){
        this.tab(7,require('@/assets/images/matchcenter/wzry.png'));
      }
    }
  }
};
</script>

<style scoped lang="scss">
.table {
  width: 1200px;
  height: 51px;
  }
  .cmcardtab{//预测选项
    height:46px ;
    overflow: hidden;
    text-align: center;
    display: flex;
    justify-content: space-between;
    li{
        float: left;
        line-height: 45px;
        width:20%;
        color:#dcdcdc;
        font-size: 14px;
        text-align: left;
        background: url("../../assets/images/custom.png") no-repeat;
        background-position: -145px -55px;
        &:nth-child(1){
            text-align: center;
        }
        &:hover{
            background: url("../../assets/images/custom.png") no-repeat;
            background-position: -441px -0px;
            .cpic{
                background: url("../../assets/images/custom.png") no-repeat;
                display: inline-block;
            }
            .cpicc{
              background: url("../../assets/images/matchcenter/wzry_icon_lh.png") no-repeat;
            }
            .c2{
                background-position: -160px 2px;
                width:24px;
                height: 24px;
            }
            .c3{
                background-position: -108px 0px;
            }
            .c4{
                background-position: -220px 0px;
            }
            .c5{
                background-position: -82px 0px;
            }
            .c7{
              background-position: -82px 0px;
            }
        }
        .hcleft{
            float:left;
        }
    }
    .cpic{
        display: inline-block;
        width: 18px;
        height: 18px;
        margin-bottom: -6px;
        background: url("../../assets/images/custom.png") no-repeat;
    }
    .cpicc{
      display: inline-block;
      width: 32px;
      height: 22px;
      margin-bottom: -6px;
      margin-left: 70px;
      background: url("../../assets/images/matchcenter/wzry_icon.png") no-repeat;
    }
    .c2{
        background-position:-194px 5px;
        width:24px;
        height: 24px;
        margin-left: 8px;
    }
    .c3{
          margin-left: 88px;
          margin-right:6px;
          background-position: -134px 0px;
          width:16px;
    }
    .c4{
          background-position: -258px 0px;
          width:28px;
          margin-left: 76px;
          margin-right: 4px;
    }
    .c5{
          margin-left: 96px;
          margin-right:5px;
          background-position: -56px 0px;
          width:16px;
    }
    .c6{
          margin-left: 78px;
          margin-right: 5px;
          background-position: -28px 0px;
    }
    .c7{
          margin-left: 78px;
          margin-right: 5px;
          background-position: -28px 0px;
    }
}

</style>
