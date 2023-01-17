import { Injectable } from '@angular/core';
import { CanActivate, UrlTree } from '@angular/router';
import { Observable, of } from 'rxjs';
import { RoutingService } from '@spartacus/core';

@Injectable({
  providedIn: 'root',
})
export class ApplicationConfirmationGuard implements CanActivate {
  constructor(private routingService: RoutingService) {}

  canActivate(): Observable<boolean | UrlTree> {
    if (localStorage.getItem('applicationConfirmation') === 'true') {
      return of(true);
    } else {
      this.routingService.go('/');
    }
  }
}
