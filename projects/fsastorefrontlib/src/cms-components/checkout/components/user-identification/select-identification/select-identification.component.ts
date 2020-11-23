import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RoutingService } from '@spartacus/core';
import { Subscription, Observable } from 'rxjs';
import { filter, take, tap } from 'rxjs/operators';
import { FSCheckoutService } from '../../../../../core/checkout/facade/checkout.service';
import { FSCheckoutConfigService } from '../../../../../core/checkout/services';
import { FSSteps } from '../../../../../occ/occ-models';
import { FSCartService } from '../../../../../core/cart/facade';

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
    protected checkoutService: FSCheckoutService,
    protected cartService: FSCartService
  ) {}

  private subscription = new Subscription();
  selected: string;
  previousCheckoutStep$: Observable<FSSteps>;

  identificationTypes: Array<any> = [
    {
      name: 'nearest_branch',
      icon: 'icon-bank',
    },
    {
      name: 'legal_identification',
      icon: 'icon-checklist',
    },
    {
      name: 'video_identification',
      icon: 'icon-video-chat',
    },
  ];

  ngOnInit() {
    this.previousCheckoutStep$ = this.checkoutConfigService.previousStep;
    this.checkoutService.mockDeliveryMode();
  }

  setSelectedType(identificationType) {
    this.selected = identificationType.name;
  }

  navigateBack(previousStep) {
    this.routingService.go({
      cxRoute: previousStep.step,
    });
  }

  setIdentificationType() {
    this.subscription.add(
      this.checkoutService
        .setIdentificationType(this.selected)
        .pipe(
          filter(identificationType => identificationType),
          take(1),
          tap(() => {
            this.checkoutService.placeOrder(true);
            this.checkoutService.orderPlaced = true;
            this.routingService.go({ cxRoute: 'orderConfirmation' });
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
