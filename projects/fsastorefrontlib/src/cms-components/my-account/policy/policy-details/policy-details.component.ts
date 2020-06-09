import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { OccConfig, RoutingService } from '@spartacus/core';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { PolicyService } from '../../../../core/my-account/facade/policy.service';
import { ChangeRequestService } from './../../../../core/change-request/facade/change-request.service';
import { AllowedFSRequestType } from './../../../../occ/occ-models';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'cx-fs-policy-details',
  templateUrl: './policy-details.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PolicyDetailsComponent implements OnInit, OnDestroy {
  constructor(
    protected routingService: RoutingService,
    protected policyService: PolicyService,
    protected config: OccConfig,
    protected changeRequestService: ChangeRequestService,
    protected httpClient: HttpClient
  ) {}

  policy$;
  subscription = new Subscription();

  ngOnInit(): void {
    this.subscription.add(
      this.routingService
        .getRouterState()
        .pipe(
          map(routingData => {
            const policyId = routingData.state.params.policyId;
            const contractId = routingData.state.params.contractId;
            if (policyId && contractId) {
              this.policyService.loadPolicyDetails(policyId, contractId);
            }
          })
        )
        .subscribe()
    );
    this.policy$ = this.policyService.getPolicyDetails();
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
    return false;
  }

  changePolicyDetails(policyId, contractId, changeRequestType) {
    this.changeRequestService.createChangeRequest(
      policyId,
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

  getDocument(documentId) {
    const url = 'https://financialservices.local:9002/occ/v2/financial/users/current/documents/' + documentId;
    this.httpClient.get(url).pipe(map(test => {
      console.log(test);
    })).subscribe();
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
