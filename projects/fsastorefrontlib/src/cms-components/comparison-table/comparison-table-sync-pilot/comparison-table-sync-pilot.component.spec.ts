import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CmsService, MockTranslatePipe, WindowRef } from '@spartacus/core';
import { CmsComponentData, ModalService } from '@spartacus/storefront';
import { UserAccountFacade } from '@spartacus/user/account/root';
import { Service } from '@syncpilot/bpool-guest-lib';
import { of } from 'rxjs';
import { AgentSearchService } from '../../../core/agent/facade/agent-search.service';
import { CMSConnectionComponent } from '../../../occ/occ-models/cms-component.models';

import { ComparisonTableSyncPilotComponent } from './comparison-table-sync-pilot.component';

const mockUser = {
  uid: 'test@email.com',
  firstName: 'testFirstName',
  name: 'testName',
  titleCode: 'mr',
};
const mockGuestEndpoint = {
  state: 'accepted',
  targetChannelAddress: 'https//livecontract.com',
  groupId: 1,
  ownerId: 1,
};

class MockUserAccountFacade {
  get() {
    return of(mockUser);
  }
}

class MockModalService {
  open() {}
  closeActiveModal() {}
}

class MockService {
  onRedirect = of(mockGuestEndpoint);
  setConfig() {}
  connect() {}
  enterQueue() {}
  abort() {}
}

class MockAgentSearchService {
  cancelledSyncPilotAgent$ = of(true);
}

const CMScomponentData: CMSConnectionComponent = {
  stompUrl: 'htttttp://stomp-test-url.com',
  url: 'htttttp://test-url.com',
  name: 'Test Root Component',
  uid: 'testUid',
};
const MockCmsService = {
  getComponentData: () => of(CMScomponentData),
};

class MockCmsComponentData {
  data$ = of(CMScomponentData);
}

describe('ComparisonTableSyncPilotComponent', () => {
  let component: ComparisonTableSyncPilotComponent;
  let fixture: ComponentFixture<ComparisonTableSyncPilotComponent>;
  let mockUserAccountFacade: UserAccountFacade;
  let service: Service;
  let modalService: ModalService;
  let agentSearchService: AgentSearchService;
  let componentData: CmsComponentData<CMSConnectionComponent>;
  let winRef: WindowRef;
  let el: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ComparisonTableSyncPilotComponent, MockTranslatePipe],
      providers: [
        {
          provide: UserAccountFacade,
          useClass: MockUserAccountFacade,
        },
        {
          provide: Service,
          useClass: MockService,
        },
        {
          provide: ModalService,
          useClass: MockModalService,
        },
        {
          provide: AgentSearchService,
          useClass: MockAgentSearchService,
        },
        {
          provide: CmsService,
          useValue: MockCmsService,
        },
        {
          provide: CmsComponentData,
          useClass: MockCmsComponentData,
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ComparisonTableSyncPilotComponent);
    mockUserAccountFacade = TestBed.inject(UserAccountFacade);
    service = TestBed.inject(Service);
    modalService = TestBed.inject(ModalService);
    agentSearchService = TestBed.inject(AgentSearchService);
    winRef = TestBed.inject(WindowRef);
    componentData = TestBed.inject(CmsComponentData);
    el = fixture.debugElement;
    component = fixture.componentInstance;
    fixture.detectChanges();
    spyOn(service, 'connect').and.stub();
    spyOn(winRef.nativeWindow, 'open');
    component.ngOnInit();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should establish connection with sync pilot', () => {
    component.enterQueue();
    expect(service.connect).toHaveBeenCalled();
  });
});
