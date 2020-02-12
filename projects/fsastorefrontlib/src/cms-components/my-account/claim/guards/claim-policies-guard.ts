import { Injectable, OnDestroy } from '@angular/core';
import { CanActivate } from '@angular/router';
import { RoutingService } from '@spartacus/core';
import { select, Store } from '@ngrx/store';
import { map } from 'rxjs/operators';
import { Observable, of, Subscription } from 'rxjs';
import { PolicyService } from '../../../../core/my-account/facade';
import * as fromPolicyStore from '../../../../core/my-account/store';

@Injectable({
  providedIn: 'root',
})
export class ClaimPoliciesGuard implements CanActivate, OnDestroy {
  private subscription: Subscription;

  constructor(
    protected store: Store<fromPolicyStore.UserState>,
    private routingService: RoutingService,
    protected policyService: PolicyService
  ) {}

  canActivate(): Observable<boolean> {
    {
      // TODO: handle loading claims for every category
      this.policyService.loadClaimPolicies('insurances_auto');

      this.subscription = this.store
        .pipe(
          select(fromPolicyStore.getClaimPoliciesState),
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
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
