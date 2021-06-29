import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { ActiveCartService, OccConfig, RoutingService } from '@spartacus/core';
import { QuoteService } from '../../../../core/my-account/facade/quote.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'cx-fs-quotes',
  templateUrl: './quotes.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QuotesComponent implements OnInit, OnDestroy {
  constructor(
    protected config: OccConfig,
    protected quoteService: QuoteService,
    protected routingService: RoutingService,
    protected cartService: ActiveCartService
  ) {}

  private subscription = new Subscription();
  quotes$;
  quotesLoaded$;
  baseUrl: string;

  ngOnInit() {
    this.quoteService.loadQuotes();
    this.quotes$ = this.quoteService.getQuotes();
    this.quotesLoaded$ = this.quoteService.getQuotesLoaded();
    this.baseUrl = this.config.backend.occ.baseUrl || '';
  }

  retrieveQuote(quote: any) {
    this.quoteService.retrieveQuoteCheckout(quote);
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
