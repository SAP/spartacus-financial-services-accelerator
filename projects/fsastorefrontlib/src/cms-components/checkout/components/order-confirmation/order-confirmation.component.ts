import {
  Component,
  ChangeDetectionStrategy,
  OnInit,
  OnDestroy,
} from '@angular/core';

import { Order, CheckoutService, OccConfig } from '@spartacus/core';

import { Observable } from 'rxjs';

@Component({
  selector: 'fsa-order-confirmation',
  templateUrl: './order-confirmation.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FsaOrderConfirmationComponent implements OnInit, OnDestroy {
  order$: Observable<Order>;

  constructor(
    protected checkoutService: CheckoutService,
    private config: OccConfig
  ) {}

  ngOnInit() {
    this.order$ = this.checkoutService.getOrderDetails();
  }
  public getBaseUrl() {
    return this.config.backend.occ.baseUrl || '';
  }
  ngOnDestroy() {
    this.checkoutService.clearCheckoutData();
  }
}
