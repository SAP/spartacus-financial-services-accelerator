import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { ActiveCartService, RoutingService } from '@spartacus/core';
import { combineLatest, Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { FSCart } from './../../../occ/occ-models/occ.models';

@Injectable({
  providedIn: 'root',
})
export class PersonalDetailsSetGuard implements CanActivate {
  constructor(
    protected routingService: RoutingService,
    protected cartService: ActiveCartService
  ) {}

  canActivate(): Observable<boolean> {
    return combineLatest([
      this.cartService.getActive(),
      this.cartService.isStable(),
    ]).pipe(
      filter(([_, loaded]) => loaded),
      map(([cart, _]) => {
        if (cart?.entries?.length > 0) {
          const personalDetailsForm = (<FSCart>cart).entries[0]?.formData;
          if (!personalDetailsForm) {
            this.routingService.go({ cxRoute: 'checkoutPersonalDetails' });
            return false;
          }
        }
        return true;
      })
    );
  }
}
