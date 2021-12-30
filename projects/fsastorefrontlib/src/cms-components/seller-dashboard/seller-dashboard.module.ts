import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {
  CmsPageGuard,
  SpinnerModule,
  PageLayoutComponent,
  ListNavigationModule,
  MediaModule,
} from '@spartacus/storefront';
import {
  CmsModule,
  AuthGuard,
  I18nModule,
  CmsConfig,
  provideDefaultConfig,
  UrlModule,
} from '@spartacus/core';
import { DateFormatConfigurationModule } from '../../shared/util/helpers/pipe/dateFormatConfiguration.module';
import { SellerDashboardListComponent } from './seller-dashboard-list/seller-dashboard-list.component';
import { SellerDashboardGuard } from './seller-dashboard.guard';
import { SellerDashboardComponent } from './seller-dashboard.component';

const routes: Routes = [
  {
    path: null,
    canActivate: [AuthGuard, CmsPageGuard, SellerDashboardGuard],
    data: {
      cxRoute: 'sellerDashboard',
      pageLabel: 'seller-dashboard',
    },
    component: PageLayoutComponent,
  },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    I18nModule,
    SpinnerModule,
    CmsModule,
    UrlModule,
    ListNavigationModule,
    MediaModule,
    DateFormatConfigurationModule,
    RouterModule.forChild(routes),
  ],
  providers: [
    provideDefaultConfig(<CmsConfig>{
      cmsComponents: {
        SellerDashboardFlex: {
          component: SellerDashboardComponent,
        },
      },
    }),
  ],
  declarations: [SellerDashboardListComponent, SellerDashboardComponent],
  exports: [SellerDashboardListComponent, SellerDashboardComponent],
})
export class SellerDashboardModule {}
