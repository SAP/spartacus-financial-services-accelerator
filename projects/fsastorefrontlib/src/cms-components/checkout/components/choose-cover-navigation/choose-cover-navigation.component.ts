import { FormDataService } from '@fsa/dynamicforms';
import { FSCheckoutConfigService } from './../../../../core/checkout/services/fs-checkout-config.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RoutingService } from '@spartacus/core';
import { Subscription, of } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';

@Component({
  selector: 'fsa-choose-cover-navigation',
  templateUrl: './choose-cover-navigation.component.html',
})
export class ChooseCoverNavigationComponent implements OnInit {
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
    this.formService.submit({});
    this.subscription.add(
      this.formService
        .getSubmittedForm()
        .pipe(
          switchMap(formData => {
            if (formData && formData.id) {
              return this.activatedRoute.params.pipe(
                map(params => {
                  this.routingService.go({
                    cxRoute: 'category',
                    params: { code: params['formCode'] },
                  });
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
