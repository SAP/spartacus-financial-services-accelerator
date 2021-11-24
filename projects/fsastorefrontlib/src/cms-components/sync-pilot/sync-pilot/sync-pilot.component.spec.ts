import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CmsService, MockTranslatePipe, WindowRef } from '@spartacus/core';
import { CmsComponentData, ModalService } from '@spartacus/storefront';
import { UserAccountFacade } from '@spartacus/user/account/root';
import { Service } from '@syncpilot/bpool-guest-lib';
import { of } from 'rxjs';
import { CMSConnectionComponent } from '../../../occ/occ-models/cms-component.models';

import { FSSyncPilotComponent } from './sync-pilot.component';

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
  connect(): Promise<void> {
    return Promise.resolve();
  }
  enterQueue(): Promise<void> {
    return Promise.resolve();
  }
  abort() {}
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

describe('FSSyncPilotComponent', () => {
  let component: FSSyncPilotComponent;
  let fixture: ComponentFixture<FSSyncPilotComponent>;
  let mockUserAccountFacade: UserAccountFacade;
  let service: Service;
  let modalService: ModalService;
  let componentData: CmsComponentData<CMSConnectionComponent>;
  let winRef: WindowRef;
  let el: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FSSyncPilotComponent, MockTranslatePipe],
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
    fixture = TestBed.createComponent(FSSyncPilotComponent);
    mockUserAccountFacade = TestBed.inject(UserAccountFacade);
    service = TestBed.inject(Service);
    modalService = TestBed.inject(ModalService);
    winRef = TestBed.inject(WindowRef);
    componentData = TestBed.inject(CmsComponentData);
    el = fixture.debugElement;

    component = fixture.componentInstance;
    fixture.detectChanges();
    spyOn(service, 'connect').and.callThrough();
    spyOn(winRef.nativeWindow, 'open');
    component.ngOnInit();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should establish connection with sync pilot', () => {
    component.establishConnection(mockUser, CMScomponentData);
    expect(window.open).toHaveBeenCalled();
    expect(service.connect).toHaveBeenCalled();
  });
});
