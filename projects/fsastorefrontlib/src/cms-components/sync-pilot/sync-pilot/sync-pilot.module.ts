import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { I18nModule, UrlModule } from '@spartacus/core';
import { Service } from '@syncpilot/bpool-guest-lib';
import { FSSyncPilotComponent } from './sync-pilot.component';
import { SyncPilotDialogModule } from '../../sync-pilot-dialog/sync-pilot-dialog.module';

@NgModule({
  imports: [CommonModule, I18nModule, UrlModule, SyncPilotDialogModule],
  declarations: [FSSyncPilotComponent],
  exports: [FSSyncPilotComponent],
  entryComponents: [FSSyncPilotComponent],
  providers: [Service],
})
export class FSSyncPilotModule {}
