import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { RoutingService } from '@spartacus/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { PolicyService } from '../../../../core/my-account/services';
import * as fromPolicyStore from '../../../../core/my-account/store';

@Injectable({
  providedIn: 'root',
})
export class ClaimPoliciesGuard implements CanActivate {
  constructor(
    protected store: Store<fromPolicyStore.UserState>,
    private routingService: RoutingService,
    protected policyService: PolicyService
  ) { }

  claimPolicies$: Observable<any>;

  canActivate(): Observable<boolean> {
    {
      // Fixing insurances_auto until:
      // we get the BE part returning real categoryCode
      // we create dynamic content for FNOL page
      this.policyService.loadClaimPolicies('insurances_auto');
      this.claimPolicies$ = this.store.pipe(
        select(fromPolicyStore.getClaimPolicies)
      );
      return this.claimPolicies$.pipe(
        map(validPolicies => {
          console.log(validPolicies);
          if (validPolicies && !validPolicies.insurancePolicies) {
            this.routingService.go({ cxRoute: 'noClaims' });
            return false;
          }
          return true;
        })
      );
    }
  }
}
