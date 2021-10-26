import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ConfigModule,
  CmsConfig,
  I18nModule,
  UrlModule,
} from '@spartacus/core';
import { SyncPilotConnectionComponent } from './sync-pilot-connection.component';
import { Service } from '@syncpilot/bpool-guest-lib';

@NgModule({
  imports: [
    CommonModule,
    I18nModule,
    UrlModule,
    ConfigModule.withConfig(<CmsConfig>{
      cmsComponents: {
        CMSConnectionComponent: {
          component: SyncPilotConnectionComponent,
        },
      },
    }),
  ],
  declarations: [SyncPilotConnectionComponent],
  exports: [SyncPilotConnectionComponent],
  entryComponents: [SyncPilotConnectionComponent],
  providers: [Service],
})
export class SyncPilotModule {}
