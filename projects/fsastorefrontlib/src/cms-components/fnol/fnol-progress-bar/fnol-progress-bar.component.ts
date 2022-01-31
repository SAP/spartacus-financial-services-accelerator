import { Component, OnDestroy, OnInit } from '@angular/core';
import { LanguageService } from '@spartacus/core';
import { ChangeRequestService } from '../../../core/change-request/facade/change-request.service';
import { combineLatest, Observable, Subscription } from 'rxjs';
import { map, tap } from 'rxjs/operators';
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
    protected languageService: LanguageService,
    protected changeRequestService: ChangeRequestService
  ) {}

  ngOnInit() {
    this.claimRequest$ = this.claimService.getCurrentClaim();
    // this.claimRequest$.subscribe(console.log);
    this.subscription.add(
      combineLatest([this.claimRequest$, this.languageService.getActive()])
        .pipe(
          tap(([claimData, lang]) => {
            console.log(claimData, 'claimData');
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
    this.subscription.add(
      this.claimRequest$
        .pipe(
          map(claimData => {
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
    //   .add(
    //     this.languageService
    //       .getActive()
    //       .pipe(
    //         tap(lang => {
    //           if (this.language && this.language !== lang) {
    //             // this.claimService.loadCurrentClaim();
    //             this.claimService.loadClaimById('CL00001000');
    //           }
    //           this.language = lang;
    //         })
    //       )
    //       .subscribe()
    //   );
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
