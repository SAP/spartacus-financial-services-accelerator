import { HttpClientModule, HttpRequest } from '@angular/common/http';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { async, TestBed } from '@angular/core/testing';
import { OccEndpointsService } from '@spartacus/core';
import { OccClaimAdapter } from './occ-claim.adapter';

const userId = '123';
const claimId = 'CL0000012';

const policyNumber = 'PL0000012';
const contractNumber = 'CO0000012';

const claimEndpoint = 'claim';
const claimsEndpoint = 'claims';
const createClaimEndpoint = 'createClaim';

class MockOccEndpointsService {
  getUrl(endpoint: string, _urlParams?: object, _queryParams?: object) {
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
    spyOn(occEndpointService, 'getUrl').and.callThrough();
  });

  afterEach(() => {
    httpMock.verify();
  });

  describe('getClaims', () => {
    it('should fetch user Claims', async(() => {
      adapter.getClaims(userId).subscribe();
      httpMock.expectOne((req: HttpRequest<any>) => {
        return req.url === claimsEndpoint && req.method === 'GET';
      }, `GET method and url`);
      expect(occEndpointService.getUrl).toHaveBeenCalledWith(claimsEndpoint, {
        userId,
      });
    }));
  });

  describe('getClaim', () => {
    it('get specified claim by id', async(() => {
      adapter.getClaim(userId, claimId).subscribe();
      httpMock.expectOne((req: HttpRequest<any>) => {
        return req.url === claimEndpoint && req.method === 'GET';
      }, `GET method and url`);
      expect(occEndpointService.getUrl).toHaveBeenCalledWith(claimEndpoint, {
        userId,
        claimId,
      });
    }));
  });

  describe('deleteClaim', () => {
    it('delete specified claim by id', async(() => {
      adapter.deleteClaim(userId, claimId).subscribe();
      httpMock.expectOne((req: HttpRequest<any>) => {
        return req.url === claimEndpoint && req.method === 'DELETE';
      }, `DELETE method and url`);
      expect(occEndpointService.getUrl).toHaveBeenCalledWith(claimEndpoint, {
        userId,
        claimId,
      });
    }));
  });

  describe('createClaim', () => {
    it('create claim for specified policyId and contractId', async(() => {
      adapter.createClaim(userId, policyNumber, contractNumber).subscribe();
      httpMock.expectOne((req: HttpRequest<any>) => {
        return req.url === createClaimEndpoint && req.method === 'POST';
      }, `POST method and url`);
      expect(occEndpointService.getUrl).toHaveBeenCalledWith(
        createClaimEndpoint,
        {
          userId,
        }
      );
    }));
  });
});
