import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  OnDestroy,
} from '@angular/core';
import { OccConfig, RoutingService } from '@spartacus/core';
import {
  ClaimService,
  PolicyService,
} from '../../../../core/my-account/facade';
import {
  AllowedFSRequestType,
  RequestType,
} from './../../../../occ/occ-models/occ.models';
import { map } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
  selector: 'cx-fs-policies',
  templateUrl: './policies.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PoliciesComponent implements OnInit, OnDestroy {
  constructor(
    protected config: OccConfig,
    protected policyService: PolicyService,
    protected routingService: RoutingService,
    protected claimService: ClaimService
  ) {}

  policies$;
  policiesLoaded$;

  private subscription = new Subscription();

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
      this.subscription.add(
        this.claimService
          .getCurrentClaim()
          .pipe(
            map(claim => {
              if (claim && claim.configurationSteps) {
                this.routingService.go({
                  cxRoute: claim.configurationSteps[0].pageLabelOrId,
                });
              }
            })
          )
          .subscribe()
      );
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
          .indexOf(RequestType.FSCLAIM) > -1
      );
    }
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
