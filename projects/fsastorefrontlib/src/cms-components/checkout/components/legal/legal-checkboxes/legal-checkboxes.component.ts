import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RoutingService } from '@spartacus/core';
import { Observable, Subscription } from 'rxjs';
import { ActiveCategoryStep } from 'projects/fsastorefrontlib/src/occ';
import { FSCheckoutConfigService } from '../../../../../core/checkout/services';
import { FSCartService } from '../../../../../core/cart/facade';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'cx-fs-legal-checkboxes',
  templateUrl: './legal-checkboxes.component.html',
})
export class LegalCheckboxesComponent implements OnInit {
  checkoutStepUrlNext: string;
  checkoutStepUrlBack: string;

  constructor(
    protected routingService: RoutingService,
    protected activatedRoute: ActivatedRoute,
    protected checkoutConfigService: FSCheckoutConfigService,
    protected cartService: FSCartService
  ) {}
  previousCheckoutStep$: Observable<ActiveCategoryStep>;
  nextCheckoutStep$: Observable<ActiveCategoryStep>;
  subscription = new Subscription();

  ngOnInit() {
    this.subscription.add(
      this.cartService
        .getEntries()
        .pipe(
          tap(() => {
            this.previousCheckoutStep$ = this.checkoutConfigService.previousStep;
            this.nextCheckoutStep$ = this.checkoutConfigService.nextStep;
            this.checkoutConfigService.setBackNextSteps(this.activatedRoute);
          })
        )
        .subscribe()
    );
  }

  navigateBack(previousStep) {
    this.routingService.go({
      cxRoute: previousStep.step,
      params: { code: previousStep.activeCategory },
    });
  }

  navigateNext(nextStep) {
    this.routingService.go({
      cxRoute: nextStep.step,
      params: { code: nextStep.activeCategory },
    });
  }
}
