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
import { Subscription } from 'rxjs';
import { PolicyChartDataService } from '../../../../core/my-account/services/policy-chart-data.service';
import { filter, map, tap } from 'rxjs/operators';
import { InsuranceQuote } from '../../../../occ/occ-models/occ.models';
import { QUOTE_COMPARISON_NUMBER } from 'projects/fsastorefrontlib/src/core/quote-comparison-config/default-quote-comparison-config';

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
  quotesLoaded$ = this.quoteService.getQuotesLoaded();
  quotes: InsuranceQuote[];
  baseUrl: string = this.config.backend.occ.baseUrl;
  quoteCodesForCompare: string[] = [];
  disabledQuoteCodes: string[] = [];
  options: any[];
  quotesByCategory: { [key: string]: any[] };
  selectedQuote: InsuranceQuote;
  language: string;

  ngOnInit() {
    this.quoteService.loadQuotes();
    this.groupQuotesByCategory();
    this.changeLanguage();
  }

  changeLanguage() {
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
  }

  selectedQuoteFromQuoteDetails() {
    this.subscription.add(
      this.quoteService.quoteForCompare$
        .pipe(
          tap(quote => {
            if (
              quote &&
              this.quotesByCategory[quote.defaultCategory.name]?.length > 1
            ) {
              this.selectedQuote = quote;
              this.quoteCodesForCompare.push(quote.cartCode);
              this.disableCheckboxes(this.quotes);
            }
          })
        )
        .subscribe()
    );
  }

  retrieveQuote(quote: InsuranceQuote) {
    this.quoteService.retrieveQuoteCheckout(quote);
  }

  selectQuote(
    checked: boolean,
    selectedQuote: InsuranceQuote,
    quotes: InsuranceQuote[]
  ) {
    this.selectedQuote = selectedQuote;
    const index = this.quoteCodesForCompare.indexOf(selectedQuote.cartCode);
    if (
      checked &&
      index === -1 &&
      this.quoteCodesForCompare.length < QUOTE_COMPARISON_NUMBER
    ) {
      this.quoteCodesForCompare.push(selectedQuote.cartCode);
    } else {
      this.quoteCodesForCompare.splice(index, 1);
    }
    this.disableCheckboxes(quotes);
    if (
      checked &&
      (this.quoteCodesForCompare?.length > 1 ||
        this.quoteCodesForCompare?.length === QUOTE_COMPARISON_NUMBER)
    ) {
      this.displayMessage(selectedQuote.defaultCategory.name);
    }
  }

  protected displayMessage(category) {
    this.globalMessageService.add(
      {
        key: 'quote.successfulSelection',
        params: { category },
      },
      GlobalMessageType.MSG_TYPE_CONFIRMATION,
      5000
    );
  }

  protected disableCheckboxes(quotes: InsuranceQuote[]) {
    if (this.quoteCodesForCompare?.length === 0) {
      this.disabledQuoteCodes = [];
      return;
    }
    this.disabledQuoteCodes = quotes
      .filter(
        quote =>
          this.selectedQuote?.defaultCategory?.code !==
            quote.defaultCategory.code ||
          (this.quoteCodesForCompare.length === QUOTE_COMPARISON_NUMBER &&
            !this.quoteCodesForCompare.includes(quote.cartCode))
      )
      .map(quote => quote.cartCode);
  }

  protected groupQuotesByCategory() {
    this.subscription.add(
      this.quoteService
        .getQuotes()
        .pipe(
          filter(quotes => quotes.length !== 0),
          tap(quotes => {
            this.quotes = quotes;
            this.getQuotesByCategory(quotes);
            this.setCategoryDropdown();
          })
        )
        .subscribe()
    );
  }

  protected getQuotesByCategory(quotes) {
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
    this.selectedQuoteFromQuoteDetails();
  }

  protected setCategoryDropdown() {
    this.options = [];
    this.subscription.add(
      this.translation
        .translate('quote.allQuotes')
        .pipe(
          map(firstOption => {
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
    if (this.quoteCodesForCompare?.length === 0) {
      this.disabledQuoteCodes = [];
    }
    this.subscription.add(
      this.quoteService
        .getQuotes()
        .pipe(
          map(quotes => {
            this.disableCheckboxes(quotes);
            this.quotes = !selectedItem.code
              ? quotes
              : quotes.filter(
                  q => q.defaultCategory.code === selectedItem.code
                );
          })
        )
        .subscribe()
    );
  }

  clearSelectedQuotes() {
    this.quoteCodesForCompare = [];
    this.disabledQuoteCodes = [];
    this.selectedQuote = null;
  }

  goToDetailsPage(quote: InsuranceQuote) {
    if (this.quotesByCategory[quote.defaultCategory.name]?.length > 1) {
      sessionStorage.setItem('qouteCodeForCompare', quote.cartCode);
    }
    this.routingService.go({
      cxRoute: 'quoteDetails',
      params: { quoteId: quote.quoteId },
    });
  }

  goToComparePage() {
    this.routingService.go(
      { cxRoute: 'quoteComparison' },
      { queryParams: { cartCodes: this.quoteCodesForCompare.join(',') } }
    );
  }

  ngOnDestroy() {
    this.quoteService.setQuoteForCompare(null);
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
