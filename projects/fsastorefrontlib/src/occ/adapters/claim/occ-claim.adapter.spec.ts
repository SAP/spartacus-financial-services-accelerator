import { HttpClientModule, HttpRequest } from '@angular/common/http';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { waitForAsync, TestBed } from '@angular/core/testing';
import { OccEndpointsService } from '@spartacus/core';
import { OccClaimAdapter } from './occ-claim.adapter';

const userId = '123';
const claimId = 'CL0000012';

const policyNumber = 'PL0000012';
const contractNumber = 'CO0000012';

const claimEndpoint = 'claim';
const claimsEndpoint = 'claims';
const createClaimEndpoint = 'createClaim';

const mockClaimData = {
  content:
    '{"whatHappened":"AutoTheft","whenHappened":"2021-05-01","whatTime":"15:06:46","country":"RS","city":"Novi Sad","postcode":"21000","address":"AAA, 22","description":"ddfdgf"}',
  documents: [],
};

class MockOccEndpointsService {
  buildUrl(endpoint: string, _urlParams?: object, _queryParams?: object) {
    return this.getEndpoint(endpoint);
  }

  getEndpoint(url: string) {
    return url;
  }
}

describe('OccClaimAdapter', () => {
  let adapter: OccClaimAdapter;
  let httpMock: HttpTestingController;
  let occEndpointService: OccEndpointsService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, HttpClientTestingModule],
      providers: [
        OccClaimAdapter,
        { provide: OccEndpointsService, useClass: MockOccEndpointsService },
      ],
    });

    adapter = TestBed.inject(OccClaimAdapter);
    httpMock = TestBed.inject(HttpTestingController);
    occEndpointService = TestBed.inject(OccEndpointsService);
    spyOn(occEndpointService, 'buildUrl').and.callThrough();
  });

  afterEach(() => {
    httpMock.verify();
  });

  describe('getClaims', () => {
    it(
      'should fetch user Claims',
      waitForAsync(() => {
        adapter.getClaims(userId).subscribe();
        httpMock.expectOne((req: HttpRequest<any>) => {
          return req.url === claimsEndpoint && req.method === 'GET';
        }, `GET method and url`);
        expect(occEndpointService.buildUrl).toHaveBeenCalledWith(
          claimsEndpoint,
          {
            userId,
          }
        );
      })
    );
  });

  describe('getClaim', () => {
    it(
      'get specified claim by id',
      waitForAsync(() => {
        adapter.getClaim(userId, claimId).subscribe();
        httpMock.expectOne((req: HttpRequest<any>) => {
          return req.url === claimEndpoint && req.method === 'GET';
        }, `GET method and url`);
        expect(occEndpointService.buildUrl).toHaveBeenCalledWith(
          claimEndpoint,
          {
            userId,
            claimId,
          }
        );
      })
    );
  });

  describe('deleteClaim', () => {
    it(
      'delete specified claim by id',
      waitForAsync(() => {
        adapter.deleteClaim(userId, claimId).subscribe();
        httpMock.expectOne((req: HttpRequest<any>) => {
          return req.url === claimEndpoint && req.method === 'DELETE';
        }, `DELETE method and url`);
        expect(occEndpointService.buildUrl).toHaveBeenCalledWith(
          claimEndpoint,
          {
            userId,
            claimId,
          }
        );
      })
    );
  });

  describe('createClaim', () => {
    it(
      'create claim for specified policyId and contractId',
      waitForAsync(() => {
        adapter.createClaim(userId, policyNumber, contractNumber).subscribe();
        httpMock.expectOne((req: HttpRequest<any>) => {
          return req.url === createClaimEndpoint && req.method === 'POST';
        }, `POST method and url`);
        expect(occEndpointService.buildUrl).toHaveBeenCalledWith(
          createClaimEndpoint,
          {
            userId,
          }
        );
      })
    );
  });

  describe('updateClaim', () => {
    it(
      'update claim for specified claimId',
      waitForAsync(() => {
        adapter.updateClaim(userId, claimId, mockClaimData).subscribe();
        httpMock.expectOne((req: HttpRequest<any>) => {
          return req.url === claimEndpoint && req.method === 'PATCH';
        }, `PATCH method and url`);
        expect(occEndpointService.buildUrl).toHaveBeenCalledWith(
          claimEndpoint,
          {
            userId,
            claimId,
          }
        );
      })
    );

    it(
      'update claim for specified claimId without passing claim object',
      waitForAsync(() => {
        adapter.updateClaim(userId, claimId, {}).subscribe();
        httpMock.expectOne((req: HttpRequest<any>) => {
          return req.url === claimEndpoint && req.method === 'PATCH';
        }, `PATCH method and url`);
        expect(occEndpointService.buildUrl).toHaveBeenCalledWith(
          claimEndpoint,
          {
            userId,
            claimId,
          }
        );
      })
    );
  });
});
