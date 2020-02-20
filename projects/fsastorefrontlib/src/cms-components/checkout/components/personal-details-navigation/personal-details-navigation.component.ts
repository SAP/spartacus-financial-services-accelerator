import { FSCartService } from './../../../../core/cart/facade/fs-cart.service';
import { FSOrderEntry } from '../../../../occ/occ-models';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormDataService, YFormData } from '@fsa/dynamicforms';
import { RoutingService, Cart } from '@spartacus/core';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { FSCheckoutConfigService } from './../../../../core/checkout/services/fs-checkout-config.service';

@Component({
  selector: 'fsa-personal-details-navigation',
  templateUrl: './personal-details-navigation.component.html',
})
export class PersonalDetailsNavigationComponent implements OnInit {
  constructor(
    protected cartService: FSCartService,
    protected formService: FormDataService,
    protected activatedRoute: ActivatedRoute,
    protected routingService: RoutingService,
    protected checkoutConfigService: FSCheckoutConfigService
  ) {}

  subscription = new Subscription();
  checkoutStepUrlNext: string;

  ngOnInit() {
    this.checkoutStepUrlNext = this.checkoutConfigService.getNextCheckoutStepUrl(
      this.activatedRoute
    );
  }

  navigateNext() {
    this.subscription
      .add(
        this.cartService
          .getActive()
          .pipe(
            map((cart: Cart) => {
              if (
                cart &&
                cart.code &&
                cart.deliveryOrderGroups &&
                cart.deliveryOrderGroups.length > 0 &&
                cart.deliveryOrderGroups[0].entries.length > 0
              ) {
                const entry: FSOrderEntry =
                  cart.deliveryOrderGroups[0].entries[0];
                const yFormData: YFormData = {
                  refId:
                    cart.code +
                    '_' +
                    cart.deliveryOrderGroups[0].entries[0].entryNumber,
                };
                if (entry.formDataData && entry.formDataData.length > 0) {
                  yFormData.id = entry.formDataData[0].id;
                }

                this.formService.submit(yFormData);
              }
            })
          )
          .subscribe()
      )
      .add(
        this.formService
          .getSubmittedForm()
          .pipe(
            map(formData => {
              if (formData && formData.content) {
                this.routingService.go(this.checkoutStepUrlNext);
              }
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
