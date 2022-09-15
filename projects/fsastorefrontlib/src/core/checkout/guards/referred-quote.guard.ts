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
import {
  FSCart,
  QuoteWorkflowStatusType,
} from './../../../occ/occ-models/occ.models';

@Injectable({
  providedIn: 'root',
})
export class ReferredQuoteGuard implements CanActivate {
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
        const quoteWorkflowStatus = (<FSCart>cart)?.insuranceQuote
          ?.quoteWorkflowStatus;
        if (quoteWorkflowStatus.code === QuoteWorkflowStatusType.REFERRED) {
          this.globalMessageService.add(
            { key: 'quote.referredQuoteDescription' },
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
