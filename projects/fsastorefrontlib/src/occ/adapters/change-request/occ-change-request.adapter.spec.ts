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
import { OccEndpointsService } from '@spartacus/core';
import { OccChangeRequestAdapter } from './occ-change-request.adapter';

const userId = 'userId';
const policyId = 'policyId';
const changeRequestType = 'requestType';
const contractId = 'contractId';
const requestId = 'requestId';

const changeRequestEndpoint = 'changeRequest';
const createChangeRequestEndpoint = 'createChangeRequest';
const simulateChangeRequestsEndpoint = 'simulateChangeRequest';
const cancelChangeRequestsEndpoint = 'cancelChangeRequest';

const changeRequestData = {};

class MockOccEndpointsService {
  getUrl(endpoint: string, _urlParams?: object, _queryParams?: object) {
    return this.getEndpoint(endpoint);
  }
  getEndpoint(url: string) {
    return url;
  }
}

describe('OccChangeRequestAdapter', () => {
  let adapter: OccChangeRequestAdapter;
  let httpMock: HttpTestingController;
  let occEndpointService: OccEndpointsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, HttpClientTestingModule],
      providers: [
        OccChangeRequestAdapter,
        { provide: OccEndpointsService, useClass: MockOccEndpointsService },
      ],
    });

    adapter = TestBed.inject(OccChangeRequestAdapter);
    httpMock = TestBed.inject(HttpTestingController);
    occEndpointService = TestBed.inject(OccEndpointsService);
    spyOn(occEndpointService, 'getUrl').and.callThrough();
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
          req.url === createChangeRequestEndpoint &&
          req.params.append('policyId', policyId) &&
          req.params.append('contractId', contractId) &&
          req.params.append('requestType', changeRequestType) &&
          req.method === 'POST'
        );
      }, `POST method and url`);
      expect(
        occEndpointService.getUrl
      ).toHaveBeenCalledWith(createChangeRequestEndpoint, { userId });
    }));
  });

  describe('simulateChangeRequest', () => {
    it('should simulate change request', async(() => {
      adapter
        .simulateChangeRequest(userId, requestId, changeRequestData)
        .subscribe();
      httpMock.expectOne((req: HttpRequest<any>) => {
        return (
          req.url === simulateChangeRequestsEndpoint && req.method === 'POST'
        );
      }, `POST method and url`);
      expect(occEndpointService.getUrl).toHaveBeenCalledWith(
        simulateChangeRequestsEndpoint,
        {
          userId,
          requestId,
        }
      );
    }));
  });

  it('load change request', async(() => {
    adapter.getChangeRequest(userId, requestId).subscribe();
    const mockReq = httpMock.expectOne((req: HttpRequest<any>) => {
      return req.url === changeRequestEndpoint && req.method === 'GET';
    });
    expect(mockReq.cancelled).toBeFalsy();
    expect(mockReq.request.responseType).toEqual('json');
    expect(occEndpointService.getUrl).toHaveBeenCalledWith(
      changeRequestEndpoint,
      {
        userId,
        requestId,
      }
    );
  }));

  it('should throw an error when loading change request', () => {
    let response: any;
    let errResponse: any;
    const errorResponse = new HttpErrorResponse({
      error: '400 error',
      status: 400,
      statusText: 'Bad Request',
    });
    adapter.getChangeRequest(userId, requestId).subscribe(
      res => (response = res),
      err => (errResponse = err)
    );
    httpMock
      .expectOne((req: HttpRequest<any>) => {
        return req.url === changeRequestEndpoint && req.method === 'GET';
      })
      .flush(errorResponse);
    expect(errorResponse.status).toEqual(400);
    expect(errorResponse.name).toEqual('HttpErrorResponse');
    expect(occEndpointService.getUrl).toHaveBeenCalledWith(
      changeRequestEndpoint,
      {
        userId,
        requestId,
      }
    );
  });

  it('cancel change request', async(() => {
    const cancelChangeRequestBody = {
      actionName: 'CANCEL',
    };
    adapter.cancelChangeRequest(userId, requestId).subscribe();
    const mockReq = httpMock.expectOne((req: HttpRequest<any>) => {
      return req.url === cancelChangeRequestsEndpoint && req.method === 'POST';
    });
    expect(mockReq.request.body).toEqual(cancelChangeRequestBody);
    expect(mockReq.cancelled).toBeFalsy();
    expect(mockReq.request.responseType).toEqual('json');
    expect(occEndpointService.getUrl).toHaveBeenCalledWith(
      cancelChangeRequestsEndpoint,
      {
        userId,
        requestId,
      }
    );
  }));

  it('should throw an error when canceling change request', () => {
    let response: any;
    let errResponse: any;
    const errorResponse = new HttpErrorResponse({
      error: '400 error',
      status: 400,
      statusText: 'Bad Request',
    });
    adapter.cancelChangeRequest(userId, requestId).subscribe(
      res => (response = res),
      err => (errResponse = err)
    );
    httpMock
      .expectOne((req: HttpRequest<any>) => {
        return (
          req.url === cancelChangeRequestsEndpoint && req.method === 'POST'
        );
      })
      .flush(errorResponse);
    expect(errorResponse.status).toEqual(400);
    expect(errorResponse.name).toEqual('HttpErrorResponse');
    expect(occEndpointService.getUrl).toHaveBeenCalledWith(
      cancelChangeRequestsEndpoint,
      {
        userId,
        requestId,
      }
    );
  });
});
