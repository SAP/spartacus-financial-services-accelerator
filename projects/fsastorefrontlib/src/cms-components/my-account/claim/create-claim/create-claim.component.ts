import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { RoutingService } from '@spartacus/core';
import { ClaimService } from '../../../../core/my-account/services';
import { Store } from '@ngrx/store';
import * as fromUserRequestStore from '../../../../core/user-request/store/reducers';

@Component({
  selector: 'fsa-create-claim',
  templateUrl: './create-claim.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateClaimComponent implements OnInit {
  constructor(
    protected claimService: ClaimService,
    protected routingService: RoutingService,
    protected store: Store<fromUserRequestStore.FSUserRequestState>
  ) {}

  isPolicySelected$;
  confirm;

  ngOnInit() {
    // needed to check when a claim is selected and pass that info to template
    this.isPolicySelected$ = this.claimService.getSelectedPolicy();
  }

  startClaim() {
    this.claimService
      .getSelectedPolicy()
      .subscribe(policy => {
        if (policy) {
          this.claimService.createClaim(policy.policyId, policy.contractId);

          this.routingService.go({
            cxRoute: 'fnolIncidentPage',
          });
        }
      })
      .unsubscribe();
  }
}
