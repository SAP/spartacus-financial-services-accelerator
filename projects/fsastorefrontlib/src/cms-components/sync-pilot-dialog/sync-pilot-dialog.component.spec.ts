import { ComponentFixture, TestBed } from '@angular/core/testing';
import { I18nTestingModule } from '@spartacus/core';
import { ModalService } from '@spartacus/storefront';
import { Service } from '@syncpilot/bpool-guest-lib';
import { of } from 'rxjs';

import { SyncPilotDialogComponent } from './sync-pilot-dialog.component';

class MockModalService {
  dismissActiveModal(): void {}
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
  let modalService: ModalService;
  let service: Service;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SyncPilotDialogComponent],
      imports: [I18nTestingModule],
      providers: [
        {
          provide: ModalService,
          useClass: MockModalService,
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
    modalService = TestBed.inject(ModalService);

    spyOn(service, 'abort').and.stub();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should dismiss modal', () => {
    spyOn(modalService, 'dismissActiveModal').and.callThrough();
    component.dismissModal('Cross click');
    expect(modalService.dismissActiveModal).toHaveBeenCalled();
    expect(service.abort).toHaveBeenCalled();
  });
});
