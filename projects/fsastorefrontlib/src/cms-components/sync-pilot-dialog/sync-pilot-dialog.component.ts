import { Component } from '@angular/core';
import { ModalService } from '@spartacus/storefront';
import { AgentSearchService } from '../../core/agent/facade/agent-search.service';

@Component({
  selector: 'cx-fs-sync-pilot-dialog',
  templateUrl: './sync-pilot-dialog.component.html',
})
export class SyncPilotDialogComponent {
  constructor(
    protected modalService: ModalService,
    protected agentService: AgentSearchService
  ) {}

  dismissModal(reason?: any): void {
    this.agentService.setCancelledSyncPilotAgent(true);
    this.modalService.dismissActiveModal(reason);
  }
}
