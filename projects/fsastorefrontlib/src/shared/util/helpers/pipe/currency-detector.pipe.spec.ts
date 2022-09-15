import { TestBed } from '@angular/core/testing';
import { CurrencyService } from '@spartacus/core';
import { of } from 'rxjs';
import { MiniCartCurrencyPipe } from './currency-detector.pipe';

class MockCurrencyService {
  getActive() {
    return of('EUR');
  }
}

const mockedCurrencyEntry = {
  type: 'currency',
  value: '1000',
};

describe('CurrencyDetectorPipe', () => {
  let pipe: MiniCartCurrencyPipe;
  let currencyService: CurrencyService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        MiniCartCurrencyPipe,
        { provide: CurrencyService, useClass: MockCurrencyService },
      ],
    });

    pipe = TestBed.inject(MiniCartCurrencyPipe);
    currencyService = TestBed.inject(CurrencyService);
  });

  describe('transform', () => {
    it('should get currency value', () => {
      spyOn(currencyService, 'getActive').and.callThrough();
      pipe.transform(mockedCurrencyEntry).subscribe(res => {
        expect(res).toContain('1,000.00');
      });
    });
  });
});
