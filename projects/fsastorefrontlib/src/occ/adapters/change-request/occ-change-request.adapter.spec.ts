import {
  HttpClientModule,
  HttpErrorResponse,
  HttpRequest,
} from '@angular/common/http';
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
const requestId = 'requestId';

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

  it('load change request', async(() => {
    adapter.getChangeRequest(userId, requestId).subscribe();
    const mockReq = httpMock.expectOne((req: HttpRequest<any>) => {
      return (
        req.url ===
          '/users' + `/${userId}` + '/fsChangeRequests' + `/${requestId}` &&
        req.method === 'GET'
      );
    });
    expect(mockReq.cancelled).toBeFalsy();
    expect(mockReq.request.responseType).toEqual('json');
  }));

  it('should throw an error when loading change request', () => {
    let response: any;
    let errResponse: any;
    const errorResponse = new HttpErrorResponse({
      error: '400 error',
      status: 400,
      statusText: 'Bad Request',
    });
    adapter
      .getChangeRequest(userId, requestId)
      .subscribe(res => (response = res), err => (errResponse = err));
    httpMock
      .expectOne((req: HttpRequest<any>) => {
        return (
          req.url ===
            '/users' + `/${userId}` + '/fsChangeRequests' + `/${requestId}` &&
          req.method === 'GET'
        );
      })
      .flush(errorResponse);
    expect(errorResponse.status).toEqual(400);
    expect(errorResponse.name).toEqual('HttpErrorResponse');
  });

  it('cancel change request', async(() => {
    const cancelChangeRequestBody = {
      actionName: 'CANCEL',
    };
    adapter.cancelChangeRequest(userId, requestId).subscribe();
    const mockReq = httpMock.expectOne((req: HttpRequest<any>) => {
      return (
        req.url ===
          '/users' +
            `/${userId}` +
            '/fsChangeRequests' +
            `/${requestId}` +
            `/action` && req.method === 'POST'
      );
    });
    expect(mockReq.request.body).toEqual(cancelChangeRequestBody);
    expect(mockReq.cancelled).toBeFalsy();
    expect(mockReq.request.responseType).toEqual('json');
  }));

  it('should throw an error when canceling change request', () => {
    let response: any;
    let errResponse: any;
    const errorResponse = new HttpErrorResponse({
      error: '400 error',
      status: 400,
      statusText: 'Bad Request',
    });
    adapter
      .cancelChangeRequest(userId, requestId)
      .subscribe(res => (response = res), err => (errResponse = err));
    httpMock
      .expectOne((req: HttpRequest<any>) => {
        return (
          req.url ===
            '/users' +
              `/${userId}` +
              '/fsChangeRequests' +
              `/${requestId}` +
              `/action` && req.method === 'POST'
        );
      })
      .flush(errorResponse);
    expect(errorResponse.status).toEqual(400);
    expect(errorResponse.name).toEqual('HttpErrorResponse');
  });
});
