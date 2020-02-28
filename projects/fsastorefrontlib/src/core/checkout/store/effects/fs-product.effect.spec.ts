import { ProductActions, Product } from '@spartacus/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Type } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { StoreModule } from '@ngrx/store';
import { cold, hot } from 'jasmine-marbles';
import { Observable, of } from 'rxjs';
import * as fromActions from '../actions';
import * as fromEffects from './fs-product.effect';
import { ProductPricingConnector } from '../../../product-pricing';

const productCode = 'product1';
const pricingData = {
  att1: 'attr1Value',
};

const product: Product = {
  code: productCode,
};

class MockOccProductPricingAdapter {
  getCalculatedProductData() {
    return of(product);
  }
}

describe('FS Product Effects', () => {
  let actions$: Observable<fromActions.SetIdentificationType>;
  let effects: fromEffects.FSProductEffect;
  let mockProductPricingAdapter: MockOccProductPricingAdapter;

  beforeEach(() => {
    mockProductPricingAdapter = new MockOccProductPricingAdapter();
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, StoreModule.forRoot({})],
      providers: [
        {
          provide: ProductPricingConnector,
          useValue: mockProductPricingAdapter,
        },
        fromEffects.FSProductEffect,
        provideMockActions(() => actions$),
      ],
    });
    effects = TestBed.get(fromEffects.FSProductEffect as Type<
      fromEffects.FSProductEffect
    >);
  });

  describe('getCalculatedProductData$', () => {
    it('should get calculated product data', () => {
      const action = new fromActions.LoadCalculatedProductData({
        code: productCode,
        pricingData: pricingData,
      });

      const completion = new ProductActions.LoadProductSuccess(product);

      actions$ = hot('-a', { a: action });
      const expected = cold('-b', { b: completion });
      expect(effects.getCalculatedProductData$).toBeObservable(expected);
    });
  });
});
