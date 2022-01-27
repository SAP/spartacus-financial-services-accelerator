import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  Cart,
  GlobalMessageService,
  GlobalMessageType,
  OccConfig,
  RoutingService,
  WindowRef,
} from '@spartacus/core';
import { ModalRef, ModalService } from '@spartacus/storefront';
import { Observable, of, Subscription } from 'rxjs';
import { filter, map, shareReplay, switchMap, take, tap } from 'rxjs/operators';
import {
  FSCheckoutConfigService,
  CategoryService,
} from '../../../../core/checkout/services';
import { FSTranslationService } from '../../../../core/i18n/facade/translation.service';
import { ReferredQuoteDialogComponent } from '../referred-quote/referred-quote-dialog.component';
import { FSCartService } from './../../../../core/cart/facade/cart.service';
import {
  BindingStateType,
  FSCart,
  FSSteps,
  QuoteWorkflowStatusType,
} from './../../../../occ/occ-models/occ.models';
import { BindQuoteDialogComponent } from './../bind-quote-dialog/bind-quote-dialog.component';
import { FSCheckoutService } from '../../../../core/checkout/facade/checkout.service';
import { ConsentConnector } from '../../../../core/my-account/connectors/consent.connector';
import {
  OBOCustomerList,
  FSUserRole,
  FSUser,
} from '../../../../occ/occ-models/occ.models';
import { UserAccountFacade } from '@spartacus/user/account/root';
import { ConsentService } from '../../../../core/my-account/facade/consent.service';

@Component({
  selector: 'cx-fs-quote-review',
  templateUrl: './quote-review.component.html',
})
export class QuoteReviewComponent implements OnInit, OnDestroy {
  constructor(
    protected cartService: FSCartService,
    protected config: OccConfig,
    protected routingService: RoutingService,
    protected checkoutConfigService: FSCheckoutConfigService,
    protected categoryService: CategoryService,
    protected activatedRoute: ActivatedRoute,
    protected modalService: ModalService,
    protected translationService: FSTranslationService,
    protected checkoutService: FSCheckoutService,
    protected globalMessageService: GlobalMessageService,
    protected consentConnector: ConsentConnector,
    protected userAccountFacade: UserAccountFacade,
    protected oboConsentService: ConsentService,
    protected winRef?: WindowRef
  ) {}

  cart$: Observable<Cart>;
  showContent$: Observable<boolean> = of(true);
  isCartStable$: Observable<boolean>;
  subscription = new Subscription();
  modalRef: ModalRef;
  cartCode: string;
  previousCheckoutStep$: Observable<FSSteps>;
  nextCheckoutStep$: Observable<FSSteps>;
  activeCategory$: Observable<string>;
  baseUrl: string;
  selectedIndex = -1;

  oboCustomers$: Observable<
    OBOCustomerList
  > = this.userAccountFacade.get().pipe(
    filter(user => !!user && user.roles.includes(FSUserRole.SELLER)),
    take(1),
    switchMap(user => this.consentConnector.getOBOCustomerList(user.uid))
  );

  isCartTransferAllowedForSeller$: Observable<
    boolean
  > = this.oboConsentService
    .isCartTransferAllowedForSeller()
    .pipe(shareReplay());

  ngOnInit() {
    this.cart$ = this.cartService.getActive();
    this.isCartStable$ = this.cartService.isStable();
    this.previousCheckoutStep$ = this.checkoutConfigService.previousStep;
    this.nextCheckoutStep$ = this.checkoutConfigService.nextStep;
    this.activeCategory$ = this.categoryService.getActiveCategory();
    this.baseUrl = this.config.backend.occ.baseUrl || '';
    this.displayQuoteStatusPendingMessage();
    this.setBindingState();
  }

  navigateBack(previousStep: FSSteps) {
    this.routingService.go({
      cxRoute: previousStep.step,
    });
  }

  navigateNext(nextStep: FSSteps, activeCart: Cart) {
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

  checkIfRemoveableEntriesExists(cart: FSCart) {
    const filteredEntries = this.checkoutService.filterRemoveableEntries(cart);
    return filteredEntries.length > 0;
  }

  getFormContent(cart: any): any {
    if (cart?.deliveryOrderGroups[0]?.entries[0]?.formData?.length > 0) {
      return JSON.parse(
        cart.deliveryOrderGroups[0].entries[0].formData[0].content
      );
    }
  }

  displayQuoteStatusPendingMessage() {
    this.subscription.add(
      this.cart$
        .pipe(
          map(cart => {
            if (
              (<FSCart>cart).insuranceQuote?.quoteWorkflowStatus?.code ===
              QuoteWorkflowStatusType.PENDING
            ) {
              this.globalMessageService.add(
                { key: 'quoteReview.status.pending' },
                GlobalMessageType.MSG_TYPE_INFO
              );
            }
          })
        )
        .subscribe()
    );
  }

  getTranslation(translationGroup: string, translationKey: string): string {
    return this.translationService.getTranslationValue(
      ['quoteReview', translationGroup],
      translationKey
    );
  }

  isEditable(code: string): boolean {
    return code !== BindingStateType.BIND;
  }

  setBindingState() {
    this.subscription.add(
      this.cart$
        .pipe(
          tap(cart => {
            if (
              (<FSCart>cart).insuranceQuote?.state?.code ===
              BindingStateType.BIND
            ) {
              this.winRef.localStorage.setItem('bindingState', 'true');
            }
          })
        )
        .subscribe()
    );
  }

  selectOBOCustomer(oboCustomer: FSUser, index: number) {
    this.oboConsentService.setSelectedOBOCustomer(oboCustomer);
    this.selectedIndex = this.selectedIndex === index ? -1 : index;
  }

  ngOnDestroy() {
    this.oboConsentService.setSelectedOBOCustomer(null);
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
