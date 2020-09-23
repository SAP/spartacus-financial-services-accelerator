import { PolicyModule } from './../../../cms-components/my-account/policy/policy.module';
import { ChangedPolicyData } from './../../../occ/occ-models/occ.models';
import { RequestType } from './../../../occ/occ-models/occ.models';
import { Injectable } from '@angular/core';
import { FSTranslationService } from '../../../core/i18n/facade/translation.service';

@Injectable({
  providedIn: PolicyModule,
})
export class ChangePolicyService {
  constructor(protected translationService: FSTranslationService) {}

  changedPolicyObjects: ChangedPolicyData[] = [];

  getTranslation(translationChunks: string[], translationKey: string): string {
    return this.translationService.getTranslationValue(
      translationChunks,
      translationKey
    );
  }
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
              const translatedLabel = this.getTranslation(
                ['forms', 'auto'],
                insuredObjectItem.label
              );
              this.setChangedPolicyObject(
                translatedLabel,
                insuredObjectItem.value,
                newVal
              );
            });
          }
          break;
        }
        case RequestType.COVERAGE_CHANGE: {
          const optionalProducts = changeRequestData?.insurancePolicy?.optionalProducts?.filter(
            optionalProduct => !optionalProduct.isMandatory
          );
          if (optionalProducts) {
            optionalProducts.forEach(optionalProduct => {
              const newVal = this.getChangedCoverageValue(
                optionalProduct.coverageProduct.cartDisplayName,
                changeRequestData.changedPolicy
              );
              const translatedOldValue = this.getTranslation(
                ['changeRequest'],
                optionalProduct.coverageIsIncluded
              );
              const translatedNewValue = this.getTranslation(
                ['changeRequest'],
                newVal
              );
              this.setChangedPolicyObject(
                optionalProduct.coverageProduct.cartDisplayName,
                translatedOldValue,
                translatedNewValue
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
