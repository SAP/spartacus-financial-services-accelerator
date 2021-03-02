import { Component, OnDestroy, OnInit } from '@angular/core';
import { RoutingService } from '@spartacus/core';
import { ClaimService } from '../../../../core/my-account/facade/claim.service';
import { Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';
import { FileService } from '@spartacus/dynamicforms';

@Component({
  selector: 'cx-fs-claim-details',
  templateUrl: './claim-details.component.html',
})
export class ClaimDetailsComponent implements OnInit, OnDestroy {
  claim$;
  subscription = new Subscription();

  constructor(
    protected routingService: RoutingService,
    protected claimService: ClaimService,
    protected fileService: FileService
  ) {}

  ngOnInit(): void {
    this.subscription.add(
      this.routingService
        .getRouterState()
        .pipe(
          tap(routingData => {
            const claimId = routingData.state.params.claimId;
            if (claimId) {
              this.claimService.loadClaimById(claimId);
            }
          })
        )
        .subscribe()
    );
    this.claim$ = this.claimService.getCurrentClaim();
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
