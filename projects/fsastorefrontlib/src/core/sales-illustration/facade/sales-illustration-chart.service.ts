import { Injectable } from '@angular/core';
import { TranslationService } from '@spartacus/core';
import { EChartsOption } from 'echarts';
import { combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {
  getSalesIllustrationChartConfig,
  salesIllustrationChartTranslateKeys,
} from '../../chart-config/sales-illustration-chart-config';

@Injectable()
export class SalesIllustrationChartService {
  constructor(private translationService: TranslationService) {}

  getSalesIllustrationChartOptions(
    salesIllustrationDiagramData: any
  ): Observable<EChartsOption> {
    const labelTranslations = salesIllustrationChartTranslateKeys.map(
      translateKey => this.translationService.translate(translateKey)
    );

    return combineLatest(labelTranslations).pipe(
      map(([expectedSavingsLabel, contributionLabel, interestLabel]) => {
        const labels = {
          expectedSavingsLabel,
          contributionLabel,
          interestLabel,
        };

        return getSalesIllustrationChartConfig(
          labels,
          salesIllustrationDiagramData
        );
      })
    );
  }
}
