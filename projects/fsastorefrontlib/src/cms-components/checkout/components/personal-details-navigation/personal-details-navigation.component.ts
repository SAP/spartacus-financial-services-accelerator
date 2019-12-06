import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormDataService } from '@fsa/dynamicforms';
import { CartService, RoutingService } from '@spartacus/core';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { FSCartService } from './../../../../core/checkout/services/cart/fs-cart.service';
import { FSCheckoutConfigService } from './../../../../core/checkout/services/fs-checkout-config.service';
import { FSCart } from './../../../../occ/occ-models/occ.models';

@Component({
  selector: 'fsa-personal-details-navigation',
  templateUrl: './personal-details-navigation.component.html',
})
export class PersonalDetailsNavigationComponent implements OnInit {
  constructor(
    protected cartService: CartService,
    protected formService: FormDataService,
    protected activatedRoute: ActivatedRoute,
    protected routingService: RoutingService,
    protected checkoutConfigService: FSCheckoutConfigService,
    protected fsCartService: FSCartService
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
    this.subscription.add(
      this.cartService
        .getActive()
        .pipe(
          map(cart => {
            if (
              cart &&
              cart.code &&
              cart.deliveryOrderGroups &&
              cart.deliveryOrderGroups.length > 0 &&
              cart.deliveryOrderGroups[0].entries.length > 0
            ) {
              this.formService.submit({
                refId:
                  cart.code +
                  '_' +
                  cart.deliveryOrderGroups[0].entries[0].entryNumber,
              });
            }
            this.fsCartService.reLoadCart(<FSCart>cart);
            this.formService
              .getSubmittedForm()
              .pipe(
                map(formData => {
                  if (formData && formData.id) {
                    this.routingService.go(this.checkoutStepUrlNext);
                  }
                })
              )
              .subscribe();
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
