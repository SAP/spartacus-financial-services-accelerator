import { Component, OnDestroy, OnInit } from '@angular/core';
import { RoutingService } from '@spartacus/core';
import { FileService, FormDataService } from '@spartacus/dynamicforms';
import { ClaimService } from '../../../../core/my-account/facade/claim.service';
import { combineLatest, Subscription } from 'rxjs';
import { map, tap } from 'rxjs/operators';

@Component({
  selector: 'cx-fs-change-claim-navigation',
  templateUrl: './change-claim-navigation.html',
})
export class ChangeClaimNavigationComponent implements OnInit, OnDestroy {
  constructor(
    protected routingService: RoutingService,
    protected claimService: ClaimService,
    protected fileService: FileService,
    protected formDataService: FormDataService
  ) {}

  claim$;
  subscription = new Subscription();

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

  back() {
    this.routingService.go({ cxRoute: 'claims' });
  }

  submit(claim) {
    // Change claim process is currently supporting only attaching additional documents that would support customer's claim
    this.formDataService.submit({});
    this.subscription.add(
      combineLatest([
        this.formDataService.getSubmittedForm(),
        this.fileService.getUploadedDocuments(),
      ])
        .pipe(
          map(([submittedFormData, uploadedContent]) => {
            // needed to deep clone claimData object
            const claimCopy = JSON.parse(JSON.stringify(claim));
            if (submittedFormData?.content && uploadedContent) {
              claimCopy.documents = uploadedContent.files;
              this.claimService.changeClaim(claimCopy);
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
