import { ComponentFixture, TestBed } from '@angular/core/testing';
import { I18nTestingModule } from '@spartacus/core';
import { ModalService } from '@spartacus/storefront';
import { AgentSearchService } from '../../core/agent/facade/agent-search.service';

import { SyncPilotDialogComponent } from './sync-pilot-dialog.component';

class MockModalService {
  dismissActiveModal(): void {}
}

class MockAgentSearchService {
  setCancelledSyncPilotAgent() {}
}

describe('SyncPilotDialogComponent', () => {
  let component: SyncPilotDialogComponent;
  let fixture: ComponentFixture<SyncPilotDialogComponent>;
  let modalService: ModalService;
  let agentSearchService: AgentSearchService;

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
          provide: AgentSearchService,
          useClass: MockAgentSearchService,
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SyncPilotDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    modalService = TestBed.inject(ModalService);
    agentSearchService = TestBed.inject(AgentSearchService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should dismiss modal', () => {
    spyOn(modalService, 'dismissActiveModal').and.callThrough();
    spyOn(agentSearchService, 'setCancelledSyncPilotAgent').and.callThrough();
    component.dismissModal('Cross click');
    expect(modalService.dismissActiveModal).toHaveBeenCalled();
    expect(agentSearchService.setCancelledSyncPilotAgent).toHaveBeenCalled();
  });
});
