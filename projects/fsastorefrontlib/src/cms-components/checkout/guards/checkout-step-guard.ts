import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import {
  CmsActivatedRouteSnapshot,
  RoutingConfigService,
} from '@spartacus/core';
import { Observable } from 'rxjs';
import { filter, map, take } from 'rxjs/operators';
import { FSCheckoutConfigService } from '../../../core/checkout/services';
import { FSProduct } from '../../../occ/occ-models';
import { FSCartService } from './../../../core/cart/facade/cart.service';

@Injectable({
  providedIn: 'root',
})
export class CheckoutStepGuard implements CanActivate {
  constructor(
    protected routingConfigService: RoutingConfigService,
    protected router: Router,
    protected fsCheckoutConfigService: FSCheckoutConfigService,
    protected cartService: FSCartService
  ) {}
  currentCategory: string;

  canActivate(route: CmsActivatedRouteSnapshot): Observable<boolean | UrlTree> {
    const currentStepIndex =
      this.fsCheckoutConfigService.getCurrentStepIndex(route);
    const currentStep = this.fsCheckoutConfigService.steps[currentStepIndex];
    const nextStep = this.fsCheckoutConfigService.steps[currentStepIndex + 1];
    return this.cartService.getActive().pipe(
      filter(cart => !!cart.code),
      take(1),
      map(cart => {
        {
          if (cart?.deliveryOrderGroups[0]?.entries?.length) {
            const fsProduct: FSProduct =
              cart.deliveryOrderGroups[0].entries[0].product;
            this.currentCategory = fsProduct.defaultCategory.code;

            return currentStep.restrictedCategories.includes(
              this.currentCategory
            )
              ? this.router.parseUrl(
                  this.routingConfigService.getRouteConfig(nextStep.routeName)
                    .paths[0]
                )
              : true;
          }
        }
      })
    );
  }
}
