import { HttpClientModule, HttpRequest } from '@angular/common/http';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { async, TestBed } from '@angular/core/testing';
import { OccConfig } from '@spartacus/core';
import { OccChangeRequestAdapter } from './occ-change-request.adapter';

const userId = 'userId';
const policyId = 'policyId';
const changeRequestType = 'requestType';
const contractId = 'contractId';

const usersEndpoint = '/users';
const changeRequestsEndpoint = '/fsChangeRequests';

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

describe('OccChangeRequestAdapter', () => {
  let adapter: OccChangeRequestAdapter;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, HttpClientTestingModule],
      providers: [
        OccChangeRequestAdapter,
        { provide: OccConfig, useValue: MockOccModuleConfig },
      ],
    });

    adapter = TestBed.get(OccChangeRequestAdapter);
    httpMock = TestBed.get(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  describe('createChangeRequest', () => {
    it('should create change request', async(() => {
      adapter
        .createChangeRequestForPolicy(
          policyId,
          contractId,
          changeRequestType,
          userId
        )
        .subscribe();
      httpMock.expectOne((req: HttpRequest<any>) => {
        return (
          req.url === usersEndpoint + `/${userId}` + changeRequestsEndpoint &&
          req.params.append('policyId', policyId) &&
          req.params.append('contractId', contractId) &&
          req.params.append('requestType', changeRequestType) &&
          req.method === 'POST'
        );
      }, `POST method and url`);
    }));
  });
});
