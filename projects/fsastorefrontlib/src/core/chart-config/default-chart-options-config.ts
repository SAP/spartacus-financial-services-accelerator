import { ChartConfig } from './chart-options.config';

export function tooltipFormatter(params) {
  return `<span class="semi-bold">${params.data['name']}:</span><br/> ${params.data['currencyValue']} (${params.percent}%)`;
}

export function labelFormatter(params) {
  return params.data['currencyValue'];
}

export const defaultChartOptionsConfig: ChartConfig = {
  chartOption: {
    title: {
      show: true,
      left: 'center',
      textStyle: {
        color: '#000033',
        fontSize: 16,
        fontWeight: 'normal',
      },
    },
    tooltip: {
      formatter: tooltipFormatter,
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
          formatter: labelFormatter,
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
