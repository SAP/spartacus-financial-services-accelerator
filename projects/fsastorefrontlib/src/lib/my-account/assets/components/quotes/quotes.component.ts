import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import * as fromQuoteStore from '../../store';
import { Store, select } from '@ngrx/store';
import { OccConfig } from '@spartacus/core';
import { QuoteService } from '../../services/quote.service';

@Component({
  selector: 'fsa-quotes',
  templateUrl: './quotes.component.html',
  styleUrls: ['./quotes.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class QuotesComponent implements OnInit {

  constructor(
    private store: Store<fromQuoteStore.UserState>,
    private config: OccConfig,
    protected quoteService: QuoteService,
  ) {}

  quotes$;
  quotesLoaded$;

  ngOnInit() {
    this.quoteService.loadQuotes();
    this.quotes$ = this.store.pipe(select(fromQuoteStore.getQuotes));
    this.quotesLoaded$ = this.store.pipe(select(fromQuoteStore.getQuotesLoaded));
  }

  public getBaseUrl() {
    return this.config.backend.occ.baseUrl || '';
  }
}
