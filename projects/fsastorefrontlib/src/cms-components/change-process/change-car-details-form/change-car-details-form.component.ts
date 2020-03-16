import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ChangeRequestService } from '../../../core/change-request/facade/change-request.service';

@Component({
  selector: 'fsa-change-car-details-form',
  templateUrl: './change-car-details-form.component.html',
})
export class ChangeCarDetailsFormComponent implements OnInit {
  constructor(
    protected changeRequestService: ChangeRequestService,
    protected fb: FormBuilder
  ) {}

  changeCarDetailsForm: FormGroup = this.fb.group({
    effectiveDate: new FormControl(
      { value: new Date().toISOString().substr(0, 10), disabled: true },
      Validators.required
    ),
    vehicleAnnualMileage: ['', [Validators.required, Validators.max(100000)]],
  });

  changeRequest$;

  ngOnInit() {
    this.changeRequest$ = this.changeRequestService.getChangeRequest();
  }

  simulateChanges(changeRequest) {
    if (this.changeCarDetailsForm.valid) {
      let changedInsuredObject;
      if (
        changeRequest.insurancePolicy &&
        changeRequest.insurancePolicy.insuredObjectList &&
        changeRequest.insurancePolicy.insuredObjectList.insuredObjects &&
        changeRequest.insurancePolicy.insuredObjectList.insuredObjects.length >
          0
      ) {
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
      }
      this.changeRequestService.simulateChangeRequest({
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
