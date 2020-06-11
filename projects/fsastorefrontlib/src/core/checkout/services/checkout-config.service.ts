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
    protected fsRoutingConfigService: RoutingConfigService,
    protected activatedRoute: ActivatedRoute
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
      if (
        currentStepUrl &&
        currentStepUrl.includes(this.getUrlFromStepRoute(step.routeName))
      ) {
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
    if (activatedRoute) {
      const routeSnapshot = (<ActivatedRoute>activatedRoute).snapshot;
      const cmsRouteSnapshot = <CmsActivatedRouteSnapshot>activatedRoute;
      if (routeSnapshot) {
        return routeSnapshot.url ? `/${routeSnapshot.url.join('/')}` : null;
      }
      if (cmsRouteSnapshot) {
        return cmsRouteSnapshot.url
          ? `${cmsRouteSnapshot.url.join('/')}`
          : null;
      }
    }
    return null;
  }

  private getUrlFromStepRoute(stepRoute: string) {
    return this.fsRoutingConfigService
      .getRouteConfig(stepRoute)
      .paths[0].split(':')[0];
  }
}
