import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { RoutingService } from '@spartacus/core';
import { ClaimService } from '../../../services';
import { Store } from '@ngrx/store';
import * as fromUserRequestStore from 'projects/fsastorefrontlib/src/lib/fs-user-request/assets/store/reducers';

@Component({
  selector: 'fsa-create-claim',
  templateUrl: './create-claim.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateClaimComponent implements OnInit {
  constructor(
    protected claimService: ClaimService,
    private routingService: RoutingService,
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
          this.claimService.createClaim(
            policy.userId,
            policy.policyId,
            policy.contractId
          );

            this.routingService.go({
              cxRoute: 'fnolIncidentPage',
            });
        }
      })
      .unsubscribe();
  }
}
