import { UserRequestDataService } from './../../../core/user-request/services/user-request-data.service';
import { FormDataService } from '@fsa/dynamicforms';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import {
  UserRequestService,
  UserRequestNavigationService,
} from '../../../core/user-request/services';
import { FSUserRequest, FSStepData } from '../../../occ/occ-models';

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
  updatedUserRequest: Observable<FSUserRequest>;

  constructor(
    protected userRequestService: UserRequestService,
    protected activatedRoute: ActivatedRoute,
    protected userRequestNavigationService: UserRequestNavigationService,
    protected formDataService: FormDataService,
    protected userRequestDataService: UserRequestDataService
  ) {}

  ngOnInit() {
    this.userRequest$ = this.userRequestService.getUserRequest();
    this.subscription.add(
      this.userRequest$
        .pipe(
          map(userRequestData => {
            if (
              userRequestData.configurationSteps != null &&
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

  next(currentStep: number): void {
    this.formDataService.submit();
    this.subscription.add(
      this.formDataService
        .getSubmittedForm()
        .pipe(
          map(formData => {
            if (formData) {
              const userRequestData = this.userRequestDataService.userRequest;
              if (
                userRequestData &&
                userRequestData.requestId &&
                formData.content !== undefined
              ) {
                this.userRequestService.updateUserRequestStep(
                  userRequestData,
                  this.activeStepIndex,
                  formData,
                  completedStatus
                );
                this.userRequestNavigationService.continue(
                  this.configurationSteps,
                  currentStep
                );
              }
            }
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
}
