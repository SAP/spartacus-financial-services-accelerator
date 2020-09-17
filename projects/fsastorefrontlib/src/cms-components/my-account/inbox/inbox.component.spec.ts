import { Component, DebugElement, Input } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import {
  AuthRedirectService,
  AuthService,
  CmsService,
  I18nTestingModule,
  UserToken,
} from '@spartacus/core';
import { CmsComponentData } from '@spartacus/storefront';
import { Observable, of } from 'rxjs';
import { InboxService } from '../../../core/my-account/facade/inbox.service';
import {
  InboxDataService,
  InboxTab,
} from '../../../core/my-account/services/inbox-data.service';
import {
  CmsInboxComponent,
  CmsInboxTabComponent,
} from './../../../occ/occ-models/cms-component.models';
import { InboxComponent } from './inbox.component';

import createSpy = jasmine.createSpy;

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

const mockedCMSInboxTab: InboxTab = {
  title: 'testTab1',
  messageGroup: 'TestGeneralMessageGroup',
};

class MockAuthService {
  getUserToken(): Observable<UserToken> {
    return of({ access_token: 'test' } as UserToken);
  }
}

class MockCmsService {
  getComponentData(): Observable<CmsInboxTabComponent>[] {
    return [of(mockedCMSInboxTab)];
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
  let mockInboxService: MockInboxService;
  let mockInboxDataService: MockInboxDataService;
  let mockCmsService: MockCmsService;
  let fixture: ComponentFixture<InboxComponent>;
  let el: DebugElement;

  const componentData: CmsInboxComponent = {
    uid: 'TestCmsInboxComponent',
    typeCode: 'CMSInboxComponent',
    tabComponents: 'testTab1',
  };

  const MockCmsComponentData = <CmsComponentData<CmsInboxComponent>>{
    data$: of(componentData),
    uid: 'test',
  };

  beforeEach(async(() => {
    mockInboxService = new MockInboxService();
    mockCmsService = new MockCmsService();
    mockInboxDataService = new MockInboxDataService();

    TestBed.configureTestingModule({
      imports: [NgbNavModule, I18nTestingModule],
      declarations: [InboxComponent, InboxTabComponent, InboxMessagesComponent],
      providers: [
        {
          provide: CmsComponentData,
          useValue: MockCmsComponentData,
        },
        {
          provide: InboxService,
          useValue: mockInboxService,
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
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InboxComponent);
    inboxComponent = fixture.componentInstance;
    el = fixture.debugElement;
  });

  it('should create', () => {
    expect(inboxComponent).toBeTruthy();
  });
});
