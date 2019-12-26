import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { Order, CheckoutService } from '@spartacus/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'fsa-order-confirmation-message',
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
