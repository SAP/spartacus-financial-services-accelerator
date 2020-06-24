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
import { ActiveCategoryStep } from '../../../../occ/occ-models';

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
  cartLoaded$: Observable<boolean>;
  subscription = new Subscription();
  currentCurrency: string;

  @Output()
  nextStep = new EventEmitter<any>();

  previousCheckoutStep$: Observable<ActiveCategoryStep>;
  nextCheckoutStep$: Observable<ActiveCategoryStep>;

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

    this.cartLoaded$ = this.cartService.getLoaded();
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

  navigateBack(previousStep: ActiveCategoryStep) {
    this.routingService.go({
      cxRoute: previousStep.step,
      params: { code: previousStep.activeCategory },
    });
  }

  navigateNext(nextStep: ActiveCategoryStep) {
    this.routingService.go({
      cxRoute: nextStep.step,
      params: { code: nextStep.activeCategory },
    });
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
