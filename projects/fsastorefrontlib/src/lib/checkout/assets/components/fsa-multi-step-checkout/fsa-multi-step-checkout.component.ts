import { ChangeDetectorRef, Component } from '@angular/core';
import { CartDataService, CheckoutService, GlobalMessageService, GlobalMessageType, RoutingService } from '@spartacus/core';
import { MultiStepCheckoutComponent } from '@spartacus/storefront';
import { filter } from 'rxjs/operators';
import { FSCartService } from '../../services/fs-cart.service';
import { checkoutNavBar } from './fsa-checkout-navigation-bar';

@Component({
  selector: 'fsa-multi-step-checkout',
  templateUrl: './fsa-multi-step-checkout.component.html'
})
export class FsaMultiStepCheckoutComponent extends MultiStepCheckoutComponent {
  step = 2;
  navs = checkoutNavBar;

  constructor(
    protected checkoutService: CheckoutService,
    protected cartService: FSCartService,
    protected cartDataService: CartDataService,
    protected routingService: RoutingService,
    protected globalMessageService: GlobalMessageService,
    protected cd: ChangeDetectorRef,
  ) {
    super(checkoutService, cartService, cartDataService, routingService, globalMessageService, cd);
  }

  processSteps() {

    // step2: add main product
    this.subscriptions.push(
      this.cartService.mainProductAdded
        .pipe(filter(poductCode => Object.keys(poductCode).length !== 0 && this.step === 2))
        .subscribe(state => {
          this.nextStep(3);
        }));

    // step6: set payment information
    this.subscriptions.push(
      this.checkoutService
        .getPaymentDetails()
        .pipe(
          filter(
            paymentInfo =>
              Object.keys(paymentInfo).length !== 0 && this.step === 6
          )
        )
        .subscribe(paymentInfo => {
          if (!paymentInfo['hasError']) {
            this.paymentDetails = paymentInfo;
            this.done = true;
          } else {
            Object.keys(paymentInfo).forEach(key => {
              if (key.startsWith('InvalidField')) {
                this.globalMessageService.add({
                  type: GlobalMessageType.MSG_TYPE_ERROR,
                  text: 'InvalidField: ' + paymentInfo[key]
                });
              }
            });
            this.checkoutService.clearCheckoutStep(6);
          }
        })
    );
  }
}
