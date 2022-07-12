import { Component, OnDestroy, OnInit } from '@angular/core';
import { combineLatest, Observable, Subscription } from 'rxjs';
import { filter, switchMap, take, tap } from 'rxjs/operators';
import { FormDataService, YFormData } from '@spartacus/dynamicforms';
import { Address, RoutingService, User } from '@spartacus/core';
import { UserAccountFacade } from '@spartacus/user/account/root';
import {
  FSCart,
  FSOrderEntry,
  FSSteps,
  FSUser,
  FSUserRole,
  QuoteActionType,
} from '../../../../occ/occ-models/occ.models';
import { FSCartService } from './../../../../core/cart/facade/cart.service';
import { FSCheckoutConfigService } from './../../../../core/checkout/services/checkout-config.service';
import { QuoteService } from './../../../../core/my-account/facade/quote.service';
import { PricingService } from './../../../../core/product-pricing/facade/pricing.service';
import { FSAddressService } from './../../../../core/user/facade/address.service';
import { ConsentService } from '../../../../core/my-account/facade';

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
    protected consentService: ConsentService
  ) {}

  protected readonly PERSONAL_DETAILS_FORM_GROUP = 'personalDetails';
  protected readonly EMAIL = 'email';

  subscription = new Subscription();
  previousCheckoutStep$: Observable<FSSteps>;
  nextCheckoutStep$: Observable<FSSteps>;
  cart$: Observable<FSCart> = this.cartService.getActive();
  user$: Observable<FSUser> = this.userAccountFacade.get();
  address$: Observable<Address[]> = this.addressService.getAddresses();

  ngOnInit() {
    this.previousCheckoutStep$ = this.checkoutConfigService.previousStep;
    this.nextCheckoutStep$ = this.checkoutConfigService.nextStep;
  }

  navigateNext(nextStep: FSSteps) {
    this.subscription.add(
      combineLatest([this.cart$, this.user$, this.address$])
        .pipe(
          take(1),
          switchMap(([cart, user, addresses]) => {
            const cartId: string = cart?.code;
            if (cart?.code && cart?.entries?.length > 0) {
              const entry: FSOrderEntry = cart.entries[0];
              const yFormData: YFormData = {
                refId: cart.code + '_' + cart.entries[0].entryNumber,
              };
              yFormData.id =
                entry?.formData?.length > 0 ? entry?.formData[0].id : null;
              this.formService.submit(yFormData);
            }
            return this.formService.getSubmittedForm().pipe(
              filter(formData => !!(formData && formData.content)),
              switchMap(formData => {
                this.createDeliveryAddressForUser(user, formData, addresses);
                const pricingAttributesData = this.pricingService.buildPricingData(
                  JSON.parse(formData.content)
                );
                // consider refactoring this (maybe on BE?), since underwriteQuoteApplication
                // and updateQuoteApplication are using the same API call
                return this.quoteService
                  .underwriteQuoteApplication(cartId)
                  .pipe(
                    switchMap(_ => {
                      return this.quoteService
                        .updateQuoteApplication(
                          cartId,
                          QuoteActionType.UPDATE,
                          pricingAttributesData
                        )
                        .pipe(
                          tap(_ => {
                            this.routingService.go({
                              cxRoute: nextStep.step,
                            });
                          })
                        );
                    })
                  );
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

  private createDeliveryAddressForUser(
    user: User,
    formData: YFormData,
    addresses: Address[]
  ) {
    if (user.roles.includes(FSUserRole.SELLER)) {
      const oboCustomerAddress = this.addressService.populateAddressFromFormData(
        JSON.parse(formData.content)
      );
      const customerId = JSON.parse(formData.content)[
        this.PERSONAL_DETAILS_FORM_GROUP
      ][this.EMAIL];
      this.consentService.createAddressForUser(
        user.uid,
        customerId,
        oboCustomerAddress
      );
    } else {
      // TODO: use user.defaultAddress when Spartacus fix bug regarding properly updating defaultAddress
      const defaultAddress = addresses.find(address => address.defaultAddress);
      this.addressService.createAddress(
        JSON.parse(formData.content),
        defaultAddress
      );
    }
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
