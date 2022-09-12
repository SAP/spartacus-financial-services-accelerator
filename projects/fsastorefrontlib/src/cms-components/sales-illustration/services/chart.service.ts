import { Injectable } from '@angular/core';
import { TranslationService } from '@spartacus/core';
import { EChartsOption } from 'echarts';
import { combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class ChartService {
  constructor(private translationService: TranslationService) {}

  getChartOptions(
    salesIllustrationDiagramData: any
  ): Observable<EChartsOption> {
    const {
      contributionSeries,
      expectedSavingsSeries,
      interestSeries,
      years,
    } = salesIllustrationDiagramData;

    const labelTranslations = [
      this.translationService.translate('salesIllustration.expectedSavings'),
      this.translationService.translate('salesIllustration.contribution'),
      this.translationService.translate('salesIllustration.interest'),
    ];

    return combineLatest(labelTranslations).pipe(
      map(([expectedSavingsLabel, contributionLabel, interestLabel]) => ({
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
      }))
    );
  }
}
