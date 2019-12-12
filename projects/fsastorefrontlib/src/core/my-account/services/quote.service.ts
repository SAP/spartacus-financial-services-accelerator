import { Injectable } from '@angular/core';
import { FormDataService } from '@fsa/dynamicforms';
import { select, Store } from '@ngrx/store';
import {
  AuthService,
  CartActions,
  CartService,
  OrderEntry,
} from '@spartacus/core';
import { FSCart, FSOrderEntry, FSProduct } from '../../../occ/occ-models';
import * as fromAction from '../store/actions';
import * as fromReducer from '../store/reducers';
import * as fromSelector from '../store/selectors';
import { QuoteDataService } from './quote-data.service';
import { map } from 'rxjs/operators';

@Injectable()
export class QuoteService {
  constructor(
    private store: Store<fromReducer.UserState>,
    private quoteData: QuoteDataService,
    protected cartService: CartService,
    protected auth: AuthService,
    protected formDataService: FormDataService
  ) {
    this.initQuotes();
  }

  callback: Function;

  initQuotes() {
    this.store.pipe(select(fromSelector.getQuotes)).subscribe(quotes => {
      if (quotes) {
        this.quoteData.quotes = quotes;
      }
      if (this.callback) {
        this.callback();
        this.callback = null;
      }
    });

    this.auth.getUserToken().subscribe(userData => {
      if (this.quoteData.userId !== userData.userId) {
        this.quoteData.userId = userData.userId;
      }
    });

    this.store.pipe(select(fromSelector.getQuoteRefresh)).subscribe(refresh => {
      if (refresh) {
        this.store.dispatch(
          new fromAction.LoadQuotes({
            userId: this.quoteData.userId,
          })
        );
      }
    });
  }

  loadQuotes() {
    this.store.dispatch(
      new fromAction.LoadQuotes({
        userId: this.quoteData.userId,
      })
    );
  }

  retrieveQuote(quote: any) {
    this.store.dispatch(
      new CartActions.LoadCart({
        cartId: quote.cartCode,
        userId: this.quoteData.userId,
      })
    );

    this.cartService.getActive().subscribe((cart: FSCart) => {
      if (
        cart &&
        cart.deliveryOrderGroups.length > 0 &&
        cart.deliveryOrderGroups[0].entries &&
        cart.deliveryOrderGroups[0].entries.length > 0
      ) {
        const orderEntry: OrderEntry = cart.deliveryOrderGroups[0].entries[0];
        const product: FSProduct = orderEntry.product;

        this.loadPersonalDetailsForm(cart.deliveryOrderGroups[0].entries[0]);
        this.loadChooseCoverForm(
          cart.insuranceQuote,
          product.defaultCategory.code
        );
      }
    });
  }

  protected loadPersonalDetailsForm(entry: FSOrderEntry) {
    if (entry.formDataData && entry.formDataData.length > 0) {
      this.formDataService.setFormDataToLocalStorage({
        id: entry.formDataData[0].id,
        formDefinition: {
          formId: entry.formDataData[0].formDefinition.formId,
        },
      });
    }
  }

  protected loadChooseCoverForm(insuranceQuote: any, categoryCode: string) {
    if (insuranceQuote && insuranceQuote.quoteDetails) {
      const dataId = insuranceQuote.quoteDetails.entry
        .filter(details => details.key === 'formId')
        .map(mapEntry => mapEntry.value)[0];
      this.formDataService
        .getFormData(dataId)
        .pipe(
          map(formData => {
            if (formData.formDefinition) {
              this.formDataService.setFormDataToLocalStorage({
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
}
