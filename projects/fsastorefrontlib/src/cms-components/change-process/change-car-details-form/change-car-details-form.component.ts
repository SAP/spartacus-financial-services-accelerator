import { Component, OnInit, OnDestroy } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ChangeRequestService } from '../../../core/change-request/facade/change-request.service';
import { UserRequestNavigationService } from './../../../core/user-request/facade/user-request-navigation.service';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { ChangeProcessStepComponent } from '../change-process-step/change-process-step.component';

@Component({
  selector: 'fsa-change-car-details-form',
  templateUrl: './change-car-details-form.component.html',
})
export class ChangeCarDetailsFormComponent extends ChangeProcessStepComponent
  implements OnInit, OnDestroy {
  constructor(
    protected changeRequestService: ChangeRequestService,
    protected fb: FormBuilder,
    protected userRequestNavigationService: UserRequestNavigationService,
    protected activatedRoute: ActivatedRoute
  ) {
    super(userRequestNavigationService, activatedRoute);
  }

  changeCarDetailsForm: FormGroup = this.fb.group({
    effectiveDate: new FormControl(
      { value: new Date().toISOString().substr(0, 10), disabled: true },
      Validators.required
    ),
    vehicleAnnualMileage: ['', [Validators.required, Validators.max(100000)]],
  });

  changeRequest$;

  private subscription = new Subscription();

  ngOnInit() {
    this.changeRequest$ = this.changeRequestService.getChangeRequest();
    this.subscription.add(
      this.changeRequest$
        .pipe(
          map(changeRequest => {
            this.populateSteps(changeRequest);
            if (this.isSimulated(changeRequest)) {
              this.userRequestNavigationService.continue(
                this.configurationSteps,
                this.activeStepIndex
              );
            }
          })
        )
        .subscribe()
    );
  }

  isSimulated(changeRequest) {
    return changeRequest.changedPolicy;
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

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
