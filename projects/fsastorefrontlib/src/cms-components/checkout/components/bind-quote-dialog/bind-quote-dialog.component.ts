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
import { filter, map, take } from 'rxjs/operators';
import { QuoteService } from '../../../../core/my-account/facade/quote.service';
import { FSCartService } from './../../../../core/cart/facade/cart.service';
import { FSCart } from './../../../../occ/occ-models/occ.models';
import { ConsentService } from '../../../../core/my-account/facade/consent.service';
import { UserAccountFacade } from '@spartacus/user/account/root';
import {
  OBOCustomerList,
  FSUserRole,
  FSUser,
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
    this.quoteService.bindQuote(this.cartCode);
    combineLatest([
      this.cartService.isStable(),
      this.cartService.getActive(),
      this.userAccountFacade.get(),
      this.oboConsentService.getSelectedOBOCustomer(),
    ])
      .pipe(
        filter(([stable]) => stable),
        take(1),
        map(([_, cart, user, oboConsentCustomer]) => {
          const personalDetailsFormId = (<FSCart>cart)?.entries?.[0]
            .formData?.[0]?.id;
          this.formDataStoragetService.clearFormDataIdFromLocalStorage(
            personalDetailsFormId
          );

          const chooseCoverFormId = <any>(
            (<FSCart>cart).insuranceQuote?.quoteDetails?.formId
          );
          this.formDataStoragetService.clearFormDataIdFromLocalStorage(
            chooseCoverFormId
          );

          if (
            !!user &&
            user.roles.includes(FSUserRole.SELLER) &&
            !!oboConsentCustomer?.uid
          ) {
            this.oboConsentService.transferCartToSelectedOBOCustomer(
              cart.code,
              user.uid,
              oboConsentCustomer.uid
            );
          }
        })
      )
      .subscribe();
    this.quoteBinding$.emit(false);
  }
}
