import { HttpClientModule, HttpRequest } from '@angular/common/http';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';
import { async, TestBed } from '@angular/core/testing';
import { OccPolicyService } from './policy.service';
import { OccConfig } from '@spartacus/core';

const userId = '123';

const policyId = '00000023';
const contractId = '00000023';

const usersEndpoint = '/users';
const policiesEndpoint = '/policies';
const contractsEndpoint = '/contracts';
const premiumCalendarEndpoint = '/premium-calendar';


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

describe('OccPolicyService', () => {
  let service: OccPolicyService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, HttpClientTestingModule],
      providers: [
        OccPolicyService,
        { provide: OccConfig, useValue: MockOccModuleConfig }
      ]
    });

    service = TestBed.get(OccPolicyService);
    httpMock = TestBed.get(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  describe('getPolicies', () => {
    it('should fetch user Policies', async(() => {
      service.getPolicies(userId).subscribe();
      httpMock.expectOne((req: HttpRequest<any>) => {
        return (
          req.url === usersEndpoint + `/${userId}` + policiesEndpoint &&
          req.method === 'GET'
        );
      }, `GET method and url`);
    }));
  });

  describe('getPolicy', () => {
    it('should fetch a single policy', async(() => {
      service.getPolicy(userId, policyId, contractId).subscribe();
      httpMock.expectOne((req: HttpRequest<any>) => {
        return (
          req.url ===
            usersEndpoint +
              `/${userId}` +
              policiesEndpoint +
              `/${policyId}` +
              contractsEndpoint +
              `/${contractId}`
               && req.method === 'GET'
        );
      }, `GET a single policy`);
    }));
  });

  describe('getPremiumCalendar', () => {
    it('should fetch user premium calendar', async(() => {
      service.getPremiumCalendar(userId).subscribe();
      httpMock.expectOne((req: HttpRequest<any>) => {
        return (
          req.url === usersEndpoint + `/${userId}` + policiesEndpoint + premiumCalendarEndpoint &&
          req.method === 'GET'
        );
      }, `GET method and url`);
    }));
  });
});
