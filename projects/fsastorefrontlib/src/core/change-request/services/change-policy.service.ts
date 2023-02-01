import { PolicyModule } from './../../../cms-components/my-account/policy/policy.module';
import {
  ChangedPolicyData,
  RequestType,
} from './../../../occ/occ-models/occ.models';
import { Injectable } from '@angular/core';
import { FSTranslationService } from '../../../core/i18n/facade/translation.service';

@Injectable({
  providedIn: PolicyModule,
})
export class ChangePolicyService {
  constructor(protected translationService: FSTranslationService) {}

  changedPolicyObjects: ChangedPolicyData[] = [];
  descriptionKeys = ['firstName', 'lastName'];

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
        case RequestType.INSURED_OBJECT_ADD: {
          const insuredObject =
            changeRequestData.insurancePolicy.insuredObjectList
              .insuredObjects[0];
          const changedInsuredObject =
            changeRequestData.changedPolicy.insuredObjectList.insuredObjects[0];

          changedInsuredObject.childInsuredObjectList.insuredObjects.forEach(
            childInsuredObjectItem => {
              let description = '';
              let currentValue = '';
              let newValue = '';
              childInsuredObjectItem.insuredObjectItems
                .filter(item =>
                  this.descriptionKeys.some(key => key === item.label)
                )
                .forEach(
                  foundItem =>
                    (description = `${description} ${foundItem.value}`)
                );
              if (
                this.childInsuredObjectExist(
                  insuredObject,
                  childInsuredObjectItem
                )
              ) {
                currentValue = this.getTranslation(
                  ['changeRequest'],
                  'existing'
                );
                newValue = currentValue;
              } else {
                currentValue = this.getTranslation(
                  ['changeRequest'],
                  'notAdded'
                );
                newValue = this.getTranslation(['changeRequest'], 'added');
              }
              this.setChangedPolicyObject(description, currentValue, newValue);
            }
          );
          break;
        }
        case RequestType.INSURED_OBJECT_CHANGE: {
          const insuredObject =
            changeRequestData.insurancePolicy.insuredObjectList
              .insuredObjects[0];
          const changeableInsuredObjectItems =
            insuredObject.insuredObjectItems.filter(
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
          const optionalProducts =
            changeRequestData?.insurancePolicy?.optionalProducts?.filter(
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

  childInsuredObjectExist(insuredObject, insuredObjectItem) {
    return insuredObject.childInsuredObjectList.insuredObjects.some(
      childObject =>
        insuredObjectItem.insuredObjectId === childObject.insuredObjectId
    );
  }

  setChangedPolicyObject(label: string, value: string, newValue: string) {
    const changedPolicyData = {} as ChangedPolicyData;
    changedPolicyData.label = label;
    changedPolicyData.oldValue = value;
    changedPolicyData.newValue = newValue;
    this.changedPolicyObjects.push(changedPolicyData);
  }

  getChangedValue(label: string, changedPolicy: any): string {
    const changedInsuredObjectItem =
      changedPolicy.insuredObjectList.insuredObjects[0].insuredObjectItems.find(
        insuredObjectItem => insuredObjectItem.label === label
      );
    return changedInsuredObjectItem.value;
  }

  getChangedCoverageValue(label: string, changedPolicy: any): string {
    const changedCoverage = changedPolicy?.optionalProducts.find(
      coverage => coverage.coverageProduct.cartDisplayName === label
    );
    return changedCoverage.coverageIsIncluded;
  }

  /**
   * Method used to get insured object after applying changes provided within form data
   *
   * @param changeRequest The change request
   * @param formData The form data
   */
  getChangedInsuredObject(changeRequest, formData) {
    let changedInsuredObject;
    changeRequest.insurancePolicy?.insuredObjectList?.insuredObjects?.forEach(
      insuredObject => {
        changedInsuredObject = {
          insuredObjectId: insuredObject.insuredObjectId,
          insuredObjectItems: [],
        };
        insuredObject.insuredObjectItems
          .filter(item => item.changeable)
          .forEach(item => {
            changedInsuredObject.insuredObjectItems.push({
              label: item.label,
              value: formData[item.label],
            });
          });
      }
    );
    return changedInsuredObject;
  }

  /**
   * Method used to create new insured object instance based on provided form data during change process
   *
   * @param formData The form data
   */
  createInsuredObject(formData) {
    const insuredObject: any = {
      insuredObjectItems: [],
    };
    Object.keys(formData).forEach(key => {
      insuredObject.insuredObjectItems.push({
        key: key,
        label: key,
        value: formData[key],
      });
    });
    return insuredObject;
  }
}
