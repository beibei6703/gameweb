<template>
  <div id="servererror">
    <div class="info">
      <div class="word">
      抱歉，<br>
      服务器出错了
      </div>
      <router-link class="btn" tag="div" :to="{path:'/home'}">
        返回首页
      </router-link>
    </div>
  </div>
</template>

<script>
  export default {
    
  }
</script>

<style scoped lang='scss'>
  #servererror{
    height: 740px;
    background: #1b1c1f url('../assets/images/500.png') 320px 186px no-repeat;
    .info{
      padding-left:588px;
      padding-top: 222px;
      .word{
        font-size: 35px;
        color: #afafb1;
        font-weight: bold;
        line-height: 48px;
        margin-bottom: 20px;
        text-align: left;
      }
      .btn{
        font-size: 16px;
        color:#fff;
        width: 86px;
        height: 32px;
        text-align: center;
        line-height: 32px;
        background-color: #ae302b;
        border-radius: 3px;
        cursor: pointer;
        &:hover{
          background-color: #ed4b4b;
        }
      }
    }
  }
</style>