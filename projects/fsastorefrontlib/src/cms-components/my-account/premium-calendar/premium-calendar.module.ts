import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import {
  CmsPageGuard,
  SpinnerModule,
  PageLayoutComponent,
  MediaModule,
} from '@spartacus/storefront';
import {
  AuthGuard,
  I18nModule,
  ConfigModule,
  CmsConfig,
  RoutesConfig,
  RoutingConfig,
} from '@spartacus/core';
import { PremiumCalendarComponent } from './premium-calendar.component';

const routes: Routes = [
  {
    path: null,
    canActivate: [AuthGuard, CmsPageGuard],
    data: {
      cxRoute: 'premiumCalendar',
      pageLabel: 'premium-calendar',
    },
    component: PageLayoutComponent,
  },
];

@NgModule({
    imports: [
        CommonModule,
        I18nModule,
        SpinnerModule,
        MediaModule,
        RouterModule.forChild(routes),
        ConfigModule.withConfig(<CmsConfig | RoutesConfig | RoutingConfig>{
            cmsComponents: {
                AccountPremiumCalendarFlex: {
                    component: PremiumCalendarComponent,
                },
            },
        }),
    ],
    declarations: [PremiumCalendarComponent],
    exports: [PremiumCalendarComponent]
})
export class PremiumCalendarModule {}
