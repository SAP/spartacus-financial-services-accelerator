import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { FileService } from '@fsa/dynamicforms';
import { RoutingService } from '@spartacus/core';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { ClaimService } from '../../../../core/my-account/facade';
import { SelectedPolicy } from '../../../../core/my-account/services/claim-data.service';

@Component({
  selector: 'cx-fs-create-claim',
  templateUrl: './create-claim.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateClaimComponent implements OnInit, OnDestroy {
  constructor(
    protected claimService: ClaimService,
    protected routingService: RoutingService,
    protected fileUploadService: FileService
  ) {}

  subscription = new Subscription();
  isPolicySelected$: Observable<SelectedPolicy>;
  confirm;

  ngOnInit() {
    // needed to check when a claim is selected and pass that info to template
    this.isPolicySelected$ = this.claimService.getSelectedPolicy();
  }

  startClaim() {
    this.subscription.add(
      this.isPolicySelected$
        .pipe(
          map(policy => {
            if (policy && policy.userId) {
              this.claimService.createClaim(policy.policyId, policy.contractId);
              this.fileUploadService.resetFiles();
              this.routingService.go({
                cxRoute: 'fnolIncidentPage',
              });
            }
          })
        )
        .subscribe()
    );
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
