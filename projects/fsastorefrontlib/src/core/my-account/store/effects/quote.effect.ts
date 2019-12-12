import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { OccQuoteAdapter } from '../../../../occ/services/quote/occ-quote.adapter';
import { QuoteDataService } from '../../services/quote-data.service';
import * as fromActions from '../actions';

@Injectable()
export class QuoteEffects {
  @Effect()
  loadQuotes$: Observable<any> = this.actions$.pipe(
    ofType(fromActions.LOAD_QUOTES),
    map((action: fromActions.LoadQuotes) => action.payload),
    mergeMap(payload => {
      if (payload === undefined || payload.userId === undefined) {
        payload = {
          userId: this.quoteData.userId,
          quotes: this.quoteData.quotes,
        };
      }
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
    mergeMap(payload => {
      if (payload === undefined || payload.userId === undefined) {
        payload = {
          userId: this.quoteData.userId,
          quotes: this.quoteData.quotes,
        };
      }
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

  constructor(
    private actions$: Actions,
    private quoteAdapter: OccQuoteAdapter,
    private quoteData: QuoteDataService
  ) {}
}
