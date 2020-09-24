import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormDataService, YFormData } from '@fsa/dynamicforms';
import { Cart, RoutingService } from '@spartacus/core';
import { Observable, Subscription } from 'rxjs';
import { map, switchMap, take } from 'rxjs/operators';
import { FSOrderEntry, FSSteps } from '../../../../occ/occ-models/occ.models';
import { FSCartService } from './../../../../core/cart/facade/cart.service';
import { FSCheckoutConfigService } from './../../../../core/checkout/services/checkout-config.service';
import { QuoteService } from './../../../../core/my-account/facade/quote.service';
import { PricingService } from './../../../../core/product-pricing/facade/pricing.service';

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
  previousCheckoutStep$: Observable<FSSteps>;
  nextCheckoutStep$: Observable<FSSteps>;
  cartId: string;

  ngOnInit() {
    this.previousCheckoutStep$ = this.checkoutConfigService.previousStep;
    this.nextCheckoutStep$ = this.checkoutConfigService.nextStep;
  }

  navigateNext(nextStep: FSSteps) {
    this.subscription.add(
      this.cartService
        .getActive()
        .pipe(
          take(1),
          switchMap((cart: Cart) => {
            if (cart && cart.code && cart.entries && cart.entries.length > 0) {
              this.cartId = cart.code;
              const entry: FSOrderEntry = cart.entries[0];
              const yFormData: YFormData = {
                refId: cart.code + '_' + cart.entries[0].entryNumber,
              };
              yFormData.id =
                entry?.formData?.length > 0 ? entry.formData[0].id : null;
              this.formService.submit(yFormData);
            }
            return this.formService.getSubmittedForm().pipe(
              map(formData => {
                if (formData && formData.content) {
                  this.quoteService.underwriteQuote(cart.code);
                  this.quoteService.updateQuote(
                    this.cartId,
                    this.pricingService.buildPricingData(
                      JSON.parse(formData.content)
                    )
                  );
                  this.routingService.go({
                    cxRoute: nextStep.step,
                  });
                }
              })
            );
          })
        )
        .subscribe()
    );
  }

  navigateBack(previousStep: FSSteps) {
    this.routingService.go({
      cxRoute: previousStep.step,
    });
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
