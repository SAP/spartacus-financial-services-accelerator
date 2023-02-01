import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RoutingService, UserIdService } from '@spartacus/core';
import { Subscription, Observable, combineLatest } from 'rxjs';
import { filter, map, take } from 'rxjs/operators';
import { FSCheckoutService } from '../../../../../core/checkout/facade/checkout.service';
import { FSCheckoutConfigService } from '../../../../../core/checkout/services';
import { FSCart, FSSteps } from '../../../../../occ/occ-models';
import { FSCartService } from '../../../../../core/cart/facade';
import { ActiveCartService } from '@spartacus/cart/base/core';

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
    protected cartService: FSCartService,
    protected activeCartService: ActiveCartService,
    protected userIdService: UserIdService
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

  setIdentificationType() {
    if (!this.selected) {
      return;
    }
    combineLatest([
      this.activeCartService.getActive(),
      this.userIdService.getUserId(),
    ])
      .pipe(
        filter(([cart]) => !!cart),
        take(1),
        map(([cart, occUserId]) => {
          const fsCart = <FSCart>cart;
          this.checkoutService.setIdentificationType(
            fsCart.code,
            occUserId,
            this.selected
          );
          this.checkoutService.placeOrder(true);
          this.checkoutService.orderPlaced = true;
          localStorage.setItem(
            'bankingApplicationPrice',
            fsCart.totalPrice?.formattedValue
          );
          localStorage.setItem('applicationConfirmation', 'true');
          this.routingService.go({
            cxRoute: 'applicationConfirmation',
            params: {
              quoteId: fsCart.insuranceQuote?.quoteId,
              productName: fsCart.entries[0]?.product?.name,
            },
          });
          this.cartService.removeCart(fsCart.code);
        })
      )
      .subscribe();
  }

  navigateBack(previousStep) {
    this.routingService.go({
      cxRoute: previousStep.step,
    });
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
