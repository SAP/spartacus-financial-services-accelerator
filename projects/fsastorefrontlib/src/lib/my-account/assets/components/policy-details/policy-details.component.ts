import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { PolicyService } from '../../../assets/services/policy.service';
import {RoutingService } from '@spartacus/core';
import { map } from 'rxjs/operators';
import { Subscription, combineLatest } from 'rxjs';
import { OccConfig } from '@spartacus/core';


@Component({
  selector: 'fsa-policy-details',
  templateUrl: './policy-details.component.html',
  styleUrls: ['./policy-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PolicyDetailsComponent implements OnInit {

  constructor(
    private routingService: RoutingService,
    private policyService: PolicyService,
    private config: OccConfig
  ) {}

  policy$;
  subscription: Subscription;

  ngOnInit(): void {
    const policyId$ = this.routingService.getRouterState().pipe(
      map(routingData => routingData.state.params.policyId)
    );
    const contractId$ = this.routingService.getRouterState().pipe(
      map(routingData => routingData.state.params.contractId)
    );
    this.subscription = combineLatest(policyId$, contractId$).subscribe(
      ([policyId, contractId]) => {
        if (policyId && contractId) {
          this.policyService.loadPolicyDetails(policyId, contractId);
        }
      }
    );
    this.policy$ = this.policyService.policyDetails$;
  }
  public getBaseUrl() {
    return this.config.server.baseUrl || '';
  }
}
