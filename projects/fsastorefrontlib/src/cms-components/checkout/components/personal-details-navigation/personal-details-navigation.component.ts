import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormDataService, YFormData } from '@fsa/dynamicforms';
import { Cart, RoutingService } from '@spartacus/core';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { ActiveCategoryStep, FSOrderEntry } from '../../../../occ/occ-models';
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
    protected quoteService: QuoteService
  ) {}

  subscription = new Subscription();
  previousCheckoutStep$: Observable<ActiveCategoryStep>;
  nextCheckoutStep$: Observable<ActiveCategoryStep>;

  ngOnInit() {
    this.previousCheckoutStep$ = this.checkoutConfigService.previousStep;
    this.nextCheckoutStep$ = this.checkoutConfigService.nextStep;
  }

  navigateNext(nextStep: ActiveCategoryStep) {
    this.subscription
      .add(
        this.cartService
          .getActive()
          .pipe(
            map((cart: Cart) => {
              if (
                cart &&
                cart.code &&
                cart.entries &&
                cart.entries.length > 0
              ) {
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
                this.routingService.go({
                  cxRoute: nextStep.step,
                  params: { code: nextStep.activeCategory },
                });
              }
            })
          )
          .subscribe()
      );
  }

  navigateBack(previousStep: ActiveCategoryStep) {
    this.routingService.go({
      cxRoute: previousStep.step,
      params: { code: previousStep.activeCategory },
    });
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
