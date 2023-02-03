import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import {
  CmsActivatedRouteSnapshot,
  RoutingConfigService,
} from '@spartacus/core';
import { Observable, of } from 'rxjs';
import { FSCheckoutConfigService } from '../../../core/checkout/services';

@Injectable({
  providedIn: 'root',
})
export class CategoryStepGuard implements CanActivate {
  constructor(
    protected routingConfigService: RoutingConfigService,
    protected router: Router,
    protected fsCheckoutConfigService: FSCheckoutConfigService
  ) {}

  canActivate(route: CmsActivatedRouteSnapshot): Observable<boolean | UrlTree> {
    let currentCategory;
    const currentStepIndex =
      this.fsCheckoutConfigService.getCurrentStepIndex(route);

    const currentStep = this.fsCheckoutConfigService.steps[currentStepIndex];

    const nextStep = this.fsCheckoutConfigService.steps[currentStepIndex + 1];

    const nextStepUrl = this.routingConfigService.getRouteConfig(
      nextStep.routeName
    ).paths[0];

    if (currentStep && currentStep.restrictedCategories) {
      currentStep.restrictedCategories.forEach(restrictedCategory => {
        if (route.url.find(url => url.path === restrictedCategory)) {
          currentCategory = restrictedCategory;
        }
      });
    }

    return currentCategory
      ? of(
          this.router.parseUrl(
            nextStepUrl.replace(':categoryCode', currentCategory)
          )
        )
      : of(true);
  }
}
