import { HttpClientModule, HttpRequest } from '@angular/common/http';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { async, TestBed } from '@angular/core/testing';
import { OccEndpointsService } from '@spartacus/core';
import { OccUserRequestAdapter } from './occ-user-request.adapter';
import { FSStepData } from '../../occ-models/occ.models';

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
  getUrl(endpoint: string, _urlParams?: object, _queryParams?: object) {
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

    adapter = TestBed.get(OccUserRequestAdapter);
    httpMock = TestBed.get(HttpTestingController);
    occEndpointService = TestBed.get(OccEndpointsService);
    spyOn(occEndpointService, 'getUrl').and.callThrough();
  });

  afterEach(() => {
    httpMock.verify();
  });

  describe('getUserRequest', () => {
    it('should fetch user request', async(() => {
      adapter.getUserRequest(userId, requestId).subscribe();
      httpMock.expectOne((req: HttpRequest<any>) => {
        return req.url === userRequestEndpoint && req.method === 'GET';
      }, `GET method and url`);
      expect(occEndpointService.getUrl).toHaveBeenCalledWith(
        userRequestEndpoint,
        {
          userId,
          requestId,
        }
      );
    }));
  });

  it('update user request', async(() => {
    adapter.updateUserRequest(userId, requestId, stepData).subscribe();
    httpMock.expectOne((req: HttpRequest<any>) => {
      return (
        req.url === userRequestEndpoint &&
        req.body === stepData &&
        req.method === 'PATCH'
      );
    }, `PATCH method and url`);
    expect(occEndpointService.getUrl).toHaveBeenCalledWith(
      userRequestEndpoint,
      {
        userId,
        requestId,
      }
    );
  }));

  describe('submit user request', () => {
    it('should submit user request', async(() => {
      adapter.submitUserRequest(userId, requestId).subscribe();
      httpMock.expectOne((req: HttpRequest<any>) => {
        return req.url === submitUserRequestEndpoint && req.method === 'POST';
      }, `POST method and url`);
      expect(occEndpointService.getUrl).toHaveBeenCalledWith(
        submitUserRequestEndpoint,
        {
          userId,
          requestId,
        }
      );
    }));
  });
});
