import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormDataService, YFormData } from '@fsa/dynamicforms';
import { RoutingService } from '@spartacus/core';
import { Observable, of, Subscription } from 'rxjs';
import { filter, map, switchMap } from 'rxjs/operators';
import { ClaimService } from '../../../core/my-account/facade/claim.service';
import {
  UserRequestNavigationService,
  UserRequestService,
} from '../../../core/user-request/facade';
import { Claim, FSStepData, StepStatus } from '../../../occ/occ-models';
import { ClaimStatus } from '../../../occ/occ-models/occ.models';

@Component({
  selector: 'cx-fs-fnol-navigation',
  templateUrl: './fnol-navigation.component.html',
})
export class FNOLNavigationComponent implements OnInit, OnDestroy {
  private subscription = new Subscription();
  claimRequest$: Observable<Claim>;
  configurationSteps: FSStepData[];
  activeStepData: FSStepData;
  activeStepIndex: number;

  constructor(
    protected userRequestService: UserRequestService,
    protected activatedRoute: ActivatedRoute,
    protected userRequestNavigationService: UserRequestNavigationService,
    protected formDataService: FormDataService,
    protected router: RoutingService,
    protected claimService: ClaimService
  ) {}

  ngOnInit() {
    this.claimRequest$ = this.claimService.getCurrentClaim();
    this.subscription.add(
      this.claimRequest$
        .pipe(
          map(claimData => {
            if (
              claimData.configurationSteps != null &&
              claimData.configurationSteps.length > 0
            ) {
              this.configurationSteps = claimData.configurationSteps;
              this.activeStepData = this.userRequestNavigationService.getActiveStep(
                this.configurationSteps,
                this.activatedRoute.routeConfig.path
              );
              this.activeStepIndex = this.configurationSteps.indexOf(
                this.activeStepData
              );
            }
          })
        )
        .subscribe()
    );
  }

  next(currentStep: number, claimData: any): void {
    this.subscription.add(
      this.userRequestService
        .getUserRequest()
        .pipe(
          filter(payload => payload !== undefined),
          map(request => {
            if (
              request.configurationSteps &&
              request.configurationSteps[currentStep].status ===
                StepStatus.COMPLETED
            ) {
              this.userRequestNavigationService.continue(
                this.configurationSteps,
                currentStep
              );
            }
            if (
              request.requestStatus === ClaimStatus.SUBMITTED &&
              request.fsStepGroupDefinition
            ) {
              this.router.go(request.fsStepGroupDefinition.confirmationUrl);
            }
          })
        )
        .subscribe()
    );

    if (!this.configurationSteps[this.activeStepIndex].summaryStep) {
      const formData: YFormData = {};
      if (this.activeStepData.yformConfigurator) {
        formData.id = this.activeStepData.yformConfigurator.id;
      }
      this.formDataService.submit(formData);
    }

    if (this.activeStepIndex + 1 === this.configurationSteps.length) {
      this.claimService.updateClaim(
        claimData,
        this.activeStepIndex,
        StepStatus.COMPLETED
      );
    }
    this.subscription.add(
      this.formDataService
        .getSubmittedForm()
        .pipe(
          switchMap(submittedFormData => {
            if (submittedFormData && submittedFormData.content) {
              claimData.configurationSteps[
                this.activeStepIndex
              ].stepContent.contentData = submittedFormData;
              this.claimService.updateClaim(
                claimData,
                this.activeStepIndex,
                StepStatus.COMPLETED
              );
            }
            return of(null);
          })
        )
        .subscribe()
    );
  }

  back(currentStep: number): void {
    this.userRequestNavigationService.back(
      this.configurationSteps,
      currentStep
    );
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  getNumberOfConfigurationSteps(): number {
    if (this.configurationSteps) {
      return this.configurationSteps.length;
    }
  }
}
