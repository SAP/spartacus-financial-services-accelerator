import { Injectable } from '@angular/core';
import { CanActivate, UrlTree } from '@angular/router';
import {
  ActiveCartService,
  GlobalMessageService,
  GlobalMessageType,
  RoutingService,
} from '@spartacus/core';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { BindingStateType, FSCart } from './../../../occ/occ-models/occ.models';

@Injectable({
  providedIn: 'root',
})
export class BindQuoteGuard implements CanActivate {
  constructor(
    protected routingService: RoutingService,
    protected cartService: ActiveCartService,
    protected globalMessageService: GlobalMessageService
  ) {}

  canActivate(): Observable<boolean | UrlTree> {
    return this.cartService.getActive().pipe(
      filter(cart => cart.code !== undefined),
      map(cart => {
        if ((<FSCart>cart).insuranceQuote) {
          const bindingState = (<FSCart>cart).insuranceQuote.state.code;
          if (bindingState === BindingStateType.BIND) {
            this.globalMessageService.add(
              { key: 'quote.boundQuoteDescription' },
              GlobalMessageType.MSG_TYPE_INFO
            );
            this.routingService.go({ cxRoute: 'home' });
            return false;
          }
        }
        return true;
      })
    );
  }
}
