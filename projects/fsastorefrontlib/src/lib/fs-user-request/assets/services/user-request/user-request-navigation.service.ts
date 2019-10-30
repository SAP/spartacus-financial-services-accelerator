import { Injectable } from '@angular/core';
import { FSStepData } from 'projects/fsastorefrontlib/src/lib/occ-models';
import { RoutingConfigService, RoutingService } from '@spartacus/core';
import { ActivatedRoute } from '@angular/router';

@Injectable()
export class UserRequestNavigationService {

  configurationSteps: FSStepData[];
  activeStepIndex: number;

  constructor(
    protected routingConfigService: RoutingConfigService,
    protected activatedRoute: ActivatedRoute,
    protected routingService: RoutingService,
    ) {}

  getActiveStep(configurationSteps: FSStepData[], activeRoutePath: string): FSStepData {
      if (configurationSteps) {
        return configurationSteps.filter(step => step.pageLabelOrId === activeRoutePath)[0];
      }
  }

  next(configurationSteps: FSStepData[], currentStep: number): void {
    if (configurationSteps) {
      const nextStepRoute = configurationSteps.filter(step => +step.sequenceNumber === +currentStep + 1)[0];
      this.routingService.go({
        cxRoute: nextStepRoute.pageLabelOrId
      });
    }
  }

  back(configurationSteps: FSStepData[], currentStep: string): void {
    if (configurationSteps) {
        const nextStepRoute = configurationSteps.filter(step => +step.sequenceNumber === +currentStep - 1)[0];
        this.routingService.go({
          cxRoute: nextStepRoute.pageLabelOrId
        });
      }
  }
}
