import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { PolicyService } from '../../../../core/my-account/facade/policy.service';
import { RoutingService } from '@spartacus/core';
import { map } from 'rxjs/operators';
import { Subscription, combineLatest, Observable } from 'rxjs';
import { OccConfig } from '@spartacus/core';
import { ChangeRequestService } from './../../../../core/change-request/facade/change-request.service';

@Component({
  selector: 'fsa-policy-details',
  templateUrl: './policy-details.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PolicyDetailsComponent implements OnInit {
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

  changePolicyDetails(policyId, contractId) {
    this.changeRequestService.createChangeRequest(policyId, contractId);
    this.changeRequestService.getChangeRequest().subscribe(res => {
      console.log(res);
    });
  }
}
