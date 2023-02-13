import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Cart } from '@spartacus/cart/base/root';
import {
  GlobalMessageService,
  GlobalMessageType,
  OccConfig,
  RoutingService,
  User,
  UserService,
  WindowRef,
} from '@spartacus/core';
import { UserAccountFacade } from '@spartacus/user/account/root';
import { Observable, of, Subscription } from 'rxjs';
import { map, take, tap } from 'rxjs/operators';
import { FSCheckoutService } from '../../../../core/checkout/facade/checkout.service';
import {
  CategoryService,
  FSCheckoutConfigService,
} from '../../../../core/checkout/services';
import { FSTranslationService } from '../../../../core/i18n/facade/translation.service';
import { ConsentConnector } from '../../../../core/my-account/connectors/consent.connector';
import { FSCartService } from './../../../../core/cart/facade/cart.service';
import {
  BindingStateType,
  FSCart,
  FSSteps,
  QuoteWorkflowStatusType,
} from './../../../../occ/occ-models/occ.models';
import { LaunchDialogService, LAUNCH_CALLER } from '@spartacus/storefront';

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
    protected launchDialogService: LaunchDialogService,
    protected translationService: FSTranslationService,
    protected checkoutService: FSCheckoutService,
    protected globalMessageService: GlobalMessageService,
    protected consentConnector: ConsentConnector,
    protected userAccountFacade: UserAccountFacade,
    protected vcr: ViewContainerRef,
    protected winRef?: WindowRef,
    protected userService?: UserService
  ) {}

  @ViewChild('element') element: ElementRef;

  user$: Observable<User> = this.userAccountFacade.get();
  cart$: Observable<Cart>;
  showContent$: Observable<boolean> = of(true);
  isCartStable$: Observable<boolean>;
  subscription = new Subscription();
  cartCode: string;
  previousCheckoutStep$: Observable<FSSteps>;
  nextCheckoutStep$: Observable<FSSteps>;
  activeCategory$: Observable<string>;
  baseUrl: string;
  selectedIndex = -1;
  messageType = GlobalMessageType;
  acceptedWorkflowStates = ['APPROVED', 'ACCEPTED', 'REFERRED'];

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
    let modalInstanceData: any = {
      cartCode: this.cartCode,
      nextStepUrl: {
        cxRoute: nextStep.step,
      },
    };

    const dialog = this.launchDialogService.openDialog(
      LAUNCH_CALLER.BIND_QUOTE,
      this.element,
      this.vcr,
      modalInstanceData
    );

    this.subscription.add(
      dialog
        .pipe(
          take(1),
          map(dialogInstance => {
            this.subscription.add(
              dialogInstance.instance.quoteBinding$
                .pipe(
                  map(quoteBinding => {
                    this.showContent$ = of(!quoteBinding);
                  })
                )
                .subscribe()
            );
          })
        )
        .subscribe()
    );
  }

  private openReferredQuoteModal(nextStep) {
    let modalInstanceData: any = {
      nextStepUrl: {
        cxRoute: nextStep.step,
      },
    };

    const dialog = this.launchDialogService.openDialog(
      LAUNCH_CALLER.OPEN_REFFERED_QUOTE,
      this.element,
      this.vcr,
      modalInstanceData
    );

    this.subscription.add(
      dialog
        .pipe(
          take(1),
          map(dialogInstance => {
            this.subscription.add(
              dialogInstance.instance.referredQuote$
                .pipe(
                  map(referredQuote => {
                    this.showContent$ = of(!referredQuote);
                  })
                )
                .subscribe()
            );
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
    if (cart?.entries[0]?.formData?.length > 0) {
      return JSON.parse(cart.entries[0].formData[0].content);
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

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
