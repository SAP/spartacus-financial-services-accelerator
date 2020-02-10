import { DebugElement, Component, Input } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { InboxService } from '../../../../../core/my-account/services/inbox/inbox.service';
import { InboxMessagesComponent } from './inbox-messages.component';
import { I18nTestingModule } from '@spartacus/core';

class MockInboxService {}

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
  let inboxMessagesComponent: InboxMessagesComponent;
  let mockInboxService: MockInboxService;
  let fixture: ComponentFixture<InboxMessagesComponent>;
  let el: DebugElement;

  beforeEach(async(() => {
    mockInboxService = new MockInboxService();

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
    el = fixture.debugElement;
  });

  it('should create', () => {
    expect(inboxMessagesComponent).toBeTruthy();
  });
});
