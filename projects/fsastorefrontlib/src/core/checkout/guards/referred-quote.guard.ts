import { Injectable } from '@angular/core';
import { CanActivate, UrlTree } from '@angular/router';
import {
  ActiveCartService,
  GlobalMessageService,
  GlobalMessageType,
  RoutingService,
} from '@spartacus/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
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

  canActivate(): Observable<boolean | UrlTree> {
    return this.cartService.getActive().pipe(
      map(cart => {
        if ((<FSCart>cart).insuranceQuote) {
          const quoteWorkflowStatus = (<FSCart>cart).insuranceQuote
            .quoteWorkflowStatus;
          if (quoteWorkflowStatus.code === QuoteWorkflowStatusType.REFERRED) {
            console.log('referred');
            this.globalMessageService.add(
              { key: 'quote.referredQuoteDescription' },
              GlobalMessageType.MSG_TYPE_INFO
            );
            this.routingService.go({ cxRoute: 'home' });
            return false;
          } else {
            return true;
          }
        }
      })
    );
  }
}
