import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { CmsComponentData } from '@spartacus/storefront';
import * as fromQuoteStore from '../../../my-account/applications/store';
import { Store, select } from '@ngrx/store';
import { OccConfig } from '@spartacus/core';
import { QuoteService } from '../../../my-account/applications/services/quote.service';
import { AuthService } from '@spartacus/core';
import {CmsViewQuotesComponent} from './../../../occ-models/cms-component.models'



@Component({
    selector: 'fsa-view-quotes',
    templateUrl: './view-quotes.component.html',
    styleUrls: ['./view-quotes.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CMSViewQuotesComponent implements OnInit {

    constructor(
        protected componentData: CmsComponentData<CmsViewQuotesComponent>,
        protected authService: AuthService,
        private store: Store<fromQuoteStore.QuoteState>,
        private config: OccConfig,
        private quoteService: QuoteService
    ) { }

    component$;
    quotes$;
    quotesLoaded$;
    anonymous$;

    textAllQuotes$ = 'Show all quotes';
    textLessQuotes$ = 'Show less quotes';
    quoteButtonText;

    allQuotesDisplayed$ = false;

    ngOnInit() {
        this.authService.getUserToken().subscribe(token => {
            if (token.userId !== undefined) {
                this.quoteService.loadQuotes();
                this.quotes$ = this.store.pipe(select(fromQuoteStore.getActiveQuotes));
                this.quotesLoaded$ = this.store.pipe(select(fromQuoteStore.getQuoteLoaded));
            } else {
                this.anonymous$ = true;
            }
        });
        this.component$ = this.componentData.data$;
        this.quoteButtonText = this.textAllQuotes$;
      }

    public getBaseUrl() {
        return this.config.server.baseUrl || '';
    }

    public showAllQuotes(showAll) {
        this.allQuotesDisplayed$ = showAll;
        if (showAll) {
            this.quoteButtonText = this.textLessQuotes$;
        } else {
            this.quoteButtonText = this.textAllQuotes$;
        }
    }
}
