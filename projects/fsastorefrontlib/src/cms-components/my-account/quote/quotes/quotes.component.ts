import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { OccConfig, RoutingService } from '@spartacus/core';
import { QuoteService } from '../../../../core/my-account/services/quote.service';
import * as fromQuoteStore from '../../../../core/my-account/store';

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

  retrieveQuote(quote: any) {
    this.quoteService.retrieveQuote(quote);
    if (quote.state.code === 'UNBIND') {
      this.routingService.go({
        cxRoute: 'addOptions',
      });
    }
    if (quote.state.code === 'BIND') {
      this.routingService.go({
        cxRoute: 'quoteReview',
      });
    }
  }

  public getBaseUrl() {
    return this.config.backend.occ.baseUrl || '';
  }
}
