import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RoutingService } from '@spartacus/core';
import { Observable } from 'rxjs';
import { FSCheckoutConfigService } from '../../../../../core/checkout/services';
import { StepResult } from '../../../../../occ/occ-models';

@Component({
  selector: 'cx-fs-legal-checkboxes',
  templateUrl: './legal-checkboxes.component.html',
})
export class LegalCheckboxesComponent implements OnInit {
  constructor(
    protected routingService: RoutingService,
    protected activatedRoute: ActivatedRoute,
    protected checkoutConfigService: FSCheckoutConfigService
  ) {}
  previousCheckoutStep$: Observable<StepResult>;
  nextCheckoutStep$: Observable<StepResult>;

  ngOnInit() {
    this.previousCheckoutStep$ = this.checkoutConfigService.previousStep;
    this.nextCheckoutStep$ = this.checkoutConfigService.nextStep;
  }

  navigateBack(previousStep: StepResult) {
    this.routingService.go({
      cxRoute: previousStep.step,
    });
  }

  navigateNext(nextStep: StepResult) {
    this.routingService.go({
      cxRoute: nextStep.step,
    });
  }
}
