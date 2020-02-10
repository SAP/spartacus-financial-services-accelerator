import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { Type } from '@angular/core';
import { InboxAdapter } from './inbox.adapter';
import { InboxConnector } from './inbox.connector';
import createSpy = jasmine.createSpy;

class MockInboxAdapter implements InboxAdapter {
  getSiteMessagesForUserAndGroup = createSpy(
    'InboxAdapter.getSiteMessagesForUserAndGroup'
  ).and.callFake((userId, messageGroup, searchConfig) =>
    of('getSiteMessagesForUserAndGroup' + userId + messageGroup + searchConfig)
  );
  setMessagesState = createSpy('InboxAdapter.setMessagesState').and.callFake(
    (userId, messagesUidList, readStatus) =>
      of('setMessagesState' + userId + messagesUidList + readStatus)
  );
}
const user = 'user';

describe('InboxConnector', () => {
  let inboxConnector: InboxConnector;
  let inboxAdapter: InboxAdapter;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [{ provide: InboxAdapter, useClass: MockInboxAdapter }],
    });

    inboxConnector = TestBed.get(InboxConnector as Type<InboxConnector>);
    inboxAdapter = TestBed.get(InboxAdapter as Type<InboxAdapter>);
  });

  it('should be created', () => {
    expect(inboxConnector).toBeTruthy();
  });
  it('should call adapter for getSiteMessagesForUserAndGroup', () => {
    inboxConnector.getSiteMessagesForUserAndGroup(user, 'messageGroup', {});
    expect(inboxAdapter.getSiteMessagesForUserAndGroup).toHaveBeenCalledWith(
      user,
      'messageGroup',
      {}
    );
  });
  it('should call adapter for setMessagesState', () => {
    inboxConnector.setMessagesState(user, [], true);
    expect(inboxAdapter.setMessagesState).toHaveBeenCalledWith(user, [], true);
  });
});
