import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { AbstractChangeProcessStepComponent } from '../abstract-change-process-step/abstract-change-process-step.component';

@Component({
  selector: 'fsa-change-car-details-form',
  templateUrl: './change-car-details-form.component.html',
})
export class ChangeCarDetailsFormComponent
  extends AbstractChangeProcessStepComponent
  implements OnInit, OnDestroy {
  changeCarDetailsForm: FormGroup = this.fb.group({
    effectiveDate: new FormControl(
      { value: new Date().toISOString().substr(0, 10), disabled: true },
      Validators.required
    ),
    vehicleAnnualMileage: ['', [Validators.required, Validators.max(100000)]],
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
          const changedItem = insuredObject.insuredObjectItems.filter(
            item => item.label === 'vehicleAnnualMileage'
          );
          if (changedItem) {
            changedInsuredObject = {
              insuredObjectId: insuredObject.insuredObjectId,
              insuredObjectItems: [
                {
                  label: changedItem[0].label,
                  value: this.changeCarDetailsForm.value.vehicleAnnualMileage,
                },
              ],
            };
          }
        }
      );
      this.simulateChangeRequest({
        requestId: changeRequest.requestId,
        insurancePolicy: {
          insuredObjectList: {
            insuredObjects: [changedInsuredObject],
          },
        },
      });
    }
  }
}
