import { HttpClientModule, HttpRequest } from '@angular/common/http';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';
import { async, TestBed } from '@angular/core/testing';
import { OccEndpointsService } from '@spartacus/core';
import { OccInboxAdapter } from './occ-inbox.adapter';

const userId = '123';
const messageGroup = 'autoGroup';
const messagesEndPoint = 'siteMessages';

class MockOccEndpointsService {
  getUrl(endpoint: string, _urlParams?: object, _queryParams?: object) {
    return this.getEndpoint(endpoint);
  }
  getEndpoint(url: string) {
    return url;
  }
}

describe('OccInboxAdapter', () => {
  let adapter: OccInboxAdapter;
  let httpMock: HttpTestingController;
  let occEndpointService: OccEndpointsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, HttpClientTestingModule],
      providers: [
        OccInboxAdapter,
        { provide: OccEndpointsService, useClass: MockOccEndpointsService },
      ],
    });

    adapter = TestBed.inject(OccInboxAdapter);
    httpMock = TestBed.inject(HttpTestingController);
    occEndpointService = TestBed.inject(OccEndpointsService);
    spyOn(occEndpointService, 'getUrl').and.callThrough();
  });

  afterEach(() => {
    httpMock.verify();
  });

  describe('getMessagesForMessageGroup', () => {
    it('should fetch user messages for specified group', async(() => {
      adapter
        .getSiteMessagesForUserAndGroup(userId, messageGroup, {})
        .subscribe();
      httpMock.expectOne((req: HttpRequest<any>) => {
        return req.url === messagesEndPoint && req.method === 'GET';
      }, `GET method and url`);
      expect(occEndpointService.getUrl).toHaveBeenCalledWith(messagesEndPoint, {
        userId,
      });
    }));
  });
});
