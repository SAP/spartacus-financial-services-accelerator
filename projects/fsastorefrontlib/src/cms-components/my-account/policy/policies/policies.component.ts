import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { OccConfig, RoutingService } from '@spartacus/core';
import { AllowedFSRequestType } from './../../../../occ/occ-models/occ.models';
import {
  PolicyService,
  ClaimService,
} from '../../../../core/my-account/facade';

const FSCLAIM = 'FSCLAIM';

@Component({
  selector: 'fsa-policies',
  templateUrl: './policies.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PoliciesComponent implements OnInit {
  constructor(
    protected config: OccConfig,
    protected policyService: PolicyService,
    protected routingService: RoutingService,
    protected claimService: ClaimService
  ) {}

  policies$;
  policiesLoaded$;

  ngOnInit() {
    this.policyService.loadPolicies();
    this.policies$ = this.policyService.getPolicies();
    this.policiesLoaded$ = this.policyService.getLoaded();
  }

  getBaseUrl() {
    return this.config.backend.occ.baseUrl || '';
  }

  startClaim(policyId: string, contractNumber: string) {
    if (policyId && contractNumber) {
      this.claimService.createClaim(policyId, contractNumber);
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
          .indexOf(FSCLAIM) > -1
      );
    }
  }
}
