<template>
  <div>
    <van-list v-model="loading" :finished="finished" @load="onLoad" :loading-text="loadText">
      <div class="listactive" v-for="(item,index) in list" :key="index">
        <a :href="item.url_pc" target="_blank">
          <img :src="item.img_url_pc" class="img-lazy" :title="item.activity_name">
          <span class="imgconfirm" v-if="item.is_hot==1 && item.is_new==0">火热</span>
          <span class="imgconfirm1" v-if="item.is_new==1 ">最新</span>
          <span class="btns">立即参与</span>
        </a>
      </div>
    </van-list>
    <div class="bottoms">
      <img src="../../assets/img/activity/left.png" alt>
      <span class="spanbottom">更多活动 敬请期待</span>
      <img src="../../assets/img/activity/right.png" alt>
    </div>
  </div>
</template>
<script>
import { List } from "vant";
import Http from "@/common/http";
import { setTimeout } from 'timers';
export default {
  name: "Actuvecenter",
  components: {
    "van-list": List
  },

  data() {
    return {
      loading: false,
      finished: false,
       loadText:'加载中…',
      pageNum: 1,
      list: [],
      totalNum: Number,
      timer:null
    };
  },
  destroyed(){
     clearTimeout(this.timer);
  },
  methods: {
    //获取页面数据
    getdata() {
      Http.get("activity/get/list", {
        page: this.pageNum
      }).then(res => {
        const data = res.data;
        if (data.code == 0) {
          var infoArr = data.data.items;
          this.totalNum = data.data.meta.total;
          // console.log("活动活动infoArr",infoArr)
          if (infoArr.length !== 0) {
            //新增数据拼接在后面
            this.list = this.list.concat(infoArr);
          }
          this.loading = false;
          //数据加载完
          if (this.list.length >= this.totalNum || this.totalNum ==0) {
            this.finished = true;
            return false;
          }
           this.pageNum++
        }
      });
    },
    onLoad() {
     　this.timer = setTimeout(()=>{
        this.getdata();
            },500)
         }
  }
};
</script>
<style scoped lang="scss">
.img-lazy {
  width: 100%;
  height: 280px;
}
.listactive {
  width: 100%;
  height: 280px;
  margin-bottom: 10px;
  position: relative;
  &:hover {
    background: rgba(35, 32, 36, 1);
    opacity: 0.85;
  }
  .imgconfirm,
  .imgconfirm1 {
    width: 40px;
    height: 43px;
    display: block;
    position: absolute;
    top: 0;
    right: 14px;
    background: url(../../assets/img/activity/redhot.png) no-repeat top center;
    background-size: 100%;
    font-size: 14px;
    line-height: 36px;
    font-weight: bold;
    color: rgba(255, 255, 255, 1);
  }
  .imgconfirm1 {
    background: url(../../assets/img/activity/newyellow.png) no-repeat top center;
    background-size: 100%;
  }
  .btns {
    position: absolute;
    left: 50%;
    top: 50%;
    margin-top: -14px;
    margin-left: -48px;
    width: 96px;
    height: 28px;
    line-height: 26px;
    background: transparent;
    border: 1px solid rgba(255, 255, 255, 1);
    border-radius: 14px;
    font-size: 15px;
    font-weight: bold;
    color: rgba(255, 255, 255, 1);
    cursor: pointer;
    display: none;
    outline: none;
  }
  &:hover {
    .btns {
      display: block;
    }
  }
}
.bottoms {
  width: 100%;
  height: 14px;
  margin-top: 50px;
  margin-bottom: 20px;
  line-height: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  img {
    width: 225px;
    height: 1px;
  }
}
.spanbottom {
  margin: 0 14px;
  font-size: 15px;
  font-weight: bold;
  color: rgba(208, 208, 209, 1);
}
</style>



