import { EChartsOption } from 'echarts';

export const salesIllustrationChartTranslateKeys = [
  'salesIllustration.expectedSavings',
  'fscommon.contribution',
  'salesIllustration.interest',
];

export const getSalesIllustrationChartConfig = (
  labels,
  data
): EChartsOption => {
  const { expectedSavingsLabel, contributionLabel, interestLabel } = labels;
  const {
    years,
    expectedSavingsSeries,
    contributionSeries,
    interestSeries,
  } = data;

  return {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross',
        label: {
          backgroundColor: '#6a7985',
        },
      },
    },
    legend: {
      data: [expectedSavingsLabel, contributionLabel, interestLabel],
      top: 'bottom',
    },
    xAxis: [
      {
        type: 'category',
        data: years,
      },
    ],
    yAxis: [
      {
        type: 'value',
      },
    ],
    series: [
      {
        name: expectedSavingsLabel,
        type: 'line',
        itemStyle: {
          color: '#01003B',
        },
        data: expectedSavingsSeries,
      },
      {
        name: contributionLabel,
        type: 'line',
        data: contributionSeries,
      },
      {
        name: interestLabel,
        type: 'line',
        data: interestSeries,
      },
    ],
  };
};
