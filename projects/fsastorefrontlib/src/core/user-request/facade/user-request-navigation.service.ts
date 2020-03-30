import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RoutingService } from '@spartacus/core';
import { FSStepData } from '../../../occ/occ-models';

@Injectable()
export class UserRequestNavigationService {
  configurationSteps: FSStepData[];

  constructor(
    protected activatedRoute: ActivatedRoute,
    protected routingService: RoutingService
  ) {}

  getConfigurationSteps(userRequestData) {
    if (
      userRequestData &&
      userRequestData.configurationSteps != null &&
      userRequestData.configurationSteps.length > 0
    ) {
      return userRequestData.configurationSteps;
    }
  }

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
      if (nextStep && nextStep.pageLabelOrId) {
        this.routingService.go({
          cxRoute: nextStep.pageLabelOrId,
        });
      }
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
