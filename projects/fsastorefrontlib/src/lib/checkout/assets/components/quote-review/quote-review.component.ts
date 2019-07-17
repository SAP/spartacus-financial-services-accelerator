import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { Cart, CartService, OccConfig, RoutingService, CheckoutDeliveryService } from '@spartacus/core';
import { CheckoutStepType } from '@spartacus/storefront';
import { ɵd as CheckoutConfigService } from '@spartacus/storefront';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'fsa-quote-review',
  templateUrl: './quote-review.component.html',
  styleUrls: ['./quote-review.component.scss']
})
export class QuoteReviewComponent implements OnInit {

  cart$: Observable<Cart>;
  cartLoaded$: Observable<boolean>;
  checkoutStepUrlNext: string;
  goTo: CheckoutStepType;

  @Output()
  backStep = new EventEmitter<any>();

  @Output()
  nextStep = new EventEmitter<any>();

  constructor(
    protected cartService: CartService,
    private config: OccConfig,
    protected routingService: RoutingService,
    private checkoutConfigService: CheckoutConfigService,
    private activatedRoute: ActivatedRoute,
    protected checkoutDeliveryService: CheckoutDeliveryService
    ) { }

  ngOnInit() {
    this.goTo = null;
    this.checkoutStepUrlNext = this.checkoutConfigService.getNextCheckoutStepUrl(
      this.activatedRoute
    );
    this.cart$ = this.cartService.getActive();
    this.cartLoaded$ = this.cartService.getLoaded();
  }
  public getBaseUrl() {
    return this.config.backend.occ.baseUrl || '';
  }

  back() {
    this.backStep.emit();
  }
  next() {
    this.checkoutDeliveryService.setDeliveryMode('financial-default');
    this.routingService.go(this.checkoutStepUrlNext);
  }

}
