import { Injectable } from '@angular/core';
import { RoutingService } from '@spartacus/core';
import { ActivatedRoute } from '@angular/router';
import { FSStepData } from '../../../../occ/occ-models';

@Injectable()
export class UserRequestNavigationService {
  configurationSteps: FSStepData[];

  constructor(
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

  continue(configurationSteps: FSStepData[], currentIndex: number): void {
    if (configurationSteps && currentIndex >= 0) {
      const nextStep = configurationSteps[currentIndex + 1];
      this.routingService.go({
        cxRoute: nextStep.pageLabelOrId,
      });
    }
  }

  back(configurationSteps: FSStepData[], currentIndex: number): void {
    if (configurationSteps && currentIndex >= 0) {
      const previousStep = configurationSteps[currentIndex - 1];
      this.routingService.go({
        cxRoute: previousStep.pageLabelOrId,
      });
    }
  }
}
