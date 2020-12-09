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
  CartSharedModule,
  SpinnerModule,
  OrderOverviewModule,
  OrderDetailsModule,
  MediaModule,
  CardModule,
} from '@spartacus/storefront';
import { FSOrderDetailItemsComponent } from './order-detail-items/order-detail-items.component';
import { FSOrderDetailShippingComponent } from './order-detail-shipping/order-detail-shipping.component';
import { FSOrderDetailTotalsComponent } from './order-detail-totals/order-detail-totals.component';
import { FSOrderOverviewComponent } from './order-overview/order-overview.component';

const moduleComponents = [
  FSOrderDetailShippingComponent,
  FSOrderDetailItemsComponent,
  FSOrderDetailTotalsComponent,
  FSOrderOverviewComponent,
];

@NgModule({
  imports: [
    CartSharedModule,
    CardModule,
    RouterModule,
    CommonModule,
    I18nModule,
    FeaturesConfigModule,
    UrlModule,
    SpinnerModule,
    OrderOverviewModule,
    OrderDetailsModule,
    MediaModule,
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
export class FSOrderDetailsModule {}
