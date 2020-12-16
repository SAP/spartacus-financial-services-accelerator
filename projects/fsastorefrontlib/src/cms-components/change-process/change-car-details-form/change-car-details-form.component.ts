import { ChangeRequestService } from './../../../core/change-request/facade/change-request.service';
import { UserRequestNavigationService } from './../../../core/user-request/facade/user-request-navigation.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { DefaultFormValidators } from '@spartacus/dynamicforms';

import { GlobalMessageService, RoutingService } from '@spartacus/core';
import { AbstractChangeProcessStepComponent } from '../abstract-change-process-step/abstract-change-process-step.component';
import { ChangePolicyService } from './../../../core/change-request/services/change-policy.service';
import { DateConfig } from './../../../core/date-config/date-config';

@Component({
  selector: 'cx-fs-change-car-details-form',
  templateUrl: './change-car-details-form.component.html',
})
export class ChangeCarDetailsFormComponent
  extends AbstractChangeProcessStepComponent
  implements OnInit, OnDestroy {
  constructor(
    protected userRequestNavigationService: UserRequestNavigationService,
    protected changeRequestService: ChangeRequestService,
    protected activatedRoute: ActivatedRoute,
    protected routingService: RoutingService,
    protected globalMessageService: GlobalMessageService,
    protected fb: FormBuilder,
    protected changePolicyService: ChangePolicyService,
    protected config: DateConfig
  ) {
    super(
      userRequestNavigationService,
      changeRequestService,
      activatedRoute,
      routingService,
      globalMessageService,
      fb,
      changePolicyService
    );
  }
  changeCarDetailsForm: FormGroup = this.fb.group({
    effectiveDate: new FormControl(
      { value: new Date().toISOString().substr(0, 10), disabled: true },
      Validators.required
    ),
    vehicleAnnualMileage: [
      '',
      [
        Validators.required,
        Validators.max(200000),
        DefaultFormValidators.number,
      ],
    ],
  });

  ngOnInit() {
    super.ngOnInit();
  }

  simulateChanges(changeRequest) {
    if (
      this.changeCarDetailsForm.valid &&
      changeRequest.insurancePolicy &&
      changeRequest.insurancePolicy.insuredObjectList &&
      changeRequest.insurancePolicy.insuredObjectList.insuredObjects &&
      changeRequest.insurancePolicy.insuredObjectList.insuredObjects.length > 0
    ) {
      let changedInsuredObject;
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
                value: this.changeCarDetailsForm.controls[item.label].value,
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
    }
  }
  getDateFormat() {
    return this.config.date.format || '';
  }
}
