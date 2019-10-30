import { Component, OnInit, OnDestroy } from '@angular/core';
import { FSUserRequest, FSStepData } from 'projects/fsastorefrontlib/src/lib/occ-models';
import { Observable, Subscription } from 'rxjs';
import { UserRequestService, UserRequestNavigationService } from '../../services';
import { map } from 'rxjs/operators';
import { RoutingConfigService, RoutingService } from '@spartacus/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'fsa-user-request-navigation',
  templateUrl: './user-request-navigation.component.html',
})
export class UserRequestNavigationComponent implements OnInit, OnDestroy {

  private subscription = new Subscription();
  userRequest$: Observable<FSUserRequest>;
  configurationSteps: FSStepData[];
  activeStepData: FSStepData;
  activeStepIndex: number;

  constructor(
    protected userRequestService: UserRequestService,
    protected routingConfigService: RoutingConfigService,
    protected activatedRoute: ActivatedRoute,
    protected routingService: RoutingService,
    protected userRequestNavigationService: UserRequestNavigationService
    ) {}

  ngOnInit() {
    this.userRequest$ = this.userRequestService.getUserRequest();
    this.subscription.add(this.userRequest$
      .pipe(
        map(userRequestData => {
          if (
            userRequestData.configurationSteps != null &&
            userRequestData.configurationSteps.length > 0
          ) {
            this.configurationSteps = userRequestData.configurationSteps;
            const activeRoute = this.activatedRoute.routeConfig.path;
            this.activeStepData = this.userRequestNavigationService.getActiveStep(this.configurationSteps, activeRoute);
            this.activeStepIndex = Number(this.activeStepData.sequenceNumber);
          }
        })
      )
      .subscribe());
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  getNumberOfConfigurationSteps(): number {
    if (this.configurationSteps) {
      return this.configurationSteps.length;
    }
  }

  next(currentStep: number): void {
    this.userRequestNavigationService.next(this.configurationSteps, currentStep);
  }

  back(currentStep: string): void {
    this.userRequestNavigationService.back(this.configurationSteps, currentStep);
  }

}
