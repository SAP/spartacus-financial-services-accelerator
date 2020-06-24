import { Injectable } from '@angular/core';
import { FormDataService, FormDataStorageService } from '@fsa/dynamicforms';
import { select, Store } from '@ngrx/store';
import { AuthService, OrderEntry } from '@spartacus/core';
import { map, take } from 'rxjs/operators';
import {
  FSCart,
  FSOrderEntry,
  FSProduct,
  QuoteActionType,
} from '../../../occ/occ-models';
import { FSCartService } from '../../cart/facade/cart.service';
import { StateWithMyAccount } from '../store/my-account-state';
import * as fromQuoteStore from './../store';
import * as fromAction from './../store/actions';

@Injectable()
export class QuoteService {
  constructor(
    protected store: Store<StateWithMyAccount>,
    protected cartService: FSCartService,
    protected authService: AuthService,
    protected formDataService: FormDataService,
    protected formDataStorageService: FormDataStorageService
  ) {}

  loadQuotes() {
    this.authService
      .getOccUserId()
      .pipe(take(1))
      .subscribe(occUserId =>
        this.store.dispatch(
          new fromAction.LoadQuotes({
            userId: occUserId,
          })
        )
      )
      .unsubscribe();
  }

  getQuotes() {
    return this.store.pipe(select(fromQuoteStore.getQuotes));
  }

  getQuotesLoaded() {
    return this.store.pipe(select(fromQuoteStore.getQuotesLoaded));
  }

  retrieveQuote(quote: any) {
    this.authService
      .getOccUserId()
      .pipe(take(1))
      .subscribe(occUserId => {
        if (occUserId) {
          this.cartService.loadCart(quote.cartCode);
        }
      })
      .unsubscribe();

    this.cartService
      .getActive()
      .subscribe((cart: FSCart) => {
        if (cart && cart.entries && cart.entries.length > 0) {
          const orderEntry: OrderEntry = cart.entries[0];
          const product: FSProduct = orderEntry.product;

          this.loadPersonalDetailsForm(orderEntry);
          this.loadChooseCoverForm(
            cart.insuranceQuote,
            product.defaultCategory.code
          );
        }
      })
      .unsubscribe();
  }

  protected loadPersonalDetailsForm(entry: FSOrderEntry) {
    if (entry.formData && entry.formData.length > 0) {
      this.formDataStorageService.setFormDataToLocalStorage({
        id: entry.formData[0].id,
        formDefinition: {
          formId: entry.formData[0].formDefinition.formId,
        },
      });
    }
  }

  protected loadChooseCoverForm(insuranceQuote: any, categoryCode: string) {
    if (
      insuranceQuote &&
      insuranceQuote.quoteDetails &&
      insuranceQuote.quoteDetails.entry
    ) {
      const dataId = insuranceQuote.quoteDetails.entry
        .filter(details => details.key === 'formId')
        .map(mapEntry => mapEntry.value)[0];
      this.formDataService.loadFormData(dataId);
      this.formDataService
        .getFormData()
        .pipe(
          map(formData => {
            if (formData.formDefinition) {
              this.formDataStorageService.setFormDataToLocalStorage({
                id: dataId,
                formDefinition: {
                  formId: formData.formDefinition.formId,
                },
                categoryCode: categoryCode,
              });
            }
          })
        )
        .subscribe();
    }
  }

  bindQuote(cartId: string) {
    this.authService
      .getOccUserId()
      .pipe(take(1))
      .subscribe(occUserId =>
        this.store.dispatch(
          new fromAction.QuoteProcessAction({
            userId: occUserId,
            cartId: cartId,
            action: QuoteActionType.BIND,
          })
        )
      )
      .unsubscribe();
  }

  underwriteQuote(cartId: string) {
    this.authService
      .getOccUserId()
      .pipe(take(1))
      .subscribe(occUserId =>
        this.store.dispatch(
          new fromAction.QuoteProcessAction({
            userId: occUserId,
            cartId: cartId,
            action: QuoteActionType.UNDERWRITING,
          })
        )
      )
      .unsubscribe();
  }
}
