import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  CmsActivatedRouteSnapshot,
  RoutingConfigService,
} from '@spartacus/core';
import { CheckoutConfig, CheckoutConfigService } from '@spartacus/storefront';

@Injectable({
  providedIn: 'root',
})
export class FSCheckoutConfigService extends CheckoutConfigService {
  constructor(
    protected fsCheckoutConfig: CheckoutConfig,
    protected fsRoutingConfigService: RoutingConfigService
  ) {
    super(fsCheckoutConfig, fsRoutingConfigService);
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
