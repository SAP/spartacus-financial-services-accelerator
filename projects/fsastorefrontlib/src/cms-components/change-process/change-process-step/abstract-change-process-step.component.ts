import { OnInit, OnDestroy } from '@angular/core';
import { FSStepData, StepStatus } from '../../../occ/occ-models';
import { ActivatedRoute } from '@angular/router';
import { UserRequestNavigationService } from '../../../core/user-request/facade/user-request-navigation.service';
import { ChangeRequestService } from '../../../core/change-request/facade/change-request.service';
import { Subscription, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {
  RoutingService,
  GlobalMessageService,
  GlobalMessageType,
} from '@spartacus/core';

export class AbstractChangeProcessStepComponent implements OnInit, OnDestroy {
  constructor(
    protected userRequestNavigationService: UserRequestNavigationService,
    protected changeRequestService: ChangeRequestService,
    protected activatedRoute: ActivatedRoute,
    protected routingService: RoutingService,
    protected globalMessageService: GlobalMessageService
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

            if (
              changeRequest &&
              changeRequest.requestStatus === StepStatus.CANCELED
            ) {
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
    return changeRequest.changedPolicy;
  }

  simulateRequest(changeRequest: any) {
    this.changeRequestService.simulateChangeRequest(changeRequest);
  }

  cancelRequest(requestId: string) {
    this.changeRequestService.cancelChangeRequest(requestId);
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
