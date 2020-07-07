import { TestBed } from '@angular/core/testing';
import { StoreModule } from '@ngrx/store';
import { I18nTestingModule } from '@spartacus/core';
import { of } from 'rxjs';
import { FSCartService } from './../../../core/cart/facade/cart.service';
import { CartPrefillResolver } from './cart-prefill-resolver';
import { FormsUtils } from '../utils/forms-utils';

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
  date: '1992-02-02',
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

const codePath = 'code';
const datePath = 'date';
const mockQuoteDetailsPath = 'insuranceQuote.quoteDetails.numberOfTravellers';
const mockArrayPath = 'entries[0].entryNumber';
const brokenFieldPath = 'brokenAttribute';

describe('UserPrefilResolver', () => {
  let cartPrefilResolver: CartPrefillResolver;
  let cartService: MockCartService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [I18nTestingModule, StoreModule.forRoot({})],
      providers: [{ provide: FSCartService, useClass: MockCartService }],
    });

    cartPrefilResolver = TestBed.inject(CartPrefillResolver);
    cartService = TestBed.inject(FSCartService);
  });

  it('should inject cart resolver', () => {
    expect(cartPrefilResolver).toBeTruthy();
  });

  it('should resolve cart code', () => {
    spyOn(cartService, 'getActive').and.returnValue(of(cartWithoutQuote));
    let result;
    cartPrefilResolver
      .getFieldValue(codePath)
      .subscribe(value => {
        result = value;
      })
      .unsubscribe();
    expect(result).toEqual(cartCode);
  });

  it('should convert date attribute', () => {
    spyOn(cartService, 'getActive').and.returnValue(of(cartWithDate));
    let result;
    cartPrefilResolver
      .getFieldValue(datePath)
      .subscribe(value => {
        result = value;
      })
      .unsubscribe();
    expect(result).toEqual(expectedDate);
  });

  it('should break if path does not exist', () => {
    let result;
    cartPrefilResolver
      .getFieldValue(brokenFieldPath)
      .subscribe(value => {
        result = value;
      })
      .unsubscribe();
    expect(result).toEqual(undefined);
  });

  it('should resolve nested quote details path', () => {
    let result;
    cartPrefilResolver
      .getFieldValue(mockQuoteDetailsPath)
      .subscribe(value => {
        result = value;
      })
      .unsubscribe();
    expect(result).toEqual(1);
  });

  it('should resolve array path for entries', () => {
    let result;
    cartPrefilResolver
      .getFieldValue(mockArrayPath)
      .subscribe(value => {
        result = value;
      })
      .unsubscribe();
    expect(result).toEqual(entryNumber);
  });
});
