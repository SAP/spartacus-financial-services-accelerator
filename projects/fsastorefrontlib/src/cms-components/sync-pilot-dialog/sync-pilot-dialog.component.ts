import { Component } from '@angular/core';
import { ModalService } from '@spartacus/storefront';
import { Service } from '@syncpilot/bpool-guest-lib';

@Component({
  selector: 'cx-fs-sync-pilot-dialog',
  templateUrl: './sync-pilot-dialog.component.html',
})
export class SyncPilotDialogComponent {
  constructor(
    protected modalService: ModalService,
    protected syncPilotService: Service
  ) {}

  dismissModal(reason?: any): void {
    this.syncPilotService.abort();
    this.modalService.dismissActiveModal(reason);
  }
}
