import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrderEntry, RoutingService, CurrencyService } from '@spartacus/core';
import { Observable, Subscription } from 'rxjs';
import { filter, map, switchMap } from 'rxjs/operators';
import { FSCartService } from '../../../../core/cart/facade';
import { CategoryService } from '../../../../core/checkout/services/category/category.service';
import { FSCheckoutConfigService } from '../../../../core/checkout/services/checkout-config.service';
import { FSProduct, FSOrderEntry } from '../../../../occ/occ-models';

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
    protected categoryService: CategoryService,
    protected activatedRoute: ActivatedRoute,
    protected currencyService: CurrencyService
  ) {}

  entries$: Observable<OrderEntry[]>;
  checkoutStepUrlNext: string;
  cartLoaded$: Observable<boolean>;
  subscription = new Subscription();
  currentCurrency: string;

  @Output()
  nextStep = new EventEmitter<any>();

  ngOnInit() {
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

    this.checkoutStepUrlNext = this.checkoutConfigService.getNextCheckoutStepUrl(
      this.activatedRoute
    );
    this.cartLoaded$ = this.cartService.getLoaded();
    this.entries$ = this.cartService
      .getEntries()
      .pipe(filter(entries => entries.length > 0));
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

  back() {
    this.subscription.add(
      this.categoryService
        .getActiveCategory()
        .pipe(
          switchMap(categoryCode => {
            let route = 'category';
            return this.entries$.pipe(
              map(entries => {
                if ((<FSOrderEntry>entries[0]).product.configurable) {
                  route = 'configureProduct';
                }
                this.routingService.go({
                  cxRoute: route,
                  params: { code: categoryCode },
                });
              })
            );
          })
        )
        .subscribe()
    );
  }

  navigateNext() {
    let mainProduct: FSProduct;
    this.subscription.add(
      this.entries$
        .pipe(
          map(entries => {
            mainProduct = <FSProduct>entries[0].product;
            if (mainProduct && mainProduct.defaultCategory) {
              this.routingService.go({
                cxRoute: 'checkoutPersonalDetails',
                params: { formCode: mainProduct.defaultCategory.code },
              });
            }
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
