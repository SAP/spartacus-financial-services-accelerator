import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { CmsComponentData } from '@spartacus/storefront';
import * as fromQuoteStore from '../../../../core/my-account/store';
import { Store, select } from '@ngrx/store';
import { OccConfig, RoutingService } from '@spartacus/core';
import { AuthService } from '@spartacus/core';
import { CmsViewQuotesComponent } from '../../../../occ/occ-models/cms-component.models';
import { QuoteService } from '../../../../core/my-account/services/quote.service';
import { take } from 'rxjs/operators';

@Component({
  selector: 'fsa-view-quotes',
  templateUrl: './view-quotes.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CMSViewQuotesComponent implements OnInit {
  constructor(
    protected componentData: CmsComponentData<CmsViewQuotesComponent>,
    protected authService: AuthService,
    private store: Store<fromQuoteStore.UserState>,
    private config: OccConfig,
    private quoteService: QuoteService,
    protected routingService: RoutingService
  ) {}

  component$;
  quotes$;
  quotesLoaded$;
  anonymous$;
  textAllQuotes$ = 'Show all quotes';
  textLessQuotes$ = 'Show less quotes';
  quoteButtonText;
  allQuotesDisplayed$ = false;
  ngOnInit() {
    this.authService
      .getOccUserId()
      .pipe(take(1))
      .subscribe(occUserId => {
        if (occUserId === 'anonymous') {
          this.anonymous$ = true;
        } else {
          this.quoteService.loadQuotes();
          this.quotes$ = this.store.pipe(select(fromQuoteStore.getQuotes));
          this.quotesLoaded$ = this.store.pipe(
            select(fromQuoteStore.getQuotesLoaded)
          );
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
}
