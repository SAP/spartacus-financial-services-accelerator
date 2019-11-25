import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormDataService } from '@fsa/dynamicforms';
import { ActivatedRoute } from '@angular/router';
import { RoutingService } from '@spartacus/core';
import { FSCheckoutConfigService } from '../../../../core/checkout/services/fs-checkout-config.service';
import { switchMap, map } from 'rxjs/operators';
import { of, Subscription } from 'rxjs';

@Component({
  selector: 'fsa-form-navigation',
  templateUrl: './form-navigation.component.html',
})
export class FormNavigationComponent implements OnInit, OnDestroy {
  constructor(
    protected formService: FormDataService,
    protected activatedRoute: ActivatedRoute,
    protected routingService: RoutingService,
    protected checkoutConfigService: FSCheckoutConfigService
  ) {}

  subscription = new Subscription();
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

  navigateNext() {
    this.formService.submit();
    this.subscription.add(
      this.formService
        .getSubmittedForm()
        .pipe(
          switchMap(formData => {
            if (formData && formData.id) {
              return this.activatedRoute.params.pipe(
                map(params => {
                  // *** TO BE REFACTORED IN FSA-4467
                  if (this.checkoutStepUrlNext.indexOf('categoryCode') !== -1) {
                    this.routingService.go({
                      cxRoute: 'category',
                      params: { code: params['formCode'] },
                    });
                  } else {
                    this.routingService.go(this.checkoutStepUrlNext);
                  }
                })
              );
            }
            return of(null);
          })
        )
        .subscribe()
    );
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
