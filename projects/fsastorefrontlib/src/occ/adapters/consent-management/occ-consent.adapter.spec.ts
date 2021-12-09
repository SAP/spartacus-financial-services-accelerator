import { HttpClientModule, HttpRequest } from '@angular/common/http';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed, waitForAsync } from '@angular/core/testing';
import { OccEndpointsService } from '@spartacus/core';
import { OccConsentAdapter } from './occ-consent.adapter';

const userId = 'testId';
const consentsEndpoint = 'oboConsents';
const oboConsentCustomersEndpoint = 'oboConsentCustomers';

class MockOccEndpointsService {
  buildUrl(endpoint: string, _urlParams?: object, _queryParams?: object) {
    return this.getEndpoint(endpoint);
  }

  getEndpoint(url: string) {
    return url;
  }
}

describe('OccConsentAdapter', () => {
  let adapter: OccConsentAdapter;
  let httpMock: HttpTestingController;
  let occEndpointService: OccEndpointsService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, HttpClientTestingModule],
      providers: [
        OccConsentAdapter,
        { provide: OccEndpointsService, useClass: MockOccEndpointsService },
      ],
    });

    adapter = TestBed.inject(OccConsentAdapter);
    httpMock = TestBed.inject(HttpTestingController);
    occEndpointService = TestBed.inject(OccEndpointsService);
    spyOn(occEndpointService, 'buildUrl').and.callThrough();
  });

  afterEach(() => {
    httpMock.verify();
  });

  describe('getConsents', () => {
    it(
      'should fetch user Claims',
      waitForAsync(() => {
        adapter.getConsents(userId).subscribe();
        httpMock.expectOne((req: HttpRequest<any>) => {
          return req.url === consentsEndpoint && req.method === 'GET';
        }, `GET method and url`);
        expect(occEndpointService.buildUrl).toHaveBeenCalledWith(
          consentsEndpoint,
          {
            urlParams: {
              userId,
            },
          }
        );
      })
    );
  });

  describe('getOBOCustomerList', () => {
    it(
      'should fetch user Claims',
      waitForAsync(() => {
        adapter.getOBOCustomerList(userId).subscribe();
        httpMock.expectOne((req: HttpRequest<any>) => {
          return (
            req.url === oboConsentCustomersEndpoint && req.method === 'GET'
          );
        }, `GET method and url`);
        expect(occEndpointService.buildUrl).toHaveBeenCalledWith(
          oboConsentCustomersEndpoint,
          {
            urlParams: {
              userId,
            },
          }
        );
      })
    );
  });
});
