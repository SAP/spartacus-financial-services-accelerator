import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  CmsActivatedRouteSnapshot,
  RoutingConfigService,
} from '@spartacus/core';
import { CheckoutConfig, CheckoutConfigService } from '@spartacus/storefront';
import { BehaviorSubject } from 'rxjs';
import { StepResult, FSCart, FSCheckoutStep, FSProduct } from '../../../occ';
import { FSCartService } from '../../cart';

@Injectable({
  providedIn: 'root',
})
export class FSCheckoutConfigService extends CheckoutConfigService {
  constructor(
    protected fsCheckoutConfig: CheckoutConfig,
    protected fsRoutingConfigService: RoutingConfigService,
    protected cartService: FSCartService
  ) {
    super(fsCheckoutConfig, fsRoutingConfigService);
  }

  steps: FSCheckoutStep[] = this.fsCheckoutConfig.checkout.steps;
  previousCheckoutStepSource = new BehaviorSubject<StepResult>(null);
  previousStep = this.previousCheckoutStepSource.asObservable();
  nextCheckoutStepSource = new BehaviorSubject<StepResult>(null);
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

  setBackNextSteps(activatedRoute: ActivatedRoute) {
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
            this.setSteps(activatedRoute, activeParamType);
          }
        })
        .unsubscribe();
    }
  }

  setSteps(activatedRoute: ActivatedRoute, activeParamType: string) {
    const previousStepNumber: number =
      this.getCurrentStepIndex(activatedRoute) - 1;
    const nextStepNumber: number = this.getCurrentStepIndex(activatedRoute) + 1;
    this.setPreviousStep(
      activeParamType,
      this.steps[previousStepNumber].routeName
    );
    if (this.steps[nextStepNumber]) {
      this.setNextStep(activeParamType, this.steps[nextStepNumber].routeName);
    }
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
}
