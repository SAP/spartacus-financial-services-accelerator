import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  OnInit,
  Output,
  OnDestroy,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrderEntry, RoutingService } from '@spartacus/core';
import { Observable, Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { FSCartService } from '../../../../core/cart/facade';
import { FSCheckoutConfigService } from '../../../../core/checkout/services/fs-checkout-config.service';
import { FSProduct } from '../../../../occ/occ-models';
import { CategoryService } from '../../../../core/checkout/services/category/category.service';

@Component({
  selector: 'fsa-add-options',
  templateUrl: './add-options.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddOptionsComponent implements OnInit, OnDestroy {
  constructor(
    protected cartService: FSCartService,
    protected routingService: RoutingService,
    protected checkoutConfigService: FSCheckoutConfigService,
    protected categoryService: CategoryService,
    protected activatedRoute: ActivatedRoute
  ) {}

  entries$: Observable<OrderEntry[]>;
  checkoutStepUrlNext: string;
  cartLoaded$: Observable<boolean>;
  subscription = new Subscription();

  @Output()
  nextStep = new EventEmitter<any>();

  ngOnInit() {
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
          map(categoryCode => {
            this.routingService.go({
              cxRoute: 'category',
              params: { code: categoryCode },
            });
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
