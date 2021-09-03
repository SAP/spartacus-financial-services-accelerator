import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { InboxAdapter } from './inbox.adapter';
import { InboxConnector } from './inbox.connector';
import createSpy = jasmine.createSpy;

class MockInboxAdapter implements InboxAdapter {
  getSiteMessagesForUserAndGroup = createSpy(
    'InboxAdapter.getSiteMessagesForUserAndGroup'
  ).and.callFake((userId, msgGroup, searchConfig, read) =>
    of(
      'getSiteMessagesForUserAndGroup' + userId + msgGroup + searchConfig + read
    )
  );
  setMessagesState = createSpy(
    'InboxAdapter.setMessagesState'
  ).and.callFake((userId, messagesUidList, readStatus) =>
    of('setMessagesState' + userId + messagesUidList + readStatus)
  );
}
const user = 'user';
const messageGroup = 'messageGroupId';

describe('InboxConnector', () => {
  let inboxConnector: InboxConnector;
  let inboxAdapter: InboxAdapter;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [{ provide: InboxAdapter, useClass: MockInboxAdapter }],
    });

    inboxConnector = TestBed.inject(InboxConnector);
    inboxAdapter = TestBed.inject(InboxAdapter);
  });

  it('should be created', () => {
    expect(inboxConnector).toBeTruthy();
  });

  it('should call adapter for getSiteMessagesForUserAndGroup', () => {
    inboxConnector.getSiteMessagesForUserAndGroup(user, messageGroup, {}, null);
    expect(inboxAdapter.getSiteMessagesForUserAndGroup).toHaveBeenCalledWith(
      user,
      messageGroup,
      {},
      null
    );
  });

  it('should call adapter for setMessagesState', () => {
    inboxConnector.setMessagesState(user, [], true);
    expect(inboxAdapter.setMessagesState).toHaveBeenCalledWith(user, [], true);
  });
});
