import { HttpClientModule } from '@angular/common/http';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { async, TestBed } from '@angular/core/testing';
import { OccConfig } from '@spartacus/core';
import {
  PriceAttributeGroup,
  PricingAttribute,
  PricingData,
} from '../../../occ/occ-models';
import { OccProductPricingAdapter } from './occ-product-pricing.adapter';

const productCode = 'testCode';
const pricingEndpoint = '/product-pricing';

const costOfTrip: PricingAttribute = {
  key: 'costOfTrip',
  value: 2300,
};
const tripDestination: PricingAttribute = {
  key: 'tripDestination',
  value: 'Europe',
};
const priceGroup: PriceAttributeGroup = {
  name: 'testGroupCode',
  priceAttributes: [costOfTrip, tripDestination],
};
const pricingData: PricingData = {
  priceAttributeGroups: [priceGroup],
};

const MockOccModuleConfig: OccConfig = {
  context: {
    baseSite: [''],
  },
  backend: {
    occ: {
      baseUrl: '',
      prefix: '',
    },
  },
};

describe('OccProductPricingAdapter', () => {
  let adapter: OccProductPricingAdapter;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, HttpClientTestingModule],
      providers: [
        OccProductPricingAdapter,
        { provide: OccConfig, useValue: MockOccModuleConfig },
      ],
    });

    adapter = TestBed.get(OccProductPricingAdapter);
    httpMock = TestBed.get(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  describe('getCalculatedProductData', () => {
    it('should return product data with price included in response', async(() => {
      adapter.getCalculatedProductData(productCode, pricingData).subscribe();
      httpMock.expectOne(req => {
        return (
          req.url === pricingEndpoint + `/${productCode}` &&
          req.method === 'POST'
        );
      }, `POST method and url`);
    }));
  });
});
