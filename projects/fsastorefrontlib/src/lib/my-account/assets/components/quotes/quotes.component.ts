import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import * as fromQuoteStore from '../../store';
import { Store, select } from '@ngrx/store';
import { OccConfig } from '@spartacus/core';
import { Observable } from 'rxjs';


@Component({
  selector: 'fsa-quotes',
  templateUrl: './quotes.component.html',
  styleUrls: ['./quotes.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class QuotesComponent implements OnInit {

  constructor(
    private store: Store<fromQuoteStore.UserState>,
    private config: OccConfig
  ) {}

  quotes$;
  quotesLoaded$;

  noQuotesText = 'You have no Quotes!';

  ngOnInit() {
    this.quotes$ = this.store.pipe(select(fromQuoteStore.getQuotes));
    this.quotesLoaded$ = this.store.pipe(select(fromQuoteStore.getQuotesLoaded));
  }

  public getBaseUrl() {
    return this.config.server.baseUrl || '';
  }
}
