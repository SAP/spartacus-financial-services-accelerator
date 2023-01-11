import {
  Component,
  ElementRef,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import {
  FormDataStorageService,
  OboCustomerService,
} from '@spartacus/dynamicforms';
import { LaunchDialogService } from '@spartacus/storefront';
import { UserAccountFacade } from '@spartacus/user/account/root';
import { combineLatest, Subscription } from 'rxjs';
import { filter, map, take } from 'rxjs/operators';
import { ConsentService } from '../../../../core/my-account/facade/consent.service';
import { QuoteService } from '../../../../core/my-account/facade/quote.service';
import { FSUser, FSUserRole } from '../../../../occ/occ-models/occ.models';
import { FSCartService } from './../../../../core/cart/facade/cart.service';
import { FSCart } from './../../../../occ/occ-models/occ.models';

@Component({
  selector: 'cx-fs-bind-quote-dialog',
  templateUrl: './bind-quote-dialog.component.html',
})
export class BindQuoteDialogComponent implements OnInit {
  cartCode: string;
  subscription = new Subscription();

  @Output()
  quoteBinding$: EventEmitter<any> = new EventEmitter<any>();

  @ViewChild('dialog', { static: false, read: ElementRef })
  dialog: ElementRef;

  constructor(
    protected quoteService: QuoteService,
    protected cartService: FSCartService,
    protected launchDialogService: LaunchDialogService,
    protected formDataStoragetService: FormDataStorageService,
    protected userAccountFacade: UserAccountFacade,
    protected oboConsentService: ConsentService,
    protected oboCustomerService: OboCustomerService
  ) {}

  ngOnInit(): void {
    this.subscription.add(
      this.launchDialogService.data$.subscribe(data => {
        this.cartCode = data.cartCode;
      })
    );
  }

  dismissModal(reason?: any): void {
    this.launchDialogService.closeDialog(reason);
  }

  bindQuote() {
    this.quoteService.bindQuote(this.cartCode);
    this.subscription.add(
      combineLatest([
        this.cartService.isStable(),
        this.cartService.getActive(),
        this.userAccountFacade.get(),
        this.oboCustomerService.getOboCustomerUserId(),
      ])
        .pipe(
          filter(([stable]) => stable),
          take(1),
          map(([_, cart, user, oboConsentCustomer]) => {
            this.clearFormDataFromLocalStorage(cart);
            this.transferCartToOBOCustomer(user, oboConsentCustomer, cart);
          })
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
    oboConsentCustomer: string,
    cart: FSCart
  ) {
    if (
      !!user &&
      user.roles.includes(FSUserRole.SELLER) &&
      !!oboConsentCustomer
    ) {
      this.oboConsentService.transferCartToSelectedOBOCustomer(
        cart,
        user,
        oboConsentCustomer
      );
    }
  }
}
