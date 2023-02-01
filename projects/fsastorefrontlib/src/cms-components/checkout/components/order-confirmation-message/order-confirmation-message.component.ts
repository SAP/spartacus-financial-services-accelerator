import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Order, OrderFacade } from '@spartacus/order/root';
import { Observable } from 'rxjs';

@Component({
  selector: 'cx-fs-order-confirmation-message',
  templateUrl: './order-confirmation-message.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrderConfirmationMessageComponent implements OnInit {
  order$: Observable<Order>;

  constructor(protected orderFacade: OrderFacade) {}

  ngOnInit() {
    this.order$ = this.orderFacade.getOrderDetails();
  }
}
