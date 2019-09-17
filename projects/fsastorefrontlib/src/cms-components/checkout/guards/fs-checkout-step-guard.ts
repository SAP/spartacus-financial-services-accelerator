import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { CmsActivatedRouteSnapshot, RoutingConfigService, CartService } from '@spartacus/core';
import { Observable, of } from 'rxjs';
import { FSCheckoutStep } from '../../../lib/checkout/assets/components/checkout-progress/fs-checkout-step.component';
import { FSCheckoutConfigService } from '../../../lib/checkout/assets/services';
import { FSProduct } from '../../../lib/occ-models';

@Injectable({
    providedIn: 'root'
})
export class FSCheckoutStepGuard implements CanActivate {
    constructor(
        protected routingConfigService: RoutingConfigService,
        protected router: Router,
        protected fsCheckoutConfigService: FSCheckoutConfigService,
        protected cartService: CartService
    ) { }

    currentCategory: string;

    canActivate(route: CmsActivatedRouteSnapshot): Observable<boolean | UrlTree> {
        const currentStepIndex = this.fsCheckoutConfigService.getCurrentStepIndex(route);
        const currentStep = <FSCheckoutStep>(
            this.fsCheckoutConfigService.steps[currentStepIndex]
        );
        const nextStep = <FSCheckoutStep>(
            this.fsCheckoutConfigService.steps[currentStepIndex + 1]
        );
        this.cartService.getActive().subscribe(cart => {
            if (
                cart.deliveryOrderGroups &&
                cart.deliveryOrderGroups.length > 0 &&
                cart.deliveryOrderGroups[0].entries &&
                cart.deliveryOrderGroups[0].entries.length > 0
            ) {
                const fsProduct: FSProduct =
                    cart.deliveryOrderGroups[0].entries[0].product;
                this.currentCategory = fsProduct.defaultCategory.code;
            }
        });

        return currentStep.restrictedCategories.includes(this.currentCategory)
            ? of(
                this.router.parseUrl(this.routingConfigService
                    .getRouteConfig(nextStep.routeName)
                    .paths[0])
            ) : of(true);
    }
}
