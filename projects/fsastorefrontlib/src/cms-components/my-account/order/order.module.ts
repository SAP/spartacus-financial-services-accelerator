import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
  CmsConfig,
  FeaturesConfig,
  FeaturesConfigModule,
  I18nModule,
  provideDefaultConfig,
  UrlModule,
} from '@spartacus/core';
import {
  SpinnerModule,
  MediaModule,
  CardModule,
  OrderOverviewModule,
  ListNavigationModule,
  CartCouponModule,
} from '@spartacus/storefront';
import { FSOrderDetailItemsComponent } from './order-details/order-detail-items/order-detail-items.component';
import { FSOrderDetailTotalsComponent } from './order-details/order-detail-totals/order-detail-totals.component';
import { FSOrderSummaryComponent } from './order-details/order-summary/order-summary.component';
import { FSOrderHistoryComponent } from './order-history/order-history.component';

const moduleComponents = [
  FSOrderDetailItemsComponent,
  FSOrderDetailTotalsComponent,
  FSOrderSummaryComponent,
  FSOrderHistoryComponent,
];

@NgModule({
  imports: [
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
    CartCouponModule,
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
