import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import {
  GlobalMessageService,
  GlobalMessageType,
  RoutingService,
} from '@spartacus/core';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { ChangeRequestService } from '../../../core/change-request/facade/change-request.service';
import { UserRequestNavigationService } from '../../../core/user-request/facade/user-request-navigation.service';
import { FSStepData } from '../../../occ/occ-models';

@Component({ template: '' })
export class AbstractChangeProcessStepComponent implements OnInit, OnDestroy {
  constructor(
    protected userRequestNavigationService: UserRequestNavigationService,
    protected changeRequestService: ChangeRequestService,
    protected activatedRoute: ActivatedRoute,
    protected routingService: RoutingService,
    protected globalMessageService: GlobalMessageService,
    protected fb: FormBuilder
  ) {}

  configurationSteps: FSStepData[];
  activeStepIndex: number;

  changeRequest$: Observable<any>;

  private subscription = new Subscription();

  ngOnInit() {
    this.changeRequest$ = this.changeRequestService.getChangeRequest();
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
            }

            if (changeRequest && changeRequest.requestStatus === 'CANCELED') {
              const policyNumber = changeRequest.insurancePolicy.policyNumber;
              const contractNumber =
                changeRequest.insurancePolicy.contractNumber;
              this.routingService.go({
                cxRoute: 'policyDetails',
                params: { policyId: policyNumber, contractId: contractNumber },
              });
              this.globalMessageService.add(
                'Your policy change request has been canceled',
                GlobalMessageType.MSG_TYPE_INFO
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
    this.changeRequestService.simulateChangeRequest(changeRequest);
  }

  cancelChangeRequest(requestId: string) {
    this.changeRequestService.cancelChangeRequest(requestId);
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
