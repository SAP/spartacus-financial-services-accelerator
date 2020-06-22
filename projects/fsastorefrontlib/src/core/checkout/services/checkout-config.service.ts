import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  CmsActivatedRouteSnapshot,
  RoutingConfigService,
} from '@spartacus/core';
import {
  CheckoutConfig,
  CheckoutConfigService,
  CheckoutStepType,
  CurrentProductService,
} from '@spartacus/storefront';
import { BehaviorSubject } from 'rxjs';
import {
  FSCheckoutStep,
  ActiveCategoryStep,
  FSCart,
  FSProduct,
} from '../../../occ';
import { FSCartService } from '../../cart';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class FSCheckoutConfigService extends CheckoutConfigService {
  constructor(
    protected fsCheckoutConfig: CheckoutConfig,
    protected fsRoutingConfigService: RoutingConfigService,
    protected cartService: FSCartService,
    protected currentProductService: CurrentProductService
  ) {
    super(fsCheckoutConfig, fsRoutingConfigService);
  }

  steps: FSCheckoutStep[] = this.fsCheckoutConfig.checkout.steps;
  previousCheckoutStepSource = new BehaviorSubject<ActiveCategoryStep>(null);
  previousStep = this.previousCheckoutStepSource.asObservable();
  nextCheckoutStepSource = new BehaviorSubject<ActiveCategoryStep>(null);
  nextStep = this.nextCheckoutStepSource.asObservable();

  activeParamType: string;

  setPreviousStep(activeCategory: string, step: string) {
    this.previousCheckoutStepSource.next({ activeCategory, step });
  }
  setNextStep(activeCategory: string, step: string) {
    this.nextCheckoutStepSource.next({ activeCategory, step });
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
    const previousUrl = this.getPreviousCheckoutStepUrl(activatedRoute);
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
            this.activeParamType = cart.entries[0].product.code;
            console.log('productCode', this.activeParamType);
          } else if (paramType === 'categoryCode' || paramType === 'formCode') {
            this.activeParamType = (<FSProduct>(
              cart.entries[0].product
            )).defaultCategory.code;
            console.log('category', this.activeParamType);
          }
          const previousStepNumber: number =
            this.getCurrentStepIndex(activatedRoute) - 1;
          const nextStepNumber: number =
            this.getCurrentStepIndex(activatedRoute) + 1;
          this.setPreviousStep(
            this.activeParamType,
            this.steps[previousStepNumber].routeName
          );
          this.setNextStep(
            this.activeParamType,
            this.steps[nextStepNumber].routeName
          );
          if (this.steps.length > 0) {
            console.log(this.steps[previousStepNumber].routeName);
            console.log(this.steps[nextStepNumber].routeName);
          }
        }
      })
      .unsubscribe();
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
