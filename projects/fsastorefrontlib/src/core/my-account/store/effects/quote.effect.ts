import { CartActions } from '@spartacus/core';
import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { catchError, map, mergeMap, switchMap } from 'rxjs/operators';
import * as fromActions from '../actions';
import { QuoteConnector } from '../../connectors/quote.connector';

@Injectable()
export class QuoteEffects {
  @Effect()
  loadQuotes$: Observable<any> = this.actions$.pipe(
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
  );

  @Effect()
  updateQuote$: Observable<any> = this.actions$.pipe(
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
  );

  @Effect()
  bindQuote$: Observable<any> = this.actions$.pipe(
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
  );

  @Effect()
  loadQuoteDetails$: Observable<any> = this.actions$.pipe(
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
  );

  constructor(private actions$: Actions, private qouteConnector: QuoteConnector) {}
}
