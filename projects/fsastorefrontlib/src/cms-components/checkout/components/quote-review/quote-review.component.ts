import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Cart, CartService, OccConfig, RoutingService } from '@spartacus/core';
import { ActivatedRoute } from '@angular/router';
import { FSCheckoutConfigService } from '../../../../core/checkout/services';
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
    protected checkoutService: FSCheckoutService
  ) {}

  ngOnInit() {
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

  parseFormContentToJson(formContent: string): any {
    return JSON.parse(formContent);
  }
}
