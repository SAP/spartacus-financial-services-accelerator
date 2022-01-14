import { Component, OnDestroy, OnInit } from '@angular/core';
import { RoutingService, UserIdService } from '@spartacus/core';
import { FileService, FormDataService } from '@spartacus/dynamicforms';
import { combineLatest, Subscription } from 'rxjs';
import { map, tap, filter } from 'rxjs/operators';
import { ClaimService } from '../../../../core/my-account/facade/claim.service';

@Component({
  selector: 'cx-fs-change-claim-navigation',
  templateUrl: './change-claim-navigation.component.html',
})
export class ChangeClaimNavigationComponent implements OnInit, OnDestroy {
  constructor(
    protected routingService: RoutingService,
    protected claimService: ClaimService,
    protected fileService: FileService,
    protected formDataService: FormDataService,
    protected userIdService: UserIdService
  ) {}

  claim$ = this.claimService.getCurrentClaim();
  subscription = new Subscription();

  ngOnInit(): void {
    this.subscription.add(
      this.routingService
        .getRouterState()
        .pipe(
          filter(routingData => !routingData.nextState),
          tap(routingData => {
            const claimId = routingData.state.params.claimId;
            if (claimId) {
              this.claimService.loadClaimById(claimId);
            }
          })
        )
        .subscribe()
    );
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
        this.userIdService.getUserId(),
      ])
        .pipe(
          map(([submittedFormData, uploadedContent, occUserId]) => {
            // needed to deep clone claimData object
            const claimCopy = JSON.parse(JSON.stringify(claim));
            if (submittedFormData?.content && uploadedContent) {
              claimCopy.documents = uploadedContent.files;
              this.claimService.changeClaim(claimCopy, occUserId);
              this.fileService.resetFiles();
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
