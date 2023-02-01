import { Component, OnInit } from '@angular/core';
import { Order } from '@spartacus/order/root';
import { Observable } from 'rxjs';
import { OrderDetailsService } from '@spartacus/order/components';

@Component({
  selector: 'cx-fs-order-details-items',
  templateUrl: './order-detail-items.component.html',
})
export class FSOrderDetailItemsComponent implements OnInit {
  order$: Observable<Order>;

  constructor(protected orderDetailsService: OrderDetailsService) {}

  ngOnInit() {
    this.order$ = this.orderDetailsService.getOrderDetails();
  }
}
