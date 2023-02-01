import { Component, OnInit } from '@angular/core';
import { ChangedPolicyData } from '../../../occ/occ-models/occ.models';
import { AbstractChangeProcessStepComponent } from '../abstract-change-process-step/abstract-change-process-step.component';

@Component({
  selector: 'cx-fs-change-simulation',
  templateUrl: './change-simulation.component.html',
})
export class ChangeSimulationComponent
  extends AbstractChangeProcessStepComponent
  implements OnInit
{
  currentDate: Date = new Date();

  getChangedPolicyObjects(changeRequestData: any): ChangedPolicyData[] {
    return this.changePolicyService.getChangedPolicyObjects(changeRequestData);
  }

  updateChangeRequest(changeRequest) {
    this.changeRequestService.updateChangeRequest(
      changeRequest,
      this.activeStepIndex
    );
  }
}
