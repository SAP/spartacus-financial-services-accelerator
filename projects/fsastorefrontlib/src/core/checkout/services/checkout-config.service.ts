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
} from '@spartacus/storefront';
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

  steps: FSCheckoutStep[] = this.fsCheckoutConfig.checkout.steps;
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

  getCheckoutStep(currentStepType: CheckoutStepType): FSCheckoutStep {
    return this.steps[this.getFSCheckoutStepIndex('type', currentStepType)];
  }

  getFirstCheckoutStepRoute(): string {
    return this.steps[0].routeName;
  }

  getNextCheckoutStepUrl(activatedRoute: ActivatedRoute): string {
    const stepIndex = this.getCurrentStepIndex(activatedRoute);

    return stepIndex >= 0 && this.steps[stepIndex + 1]
      ? this.getFSStepUrlFromStepRoute(this.steps[stepIndex + 1].routeName)
      : null;
  }

  getPreviousCheckoutStepUrl(activatedRoute: ActivatedRoute): string {
    const stepIndex = this.getCurrentStepIndex(activatedRoute);

    return stepIndex >= 0 && this.steps[stepIndex - 1]
      ? this.getFSStepUrlFromStepRoute(this.steps[stepIndex - 1].routeName)
      : null;
  }

  getFSStepUrlFromStepRoute(stepRoute: string): string {
    return this.fsRoutingConfigService.getRouteConfig(stepRoute).paths[0];
  }

  getFSCheckoutStepIndex(key: string, value: any): number | null {
    return key && value
      ? this.steps.findIndex((step: FSCheckoutStep) =>
          step[key].includes(value)
        )
      : null;
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
        const nextStepNumber: number =
          this.getCurrentStepIndex(activatedRoute) + 1;
        if (
          this.steps[nextStepNumber] &&
          this.steps[nextStepNumber].routeName &&
          this.steps[previousStepNumber] &&
          this.steps[previousStepNumber].routeName
        ) {
          const previousCheckoutStep: string = this.steps[previousStepNumber]
            .routeName;
          this.setPreviousStep(data, previousCheckoutStep);
          const nextCheckoutStep: string = this.steps[nextStepNumber].routeName;
          this.setNextStep(data, nextCheckoutStep);
        }
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
