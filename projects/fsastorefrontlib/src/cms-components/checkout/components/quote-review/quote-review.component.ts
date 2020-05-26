import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Cart, OccConfig, RoutingService } from '@spartacus/core';
import { ModalRef, ModalService } from '@spartacus/storefront';
import { Observable, of, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import {
  CategoryService,
  FSCheckoutConfigService,
} from '../../../../core/checkout/services';
import { FSCartService } from './../../../../core/cart/facade/cart.service';
import {
  BindingStateType,
  FSCart,
} from './../../../../occ/occ-models/occ.models';
import { BindQuoteDialogComponent } from './../bind-quote-dialog/bind-quote-dialog.component';

@Component({
  selector: 'cx-fs-quote-review',
  templateUrl: './quote-review.component.html',
})
export class QuoteReviewComponent implements OnInit, OnDestroy {
  cart$: Observable<Cart>;
  showContent$: Observable<boolean> = of(true);
  cartLoaded$: Observable<boolean>;
  checkoutStepUrlNext: string;
  checkoutStepUrlBack: string;
  subscription = new Subscription();
  modalRef: ModalRef;
  cartCode: string;
  categoryCode: string;

  constructor(
    protected cartService: FSCartService,
    protected config: OccConfig,
    protected routingService: RoutingService,
    protected checkoutConfigService: FSCheckoutConfigService,
    protected activatedRoute: ActivatedRoute,
    protected modalService: ModalService,
    protected categoryService: CategoryService
  ) {}

  ngOnInit() {
    this.subscription.add(
      this.categoryService
        .getActiveCategory()
        .pipe(
          map(category => {
            this.categoryCode = category;
          })
        )
        .subscribe()
    );
    this.checkoutStepUrlNext = this.checkoutConfigService.getNextCheckoutStepUrl(
      this.activatedRoute
    );
    this.checkoutStepUrlBack = this.checkoutConfigService.getPreviousCheckoutStepUrl(
      this.activatedRoute
    );
    this.cart$ = this.cartService.getActive();
    this.cartLoaded$ = this.cartService.getLoading();
  }

  getBaseUrl() {
    return this.config.backend.occ.baseUrl || '';
  }

  back() {
    // TO DO - refactor after we change logic for multiple containers and categories
    this.routingService.go(
      this.checkoutStepUrlBack.replace(':formCode', this.categoryCode)
    );
  }

  continue() {
    this.cart$
      .subscribe(activeCart => {
        this.cartCode = activeCart.code;
        const bindingState = (<FSCart>activeCart).insuranceQuote.state.code;
        if (bindingState === BindingStateType.UNBIND) {
          this.openModal();
        } else {
          this.routingService.go(this.checkoutStepUrlNext);
        }
      })
      .unsubscribe();
  }

  private openModal() {
    let modalInstance: any;
    this.modalRef = this.modalService.open(BindQuoteDialogComponent, {
      centered: true,
      size: 'lg',
    });
    modalInstance = this.modalRef.componentInstance;
    modalInstance.cartCode = this.cartCode;
    modalInstance.nextStepUrl = this.checkoutStepUrlNext;
    this.subscription.add(
      this.modalRef.componentInstance.quoteBinding$
        .pipe(
          map(quoteBinding => {
            this.showContent$ = of(!quoteBinding);
          })
        )
        .subscribe()
    );
  }

  getFormContent(cart: any): any {
    if (
      cart &&
      cart.deliveryOrderGroups &&
      cart.deliveryOrderGroups.length > 0 &&
      cart.deliveryOrderGroups[0].entries.length > 0 &&
      cart.deliveryOrderGroups[0].entries[0].formData &&
      cart.deliveryOrderGroups[0].entries[0].formData.length > 0
    ) {
      return JSON.parse(
        cart.deliveryOrderGroups[0].entries[0].formData[0].content
      );
    }
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
