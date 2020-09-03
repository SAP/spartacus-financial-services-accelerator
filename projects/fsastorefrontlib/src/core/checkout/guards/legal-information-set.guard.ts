import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { RoutingService } from '@spartacus/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { FSCheckoutService } from './../../checkout/facade/checkout.service';

@Injectable({
  providedIn: 'root',
})
export class LegalInformationSetGuard implements CanActivate {
  constructor(
    private routingService: RoutingService,
    private checkoutService: FSCheckoutService
  ) {}

  canActivate(): Observable<boolean> {
    return this.checkoutService.getLegalInformation().pipe(
      map(legalInformaton => {
        if (!legalInformaton) {
          this.routingService.go({ cxRoute: 'legalInformation' });
          return false;
        }
        return true;
      })
    );
  }
}
