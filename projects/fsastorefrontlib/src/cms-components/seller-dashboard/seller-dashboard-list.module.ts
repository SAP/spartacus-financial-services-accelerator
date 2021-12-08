import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {
  CmsPageGuard,
  SpinnerModule,
  PageLayoutComponent,
  ListNavigationModule,
  IconModule,
} from '@spartacus/storefront';
import {
  CmsModule,
  AuthGuard,
  I18nModule,
  CmsConfig,
  provideDefaultConfig,
  UrlModule,
} from '@spartacus/core';
import { SellerDashboardListComponent } from './seller-dashboard-list.component';
import { SellerDashboardListGuard } from './seller-dashboard-list.guard';

const routes: Routes = [
  {
    path: null,
    canActivate: [AuthGuard, CmsPageGuard, SellerDashboardListGuard],
    data: {
      cxRoute: 'sellerDashboardList',
      pageLabel: 'seller-dashboard-list',
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
    IconModule,
    RouterModule.forChild(routes),
  ],
  providers: [
    provideDefaultConfig(<CmsConfig>{
      cmsComponents: {
        SellerDashboardListFlex: {
          component: SellerDashboardListComponent,
        },
      },
    }),
  ],
  declarations: [SellerDashboardListComponent],
  exports: [SellerDashboardListComponent],
})
export class SellerDashboardListModule {}
