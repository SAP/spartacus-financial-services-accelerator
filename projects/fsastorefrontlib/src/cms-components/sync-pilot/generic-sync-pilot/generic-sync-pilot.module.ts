import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { I18nModule, UrlModule } from '@spartacus/core';
import { Service } from '@syncpilot/bpool-guest-lib';
import { GenericSyncPilotComponent } from './generic-sync-pilot.component';
import { SyncPilotDialogModule } from '../../sync-pilot-dialog/sync-pilot-dialog.module';
import { IconModule } from '@spartacus/storefront';

@NgModule({
  imports: [
    CommonModule,
    I18nModule,
    UrlModule,
    SyncPilotDialogModule,
    IconModule,
  ],
  declarations: [GenericSyncPilotComponent],
  exports: [GenericSyncPilotComponent],
  providers: [Service],
})
export class GenericSyncPilotModule {}
