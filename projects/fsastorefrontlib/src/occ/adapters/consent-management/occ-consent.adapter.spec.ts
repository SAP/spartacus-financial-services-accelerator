import { HttpClientModule, HttpRequest } from '@angular/common/http';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed, waitForAsync } from '@angular/core/testing';
import { OccEndpointsService } from '@spartacus/core';
import { OccConsentAdapter } from './occ-consent.adapter';

const userId = 'testId';
const customerId = 'testCustId';
const consentsEndpoint = 'oboConsents';
const oboConsentCustomersEndpoint = 'oboConsentCustomers';
const oboConsentCustomerEndpoint = 'oboConsentCustomer';
const oboConsentCustomerQuotesEndpoint = 'oboConsentCustomerQuotes';
const oboConsentCustomerPoliciesEndpoint = 'oboConsentCustomerPolicies';
const oboConsentCustomerClaimsEndpoint = 'oboConsentCustomerClaims';

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
      'should fetch user Consents',
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
      'should fetch users',
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

  describe('getOBOCustomer', () => {
    it(
      'should fetch user',
      waitForAsync(() => {
        adapter.getOBOCustomer(userId, customerId).subscribe();
        httpMock.expectOne((req: HttpRequest<any>) => {
          return req.url === oboConsentCustomerEndpoint && req.method === 'GET';
        }, `GET method and url`);
        expect(occEndpointService.buildUrl).toHaveBeenCalledWith(
          oboConsentCustomerEndpoint,
          {
            urlParams: {
              userId,
              customerId,
            },
          }
        );
      })
    );
  });

  describe('getQuotesForOBOCustomer', () => {
    it(
      'should fetch quotes for user',
      waitForAsync(() => {
        adapter.getQuotesForOBOCustomer(userId, customerId).subscribe();
        httpMock.expectOne((req: HttpRequest<any>) => {
          return (
            req.url === oboConsentCustomerQuotesEndpoint && req.method === 'GET'
          );
        }, `GET method and url`);
        expect(occEndpointService.buildUrl).toHaveBeenCalledWith(
          oboConsentCustomerQuotesEndpoint,
          {
            urlParams: {
              userId,
              customerId,
            },
          }
        );
      })
    );
  });

  describe('getPoliciesForOBOCustomer', () => {
    it(
      'should fetch policies for user',
      waitForAsync(() => {
        adapter.getPoliciesForOBOCustomer(userId, customerId).subscribe();
        httpMock.expectOne((req: HttpRequest<any>) => {
          return (
            req.url === oboConsentCustomerPoliciesEndpoint &&
            req.method === 'GET'
          );
        }, `GET method and url`);
        expect(occEndpointService.buildUrl).toHaveBeenCalledWith(
          oboConsentCustomerPoliciesEndpoint,
          {
            urlParams: {
              userId,
              customerId,
            },
          }
        );
      })
    );
  });

  describe('getClaimsForOBOCustomer', () => {
    it(
      'should fetch claims for user',
      waitForAsync(() => {
        adapter.getClaimsForOBOCustomer(userId, customerId).subscribe();
        httpMock.expectOne((req: HttpRequest<any>) => {
          return (
            req.url === oboConsentCustomerClaimsEndpoint && req.method === 'GET'
          );
        }, `GET method and url`);
        expect(occEndpointService.buildUrl).toHaveBeenCalledWith(
          oboConsentCustomerClaimsEndpoint,
          {
            urlParams: {
              userId,
              customerId,
            },
          }
        );
      })
    );
  });
});
