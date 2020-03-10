import { Component, OnInit } from '@angular/core';
import { ChangedPolicyData } from 'projects/fsastorefrontlib/src/occ';
import { Observable } from 'rxjs/internal/Observable';
import { ChangeRequestService } from './../../../core/change-request/facade/change-request.service';

export const INSURED_OBJECT_CHANGE = 'FSINSUREDOBJECT_CHANGE';

@Component({
  selector: 'fsa-change-simulation',
  templateUrl: './change-simulation.component.html',
})
export class ChangeSimulationComponent implements OnInit {
  constructor(protected changeRequestService: ChangeRequestService) { }

  changeRequest$: Observable<any>;
  changedPolicyObjects: ChangedPolicyData[];

  ngOnInit() {
    this.changeRequest$ = this.changeRequestService.getChangeRequest();
    this.changeRequest$.subscribe(changeRequestData => {
      this.changedPolicyObjects = this.getChangedPolicyObjects(changeRequestData);
      console.log(this.changedPolicyObjects);
    });
  }

  getChangedPolicyObjects(changeRequestData: any): ChangedPolicyData[] {
    const changedPolicyObjects: ChangedPolicyData[] = [];
    if (changeRequestData.fsStepGroupDefinition) {
      const changeRequestType = changeRequestData.fsStepGroupDefinition.requestType;
      if (changeRequestType.code === INSURED_OBJECT_CHANGE) {
        const changeableInsuredObjectItems = changeRequestData.insurancePolicy.insuredObjectList
          .insuredObjects[0].insuredObjectItems.filter(insuredObjectItem => insuredObjectItem.changeable === true);
        // Potentially, this part can be refactored and moved to separate method. In case of coverages, we need to
        // iterate through some list (optional products) and set properties on changed policy data, so it is basically same logic
        if (changeableInsuredObjectItems) {
          changeableInsuredObjectItems.forEach(insuredObjectItem => {
            const changedPolicyData = {} as ChangedPolicyData;
            changedPolicyData.label = insuredObjectItem.label;
            changedPolicyData.oldValue = insuredObjectItem.value;
            changedPolicyData.newValue = this.getChangedValue(changedPolicyData.label, changeRequestData.changedPolicy);
            changedPolicyObjects.push(changedPolicyData);
          });
        }
      }
    }
    return changedPolicyObjects;
  }

  getChangedValue(label: string, changedPolicy: any): string {
    const changedInsuredObjectItem = changedPolicy.insuredObjectList
      .insuredObjects[0].insuredObjectItems.find(insuredObjectItem => insuredObjectItem.label === label);
    return changedInsuredObjectItem.value;
  }

}
