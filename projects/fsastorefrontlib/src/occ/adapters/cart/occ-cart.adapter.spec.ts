import { HttpClientModule, HttpRequest } from '@angular/common/http';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { waitForAsync, TestBed } from '@angular/core/testing';
import { OccEndpointsService } from '@spartacus/core';
import { PricingData } from '../../occ-models';
import { OccCartAdapter } from './occ-cart.adapter';

const userId = 'userId';
const cartId = 'cartId';
const productCode = 'product123';
const quantity = 1;
const entryNumber = '1';
const bundleTemplateId = 'bundleTemplate';
const pricingData: PricingData = {};
const addToCartEndpoint = 'addToCart';
const startBundleEndpoint = 'startBundle';
class MockOccEndpointsService {
  getUrl(endpoint: string, _urlParams?: object, _queryParams?: object) {
    return this.getEndpoint(endpoint);
  }
  getEndpoint(url: string) {
    return url;
  }
}

describe('OccCartAdapter', () => {
  let adapter: OccCartAdapter;
  let httpMock: HttpTestingController;
  let occEndpointService: OccEndpointsService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, HttpClientTestingModule],
      providers: [
        OccCartAdapter,
        { provide: OccEndpointsService, useClass: MockOccEndpointsService },
      ],
    });

    adapter = TestBed.inject(OccCartAdapter);
    httpMock = TestBed.inject(HttpTestingController);
    occEndpointService = TestBed.inject(OccEndpointsService);
    spyOn(occEndpointService, 'buildUrl').and.callThrough();
  });

  afterEach(() => {
    httpMock.verify();
  });

  describe('addToCart', () => {
    it(
      'should add product to cart',
      waitForAsync(() => {
        adapter
          .addToCart(userId, cartId, productCode, quantity, entryNumber)
          .subscribe();
        httpMock.expectOne((req: HttpRequest<any>) => {
          return req.url === addToCartEndpoint && req.method === 'POST';
        }, `POST method and url`);
        expect(occEndpointService.buildUrl).toHaveBeenCalledWith(
          addToCartEndpoint,
          {
            userId,
            cartId,
          }
        );
      })
    );
  });

  describe('startBundle', () => {
    it(
      'start bundle',
      waitForAsync(() => {
        adapter
          .startBundle(
            userId,
            cartId,
            productCode,
            bundleTemplateId,
            quantity,
            pricingData
          )
          .subscribe();
        httpMock.expectOne((req: HttpRequest<any>) => {
          return req.url === startBundleEndpoint && req.method === 'POST';
        }, `POST method and url`);
        expect(occEndpointService.buildUrl).toHaveBeenCalledWith(
          startBundleEndpoint,
          {
            userId,
            cartId,
          }
        );
      })
    );
  });
});
