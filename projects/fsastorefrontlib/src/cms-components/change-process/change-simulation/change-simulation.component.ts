import { Component, OnInit } from '@angular/core';
import {
  ChangedPolicyData,
  ChangeRequestType,
} from 'projects/fsastorefrontlib/src/occ';
import { Observable } from 'rxjs/internal/Observable';
import { ChangeRequestService } from './../../../core/change-request/facade/change-request.service';
import { Subscription } from 'rxjs';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'fsa-change-simulation',
  templateUrl: './change-simulation.component.html',
})
export class ChangeSimulationComponent implements OnInit {
  constructor(
    protected changeRequestService: ChangeRequestService,
    protected datePipe: DatePipe
  ) {}

  changeRequest$: Observable<any>;
  changedPolicyObjects: ChangedPolicyData[];
  subscription = new Subscription();
  currentDate: Date = new Date();
  changeType: string;

  ngOnInit() {
    this.changeRequest$ = this.changeRequestService.getChangeRequest();
  }

  getChangedPolicyObjects(changeRequestData: any): ChangedPolicyData[] {
    const changedPolicyObjects: ChangedPolicyData[] = [];
    if (changeRequestData.fsStepGroupDefinition) {
      const changeRequestType =
        changeRequestData.fsStepGroupDefinition.requestType;
      if (changeRequestType.code === ChangeRequestType.INSURED_OBJECT_CHANGE) {
        this.changeType = ChangeRequestType.INSURED_OBJECT_CHANGE;
        const changeableInsuredObjectItems = changeRequestData.insurancePolicy.insuredObjectList.insuredObjects[0].insuredObjectItems.filter(
          insuredObjectItem => insuredObjectItem.changeable === true
        );
        if (changeableInsuredObjectItems) {
          changeableInsuredObjectItems.forEach(insuredObjectItem => {
            const changedPolicyData = {} as ChangedPolicyData;
            changedPolicyData.label = insuredObjectItem.label;
            changedPolicyData.oldValue = insuredObjectItem.value;
            changedPolicyData.newValue = this.getChangedValue(
              changedPolicyData.label,
              changeRequestData.changedPolicy
            );
            changedPolicyObjects.push(changedPolicyData);
          });
        }
      } else if (changeRequestType.code === ChangeRequestType.COVERAGE_CHANGE) {
        this.changeType = ChangeRequestType.COVERAGE_CHANGE;
        const optionalProducts =
          changeRequestData.insurancePolicy.optionalProducts;
        if (optionalProducts) {
          optionalProducts.forEach(optionalProduct => {
            const changedPolicyData = {} as ChangedPolicyData;
            changedPolicyData.label =
              optionalProduct.coverageProduct.cartDisplayName;
            changedPolicyData.oldValue = optionalProduct.coverageIsIncluded;
            changedPolicyData.newValue = this.getChangedCoverageValue(
              changedPolicyData.label,
              changeRequestData.changedPolicy
            );
            changedPolicyObjects.push(changedPolicyData);
          });
        }
      }
    }
    return changedPolicyObjects;
  }

  getChangedValue(label: string, changedPolicy: any): string {
    const changedInsuredObjectItem = changedPolicy.insuredObjectList.insuredObjects[0].insuredObjectItems.find(
      insuredObjectItem => insuredObjectItem.label === label
    );
    return changedInsuredObjectItem.value;
  }
  getChangedCoverageValue(label: string, changedPolicy: any): string {
    const changedCoverage = changedPolicy.optionalProducts.find(
      coverage => coverage.coverageProduct.cartDisplayName === label
    );
    return changedCoverage.coverageIsIncluded;
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
