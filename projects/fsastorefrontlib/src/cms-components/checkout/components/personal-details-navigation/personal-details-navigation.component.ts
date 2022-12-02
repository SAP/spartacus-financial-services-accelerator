import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormDataService, YFormData, FileService } from '@spartacus/dynamicforms';
import { Address, Cart, RoutingService, User } from '@spartacus/core';
import { combineLatest, Observable, Subscription } from 'rxjs';
import { map, switchMap, take } from 'rxjs/operators';
import {
  FSCart,
  FSOrderEntry,
  FSSteps,
  FSUserRole,
} from '../../../../occ/occ-models/occ.models';
import { FSCartService } from './../../../../core/cart/facade/cart.service';
import { FSCheckoutConfigService } from './../../../../core/checkout/services/checkout-config.service';
import { QuoteService } from './../../../../core/my-account/facade/quote.service';
import { PricingService } from './../../../../core/product-pricing/facade/pricing.service';
import { FSAddressService } from './../../../../core/user/facade/address.service';
import { UserAccountFacade } from '@spartacus/user/account/root';
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
    protected consentService: ConsentService,
    protected fileService: FileService
  ) {}

  protected readonly PERSONAL_DETAILS_FORM_GROUP = 'personalDetails';
  protected readonly EMAIL = 'email';

  subscription = new Subscription();
  previousCheckoutStep$: Observable<FSSteps>;
  nextCheckoutStep$: Observable<FSSteps>;
  cartId: string;
  addressData: Address;

  ngOnInit() {
    this.previousCheckoutStep$ = this.checkoutConfigService.previousStep;
    this.nextCheckoutStep$ = this.checkoutConfigService.nextStep;
    this.userAccountFacade.get();
  }
  //This method should be refactored
  navigateNext(nextStep: FSSteps) {
    this.subscription
      .add(
        combineLatest([
          this.cartService.getActive(),
          this.userAccountFacade.get(),
          this.addressService.getAddresses(),
        ])
          .pipe(
            take(1),
            switchMap(([cart, user, addresses]) => {
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
                    this.createDeliveryAddressForUser(
                      user,
                      formData,
                      addresses
                    );
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
      )
      .add(
        combineLatest([
          this.cartService.getActive(),
          this.fileService.getUploadedDocuments(),
        ])
          .pipe(
            map(([cart, uploadedDocuments]) => {
              if (
                JSON.stringify((<FSCart>cart).insuranceQuote) !== undefined &&
                uploadedDocuments?.files !== undefined
              ) {
                this.updateQuoteWithDocuments(cart, uploadedDocuments);
              }
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

  updateQuoteWithDocuments(cart: Cart, uploadedDocuments) {
    const quoteCopy = JSON.parse(JSON.stringify((<FSCart>cart).insuranceQuote));
    quoteCopy.documents = uploadedDocuments.files;
    quoteCopy.documents = Array.from(quoteCopy.documents);
    this.quoteService.updateQuoteWithContent(cart.code, quoteCopy);
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
