import { HttpClientModule, HttpRequest } from '@angular/common/http';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { waitForAsync, TestBed } from '@angular/core/testing';
import { OccEndpointsService } from '@spartacus/core';
import { FSStepData } from '../../occ-models/occ.models';
import { OccUserRequestAdapter } from './occ-user-request.adapter';

const userId = 'test@user.com';
const requestId = '000001';

const userRequestEndpoint = 'userRequest';
const submitUserRequestEndpoint = 'submitUserRequest';

const stepData: FSStepData = {
  name: 'testStepData',
  pageLabelOrId: 'testPage',
  sequenceNumber: '1',
  status: 'COMPLETED',
};

class MockOccEndpointsService {
  buildUrl(endpoint: string, _urlParams?: object, _queryParams?: object) {
    return this.getEndpoint(endpoint);
  }
  getEndpoint(url: string) {
    return url;
  }
}

describe('OccUserRequestAdapter', () => {
  let adapter: OccUserRequestAdapter;
  let httpMock: HttpTestingController;
  let occEndpointService: OccEndpointsService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, HttpClientTestingModule],
      providers: [
        OccUserRequestAdapter,
        { provide: OccEndpointsService, useClass: MockOccEndpointsService },
      ],
    });

    adapter = TestBed.inject(OccUserRequestAdapter);
    httpMock = TestBed.inject(HttpTestingController);
    occEndpointService = TestBed.inject(OccEndpointsService);
    spyOn(occEndpointService, 'buildUrl').and.callThrough();
  });

  afterEach(() => {
    httpMock.verify();
  });

  describe('getUserRequest', () => {
    it(
      'should fetch user request',
      waitForAsync(() => {
        adapter.getUserRequest(userId, requestId).subscribe();
        httpMock.expectOne((req: HttpRequest<any>) => {
          return req.url === userRequestEndpoint && req.method === 'GET';
        }, `GET method and url`);
        expect(occEndpointService.buildUrl).toHaveBeenCalledWith(
          userRequestEndpoint,
          {
            urlParams: {
              userId,
              requestId,
            },
          }
        );
      })
    );
  });

  it(
    'update user request',
    waitForAsync(() => {
      adapter.updateUserRequest(userId, requestId, stepData).subscribe();
      httpMock.expectOne((req: HttpRequest<any>) => {
        return (
          req.url === userRequestEndpoint &&
          req.body === stepData &&
          req.method === 'PATCH'
        );
      }, `PATCH method and url`);
      expect(occEndpointService.buildUrl).toHaveBeenCalledWith(
        userRequestEndpoint,
        {
          urlParams: {
            userId,
            requestId,
          },
        }
      );
    })
  );

  describe('submit user request', () => {
    it(
      'should submit user request',
      waitForAsync(() => {
        adapter.submitUserRequest(userId, requestId).subscribe();
        httpMock.expectOne((req: HttpRequest<any>) => {
          return req.url === submitUserRequestEndpoint && req.method === 'POST';
        }, `POST method and url`);
        expect(occEndpointService.buildUrl).toHaveBeenCalledWith(
          submitUserRequestEndpoint,
          {
            urlParams: {
              userId,
              requestId,
            },
          }
        );
      })
    );
  });
});
