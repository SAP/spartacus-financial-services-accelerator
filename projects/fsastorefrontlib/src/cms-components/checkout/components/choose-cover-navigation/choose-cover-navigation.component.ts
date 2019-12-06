import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormDataService } from '@fsa/dynamicforms';
import { RoutingService } from '@spartacus/core';
import { of, Subscription } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { FSCheckoutConfigService } from './../../../../core/checkout/services/fs-checkout-config.service';

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

  ngOnInit() {}

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
