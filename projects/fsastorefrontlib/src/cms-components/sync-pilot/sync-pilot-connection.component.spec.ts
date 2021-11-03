import { ComponentFixture, TestBed } from '@angular/core/testing';
import { I18nTestingModule, WindowRef } from '@spartacus/core';
import { of } from 'rxjs';
import { SyncPilotConnectionComponent } from './sync-pilot-connection.component';
import { UserAccountFacade } from '@spartacus/user/account/root';
import { Service } from '@syncpilot/bpool-guest-lib';
import { ModalService } from '@spartacus/storefront';
import { AgentSearchService } from '../../core/agent/facade/agent-search.service';

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

describe('SyncPilotConnectionComponent', () => {
  let component: SyncPilotConnectionComponent;
  let fixture: ComponentFixture<SyncPilotConnectionComponent>;
  let mockUserAccountFacade: UserAccountFacade;
  let service: Service;
  let modalService: ModalService;
  let agentSearchService: AgentSearchService;
  let winRef: WindowRef;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SyncPilotConnectionComponent],
      imports: [I18nTestingModule],
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
      ],
    }).compileComponents();
    mockUserAccountFacade = TestBed.inject(UserAccountFacade);
    service = TestBed.inject(Service);
    modalService = TestBed.inject(ModalService);
    agentSearchService = TestBed.inject(AgentSearchService);
    winRef = TestBed.inject(WindowRef);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SyncPilotConnectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    spyOn(service, 'connect').and.stub();
    spyOn(winRef.nativeWindow, 'open');
    component.ngOnInit();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
