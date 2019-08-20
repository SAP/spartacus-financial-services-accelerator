import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import {
  CmsActivatedRouteSnapshot,
  RoutingConfigService
} from '@spartacus/core';
import { Observable, of } from 'rxjs';
import { FSCheckoutStep } from './../../../lib/checkout/assets/components/checkout-progress/fs-checkout-step.component';
import { FSCheckoutConfigService } from './../../../lib/checkout/assets/services';

@Injectable({
  providedIn: 'root'
})
export class GeneralInformationGuard implements CanActivate {
  constructor(
    protected routingConfigService: RoutingConfigService,
    protected router: Router,
    protected fsCheckoutConfigService: FSCheckoutConfigService
  ) {}

  category;

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

    const nextStepUrl = this.routingConfigService.getRouteConfig(
      nextStep.routeName
    ).paths[0];

    if (currentStep.hideStepCategoriesRegex) {
      currentStep.hideStepCategoriesRegex.forEach(
        regex =>
          this.category = route.url.find(url =>
            new RegExp(regex).test(url.path)
          )
      );
   }

    return this.category && this.category.path
      ? of(
          this.router.parseUrl(
            nextStepUrl.replace(':categoryCode', this.category.path)
          )
        )
      : of(true);
  }
}
