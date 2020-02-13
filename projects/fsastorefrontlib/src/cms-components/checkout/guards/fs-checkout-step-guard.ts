import { FSCartService } from './../../../core/cart/facade/fs-cart.service';
import { Injectable, OnDestroy } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import {
  CmsActivatedRouteSnapshot,
  RoutingConfigService,
} from '@spartacus/core';
import { Observable, of, Subscription } from 'rxjs';
import { FSCheckoutStep } from '../components/checkout-progress/fs-checkout-step.component';
import {
  FSCheckoutConfigService,
} from '../../../core/checkout/services';
import { FSProduct } from '../../../occ/occ-models';
import { take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class FSCheckoutStepGuard implements CanActivate, OnDestroy {
  constructor(
    protected routingConfigService: RoutingConfigService,
    protected router: Router,
    protected fsCheckoutConfigService: FSCheckoutConfigService,
    protected cartService: FSCartService
  ) {}
  currentCategory: string;
  private subscription: Subscription;

  canActivate(route: CmsActivatedRouteSnapshot): Observable<boolean | UrlTree> {
    const currentStepIndex = this.fsCheckoutConfigService.getCurrentStepIndex(
      route
    );
    const currentStep = <FSCheckoutStep>(
      this.fsCheckoutConfigService.steps[currentStepIndex]
    );
    const nextStep = <FSCheckoutStep>(
      this.fsCheckoutConfigService.steps[currentStepIndex + 1]
    );
    this.subscription = this.cartService
      .getActive()
      .pipe(take(1))
      .subscribe(cart => {
        if (
          cart.deliveryOrderGroups &&
          cart.deliveryOrderGroups.length > 0 &&
          cart.deliveryOrderGroups[0].entries &&
          cart.deliveryOrderGroups[0].entries.length > 0
        ) {
          const fsProduct: FSProduct =
            cart.deliveryOrderGroups[0].entries[0].product;
          this.currentCategory = fsProduct.defaultCategory.code;
        }
      });
    return currentStep.restrictedCategories.indexOf(this.currentCategory) !== -1
      ? of(
          this.router.parseUrl(
            this.routingConfigService.getRouteConfig(nextStep.routeName)
              .paths[0]
          )
        )
      : of(true);
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
