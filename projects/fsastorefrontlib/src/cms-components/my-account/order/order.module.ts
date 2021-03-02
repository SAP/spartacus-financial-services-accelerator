import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
  AuthGuard,
  CmsConfig,
  FeaturesConfig,
  FeaturesConfigModule,
  I18nModule,
  provideDefaultConfig,
  UrlModule,
} from '@spartacus/core';
import {
  CartSharedModule,
  SpinnerModule,
  MediaModule,
  CardModule,
  OrderOverviewModule,
  ListNavigationModule,
} from '@spartacus/storefront';
import { FSOrderDetailItemsComponent } from './order-details/order-detail-items/order-detail-items.component';
import { FSOrderDetailTotalsComponent } from './order-details/order-detail-totals/order-detail-totals.component';
import { FSOrderHistoryComponent } from './order-history/order-history.component';

const moduleComponents = [
  FSOrderDetailItemsComponent,
  FSOrderDetailTotalsComponent,
  FSOrderHistoryComponent,
];

@NgModule({
  imports: [
    CartSharedModule,
    RouterModule,
    CommonModule,
    I18nModule,
    FeaturesConfigModule,
    UrlModule,
    SpinnerModule,
    MediaModule,
    ListNavigationModule,
    CardModule,
    OrderOverviewModule,
  ],
  providers: [
    provideDefaultConfig(<CmsConfig | FeaturesConfig>{
      cmsComponents: {
        AccountOrderDetailsItemsComponent: {
          component: FSOrderDetailItemsComponent,
        },
        AccountOrderDetailsTotalsComponent: {
          component: FSOrderDetailTotalsComponent,
        },
        AccountOrderHistoryComponent: {
          component: FSOrderHistoryComponent,
        },
      },
      features: {
        consignmentTracking: '1.2',
      },
    }),
  ],
  declarations: [...moduleComponents],
  exports: [...moduleComponents],
  entryComponents: [...moduleComponents],
})
export class FSOrderModule {}
