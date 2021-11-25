import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ConfigModule,
  CmsConfig,
  I18nModule,
  UrlModule,
} from '@spartacus/core';
import { Service } from '@syncpilot/bpool-guest-lib';
import { SyncPilotDialogModule } from '../../sync-pilot-dialog/sync-pilot-dialog.module';
import { SyncPilotCmsComponent } from './sync-pilot-cms.component';

@NgModule({
  imports: [
    CommonModule,
    I18nModule,
    UrlModule,
    SyncPilotDialogModule,
    ConfigModule.withConfig(<CmsConfig>{
      cmsComponents: {
        CMSConnectionComponent: {
          component: SyncPilotCmsComponent,
        },
      },
    }),
  ],
  declarations: [SyncPilotCmsComponent],
  exports: [SyncPilotCmsComponent],
  entryComponents: [SyncPilotCmsComponent],
  providers: [Service],
})
export class SyncPilotCmsModule {}
