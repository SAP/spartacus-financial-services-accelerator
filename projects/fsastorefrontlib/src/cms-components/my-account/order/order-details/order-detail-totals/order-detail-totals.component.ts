import { Component } from '@angular/core';
import {
  OrderDetailsService,
  OrderDetailTotalsComponent,
} from '@spartacus/storefront';

@Component({
  selector: 'cx-fs-order-details-totals',
  templateUrl: './order-detail-totals.component.html',
})
export class FSOrderDetailTotalsComponent extends OrderDetailTotalsComponent {
  constructor(protected orderDetailsService: OrderDetailsService) {
    super(orderDetailsService);
  }
}
