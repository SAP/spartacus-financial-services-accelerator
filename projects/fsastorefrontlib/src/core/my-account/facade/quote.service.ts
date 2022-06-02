import { Injectable } from '@angular/core';
import {
  FormDataService,
  FormDataStorageService,
} from '@spartacus/dynamicforms';
import { select, Store } from '@ngrx/store';
import {
  LanguageSetEvent,
  LoginEvent,
  LogoutEvent,
  OrderEntry,
  Query,
  QueryService,
  RoutingService,
  UserIdService,
} from '@spartacus/core';
import { filter, map, switchMap, take, tap } from 'rxjs/operators';
import {
  FSCart,
  FSOrderEntry,
  FSProduct,
  InsuranceQuote,
  QuoteActionType,
} from '../../../occ/occ-models';
import { FSCartService } from '../../cart/facade/cart.service';
import { StateWithMyAccount } from '../store/my-account-state';
import * as fromQuoteStore from './../store';
import * as fromAction from './../store/actions';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { QuoteConnector } from '../connectors/quote.connector';

@Injectable()
export class QuoteService {
  protected quoteQuery: Query<InsuranceQuote[]> = this.query.create(
    () =>
      this.userIdService.getUserId().pipe(
        take(1),
        switchMap(occUserId => {
          return this.quoteConnector.getQuotes(occUserId);
        })
      ),
    {
      reloadOn: [LanguageSetEvent],
      resetOn: [LoginEvent, LogoutEvent],
    }
  );
  constructor(
    protected store: Store<StateWithMyAccount>,
    protected cartService: FSCartService,
    protected userIdService: UserIdService,
    protected formDataService: FormDataService,
    protected formDataStorageService: FormDataStorageService,
    protected routingService: RoutingService,
    protected quoteConnector: QuoteConnector,
    protected query: QueryService
  ) {}
  quoteForCompareSource = new BehaviorSubject<InsuranceQuote>(null);
  quoteForCompare$ = this.quoteForCompareSource.asObservable();

  getQuotesAndApplicationsQuery(): Observable<InsuranceQuote[]> {
    return this.quoteQuery.get();
  }

  getQuotesAndApplications(): Observable<InsuranceQuote[]> {
    return this.userIdService.getUserId().pipe(
      take(1),
      switchMap(occUserId => this.quoteConnector.getQuotes(occUserId))
    );
  }

  getQuoteApplictionDetails(userId: string, quoteId: string) {
    return this.quoteConnector.getQuote(userId, quoteId);
  }

  getQuotesApplictionsForCompare(
    cartCodes: string[],
    userId: string
  ): Observable<any> {
    return this.quoteConnector.compareQuotes(cartCodes, userId);
  }

  /**
   * @deprecated since version 4.0.2
   * Use Commands and Queries instead.
   */
  loadQuotes() {
    this.userIdService
      .getUserId()
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

  /**
   * @deprecated since version 4.0.2
   * Use Commands and Queries instead.
   */
  loadQuoteDetails(quoteId, occUserId) {
    this.store.dispatch(
      new fromAction.LoadQuoteDetails({
        userId: occUserId,
        quoteId: quoteId,
      })
    );
  }

  /**
   * @deprecated since version 4.0.2
   * Use Commands and Queries instead.
   */
  getQuotes() {
    return this.store.pipe(select(fromQuoteStore.getQuotes));
  }

  /**
   * @deprecated since version 4.0.2
   * Use Commands and Queries instead.
   */
  getQuoteDetails(): Observable<any> {
    return this.store.pipe(select(fromQuoteStore.getQuoteDetails));
  }

  /**
   * @deprecated since version 4.0.2
   * Use Commands and Queries instead.
   */
  getQuotesLoaded(): Observable<boolean> {
    return this.store.pipe(select(fromQuoteStore.getQuotesLoaded));
  }

  retrieveQuote(quote: any): Observable<any> {
    return this.userIdService.getUserId().pipe(
      switchMap(occUserId => {
        if (occUserId) {
          this.cartService.loadCart(quote.cartCode, occUserId);
        }

        return this.cartService.getActive().pipe(
          filter(
            cart => cart.code === quote.cartCode && cart.entries?.length > 0
          ),
          take(1),
          switchMap((cart: FSCart) => {
            if (quote?.state?.code !== 'BIND') {
              return this.loadForms(cart);
            } else {
              return of([]);
            }
          })
        );
      })
    );
  }

  protected loadForms(cart: FSCart): Observable<any> {
    const orderEntry: OrderEntry = cart.entries[0];
    const product: FSProduct = orderEntry.product;

    this.loadPersonalDetailsForm(orderEntry);
    return this.loadChooseCoverForm(
      cart.insuranceQuote,
      product.defaultCategory.code
    );
  }

  retrieveQuoteCheckout(quote: any): Observable<FSCart> {
    return this.retrieveQuote(quote).pipe(
      take(1),
      switchMap(_ => this.routeToCheckout(quote))
    );
  }

  protected routeToCheckout(quote: any): Observable<FSCart> {
    return this.cartService.getActive().pipe(
      take(1),
      tap(_ => {
        if (quote?.state?.code === 'BIND') {
          this.routingService.go({
            cxRoute: 'quoteReview',
          });
        } else {
          this.routingService.go({
            cxRoute: 'addOptions',
          });
        }
      })
    );
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

  protected loadChooseCoverForm(
    insuranceQuote: any,
    categoryCode: string
  ): Observable<any> {
    const dataId = insuranceQuote?.quoteDetails?.formId;
    if (dataId) {
      this.formDataService.loadFormData(dataId);
      return this.formDataService.getFormData().pipe(
        filter(formData => formData.id === dataId),
        take(1),
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
      );
    } else {
      return of([]);
    }
  }
  /**
   * @deprecated since version 4.0.2
   * Use Commands and Queries instead.
   */
  bindQuote(cartId: string) {
    this.userIdService
      .getUserId()
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
  /**
   * @deprecated since version 4.0.2
   * Use Commands and Queries instead.
   */
  underwriteQuote(cartId: string) {
    this.userIdService
      .getUserId()
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
  /**
   * @deprecated since version 4.0.2
   * Use Commands and Queries instead.
   */
  updateQuote(cartId: string, priceAttributes: any) {
    this.userIdService
      .getUserId()
      .pipe(take(1))
      .subscribe(occUserId =>
        this.store.dispatch(
          new fromAction.QuoteProcessAction({
            userId: occUserId,
            cartId: cartId,
            action: QuoteActionType.UPDATE,
            body: priceAttributes,
          })
        )
      )
      .unsubscribe();
  }
  /**
   * @deprecated since version 4.0.2
   * Use Commands and Queries instead.
   */
  loadQuotesComparison(cartCodes: string[], userId?: string): void {
    this.store.dispatch(
      new fromAction.LoadQuoteComparison({ cartCodes, userId })
    );
  }
  /**
   * @deprecated since version 4.0.2
   * Use Commands and Queries instead.
   */
  getQuotesComparison(): Observable<any> {
    return this.store.pipe(select(fromQuoteStore.getQuotesComparison));
  }

  setQuoteForCompare(quote: InsuranceQuote) {
    this.quoteForCompareSource.next(quote);
  }
}
