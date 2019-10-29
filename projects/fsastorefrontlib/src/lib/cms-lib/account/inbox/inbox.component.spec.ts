import {
  CmsService,
  OccConfig,
  I18nTestingModule,
  CmsComponent,
} from '@spartacus/core';
import { CmsComponentData } from '@spartacus/storefront';
import { Observable, of } from 'rxjs';
import { mergeMap, map } from 'rxjs/operators';
import {
  CmsInboxComponent,
  CmsInboxTabComponent,
} from '../../../occ-models/cms-component.models';
import { InboxService } from '../../../my-account/assets/services/inbox.service';
import { InboxComponent } from './inbox.component';
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { InboxTab } from '../../../my-account/assets/services/inbox-data.service';
import { NgbTabsetModule } from '@ng-bootstrap/ng-bootstrap';
import { DebugElement } from '@angular/core';

const mockedInitialTabComponent: CmsInboxTabComponent = {
  title: 'testTab1',
  messageGroup: 'TestGeneralMessageGroup',
};

const mockedCMSInboxTab: InboxTab = {
  title: 'testTab1',
  messageGroup: 'TestGeneralMessageGroup',
};

class MockCmsService {
  getComponentData(testTab1: string): Observable<CmsInboxTabComponent>[] {
    return [of(mockedInitialTabComponent)];
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
      declarations: [InboxComponent],
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

  // beforeEach(async(() => {
  //   mockInboxService = new MockInboxService();
  //   TestBed.configureTestingModule({
  //     imports: [I18nTestingModule],
  //     providers: [
  //       { provide: InboxService, useClass: MockInboxService },
  //       { provide: CmsService, useValue: MockCmsService },
  //       { provide: OccConfig, useValue: MockOccModuleConfig },
  //     ],
  //     declarations: [InboxComponent],
  //   }).compileComponents();
  // }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InboxComponent);
    inboxComponent = fixture.componentInstance;
    el = fixture.debugElement;
  });

  it('should create', () => {
    expect(inboxComponent).toBeTruthy();
  });
});
