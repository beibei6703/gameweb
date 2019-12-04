<template>
    <div class="conteinline">
          <el-date-picker
          class="timecon"
            v-model="value"
           :default-value="value"
           value-format="yyyy-MM-dd"
            type="daterange"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            @change="getdateTime"
             :picker-options="pickerOptions"
            :default-time="['12:00:00']">
        </el-date-picker>
        <div class="btns">
        <el-button type="primary" @click="getToday">今天</el-button>
        <el-button type="primary"  @click="getweek">最近7天</el-button>
        <el-button type="primary"  @click="getmonths">最近一个月</el-button>
        </div>
        <div class="line">
            <div id="myChart" :style="{width: '100%', height: '300px'}"></div>
        </div>
    </div>
</template>
<script>
import { DatePicker, Button } from "element-ui";
import Http from "@/common/http";
import { major } from "semver";
// import VeLine from 'v-charts/lib/line.common';
export default {
  name: "Promoterline",
  components: {
    "el-date-picker": DatePicker,
    "el-button": Button
  },
  data() {
    return {
      value: "",
      value1: "",
      ynumber: [],
      keys: [],
      ydata: [],
      pickerOptions: {
        disabledDate(time) {
          let _now = Date.now(),
            seven = 30 * 24 * 60 * 60 * 1000,
            sevenDays = _now - seven;
          return time.getTime() > _now || time.getTime() < sevenDays; //大于当前的禁止，小于7天前的禁止
        }
      }
    };
  },
  methods: {
    getline() {
      let myChart = this.$echarts.init(document.getElementById("myChart"));
      // 绘制图表
      const that = this;
      var option = {
        tooltip: {
          trigger: "axis"
        },

        calculable: true,
        xAxis: [
          {
            type: "category",
            name: "时间",
            nameTextStyle: {
              color: "#dcdcdc",
              fontSize: 16,
              padding: 10
            },
            boundaryGap: false,
            data: that.keys,
            axisLabel: {
              show: true,
              //  interval: 0,
              textStyle: {
                color: "#dcdcdc"
              }
            }
          }
        ],
        yAxis: [
          {
            type: "value",
            name: "充值",
            nameTextStyle: {
              color: "#dcdcdc",
              fontSize: 16,
              padding: 10
            },
            axisLabel: {
              show: true,
              //  interval: 0,
              textStyle: {
                color: "#dcdcdc"
              }
            }
            // axisLabel : {
            //     formatter: '{value}'
            // }
          }
        ],
        series: [
          {
            name: "充值",
            type: "line",
            // data:[11, 11, 15, 13, 12, 13, 10],
            data: that.ynumber
          }
        ]
      };

      myChart.setOption(option);
    },
    getDay: (num, str) => {
      let today = new Date(),
        nowTime = today.getTime(),
        ms = 24 * 3600 * 1000 * num;
      today.setTime(parseInt(nowTime + ms));
      const oYear = today.getFullYear();
      let oMoth = (today.getMonth() + 1).toString();
      if (oMoth.length <= 1) {
        oMoth = `0${oMoth}`;
      }
      let oDay = today.getDate().toString();
      if (oDay.length <= 1) {
        oDay = `0${oDay}`;
      }
      return oYear + str + oMoth + str + oDay;
    },
    gettimes() {
      const date = new Date();
      var year = date.getFullYear();
      var month = date.getMonth() + 1;
      var day = date.getDate();
      if (month < 10) {
        month = "0" + month;
      }
      if (day < 10) {
        day = "0" + day;
      }
      this.value1 = year + "-" + month + "-" + day;
      this.value = [this.value1, this.value1];
      // console.log( this.value)
    },
    //当前时间
    getdata() {
      Http.get(
        "/user/channel/stats/recharge?start_time=" +
          this.value[0] +
          "&end_time=" +
          this.value[1]
      ).then(res => {
        const data = res.data;

        if (data.code == 0) {
          //   for (var i = 0; i < data.data.length; i++) {
          //     this.ynumber.push(data.data[i].amount);
          //   }
          Object.keys(data.data).forEach(key => {
            this.ynumber.push(data.data[key].amount);
          });
          // console.log("出来了么", this.ynumber);
          console.log("Object.keys",Object.keys(data.data));
          this.keys = Object.keys(data.data);
          this.getline();
        }
      });
    },
    //今天
    getToday() {
      this.ynumber = [];
      this.gettimes();

      this.getdata();
    },
    // 7天充值
    getweek() {
      this.ynumber = [];
      this.value = [this.getDay(-6, "-"), this.getDay(0, "-")];
      this.getdata();
    },
    getdateTime() {
      this.ynumber = [];
      this.getdata();
    },
    //最近一个月
    getmonths() {
      this.ynumber = [];
      this.value = [this.getDay(-29, "-"), this.getDay(0, "-")];
      this.getdata();
      console.log(this.ynumber);
    }
  },
  created() {
    this.gettimes();
    this.getdata();
  },
  mounted() {
    this.getline();
  }
};
</script>
<style scoped>
.conteinline {
  width: 100%;
  height: 360px;
}
.btns {
  width: 400px;
  float: right;
}
.line {
  padding-top: 10px;
  clear: both;
}
</style>
<style>
.el-date-table td.in-range div,
.el-date-table td.in-range div:hover {
  background: #36353a !important;
}
.el-date-table__row td.disabled div,
.el-date-table__row td.disabled div:hover {
  background: #36353a !important;
  color: #7d7979 !important;
}
.el-date-table__row td.disabled div span:hover {
  color: #2b2929 !important;
}
.el-input__inner {
  background: #36353a !important;
  border: none !important;
  color: #dcdcdc !important;
}
.el-picker-panel__body {
  background: #36353a !important;
  color: #dcdcdc !important;
}
.timecon {
  width: 400px;
  float: left;
  margin-left: 30px;
  background: #36353a !important;
  color: #dcdcdc !important;
}
.el-range-input {
  color: #dcdcdc !important;
  background: #36353a !important;
}
.el-picker-panel__footer {
  background: #36353a !important;
}
.el-range-separator {
  color: #fff !important;
}
.el-picker-panel__icon-btn {
  color: #fff;
}
.available {
  background: #36353a !important;
}
.available:hover {
  background: #36353a !important;
}
.in-range {
  background: #36353a !important;
}
.in-range:ative {
  background: #36353a !important;
}
.start-date {
  background: #36353a !important;
}
</style>



