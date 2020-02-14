import { ClaimStatus } from './../../../occ/occ-models/occ.models';
import { UserRequestDataService } from './../../../core/user-request/services/user-request-data.service';
import { FormDataService, YFormData } from '@fsa/dynamicforms';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription, of } from 'rxjs';
import { filter, map, mergeMap, switchMap, take } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import {
  UserRequestService,
  UserRequestNavigationService,
} from '../../../core/user-request/facade';
import { FSUserRequest, FSStepData, Claim } from '../../../occ/occ-models';
import { ClaimService } from '../../../core/my-account/facade';
import { RoutingService } from '@spartacus/core';

const completedStatus = 'COMPLETED';

@Component({
  selector: 'fsa-user-request-navigation',
  templateUrl: './user-request-navigation.component.html',
})
export class UserRequestNavigationComponent implements OnInit, OnDestroy {
  private subscription = new Subscription();
  userRequest$: Observable<FSUserRequest>;
  claim$: Observable<Claim>;

  configurationSteps: FSStepData[];
  activeStepData: FSStepData;
  activeStepIndex: number;

  constructor(
    protected userRequestService: UserRequestService,
    protected activatedRoute: ActivatedRoute,
    protected userRequestNavigationService: UserRequestNavigationService,
    protected formDataService: FormDataService,
    protected userRequestDataService: UserRequestDataService,
    protected claimService: ClaimService,
    protected router: RoutingService
  ) {}

  ngOnInit() {
    this.userRequest$ = this.userRequestService.getUserRequest();
    this.claim$ = this.claimService.getCurrentClaim();
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
          })
        )
        .subscribe()
    );
  }

  next(currentStep: number): void {
    const formData: YFormData = {};
    if (this.activeStepData.yformConfigurator) {
      formData.id = this.activeStepData.yformConfigurator.id;
    }
    this.formDataService.submit(formData);

    if (this.activeStepIndex + 1 === this.configurationSteps.length) {
      this.subscription.add(
        this.userRequestService
          .updateUserRequestStep(
            this.userRequestDataService.userRequest,
            this.activeStepIndex,
            completedStatus
          )
          .pipe(
            switchMap(response => {
              if (response) {
                return this.userRequestService
                  .submitUserRequest(
                    this.userRequestDataService.userId,
                    this.userRequestDataService.userRequest.requestId
                  )
                  .pipe(
                    filter(
                      request => request.requestStatus === ClaimStatus.SUBMITTED
                    ),
                    map(() => {
                      return this.router.go('/fnolConfirmation');
                    })
                  );
              }
              return of(null);
            })
          )
          .subscribe()
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
                return this.userRequestService
                  .updateUserRequestStep(
                    userRequestData,
                    this.activeStepIndex,
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
