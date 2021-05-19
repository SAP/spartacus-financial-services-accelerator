import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  CmsActivatedRouteSnapshot,
  RoutingConfigService,
} from '@spartacus/core';
import {
  CheckoutConfig,
  CheckoutConfigService,
  CheckoutStepService,
} from '@spartacus/storefront';
import { BehaviorSubject } from 'rxjs';
import { FSSteps, FSCart, FSCheckoutStep, FSProduct } from '../../../occ';
import { FSCartService } from '../../cart';

@Injectable({
  providedIn: 'root',
})
export class FSCheckoutConfigService extends CheckoutConfigService {
  constructor(
    protected fsCheckoutConfig: CheckoutConfig,
    protected fsRoutingConfigService: RoutingConfigService,
    protected checkoutStepService: CheckoutStepService,
    protected cartService: FSCartService
  ) {
    super(fsCheckoutConfig);
  }

  steps: FSCheckoutStep[] = this.fsCheckoutConfig.checkout.steps;
  previousCheckoutStepSource = new BehaviorSubject<FSSteps>(null);
  previousStep = this.previousCheckoutStepSource.asObservable();
  nextCheckoutStepSource = new BehaviorSubject<FSSteps>(null);
  nextStep = this.nextCheckoutStepSource.asObservable();

  setPreviousStep(stepParameter: string, step: string) {
    this.previousCheckoutStepSource.next({ stepParameter, step });
  }
  setNextStep(stepParameter: string, step: string) {
    this.nextCheckoutStepSource.next({ stepParameter, step });
  }

  getCurrentStepIndex(
    activatedRoute: ActivatedRoute | CmsActivatedRouteSnapshot
  ) {
    const currentStepUrl: string = this.getUrlFromActivatedRoute(
      activatedRoute
    );
    let stepIndex: number;
    let index = 0;
    for (const step of this.steps) {
      if (currentStepUrl === `/${this.getUrlFromStepRoute(step.routeName)}`) {
        stepIndex = index;
      } else {
        index++;
      }
    }

    return stepIndex >= 0 ? stepIndex : null;
  }

  triggerPreviousNextStepSet(activatedRoute: ActivatedRoute) {
    let activeParamType: string;
    const previousUrl = this.getPreviousCheckoutStepUrl(activatedRoute);

    if (previousUrl) {
      const paramType = previousUrl.substring(previousUrl.lastIndexOf(':') + 1);
      this.cartService
        .getActive()
        .subscribe((cart: FSCart) => {
          if (
            <FSProduct>cart &&
            <FSProduct>cart.entries &&
            <FSProduct>cart.entries[0] &&
            <FSProduct>cart.entries[0].product
          ) {
            if (paramType === 'productCode') {
              activeParamType = cart.entries[0].product.code;
            } else {
              activeParamType = (<FSProduct>cart.entries[0].product)
                .defaultCategory.code;
            }
            this.triggerPreviousStepSet(activatedRoute, activeParamType);
            this.triggerNextStepSet(activatedRoute, activeParamType);
          }
        })
        .unsubscribe();
    }
  }

  triggerPreviousStepSet(
    activatedRoute: ActivatedRoute,
    activeParamType: string
  ) {
    const previousStepNumber: number =
      this.getCurrentStepIndex(activatedRoute) - 1;
    this.setPreviousStep(
      activeParamType,
      this.steps[previousStepNumber].routeName
    );
  }

  triggerNextStepSet(activatedRoute: ActivatedRoute, activeParamType: string) {
    const nextStepNumber: number = this.getCurrentStepIndex(activatedRoute) + 1;
    if (this.steps[nextStepNumber]) {
      this.setNextStep(activeParamType, this.steps[nextStepNumber].routeName);
    }
  }

  getPreviousCheckoutStepUrl(activatedRoute: ActivatedRoute): string {
    const stepIndex = this.getCurrentStepIndex(activatedRoute);

    return stepIndex >= 0 && this.steps[stepIndex - 1]
      ? this.getUrlFromStepRoute(this.steps[stepIndex - 1].routeName)
      : null;
  }

  getInitialStepForCategory(category: string): FSCheckoutStep {
    return this.fsCheckoutConfig.checkout?.steps?.find(step => {
      return !(<FSCheckoutStep>step).restrictedCategories.includes(category);
    });
  }

  // Class is implemented in order to fix this behavior from spartacus. Once real fix is implemented class can be removed.
  private getUrlFromActivatedRoute(
    activatedRoute: ActivatedRoute | CmsActivatedRouteSnapshot
  ) {
    return activatedRoute &&
      activatedRoute.routeConfig &&
      activatedRoute.routeConfig.path
      ? `/${activatedRoute.routeConfig.path}`
      : null;
  }

  private getUrlFromStepRoute(stepRoute: string) {
    return this.fsRoutingConfigService.getRouteConfig(stepRoute).paths[0];
  }

  public isProductStep(stepRoute: string) {
    const route = this.getUrlFromStepRoute(stepRoute);
    return !!route.includes(':productCode');
  }
}
