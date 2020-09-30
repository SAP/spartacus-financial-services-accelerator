import { ChangeRequestService } from '../../../core/change-request/facade/change-request.service';
import { UserRequestNavigationService } from '../../../core/user-request/facade/user-request-navigation.service';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { GlobalMessageService, RoutingService } from '@spartacus/core';
import { AbstractChangeProcessStepComponent } from '../abstract-change-process-step/abstract-change-process-step.component';
import { ChangePolicyService } from '../../../core/change-request/services/change-policy.service';
import { YFormData, FormDataService } from '@fsa/dynamicforms';
import { map, take, filter } from 'rxjs/operators';

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
    protected formDataService: FormDataService
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
    if (
      changeRequest?.insurancePolicy?.insuredObjectList?.insuredObjects.length >
      0
    ) {
      let changedInsuredObject;
      const yFormData: YFormData = {};
      this.formDataService.submit(yFormData);
      this.formDataService
        .getSubmittedForm()
        .pipe(
          filter(formData => formData.content !== undefined),
          take(1),
          map(submittedFormData => {
            const changeCarDetailsForm = JSON.parse(submittedFormData.content);
            changeRequest.insurancePolicy.insuredObjectList.insuredObjects.forEach(
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
                      value: changeCarDetailsForm[item.label],
                    });
                  });
              }
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
          })
        )
        .subscribe();
    }
  }
}
