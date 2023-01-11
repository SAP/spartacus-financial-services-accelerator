import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ConfigModule,
  CmsConfig,
  I18nModule,
  UrlModule,
  provideDefaultConfig,
} from '@spartacus/core';
import { Service } from '@syncpilot/bpool-guest-lib';
import { SyncPilotDialogModule } from '../../sync-pilot-dialog/sync-pilot-dialog.module';
import { CmsSyncPilotComponent } from './cms-sync-pilot.component';
import { defaultCmsSyncPilotDialogLayoutConfig } from '../../sync-pilot-dialog/default-cms-sync-pilot-dialog-layout.config';

@NgModule({
  imports: [
    CommonModule,
    I18nModule,
    UrlModule,
    SyncPilotDialogModule,
    ConfigModule.withConfig(<CmsConfig>{
      cmsComponents: {
        CMSConnectionComponent: {
          component: CmsSyncPilotComponent,
        },
      },
    }),
  ],
  declarations: [CmsSyncPilotComponent],
  exports: [CmsSyncPilotComponent],
  providers: [
    Service,
    provideDefaultConfig(defaultCmsSyncPilotDialogLayoutConfig),
  ],
})
export class CmsSyncPilotModule {}
