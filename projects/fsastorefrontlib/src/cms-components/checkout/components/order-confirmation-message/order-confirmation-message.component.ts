import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { CheckoutService } from '@spartacus/checkout/core';
import { Order } from '@spartacus/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'cx-fs-order-confirmation-message',
  templateUrl: './order-confirmation-message.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrderConfirmationMessageComponent implements OnInit {
  order$: Observable<Order>;

  constructor(protected checkoutService: CheckoutService) {}

  ngOnInit() {
    this.order$ = this.checkoutService.getOrderDetails();
  }
}
