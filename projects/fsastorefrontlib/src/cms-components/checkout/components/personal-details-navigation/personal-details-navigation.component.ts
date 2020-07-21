import { PricingService } from './../../../../core/product-pricing/facade/pricing.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormDataService, YFormData } from '@fsa/dynamicforms';
import { Cart, RoutingService } from '@spartacus/core';
import { Subscription } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { FSOrderEntry } from '../../../../occ/occ-models';
import { FSCartService } from './../../../../core/cart/facade/cart.service';
import { FSCheckoutConfigService } from './../../../../core/checkout/services/checkout-config.service';
import { QuoteService } from './../../../../core/my-account/facade/quote.service';

@Component({
  selector: 'cx-fs-personal-details-navigation',
  templateUrl: './personal-details-navigation.component.html',
})
export class PersonalDetailsNavigationComponent implements OnInit, OnDestroy {
  constructor(
    protected cartService: FSCartService,
    protected formService: FormDataService,
    protected activatedRoute: ActivatedRoute,
    protected routingService: RoutingService,
    protected checkoutConfigService: FSCheckoutConfigService,
    protected quoteService: QuoteService,
    protected pricingService: PricingService
  ) {}

  subscription = new Subscription();
  checkoutStepUrlNext: string;
  cartId: string;

  ngOnInit() {
    this.checkoutStepUrlNext = this.checkoutConfigService.getNextCheckoutStepUrl(
      this.activatedRoute
    );
  }

  navigateNext() {
    this.subscription
      .add(
        this.cartService
          .getActive()
          .pipe(
            take(1),
            map((cart: Cart) => {
              if (
                cart &&
                cart.code &&
                cart.entries &&
                cart.entries.length > 0
              ) {
                this.cartId = cart.code;
                const entry: FSOrderEntry = cart.entries[0];
                const yFormData: YFormData = {
                  refId: cart.code + '_' + cart.entries[0].entryNumber,
                };
                if (entry.formData && entry.formData.length > 0) {
                  yFormData.id = entry.formData[0].id;
                }
                this.quoteService.underwriteQuote(cart.code);
                this.formService.submit(yFormData);
              }
            })
          )
          .subscribe()
      )
      .add(
        this.formService
          .getSubmittedForm()
          .pipe(
            map(formData => {
              if (formData && formData.content) {
                this.quoteService.updateQuote(
                  this.cartId,
                  this.pricingService.buildPricingData(
                    JSON.parse(formData.content)
                  )
                );
                this.routingService.go(this.checkoutStepUrlNext);
              }
            })
          )
          .subscribe()
      );
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
