import { Component, DebugElement, Input } from '@angular/core';
import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import {
  AuthRedirectService,
  AuthService,
  CmsService,
  I18nTestingModule,
} from '@spartacus/core';
import { CmsComponentData } from '@spartacus/storefront';
import { Observable, of } from 'rxjs';
import { InboxService } from '../../core/inbox/facade/inbox.service';
import {
  InboxDataService,
  InboxTab,
} from '../../core/inbox/services/inbox-data.service';
import { CmsInboxTabComponent } from '../../occ/occ-models/cms-component.models';
import { InboxComponent } from './inbox.component';

import createSpy = jasmine.createSpy;

const mockedCMSInboxTab = {
  title: 'testTab1',
  messageGroup: 'TestGeneralMessageGroup',
};
const mockTabComponents = 'TestGeneralMessageGroup GeneralInboxTabComponent';
const inboxTabComponents = {
  tabComponents: mockTabComponents,
};
const mockCmsComponentData = {
  data$: of(inboxTabComponents),
  uid: 'test',
};

@Component({
  template: '',
  selector: 'cx-fs-inbox-tab',
})
class InboxTabComponent {
  @Input() currentTab;
  @Input() tabId;
}

@Component({
  template: '',
  selector: 'cx-fs-inbox-messages',
})
class InboxMessagesComponent {
  @Input() initialGroup;
  @Input() mobileTabs: string[];
  @Input() mobileInitialTab: string;
}
class MockAuthService {
  isUserLoggedIn(): Observable<boolean> {
    return of(true);
  }
}

class MockCmsService {
  getComponentData(): Observable<CmsInboxTabComponent> {
    return of(mockedCMSInboxTab);
  }
}

class MockRedirectAfterAuthService {
  redirect = createSpy('AuthRedirectService.redirect');
}

class MockInboxService {
  activeMessageGroupAndTitle: Observable<InboxTab> = of(mockedCMSInboxTab);
}

class MockInboxDataService {
  userId = 'current';
}

describe('InboxComponent', () => {
  let inboxComponent: InboxComponent;
  let mockInboxService: InboxService;
  let mockInboxDataService: MockInboxDataService;
  let mockCmsService: MockCmsService;
  let fixture: ComponentFixture<InboxComponent>;
  let el: DebugElement;

  beforeEach(
    waitForAsync(() => {
      mockCmsService = new MockCmsService();
      mockInboxDataService = new MockInboxDataService();

      TestBed.configureTestingModule({
        imports: [NgbNavModule, I18nTestingModule],
        declarations: [
          InboxComponent,
          InboxTabComponent,
          InboxMessagesComponent,
        ],
        providers: [
          {
            provide: CmsComponentData,
            useValue: mockCmsComponentData,
          },
          {
            provide: InboxService,
            useClass: MockInboxService,
          },
          {
            provide: InboxDataService,
            useValue: mockInboxDataService,
          },
          {
            provide: CmsService,
            useValue: mockCmsService,
          },
          { provide: AuthService, useClass: MockAuthService },
          {
            provide: AuthRedirectService,
            useClass: MockRedirectAfterAuthService,
          },
        ],
      }).compileComponents();
      mockInboxService = TestBed.inject(InboxService);
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(InboxComponent);
    inboxComponent = fixture.componentInstance;
    el = fixture.debugElement;
  });

  it('should create', () => {
    expect(inboxComponent).toBeTruthy();
  });

  it('should initialize inbox tabs', () => {
    inboxComponent.ngOnInit();
    expect(inboxComponent.initialGroupName).toEqual('TestGeneralMessageGroup');
  });

  it('should not initialize inbox tabs when tab components do not exist', () => {
    mockCmsComponentData.data$ = of(null);
    inboxComponent.ngOnInit();
    expect(inboxComponent.tabs).toEqual([]);
  });
});
