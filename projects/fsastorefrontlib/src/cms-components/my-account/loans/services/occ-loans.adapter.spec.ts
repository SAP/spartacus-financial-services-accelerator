import { HttpClientModule, HttpRequest } from '@angular/common/http';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { waitForAsync, TestBed } from '@angular/core/testing';
import { OccEndpointsService } from '@spartacus/core';
import { OccLoansAdapter } from './occ-loans.adapter';
import { OCC_USER_ID_CURRENT } from '@spartacus/core';

const loansEndpoint = 'loans';

class MockOccEndpointsService {
  buildUrl(endpoint: string, _urlParams?: object, _queryParams?: object) {
    return this.getEndpoint(endpoint);
  }
  getEndpoint(url: string) {
    return url;
  }
}

describe('OccLoansAdapter', () => {
  let adapter: OccLoansAdapter;
  let httpMock: HttpTestingController;
  let occEndpointService: OccEndpointsService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, HttpClientTestingModule],
      providers: [
        OccLoansAdapter,
        { provide: OccEndpointsService, useClass: MockOccEndpointsService },
      ],
    });

    adapter = TestBed.inject(OccLoansAdapter);
    httpMock = TestBed.inject(HttpTestingController);
    occEndpointService = TestBed.inject(OccEndpointsService);
    spyOn(occEndpointService, 'buildUrl').and.callThrough();
  });

  afterEach(() => {
    httpMock.verify();
  });

  describe('getLoans', () => {
    it(
      'should fetch loans',
      waitForAsync(() => {
        adapter.getLoans(OCC_USER_ID_CURRENT).subscribe();
        httpMock.expectOne((req: HttpRequest<any>) => {
          return req.url === loansEndpoint && req.method === 'GET';
        }, `GET method and url`);
        expect(occEndpointService.buildUrl).toHaveBeenCalledWith(
          loansEndpoint,
          {
            urlParams: {
              userId: OCC_USER_ID_CURRENT,
            },
          }
        );
      })
    );
  });
});
