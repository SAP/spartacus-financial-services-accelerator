import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import {
  ActiveCartService,
  GlobalMessageService,
  GlobalMessageType,
  LanguageService,
  OccConfig,
  RoutingService,
  TranslationService,
} from '@spartacus/core';
import { QuoteService } from '../../../../core/my-account/facade/quote.service';
import { Observable, Subscription } from 'rxjs';
import { PolicyChartDataService } from '../../../../core/my-account/services/policy-chart-data.service';
import { filter, map, tap } from 'rxjs/operators';
import { InsuranceQuote } from '../../../../occ/occ-models/occ.models';

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
    protected cartService: ActiveCartService,
    protected policyChartDataService: PolicyChartDataService,
    protected languageService: LanguageService,
    protected globalMessageService: GlobalMessageService,
    protected translation: TranslationService
  ) {}

  private subscription = new Subscription();
  quotes$: Observable<InsuranceQuote[]>;
  quotesLoaded$;
  baseUrl: string;
  quoteCodesForCompare: string[] = [];
  options: any[];
  quotesByCategory: { [key: string]: any[] };
  selectedQuote: InsuranceQuote;
  language: string;

  ngOnInit() {
    this.quoteService.loadQuotes();
    this.quotes$ = this.quoteService.getQuotes();
    this.subscription.add(
      this.quotes$
        .pipe(
          filter(quotes => quotes.length !== 0),
          tap(quotes => {
            this.globalMessageService.add(
              { key: 'quote.compareInfo' },
              GlobalMessageType.MSG_TYPE_INFO,
              10000
            );
            this.groupQuotesByCategory(quotes);
            this.setCategoryDropdown();
          })
        )
        .subscribe()
    );
    this.quotesLoaded$ = this.quoteService.getQuotesLoaded();
    this.baseUrl = this.config.backend.occ.baseUrl || '';
    this.subscription.add(
      this.languageService
        .getActive()
        .pipe(
          tap(lang => {
            if (this.language && this.language !== lang) {
              this.quoteService.loadQuotes();
            }
            this.language = lang;
          })
        )
        .subscribe()
    );
    this.subscription.add(
      this.quoteService.quoteForCompare$
        .pipe(
          tap(quote => {
            if (quote) {
              this.selectedQuote = quote;
              this.quoteCodesForCompare.push(quote.cartCode);
            }
          })
        )
        .subscribe()
    );
  }

  retrieveQuote(quote: InsuranceQuote) {
    this.quoteService.retrieveQuoteCheckout(quote);
  }

  selectQuote(checked: boolean, selectedQuote: InsuranceQuote) {
    this.selectedQuote = selectedQuote;
    const index = this.quoteCodesForCompare.indexOf(selectedQuote.cartCode);
    if (!checked && index > -1) {
      this.quoteCodesForCompare.splice(index, 1);
      return;
    }
    if (checked && index === -1 && this.quoteCodesForCompare.length < 2) {
      this.quoteCodesForCompare.push(selectedQuote.cartCode);
    }
    if (this.quoteCodesForCompare?.length === 2) {
      this.globalMessageService.add(
        {
          key: 'quote.successfulSelection',
          params: { category: this.selectedQuote.defaultCategory.name },
        },
        GlobalMessageType.MSG_TYPE_CONFIRMATION,
        5000
      );
    }
  }

  groupQuotesByCategory(quotes) {
    this.quotesByCategory = quotes.reduce((quote, item) => {
      const groupCriteria = this.policyChartDataService.getObjectValueByProperty(
        'defaultCategory.name',
        item
      );
      quote[groupCriteria] = quote[groupCriteria] || [];
      quote[groupCriteria].push({
        name: item.defaultCategory.name,
        code: item.defaultCategory.code,
      });
      return quote;
    }, {});
  }

  setCategoryDropdown() {
    this.subscription.add(
      this.translation
        .translate('quote.allQuotes')
        .pipe(
          map(firstOption => {
            this.options = [];
            this.options.push({ name: firstOption, code: '' });
            Object.keys(this.quotesByCategory).forEach(key =>
              this.options.push({
                name: key,
                code: this.quotesByCategory[key][0]?.code,
              })
            );
          })
        )
        .subscribe()
    );
  }

  selectCategory(selectedItem) {
    if (!selectedItem.code) {
      this.quotes$ = this.quoteService.getQuotes();
      return;
    }
    this.quotes$ = this.quoteService
      .getQuotes()
      .pipe(
        map(quotes =>
          quotes.filter(q => q.defaultCategory.code === selectedItem.code)
        )
      );
  }

  goToComparePage() {
    // redirect to compare page
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
