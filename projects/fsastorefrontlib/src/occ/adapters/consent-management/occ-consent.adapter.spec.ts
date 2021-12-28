import {
  HttpClientModule,
  HttpErrorResponse,
  HttpRequest,
} from '@angular/common/http';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed, waitForAsync } from '@angular/core/testing';
import { Address, OccEndpointsService } from '@spartacus/core';
import { OccConsentAdapter } from './occ-consent.adapter';

const userId = 'testId';
const customerId = 'testCustId';
const consentsEndpoint = 'oboConsents';
const oboConsentCustomersEndpoint = 'oboConsentCustomers';
const oboConsentCustomerEndpoint = 'oboConsentCustomer';
const oboConsentCustomerQuotesEndpoint = 'oboConsentCustomerQuotes';
const oboConsentCustomerPoliciesEndpoint = 'oboConsentCustomerPolicies';
const oboConsentCustomerClaimsEndpoint = 'oboConsentCustomerClaims';
const cartId = 'cartId';
const oboCustomerId = 'oboCustomerId';
const transferCartEndpoint = 'transferCart';
const addAddressEndpoint = 'oboConsentAddresses';

const address: Address = {
  companyName: 'Test Company',
  defaultAddress: true,
};

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
      'should fetch consents for user',
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
      'should fetch OBO Customer List',
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
    describe('createAddressForUser', () => {
      it(
        'should create address for user',
        waitForAsync(() => {
          adapter
            .createAddressForUser(userId, oboCustomerId, address)
            .subscribe();
          httpMock.expectOne((req: HttpRequest<any>) => {
            return req.url === addAddressEndpoint && req.method === 'POST';
          }, `POST method and url`);
          expect(occEndpointService.buildUrl).toHaveBeenCalledWith(
            addAddressEndpoint,
            {
              urlParams: {
                userId,
                oboCustomerId,
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
              req.url === oboConsentCustomerQuotesEndpoint &&
              req.method === 'GET'
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
      describe('transferCartToOboCustomer', () => {
        it(
          'should transfer cart to OBO Customer',
          waitForAsync(() => {
            adapter
              .transferCartToOboCustomer(cartId, userId, oboCustomerId)
              .subscribe();
            httpMock.expectOne((req: HttpRequest<any>) => {
              return req.url === transferCartEndpoint && req.method === 'PATCH';
            }, `PATCH method and url`);
            expect(occEndpointService.buildUrl).toHaveBeenCalledWith(
              transferCartEndpoint,
              {
                urlParams: {
                  userId,
                  cartId,
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
                req.url === oboConsentCustomerClaimsEndpoint &&
                req.method === 'GET'
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

        it('should throw an error while transfering cart to another customer', () => {
          let response: any;
          let errResponse: any;
          const errorResponse = new HttpErrorResponse({
            error: '400 error',
            status: 400,
            statusText: 'Bad Request',
          });
          adapter
            .transferCartToOboCustomer(cartId, userId, oboCustomerId)
            .subscribe(
              res => (response = res),
              err => (errResponse = err)
            );
          httpMock
            .expectOne((req: HttpRequest<any>) => {
              return req.url === transferCartEndpoint && req.method === 'PATCH';
            })
            .flush(errorResponse);
          expect(errorResponse.status).toEqual(400);
          expect(errorResponse.name).toEqual('HttpErrorResponse');
          expect(occEndpointService.buildUrl).toHaveBeenCalledWith(
            transferCartEndpoint,
            {
              urlParams: {
                userId,
                cartId,
              },
            }
          );
        });
      });
    });
  });
});
