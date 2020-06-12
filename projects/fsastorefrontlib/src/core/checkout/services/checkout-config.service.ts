import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  CmsActivatedRouteSnapshot,
  RoutingConfigService,
} from '@spartacus/core';
import { CheckoutConfig, CheckoutConfigService } from '@spartacus/storefront';
import { CategoryService } from './category/category.service';
import { BehaviorSubject } from 'rxjs';
import { FSCheckoutStep, ActiveCategoryStep } from '../../../occ';

@Injectable({
  providedIn: 'root',
})
export class FSCheckoutConfigService extends CheckoutConfigService {
  constructor(
    protected fsCheckoutConfig: CheckoutConfig,
    protected fsRoutingConfigService: RoutingConfigService,
    protected categoryService: CategoryService
  ) {
    super(fsCheckoutConfig, fsRoutingConfigService);
  }

  previousCheckoutStepSource = new BehaviorSubject<ActiveCategoryStep>(null);
  previousStep = this.previousCheckoutStepSource.asObservable();
  nextCheckoutStepSource = new BehaviorSubject<ActiveCategoryStep>(null);
  nextStep = this.nextCheckoutStepSource.asObservable();

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

  filterSteps(activatedRoute) {
    this.categoryService.getActiveCategory().subscribe(data => {
      if (data) {
        this.steps = this.steps.filter(step => {
          return (
            !(<FSCheckoutStep>step).restrictedCategories ||
            (<FSCheckoutStep>step).restrictedCategories.indexOf(data) === -1
          );
        });
        const previousStepNumber: number =
          this.getCurrentStepIndex(activatedRoute) - 1;
        const previousCheckoutStep: string = this.steps[previousStepNumber]
          .routeName;
        this.setPreviousStep(data, previousCheckoutStep);

        const nextStepNumber: number =
          this.getCurrentStepIndex(activatedRoute) + 1;
        const nextCheckoutStep: string = this.steps[nextStepNumber].routeName;
        this.setNextStep(data, nextCheckoutStep);
      }
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
}
