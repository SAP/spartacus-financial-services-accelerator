import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Store, select } from '@ngrx/store';

import * as fromPolicyStore from '../../../store';
import { PolicyService } from '../../../services';


@Component({
  selector: 'fsa-claim-policies',
  templateUrl: './claim-policies.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ClaimPoliciesComponent implements OnInit {
  constructor(
    private store: Store<fromPolicyStore.UserState>,
    protected policyService: PolicyService
  ) {}

  claimPolicies$;

  ngOnInit() {
    // Fixing insurances_auto until:
    // we get the BE part returning real categoryCode
    // we create dynamic content for FNOL page
    this.policyService.loadClaimPolicies('insurances_auto');
    this.claimPolicies$ = this.store.pipe(select(fromPolicyStore.getClaimPolicies));

  }
}
