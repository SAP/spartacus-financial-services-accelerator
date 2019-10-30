import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import * as fromPolicyStore from '../../../lib/my-account/assets/store';
import { Store, select } from '@ngrx/store';
import { OccConfig } from '@spartacus/core';
import { PolicyService } from '../../../lib/my-account/assets/services/policy.service';

@Component({
  selector: 'fsa-policies',
  templateUrl: './policies.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PoliciesComponent implements OnInit {
  constructor(
    private store: Store<fromPolicyStore.UserState>,
    private config: OccConfig,
    protected policyService: PolicyService
  ) {}

  policies$;
  policiesLoaded$;

  ngOnInit() {
    this.policyService.loadPolicies();
    this.policies$ = this.store.pipe(select(fromPolicyStore.getPolicyData));
    this.policiesLoaded$ = this.store.pipe(
      select(fromPolicyStore.getPoliciesLoaded)
    );
  }

  public getBaseUrl() {
    return this.config.backend.occ.baseUrl || '';
  }
}
