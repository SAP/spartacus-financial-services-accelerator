import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { CmsComponentData } from '@spartacus/storefront';
import * as fromQuoteStore from '../../../my-account/applications/store';
import { Store, select } from '@ngrx/store';
import { OccConfig } from '@spartacus/core';
import { QuoteService } from '../../../my-account/applications/services/quote.service';

@Component({
    selector: 'fsa-view-quotes',
    templateUrl: './view-quotes.component.html',
    styleUrls: ['./view-quotes.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CMSViewQuotesComponent implements OnInit {

    component$;

    constructor(
        protected componentData: CmsComponentData,
        private store: Store<fromQuoteStore.QuoteState>,
        private config: OccConfig,
        private quoteService: QuoteService
    ) { }
         
    quotes$;
    quotesLoaded$;
    
    public noQuotesText = 'You have no Quotes!';

    ngOnInit() {
    
        this.quoteService.loadQuotes();
        this.quotes$ = this.store.pipe(select(fromQuoteStore.getActiveQuotes));
        this.quotesLoaded$ = this.store.pipe(select(fromQuoteStore.getQuoteLoaded));
        this.component$ = this.componentData.data$;
      }
    
    public getBaseUrl() {
        return this.config.server.baseUrl || '';
    }
}