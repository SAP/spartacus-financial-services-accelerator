import { Component } from '@angular/core';
import {
  OrderDetailItemsComponent,
  PromotionService,
  OrderDetailsService,
} from '@spartacus/storefront';

@Component({
  selector: 'cx-fs-order-details-items',
  templateUrl: './order-detail-items.component.html',
})
export class FSOrderDetailItemsComponent extends OrderDetailItemsComponent {
  constructor(
    protected orderDetailsService: OrderDetailsService,
    protected promotionService: PromotionService
  ) {
    super(orderDetailsService, promotionService);
  }
}
