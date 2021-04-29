import { ChartConfig } from './chart-options.config';

export const defaultChartOptionsConfig: ChartConfig = {
  chartOption: {
    title: {
      show: true,
      text: 'Purchase Order',
      left: 'center',
      textStyle: {
        color: '#000033',
        fontSize: 16,
        fontWeight: 'normal',
      },
    },
    tooltip: {
      formatter: params => {
        return `<span class="semi-bold">${params.data['name']}:</span><br/> ${params.data['currencyValue']} (${params.percent}%)`;
      },
    },
    legend: {
      top: 'bottom',
    },
    toolbox: {
      show: true,
      padding: [0, 0, 3, 0],
      feature: {
        saveAsImage: {
          title: '',
          iconStyle: {
            borderColor: '#0066cc',
            borderWidth: 2,
          },
          emphasis: {
            iconStyle: {
              color: '#0066cc',
            },
          },
        },
      },
    },
    series: [
      {
        type: 'pie',
        radius: ['40%', '70%'],
        itemStyle: {
          borderRadius: 10,
          borderColor: '#fff',
          borderWidth: 2,
        },
        label: {
          show: true,
          formatter: params => {
            return params.data['currencyValue'];
          },
        },
        labelLine: {
          length: 8,
          length2: 0,
        },
        data: [],
      },
    ],
  },
};
