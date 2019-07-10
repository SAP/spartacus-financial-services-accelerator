import { Component, OnInit, ChangeDetectionStrategy, Output, EventEmitter } from '@angular/core';
import { Cart, OrderEntry, RoutingService } from '@spartacus/core';
import { filter } from 'rxjs/operators';
import { Observable } from 'rxjs';
import {FSCartService} from '../../services';
import { ɵc as CheckoutConfigService } from '@spartacus/storefront';
import { ActivatedRoute } from '@angular/router';
import { CheckoutStepType } from '@spartacus/storefront';

@Component({
  selector: 'fsa-add-options',
  templateUrl: './add-options.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddOptionsComponent implements OnInit {

  constructor(
    protected cartService: FSCartService,
    protected routingService: RoutingService,
    private checkoutConfigService: CheckoutConfigService,
    private activatedRoute: ActivatedRoute,
  ) { }

  cart$: Observable<Cart>;
  entries$: Observable<OrderEntry[]>;
  checkoutStepUrlNext: string;
  goTo: CheckoutStepType;

  @Output()
  nextStep = new EventEmitter<any>();

  ngOnInit() {
    this.goTo = null;
    this.checkoutStepUrlNext = this.checkoutConfigService.getNextCheckoutStepUrl(
      this.activatedRoute
    );
    this.cart$ = this.cartService.getActive();
    this.entries$ = this.cartService
      .getEntries()
      .pipe(filter(entries => entries.length > 0));
  }

  addProductToCart(orderEntryCode: string, entryNumber: string) {
    if (!orderEntryCode) {
      return;
    }
    this.cartService.addOptionalProduct(orderEntryCode, 1, entryNumber);
  }

  removeProductFromCart(item): void {
    if (!item) {
      return;
    }
    this.cartService.removeEntry(item);
  }

  next() {
    this.routingService.go(this.checkoutStepUrlNext);
  }
}
