import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RoutingService } from '@spartacus/core';
import { Subscription } from 'rxjs';
import { filter, take, tap } from 'rxjs/operators';
import { FSCheckoutService } from '../../../../../core/checkout/facade/checkout.service';
import { FSCheckoutConfigService } from '../../../../../core/checkout/services';

@Component({
  selector: 'cx-fs-select-identification',
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
      icon: 'icon-legal-id',
    },
    {
      name: 'legal_identification',
      icon: 'icon-bank-branch',
    },
    {
      name: 'video_identification',
      icon: 'icon-video-id',
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
