import { inject, TestBed } from '@angular/core/testing';
import * as ngrxStore from '@ngrx/store';
import { Store, StoreModule } from '@ngrx/store';
import {
  Product,
  ProductLoadingService,
  StateWithProduct,
} from '@spartacus/core';
import { of } from 'rxjs';
import {
  PriceAttributeGroup,
  PricingAttribute,
  PricingData,
} from './../../../occ/occ-models';
import { FSProductService } from './product.service';

describe('FSProductService', () => {
  let store: Store<StateWithProduct>;
  let service: FSProductService;

  const mockProduct: Product = { code: 'testId' };
  const costOfTrip: PricingAttribute = {
    key: 'costOfTrip',
    value: 2300,
  };
  const tripDestination: PricingAttribute = {
    key: 'tripDestination',
    value: 'Europe',
  };
  const priceGroup: PriceAttributeGroup = {
    name: 'testGroup',
    priceAttributes: [costOfTrip, tripDestination],
  };
  const pricingData: PricingData = {
    priceAttributeGroups: [priceGroup],
  };

  class MockProductLoadingService {}

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [StoreModule.forRoot({})],
      providers: [
        FSProductService,
        {
          provide: ProductLoadingService,
          useClass: MockProductLoadingService,
        },
      ],
    });
    service = TestBed.inject(FSProductService);
    store = TestBed.inject(Store);
    spyOn(store, 'dispatch').and.stub();
  });

  it('should FSProductService is injected', inject(
    [FSProductService],
    (productService: FSProductService) => {
      expect(productService).toBeTruthy();
    }
  ));

  describe('getCalculatedProductData(productCode, pricingData)', () => {
    it('should be able to get product by code and price data', () => {
      spyOnProperty(ngrxStore, 'select').and.returnValue(
        () => () =>
          of({
            value: mockProduct,
          })
      );
      let result: Product;
      service
        .getCalculatedProductData('testId', pricingData)
        .subscribe(product => {
          result = product;
        })
        .unsubscribe();
      expect(result).toBe(mockProduct);
    });
  });
});
