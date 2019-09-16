import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { RoutingService } from '@spartacus/core';
import { ClaimService } from '../../../services';
import { Store, select } from '@ngrx/store';
import * as fromClaimStore from '../../../store';

@Component({
  selector: 'fsa-create-claim',
  templateUrl: './create-claim.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CreateClaimComponent implements OnInit {
  constructor(
    protected claimService: ClaimService,
    private routingService: RoutingService,
    protected store: Store<fromClaimStore.UserState>
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
          const request = this.store.pipe(
            select(fromClaimStore.getUserRequestData)
          );
          request.subscribe(req =>
            this.routingService.go({
              cxRoute: 'userRequest',
              params: { requestId: req.requestId }
            })
          );
        }
      })
      .unsubscribe();
  }
}
