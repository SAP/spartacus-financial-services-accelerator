import {
  Component,
  ChangeDetectionStrategy,
  OnInit,

} from '@angular/core';

import { Order, CheckoutService } from '@spartacus/core';

import { Observable } from 'rxjs';

@Component({
  selector: 'fsa-thank-you-message',
  templateUrl: './thank-you-message.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ThankYouMessageComponent implements OnInit {
  order$: Observable<Order>;

  constructor(
    protected checkoutService: CheckoutService,
  ) { }

  ngOnInit() {
    this.order$ = this.checkoutService.getOrderDetails();
  }

}
