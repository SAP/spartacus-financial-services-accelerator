import { HttpClientModule } from '@angular/common/http';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';
import { async, TestBed } from '@angular/core/testing';
import { OccConfig } from '@spartacus/core';
import { PricingAttribute, PricingAttributeGroup, PricingData } from '../../checkout/assets/models/pricing.interface';
import { OccProductService } from './occ-product.service';

const productCode = 'testCode';
const pricingEndpoint = '/product-pricing';

const costOfTrip: PricingAttribute = {
   key: 'costOfTrip',
   value: 2300
};
const tripDestination: PricingAttribute = {
   key: 'tripDestination',
   value: 'Europe'
};
const priceGroup: PricingAttributeGroup = {
   priceAttributesGroup: 'testGroupCode',
   priceAttributes: [costOfTrip, tripDestination]
};
const pricingData: PricingData = {
   priceAttributeList: [priceGroup]
};

const MockOccModuleConfig: OccConfig = {
  context: {
    baseSite: [
      ''
    ]
  },
  backend: {
    occ: {
      baseUrl: '',
      prefix: ''
    }
  }
};

describe('OccProductService', () => {
  let service: OccProductService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, HttpClientTestingModule],
      providers: [
        OccProductService,
        { provide: OccConfig, useValue: MockOccModuleConfig }
      ]
    });

    service = TestBed.get(OccProductService);
    httpMock = TestBed.get(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  describe('getExtendedProductData', () => {
    it('should return product data with price included in response', async(() => {
      service.getExtendedProductData(productCode, pricingData).subscribe();
      httpMock.expectOne((req) => {
        return (
          req.url === pricingEndpoint + `/${productCode}` &&
          req.method === 'POST'
        );
      }, `POST method and url`);
    }));
  });
});
