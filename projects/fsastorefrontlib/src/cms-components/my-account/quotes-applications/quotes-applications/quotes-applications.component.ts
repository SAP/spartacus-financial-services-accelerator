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
  UserIdService,
} from '@spartacus/core';
import { QuoteService } from '../../../../core/my-account/facade/quote.service';
import { combineLatest, Observable, Subscription } from 'rxjs';
import { PolicyChartDataService } from '../../../../core/my-account/services/policy-chart-data.service';
import { filter, map, take, tap, switchMap, shareReplay } from 'rxjs/operators';
import { InsuranceQuote } from '../../../../occ/occ-models/occ.models';
import { QUOTE_COMPARISON_NUMBER } from '../../../../core/quote-comparison-config/default-quote-comparison-config';
import { QuoteConnector } from '../../../../core/my-account/connectors/quote.connector';

@Component({
  selector: 'cx-fs-quotes',
  templateUrl: './quotes-applications.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QuotesApplicationsComponent implements OnInit, OnDestroy {
  constructor(
    protected config: OccConfig,
    protected quoteService: QuoteService,
    protected routingService: RoutingService,
    protected cartService: ActiveCartService,
    protected policyChartDataService: PolicyChartDataService,
    protected languageService: LanguageService,
    protected globalMessageService: GlobalMessageService,
    protected translation: TranslationService,
    protected userIdService: UserIdService,
    protected quoteConnector: QuoteConnector
  ) {}

  private subscription = new Subscription();
  quotes: InsuranceQuote[];
  baseUrl: string = this.config.backend.occ.baseUrl;
  quoteCodesForCompare: string[] = [];
  disabledQuoteCodes: string[] = [];
  options: any[] = [{ name: 'All quotes', code: 'allQuotes' }];
  quotesByCategory: { name: string; code: string };
  selectedQuote: InsuranceQuote;
  language: string;
  fsQuotes$: Observable<
    InsuranceQuote[]
  > = this.quoteService.getQuotesAndApplications().pipe(shareReplay());

  ngOnInit() {
    this.groupQuotesByCategory();
  }

  protected groupQuotesByCategory() {
    // this.options = [];
    this.subscription.add(
      this.fsQuotes$
        .pipe(
          tap(quotes => {
            this.quotes = quotes;
            this.quotesByCategory = <{ name: string; code: string }>(
              quotes.reduce((quote, item) => {
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
              }, {})
            );
          }),
          switchMap(_ => this.selectedQuoteFromQuoteDetails()),
          tap(() => {
            Object.keys(this.quotesByCategory).forEach(key =>
              this.options.push({
                name: key,
                code: this.quotesByCategory[key][0]?.code,
              })
            );
            console.log(this.options);
          })
          // switchMap(_ => this.setCategoryDropdown())
        )
        .subscribe()
    );
  }

  changeLanguage() {
    this.subscription.add(
      this.languageService
        .getAll()
        .pipe(
          tap(lang => {
            console.log(lang);
          })
        )
        .subscribe()
    );
  }

  protected setCategoryDropdown() {
    this.options = [];
    return combineLatest([
      this.translation.translate('quote.allQuotes'),
      this.translation.translate('quote.renewalQuotes'),
    ]).pipe(
      tap(([firstOption, renewalOption]) => {
        this.options.push({ name: firstOption, code: '' });
        const renewalQuote = this.quotes.find(quote => quote.renewal);
        if (renewalQuote) {
          this.options.push({ name: renewalOption, code: true });
        }
        Object.keys(this.quotesByCategory).forEach(key =>
          this.options.push({
            name: key,
            code: this.quotesByCategory[key][0]?.code,
          })
        );
      })
    );
  }

  selectedQuoteFromQuoteDetails() {
    return this.quoteService.quoteForCompare$.pipe(
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

  goToComparePage() {
    this.routingService.go(
      { cxRoute: 'quoteComparison' },
      { queryParams: { cartCodes: this.quoteCodesForCompare.join(',') } }
    );
  }

  clearSelectedQuotes() {
    this.quoteCodesForCompare = [];
    this.disabledQuoteCodes = [];
    this.selectedQuote = null;
  }

  selectCategory(selectedItem) {
    if (this.quoteCodesForCompare?.length === 0) {
      this.disabledQuoteCodes = [];
    }
    this.subscription.add(
      this.fsQuotes$
        .pipe(
          tap(quotes => {
            this.disableCheckboxes(quotes);
            this.quotes = !selectedItem.code
              ? quotes
              : quotes.filter(
                  q =>
                    q.defaultCategory.code === selectedItem.code ||
                    q.renewal === selectedItem.code
                );
          })
        )
        .subscribe()
    );
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

  ngOnDestroy() {
    this.quoteService.setQuoteForCompare(null);
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
