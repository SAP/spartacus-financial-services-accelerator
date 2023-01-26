import { ComponentFixture, TestBed } from '@angular/core/testing';
import { I18nTestingModule } from '@spartacus/core';
import { LaunchDialogService } from '@spartacus/storefront';
import { Service } from '@syncpilot/bpool-guest-lib';
import { of } from 'rxjs';

import { SyncPilotDialogComponent } from './sync-pilot-dialog.component';

class MockLaunchDialogService {
  closeDialog(reason: String): void {}
}

const mockGuestEndpoint = {
  state: 'accepted',
  targetChannelAddress: 'https//livecontract.com',
  groupId: 1,
  ownerId: 1,
};

class MockService {
  onRedirect = of(mockGuestEndpoint);
  setConfig() {}
  connect() {}
  enterQueue() {}
  abort() {}
}

describe('SyncPilotDialogComponent', () => {
  let component: SyncPilotDialogComponent;
  let fixture: ComponentFixture<SyncPilotDialogComponent>;
  let launchDialogService: LaunchDialogService;
  let service: Service;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SyncPilotDialogComponent],
      imports: [I18nTestingModule],
      providers: [
        {
          provide: LaunchDialogService,
          useClass: MockLaunchDialogService,
        },
        {
          provide: Service,
          useClass: MockService,
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SyncPilotDialogComponent);
    service = TestBed.inject(Service);
    component = fixture.componentInstance;
    fixture.detectChanges();
    launchDialogService = TestBed.inject(LaunchDialogService);

    spyOn(service, 'abort').and.stub();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should dismiss modal', () => {
    spyOn(launchDialogService, 'closeDialog').and.callThrough();
    component.dismissModal('Cross click');
    expect(launchDialogService.closeDialog).toHaveBeenCalled();
    expect(service.abort).toHaveBeenCalled();
  });
});
