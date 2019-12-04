<template>
  <div id="pagination">
    <button class="btn btn_pager" :disabled="this.current == 1" @click="prePage">上一页</button>
    <span v-if="pageNo !== 1" class="page_index" :class="{active:current==1}" @click="goPage(1)">1</span>
    <span v-if="preClipped" class="page_index">...</span>
    <span v-for="index in pages" class="page_index" :class="{active:current==index}" :key="index" @click="goPage(index)">{{index}}</span>
    <span v-if="backClipped" class="page_index">...</span>
    <span class="page_index" :class="{active:current==pageNo}" @click="goPage(pageNo)">{{pageNo}}</span>
    <button class="btn btn_pager" :disabled="this.current == pageNo" @click="nextPage">下一页</button>
  </div>
</template>

<script>
  export default {
    props: {
       // 用于记录总页码，由父组件传过来
      pageNo: {
        type: Number,
        default: 1
      },
      // 用于记录当前页数，父组件进行通信来完成每一页的数据更新，改变current的值来控制整个页面的数据
      currentPage: {
        type: Number,
        default: 1
      }
    },
    data() {
      return {
        // 用于判断省略号是否显示
        backClipped: true,
        preClipped: false,
        current:this.currentPage,
        totalPage:this.pageNo,
      }
    },
    watch:{
      currentPage(val){
        this.current = val || 1;
      },
      pageNo(val){
        this.totalPage=val || 1;
      }
    },
    methods: {
      prePage () {// 上一页
        if(this.current>1){
          this.current--;
        }
        this.$emit('change',this.current);
      },
      nextPage () {// 下一页
        if(this.current<this.totalPage){
          this.current++;
        }
        this.$emit('change',this.current);
      },
      goPage (index) {// 跳转到相应页面
        if (index !== this.current) {
          this.current = index;
          this.$emit('change',this.current);
        }
      }
    },
    computed: {
      pages () {
        let ret = [];
        if (this.current > 3) {
          // 当前页码大于三时，显示当前页码的前2个
          ret.push(this.current - 2);
          ret.push(this.current - 1);
          if (this.current > 4) {
            // 当前页与第一页差距4以上时显示省略号
            this.preClipped = true;
          }
        } else {
          this.preClipped = false;
          for (let i = 2; i < this.current; i++) {
            ret.push(i);
          }
        }
        if (this.current !== this.pageNo && this.current !== 1) {
          ret.push(this.current);
        }
        if (this.current < (this.pageNo - 2)) {
          // 显示当前页码的后2个
          ret.push(this.current + 1);
          ret.push(this.current + 2);
          if (this.current <= (this.pageNo - 3)) {
            // 当前页与最后一页差距3以上时显示省略号
            this.backClipped = true;
          }
        } else {
          this.backClipped = false;
          for (let i = (this.current + 1); i < this.pageNo; i++) {
            ret.push(i);
          }
        }
        // 返回整个页码组
        return ret;
      }
    },
  }
</script>

<style scoped lang="scss">
  #pagination {
    text-align: center;
    margin:10px 0;
  }
  .btn_pager {
    margin-left: 10px;
    padding: 0px;
    width: 60px;
    height: 30px;
    text-align: center;
    color: #dcdcdc;
    border: 1px solid #535353;
    border-radius: 0px;
    background: #2e2d31;
    &:hover{
      border: 1px solid #ba9665;
      color: #fff;
    }
  }
  .page_index {
    display: inline-block;
    margin-left: 10px;
    width: 35px;
    height: 30px;
    line-height: 30px;
    cursor: pointer;
    color: #dcdcdc;
    border: 1px solid #535353;
    &:hover{
      border: 1px solid #ba9665;
      color: #fff;
    }
  }
  .active {
    color: #fff;
    background: #ba9665;
  }
</style>
