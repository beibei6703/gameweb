<template>
  <div id="testDialog">
      <div class="testDialogWrap">
        <div class="testMain" id="testID" v-html="testData" v-if="testData">

        </div>
      </div>
  </div>
</template>

<script>
  export default {
    computed: {
      testData() {
        return this.$store.state.pay.aliContent || null;
      }
    },
    mounted() {
      // // document.getElementById("testID").innerHTML=this.$store.state.pay.aliContent;
      console.log(this.$store.state.pay.aliContent);
      // const div = document.createElement("div");
      // div.innerHTML =this.$store.state.pay.aliContent;
      // document.getElementById("testID").appendChild(div);
    },
  }
</script>

<style scoped lang="scss">
  #testDialog{
    width: 100%;
    height: 100%;
    position: fixed;
    top:0;
    right: 0;
    bottom: 0;
    left: 0;
    outline: 0;
    z-index: 88;
    .testDialogWrap{
      position: fixed;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      outline: 0;
      background: rgba(5,6,6,.8);
      .testMain{
        width: 500px;
        height: 500px;
        position: fixed;
        top:50%;
        left: 50%;
        transform: translate(-50%,-50%);
        z-index: 2;
        background: #fff;
      }
    }
  }
</style>
