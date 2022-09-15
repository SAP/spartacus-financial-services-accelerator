import { Config } from '@spartacus/core';
import { EChartsOption } from 'echarts';

export abstract class ChartConfig extends Config {
  chartOption: EChartsOption;
}
