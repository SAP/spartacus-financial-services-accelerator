import { Component, Input } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { InboxService } from '../../../../../core/my-account/services/inbox.service';
import { InboxMessagesComponent } from './inbox-messages.component';
import { I18nTestingModule } from '@spartacus/core';
import { of, BehaviorSubject } from 'rxjs';
import { InboxTab } from './../../../../../core/my-account/services/inbox-data.service';

const mockInboxTab: InboxTab = {
  title: 'title',
  messageGroup: 'group',
};

//move to method level
const mockMessages = {
  sorts: [
    {
      code: 'asc',
    },
  ],
  pagination: {
    page: 1,
  },
  messages: [
    {
      uid: 'testMsg1',
      subject: 'testSubject1',
      readDate: '21-01-2019',
    },
    {
      uid: 'testMsg2',
      subject: 'testSubject2',
    },
  ],
};

class MockInboxService {
  activeMessageGroupAndTitle = of(mockInboxTab);
  messagesSource = new BehaviorSubject<any>(null);

  getMessages(messageGroup, searchConfig) {
    return of(mockMessages);
  }

  setTitleAndMessageGroup(title, group) {}

  setMessagesState() {
    return of(true);
  }
}

@Component({
  template: '',
  selector: 'fsa-inbox-tab',
})
class InboxTabComponent {
  @Input() currentTab;
  @Input() tabId;
}

@Component({
  // tslint:disable
  selector: 'cx-pagination',
  template: '',
})
class MockPaginationComponent {
  @Input() pagination;
}

describe('InboxMessagesComponent', () => {
  let loadedMessages;

  let inboxMessagesComponent: InboxMessagesComponent;
  let mockInboxService: MockInboxService;
  let fixture: ComponentFixture<InboxMessagesComponent>;

  beforeEach(async(() => {
    mockInboxService = new MockInboxService();
    loadedMessages = [
      {
        uid: 'firstMessage',
        read: false,
        checked: false,
      },
      {
        uid: 'secondMessage',
        read: false,
        checked: true,
      },
    ];

    TestBed.configureTestingModule({
      imports: [I18nTestingModule],
      declarations: [
        InboxMessagesComponent,
        InboxTabComponent,
        MockPaginationComponent,
      ],
      providers: [
        {
          provide: InboxService,
          useValue: mockInboxService,
        },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InboxMessagesComponent);
    inboxMessagesComponent = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(inboxMessagesComponent).toBeTruthy();
  });

  it('should clear search data', () => {
    inboxMessagesComponent.initialGroup = 'initial-group';
    expect(inboxMessagesComponent.searchConfig.currentPage).toEqual(1);
  });

  it('should sort messages', () => {
    inboxMessagesComponent.sortMessages('desc', 'date');
  });

  it('should change page and reset main checkbox', () => {
    inboxMessagesComponent.mainCheckboxChecked = true;
    inboxMessagesComponent.pageChange(2);
    expect(inboxMessagesComponent.mainCheckboxChecked).toEqual(false);
    //check pagination too
  });

  it('should read message', () => {
    inboxMessagesComponent.loadedMessages = loadedMessages;
    inboxMessagesComponent.readMessage({
      uid: 'firstMessage',
    });
    expect(inboxMessagesComponent.loadedMessages[0].read).toEqual(true);
  });

  it('should check message', () => {
    inboxMessagesComponent.loadedMessages = loadedMessages;
    inboxMessagesComponent.checkMessage('firstMessage', true);
    expect(inboxMessagesComponent.loadedMessages[0].checked).toEqual(true);
  });

  it('should uncheck message with main checkbox', () => {
    inboxMessagesComponent.loadedMessages = loadedMessages;
    inboxMessagesComponent.mainCheckboxChecked = true;
    inboxMessagesComponent.checkMessage('secondMessage', false);
    expect(inboxMessagesComponent.loadedMessages[1].checked).toEqual(false);
    expect(inboxMessagesComponent.mainCheckboxChecked).toEqual(false);
  });

  it('should check all messages with main checkbox', () => {
    inboxMessagesComponent.loadedMessages = loadedMessages;
    inboxMessagesComponent.checkAllCheckboxes(true);
    expect(inboxMessagesComponent.loadedMessages[0].checked).toEqual(true);
    expect(inboxMessagesComponent.loadedMessages[1].checked).toEqual(true);
    expect(inboxMessagesComponent.mainCheckboxChecked).toEqual(true);
  });

  it('should uncheck all messages with main checkbox', () => {
    inboxMessagesComponent.loadedMessages = loadedMessages;
    inboxMessagesComponent.mainCheckboxChecked = true;
    inboxMessagesComponent.checkAllCheckboxes(false);
    expect(inboxMessagesComponent.loadedMessages[0].checked).toEqual(false);
    expect(inboxMessagesComponent.loadedMessages[1].checked).toEqual(false);
    expect(inboxMessagesComponent.mainCheckboxChecked).toEqual(false);
  });

  it('should change selected messages', () => {
    inboxMessagesComponent.loadedMessages = loadedMessages;
    inboxMessagesComponent.changeSelectedMessages(true);
    expect(inboxMessagesComponent.loadedMessages[1].read).toEqual(true);
  });

  it('should not change messages in case nothing is checked', () => {
    loadedMessages[1].checked = false;
    inboxMessagesComponent.loadedMessages = loadedMessages;
    inboxMessagesComponent.changeSelectedMessages(true);
    expect(inboxMessagesComponent.loadedMessages[0].read).toEqual(false);
    expect(inboxMessagesComponent.loadedMessages[1].read).toEqual(false);
  });

  it('should remove subscriptions and reset title and group', () => {
    inboxMessagesComponent.ngOnDestroy();
  });

  it('should destroy without subscriptions', () => {
    inboxMessagesComponent.subscription = null;
    inboxMessagesComponent.ngOnDestroy();
  });
});
