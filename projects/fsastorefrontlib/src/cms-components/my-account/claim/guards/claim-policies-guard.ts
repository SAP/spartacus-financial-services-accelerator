import { Injectable, OnDestroy } from '@angular/core';
import { CanActivate } from '@angular/router';
import { RoutingService } from '@spartacus/core';
import { select, Store } from '@ngrx/store';
import { map } from 'rxjs/operators';
import { Observable, of, Subscription } from 'rxjs';
import { PolicyService } from '../../../../core/my-account/services';
import * as fromPolicyStore from '../../../../core/my-account/store';

@Injectable({
  providedIn: 'root',
})
export class ClaimPoliciesGuard implements CanActivate, OnDestroy {
  private subscription: Subscription;
  private validPolicies;

  constructor(
    protected store: Store<fromPolicyStore.UserState>,
    private routingService: RoutingService,
    protected policyService: PolicyService
  ) {}

  claimPolicies$: Observable<any>;

  canActivate(): Observable<boolean> {
    {
      // Fixing insurances_auto until:
      // we get the BE part returning real categoryCode
      // we create dynamic content for FNOL page
      this.policyService.loadClaimPolicies('insurances_auto');
      this.subscription = this.store
        .pipe(
          select(fromPolicyStore.getClaimPoliciesState),
          map(policies => {
            if (policies && policies.loaded) {
              this.validPolicies = policies;
              if (
                policies.claimPoliciesData &&
                !policies.claimPoliciesData.insurancePolicies
              ) {
                this.routingService.go({ cxRoute: 'noClaims' });
                return of(false);
              }
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
