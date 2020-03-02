import { HttpClientModule, HttpRequest } from '@angular/common/http';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { async, TestBed } from '@angular/core/testing';
import { OccConfig } from '@spartacus/core';
import { OccUserRequestAdapter } from './occ-user-request.adapter';
import { FSStepData } from '../../occ-models/occ.models';

const userId = 'test@user.com';
const requestId = '000001';
const claimNumber = '000001';

const usersEndpoint = '/users';
const requestEndpoint = '/fsUserRequests';
const userRequestActionEndpoit = '/action';

const stepData: FSStepData = {
  name: 'testStepData',
  pageLabelOrId: 'testPage',
  sequenceNumber: '1',
  status: 'COMPLETED',
};

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

describe('OccUserRequestAdapter', () => {
  let adapter: OccUserRequestAdapter;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, HttpClientTestingModule],
      providers: [
        OccUserRequestAdapter,
        { provide: OccConfig, useValue: MockOccModuleConfig },
      ],
    });

    adapter = TestBed.get(OccUserRequestAdapter);
    httpMock = TestBed.get(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  describe('getUserRequest', () => {
    it('should fetch user request', async(() => {
      adapter.getUserRequest(userId, requestId).subscribe();
      httpMock.expectOne((req: HttpRequest<any>) => {
        return (
          req.url ===
            usersEndpoint + `/${userId}` + requestEndpoint + `/${requestId}` &&
          req.method === 'GET'
        );
      }, `GET method and url`);
    }));
  });

  it('update user request', async(() => {
    adapter.updateUserRequest(userId, requestId, stepData).subscribe();
    httpMock.expectOne((req: HttpRequest<any>) => {
      return (
        req.url ===
          usersEndpoint + `/${userId}` + requestEndpoint + `/${requestId}` &&
        req.body === stepData &&
        req.method === 'PATCH'
      );
    }, `PATCH method and url`);
  }));

  describe('submit user request', () => {
    it('should submit user request', async(() => {
      adapter.submitUserRequest(userId, claimNumber).subscribe();
      httpMock.expectOne((req: HttpRequest<any>) => {
        return (
          req.url ===
            usersEndpoint +
              `/${userId}` +
              requestEndpoint +
              `/${claimNumber}` +
              userRequestActionEndpoit && req.method === 'POST'
        );
      }, `POST method and url`);
    }));
  });
});
