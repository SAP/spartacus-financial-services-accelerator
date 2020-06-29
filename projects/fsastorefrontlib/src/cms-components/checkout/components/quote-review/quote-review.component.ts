import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Cart, OccConfig, RoutingService } from '@spartacus/core';
import { ModalRef, ModalService } from '@spartacus/storefront';
import { Observable, of, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { FSCheckoutConfigService } from '../../../../core/checkout/services';
import { FSTranslationService } from '../../../../core/i18n/facade/translation.service';
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
  isCartStable$: Observable<boolean>;
  checkoutStepUrlNext: string;
  checkoutStepUrlBack: string;
  subscription = new Subscription();
  modalRef: ModalRef;
  cartCode: string;

  constructor(
    protected cartService: FSCartService,
    protected config: OccConfig,
    protected routingService: RoutingService,
    protected checkoutConfigService: FSCheckoutConfigService,
    protected activatedRoute: ActivatedRoute,
    protected modalService: ModalService,
    protected translationService: FSTranslationService
  ) {}

  ngOnInit() {
    this.checkoutStepUrlNext = this.checkoutConfigService.getNextCheckoutStepUrl(
      this.activatedRoute
    );
    this.checkoutStepUrlBack = this.checkoutConfigService.getPreviousCheckoutStepUrl(
      this.activatedRoute
    );
    this.cart$ = this.cartService.getActive();
    this.isCartStable$ = this.cartService.isStable();
  }

  getBaseUrl() {
    return this.config.backend.occ.baseUrl || '';
  }

  back() {
    this.routingService.go(this.checkoutStepUrlBack);
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

  getTranslation(translationGroup: string, translationKey: string): string {
    return this.translationService.getTranslationValue(
      ['quoteReview', translationGroup],
      translationKey
    );
  }
}
