import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { AuthService, RoutingService } from '@spartacus/core';
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
    private authService: AuthService,
    private routingService: RoutingService
  ) { }

  ngOnInit() {

  }

  createClaim(policyId, contractId) {
    this.authService.getUserToken().subscribe(token => {
      this.claimService.createClaim(token.userId, policyId, contractId);
      this.routingService.go({
        cxRoute: 'claims'
      });
    });
  }
}
