import { HttpClientModule, HttpRequest } from '@angular/common/http';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { async, TestBed } from '@angular/core/testing';
import { OccPolicyAdapter } from './occ-policy.adapter';
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
    baseSite: [''],
  },
  backend: {
    occ: {
      baseUrl: '',
      prefix: '',
    },
  },
};

describe('OccPolicyAdapter', () => {
  let adapter: OccPolicyAdapter;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, HttpClientTestingModule],
      providers: [
        OccPolicyAdapter,
        { provide: OccConfig, useValue: MockOccModuleConfig },
      ],
    });

    adapter = TestBed.get(OccPolicyAdapter);
    httpMock = TestBed.get(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  describe('getPolicies', () => {
    it('should fetch user Policies', async(() => {
      adapter.getPolicies(userId).subscribe();
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
      adapter.getPolicy(userId, policyId, contractId).subscribe();
      httpMock.expectOne((req: HttpRequest<any>) => {
        return (
          req.url ===
            usersEndpoint +
              `/${userId}` +
              policiesEndpoint +
              `/${policyId}` +
              contractsEndpoint +
              `/${contractId}` && req.method === 'GET'
        );
      }, `GET a single policy`);
    }));
  });

  describe('getPremiumCalendar', () => {
    it('should fetch user premium calendar', async(() => {
      adapter.getPremiumCalendar(userId).subscribe();
      httpMock.expectOne((req: HttpRequest<any>) => {
        return (
          req.url ===
            usersEndpoint +
              `/${userId}` +
              policiesEndpoint +
              premiumCalendarEndpoint && req.method === 'GET'
        );
      }, `GET method and url`);
    }));
  });
});
