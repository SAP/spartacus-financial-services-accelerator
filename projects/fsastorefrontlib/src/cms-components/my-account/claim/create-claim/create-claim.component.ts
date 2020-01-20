import { ChangeDetectionStrategy, Component, OnInit, OnDestroy } from '@angular/core';
import { RoutingService } from '@spartacus/core';
import { ClaimService } from '../../../../core/my-account/services';
import { Store } from '@ngrx/store';
import * as fromUserRequestStore from '../../../../core/user-request/store/reducers';
import { Subscription, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { SelectedPolicy } from '../../../../core/my-account/services/claim-data.service';

@Component({
  selector: 'fsa-create-claim',
  templateUrl: './create-claim.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateClaimComponent implements OnInit, OnDestroy {
  constructor(
    protected claimService: ClaimService,
    protected routingService: RoutingService,
    protected store: Store<fromUserRequestStore.FSUserRequestState>,
  ) { }

  subscription = new Subscription();
  isPolicySelected$: Observable<SelectedPolicy>;
  validPolicy;
  confirm;

  ngOnInit() {
    // needed to check when a claim is selected and pass that info to template
    this.isPolicySelected$ = this.claimService.getSelectedPolicy();
  }

  startClaim() {
    this.subscription.add(
      this.isPolicySelected$.pipe(
        map(policy => {
          if (policy && policy.userId) {
            this.validPolicy = policy.userId;
            console.log(this.validPolicy);
            this.claimService.createClaim(
              policy.userId,
              policy.policyId,
              policy.contractId
            );
            this.routingService.go({
              cxRoute: 'fnolIncidentPage',
            });
          }
        })).subscribe()
    );
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
