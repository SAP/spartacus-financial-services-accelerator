import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { ProductPricingAdapter } from './product-pricing.adapter';
import { ProductPricingConnector } from './product-pricing.connector';
import createSpy = jasmine.createSpy;

class MockProductPricingAdapter implements ProductPricingAdapter {
  getCalculatedProductData = createSpy(
    'ProductPricingAdapter.getCalculatedProductData'
  ).and.callFake((product, pricingData) =>
    of('getCalculatedProductData' + product + pricingData)
  );
}

const productCode = 'product1';

describe('ProductPricingConnector', () => {
  let productPricingConnector: ProductPricingConnector;
  let productPricingAdapter: ProductPricingAdapter;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: ProductPricingAdapter, useClass: MockProductPricingAdapter },
      ],
    });

    productPricingConnector = TestBed.inject(ProductPricingConnector);
    productPricingAdapter = TestBed.inject(ProductPricingAdapter);
  });

  it('should be created', () => {
    expect(productPricingConnector).toBeTruthy();
  });

  it('should call adapter for getCalculatedProductData', () => {
    productPricingConnector.getCalculatedProductData(productCode, {});
    expect(productPricingAdapter.getCalculatedProductData).toHaveBeenCalledWith(
      productCode,
      {}
    );
  });
});
