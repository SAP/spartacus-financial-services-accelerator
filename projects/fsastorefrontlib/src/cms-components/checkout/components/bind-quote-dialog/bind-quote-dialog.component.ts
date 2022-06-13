import {
  Component,
  ElementRef,
  EventEmitter,
  Output,
  ViewChild,
} from '@angular/core';
import { FormDataStorageService } from '@spartacus/dynamicforms';
import { ModalService } from '@spartacus/storefront';
import { combineLatest, Subscription } from 'rxjs';
import { filter, map, switchMap, take } from 'rxjs/operators';
import { QuoteService } from '../../../../core/my-account/facade/quote.service';
import { FSCartService } from './../../../../core/cart/facade/cart.service';
import { FSCart } from './../../../../occ/occ-models/occ.models';
import { ConsentService } from '../../../../core/my-account/facade/consent.service';
import { UserAccountFacade } from '@spartacus/user/account/root';
import {
  FSUserRole,
  FSUser,
  QuoteActionType,
} from '../../../../occ/occ-models/occ.models';

@Component({
  selector: 'cx-fs-bind-quote-dialog',
  templateUrl: './bind-quote-dialog.component.html',
})
export class BindQuoteDialogComponent {
  cartCode: string;
  subscription = new Subscription();

  @Output()
  quoteBinding$: EventEmitter<any> = new EventEmitter<any>();

  @ViewChild('dialog', { static: false, read: ElementRef })
  dialog: ElementRef;

  constructor(
    protected modalService: ModalService,
    protected quoteService: QuoteService,
    protected cartService: FSCartService,
    protected formDataStoragetService: FormDataStorageService,
    protected userAccountFacade: UserAccountFacade,
    protected oboConsentService: ConsentService
  ) {}

  dismissModal(reason?: any): void {
    this.modalService.dismissActiveModal(reason);
  }

  bindQuote() {
    this.subscription.add(
      this.quoteService
        .updateQuoteApplication(this.cartCode, QuoteActionType.BIND)
        .pipe(
          switchMap(_ =>
            combineLatest([
              this.cartService.isStable(),
              this.cartService.getActive(),
              this.userAccountFacade.get(),
              this.oboConsentService.selectedOBOCustomer$,
            ]).pipe(
              filter(([stable]) => stable),
              take(1),
              map(([_, cart, user, oboConsentCustomer]) => {
                this.clearFormDataFromLocalStorage(cart);
                this.transferCartToOBOCustomer(user, oboConsentCustomer, cart);
              })
            )
          )
        )
        .subscribe()
    );
    this.quoteBinding$.emit(false);
  }

  private clearFormDataFromLocalStorage(cart: FSCart) {
    const personalDetailsFormId = (<FSCart>cart)?.entries?.[0].formData?.[0]
      ?.id;
    this.formDataStoragetService.clearFormDataIdFromLocalStorage(
      personalDetailsFormId
    );

    const chooseCoverFormId = <any>(
      (<FSCart>cart).insuranceQuote?.quoteDetails?.formId
    );
    this.formDataStoragetService.clearFormDataIdFromLocalStorage(
      chooseCoverFormId
    );
  }

  private transferCartToOBOCustomer(
    user: FSUser,
    oboConsentCustomer: FSUser,
    cart: FSCart
  ) {
    if (
      !!user &&
      user.roles.includes(FSUserRole.SELLER) &&
      !!oboConsentCustomer?.uid
    ) {
      this.oboConsentService.transferCartToSelectedOBOCustomer(
        cart,
        user,
        oboConsentCustomer
      );
    }
  }
}
