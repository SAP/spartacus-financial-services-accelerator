import { Component, Input } from '@angular/core';
import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { I18nTestingModule } from '@spartacus/core';
import { BehaviorSubject, of } from 'rxjs';
import { InboxService } from '../../../../core/my-account/facade/inbox.service';
import { InboxTab } from '../../../../core/my-account/services/inbox-data.service';
import { InboxMessagesComponent } from './inbox-messages.component';

const mockInboxTab: InboxTab = {
  title: 'title',
  messageGroup: 'group',
};

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
  unreadMessagesState = new BehaviorSubject<any>(null);
  setUnreadMessageState() {}

  getMessages() {
    return of(mockMessages);
  }

  setTitleAndMessageGroup() {}

  setMessagesState() {
    return of(true);
  }
}

@Component({
  template: '',
  selector: 'cx-fs-inbox-tab',
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

  let component: InboxMessagesComponent;
  let mockInboxService: MockInboxService;
  let fixture: ComponentFixture<InboxMessagesComponent>;

  beforeEach(
    waitForAsync(() => {
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
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(InboxMessagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should clear search data', () => {
    component.initialGroup = 'initial-group';
    expect(component.searchConfig.currentPage).toEqual(1);
  });

  it('should sort messages', () => {
    component.sortMessages('desc', 'date');
  });

  it('should change page and reset main checkbox', () => {
    component.mainCheckboxChecked = true;
    component.pageChange(2);
    expect(component.mainCheckboxChecked).toEqual(false);
  });

  it('should read message', () => {
    component.loadedMessages = loadedMessages;
    component.readMessage({
      uid: 'firstMessage',
    });
    expect(component.loadedMessages[0].read).toEqual(true);
  });

  it('should check message', () => {
    component.loadedMessages = loadedMessages;
    component.checkMessage('firstMessage', true);
    expect(component.loadedMessages[0].checked).toEqual(true);
  });

  it('should uncheck message with main checkbox', () => {
    component.loadedMessages = loadedMessages;
    component.mainCheckboxChecked = true;
    component.checkMessage('secondMessage', false);
    expect(component.loadedMessages[1].checked).toEqual(false);
    expect(component.mainCheckboxChecked).toEqual(false);
  });

  it('should check all messages with main checkbox', () => {
    component.loadedMessages = loadedMessages;
    component.checkAllCheckboxes(true);
    expect(component.loadedMessages[0].checked).toEqual(true);
    expect(component.loadedMessages[1].checked).toEqual(true);
    expect(component.mainCheckboxChecked).toEqual(true);
  });

  it('should uncheck all messages with main checkbox', () => {
    component.loadedMessages = loadedMessages;
    component.mainCheckboxChecked = true;
    component.checkAllCheckboxes(false);
    expect(component.loadedMessages[0].checked).toEqual(false);
    expect(component.loadedMessages[1].checked).toEqual(false);
    expect(component.mainCheckboxChecked).toEqual(false);
  });

  it('should change selected messages', () => {
    component.loadedMessages = loadedMessages;
    component.changeSelectedMessages(true);
    expect(component.loadedMessages[1].read).toEqual(true);
  });

  it('should not change messages in case nothing is checked', () => {
    loadedMessages[1].checked = false;
    component.loadedMessages = loadedMessages;
    component.changeSelectedMessages(true);
    expect(component.loadedMessages[0].read).toEqual(false);
    expect(component.loadedMessages[1].read).toEqual(false);
  });
});
