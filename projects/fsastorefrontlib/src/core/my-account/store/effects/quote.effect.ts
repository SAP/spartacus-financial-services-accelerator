import { RoutingService } from '@spartacus/core';
import { CartActions } from '@spartacus/cart/base/core';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { catchError, map, mergeMap, switchMap } from 'rxjs/operators';
import * as fromActions from '../actions';
import { QuoteConnector } from '../../connectors/quote.connector';

@Injectable()
export class QuoteEffects {
  loadQuotes$: Observable<any> = createEffect(() =>
    this.actions$.pipe(
      ofType(fromActions.LOAD_QUOTES),
      map((action: fromActions.LoadQuotes) => action.payload),
      switchMap(payload => {
        return this.qouteConnector.getQuotes(payload.userId).pipe(
          map((quotes: any) => {
            return new fromActions.LoadQuotesSuccess(quotes);
          }),
          catchError(error =>
            of(new fromActions.LoadQuotesFail(JSON.stringify(error)))
          )
        );
      })
    )
  );

  updateQuote$: Observable<any> = createEffect(() =>
    this.actions$.pipe(
      ofType(fromActions.UPDATE_QUOTE),
      map((action: fromActions.UpdateQuote) => action.payload),
      switchMap(payload => {
        return this.qouteConnector
          .updateQuote(payload.userId, payload.cartId, payload.quoteContent)
          .pipe(
            map((quote: any) => {
              return new fromActions.UpdateQuoteSuccess(quote);
            }),
            catchError(error =>
              of(new fromActions.UpdateQuoteFail(JSON.stringify(error)))
            )
          );
      })
    )
  );

  bindQuote$: Observable<any> = createEffect(() =>
    this.actions$.pipe(
      ofType(fromActions.QUOTE_PROCESS_ACTION),
      map((action: fromActions.QuoteProcessAction) => action.payload),
      mergeMap(payload => {
        return this.qouteConnector
          .invokeQuoteAction(
            payload.userId,
            payload.cartId,
            payload.action,
            payload.body
          )
          .pipe(
            mergeMap(() => {
              return [
                new CartActions.LoadCart({
                  userId: payload.userId,
                  cartId: payload.cartId,
                }),
              ];
            }),
            catchError(error =>
              of(new fromActions.UpdateQuoteFail(JSON.stringify(error)))
            )
          );
      })
    )
  );

  loadQuoteDetails$: Observable<any> = createEffect(() =>
    this.actions$.pipe(
      ofType(fromActions.LOAD_QUOTE_DETAILS),
      map((action: fromActions.LoadQuoteDetails) => action.payload),
      switchMap(payload => {
        return this.qouteConnector
          .getQuote(payload.userId, payload.quoteId)
          .pipe(
            map((quote: any) => {
              return new fromActions.LoadQuoteDetailsSuccess(quote);
            }),
            catchError(error =>
              of(new fromActions.LoadQuoteDetailsFail(JSON.stringify(error)))
            )
          );
      })
    )
  );

  loadQuoteComparison$: Observable<any> = createEffect(() =>
    this.actions$.pipe(
      ofType(fromActions.LOAD_QUOTE_COMPARISON),
      map((action: fromActions.LoadQuoteComparison) => action.payload),
      switchMap(payload => {
        return this.qouteConnector
          .compareQuotes(payload.cartCodes, payload.userId)
          .pipe(
            map((carts: any) => {
              return new fromActions.LoadQuoteComparisonSuccess(carts);
            }),
            catchError(error => {
              this.routingService.go({ cxRoute: 'quotes' });
              return of(
                new fromActions.LoadQuoteComparisonFail(JSON.stringify(error))
              );
            })
          );
      })
    )
  );

  constructor(
    private actions$: Actions,
    private qouteConnector: QuoteConnector,
    private routingService: RoutingService
  ) {}
}
