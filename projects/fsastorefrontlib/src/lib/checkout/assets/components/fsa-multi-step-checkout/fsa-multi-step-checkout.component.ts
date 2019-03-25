import { Component, ChangeDetectorRef, OnInit } from '@angular/core';
import { checkoutNavBar } from './fsa-checkout-navigation-bar';
import { MultiStepCheckoutComponent } from '@spartacus/storefront';
import { CheckoutService, CartDataService, RoutingService, GlobalMessageService } from '@spartacus/core';
import { FSCartService } from '../../services/fs-cart.service';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'fsa-multi-step-checkout',
  templateUrl: './fsa-multi-step-checkout.component.html',
  styleUrls: ['./fsa-multi-step-checkout.component.scss']

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

  addOptions() {
    this.nextStep(5);
  }

  processSteps() {
    this.subscriptions.push(
      this.cartService.mainProductAdded
      .pipe(filter(object => Object.keys(object).length !== 0 && this.step === 2))
      .subscribe(state => {
        this.nextStep(3);
      }));
  }
}
