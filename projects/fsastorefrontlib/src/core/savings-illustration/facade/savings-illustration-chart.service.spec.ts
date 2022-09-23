import { TestBed, waitForAsync } from '@angular/core/testing';
import { TranslationService } from '@spartacus/core';
import { of } from 'rxjs';
import { SavingsIllustrationChartService } from './savings-illustration-chart.service';

const savingsIllustrationDiagramDataMocked = {
  expectedSavingsSeries: [1050],
  contributionSeries: [1000],
  interestSeries: [50],
  years: [2022],
};

describe('SavingsIllustrationChartService', () => {
  let service: SavingsIllustrationChartService;
  let translationServiceSpy: jasmine.SpyObj<TranslationService>;

  beforeEach(() => {
    const translationSpy = jasmine.createSpyObj('TranslationService', [
      'translate',
    ]);

    TestBed.configureTestingModule({
      providers: [
        SavingsIllustrationChartService,
        { provide: TranslationService, useValue: translationSpy },
      ],
    });

    service = TestBed.inject(SavingsIllustrationChartService);
    translationServiceSpy = TestBed.inject(
      TranslationService
    ) as jasmine.SpyObj<TranslationService>;
  });

  it(
    'getSavingsIllustrationChartOptions should get correct data',
    waitForAsync(() => {
      translationServiceSpy.translate.and.returnValue(of('test'));

      const chartOptions = service.getSavingsIllustrationChartOptions(
        savingsIllustrationDiagramDataMocked
      );
      chartOptions.subscribe(eChartsOption => {
        expect(eChartsOption.series[0].data).toEqual([1050]);
      });
    })
  );
});
