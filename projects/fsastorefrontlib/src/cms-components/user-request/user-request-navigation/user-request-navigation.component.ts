import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import {
  UserRequestService,
  UserRequestNavigationService,
  UserRequestDataService,
} from '../../../core/user-request/services';
import { FSUserRequest, FSStepData } from '../../../occ/occ-models';
import {
  ClaimDataService,
  ClaimService,
} from '../../../core/my-account/services';
import { FormDataService } from '@fsa/dynamicforms';

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
    protected formService: FormDataService,
    protected claimService: ClaimService,
    protected claimDataService: ClaimDataService,
    protected userRequestDataService: UserRequestDataService
  ) {}

  completedStatus = 'COMPLETED';

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
            return userRequestData;
          }),
          tap(userRequestData => {
            if (
              this.shouldClaimBeUpdated(userRequestData) &&
              this.activeStepIndex > 0
            ) {
              return this.claimService.updateClaim(
                this.claimDataService.content.claimNumber
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
    this.formService.submitForm(currentStep.toString());
    setTimeout(() => {
      this.subscription.add(
        this.formService
          .getCurrentFormData()
          .pipe(
            map(data => {
              console.log(data);
              const fsRequest = this.userRequestDataService.userRequest;
              if (fsRequest.requestId && data.content !== undefined) {
                const stepData = this.userRequestDataService.updateUserRequestStep(
                  fsRequest,
                  this.activeStepIndex,
                  data,
                  this.completedStatus
                );
                return this.userRequestService.updateUserRequest(
                  fsRequest.requestId,
                  stepData
                );
              }
            })
          )
          .subscribe()
      );
      this.userRequestNavigationService.continue(
        this.configurationSteps,
        currentStep
      );
    }, 1000);
  }

  shouldClaimBeUpdated(fsRequest: FSUserRequest): boolean {
    return (
      fsRequest.configurationSteps.filter(
        step => step.status === this.completedStatus
      ).length === fsRequest.configurationSteps.length
    );
  }

  back(currentStep: number): void {
    this.userRequestNavigationService.back(
      this.configurationSteps,
      currentStep
    );
  }
}
