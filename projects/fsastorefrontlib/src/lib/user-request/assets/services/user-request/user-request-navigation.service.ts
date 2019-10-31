import { Injectable } from '@angular/core';
import { RoutingConfigService, RoutingService } from '@spartacus/core';
import { ActivatedRoute } from '@angular/router';
import { FSStepData } from '../../../../../lib/occ-models';

@Injectable()
export class UserRequestNavigationService {
  configurationSteps: FSStepData[];
  activeStepIndex: number;

  constructor(
    protected routingConfigService: RoutingConfigService,
    protected activatedRoute: ActivatedRoute,
    protected routingService: RoutingService
  ) {}

  getActiveStep(
    configurationSteps: FSStepData[],
    activeRoutePath: string
  ): FSStepData {
    if (configurationSteps) {
      return configurationSteps.filter(
        step => step.pageLabelOrId === activeRoutePath
      )[0];
    }
  }

  next(configurationSteps: FSStepData[], currentIndex: number): void {
    if (configurationSteps && currentIndex >= 0) {
      const nextStep = configurationSteps [currentIndex + 1];
      this.routingService.go({
        cxRoute: nextStep.pageLabelOrId,
      });
    }
  }

  back(configurationSteps: FSStepData[], currentIndex: number): void {
    if (configurationSteps && currentIndex >= 0) {
      const previousStep = configurationSteps [currentIndex  - 1];
      this.routingService.go({
        cxRoute: previousStep.pageLabelOrId,
      });
    }
  }
}
