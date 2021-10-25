import { HttpClientModule, HttpRequest } from '@angular/common/http';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { waitForAsync, TestBed } from '@angular/core/testing';
import { OccEndpointsService } from '@spartacus/core';
import { FSSearchConfig } from '../../../core/my-account/services/inbox-data.service';
import { OccInboxAdapter } from './occ-inbox.adapter';

const userId = '123';
const messageGroup = 'autoGroup';
const messagesEndPoint = 'siteMessages';
const updateMessagesEndPoint = 'updateMessages';
const searchConfig: FSSearchConfig = {
  currentPage: 0,
  sortCode: 'name',
  sortOrder: 'asc',
};

class MockOccEndpointsService {
  buildUrl(endpoint: string, _urlParams?: object, _queryParams?: object) {
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
    spyOn(occEndpointService, 'buildUrl').and.callThrough();
  });

  afterEach(() => {
    httpMock.verify();
  });

  describe('getMessagesForMessageGroup', () => {
    it(
      'should fetch user messages for specified group',
      waitForAsync(() => {
        adapter
          .getSiteMessagesForUserAndGroup(userId, messageGroup, searchConfig)
          .subscribe();
        httpMock.expectOne((req: HttpRequest<any>) => {
          return req.url === messagesEndPoint && req.method === 'GET';
        }, `GET method and url`);
        expect(occEndpointService.buildUrl).toHaveBeenCalledWith(
          messagesEndPoint,
          {
            urlParams: {
              userId,
            },
          }
        );
      })
    );

    it(
      'should fetch user messages for specified group and read flag',
      waitForAsync(() => {
        adapter
          .getSiteMessagesForUserAndGroup(
            userId,
            messageGroup,
            searchConfig,
            false
          )
          .subscribe();
        httpMock.expectOne((req: HttpRequest<any>) => {
          return req.url === messagesEndPoint && req.method === 'GET';
        }, `GET method and url`);
        expect(occEndpointService.buildUrl).toHaveBeenCalledWith(
          messagesEndPoint,
          {
            urlParams: {
              userId,
            },
          }
        );
      })
    );
  });

  describe('setMessagesState', () => {
    it(
      'should set message state',
      waitForAsync(() => {
        adapter.setMessagesState(userId, ['1'], true).subscribe();
        httpMock.expectOne((req: HttpRequest<any>) => {
          return req.url === updateMessagesEndPoint && req.method === 'PUT';
        }, `PUT method and url`);
        expect(occEndpointService.buildUrl).toHaveBeenCalledWith(
          updateMessagesEndPoint,
          {
            urlParams: {
              userId,
            },
          }
        );
      })
    );
  });
});
