import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  GlobalMessageService,
  GlobalMessageType,
  RoutingService,
} from '@spartacus/core';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { ChangeRequestService } from '../../../core/change-request/facade/change-request.service';
import { ChangePolicyService } from '../../../core/change-request/services/change-policy.service';
import { UserRequestNavigationService } from '../../../core/user-request/facade/user-request-navigation.service';
import {
  ChangeRequestStatus,
  FSStepData,
  StepStatus,
} from '../../../occ/occ-models';

@Component({ template: '' })
export class AbstractChangeProcessStepComponent implements OnInit, OnDestroy {
  constructor(
    protected userRequestNavigationService: UserRequestNavigationService,
    protected changeRequestService: ChangeRequestService,
    protected activatedRoute: ActivatedRoute,
    protected routingService: RoutingService,
    protected globalMessageService: GlobalMessageService,
    protected changePolicyService: ChangePolicyService
  ) {}

  configurationSteps: FSStepData[];
  activeStepIndex: number;

  changeRequest$: Observable<
    any
  > = this.changeRequestService.getChangeRequest();

  subscription = new Subscription();

  ngOnInit() {
    this.subscription.add(
      this.changeRequestService
        .getChangeRequestError()
        .subscribe(error => this.onError(error))
    );
    this.subscription.add(
      this.changeRequest$
        .pipe(
          map(changeRequest => {
            this.populateSteps(changeRequest);
            if (this.isSimulated(changeRequest)) {
              this.userRequestNavigationService.continue(
                this.configurationSteps,
                this.activeStepIndex
              );
            } else if (
              changeRequest &&
              changeRequest.requestStatus === StepStatus.CANCELED
            ) {
              const policyNumber = changeRequest.insurancePolicy.policyNumber;
              const contractNumber =
                changeRequest.insurancePolicy.contractNumber;
              this.routingService.go({
                cxRoute: 'policyDetails',
                params: {
                  policyId: policyNumber,
                  contractId: contractNumber,
                },
              });
              this.globalMessageService.add(
                { key: 'policy.policyCanceled' },
                GlobalMessageType.MSG_TYPE_INFO
              );
            }
            if (
              changeRequest &&
              changeRequest.requestStatus === ChangeRequestStatus.SUBMITTED
            ) {
              this.routingService.go(
                changeRequest.fsStepGroupDefinition.confirmationUrl
              );
            }
          })
        )
        .subscribe()
    );
  }

  populateSteps(changeRequest: any) {
    this.configurationSteps = this.userRequestNavigationService.getConfigurationSteps(
      changeRequest
    );
    const activeStepData = this.userRequestNavigationService.getActiveStep(
      this.configurationSteps,
      this.activatedRoute.routeConfig.path
    );
    this.activeStepIndex = this.configurationSteps.indexOf(activeStepData);
  }

  isSimulated(changeRequest: any) {
    return (
      changeRequest.changedPolicy && changeRequest.changedPolicy.policyNumber
    );
  }

  simulateChangeRequest(changeRequest: any) {
    this.changeRequestService.simulateChangeRequest(
      changeRequest,
      this.activeStepIndex
    );
  }

  cancelChangeRequest(requestId: string) {
    this.changeRequestService.cancelChangeRequest(requestId);
  }

  protected onError(error: boolean) {
    if (error) {
      this.routingService.go({
        cxRoute: '/',
      });
    }
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
