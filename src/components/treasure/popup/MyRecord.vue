<template>
  <div class="popup" v-if="getIsSHowMyRecord">
    <div class="popup-bg"></div>
    <div class="popup-main popup-myrecord">
        <div class="popup-close" @click="fnCLosePopup"></div>
        <div class="popup-title">我的记录</div>
        <div class="popup-main-myrecord" ref='competecontainter'  v-if="getMyRecordData" @mouseover="uploadData()">
          <div class="noData" v-if="getMyRecordData.length==0">暂无记录</div>
          <div id="content_scroll" v-if="getMyRecordData.length">
            <ul class="record_list">
              <li v-for="(item,index) in getMyRecordData" :key="index">
                <p class="content">{{item.updated_at}}</p>
                <p class="content">{{item.type}} {{item.status==2?'成功':'失败'}}开启{{item.count}}个福袋</p>
                <p class="content">获得<span v-for="(demo,key) in item.rewards" :key="key">{{demo.product_name+' ×'+demo.num}}，</span></p>
              </li>
            </ul>
          </div>

        </div>
      </div>
  </div>
</template>
<script>
import Vue from 'vue';
import vuescroll from 'vuescroll';
import 'vuescroll/dist/vuescroll.css';
Vue.use(vuescroll);
  export default {
    data(){
      return{
      }
    },
    methods:{
      fnCLosePopup(){

        this.$store.commit('mutationsIsSHowMyRecord',false);
        this.$store.commit('mutationsTreasureIsReload',true);
        this.$store.commit('mutationsTreasureIsMore',true);
        this.$store.commit('mutationsTreasurePage',1);
        this.$store.commit('mutationsMyRecordData',null);
      },
      uploadData(){

        let box =document.getElementById('content_scroll');

        box.addEventListener("scroll",this.upshifData(box));



      },
      upshifData(Box){

        let reload =this.$store.state.treasure.isReload;
        let isMore =this.$store.state.treasure.isMore;
        let page =this.$store.state.treasure.page;
        console.log('reload',reload)
        if(!reload||!isMore)return;
        let scrollTop = Box.pageYOffset || Box.scrollTop;
        if (scrollTop + Box.offsetHeight >=Box.scrollHeight) {
          console.log('我是什么呢')
          if(!reload&&!isMore)return;
          this.$store.commit('mutationsTreasureIsReload',false);
          this.$store.commit('mutationsTreasureIsMore',false);
          page+=1;
          setTimeout(() => {
            this.$store.commit('mutationsTreasurePage',page);
            let params={
                page,
                size:4,
            }
            this.$store.dispatch('actionsMyRecordData',params)
          }, 300);

        }
      },
    },
    mounted() {
    },
    computed:{
      getIsSHowMyRecord(){
        return this.$store.state.treasure.isSHowMyRecord;
      },
      getMyRecordData(){
        console.log('我的记录',this.$store.state.treasure.myRecordData)
        return this.$store.state.treasure.myRecordData;
      },
    },
    components:{
      // vuescroll,
    },
  }
</script>
<style lang="scss" scoped src="@/assets/css/treasure.css"></style>
