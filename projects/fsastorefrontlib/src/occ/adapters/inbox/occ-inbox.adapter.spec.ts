import { HttpClientModule, HttpRequest } from '@angular/common/http';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { async, TestBed } from '@angular/core/testing';
import { OccInboxAdapter } from './occ-inbox.adapter';
import { OccConfig } from '@spartacus/core';

const userId = '123';
const messageGroup = 'autoGroup';

const usersEndpoint = '/users';
const messagesEndPoint = '/notifications/fssitemessages';

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

describe('OccInboxAdapter', () => {
  let adapter: OccInboxAdapter;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, HttpClientTestingModule],
      providers: [
        OccInboxAdapter,
        { provide: OccConfig, useValue: MockOccModuleConfig },
      ],
    });

    adapter = TestBed.get(OccInboxAdapter);
    httpMock = TestBed.get(HttpTestingController);
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
        return (
          req.url ===
            usersEndpoint +
              `/${userId}` +
              messagesEndPoint +
              `?fields=FULL&messagegroup=${messageGroup}` &&
          req.method === 'GET'
        );
      }, `GET method and url`);
    }));
  });
});
