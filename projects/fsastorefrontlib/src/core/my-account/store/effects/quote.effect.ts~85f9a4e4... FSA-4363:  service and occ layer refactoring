import { Injectable } from '@angular/core';

import * as fromActions from '../actions';
import { Observable, of } from 'rxjs';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { map, catchError, mergeMap } from 'rxjs/operators';
import { QuoteDataService } from '../../services/quote-data.service';
import { OccQuoteAdapter } from '../../../../occ/services/quote/occ-quote.adapter';

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

  constructor(
    private actions$: Actions,
    private quoteAdapter: OccQuoteAdapter,
    private quoteData: QuoteDataService
  ) {}
}
