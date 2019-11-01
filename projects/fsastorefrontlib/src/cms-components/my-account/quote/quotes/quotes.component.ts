import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import * as fromQuoteStore from '../../../../core/my-account/store';
import { Store, select } from '@ngrx/store';
import { OccConfig, RoutingService } from '@spartacus/core';
import { QuoteService } from '../../../../core/my-account/services/quote.service';

@Component({
  selector: 'fsa-quotes',
  templateUrl: './quotes.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QuotesComponent implements OnInit {
  constructor(
    private store: Store<fromQuoteStore.UserState>,
    private config: OccConfig,
    protected quoteService: QuoteService,
    protected routingService: RoutingService
  ) {}

  quotes$;
  quotesLoaded$;

  ngOnInit() {
    this.quoteService.loadQuotes();
    this.quotes$ = this.store.pipe(select(fromQuoteStore.getQuotes));
    this.quotesLoaded$ = this.store.pipe(
      select(fromQuoteStore.getQuotesLoaded)
    );
  }

  public getBaseUrl() {
    return this.config.backend.occ.baseUrl || '';
  }

  retrieveQuote(quote: any) {
    this.quoteService.retrieveQuote(quote);
    this.routingService.go({
      cxRoute: 'addOptions',
    });
  }
}
