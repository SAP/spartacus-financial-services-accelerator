import { Component, OnDestroy, OnInit } from '@angular/core';
import { LanguageService } from '@spartacus/core';
import { combineLatest, Observable, Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ClaimService } from '../../../core/my-account/facade/claim.service';
import { UserRequestService } from '../../../core/user-request/facade';
import { Claim, FSStepData } from '../../../occ/occ-models';

@Component({
  selector: 'cx-fs-fnol-progress-bar',
  templateUrl: './fnol-progress-bar.component.html',
})
export class FNOLProgressBarComponent implements OnInit, OnDestroy {
  claimRequest$: Observable<Claim>;
  configurationSteps: FSStepData[];
  private subscription = new Subscription();
  language: string;

  constructor(
    protected userRequestService: UserRequestService,
    protected claimService: ClaimService,
    protected languageService: LanguageService
  ) {}

  ngOnInit() {
    this.claimRequest$ = this.claimService.getCurrentClaim();
    this.subscription.add(
      combineLatest([this.claimRequest$, this.languageService.getActive()])
        .pipe(
          tap(([claimData, lang]) => {
            if (this.language && this.language !== lang) {
              this.claimService.loadClaimById(claimData.claimNumber);
            }
            this.language = lang;
            if (
              claimData.configurationSteps != null &&
              claimData.configurationSteps.length > 0
            ) {
              this.configurationSteps = claimData.configurationSteps;
              this.userRequestService.loadUserRequestFormData(claimData);
            }
          })
        )
        .subscribe()
    );
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
