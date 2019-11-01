import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import * as fromPolicyStore from '../../store';
import { Store, select } from '@ngrx/store';
import { OccConfig, RoutingService } from '@spartacus/core';
import { PolicyService, ClaimService, PolicyDataService } from '../../services';

@Component({
  selector: 'fsa-policies',
  templateUrl: './policies.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PoliciesComponent implements OnInit {
  constructor(
    private store: Store<fromPolicyStore.UserState>,
    private config: OccConfig,
    protected policyService: PolicyService,
    protected routingService: RoutingService,
    protected claimService: ClaimService,
    protected policyData: PolicyDataService
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

  startClaim(policyId: string, contractNumber: string) {
    if (policyId && contractNumber) {
      this.claimService.createClaim(
        this.policyData.userId,
        policyId,
        contractNumber
      );
      this.routingService.go({
        cxRoute: 'fnolIncidentPage',
      });
    }
  }
}
