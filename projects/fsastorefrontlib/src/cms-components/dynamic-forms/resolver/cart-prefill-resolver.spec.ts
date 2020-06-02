import { TestBed } from '@angular/core/testing';
import { I18nTestingModule, ActiveCartService } from '@spartacus/core';
import { of } from 'rxjs';
import { StoreModule } from '@ngrx/store';
import { CartPrefillResolver } from './cart-prefill-resolver';
import { Type } from '@angular/core';

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
  },
};

class MockCartService {
  getActive() {
    return of(mockCart);
  }
}

const mockFieldPath = 'code';
const mockQuoteDetailsPath = 'insuranceQuote.quoteDetails.numberOfTravellers';
const mockArrayPath = 'entries[0].entryNumber';

describe('UserPrefilResolver', () => {
  let cartPrefilResolver: CartPrefillResolver;
  let cartService: MockCartService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [I18nTestingModule, StoreModule.forRoot({})],
      providers: [{ provide: ActiveCartService, useClass: MockCartService }],
    });

    cartPrefilResolver = TestBed.get(CartPrefillResolver as Type<
      CartPrefillResolver
    >);
    cartService = TestBed.get(ActiveCartService as Type<ActiveCartService>);
  });

  it('should inject cart resolver', () => {
    expect(cartPrefilResolver).toBeTruthy();
  });

  it('should resolve cart code', () => {
    let result;
    cartPrefilResolver
      .getFieldValue(mockFieldPath)
      .subscribe(value => {
        result = value;
      })
      .unsubscribe();
    expect(result).toEqual(cartCode);
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
