import { Component, OnInit } from '@angular/core';
import { FSStepData } from './../../../occ/occ-models';
import { ActivatedRoute } from '@angular/router';
import { UserRequestNavigationService } from './../../../core/user-request/facade/user-request-navigation.service';

@Component({
  selector: 'fsa-change-process-step',
  templateUrl: './change-process-step.component.html',
})
export class ChangeProcessStepComponent implements OnInit {
  constructor(
    protected userRequestNavigationService: UserRequestNavigationService,
    protected activatedRoute: ActivatedRoute
  ) {}

  configurationSteps: FSStepData[];
  activeStepIndex: number;

  ngOnInit() {}

  populateSteps(changeRequest) {
    this.configurationSteps = this.userRequestNavigationService.getConfigurationSteps(
      changeRequest
    );
    const activeStepData = this.userRequestNavigationService.getActiveStep(
      this.configurationSteps,
      this.activatedRoute.routeConfig.path
    );
    this.activeStepIndex = this.configurationSteps.indexOf(activeStepData);
  }
}
