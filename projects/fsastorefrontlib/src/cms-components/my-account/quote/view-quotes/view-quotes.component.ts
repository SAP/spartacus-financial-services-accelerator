import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { select, Store } from '@ngrx/store';
import { AuthService, OccConfig } from '@spartacus/core';
import { CmsComponentData } from '@spartacus/storefront';
import { Subscription } from 'rxjs';
import { take } from 'rxjs/operators';
import { QuoteService } from '../../../../core/my-account/services/quote.service';
import * as fromQuoteStore from '../../../../core/my-account/store';
import { CmsViewQuotesComponent } from '../../../../occ/occ-models/cms-component.models';

@Component({
  selector: 'fsa-view-quotes',
  templateUrl: './view-quotes.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CMSViewQuotesComponent implements OnInit, OnDestroy {
  constructor(
    protected componentData: CmsComponentData<CmsViewQuotesComponent>,
    protected authService: AuthService,
    private store: Store<fromQuoteStore.UserState>,
    private config: OccConfig,
    private quoteService: QuoteService
  ) {}

  subscription = new Subscription();

  component$;
  quotes$;
  quotesLoaded$;
  anonymous$;
  textAllQuotes$ = 'Show all quotes';
  textLessQuotes$ = 'Show less quotes';
  quoteButtonText;
  allQuotesDisplayed$ = false;

  ngOnInit() {
    this.subscription.add(
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
        })
    );
    this.component$ = this.componentData.data$;
    this.quoteButtonText = this.textAllQuotes$;
  }

  public showAllQuotes(showAll) {
    this.allQuotesDisplayed$ = showAll;
    if (showAll) {
      this.quoteButtonText = this.textLessQuotes$;
    } else {
      this.quoteButtonText = this.textAllQuotes$;
    }
  }

  public getBaseUrl() {
    return this.config.backend.occ.baseUrl || '';
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
