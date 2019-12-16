import { UserRequestDataService } from './../../../core/user-request/services/user-request-data.service';
import { FormDataService, YFormData } from '@fsa/dynamicforms';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription, of } from 'rxjs';
import { filter, map, switchMap } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import {
  UserRequestService,
  UserRequestNavigationService,
} from '../../../core/user-request/services';
import { FSUserRequest, FSStepData, Claim } from '../../../occ/occ-models';
import {
  ClaimDataService,
  ClaimService,
} from '../../../core/my-account/services';
import {
  GlobalMessageService,
  GlobalMessageType,
  RoutingService,
} from '@spartacus/core';
import { select, Store } from '@ngrx/store';
import * as fromClaimStore from '../../../core/my-account/store';

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
    protected claimDataService: ClaimDataService,
    protected globalMessageService: GlobalMessageService,
    private store: Store<fromClaimStore.SubmitClaim>,
    protected router?: RoutingService
  ) {}

  ngOnInit() {
    this.userRequest$ = this.userRequestService.getUserRequest();
    this.claim$ = this.store.pipe(select(fromClaimStore.getClaimsContent));
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

  getNumberOfConfigurationSteps(): number {
    if (this.configurationSteps) {
      return this.configurationSteps.length;
    }
  }

  shouldClaimBeSubmitted(
    activeStep: number,
    configurationLength: number
  ): boolean {
    return activeStep === configurationLength;
  }
  next(currentStep: number): void {
    const formData: YFormData = {};
    if (this.activeStepData.yformConfigurator) {
      formData.id = this.activeStepData.yformConfigurator.id;
    }
    this.formDataService.submit(formData);
    if (
      this.shouldClaimBeSubmitted(
        this.activeStepIndex + 1,
        this.configurationSteps.length
      )
    ) {
      this.claimService.submitClaim(
        this.userRequestDataService.userId,
        this.claimDataService.content.claimNumber
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
    this.subscription.add(
      this.claim$
        .pipe(
          filter(
            claim =>
              claim.claimStatus !== undefined && claim.claimStatus !== 'OPEN'
          ),
          map(() => {
            this.router.go('/');
            this.globalMessageService.add(
              'Your claim is submitted',
              GlobalMessageType.MSG_TYPE_CONFIRMATION
            );
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
}
