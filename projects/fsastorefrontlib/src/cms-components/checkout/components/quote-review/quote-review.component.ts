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
  ActiveCategoryStep,
  BindingStateType,
  FSCart,
  QuoteWorkflowStatusType,
} from './../../../../occ/occ-models/occ.models';
import { BindQuoteDialogComponent } from './../bind-quote-dialog/bind-quote-dialog.component';
import { ReferredQuoteDialogComponent } from './../refffered-quote/referred-quote-dialog.component';

@Component({
  selector: 'cx-fs-quote-review',
  templateUrl: './quote-review.component.html',
})
export class QuoteReviewComponent implements OnInit, OnDestroy {
  cart$: Observable<Cart>;
  showContent$: Observable<boolean> = of(true);
  isCartStable$: Observable<boolean>;
  subscription = new Subscription();
  modalRef: ModalRef;
  cartCode: string;
  previousCheckoutStep$: Observable<ActiveCategoryStep>;
  nextCheckoutStep$: Observable<ActiveCategoryStep>;

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
    this.cart$ = this.cartService.getActive();
    this.isCartStable$ = this.cartService.isStable();
    this.previousCheckoutStep$ = this.checkoutConfigService.previousStep;
    this.nextCheckoutStep$ = this.checkoutConfigService.nextStep;
  }

  getBaseUrl() {
    return this.config.backend.occ.baseUrl || '';
  }

  navigateBack(previousStep) {
    this.routingService.go({
      cxRoute: previousStep.step,
      params: { code: previousStep.activeCategory },
    });
  }

  navigateNext(nextStep, activeCart) {
    this.cartCode = activeCart.code;
    const bindingState = (<FSCart>activeCart).insuranceQuote.state.code;
    const quoteWorkflowState = (<FSCart>activeCart).insuranceQuote
      .quoteWorkflowStatus.code;
    if (bindingState === BindingStateType.UNBIND) {
      this.openQuoteBindingModal(nextStep);
    } else if (
      bindingState === BindingStateType.BIND &&
      quoteWorkflowState === QuoteWorkflowStatusType.REFERRED
    ) {
      this.openReferredQuoteModal(nextStep);
    } else if (
      bindingState === BindingStateType.BIND &&
      quoteWorkflowState !== QuoteWorkflowStatusType.REFERRED
    ) {
      this.routingService.go({
        cxRoute: nextStep.step,
        params: { code: nextStep.activeCategory },
      });
    }
  }

  private openQuoteBindingModal(nextStep) {
    let modalInstance: any;
    this.modalRef = this.modalService.open(BindQuoteDialogComponent, {
      centered: true,
      size: 'lg',
    });
    modalInstance = this.modalRef.componentInstance;
    modalInstance.cartCode = this.cartCode;
    modalInstance.nextStepUrl = {
      cxRoute: nextStep.step,
      params: { code: nextStep.activeCategory },
    };
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

  private openReferredQuoteModal(nextStep) {
    let modalInstance: any;
    this.modalRef = this.modalService.open(ReferredQuoteDialogComponent, {
      centered: true,
      size: 'lg',
    });
    modalInstance = this.modalRef.componentInstance;
    modalInstance.nextStepUrl = {
      cxRoute: nextStep.step,
      params: { code: nextStep.activeCategory },
    };
    this.subscription.add(
      this.modalRef.componentInstance.referredQuote$
        .pipe(
          map(referredQuote => {
            this.showContent$ = of(!referredQuote);
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
