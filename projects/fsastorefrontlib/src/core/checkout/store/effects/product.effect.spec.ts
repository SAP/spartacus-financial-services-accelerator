import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Type } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { StoreModule } from '@ngrx/store';
import { Product, ProductActions } from '@spartacus/core';
import { cold, hot } from 'jasmine-marbles';
import { Observable, of } from 'rxjs';
import { ProductPricingConnector } from '../../../product-pricing';
import * as fromActions from '../actions';
import * as fromEffects from './product.effect';

const productCode = 'product1';
const pricingData = {
  att1: 'attr1Value',
};

const product: Product = {
  code: productCode,
};

class MockProductPricingConnector {
  getCalculatedProductData() {
    return of(product);
  }
}

describe('Product Effects', () => {
  let actions$: Observable<fromActions.SetIdentificationType>;
  let effects: fromEffects.ProductEffect;
  let mockProductPricingConnector: MockProductPricingConnector;

  beforeEach(() => {
    mockProductPricingConnector = new MockProductPricingConnector();
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, StoreModule.forRoot({})],
      providers: [
        {
          provide: ProductPricingConnector,
          useValue: mockProductPricingConnector,
        },
        fromEffects.ProductEffect,
        provideMockActions(() => actions$),
      ],
    });
    effects = TestBed.inject(
      fromEffects.ProductEffect as Type<fromEffects.ProductEffect>
    );
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
