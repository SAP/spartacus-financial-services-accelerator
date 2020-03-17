import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  GlobalMessageService,
  GlobalMessageType,
  RoutingService,
} from '@spartacus/core';
import { Subscription } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/operators';
import { ChangeRequestService } from './../../../core/change-request/facade/change-request.service';

@Component({
  selector: 'fsa-change-process-navigation',
  templateUrl: './change-process-navigation.component.html',
})
export class ChangeProcessNavigationComponent implements OnInit, OnDestroy {
  constructor(
    protected changeRequestService: ChangeRequestService,
    protected routingService: RoutingService,
    protected globalMessageService: GlobalMessageService
  ) {}

  subscription: Subscription;
  changeRequest$: Observable<any>;

  ngOnInit() {
    this.changeRequest$ = this.changeRequestService.getChangeRequest();
  }

  cancelRequest(requestId: string) {
    this.changeRequestService.cancelChangeRequest(requestId);
    this.subscription = this.changeRequest$
      .pipe(
        map(changeRequest => {
          if (changeRequest && changeRequest.requestStatus === 'CANCELED') {
            const policyNumber = changeRequest.insurancePolicy.policyNumber;
            const contractNumber = changeRequest.insurancePolicy.contractNumber;
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
      .subscribe();
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
