import { FSStepData } from './../../../occ/occ-models/occ.models';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';
import { ChangeRequestService } from '../../../core/change-request/facade';
import { UserRequestNavigationService } from '../../../core/user-request/facade';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'fsa-change-process-navigation',
  templateUrl: './change-process-navigation.component.html',
})
export class ChangeProcessNavigationComponent implements OnInit, OnDestroy {
  constructor(
    protected changeRequestService: ChangeRequestService,
    protected activatedRoute: ActivatedRoute,
    protected userRequestNavigationService: UserRequestNavigationService
  ) {}

  changeRequest$: Observable<any>;
  configurationSteps: FSStepData[];
  activeStepIndex: number;
  subscription = new Subscription();

  ngOnInit() {
    this.changeRequest$ = this.changeRequestService.getChangeRequest();
    this.subscription.add(
      this.changeRequest$
        .pipe(
          map(changeRequestData => {
            this.configurationSteps = this.userRequestNavigationService.getConfigurationSteps(
              changeRequestData
            );
            const activeStepData = this.userRequestNavigationService.getActiveStep(
              this.configurationSteps,
              this.activatedRoute.routeConfig.path
            );
            this.activeStepIndex = this.configurationSteps.indexOf(
              activeStepData
            );
          })
        )
        .subscribe()
    );
  }
  submitChangeRequest(changeRequestId) {
    this.changeRequestService.submitChangeRequest(changeRequestId);
  }

  navigateNext(currentStep: number) {
    // TODO: FSA-4682 - Before navigation, simulation request has to be executed from ChangeRequestService
    this.userRequestNavigationService.continue(
      this.configurationSteps,
      currentStep
    );
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
