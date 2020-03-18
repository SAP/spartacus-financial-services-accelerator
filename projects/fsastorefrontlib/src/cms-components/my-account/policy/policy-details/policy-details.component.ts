import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  OnDestroy,
} from '@angular/core';
import { PolicyService } from '../../../../core/my-account/facade/policy.service';
import { RoutingService } from '@spartacus/core';
import { map } from 'rxjs/operators';
import { Subscription, combineLatest, Observable } from 'rxjs';
import { OccConfig } from '@spartacus/core';
import { ChangeRequestService } from './../../../../core/change-request/facade/change-request.service';
import { AllowedFSRequestType } from './../../../../occ/occ-models';

@Component({
  selector: 'fsa-policy-details',
  templateUrl: './policy-details.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PolicyDetailsComponent implements OnInit, OnDestroy {
  constructor(
    protected routingService: RoutingService,
    protected policyService: PolicyService,
    protected config: OccConfig,
    protected changeRequestService: ChangeRequestService
  ) {}

  policy$;
  subscription: Subscription;

  ngOnInit(): void {
    const params: Observable<any>[] = [
      this.routingService
        .getRouterState()
        .pipe(map(routingData => routingData.state.params.policyId)),
      this.routingService
        .getRouterState()
        .pipe(map(routingData => routingData.state.params.contractId)),
    ];
    this.subscription = combineLatest(params).subscribe(
      ([policyId, contractId]) => {
        if (policyId && contractId) {
          this.policyService.loadPolicyDetails(policyId, contractId);
        }
      }
    );
    this.policy$ = this.policyService.getPolicies();
  }

  getBaseUrl() {
    return this.config.backend.occ.baseUrl || '';
  }

  isChangeAllowed(
    allowedFSRequestTypes: AllowedFSRequestType[],
    requestType: string
  ): boolean {
    if (allowedFSRequestTypes) {
      return (
        allowedFSRequestTypes
          .filter(allowedRequestType => allowedRequestType.requestType)
          .map(allowedRequestType => allowedRequestType.requestType.code)
          .indexOf(requestType) > -1
      );
    }
  }

  changePolicyDetails(policyId, contractId, changeRequestType) {
    this.changeRequestService.createChangeRequest(
      'hfgfg',
      contractId,
      changeRequestType
    );
    this.subscription.add(
      this.changeRequestService
        .getChangeRequest()
        .pipe(
          map(changeRequest => {
            if (changeRequest && changeRequest.configurationSteps) {
              this.routingService.go({
                cxRoute: changeRequest.configurationSteps[0].pageLabelOrId,
              });
            }
          })
        )
        .subscribe()
    );
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
