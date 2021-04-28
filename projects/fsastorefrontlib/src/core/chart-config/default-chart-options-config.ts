import { ChartConfig } from './chart-options.config';

export const defaultChartOptionsConfig: ChartConfig = {
  options: {
    title: {
      show: true,
      text: 'Purchase Order',
      left: 'center',
      color: '#000033',
      fontSize: 16,
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
      feature: {
        saveAsImage: {
          title: '',
          borderColor: '#0066cc',
          borderWidth: 2,
        },
        emphasis: {
          color: '#0066cc',
        },
      },
    },
    series: {
      radius: ['40%', '70%'],
      borderRadius: 10,
      borderColor: '#fff',
      borderWidth: 2,
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
    },
  },
};
