import { HttpClientModule, HttpRequest } from '@angular/common/http';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { async, TestBed } from '@angular/core/testing';
import { OccBillingTimeAdapter } from './occ-billing-time.adapter';
import { OccEndpointsService } from '@spartacus/core';

const productCodes: string[] = ['product1', 'product2'];
const billingtimeEndpoint = 'billingTime';

class MockOccEndpointsService {
  getUrl(endpoint: string, _urlParams?: object, _queryParams?: object) {
    return this.getEndpoint(endpoint);
  }
  getEndpoint(url: string) {
    return url;
  }
}

describe('OccBillingTimeAdapter', () => {
  let adapter: OccBillingTimeAdapter;
  let httpMock: HttpTestingController;
  let occEndpointService: OccEndpointsService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, HttpClientTestingModule],
      providers: [
        OccBillingTimeAdapter,
        { provide: OccEndpointsService, useClass: MockOccEndpointsService },
      ],
    });

    adapter = TestBed.get(OccBillingTimeAdapter);
    httpMock = TestBed.get(HttpTestingController);
    occEndpointService = TestBed.get(OccEndpointsService);
    spyOn(occEndpointService, 'getUrl').and.callThrough();
  });

  afterEach(() => {
    httpMock.verify();
  });

  describe('getBillingTimes', () => {
    it('get billing times', async(() => {
      adapter.getBillingTimes(productCodes).subscribe();
      httpMock.expectOne((req: HttpRequest<any>) => {
        return req.url === billingtimeEndpoint && req.method === 'GET';
      }, `GET method and url`);
      expect(occEndpointService.getUrl).toHaveBeenCalledWith(
        billingtimeEndpoint
      );
    }));
  });
});
