import { Component, OnInit } from '@angular/core';
import * as fromQuoteStore from '../../../my-account/applications/store';
import { Store } from '@ngrx/store';
import { QuoteService } from '../../../my-account/applications/services/quote.service';


@Component({
  selector: 'fsa-quotes-page-layout',
  templateUrl: './quotes-page-layout.component.html',
  styleUrls: ['./quotes-page-layout.component.scss']
})
export class QuotesPageLayoutComponent implements OnInit {

  constructor (
    protected store: Store<fromQuoteStore.QuoteState>,
    protected quoteService: QuoteService
  ) {}

  quotes = 'Quotes';

  ngOnInit() {
    this.quoteService.loadQuotes();
  }
}
