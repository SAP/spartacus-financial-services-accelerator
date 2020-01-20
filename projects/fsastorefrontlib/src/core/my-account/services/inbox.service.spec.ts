import { TestBed, inject } from '@angular/core/testing';
import { Type } from '@angular/core';
import { reducerProvider } from '../store/reducers/index';
import { InboxService } from './inbox.service';
import { InboxDataService } from './inbox-data.service';
import { OccInboxAdapter } from './../../../occ/services/inbox/occ-inbox.adapter';
import { of } from 'rxjs';
import { InboxTab } from 'fsastorefrontlib/core/my-account/services/inbox-data.service';

const userId = 'testUser';
const messageGroup = 'testGroup';
const messageTitle = 'testTitle';
const messageUid = '00001';

describe('InboxServiceTest', () => {
  let service: InboxService;
  let inboxData: InboxDataServiceStub;
  let inboxAdapter: MockInboxAdapter;

  class InboxDataServiceStub {
    userId = userId;
  }

  class MockInboxAdapter {
    getSiteMessagesForUserAndGroup() {
      return of({
        messages: [],
      });
    }
    setMessagesState(userid, messageUids, read: boolean) {
      return of({
        messages: [
          {
            uid: messageUids,
            read: read,
          },
        ],
      });
    }
  }

  beforeEach(() => {
    inboxAdapter = new MockInboxAdapter();
    TestBed.configureTestingModule({
      imports: [],
      providers: [
        InboxService,
        reducerProvider,
        { provide: InboxDataService, useClass: InboxDataServiceStub },
        { provide: OccInboxAdapter, useValue: inboxAdapter },
      ],
    });

    service = TestBed.get(InboxService as Type<InboxService>);
    inboxData = TestBed.get(InboxDataService as Type<InboxDataService>);
  });

  it('should InboxService is injected', inject(
    [InboxService],
    (inboxService: InboxService) => {
      expect(inboxService).toBeTruthy();
    }
  ));

  it('test get messages', () => {
    let messagesResponse;
    service
      .getMessages(messageGroup, {})
      .subscribe(messages => {
        messagesResponse = messages;
      })
      .unsubscribe();
    expect(messagesResponse).toEqual({
      messages: [],
    });
  });

  it('test set message state to read', () => {
    const readStatus = true;
    let readResp;
    service
      .setMessagesState([messageUid], readStatus)
      .subscribe(messages => {
        readResp = messages;
      })
      .unsubscribe();
    expect(readResp).toEqual({
      messages: [
        {
          uid: [messageUid],
          read: readStatus,
        },
      ],
    });
  });

  it('test set title and message group', () => {
    service.setTitleAndMessageGroup(messageGroup, messageTitle);
    let inboxTab: InboxTab;
    service.messageGroupAndTitleSource
      .subscribe(result => {
        inboxTab = result;
      })
      .unsubscribe();
    expect(inboxTab).toEqual({
      messageGroup: messageGroup,
      title: messageTitle,
    });
  });
});
