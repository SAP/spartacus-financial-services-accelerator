import { BindQuoteDialogComponent } from './../bind-quote-dialog/bind-quote-dialog.component';
import {
  FSCart,
  BindingStateType,
} from './../../../../occ/occ-models/occ.models';
import { map, take } from 'rxjs/operators';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Cart, CartService, OccConfig, RoutingService } from '@spartacus/core';
import { Observable, Subscription, of } from 'rxjs';
import { FSCheckoutConfigService } from '../../../../core/checkout/services';
import { ModalService, ModalRef } from '@spartacus/storefront';

@Component({
  selector: 'fsa-quote-review',
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
  bindingState: string;
  cartCode: string;

  constructor(
    protected cartService: CartService,
    private config: OccConfig,
    protected routingService: RoutingService,
    private checkoutConfigService: FSCheckoutConfigService,
    private activatedRoute: ActivatedRoute,
    protected modalService: ModalService
  ) {}

  ngOnInit() {
    this.checkoutStepUrlNext = this.checkoutConfigService.getNextCheckoutStepUrl(
      this.activatedRoute
    );
    this.checkoutStepUrlBack = this.checkoutConfigService.getPreviousCheckoutStepUrl(
      this.activatedRoute
    );
    this.cart$ = this.cartService.getActive();
    this.cartLoaded$ = this.cartService.getLoaded();

    this.subscription.add(
      this.cart$
        .pipe(
          take(1),
          map(activeCart => {
            this.cartCode = activeCart.code;
            this.bindingState = (<FSCart>activeCart).insuranceQuote.state.code;
          })
        )
        .subscribe()
    );
  }

  public getBaseUrl() {
    return this.config.backend.occ.baseUrl || '';
  }

  back() {
    this.routingService.go(this.checkoutStepUrlBack);
  }

  continue() {
    if (this.bindingState === BindingStateType.UNBIND) {
      this.openModal();
    } else {
      this.routingService.go(this.checkoutStepUrlNext);
    }
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
      this.modalRef.componentInstance.quoteBinded$
        .pipe(
          map(quoteBinded => {
            this.showContent$ = of(!quoteBinded);
          })
        )
        .subscribe()
    );
  }

  getFormContent(cart: any): any {
    if (
      cart &&
      cart.deliveryOrderGroups.length > 0 &&
      cart.deliveryOrderGroups[0].entries.length > 0 &&
      cart.deliveryOrderGroups[0].entries[0].formDataData
    ) {
      return JSON.parse(
        cart.deliveryOrderGroups[0].entries[0].formDataData[0].content
      );
    }
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
