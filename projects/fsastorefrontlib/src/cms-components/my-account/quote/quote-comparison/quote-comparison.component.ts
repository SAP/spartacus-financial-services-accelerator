import { Component, OnInit } from '@angular/core';
import { QuoteService } from '../../../../core/my-account/facade/quote.service';
import { QuoteConnector } from '../../../../core/my-account/connectors/quote.connector';
import { Observable } from 'rxjs';

@Component({
  selector: 'cx-fs-quote-comparison',
  templateUrl: './quote-comparison.component.html',
})
export class QuoteComparisonComponent implements OnInit {

  mockQuoteCodes = ['00001002', '00001011'];
  quotesLoaded$;
  quotes$;

  constructor(protected quoteConnector: QuoteConnector, protected quoteService: QuoteService) { }

  ngOnInit(): void {
    // this.quoteConnector.compareQuotes(this.mockQuoteCodes, 'current').subscribe(data => console.log(data, 'data'))
    this.quoteService.loadQuotesComparison(this.mockQuoteCodes);
    this.quotes$ = this.quoteService.getQuotesComparison();
    this.quotes$.subscribe(console.log)
    this.quotesLoaded$ = this.quoteService.getQuotesLoaded();
  }

}
