<template>
  <div id="home_box">
    <!-- 1. echarts容器 -->
    <div id="myecharts_box"></div>
  </div>
</template>

<script>
import echarts from "echarts";
import { API_GET_ORDER_TOTAL } from "@/api/apis";

export default {
  data() {
    return {
      todayOrder: 0, //今日订单
      totalAmount: 0, //总销售额
      totalOrder: 0, //总订单
      totayAmount: 0 //今日销售额
    };
  },
  mounted() {
    // 2. 使用init初始化一个DOM容器为echarts容器
    var mycharts = echarts.init(document.getElementById("myecharts_box"));

    //开启loading
    mycharts.showLoading();

    setTimeout(() => {
      API_GET_ORDER_TOTAL().then(res => {
        let {
          xData,
          orderData,
          amountData,
          todayOrder,
          totalAmount,
          totalOrder,
          totayAmount
        } = res.data;

        this.totalOrder = totalOrder;
        this.totalAmount = totalAmount;
        this.totayAmount = totayAmount;
        this.todayOrder = todayOrder;

        // 3. 配置表格对象，使用echarts进行渲染
        let option = {
          title: {
            text: "数据统计"
          },
          tooltip: {
            trigger: "axis"
          },
          legend: {
            data: ["邮件营销", "联盟广告", "视频广告", "直接访问", "搜索引擎"]
          },
          grid: {
            left: "3%",
            right: "4%",
            bottom: "3%",
            containLabel: true
          },
          toolbox: {
            feature: {
              saveAsImage: {}
            }
          },
          //x轴标题
          xAxis: {
            type: "category",
            boundaryGap: false,
            data: xData
          },
          yAxis: {
            type: "value"
          },
          series: [
            {
              name: "订单数据",
              type: "line",
              stack: "总量",
              data: orderData
            },
            {
              name: "金额数据",
              type: "line",
              stack: "总量",
              data: amountData
            }
          ]
        };

        mycharts.setOption(option);
        mycharts.hideLoading();
      });
    }, 5000);
  }
};
</script>

<style lang="less" scoped>
#home_box {
  background-color: #fff;
  padding: 18px;

  #myecharts_box {
    width: 700px;
    height: 400px;
  }
}
</style>