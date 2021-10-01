import { Component, OnDestroy, OnInit } from '@angular/core';
import { QuoteService } from '../../../../core/my-account/facade/quote.service';
import { FSTranslationService } from '../../../../core/i18n/facade/translation.service';
import { Observable, Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';
import {
  CategoryComparisonConfig,
  QuoteComparisonConfig,
} from 'projects/fsastorefrontlib/src/core/quote-comparison-config/quote-comparison-config';
import { ChangeDetectionStrategy } from '@angular/core';
import {
  FSCart,
  InsuranceQuote,
  OneTimeChargeEntry,
} from '../../../../occ/occ-models/occ.models';
import {
  LanguageService,
  RoutingService,
  TranslatePipe,
} from '@spartacus/core';

@Component({
  selector: 'cx-fs-quote-comparison',
  templateUrl: './quote-comparison.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QuoteComparisonComponent implements OnInit, OnDestroy {
  private readonly paynowBillingTimeCode = 'paynow';
  quotesLoaded$: Observable<boolean> = this.quoteService.getQuotesLoaded();
  quotes$: Observable<any>;
  categoryConfig: CategoryComparisonConfig;
  billingEventLabels: string[];
  subscription = new Subscription();
  language: string;
  quoteCodes: string[];

  constructor(
    protected quoteService: QuoteService,
    protected translationService: FSTranslationService,
    protected quoteComparisonConfig: QuoteComparisonConfig,
    protected translatePipe: TranslatePipe,
    protected languageService: LanguageService,
    protected routingService: RoutingService
  ) {}

  ngOnInit(): void {
    this.quoteCodes = JSON.parse(sessionStorage.getItem('quoteCodes'));
    this.loadQuotes();
    this.quotes$ = this.quoteService.getQuotesComparison();
    this.subscription.add(
      this.quotes$
        .pipe(
          tap(quotes => {
            this.billingEventLabels = [];
            quotes?.carts?.map(cart => {
              cart?.entries[0]?.product?.price?.oneTimeChargeEntries?.forEach(
                oneTimeChargeEntry =>
                  this.getBillingEventLabels(oneTimeChargeEntry)
              );
              this.getCategoryConfig(
                cart?.deliveryOrderGroups[0]?.entries[0]?.product
                  ?.defaultCategory?.code
              );
            });
          })
        )
        .subscribe()
    );
    this.changeLanguage();
  }

  changeLanguage() {
    this.subscription.add(
      this.languageService
        .getActive()
        .pipe(
          tap(lang => {
            if (this.language && this.language !== lang) {
              this.loadQuotes();
            }
            this.language = lang;
          })
        )
        .subscribe()
    );
  }

  loadQuotes() {
    this.subscription.add(
      this.quoteService.loadQuotesComparison(this.quoteCodes).subscribe()
    );
  }

  getBillingEventLabels(oneTimeChargeEntry: OneTimeChargeEntry) {
    if (
      this.paynowBillingTimeCode !== oneTimeChargeEntry?.billingTime?.code &&
      !this.billingEventLabels.includes(oneTimeChargeEntry?.billingTime?.name)
    ) {
      this.billingEventLabels.push(oneTimeChargeEntry?.billingTime?.name);
    }
  }

  getCategoryConfig(cartCategoryCode: string) {
    this.categoryConfig = this.quoteComparisonConfig.categoryConfig.find(
      category => category.categoryCode === cartCategoryCode
    );
  }

  getTranslation(
    translationChunk: string,
    translationGroup: string,
    translationKey: string
  ): string {
    return this.translationService.getTranslationValue(
      [translationChunk, translationGroup],
      translationKey
    );
  }

  retrieveQuote(cart: FSCart) {
    const quote: InsuranceQuote = {
      ...cart.insuranceQuote,
      cartCode: cart.code,
    };
    this.quoteService.retrieveQuoteCheckout(quote);
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
