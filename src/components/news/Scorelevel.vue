<template>
  <div id='level' :style="{width:'100px',height:'100px'}">


    
  </div>
</template>

<script>
let echarts = require("echarts/lib/echarts");
require('echarts/lib/chart/pie')
export default {
  data() {
    return {
      num: 1
    };
  },
  props: ["level"],
  methods: {
    echarts() {
      let myChart = echarts.init(document.getElementById("level"));
      // 绘制表格
      myChart.setOption({
        color:['#d9a35a','#3d342b'],
        series: [
          {
            type: "pie",
            radius: ["50%", "70%"],
            avoidLabelOverlap: false,
            label: {
              normal: {
                show: false,
                position: "center"
              },
              emphasis: {
                show: true,
                textStyle: {
                  fontSize: "30",
                  fontWeight: "bold"
                }
              }
            },
            labelLine: {
              normal: {
                show: false
              }
            },
            data: [{ value: this.num, name: "" }, { value: (1-this.num), name: "" }]
          }
        ]
      });
    }
  },
  created() {
    if (this.level == "S") {
      this.num = 5 / 6;
    } else if (this.level == "A") {
      this.num = 4 / 6;
    } else if (this.level == "B") {
      this.num = 3 / 6;
    } else if (this.level == "C") {
      this.num = 2 / 6;
    } else if (this.level == "D") {
      this.num = 1 / 6;
    } else if (this.level == "E") {
      this.num = 0;
    }
  },
  mounted() {
    this.echarts();
  }
};
</script>

<style scoped lang='scss'>
#level{
  margin-left:78px;
}
</style>