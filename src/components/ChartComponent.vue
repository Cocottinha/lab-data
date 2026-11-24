<template>
  <div>
    <div class="chart" ref="chartRef"></div>
  </div>
</template>

<script>
import * as echarts from 'echarts';
import { onMounted, onBeforeUnmount, ref, watch, nextTick } from 'vue';

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

    const renderChart = async () => {
      await nextTick();
      if (!chartRef.value) return;

      if (!chartInstance) {
        chartInstance = echarts.init(chartRef.value);
      }

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

      chartInstance.setOption(option, true);
      chartInstance.resize();
    };

    const resizeChart = () => {
      if (chartInstance) {
        chartInstance.resize();
      }
    };

    watch(
      () => [props.xData, props.yData],
      () => {
        renderChart();
      },
      { deep: false }
    );

    onMounted(() => {
      renderChart();
      window.addEventListener('resize', resizeChart);
    });

    onBeforeUnmount(() => {
      if (chartInstance) {
        chartInstance.dispose();
        chartInstance = null;
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
/* ... seus @media continuam iguais ... */

@media (max-width: 1367px) {
  .chart {
    width: 1150px;
  }
}

@media (max-width: 1260px) {
  .chart {
    width: 1024px;
  }
}

@media (max-width: 1024px) {
  .chart {
    width: 768px;
  }
}

@media (max-width: 768px) {
  .chart {
    width: 600px;
  }
}

@media (max-width: 640px) {
  .chart {
    width: 435px;
  }
}

@media (max-width: 476px) {
  .chart {
    width: 340px;
  }
}
</style>
