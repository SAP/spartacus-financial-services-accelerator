import { HttpClientModule, HttpRequest } from '@angular/common/http';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { waitForAsync, TestBed } from '@angular/core/testing';
import { OccEndpointsService } from '@spartacus/core';
import {
  PriceAttributeGroup,
  PricingAttribute,
  PricingData,
} from '../../../occ/occ-models';
import { OccProductPricingAdapter } from './occ-product-pricing.adapter';

const productCode = 'testCode';
const pricingEndpoint = 'calculatePriceForProduct';

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
  buildUrl(endpoint: string, _urlParams?: object, _queryParams?: object) {
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

    adapter = TestBed.inject(OccProductPricingAdapter);
    httpMock = TestBed.inject(HttpTestingController);
    occEndpointService = TestBed.inject(OccEndpointsService);
    spyOn(occEndpointService, 'buildUrl').and.callThrough();
  });

  afterEach(() => {
    httpMock.verify();
  });

  describe('getCalculatedProductData', () => {
    it(
      'should return product data with price included in response',
      waitForAsync(() => {
        adapter.getCalculatedProductData(productCode, pricingData).subscribe();
        httpMock.expectOne((req: HttpRequest<any>) => {
          return req.url === pricingEndpoint && req.method === 'POST';
        }, `POST method and url`);
        expect(occEndpointService.buildUrl).toHaveBeenCalledWith(
          pricingEndpoint,
          {
            urlParams: {
              productCode,
            },
          }
        );
      })
    );
  });
});
