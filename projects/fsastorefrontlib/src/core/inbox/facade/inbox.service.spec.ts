import { inject, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { InboxConnector } from '../connectors/inbox.connector';
import { InboxDataService, InboxTab } from '../services/inbox-data.service';
import { reducerProvider } from '../../my-account/store/reducers/index';
import { InboxService } from './inbox.service';

const userId = 'testUser';
const messageGroup = 'testGroup';
const messageTitle = 'testTitle';
const messageUid = '00001';
const isMessageRead = true;

describe('InboxServiceTest', () => {
  let service: InboxService;
  let inboxData: InboxDataServiceStub;
  let inboxConnector: MockInboxConnector;

  class InboxDataServiceStub {
    userId = userId;
  }

  class MockInboxConnector {
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
    inboxConnector = new MockInboxConnector();
    TestBed.configureTestingModule({
      imports: [],
      providers: [
        InboxService,
        reducerProvider,
        { provide: InboxDataService, useClass: InboxDataServiceStub },
        { provide: InboxConnector, useValue: inboxConnector },
      ],
    });

    service = TestBed.inject(InboxService);
    inboxData = TestBed.inject(InboxDataService);
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
    let messagesResponse;
    service
      .setMessagesState([messageUid], readStatus)
      .subscribe(messages => {
        messagesResponse = messages;
      })
      .unsubscribe();
    expect(messagesResponse).toEqual({
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

  it('test set unread message state', () => {
    service.setUnreadMessageState(isMessageRead);
    let readMessage: boolean;
    service.unreadMessagesState$
      .subscribe(isRead => {
        readMessage = isRead;
      })
      .unsubscribe();
    expect(readMessage).toEqual(true);
  });
});
