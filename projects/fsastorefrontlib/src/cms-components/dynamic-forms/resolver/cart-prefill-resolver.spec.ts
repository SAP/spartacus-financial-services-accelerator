import { DatePipe } from '@angular/common';
import { TestBed } from '@angular/core/testing';
import { StoreModule } from '@ngrx/store';
import { I18nTestingModule } from '@spartacus/core';
import { FSCartService } from './../../../core/cart/facade/cart.service';
import { of } from 'rxjs';
import { CartPrefillResolver } from './cart-prefill-resolver';

const cartCode = '0000001';
const entryNumber = '1';

const mockCart = {
  code: cartCode,
  entries: [
    {
      entryNumber: entryNumber,
    },
  ],
  insuranceQuote: {
    quoteDetails: {
      entry: [
        {
          key: 'numberOfTravellers',
          value: 1,
        },
      ],
    },
    insuredObjectList: {
      insuredObjects: [
        {
          insuredObjectItems: [
            {
              key: 'itemKey',
              value: 'itemValue',
            },
          ],
          childInsuredObjectList: {
            insuredObjects: [
              {
                insuredObjectItems: [
                  {
                    key: 'childItemKey',
                    value: 'childItemValue',
                  },
                ],
              },
            ],
          },
        },
      ],
    },
  },
};

const cartWithDate = {
  date: '02-02-1992',
};

const expectedDate = '1992-02-02';

const cartWithoutQuote = {
  code: cartCode,
};

class MockCartService {
  getActive(): any {
    return of(mockCart);
  }
}

class MockDatePipe {
  transform() {
    return expectedDate;
  }
}

const codePath = 'code';
const datePath = 'date';
const mockQuoteDetailsPath = 'insuranceQuote.quoteDetails.numberOfTravellers';
const mockArrayPath = 'entries[0].entryNumber';
const brokenFieldPath = 'brokenAttribute';

describe('CartPrefilResolver', () => {
  let cartPrefillResolver: CartPrefillResolver;
  let cartService: MockCartService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [I18nTestingModule, StoreModule.forRoot({})],
      providers: [
        { provide: FSCartService, useClass: MockCartService },
        {
          provide: DatePipe,
          useClass: MockDatePipe,
        },
      ],
    });

    cartPrefillResolver = TestBed.inject(CartPrefillResolver);
    cartService = TestBed.inject(FSCartService);
  });

  it('should inject cart resolver', () => {
    expect(cartPrefillResolver).toBeTruthy();
  });

  it('should resolve cart code', () => {
    spyOn(cartService, 'getActive').and.returnValue(of(cartWithoutQuote));
    let result;
    cartPrefillResolver
      .getPrefillValue(codePath)
      .subscribe(value => {
        result = value;
      })
      .unsubscribe();
    expect(result).toEqual(cartCode);
  });

  it('should convert date attribute', () => {
    spyOn(cartService, 'getActive').and.returnValue(of(cartWithDate));
    let result;
    cartPrefillResolver
      .getPrefillValue(datePath)
      .subscribe(value => {
        result = value;
      })
      .unsubscribe();
    expect(result).toEqual(expectedDate);
  });

  it('should break if path does not exist', () => {
    let result;
    cartPrefillResolver
      .getPrefillValue(brokenFieldPath)
      .subscribe(value => {
        result = value;
      })
      .unsubscribe();
    expect(result).toEqual(undefined);
  });

  it('should resolve nested quote details path', () => {
    let result;
    cartPrefillResolver
      .getPrefillValue(mockQuoteDetailsPath)
      .subscribe(value => {
        result = value;
      })
      .unsubscribe();
    expect(result).toEqual(1);
  });

  it('should resolve array path for entries', () => {
    let result;
    cartPrefillResolver
      .getPrefillValue(mockArrayPath)
      .subscribe(value => {
        result = value;
      })
      .unsubscribe();
    expect(result).toEqual(entryNumber);
  });
});
