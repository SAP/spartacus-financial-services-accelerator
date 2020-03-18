import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  GlobalMessageService,
  GlobalMessageType,
  RoutingService,
} from '@spartacus/core';
import { Subscription } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/operators';
import { ChangeRequestService } from '../../../core/change-request/facade';
import { UserRequestNavigationService } from '../../../core/user-request/facade';
import { FSStepData } from './../../../occ/occ-models/occ.models';

@Component({
  selector: 'fsa-change-process-navigation',
  templateUrl: './change-process-navigation.component.html',
})
export class ChangeProcessNavigationComponent implements OnInit, OnDestroy {
  constructor(
    protected changeRequestService: ChangeRequestService,
    protected routingService: RoutingService,
    protected globalMessageService: GlobalMessageService,
    protected activatedRoute: ActivatedRoute,
    protected userRequestNavigationService: UserRequestNavigationService
  ) {}

  changeRequest$: Observable<any>;
  configurationSteps: FSStepData[];
  activeStepIndex: number;
  subscription = new Subscription();

  ngOnInit() {
    this.changeRequest$ = this.changeRequestService.getChangeRequest();
    this.subscription.add(
      this.changeRequest$
        .pipe(
          map(changeRequestData => {
            this.configurationSteps = this.userRequestNavigationService.getConfigurationSteps(
              changeRequestData
            );
            const activeStepData = this.userRequestNavigationService.getActiveStep(
              this.configurationSteps,
              this.activatedRoute.routeConfig.path
            );
            this.activeStepIndex = this.configurationSteps.indexOf(
              activeStepData
            );
          })
        )
        .subscribe()
    );
  }

  navigateNext(currentStep: number) {
    // TODO: FSA-4682 - Before navigation, simulation request has to be executed from ChangeRequestService
    this.userRequestNavigationService.continue(
      this.configurationSteps,
      currentStep
    );
  }

  cancelRequest(requestId: string) {
    this.changeRequestService.cancelChangeRequest(requestId);
    this.subscription.add(
      this.changeRequest$
        .pipe(
          map(changeRequest => {
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

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
