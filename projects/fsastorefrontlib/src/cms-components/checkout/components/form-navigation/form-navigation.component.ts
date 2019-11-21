import { Component, OnInit } from '@angular/core';
import { FormDataService } from '@fsa/dynamicforms';
import { ActivatedRoute } from '@angular/router';
import { RoutingService } from '@spartacus/core';
import { FSCheckoutConfigService } from '../../../../core/checkout/services/fs-checkout-config.service';


@Component({
  selector: 'fsa-form-navigation',
  templateUrl: './form-navigation.component.html',
})
export class FormNavigationComponent implements OnInit {
  constructor(
    protected formService: FormDataService,
    protected activatedRoute: ActivatedRoute,
    protected routingService: RoutingService,
    protected checkoutConfigService: FSCheckoutConfigService
  ) {}

  checkoutStepUrlNext: string;
  checkoutStepUrlPrevious: string;

  ngOnInit() {
    this.checkoutStepUrlNext = this.checkoutConfigService.getNextCheckoutStepUrl(
      this.activatedRoute
    );

    this.checkoutStepUrlPrevious = this.checkoutConfigService.getPreviousCheckoutStepUrl(
      this.activatedRoute
    );
  }

  next() {
    this.formService.submit();
    this.formService.getSubmittedForm().subscribe(formData => {
      if (formData && formData.id) {
        this.activatedRoute.params.subscribe(params => {
          if (this.checkoutStepUrlNext.indexOf('categoryCode') !== -1) {
            this.routingService.go({
              cxRoute: 'category',
              params: { code: params['formCode'] },
            });
          } else {
            this.routingService.go(this.checkoutStepUrlNext);
          }
        });
      }
    });
  }
}
