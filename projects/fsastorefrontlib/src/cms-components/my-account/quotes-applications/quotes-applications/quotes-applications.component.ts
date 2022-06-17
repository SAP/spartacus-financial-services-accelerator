import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { combineLatest, Observable, Subscription } from 'rxjs';
import { tap, switchMap, shareReplay } from 'rxjs/operators';
import {
  ActiveCartService,
  GlobalMessageService,
  GlobalMessageType,
  OccConfig,
  RoutingService,
  TranslationService,
  UserIdService,
} from '@spartacus/core';
import { QuoteService } from '../../../../core/my-account/facade/quote.service';
import { PolicyChartDataService } from '../../../../core/my-account/services/policy-chart-data.service';
import { InsuranceQuote } from '../../../../occ/occ-models/occ.models';
import { QUOTE_COMPARISON_NUMBER } from '../../../../core/quote-comparison-config/default-quote-comparison-config';

@Component({
  selector: 'cx-fs-quotes-applications',
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
    protected globalMessageService: GlobalMessageService,
    protected translation: TranslationService,
    protected userIdService: UserIdService
  ) {}

  private subscription = new Subscription();
  quotes: InsuranceQuote[];
  baseUrl: string = this.config.backend.occ.baseUrl;
  quoteCodesForCompare: string[] = [];
  disabledQuoteCodes: string[] = [];
  options: any[];
  quotesByCategory: { name: string; code: string };
  selectedQuote: InsuranceQuote;
  quotesApplications$: Observable<
    InsuranceQuote[]
  > = this.quoteService.getQuotesApplications().pipe(shareReplay());

  ngOnInit() {
    this.groupQuotesByCategory();
  }

  protected groupQuotesByCategory() {
    this.subscription.add(
      this.quotesApplications$
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
          switchMap(_ => this.setCategoryDropdown())
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

  retrieveQuote(quote: InsuranceQuote) {
    this.subscription.add(
      this.quoteService.retrieveQuoteCheckout(quote).subscribe()
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
      this.quotesApplications$
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
            console.log(this.quotes);
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
