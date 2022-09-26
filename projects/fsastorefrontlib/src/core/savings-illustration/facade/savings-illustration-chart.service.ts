import { Injectable } from '@angular/core';
import { TranslationService } from '@spartacus/core';
import { EChartsOption } from 'echarts';
import { combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {
  getSavingsIllustrationChartConfig,
  savingsIllustrationChartTranslateKeys,
} from '../../chart-config/savings-illustration-chart-config';

@Injectable()
export class SavingsIllustrationChartService {
  constructor(private translationService: TranslationService) {}

  getSavingsIllustrationChartOptions(
    salesIllustrationDiagramData: any
  ): Observable<EChartsOption> {
    const labelTranslations = savingsIllustrationChartTranslateKeys.map(
      translateKey => this.translationService.translate(translateKey)
    );

    return combineLatest(labelTranslations).pipe(
      map(([expectedSavingsLabel, contributionLabel, interestLabel]) => {
        const labels = {
          expectedSavingsLabel,
          contributionLabel,
          interestLabel,
        };

        return getSavingsIllustrationChartConfig(
          labels,
          salesIllustrationDiagramData
        );
      })
    );
  }
}
