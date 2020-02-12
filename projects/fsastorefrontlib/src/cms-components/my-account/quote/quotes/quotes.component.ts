import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { OccConfig, RoutingService } from '@spartacus/core';
import { QuoteService } from '../../../../core/my-account/facade/quote.service';

@Component({
  selector: 'fsa-quotes',
  templateUrl: './quotes.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QuotesComponent implements OnInit {
  constructor(
    private config: OccConfig,
    protected quoteService: QuoteService,
    protected routingService: RoutingService
  ) {}

  quotes$;
  quotesLoaded$;

  ngOnInit() {
    this.quoteService.loadQuotes();
    this.quotes$ = this.quoteService.getQuotes();
    this.quotesLoaded$ = this.quoteService.getQuotesLoaded();
  }

  retrieveQuote(quote: any) {
    this.quoteService.retrieveQuote(quote);
    if (quote && quote.state) {
      if (quote.state.code === 'BIND') {
        this.routingService.go({
          cxRoute: 'quoteReview',
        });
      } else {
        this.routingService.go({
          cxRoute: 'addOptions',
        });
      }
    }
  }

  getBaseUrl() {
    return this.config.backend.occ.baseUrl || '';
  }
}
