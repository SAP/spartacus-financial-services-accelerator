import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormDataService, YFormData } from '@spartacus/dynamicforms';
import { RoutingService } from '@spartacus/core';
import { Observable, of, Subscription, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import { ClaimService } from '../../../core/my-account/facade/claim.service';
import {
  UserRequestNavigationService,
  UserRequestService,
} from '../../../core/user-request/facade';
import { Claim, FSStepData, StepStatus } from '../../../occ/occ-models';
import { ClaimStatus } from '../../../occ/occ-models/occ.models';
import { FileService } from '@spartacus/dynamicforms';

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
    protected claimService: ClaimService,
    protected fileService: FileService
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
      combineLatest([
        this.formDataService.getSubmittedForm(),
        this.fileService.getUploadedDocuments(),
        this.userRequestService.getUserRequest(),
      ])
        .pipe(
          map(([submittedFormData, uploadedContent, userRequest]) => {
            // needed to deep clone claimData object
            const claimCopy = JSON.parse(JSON.stringify(claimData));
            if (submittedFormData && submittedFormData.content) {
              claimCopy.configurationSteps[
                this.activeStepIndex
              ].stepContent.contentData = submittedFormData;
              if (uploadedContent) {
                claimCopy.documents = uploadedContent.files;
              }
              this.claimService.updateClaim(
                claimCopy,
                this.activeStepIndex,
                StepStatus.COMPLETED
              );
              if (
                userRequest.configurationSteps &&
                userRequest.configurationSteps[currentStep].status ===
                  StepStatus.COMPLETED
              ) {
                this.userRequestNavigationService.continue(
                  this.configurationSteps,
                  currentStep
                );
              }
            }
            if (
              userRequest.requestStatus === ClaimStatus.SUBMITTED &&
              userRequest.fsStepGroupDefinition
            ) {
              this.fileService.resetFiles();
              this.router.go(userRequest.fsStepGroupDefinition.confirmationUrl);
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
