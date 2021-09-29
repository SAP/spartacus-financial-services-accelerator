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
import { OneTimeChargeEntry } from '../../../../occ/occ-models/occ.models';

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

  constructor(
    protected quoteService: QuoteService,
    protected translationService: FSTranslationService,
    protected quoteComparisonConfig: QuoteComparisonConfig
  ) {}

  ngOnInit(): void {
    this.subscription.add(
      this.quoteService
        .loadQuotesComparison(JSON.parse(sessionStorage.getItem('quoteCodes')))
        .subscribe()
    );
    this.quotes$ = this.quoteService.getQuotesComparison();
    this.subscription.add(
      this.quotes$
        .pipe(
          tap(quotes => {
            this.billingEventLabels = [];
            console.log(quotes, 'quotes');
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

  getBillingEventValue(
    billingEventCode: string,
    billingEventsList: OneTimeChargeEntry[]
  ): string {
    const billingEvent = billingEventsList.find(
      event => event.billingTime.name === billingEventCode
    );
    return billingEvent?.price?.value
      ? billingEvent?.price?.formattedValue
      : !billingEvent?.chargeInformation
      ? 'Not included'
      : billingEvent?.chargeInformation;
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

  ngOnDestroy() {
    sessionStorage.removeItem('quoteCodes');
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
