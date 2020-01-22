import { CartActions } from '@spartacus/core';
import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { catchError, map, mergeMap, switchMap } from 'rxjs/operators';
import { OccQuoteAdapter } from '../../../../occ/services/quote/occ-quote.adapter';
import * as fromActions from '../actions';

@Injectable()
export class QuoteEffects {
  @Effect()
  loadQuotes$: Observable<any> = this.actions$.pipe(
    ofType(fromActions.LOAD_QUOTES),
    map((action: fromActions.LoadQuotes) => action.payload),
    switchMap(payload => {
      return this.quoteAdapter.getQuotes(payload.userId).pipe(
        map((quotes: any) => {
          return new fromActions.LoadQuotesSuccess(quotes);
        }),
        catchError(error => of(new fromActions.LoadQuotesFail(error)))
      );
    })
  );

  @Effect()
  updateQuote$: Observable<any> = this.actions$.pipe(
    ofType(fromActions.UPDATE_QUOTE),
    map((action: fromActions.UpdateQuote) => action.payload),
    switchMap(payload => {
      return this.quoteAdapter
        .updateQuote(payload.userId, payload.cartId, payload.quoteContent)
        .pipe(
          map((quotes: any) => {
            return new fromActions.UpdateQuoteSuccess(quotes);
          }),
          catchError(error => of(new fromActions.UpdateQuoteFail(error)))
        );
    })
  );

  @Effect()
  bindQuote$: Observable<any> = this.actions$.pipe(
    ofType(fromActions.BIND_QUOTE),
    map((action: fromActions.BindQuote) => action.payload),
    mergeMap(payload => {
      return this.quoteAdapter.bindQuote(payload.userId, payload.cartId).pipe(
        mergeMap(() => {
          return [
            new CartActions.LoadCart({
              userId: payload.userId,
              cartId: payload.cartId,
            }),
          ];
        }),
        catchError(error => of(new fromActions.UpdateQuoteFail(error)))
      );
    })
  );

  constructor(
    private actions$: Actions,
    private quoteAdapter: OccQuoteAdapter
  ) {}
}
