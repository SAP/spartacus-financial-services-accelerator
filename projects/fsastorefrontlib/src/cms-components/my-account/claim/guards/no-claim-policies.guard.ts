import { Injectable, OnDestroy } from '@angular/core';
import { CanActivate } from '@angular/router';
import { RoutingService } from '@spartacus/core';
import { map } from 'rxjs/operators';
import { Observable, of, Subscription } from 'rxjs';
import { ClaimService } from './../../../../core/my-account/';

@Injectable({
  providedIn: 'root',
})
export class NoClaimPoliciesGuard implements CanActivate, OnDestroy {
  private subscription: Subscription;

  constructor(
    protected routingService: RoutingService,
    protected claimService: ClaimService
  ) {}

  canActivate(): Observable<boolean> {
    this.subscription = this.claimService
      .getClaimPolicies()
      .pipe(
        map(claimData => {
          if (
            claimData &&
            claimData.loaded &&
            claimData.claimPoliciesData &&
            claimData.claimPoliciesData.insurancePolicies
          ) {
            this.routingService.go({ cxRoute: 'claimsPage' });
            return of(false);
          }
        })
      )
      .subscribe();
    return of(true);
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
