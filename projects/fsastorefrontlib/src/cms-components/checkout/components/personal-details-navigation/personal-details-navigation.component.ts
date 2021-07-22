import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormDataService, YFormData } from '@spartacus/dynamicforms';
import {
  ActiveCartService,
  Address,
  CheckoutDeliveryService,
  RoutingService,
} from '@spartacus/core';
import { combineLatest, Observable, Subscription } from 'rxjs';
import { filter, map, switchMap, take } from 'rxjs/operators';
import { FSOrderEntry, FSSteps } from '../../../../occ/occ-models/occ.models';
import { FSCartService } from './../../../../core/cart/facade/cart.service';
import { FSCheckoutConfigService } from './../../../../core/checkout/services/checkout-config.service';
import { QuoteService } from './../../../../core/my-account/facade/quote.service';
import { PricingService } from './../../../../core/product-pricing/facade/pricing.service';
import { FSAddressService } from './../../../../core/user/facade/address.service';
import { UserAccountFacade } from '@spartacus/user/account/root';
import { FSCheckoutService } from '../../../../core/checkout/facade/checkout.service';

@Component({
  selector: 'cx-fs-personal-details-navigation',
  templateUrl: './personal-details-navigation.component.html',
})
export class PersonalDetailsNavigationComponent implements OnInit, OnDestroy {
  constructor(
    protected cartService: FSCartService,
    protected formService: FormDataService,
    protected routingService: RoutingService,
    protected checkoutConfigService: FSCheckoutConfigService,
    protected quoteService: QuoteService,
    protected pricingService: PricingService,
    protected userAccountFacade: UserAccountFacade,
    protected addressService: FSAddressService,
    protected checkoutDeliveryService: CheckoutDeliveryService,
    protected activeCartService: ActiveCartService,
    protected checkoutService: FSCheckoutService
  ) {}

  subscription = new Subscription();
  previousCheckoutStep$: Observable<FSSteps>;
  nextCheckoutStep$: Observable<FSSteps>;
  cartId: string;
  addressData: Address;

  ngOnInit() {
    this.previousCheckoutStep$ = this.checkoutConfigService.previousStep;
    this.nextCheckoutStep$ = this.checkoutConfigService.nextStep;
    this.userAccountFacade.get();
    this.subscription.add(
      this.activeCartService
        .getActive()
        .pipe(
          filter(cart => !!cart),
          map(cart => {
            this.checkoutService.loadCheckoutDetails(cart.code);
          })
        )
        .subscribe()
    );
  }

  navigateNext(nextStep: FSSteps) {
    this.subscription.add(
      combineLatest([
        this.cartService.getActive(),
        this.userAccountFacade.get(),
        this.checkoutDeliveryService.getDeliveryAddress(),
      ])
        .pipe(
          filter(([_, user, deliveryAddresses]) => Boolean(user.customerId)),
          take(1),
          switchMap(([cart, user, deliveryAddresses]) => {
            if (cart?.code && cart?.entries?.length > 0) {
              this.cartId = cart.code;
              const entry: FSOrderEntry = cart.entries[0];
              const yFormData: YFormData = {
                refId: cart.code + '_' + cart.entries[0].entryNumber,
              };
              yFormData.id =
                entry?.formData?.length > 0 ? entry?.formData[0].id : null;
              this.formService.submit(yFormData);
            }
            return this.formService.getSubmittedForm().pipe(
              map(formData => {
                if (formData && formData.content) {
                  if (!deliveryAddresses) {
                    this.addressService.createAddressData(
                      JSON.parse(formData.content),
                      user
                    );
                  }
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
