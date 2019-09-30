import { Injectable } from '@angular/core';

import * as fromActions from './../actions';
import { Observable, of } from 'rxjs';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { map, catchError, mergeMap } from 'rxjs/operators';
import { QuoteDataService } from '../../services/quote-data.service';
import { OccQuoteService } from './../../../../occ/quote/quote.service';

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
      return this.quoteService.getQuotes(payload.userId).pipe(
        map((quotes: any) => {
          return new fromActions.LoadQuotesSuccess(quotes);
        }),
        catchError(error => of(new fromActions.LoadQuotesFail(error)))
      );
    })
  );

  constructor(
    private actions$: Actions,
    private quoteService: OccQuoteService,
    private quoteData: QuoteDataService
  ) {}
}
