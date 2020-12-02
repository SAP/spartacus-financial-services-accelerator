import { Component, OnInit } from '@angular/core';
import {
  OrderDetailShippingComponent,
  OrderDetailsService,
} from '@spartacus/storefront';

@Component({
  selector: 'cx-fs-order-details-shipping',
  templateUrl: './order-detail-shipping.component.html',
})
export class FSOrderDetailShippingComponent extends OrderDetailShippingComponent {
  constructor(protected orderDetailsService: OrderDetailsService) {
    super(orderDetailsService);
  }
}
