import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { OccConfig, Order } from '@spartacus/core';
import { Observable } from 'rxjs';
import { FSCheckoutService } from '../../../../core/checkout/facade/checkout.service';

@Component({
  selector: 'cx-fs-order-confirmation',
  templateUrl: './order-confirmation.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrderConfirmationComponent implements OnInit, OnDestroy {
  order$: Observable<Order>;
  orderPlaced = this.checkoutService.orderPlaced;

  constructor(
    protected checkoutService: FSCheckoutService,
    protected config: OccConfig
  ) {}

  ngOnInit() {
    this.order$ = this.checkoutService.getOrderDetails();
  }
  getBaseUrl() {
    return this.config.backend.occ.baseUrl || '';
  }
  ngOnDestroy() {
    this.checkoutService.orderPlaced = false;
    this.checkoutService.clearCheckoutData();
  }
}
