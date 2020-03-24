import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { AbstractChangeProcessStepComponent } from '../abstract-change-process-step/abstract-change-process-step.component';
import { Subscription } from 'rxjs';

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
  private carDetailsSubscription = new Subscription();

  ngOnInit() {
    super.ngOnInit();
    this.carDetailsSubscription.add(
      this.changeRequestService
        .getSimulateChangeRequestError()
        .subscribe(error => this.onError(error))
    );
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

  protected onError(error: boolean) {
    if (error) {
      this.routingService.go({
        cxRoute: '/',
      });
    }
  }

  ngOnDestroy() {
    if (this.carDetailsSubscription) {
      this.carDetailsSubscription.unsubscribe();
    }
  }
}
