import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { RoutingService } from '@spartacus/core';
import { ClaimService, PolicyService } from '../../../services';

@Component({
  selector: 'fsa-create-claim',
  templateUrl: './create-claim.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CreateClaimComponent implements OnInit {
  constructor(
    protected policyService: PolicyService,
    protected claimService: ClaimService,
    private routingService: RoutingService
  ) { }

  isPolicySelected$;

  ngOnInit() {
    // needed to check when a claim is selected and pass that info to template
    this.isPolicySelected$ = this.claimService.getSelectedPolicy();
  }

  startClaim() {
    this.claimService.getSelectedPolicy().subscribe(data => {
      if (data) {
        this.claimService.createClaim(data.userId, data.policyId, data.contractId);
        this.routingService.go({
          cxRoute: 'claims'
        });
      }
    }).unsubscribe();
  }
}
