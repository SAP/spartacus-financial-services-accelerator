import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  CmsActivatedRouteSnapshot,
  RoutingConfigService,
} from '@spartacus/core';
import { CheckoutConfig, CheckoutConfigService } from '@spartacus/storefront';
import { CategoryService } from './category/category.service';
import { Subscription, Observable } from 'rxjs';
import { FSCheckoutStep } from '../../../occ';

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

  private subscription = new Subscription();
  activeCategory$: Observable<string>;

  // restricted iz default-checkout-config-a

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

  filterSteps(activeCategory, activatedRoute) {
    this.steps = this.steps.filter(step => {
      return (
        !(<FSCheckoutStep>step).restrictedCategories ||
        (<FSCheckoutStep>step).restrictedCategories.indexOf(activeCategory) ===
          -1
      );
    });
    //   const currentStepNumber: number = this.getCurrentStepIndex(activatedRoute);
    //   console.log(this.steps[currentStepNumber]);
    //   console.log(activeCategory);
    console.log(activatedRoute);
  }

  // filterSteps(): FSCheckoutStep[] {
  //   this.subscription.add(
  //     this.categoryService.getActiveCategory().subscribe(activeCategory => {
  //       if (activeCategory) {
  //         this.steps = this.steps.filter(step => {
  //           return (
  //             !(<FSCheckoutStep>step).restrictedCategories ||
  //             (<FSCheckoutStep>step).restrictedCategories.indexOf(
  //               activeCategory
  //             ) === -1
  //           );
  //         });
  //       }
  //     })
  //   );
  // }

  // getPreviousCheckoutStepUrl(activatedRoute: ActivatedRoute): string {
  //   const stepIndex = this.getCurrentStepIndex(activatedRoute);

  //   return stepIndex >= 0 && this.steps[stepIndex - 1]
  //     ? this.getStepUrlFromStepRoute(this.steps[stepIndex - 1].routeName)
  //     : null;
  // }

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
