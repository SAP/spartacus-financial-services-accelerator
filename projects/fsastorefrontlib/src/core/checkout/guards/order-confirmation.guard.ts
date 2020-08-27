import { Injectable } from '@angular/core';
import { CanActivate, UrlTree } from '@angular/router';
import { Observable, of } from 'rxjs';
import { RoutingService } from '@spartacus/core';
import { FSCheckoutService } from './../../checkout/facade/checkout.service';

@Injectable({
  providedIn: 'root',
})
export class OrderConfirmationGuard implements CanActivate {
  constructor(
    private checkoutService: FSCheckoutService,
    private routingService: RoutingService
  ) {}

  canActivate(): Observable<boolean | UrlTree> {
    if (this.checkoutService.orderPlaced) {
      return of(true);
    } else {
      this.routingService.go('/');
    }
  }
}
