<template>
  <div id="warehouse">
      <ul class="nav">
        <li v-for="(val,key) in nav" :key="key" :class="{active:key==num}"  @click="fnNav(key)">{{val}}</li>
      </ul>
      <p class="redPoint" v-if="this.$store.state.mall.isRedPointShow"></p>
      <div class="dynamicMain">
        <component :is="wareHouseCurrent?wareHouseCurrent:currentView"></component>
      </div>
      <!-- <CanSysthetic/> -->
  </div>
</template>

<script>
import { parse } from "qs";
  export default {
    data() {
      return {
        nav:['宝箱','道具','合成'],
        num:0,
        currentView:'Mybag'
      }
    },
    methods: {
      fnNav(key) {
        this.num=key;
        if(this.num==0){
          this.currentView='TreasureBox';
          if(this.$store.state.mall.isRedPointShow){
            this.$store.commit('mutationShowRedpoint',false)
          }
        }else if(this.num==1){
          this.currentView='Mybag';
        }else if(this.num==2){
          this.currentView='Compose';
          if(this.$store.state.mall.isRedPointShow){
            this.$store.commit('mutationShowRedpoint',false)
          }
        }
        this.$store.commit("warehouseCurrentMutation",null);
      }
    },
    mounted() {
      let current = parse(this.$route.params.current).current;
      if(current){
        this.num=current;
        console.log(this.num,'让我看看你的样子呢');
        if(this.num==0){
          this.currentView='TreasureBox';
        }else if(this.num==1){
          this.currentView='Mybag';
        }else if(this.num==2){
          this.currentView='Compose';
        }
      }
      this.$store.commit("warehouseCurrentMutation",null);
    },
    destroyed() {
      this.currentView='TreasureBox';
    },
    computed: {
      wareHouseCurrent() {
        if(this.$store.state.garden.wareHouseCurrent){
          this.num=2;
        }
        console.log(this.$store.state.garden.wareHouseCurrent);
        return this.$store.state.garden.wareHouseCurrent || null ;
      }
    },
  }
</script>

<style scoped lang="scss">
  #warehouse{
    position: relative;
    .nav{
      width: 100%;
      height: 48px;
      display: flex;
      background: #3c3c44;
      padding: 8px 0 0 26px;
      position: relative;
      li{
        width: 80px;
        height: 40px;
        text-align: center;
        line-height: 40px;
        font-size: 14px;
        color:#858585;
      }
      .active{
        background: #242425;
        color: #fff;
      }
    }
    .redPoint{
      width: 10px;
      height: 10px;
      border-radius: 50%;
      background: #ed4b4b;
      position: absolute;
      left: 166px;
      top: 13px;
    }
  }
</style>
