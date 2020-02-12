import {
  Component,
  ChangeDetectionStrategy,
  OnInit,
  OnDestroy,
} from '@angular/core';

import { Order, OccConfig } from '@spartacus/core';

import { Observable } from 'rxjs';
import { FSCheckoutService } from '../../../../core/checkout/facade/fs-checkout.service';

@Component({
  selector: 'fsa-order-confirmation',
  templateUrl: './order-confirmation.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FsaOrderConfirmationComponent implements OnInit, OnDestroy {
  order$: Observable<Order>;
  orderPlaced = this.checkoutService.orderPlaced;

  constructor(
    protected checkoutService: FSCheckoutService,
    protected config: OccConfig
  ) {}

  ngOnInit() {
    this.order$ = this.checkoutService.getOrderDetails();
  }
  public getBaseUrl() {
    return this.config.backend.occ.baseUrl || '';
  }
  ngOnDestroy() {
    this.checkoutService.orderPlaced = false;
    this.checkoutService.clearCheckoutData();
  }
}
