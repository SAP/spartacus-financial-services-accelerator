import { Injectable, OnDestroy } from '@angular/core';
import { CanActivate } from '@angular/router';
import { RoutingService } from '@spartacus/core';
import { map } from 'rxjs/operators';
import { Observable, of, Subscription } from 'rxjs';
import { PolicyService } from '../../../../core/my-account/facade';
import { ClaimService } from './../../../../core/my-account/';

@Injectable({
  providedIn: 'root',
})
export class ClaimPoliciesGuard implements CanActivate, OnDestroy {
  private subscription: Subscription;

  constructor(
    protected routingService: RoutingService,
    protected policyService: PolicyService,
    protected claimService: ClaimService
  ) {}

  canActivate(): Observable<boolean> {
    // TODO: handle loading claims for every category
    this.policyService.loadClaimPolicies('insurances_auto');

    this.subscription = this.claimService
      .getClaimPolicies()
      .pipe(
        map(claimData => {
          if (
            claimData &&
            claimData.loaded &&
            claimData.claimPoliciesData &&
            !claimData.claimPoliciesData.insurancePolicies
          ) {
            this.routingService.go({ cxRoute: 'noClaims' });
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
