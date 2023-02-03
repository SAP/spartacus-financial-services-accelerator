import { Component, Input } from '@angular/core';
import { Order } from '@spartacus/order/root';

@Component({
  selector: 'cx-fs-order-summary',
  templateUrl: './order-summary.component.html',
})
export class FSOrderSummaryComponent {
  @Input()
  order: Order;
}
