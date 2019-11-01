import { HttpClientModule, HttpRequest } from '@angular/common/http';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { async, TestBed } from '@angular/core/testing';
import { OccConfig } from '@spartacus/core';
import { OccUserRequestService } from './user-request.service';

const userId = 'test@user.com';
const requestId = '000001';

const usersEndpoint = '/users';
const requestEndpoint = '/requests';

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

describe('OccUserRequestService', () => {
  let service: OccUserRequestService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, HttpClientTestingModule],
      providers: [
        OccUserRequestService,
        { provide: OccConfig, useValue: MockOccModuleConfig },
      ],
    });

    service = TestBed.get(OccUserRequestService);
    httpMock = TestBed.get(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  describe('getUserRequest', () => {
    it('should fetch user request', async(() => {
      service.getUserRequest(userId, requestId).subscribe();
      httpMock.expectOne((req: HttpRequest<any>) => {
        return (
          req.url ===
            usersEndpoint + `/${userId}` + requestEndpoint + `/${requestId}` &&
          req.method === 'GET'
        );
      }, `GET method and url`);
    }));
  });
});
