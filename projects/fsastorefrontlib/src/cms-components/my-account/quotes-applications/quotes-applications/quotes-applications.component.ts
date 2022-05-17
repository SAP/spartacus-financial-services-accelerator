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
  options: any[];
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
            this.selectedQuoteFromQuoteDetails();
            // this.setCategoryDropdown();
          })
        )
        .subscribe()
    );
  }

  protected setCategoryDropdown() {
    this.options = [];
    this.subscription.add(
      combineLatest([
        this.translation.translate('quote.allQuotes'),
        this.translation.translate('quote.renewalQuotes'),
      ])
        .pipe(
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
              // this.disableCheckboxes(this.quotes);
            }
          })
        )
        .subscribe()
    );
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
