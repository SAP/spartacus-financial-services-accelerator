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
import { filter, map, switchMap } from 'rxjs/operators';
import { FSCartService } from '../../../../core/cart/facade';
import { CategoryService } from '../../../../core/checkout/services/category/category.service';
import { FSCheckoutConfigService } from '../../../../core/checkout/services/checkout-config.service';
import { FSProduct, ActiveCategoryStep } from '../../../../occ/occ-models';

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
  checkoutStepUrlPrevious: string;
  checkoutStepUrlNext: string;
  cartLoaded$: Observable<boolean>;
  subscription = new Subscription();
  currentCurrency: string;
  activeCategory: string;

  @Output()
  nextStep = new EventEmitter<any>();

  previousCheckoutStep$: Observable<ActiveCategoryStep>;
  nextCheckoutStep$: Observable<ActiveCategoryStep>;

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

    this.checkoutConfigService.filterSteps(this.activatedRoute);
    this.previousCheckoutStep$ = this.checkoutConfigService.previousStep;
    this.nextCheckoutStep$ = this.checkoutConfigService.nextStep;

    this.cartLoaded$ = this.cartService.getLoaded();
    this.entries$ = this.cartService
      .getEntries()
      .pipe(filter(entries => entries.length > 0));

    // let mainProduct: FSProduct;
    // this.entries$.subscribe(entries => {
    //   mainProduct = <FSProduct>entries[0].product;
    //   if (mainProduct && mainProduct.defaultCategory) {
    //     console.log(mainProduct.defaultCategory.code);
    //   }
    // });
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

  // navigateNext() {
  //   let mainProduct: FSProduct;
  //   this.subscription.add(
  //     this.entries$
  //       .pipe(
  //         map(entries => {
  //           mainProduct = <FSProduct>entries[0].product;
  //           if (mainProduct && mainProduct.defaultCategory) {
  //             this.routingService.go({
  //               cxRoute: 'checkoutPersonalDetails',
  //               params: { formCode: mainProduct.defaultCategory.code },
  //             });
  //           }
  //         })
  //       )
  //       .subscribe()
  //   );
  // }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
