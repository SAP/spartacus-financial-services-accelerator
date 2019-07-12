import { ChangeDetectorRef, Component } from '@angular/core';
import { Router } from '@angular/router';
import {
  CartDataService,
  CheckoutService,
  GlobalMessageService,
  GlobalMessageType,
  RoutingService,
  Address,
  PaymentDetails,
  UserService
} from '@spartacus/core';
import { PaymentMethodComponent } from '@spartacus/storefront';
import { filter } from 'rxjs/operators';
import { FSCartService } from '../../services/fs-cart.service';
import { checkoutNavBar } from './fsa-checkout-navigation-bar';

@Component({
  selector: 'fsa-multi-step-checkout',
  styleUrls: ['./fsa-multi-step-checkout.component.scss'],
  templateUrl: './fsa-multi-step-checkout.component.html'
})
export class FsaMultiStepCheckoutComponent {
  step = 1;
  navs = checkoutNavBar;
  anonymous = true;
  currentUrl: string;
  currentCategory: string;

  constructor(
    protected checkoutService: CheckoutService,
    protected cartService: FSCartService,
    protected cartDataService: CartDataService,
    protected routingService: RoutingService,
    protected globalMessageService: GlobalMessageService,
    protected cd: ChangeDetectorRef,
    protected userService: UserService,
    private router: Router
  ) {
    super(checkoutService, cartService, cartDataService, routingService, globalMessageService, cd);
  }

  processSteps() {
    this.currentUrl = this.router.url;
    this.currentCategory = this.currentUrl.split('_').pop();
    // step2: add main product
    this.subscriptions.push(
      this.cartService.mainProductAdded
        .pipe(filter(poductCode => Object.keys(poductCode).length !== 0 && this.step === 2))
        .subscribe(() => {
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
            this.nextStep(7);
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
    // step7: Place an order / Order Confirmation
    this.subscriptions.push(
      this.checkoutService
        .getOrderDetails()
        .pipe(
          filter(order => Object.keys(order).length !== 0 && this.step === 7)
        )
        .subscribe(() => {
          // checkout steps are done
          this.done = true;
          this.routingService.go({ route: ['orderConfirmation'] });
        })
    );
    // authentication
    this.subscriptions.push(this.userService.get().subscribe(user => {
      if (user.uid !== undefined) {
        this.anonymous = false;
      } else {
        this.anonymous = true;
      }
    }));
  }

  addPaymentInfo({
    newPayment,
    payment,
    billingAddress
  }: {
    newPayment: boolean;
    payment: PaymentDetails;
    billingAddress: Address;
  }): void {
    payment.billingAddress = billingAddress
      ? billingAddress
      : payment.billingAddress;
    if (newPayment) {
      if (!billingAddress) {
        this.checkoutService.getDeliveryAddress().subscribe(data => {
          payment.billingAddress = data;
        });
      }
      this.checkoutService.createPaymentDetails(payment);
      return;
    }
    this.checkoutService.setDeliveryMode('financial-default');
    this.checkoutService.setPaymentDetails(payment);
  }

  nextStep(step: number) {
    if (step >= 4 && this.anonymous) {
      this.routingService.goByUrl('login');
    } else {
      super.nextStep(step);
    }
  }
}
