import { ClaimStatus } from '../../../occ/occ-models/occ.models';
import { FormDataService, YFormData } from '@fsa/dynamicforms';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { RoutingService } from '@spartacus/core';
import { Observable, Subscription, of } from 'rxjs';
import { filter, map, switchMap, take, tap } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import {
  UserRequestService,
  UserRequestNavigationService,
} from '../../../core/user-request/facade';
import { Claim, FSStepData } from '../../../occ/occ-models';
import * as fromAction from '../../../core/user-request/store/actions';
import { ClaimService } from '../../../core/my-account/facade/claim.service';

const completedStatus = 'COMPLETED';

@Component({
  selector: 'fsa-fnol-navigation',
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

    this.subscription.add(
      this.userRequestService
        .getAction(fromAction.SUBMIT_USER_REQUEST_SUCCESS)
        .pipe(
          take(1),
          filter(
            ({ payload }) =>
              payload &&
              payload.requestStatus === ClaimStatus.SUBMITTED &&
              payload.fsStepGroupDefinition
          ),
          tap(({ payload }) => {
            this.router.go(payload.fsStepGroupDefinition.confirmationUrl);
          })
        )
        .subscribe()
    );
  }

  next(currentStep: number, claimData: any): void {
    this.subscription.add(
      this.userRequestService
        .getAction(fromAction.UPDATE_USER_REQUEST_SUCCESS)
        .pipe(
          filter(
            ({ payload }) =>
              payload.configurationSteps &&
              currentStep < payload.configurationSteps.length - 1
          ),
          tap(() => {
            this.userRequestNavigationService.continue(
              this.configurationSteps,
              currentStep
            );
          })
        )
        .subscribe()
    );

    const formData: YFormData = {};
    if (this.activeStepData.yformConfigurator) {
      formData.id = this.activeStepData.yformConfigurator.id;
    }
    this.formDataService.submit(formData);
    if (this.activeStepIndex + 1 === this.configurationSteps.length) {
      this.userRequestService.updateUserRequestStep(
        claimData,
        this.activeStepIndex,
        completedStatus
      );
    }
    this.subscription.add(
      this.formDataService
        .getSubmittedForm()
        .pipe(
          switchMap(submittedFormData => {
            if (submittedFormData) {
              this.userRequestService.updateUserRequestStep(
                claimData,
                this.activeStepIndex,
                completedStatus
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
