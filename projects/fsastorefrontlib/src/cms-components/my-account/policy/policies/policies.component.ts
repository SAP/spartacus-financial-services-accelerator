import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import * as fromPolicyStore from '../../../../core/my-account/store';
import { Store, select } from '@ngrx/store';
import { OccConfig, RoutingService } from '@spartacus/core';
import { AllowedFSRequestType } from './../../../../occ/occ-models/occ.models';
import {
  PolicyService,
  ClaimService,
  PolicyDataService,
} from '../../../../core/my-account/services';

export enum AllowedRequestType {
  FSCLAIM = 'FSCLAIM',
}

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

  isPolicyCategoryAllowed(
    allowedFSRequestTypes: AllowedFSRequestType[]
  ): boolean {
    if (
      allowedFSRequestTypes !== undefined &&
      allowedFSRequestTypes.length > 0
    ) {
      return (
        allowedFSRequestTypes
          .map(allowedRequestType => allowedRequestType.requestType.code)
          .indexOf(AllowedRequestType.FSCLAIM) > -1
      );
    }
  }
}
