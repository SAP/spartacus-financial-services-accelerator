import { importExpr } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import {
  OrderDetailShippingComponent,
  OrderDetailsService,
} from '@spartacus/storefront';

@Component({
  selector: 'cx-fs-order-details-shipping',
  templateUrl: './order-detail-shipping.component.html',
})
export class FSOrderDetailShippingComponent extends OrderDetailShippingComponent
  implements OnInit {
  constructor(protected orderDetailsService: OrderDetailsService) {
    super(orderDetailsService);
  }

  ngOnInit() {
    super.ngOnInit();
  }
}
