import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';
import * as fromAction from '../store/actions';
import * as fromReducer from '../store/reducers';
import * as fromSelector from '../store/selectors';
import { AuthService } from '@spartacus/core';
import { QuoteDataService } from './quote-data.service';

@Injectable()
export class QuoteService {
  constructor(
    private store: Store<fromReducer.UserState>,
    private quoteData: QuoteDataService,
    protected auth: AuthService
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
}
