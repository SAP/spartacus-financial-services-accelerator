import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import {
  CmsConfig,
  I18nModule,
  provideDefaultConfig,
  UrlModule,
} from '@spartacus/core';
import { DashboardLinkComponent } from './dashboard-link.component';
import { PageSlotModule } from '@spartacus/storefront';
import { LoginModule } from '@spartacus/user/account/components';

@NgModule({
  imports: [
    CommonModule,
    UrlModule,
    RouterModule,
    I18nModule,
    PageSlotModule,
    LoginModule,
  ],
  providers: [
    provideDefaultConfig(<CmsConfig>{
      cmsComponents: {
        DashboardLinkComponent: {
          component: DashboardLinkComponent,
        },
      },
    }),
  ],
  declarations: [DashboardLinkComponent],
  exports: [DashboardLinkComponent],
})
export class DashboardLinkModule {}
