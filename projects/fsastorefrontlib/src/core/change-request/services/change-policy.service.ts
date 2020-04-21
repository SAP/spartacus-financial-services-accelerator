import { PolicyModule } from './../../../cms-components/my-account/policy/policy.module';
import { ChangedPolicyData } from './../../../occ/occ-models/occ.models';
import { RequestType } from './../../../occ/occ-models/occ.models';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: PolicyModule,
})
export class ChangePolicyService {
  changedPolicyObjects: ChangedPolicyData[] = [];

  getChangedPolicyObjects(changeRequestData: any): ChangedPolicyData[] {
    this.changedPolicyObjects = [];
    if (
      changeRequestData.fsStepGroupDefinition &&
      changeRequestData.insurancePolicy
    ) {
      switch (changeRequestData.fsStepGroupDefinition.requestType.code) {
        case RequestType.INSURED_OBJECT_CHANGE: {
          const insuredObject =
            changeRequestData.insurancePolicy.insuredObjectList
              .insuredObjects[0];
          const changeableInsuredObjectItems = insuredObject.insuredObjectItems.filter(
            insuredObjectItem => insuredObjectItem.changeable === true
          );
          if (changeableInsuredObjectItems.length > 0) {
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
