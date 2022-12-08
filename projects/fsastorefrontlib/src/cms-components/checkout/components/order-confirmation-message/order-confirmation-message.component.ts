import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { CheckoutFacade } from '@spartacus/checkout/root';
import { Order } from '@spartacus/order/root';
import { Observable } from 'rxjs';

@Component({
  selector: 'cx-fs-order-confirmation-message',
  templateUrl: './order-confirmation-message.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrderConfirmationMessageComponent implements OnInit {
  order$: Observable<Order>;

  constructor(protected checkoutService: CheckoutFacade) {}

  ngOnInit() {
    this.order$ = this.checkoutService.getOrderDetails();
  }
}
