import { TestBed, waitForAsync } from '@angular/core/testing';
import { TranslationService } from '@spartacus/core';
import { of } from 'rxjs';
import { SalesIllustrationChartService } from './sales-illustration-chart.service';

const salesIllustrationDiagramDataMocked = {
  expectedSavingsSeries: [1050],
  contributionSeries: [1000],
  interestSeries: [50],
  years: [2022],
};

describe('SalesIllustrationChartService', () => {
  let service: SalesIllustrationChartService;
  let translationServiceSpy: jasmine.SpyObj<TranslationService>;

  beforeEach(() => {
    const translationSpy = jasmine.createSpyObj('TranslationService', [
      'translate',
    ]);

    TestBed.configureTestingModule({
      providers: [
        SalesIllustrationChartService,
        { provide: TranslationService, useValue: translationSpy },
      ],
    });

    service = TestBed.inject(SalesIllustrationChartService);
    translationServiceSpy = TestBed.inject(
      TranslationService
    ) as jasmine.SpyObj<TranslationService>;
  });

  it(
    'getSalesIllustrationChartOptions should get correct data',
    waitForAsync(() => {
      translationServiceSpy.translate.and.returnValue(of('test'));

      const chartOptions = service.getSalesIllustrationChartOptions(
        salesIllustrationDiagramDataMocked
      );
      chartOptions.subscribe(eChartsOption => {
        expect(eChartsOption.series[0].data).toEqual([1050]);
      });
    })
  );
});
