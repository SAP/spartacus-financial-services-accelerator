import { Injectable } from '@angular/core';
import { FormDataService } from '@fsa/dynamicforms';
import { select, Store } from '@ngrx/store';
import { AuthService, CartActions, CartService } from '@spartacus/core';
import { FSCart, FSOrderEntry, FSProduct } from '../../../occ/occ-models';
import * as fromAction from '../store/actions';
import * as fromReducer from '../store/reducers';
import * as fromSelector from '../store/selectors';
import { categoryFormRelations } from './../../../cms-components/form/cms-category-form-component/form-sample-mapping-configurations';
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

        const personalDetailsForm = this.getPersonalDetailsFormFromEntry(entry);

        this.putFormsInLocalStorage(
          personalDetailsForm.formId,
          personalDetailsForm.dataId,
          personalDetailsForm.categoryCode
        );

        const chooseCoverForm = this.getChooseCoverFormFromQuote(
          cart.insuranceQuote,
          category
        );

        this.putFormsInLocalStorage(
          chooseCoverForm.formId,
          chooseCoverForm.dataId,
          category
        );
      }
    });
  }

  protected getPersonalDetailsFormFromEntry(
    entry: FSOrderEntry
  ): { formId: string; dataId: string; categoryCode: string } {
    let formId;
    let dataId;
    let categoryCode;
    if (
      entry.formDataData &&
      entry.formDataData.length > 0 &&
      entry.formDataData[0].formDefinition
    ) {
      formId = entry.formDataData[0].formDefinition.formId;

      dataId = entry.formDataData[0].id;
      categoryCode = entry.formDataData[0].category.code;
    }
    return { formId: formId, dataId: dataId, categoryCode: categoryCode };
  }

  protected getChooseCoverFormFromQuote(
    insuranceQuote: any,
    category: string
  ): { formId: string; dataId: string } {
    let formId;
    let dataId;

    if (insuranceQuote && insuranceQuote.quoteDetails) {
      formId = categoryFormRelations.find(
        mapping => mapping.categoryCode === category
      ).chooseCoverFormId;

      dataId = insuranceQuote.quoteDetails.entry
        .filter(details => details.key === 'formId')
        .map(mapEntry => mapEntry.value)[0];

      return { formId: formId, dataId: dataId };
    }
  }

  private putFormsInLocalStorage(
    formDefinitionId: string,
    formDataId: string,
    categoryCode: string
  ) {
    if (formDefinitionId && formDataId && categoryCode) {
      this.formDataService.setFormDataToLocalStorage(
        formDefinitionId,
        formDataId,
        categoryCode
      );
    }
  }
}
