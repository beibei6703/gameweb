<template>
  <div id='echarts' :style="{width:'350px',height:'350px'}">

  </div>
</template>

<script>
import Http from "../../common/http";
let echarts = require("echarts/lib/echarts");
require('echarts/lib/chart/radar')
export default {
  props: ["data"],
  methods: {
    echarts() {
      // 基于准备好的dom，初始化echarts实例
      if (!this.data) {
        return;
      }
      let myChart = echarts.init(document.getElementById("echarts"));
      // 绘制表格
      myChart.setOption({
        radar: [
          {
            indicator: [
              {
                text: this.data[0].pos+'('+this.data[0].value+')',
                max: 2100,
                mix: 1700,
                color: "#dcdcdc"
              },
              {
                text: this.data[1].pos+'('+this.data[1].value+')',
                max: 2100,
                mix: 1700,
                color: "#dcdcdc"
              },
              {
                text: this.data[2].pos+'('+this.data[2].value+')',
                max: 2100,
                mix: 1700,
                color: "#dcdcdc"
              },
              {
                text: this.data[3].pos+'('+this.data[3].value+')',
                max: 2100,
                mix: 1700,
                color: "#dcdcdc"
              },
              { text: this.data[4].pos+'('+this.data[4].value+')', max: 2100, mix: 1700, color: "#dcdcdc" }
            ],
            center: ["50%", "50%"],
            radius: 80
          }
        ],
        series: [
          {
            type: "radar",
            tooltip: {
              trigger: "item"
            },
            itemStyle: {
              normal: { areaStyle: { color: "#d9a35a", opacity: 0.5 } }
            },
            data: [
              {
                value: [
                  this.data[0].value,
                  this.data[1].value,
                  this.data[2].value,
                  this.data[3].value,
                  this.data[4].value
                ],
              }
            ]
          }
        ]
      });
    }
  },
  munted() {
    this.echarts();
  },
  watch: {
    data: "echarts"
  }
};
</script>

<style scoped lang='scss'>
</style>