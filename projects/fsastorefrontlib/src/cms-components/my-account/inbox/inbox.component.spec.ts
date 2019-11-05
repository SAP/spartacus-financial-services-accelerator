import { CmsService, I18nTestingModule } from '@spartacus/core';
import { CmsComponentData } from '@spartacus/storefront';
import { Observable, of } from 'rxjs';
import {
  CmsInboxTabComponent,
  CmsInboxComponent,
} from 'fsastorefrontlib/lib/occ-models';
import { InboxService } from 'projects/fsastorefrontlib/src/core/my-account/services/inbox.service';
import { InboxTab } from '../../../core/my-account/services/inbox-data.service';
import { InboxComponent } from './inbox.component';
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { NgbTabsetModule } from '@ng-bootstrap/ng-bootstrap';
import { DebugElement, Input, Component } from '@angular/core';

@Component({
  template: '',
  selector: 'fsa-inbox-tab',
})
class InboxTabComponent {
  @Input() currentTab;
  @Input() tabId;
}

@Component({
  template: '',
  selector: 'fsa-messages-inbox',
})
class InboxMessagesComponent {
  @Input() initialGroup;
}

const mockedCMSInboxTab: InboxTab = {
  title: 'testTab1',
  messageGroup: 'TestGeneralMessageGroup',
};

class MockCmsService {
  getComponentData(): Observable<CmsInboxTabComponent>[] {
    return [of(mockedCMSInboxTab)];
  }
}

class MockInboxService {
  activeMessageGroupAndTitle: Observable<InboxTab> = of(mockedCMSInboxTab);
}

describe('InboxComponent', () => {
  let inboxComponent: InboxComponent;
  let mockInboxService: MockInboxService;
  let mockCmsService: MockCmsService;
  let fixture: ComponentFixture<InboxComponent>;
  let el: DebugElement;

  const componentData: CmsInboxComponent = {
    uid: 'TestMultiComparisonTabContainer',
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
    TestBed.configureTestingModule({
      imports: [NgbTabsetModule, I18nTestingModule],
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
          provide: CmsService,
          useValue: mockCmsService,
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
