import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RoutingService } from '@spartacus/core';
import { Observable } from 'rxjs';
import { FSCheckoutConfigService } from '../../../../../core/checkout/services';
import { FSSteps } from '../../../../../occ/occ-models';
import { FSCheckoutService } from './../../../../../core/checkout/facade/checkout.service';

@Component({
  selector: 'cx-fs-legal-checkboxes',
  templateUrl: './legal-checkboxes.component.html',
})
export class LegalCheckboxesComponent implements OnInit {
  constructor(
    protected routingService: RoutingService,
    protected activatedRoute: ActivatedRoute,
    protected checkoutConfigService: FSCheckoutConfigService,
    protected checkoutService: FSCheckoutService
  ) {}
  previousCheckoutStep$: Observable<FSSteps>;
  nextCheckoutStep$: Observable<FSSteps>;

  ngOnInit() {
    this.previousCheckoutStep$ = this.checkoutConfigService.previousStep;
    this.nextCheckoutStep$ = this.checkoutConfigService.nextStep;
  }

  navigateBack(previousStep: FSSteps) {
    this.routingService.go({
      cxRoute: previousStep.step,
    });
  }

  navigateNext(nextStep: FSSteps, form: FormGroup) {
    if (!form.valid) {
      return;
    }
    this.checkoutService.setLegalInformation();
    this.routingService.go({
      cxRoute: nextStep.step,
    });
  }
}
