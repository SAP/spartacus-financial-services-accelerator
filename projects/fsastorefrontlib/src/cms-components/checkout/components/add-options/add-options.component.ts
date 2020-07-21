import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CurrencyService, OrderEntry, RoutingService } from '@spartacus/core';
import { Observable, Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { FSCartService } from '../../../../core/cart/facade';
import { FSCheckoutConfigService } from '../../../../core/checkout/services/checkout-config.service';
import { StepResult } from '../../../../occ/occ-models';

@Component({
  selector: 'cx-fs-add-options',
  templateUrl: './add-options.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddOptionsComponent implements OnInit, OnDestroy {
  constructor(
    protected cartService: FSCartService,
    protected routingService: RoutingService,
    protected checkoutConfigService: FSCheckoutConfigService,
    protected activatedRoute: ActivatedRoute,
    protected currencyService: CurrencyService
  ) {}

  entries$: Observable<OrderEntry[]>;
  isCartStable$: Observable<boolean>;
  subscription = new Subscription();
  currentCurrency: string;

  previousCheckoutStep$: Observable<StepResult>;
  nextCheckoutStep$: Observable<StepResult>;

  ngOnInit() {
    this.previousCheckoutStep$ = this.checkoutConfigService.previousStep;
    this.nextCheckoutStep$ = this.checkoutConfigService.nextStep;

    this.subscription.add(
      this.currencyService
        .getActive()
        .pipe(
          map(currentCurrency => {
            this.currentCurrency = currentCurrency;
          })
        )
        .subscribe()
    );

    this.isCartStable$ = this.cartService.isStable();

    this.entries$ = this.cartService
      .getEntries()
      .pipe(filter(entries => entries && entries.length > 0));
  }

  addProductToCart(orderEntryCode: string, entryNumber: string) {
    if (!orderEntryCode) {
      return;
    }
    this.cartService.addOptionalProduct(orderEntryCode, 1, entryNumber);
  }

  removeProductFromCart(item): void {
    if (!item) {
      return;
    }
    this.cartService.removeEntry(item);
  }

  navigateBack(previousStep: StepResult) {
    this.routingService.go({
      cxRoute: previousStep.step,
      params: { code: previousStep.stepParameter },
    });
  }

  navigateNext(nextStep: StepResult) {
    this.routingService.go({
      cxRoute: nextStep.step,
    });
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
