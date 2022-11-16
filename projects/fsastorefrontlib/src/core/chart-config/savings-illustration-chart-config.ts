import { EChartsOption } from 'echarts';

export const savingsIllustrationChartTranslateKeys = [
  'salesIllustration.expectedSavings',
  'fscommon.contribution',
  'salesIllustration.interest',
];

export const getSavingsIllustrationChartConfig = (
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
          color: '#010032',
        },
        data: expectedSavingsSeries,
      },
      {
        name: contributionLabel,
        type: 'line',
        itemStyle: {
          color: '#0166cc',
        },
        data: contributionSeries,
      },
      {
        name: interestLabel,
        type: 'line',
        itemStyle: {
          color: '#3498db',
        },
        data: interestSeries,
      },
    ],
  };
};
