import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { FileService } from '@spartacus/dynamicforms';
import { RoutingService } from '@spartacus/core';
import { Observable, Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
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
    if (!this.confirm) {
      return;
    }
    this.subscription.add(
      this.isPolicySelected$
        .pipe(
          filter(policy => !!policy?.userId),
          map(policy => {
            this.claimService.createClaim(policy.policyId, policy.contractId);
            this.fileUploadService.resetFiles();
            this.routingService.go({
              cxRoute: 'fnolIncidentPage',
            });
          })
        )
        .subscribe()
    );
  }

  ngOnDestroy() {
    this.claimService.resetSelectedPolicy();
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
