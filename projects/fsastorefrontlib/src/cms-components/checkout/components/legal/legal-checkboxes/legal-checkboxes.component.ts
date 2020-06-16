import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RoutingService } from '@spartacus/core';
import { FSCheckoutConfigService } from '../../../../../core/checkout/services';
import { Observable } from 'rxjs';
import { ActiveCategoryStep } from 'projects/fsastorefrontlib/src/occ';

@Component({
  selector: 'cx-fs-legal-checkboxes',
  templateUrl: './legal-checkboxes.component.html',
})
export class LegalCheckboxesComponent implements OnInit {
  checkoutStepUrlNext: string;
  checkoutStepUrlBack: string;

  constructor(
    protected routingService: RoutingService,
    protected activatedRoute: ActivatedRoute,
    protected checkoutConfigService: FSCheckoutConfigService
  ) {}
  previousCheckoutStep$: Observable<ActiveCategoryStep>;
  nextCheckoutStep$: Observable<ActiveCategoryStep>;
  ngOnInit() {
    this.checkoutConfigService.filterSteps(this.activatedRoute);
    this.previousCheckoutStep$ = this.checkoutConfigService.previousStep;
    this.nextCheckoutStep$ = this.checkoutConfigService.nextStep;
  }

  navigateBack(previousStep) {
    this.routingService.go({
      cxRoute: previousStep.step,
      params: { code: previousStep.activeCategory },
    });
  }

  navigateNext(nextStep) {
    this.routingService.go({
      cxRoute: nextStep.step,
      params: { code: nextStep.activeCategory },
    });
  }
}
