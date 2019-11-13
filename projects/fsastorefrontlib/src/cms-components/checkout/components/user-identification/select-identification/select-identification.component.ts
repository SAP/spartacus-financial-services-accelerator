import { Component, OnInit } from '@angular/core';
import { RoutingService } from '@spartacus/core';
import { ActivatedRoute } from '@angular/router';
import { FSCheckoutConfigService } from '../../../../../core/checkout/services';
import { FSCheckoutService } from '../../../../../core/checkout/services/fs-checkout.service';
import { filter, take, tap } from 'rxjs/operators';

@Component({
  selector: 'fsa-select-identification',
  templateUrl: './select-identification.component.html',
})
export class SelectIdentificationTypeComponent implements OnInit {
  checkoutStepUrlBack: string;

  constructor(
    protected routingService: RoutingService,
    protected activatedRoute: ActivatedRoute,
    protected checkoutConfigService: FSCheckoutConfigService,
    protected checkoutService: FSCheckoutService
  ) {}

  selected: string;
  identificationTypes: Array<any> = [
    {
      name: 'nearest_branch',
      icon: 'icon-FSA-person',
    },
    {
      name: 'legal_identification',
      icon: 'icon-FSA-payment-cards',
    },
    {
      name: 'video_identification',
      icon: 'icon-FSA-shield',
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
    this.checkoutService
      .setIdentificationType(this.selected)
      .pipe(
        filter(identificationType => identificationType),
        take(1),
        tap(next => {
          this.checkoutService.placeOrder();
          this.routingService.go({ cxRoute: 'orderConfirmation' });
        })
      )
      .subscribe();
  }

  back() {
    this.routingService.go(this.checkoutStepUrlBack);
  }
}
