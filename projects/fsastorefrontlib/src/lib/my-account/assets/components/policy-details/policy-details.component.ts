import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { PolicyService } from '../../../assets/services/policy.service';
import { RoutingService } from '@spartacus/core';
import { map } from 'rxjs/operators';
import { Subscription, combineLatest, Observable } from 'rxjs';
import { OccConfig } from '@spartacus/core';

@Component({
  selector: 'fsa-policy-details',
  templateUrl: './policy-details.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
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
    this.policy$ = this.policyService.policyData$;
  }
  public getBaseUrl() {
    return this.config.backend.occ.baseUrl || '';
  }

  public isDate(date: string): boolean {
    const zoneDateRegex = new RegExp(
      '^((19|20)[0-9][0-9])[-](0[1-9]|1[012])[-](0[1-9]|[12][0-9]|3[01])[T]([01][1-9]|[2][0-3])[:]([0-5][0-9])[:]([0-5][0-9])([+|-]([01][0-9]|[2][0-3])[:]([0-5][0-9])){0,1}$'
    );
    return zoneDateRegex.test(date);
  }
}
