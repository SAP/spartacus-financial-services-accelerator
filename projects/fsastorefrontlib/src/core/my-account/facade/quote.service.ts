import { Injectable, OnDestroy } from '@angular/core';
import {
  FormDataService,
  FormDataStorageService,
} from '@spartacus/dynamicforms';
import { select, Store } from '@ngrx/store';
import {
  OrderEntry,
  RoutingService,
  UserIdService,
} from '@spartacus/core';
import { filter, map, take, tap } from 'rxjs/operators';
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
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
@Injectable()
export class QuoteService implements OnDestroy {
  constructor(
    protected store: Store<StateWithMyAccount>,
    protected cartService: FSCartService,
    protected userIdService: UserIdService,
    protected formDataService: FormDataService,
    protected formDataStorageService: FormDataStorageService,
    protected routingService: RoutingService
  ) {}
  quoteForCompareSource = new BehaviorSubject<InsuranceQuote>(null);
  quoteForCompare$ = this.quoteForCompareSource.asObservable();
  private subscription = new Subscription();

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

  loadQuoteDetails(quoteId, occUserId) {
    this.store.dispatch(
      new fromAction.LoadQuoteDetails({
        userId: occUserId,
        quoteId: quoteId,
      })
    );
  }

  getQuotes() {
    return this.store.pipe(select(fromQuoteStore.getQuotes));
  }

  getQuoteDetails(): Observable<any> {
    return this.store.pipe(select(fromQuoteStore.getQuoteDetails));
  }

  getQuotesLoaded(): Observable<boolean> {
    return this.store.pipe(select(fromQuoteStore.getQuotesLoaded));
  }

  retrieveQuote(quote: any) {
    this.userIdService
      .getUserId()
      .subscribe(occUserId => {
        if (occUserId) {
          this.cartService.loadCart(quote.cartCode, occUserId);
        }
      })
      .unsubscribe();

    this.subscription.add(
      this.cartService
        .getActive()
        .pipe(
          filter(cart => cart.code === quote.cartCode),
          take(1),
          map((cart: FSCart) => {
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
        )
        .subscribe()
    );
  }

  retrieveQuoteCheckout(quote: any) {
    this.retrieveQuote(quote);
    this.subscription.add(
      this.cartService
        .getActive()
        .pipe(
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
        )
        .subscribe()
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

  protected loadChooseCoverForm(insuranceQuote: any, categoryCode: string) {
    if (insuranceQuote && insuranceQuote.quoteDetails) {
      const dataId = insuranceQuote.quoteDetails.formId;
      this.formDataService.loadFormData(dataId);
      this.subscription.add(
        this.formDataService
          .getFormData()
          .pipe(
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
          )
          .subscribe()
      );
    }
  }

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

  loadQuotesComparison(cartCodes: string[], userId?: string): void {
    this.store.dispatch(
      new fromAction.LoadQuoteComparison({ cartCodes, userId })
    );
  }

  getQuotesComparison(): Observable<any> {
    return this.store.pipe(select(fromQuoteStore.getQuotesComparison));
  }

  setQuoteForCompare(quote: InsuranceQuote) {
    this.quoteForCompareSource.next(quote);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
