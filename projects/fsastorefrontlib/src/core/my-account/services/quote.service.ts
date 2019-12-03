import { categoryFormRelationMappings } from './../../../cms-components/form/cms-category-form-component/form-sample-mapping-configurations';
import { Injectable } from '@angular/core';
import { FormDataService } from '@fsa/dynamicforms';
import { select, Store } from '@ngrx/store';
import { AuthService, CartActions, CartService } from '@spartacus/core';
import { FSProduct } from 'fsastorefrontlib/occ/occ-models';
import {
  FSCart,
  FSOrderEntry,
} from 'projects/fsastorefrontlib/src/occ/occ-models';
import * as fromAction from '../store/actions';
import * as fromReducer from '../store/reducers';
import * as fromSelector from '../store/selectors';
import { QuoteDataService } from './quote-data.service';

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
        const entry: FSOrderEntry = cart.deliveryOrderGroups[0].entries[0];
        const product: FSProduct = entry.product;
        const category = product.defaultCategory.code;
        const personalDetailsFormDataId = entry.formDataData[0].id;

        const personalDetailsFormId = categoryFormRelationMappings.find(
          mapping => mapping.categoryCode === category
        ).personalDetailsFormId;

        if (personalDetailsFormId && personalDetailsFormId) {
          this.formDataService.setFormDataToLocalStorage(
            personalDetailsFormId,
            personalDetailsFormDataId
          );
        }

        if (cart.insuranceQuote && cart.insuranceQuote.quoteDetails) {
          const chooseCoverFormId = categoryFormRelationMappings.find(
            mapping => mapping.categoryCode === category
          ).chooseCoverFormId;

          const chooseCoverFormDataId = cart.insuranceQuote.quoteDetails.entry
            .filter(details => details.key === 'formId')
            .map(mapEntry => mapEntry.value)[0];
          if (chooseCoverFormId && chooseCoverFormDataId) {
            this.formDataService.setFormDataToLocalStorage(
              chooseCoverFormId,
              chooseCoverFormDataId
            );
          }
        }
      }
    });
  }
}
