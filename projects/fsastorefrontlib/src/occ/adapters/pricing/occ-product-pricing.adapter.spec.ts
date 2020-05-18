import { HttpClientModule } from '@angular/common/http';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { async, TestBed } from '@angular/core/testing';
import { OccEndpointsService } from '@spartacus/core';
import {
  PriceAttributeGroup,
  PricingAttribute,
  PricingData,
} from '../../../occ/occ-models';
import { OccProductPricingAdapter } from './occ-product-pricing.adapter';

const productCode = 'testCode';
const pricingEndpoint = 'CalculatePriceForProduct';

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
class MockOccEndpointsService {
  getUrl(endpoint: string, _urlParams?: object, _queryParams?: object) {
    return this.getEndpoint(endpoint);
  }
  getEndpoint(url: string) {
    return url;
  }
}

describe('OccProductPricingAdapter', () => {
  let adapter: OccProductPricingAdapter;
  let httpMock: HttpTestingController;
  let occEndpointService: OccEndpointsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, HttpClientTestingModule],
      providers: [
        OccProductPricingAdapter,
        { provide: OccEndpointsService, useClass: MockOccEndpointsService },
      ],
    });

    adapter = TestBed.get(OccProductPricingAdapter);
    httpMock = TestBed.get(HttpTestingController);
    occEndpointService = TestBed.get(OccEndpointsService);
    spyOn(occEndpointService, 'getUrl').and.callThrough();
  });

  afterEach(() => {
    httpMock.verify();
  });

  describe('getCalculatedProductData', () => {
    it('should return product data with price included in response', async(() => {
      adapter.getCalculatedProductData(productCode, pricingData).subscribe();
      httpMock.expectOne(req => {
        return req.url === pricingEndpoint && req.method === 'POST';
      }, `GET method and url`);
      expect(occEndpointService.getUrl).toHaveBeenCalledWith(pricingEndpoint, {
        productCode,
      });
    }));
  });
});
