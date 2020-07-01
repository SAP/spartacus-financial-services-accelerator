import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RoutingService } from '@spartacus/core';
import { Observable } from 'rxjs';
import { FSCheckoutConfigService } from '../../../../../core/checkout/services';
import { ActiveCategoryStep } from '../../../../../occ/occ-models';

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
  previousCheckoutStep$: Observable<ActiveCategoryStep>;
  nextCheckoutStep$: Observable<ActiveCategoryStep>;

  ngOnInit() {
    this.previousCheckoutStep$ = this.checkoutConfigService.previousStep;
    this.nextCheckoutStep$ = this.checkoutConfigService.nextStep;
  }

  navigateBack(previousStep: ActiveCategoryStep) {
    this.routingService.go({
      cxRoute: previousStep.step,
      params: { code: previousStep.activeCategory },
    });
  }

  navigateNext(nextStep: ActiveCategoryStep) {
    this.routingService.go({
      cxRoute: nextStep.step,
      params: { code: nextStep.activeCategory },
    });
  }
}
