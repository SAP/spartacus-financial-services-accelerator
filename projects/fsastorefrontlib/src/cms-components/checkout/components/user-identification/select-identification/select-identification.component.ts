import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RoutingService } from '@spartacus/core';
import { Subscription, Observable } from 'rxjs';
import { filter, take, tap } from 'rxjs/operators';
import { FSCheckoutService } from '../../../../../core/checkout/facade/checkout.service';
import { FSCheckoutConfigService } from '../../../../../core/checkout/services';
import { ActiveCategoryStep } from 'projects/fsastorefrontlib/src/occ';

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
  previousCheckoutStep$: Observable<ActiveCategoryStep>;
  nextCheckoutStep$: Observable<ActiveCategoryStep>;

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
    this.checkoutConfigService.filterSteps(this.activatedRoute);
    this.previousCheckoutStep$ = this.checkoutConfigService.previousStep;
    this.nextCheckoutStep$ = this.checkoutConfigService.nextStep;
    this.checkoutService.mockDeliveryMode();
  }

  setSelectedType(identificationType) {
    this.selected = identificationType.name;
  }

  navigateBack(previousStep) {
    this.routingService.go({
      cxRoute: previousStep.step,
      params: { code: previousStep.activeCategory },
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
            this.checkoutService.placeOrder();
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
