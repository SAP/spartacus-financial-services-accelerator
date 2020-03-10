import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';
import { FSStepData } from '../../../../../../dist/fsastorefrontlib/occ/occ-models';
import { ChangeRequestService } from '../../../core/change-request/facade';
import { UserRequestNavigationService } from '../../../core/user-request/facade';

@Component({
  selector: 'fsa-change-process-navigation',
  templateUrl: './change-process-navigation.component.html',
})
export class ChangeProcessNavigationComponent implements OnInit {
  constructor(
    protected changeRequestService: ChangeRequestService,
    protected activatedRoute: ActivatedRoute,
    protected userRequestNavigationService: UserRequestNavigationService
  ) {}

  changeRequest$: Observable<any>;
  configurationSteps: FSStepData[];
  activeStepIndex: number;

  ngOnInit() {
    this.changeRequest$ = this.changeRequestService.getChangeRequest();
    this.changeRequest$.subscribe(changeRequestData => {
      this.configurationSteps = this.userRequestNavigationService.getConfigurationSteps(
        changeRequestData
      );
      const activeStepData = this.userRequestNavigationService.getActiveStep(
        this.configurationSteps,
        this.activatedRoute.routeConfig.path
      );
      this.activeStepIndex = this.configurationSteps.indexOf(activeStepData);
    });
  }

  navigateNext(currentStep: number) {
    // TODO: FSA-4682 - Before navigation, simulation request has to be executed from ChangeRequestService
    this.userRequestNavigationService.continue(
      this.configurationSteps,
      currentStep
    );
  }
}
