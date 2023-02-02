import { Component, OnInit } from '@angular/core';
import { Order } from '@spartacus/order/root';
import { OrderDetailsService } from '@spartacus/order/components';
import { Observable } from 'rxjs';

@Component({
  selector: 'cx-fs-order-details-totals',
  templateUrl: './order-detail-totals.component.html',
})
export class FSOrderDetailTotalsComponent implements OnInit {
  order$: Observable<Order>;

  constructor(protected orderDetailsService: OrderDetailsService) {}

  ngOnInit() {
    this.order$ = this.orderDetailsService.getOrderDetails();
  }
}
