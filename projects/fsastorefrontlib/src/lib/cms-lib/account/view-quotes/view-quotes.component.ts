import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { CmsComponentData } from '@spartacus/storefront';
import * as fromQuoteStore from '../../../my-account/assets/store';
import { Store, select } from '@ngrx/store';
import { OccConfig } from '@spartacus/core';
import { QuoteService } from '../../../my-account/assets/services/quote.service';
import { AuthService } from '@spartacus/storefront';


@Component({
    selector: 'fsa-view-quotes',
    templateUrl: './view-quotes.component.html',
    styleUrls: ['./view-quotes.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CMSViewQuotesComponent implements OnInit {

    constructor(
        protected componentData: CmsComponentData,
        protected authService: AuthService,
        private store: Store<fromQuoteStore.UserState>,
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
        this.authService.userToken$.subscribe(token => {
            if (token.userId !== undefined) {
                this.quoteService.loadQuotes();
                this.quotes$ = this.store.pipe(select(fromQuoteStore.getQuotes));
                this.quotesLoaded$ = this.store.pipe(select(fromQuoteStore.getQuotesLoaded));
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
