import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RoutingService } from '@spartacus/core';
import { filter, take, tap } from 'rxjs/operators';
import { FSCheckoutService } from '../../../../../core/checkout/facade/fs-checkout.service';
import { FSCheckoutConfigService } from '../../../../../core/checkout/services';
import { Subscription } from 'rxjs';

@Component({
  selector: 'fsa-select-identification',
  templateUrl: './select-identification.component.html',
})
export class SelectIdentificationTypeComponent implements OnInit, OnDestroy {
  checkoutStepUrlBack: string;

  constructor(
    protected routingService: RoutingService,
    protected activatedRoute: ActivatedRoute,
    protected checkoutConfigService: FSCheckoutConfigService,
    protected checkoutService: FSCheckoutService
  ) {}

  private subscription = new Subscription();
  selected: string;
  identificationTypes: Array<any> = [
    {
      name: 'nearest_branch',
      icon: 'icon-person',
    },
    {
      name: 'legal_identification',
      icon: 'icon-payment-cards',
    },
    {
      name: 'video_identification',
      icon: 'icon-shield',
    },
  ];

  ngOnInit() {
    this.checkoutStepUrlBack = this.checkoutConfigService.getPreviousCheckoutStepUrl(
      this.activatedRoute
    );
    this.checkoutService.mockDeliveryMode();
  }

  setSelectedType(identificationType) {
    this.selected = identificationType.name;
  }

  setIdentificationType() {
    this.subscription.add(
      this.checkoutService
        .setIdentificationType(this.selected)
        .pipe(
          filter(identificationType => identificationType),
          take(1),
          tap(() => {
            this.checkoutService.placeOrder();
            this.checkoutService.orderPlaced = true;
            this.routingService.go({ cxRoute: 'orderConfirmation' });
          })
        )
        .subscribe()
    );
  }

  back() {
    this.routingService.go(this.checkoutStepUrlBack);
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
