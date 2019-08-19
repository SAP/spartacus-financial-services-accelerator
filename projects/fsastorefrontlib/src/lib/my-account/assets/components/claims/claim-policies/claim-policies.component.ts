import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { AuthService, OccConfig, RoutingService } from '@spartacus/core';
import { ClaimService, PolicyService } from '../../../services';
import * as fromPolicyStore from '../../../store';



@Component({
  selector: 'fsa-claim-policies',
  templateUrl: './claim-policies.component.html',
  styleUrls: ['./claim-policies.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ClaimPoliciesComponent implements OnInit {
  constructor(
    private store: Store<fromPolicyStore.UserState>,
    protected policyService: PolicyService,
    protected claimService: ClaimService,
    private config: OccConfig,
    private authService: AuthService,
    private routingService: RoutingService
  ) { }

  claimPolicies$;

  ngOnInit() {
    // Fixing insurances_auto until:
    // we get the BE part returning real categoryCode
    // we create dynamic content for FNOL page
    this.policyService.loadClaimPolicies('insurances_auto');
    this.claimPolicies$ = this.store.pipe(select(fromPolicyStore.getClaimPolicies));
  }
  public getBaseUrl() {
    return this.config.backend.occ.baseUrl || '';
  }

  createClaim(policyId, contractId) {
    this.authService.getUserToken().subscribe(token => {
      this.claimService.createClaim(token.userId, policyId, contractId);
      this.routingService.go({
        cxRoute: 'claims'
      });
    });
  }
}
