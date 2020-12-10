import { Injectable } from '@angular/core';
import { CanActivate, UrlTree } from '@angular/router';
import {
  ActiveCartService,
  CmsActivatedRouteSnapshot,
  GlobalMessageService,
  GlobalMessageType,
  RoutingService,
} from '@spartacus/core';
import { Observable, of } from 'rxjs';
import { filter, map, take } from 'rxjs/operators';
import { BindingStateType, FSCart } from './../../../occ/occ-models/occ.models';
import { FSCheckoutConfigService } from '../../../core/checkout/services';

@Injectable({
  providedIn: 'root',
})
export class BindQuoteGuard implements CanActivate {
  constructor(
    protected routingService: RoutingService,
    protected cartService: ActiveCartService,
    protected globalMessageService: GlobalMessageService,
    protected fsCheckoutConfigService: FSCheckoutConfigService
  ) {}

  protected readonly CART_CREATION_CHECKOUT_STEPS = [
    'comparisonCheckoutStep',
    'configureProductStep',
  ];

  canActivate(route: CmsActivatedRouteSnapshot): Observable<boolean | UrlTree> {
    const currentStepIndex = this.fsCheckoutConfigService.getCurrentStepIndex(
      route
    );
    const sourceStep = this.fsCheckoutConfigService.steps[currentStepIndex - 1];
    if (
      sourceStep &&
      !this.CART_CREATION_CHECKOUT_STEPS.includes(sourceStep.id)
    ) {
      return this.cartService.getActive().pipe(
        filter(cart => !!cart.code),
        take(1),
        map(cart => {
          const bindingState = (<FSCart>cart).insuranceQuote?.state?.code;
          if (bindingState === BindingStateType.BIND) {
            this.globalMessageService.add(
              { key: 'quote.boundQuoteDescription' },
              GlobalMessageType.MSG_TYPE_INFO
            );
            this.routingService.go({ cxRoute: 'home' });
            return false;
          }
          return true;
        })
      );
    }
    return of(true);
  }
}
