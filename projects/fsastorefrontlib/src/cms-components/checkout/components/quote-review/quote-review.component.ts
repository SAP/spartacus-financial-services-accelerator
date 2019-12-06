import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Cart, CartService, OccConfig, RoutingService } from '@spartacus/core';
import { Observable } from 'rxjs';
import {
  FSCartService,
  FSCheckoutConfigService,
} from '../../../../core/checkout/services';
import { FSCheckoutService } from '../../../../core/checkout/services/fs-checkout.service';

@Component({
  selector: 'fsa-quote-review',
  templateUrl: './quote-review.component.html',
})
export class QuoteReviewComponent implements OnInit {
  cart$: Observable<Cart>;
  cartLoaded$: Observable<boolean>;
  checkoutStepUrlNext: string;
  checkoutStepUrlBack: string;

  constructor(
    protected cartService: CartService,
    private config: OccConfig,
    protected routingService: RoutingService,
    private checkoutConfigService: FSCheckoutConfigService,
    private activatedRoute: ActivatedRoute,
    protected checkoutService: FSCheckoutService,
    protected fsCartService: FSCartService
  ) {}

  ngOnInit() {
    this.fsCartService.reLoadCart();

    this.checkoutStepUrlNext = this.checkoutConfigService.getNextCheckoutStepUrl(
      this.activatedRoute
    );
    this.checkoutStepUrlBack = this.checkoutConfigService.getPreviousCheckoutStepUrl(
      this.activatedRoute
    );
    this.cart$ = this.cartService.getActive();
    this.cartLoaded$ = this.cartService.getLoaded();
  }

  public getBaseUrl() {
    return this.config.backend.occ.baseUrl || '';
  }

  back() {
    this.routingService.go(this.checkoutStepUrlBack);
  }
  next() {
    this.checkoutService.mockDeliveryAddress();
    this.routingService.go(this.checkoutStepUrlNext);
  }

  getFormContentInJson(cart: any): any {
    if (
      cart &&
      cart.deliveryOrderGroups.length > 0 &&
      cart.deliveryOrderGroups[0].entries.length > 0 &&
      cart.deliveryOrderGroups[0].entries[0].formDataData
    ) {
      return JSON.parse(
        cart.deliveryOrderGroups[0].entries[0].formDataData[0].content
      );
    }
  }
}
