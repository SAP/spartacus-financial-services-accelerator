import { ClaimStatus } from './../../../occ/occ-models/occ.models';
import { UserRequestDataService } from './../../../core/user-request/services/user-request-data.service';
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
import { FSUserRequest, FSStepData } from '../../../occ/occ-models';
import * as fromAction from '../../../core/user-request/store/actions';

const completedStatus = 'COMPLETED';

@Component({
  selector: 'fsa-user-request-navigation',
  templateUrl: './user-request-navigation.component.html',
})
export class UserRequestNavigationComponent implements OnInit, OnDestroy {
  private subscription = new Subscription();
  userRequest$: Observable<FSUserRequest>;
  configurationSteps: FSStepData[];
  activeStepData: FSStepData;
  activeStepIndex: number;

  constructor(
    protected userRequestService: UserRequestService,
    protected activatedRoute: ActivatedRoute,
    protected userRequestNavigationService: UserRequestNavigationService,
    protected formDataService: FormDataService,
    protected userRequestDataService: UserRequestDataService,
    protected router: RoutingService
  ) {}

  ngOnInit() {
    this.userRequest$ = this.userRequestService.getUserRequest();
    this.subscription.add(
      this.userRequest$
        .pipe(
          map(userRequestData => {
            if (
              userRequestData.configurationSteps !== null &&
              userRequestData.configurationSteps.length > 0
            ) {
              this.configurationSteps = userRequestData.configurationSteps;
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

  next(currentStep: number): void {
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
        this.userRequestDataService.userRequest,
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
              const userRequestData = this.userRequestDataService.userRequest;
              if (
                userRequestData &&
                userRequestData.requestId &&
                submittedFormData.content !== undefined
              ) {
                this.userRequestService.updateUserRequestStep(
                  userRequestData,
                  this.activeStepIndex,
                  completedStatus
                );
              }
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
