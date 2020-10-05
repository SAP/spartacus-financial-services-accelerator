import { ChangeRequestService } from '../../../core/change-request/facade/change-request.service';
import { UserRequestNavigationService } from '../../../core/user-request/facade/user-request-navigation.service';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { GlobalMessageService, RoutingService } from '@spartacus/core';
import { AbstractChangeProcessStepComponent } from '../abstract-change-process-step/abstract-change-process-step.component';
import { ChangePolicyService } from '../../../core/change-request/services/change-policy.service';
import {
  YFormData,
  FormDataService,
  FormDataStorageService,
} from '@fsa/dynamicforms';
import { map, take, filter } from 'rxjs/operators';
import { RequestType } from './../../../occ/occ-models';

@Component({
  selector: 'cx-fs-change-car-details-navigation',
  templateUrl: './change-car-details-navigation.component.html',
})
export class ChangeCarDetailsNavigationComponent extends AbstractChangeProcessStepComponent {
  constructor(
    protected userRequestNavigationService: UserRequestNavigationService,
    protected changeRequestService: ChangeRequestService,
    protected activatedRoute: ActivatedRoute,
    protected routingService: RoutingService,
    protected globalMessageService: GlobalMessageService,
    protected changePolicyService: ChangePolicyService,
    protected formDataService: FormDataService,
    protected formDataStoragetService: FormDataStorageService
  ) {
    super(
      userRequestNavigationService,
      changeRequestService,
      activatedRoute,
      routingService,
      globalMessageService,
      changePolicyService
    );
  }

  simulateChanges(changeRequest) {
    if (changeRequest?.insurancePolicy) {
      const yFormData: YFormData = {};
      this.formDataService.submit(yFormData);
      this.formDataService
        .getSubmittedForm()
        .pipe(
          filter(formData => formData.content !== undefined),
          take(1),
          map(submittedFormData => {
            const changeProcessForm = JSON.parse(submittedFormData.content);
            if (
              changeRequest.fsStepGroupDefinition?.requestType?.code ===
              RequestType.INSURED_OBJECT_CHANGE
            ) {
              const changedInsuredObject = this.getChangedInsuredObject(
                changeRequest,
                changeProcessForm
              );
              this.simulateChangeRequest({
                requestId: changeRequest.requestId,
                insurancePolicy: {
                  insuredObjectList: {
                    insuredObjects: [changedInsuredObject],
                  },
                },
                configurationSteps: changeRequest.configurationSteps,
              });
            }
            if (
              changeRequest.fsStepGroupDefinition?.requestType?.code ===
              RequestType.INSURED_OBJECT_ADD
            ) {
              const addedInsuredObject = this.getAddedInsuredObject(
                changeRequest,
                changeProcessForm
              );
              this.simulateChangeRequest({
                requestId: changeRequest.requestId,
                insurancePolicy: {
                  insuredObjectList: {
                    insuredObjects: [
                      {
                        insuredObjectId: this.getMainInsuredObjectId(changeRequest),
                        childInsuredObjectList: {
                          insuredObjects: [addedInsuredObject],
                        },
                      },
                    ],
                  },
                },
                configurationSteps: changeRequest.configurationSteps,
              });
            }
            this.formDataStoragetService.clearFormDataIdFromLocalStorage(
              submittedFormData.id
            );
          })
        )
        .subscribe();
    }
  }

  // pomeriti u servis
  protected getChangedInsuredObject(
    changeRequest: any,
    changeProcessForm: any
  ) {
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
              value: changeProcessForm[item.label],
            });
          });
      }
    );
    return changedInsuredObject;
  }

  // stay here
  protected getAddedInsuredObject(changeRequest, changeProcessForm) {
    const newInsuredObject = {
      insuredObjectType: this.getTypeOfChidlInsuredObject(changeRequest),
      insuredObjectItems: [],
    };
    Object.keys(changeProcessForm).forEach(key => {
      newInsuredObject.insuredObjectItems.push({
        key: key,
        label: key,
        value: changeProcessForm[key],
      });
    });
    return newInsuredObject;
  }

  private getMainInsuredObjectId(changeRequest) {
    return changeRequest.insurancePolicy?.insuredObjectList?.insuredObjects[0]?.insuredObjectId;
  }

  private getTypeOfChidlInsuredObject(changeRequest) {
    return changeRequest.insurancePolicy?.insuredObjectList?.insuredObjects[0]?.childInsuredObjectList?.insuredObjects[0]?.insuredObjectType;
  }

}
