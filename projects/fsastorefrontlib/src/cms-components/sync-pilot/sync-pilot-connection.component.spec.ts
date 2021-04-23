import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {
  I18nTestingModule,
  UserService,
  WindowRef,
  CmsService,
} from '@spartacus/core';
import { of } from 'rxjs';
import { SyncPilotConnectionComponent } from './sync-pilot-connection.component';

const componentData: any = {
  uid: 'TestSyncPilotComponent',
  url: 'testUrl',
  channel: 'testChannel',
  action: 'join',
};

const mockUser = {
  uid: 'test@email.com',
  name: 'testName',
};

class MockCmsService {
  getComponentData() {
    return of(componentData);
  }
}

class MockUserService {
  get() {
    return of(mockUser);
  }
}

describe('SyncPilotConnectionComponent', () => {
  let component: SyncPilotConnectionComponent;
  let fixture: ComponentFixture<SyncPilotConnectionComponent>;
  let mockCmsService: CmsService;
  let mockUserService: UserService;
  let winRef: WindowRef;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SyncPilotConnectionComponent],
      imports: [I18nTestingModule],
      providers: [
        {
          provide: CmsService,
          useClass: MockCmsService,
        },
        {
          provide: UserService,
          useClass: MockUserService,
        },
      ],
    }).compileComponents();
    mockUserService = TestBed.inject(UserService);
    mockCmsService = TestBed.inject(CmsService);
    winRef = TestBed.inject(WindowRef);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SyncPilotConnectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should establish connection with sync pilot', () => {
    spyOn(winRef.nativeWindow, 'open');
    component.establishConnection('testUrl', 'testChannel', 'join');
    expect(window.open).toHaveBeenCalled();
  });

  it('should not establish connection with sync pilot', () => {
    spyOn(mockCmsService, 'getComponentData').and.returnValue(of({}));
    spyOn(winRef.nativeWindow, 'open');
    expect(window.open).not.toHaveBeenCalled();
  });
});
