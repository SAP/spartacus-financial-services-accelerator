import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  OnDestroy,
} from '@angular/core';
import { PolicyService } from '../../../../core/my-account/facade/policy.service';
import { RoutingService } from '@spartacus/core';
import { map, takeLast, take } from 'rxjs/operators';
import { Subscription, combineLatest, Observable, of } from 'rxjs';
import { OccConfig } from '@spartacus/core';

@Component({
  selector: 'fsa-policy-details',
  templateUrl: './policy-details.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PolicyDetailsComponent implements OnInit, OnDestroy {
  constructor(
    protected routingService: RoutingService,
    protected policyService: PolicyService,
    protected config: OccConfig
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
  isChangeAllowed(allowedFSRequestTypes, requestType) {
    if (allowedFSRequestTypes) {
      return (
        allowedFSRequestTypes
          .filter(allowedRequestType => allowedRequestType.requestType)
          .map(allowedRequestType => allowedRequestType.requestType.code)
          .indexOf(requestType) > -1
      );
    }
  }
  getBaseUrl() {
    return this.config.backend.occ.baseUrl || '';
  }
  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
