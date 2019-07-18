import { HttpClientModule, HttpRequest } from '@angular/common/http';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';
import { async, TestBed } from '@angular/core/testing';
import { OccClaimService } from './claim.service';
import { OccConfig } from '@spartacus/core';

const userId = '123';
const claimNumber = 'CL0000012';

const usersEndpoint = '/users';
const claimsEndpoint = '/claims';

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

describe('OccClaimsService', () => {
  let service: OccClaimService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, HttpClientTestingModule],
      providers: [
        OccClaimService,
        { provide: OccConfig, useValue: MockOccModuleConfig }
      ]
    });

    service = TestBed.get(OccClaimService);
    httpMock = TestBed.get(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  describe('getClaims', () => {
    it('should fetch user Claims', async(() => {
      service.getClaims(userId).subscribe();
      httpMock.expectOne((req: HttpRequest<any>) => {
        return (
          req.url === usersEndpoint + `/${userId}` + claimsEndpoint &&
          req.method === 'GET'
        );
      }, `GET method and url`);
    }));
  });

  describe('deleteClaim', () => {
    it('delete specified claim by id', async(() => {
      service.deleteClaim(userId, claimNumber).subscribe();
      httpMock.expectOne((req: HttpRequest<any>) => {
        return (
          req.url === usersEndpoint + `/${userId}` + claimsEndpoint + `/${claimNumber}` &&
          req.method === 'DELETE'
        );
      }, `DELETE method and url`);
    }));
  });
});
