import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { CmsComponentData } from '@spartacus/storefront';
import * as fromQuoteStore from '../../../my-account/assets/store';
import { Store, select } from '@ngrx/store';
import { OccConfig } from '@spartacus/core';
import { AuthService } from '@spartacus/core';
import {CmsViewQuotesComponent} from './../../../occ-models/cms-component.models';
import { QuoteService } from '../../../my-account/assets/services/quote.service';


@Component({
    selector: 'fsa-view-quotes',
    templateUrl: './view-quotes.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CMSViewQuotesComponent implements OnInit {

    constructor(
        protected componentData: CmsComponentData<CmsViewQuotesComponent>,
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
        this.authService.getUserToken().subscribe(token => {
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
        return this.config.backend.occ.baseUrl || '';
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
