import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { CheckoutQueryResetEvent } from '@spartacus/checkout/base/root';
import { EventService, OccConfig } from '@spartacus/core';
import { Order, OrderFacade } from '@spartacus/order/root';
import { Observable } from 'rxjs';
import { FSCheckoutService } from '../../../../core/checkout/facade/checkout.service';
import { FSTranslationService } from './../../../../core/i18n/facade/translation.service';

@Component({
  selector: 'cx-fs-order-confirmation',
  templateUrl: './order-confirmation.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrderConfirmationComponent implements OnInit, OnDestroy {
  order$: Observable<Order>;
  orderPlaced = this.checkoutService.orderPlaced;
  baseUrl: string;

  constructor(
    protected checkoutService: FSCheckoutService,
    protected config: OccConfig,
    protected translationService: FSTranslationService,
    protected orderFacade: OrderFacade,
    protected eventService: EventService
  ) {}

  ngOnInit() {
    this.order$ = this.orderFacade.getOrderDetails();
    this.baseUrl = this.config.backend.occ.baseUrl || '';
  }

  ngOnDestroy() {
    this.checkoutService.orderPlaced = false;
    this.eventService.dispatch(CheckoutQueryResetEvent);
  }

  getFormContent(order: any): any {
    if (
      order &&
      order.entries &&
      order.entries.length > 0 &&
      order.entries[0].formData
    ) {
      return JSON.parse(order.entries[0].formData[0].content);
    }
  }

  getTranslation(translationGroup: string, translationKey: string): string {
    return this.translationService.getTranslationValue(
      ['orderConfirmation', translationGroup],
      translationKey
    );
  }

  checkIfRemoveableEntriesExists(order: Order) {
    const filteredEntries = this.checkoutService.filterRemoveableEntries(order);
    return filteredEntries.length > 0;
  }
}
