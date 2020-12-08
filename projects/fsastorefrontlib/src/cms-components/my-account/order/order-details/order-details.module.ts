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
} from '@spartacus/storefront';
import { FSConsignmentTrackingComponent } from './order-detail-items';
import { FSTrackingEventsComponent } from './order-detail-items/consignment-tracking/tracking-events/tracking-events.component';
import { FSOrderDetailItemsComponent } from './order-detail-items/order-detail-items.component';
import { FSOrderDetailShippingComponent } from './order-detail-shipping/order-detail-shipping.component';
import { FSOrderDetailTotalsComponent } from './order-detail-totals/order-detail-totals.component';

const moduleComponents = [
  FSOrderDetailShippingComponent,
  FSOrderDetailItemsComponent,
  FSOrderDetailTotalsComponent,
  FSTrackingEventsComponent,
  FSConsignmentTrackingComponent,
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
        AccountOrderDetailsShippingComponent: {
          component: FSOrderDetailShippingComponent,
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
