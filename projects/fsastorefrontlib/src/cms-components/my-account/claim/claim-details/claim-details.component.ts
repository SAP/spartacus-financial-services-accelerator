import { Component, OnDestroy, OnInit } from '@angular/core';
import { RoutingService } from '@spartacus/core';
import { ClaimService } from '../../../../core/my-account/facade';
import { Subscription } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { FileService } from '@spartacus/dynamicforms';
import { saveAs } from 'file-saver';

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

  getDocument(document, event) {
    event.preventDefault();
    this.subscription.add(
      this.fileService
        .getFile(document.code, document.mime)
        .pipe(
          map(downloadedFile => {
            saveAs(downloadedFile, document.altText);
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
