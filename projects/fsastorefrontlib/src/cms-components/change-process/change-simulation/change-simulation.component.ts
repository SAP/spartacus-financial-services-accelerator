import { Component, OnInit } from '@angular/core';
import {
  ChangedPolicyData,
  RequestType,
} from '../../../occ/occ-models/occ.models';
import { AbstractChangeProcessStepComponent } from '../abstract-change-process-step/abstract-change-process-step.component';

@Component({
  selector: 'fsa-change-simulation',
  templateUrl: './change-simulation.component.html',
})
export class ChangeSimulationComponent
  extends AbstractChangeProcessStepComponent
  implements OnInit {
  changedPolicyObjects: ChangedPolicyData[] = [];
  currentDate: Date = new Date();

  ngOnInit() {
    super.ngOnInit();
  }

  getChangedPolicyObjects(changeRequestData: any): ChangedPolicyData[] {
    this.changedPolicyObjects = [];
    if (changeRequestData.fsStepGroupDefinition) {
      switch (changeRequestData.fsStepGroupDefinition.requestType.code) {
        case RequestType.INSURED_OBJECT_CHANGE: {
          const insuredObject =
            changeRequestData.insurancePolicy.insuredObjectList
              .insuredObjects[0];
          const changeableInsuredObjectItems = insuredObject.insuredObjectItems.filter(
            insuredObjectItem => insuredObjectItem.changeable === true
          );
          if (changeableInsuredObjectItems) {
            changeableInsuredObjectItems.forEach(insuredObjectItem => {
              const newVal = this.getChangedValue(
                insuredObjectItem.label,
                changeRequestData.changedPolicy
              );
              this.setChangedPolicyObject(
                insuredObjectItem.label,
                insuredObjectItem.value,
                newVal
              );
            });
          }
          break;
        }
        case RequestType.COVERAGE_CHANGE: {
          const optionalProducts =
            changeRequestData.insurancePolicy.optionalProducts;
          if (optionalProducts) {
            optionalProducts.forEach(optionalProduct => {
              const newVal = this.getChangedCoverageValue(
                optionalProduct.coverageProduct.cartDisplayName,
                changeRequestData.changedPolicy
              );
              this.setChangedPolicyObject(
                optionalProduct.coverageProduct.cartDisplayName,
                optionalProduct.coverageIsIncluded,
                newVal
              );
            });
          }
          break;
        }
      }
      return this.changedPolicyObjects;
    }
  }

  setChangedPolicyObject(label: string, value: string, newValue: string) {
    const changedPolicyData = {} as ChangedPolicyData;
    changedPolicyData.label = label;
    changedPolicyData.oldValue = value;
    changedPolicyData.newValue = newValue;
    this.changedPolicyObjects.push(changedPolicyData);
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
}
