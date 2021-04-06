import { Injectable } from '@angular/core';
import { CanActivate, UrlTree } from '@angular/router';
import {
  ActiveCartService,
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

  canActivate(): Observable<boolean | UrlTree> {
    const isQuoteBind = localStorage.getItem('bindingState');
    if (isQuoteBind) {
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
