<template>
  <div>
    <div class="chart" ref="chartRef"></div>
  </div>
</template>

<script>
import * as echarts from 'echarts';
import { onMounted, onBeforeUnmount, ref } from 'vue';

export default {

  name: 'EChartComponent',
  props: {
    xData: {
      type: Array,
      required: true,
      default: () => [],
    },
    yData: {
      type: Array,
      required: true,
      default: () => [],
    },
  },
  setup(props) {
    const chartRef = ref(null);
    let chartInstance = null;

    const initChart = () => {
      const option = {
        tooltip: {
          trigger: 'axis',
        },
        xAxis: {
          type: 'category',
          data: props.xData,
        },
        yAxis: {
          type: 'value',
          min: 0,
        },
        series: [
          {
            name: '1',
            type: 'line',
            data: props.yData,
            smooth: false,
            itemStyle: {
              color: '#2897f3',
            },
          },
        ],
        dataZoom: [
          {
            type: 'inside',
            start: 0,
            end: 100,
          },
          // {
          //   show: true,
          //   type: 'slider',
          //   top: '90%',
          //   start: 0,
          //   end: 100,
          // },
        ],
        toolbox: {
          feature: {
            dataZoom: {
              yAxisIndex: 'none',
            },
            restore: {},
            saveAsImage: {},
          },
        },
      };

      chartInstance = echarts.init(chartRef.value);
      chartInstance.setOption(option);
    };

    const resizeChart = () => {
      if (chartInstance) {
        chartInstance.resize();
      }
    };

    onMounted(() => {
      initChart();
      window.addEventListener('resize', resizeChart);
    });

    onBeforeUnmount(() => {
      if (chartInstance) {
        chartInstance.dispose();
      }
      window.removeEventListener('resize', resizeChart);
    });

    return {
      chartRef,
    };
  },
};
</script>

<style scoped>
.chart {
  width: 1200px;
  height: 700px;
}
</style>
