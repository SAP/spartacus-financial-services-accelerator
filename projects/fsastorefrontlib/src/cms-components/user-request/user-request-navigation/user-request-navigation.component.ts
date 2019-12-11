import { UserRequestDataService } from './../../../core/user-request/services/user-request-data.service';
import { FormDataService, YFormData } from '@fsa/dynamicforms';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
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

  constructor(
    protected userRequestService: UserRequestService,
    protected activatedRoute: ActivatedRoute,
    protected userRequestNavigationService: UserRequestNavigationService,
    protected formDataService: FormDataService,
    protected userRequestDataService: UserRequestDataService
  ) { }

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
    const formDataId = this.activeStepData.yformConfigurator.id;
    const formData: YFormData = {};
    if (formDataId) {
      formData.id = formDataId;
    }
    this.formDataService.submit(formData);
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
                return this.userRequestService
                  .updateUserRequestStep(
                    userRequestData,
                    this.activeStepIndex,
                    submittedFormData,
                    completedStatus
                  )
                  .pipe(
                    map(updatedUserRequest => {
                      if (updatedUserRequest) {
                        this.userRequestNavigationService.continue(
                          this.configurationSteps,
                          currentStep
                        );
                      }
                    })
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
}
