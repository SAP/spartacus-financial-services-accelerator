import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import {
  ActiveCartService,
  GlobalMessageService,
  GlobalMessageType,
  RoutingService,
} from '@spartacus/core';
import { Observable } from 'rxjs';
import { filter, map, take } from 'rxjs/operators';
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

  canActivate(): Observable<boolean> {
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
}
