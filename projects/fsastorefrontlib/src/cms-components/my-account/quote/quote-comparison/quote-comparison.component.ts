import {
  Component,
  OnDestroy,
  OnInit,
  ChangeDetectionStrategy,
} from '@angular/core';
import { QuoteService } from '../../../../core/my-account/facade/quote.service';
import { FSTranslationService } from '../../../../core/i18n/facade/translation.service';
import { Observable, Subscription } from 'rxjs';
import { take, tap } from 'rxjs/operators';
import {
  CategoryComparisonConfig,
  QuoteComparisonConfig,
} from '../../../../core/quote-comparison-config/quote-comparison-config';
import {
  FSCart,
  InsuranceQuote,
  OneTimeChargeEntry,
} from '../../../../occ/occ-models/occ.models';
import {
  LanguageService,
  RoutingService,
  UserIdService,
} from '@spartacus/core';
import { PAY_NOW_BILLING_TIME_CODE } from '../../../../core/general-config/defalut-general-config';

@Component({
  selector: 'cx-fs-quote-comparison',
  templateUrl: './quote-comparison.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QuoteComparisonComponent implements OnInit, OnDestroy {
  quotesLoaded$: Observable<boolean> = this.quoteService.getQuotesLoaded();
  quotes$: Observable<any> = this.quoteService.getQuotesComparison();
  quoteCodes: string[] = JSON.parse(sessionStorage.getItem('quoteCodes'));
  categoryConfig: CategoryComparisonConfig;
  billingEventLabels: string[];
  subscription = new Subscription();
  language: string;
  userId: string;
  subheader: string;

  constructor(
    protected quoteService: QuoteService,
    protected translationService: FSTranslationService,
    protected quoteComparisonConfig: QuoteComparisonConfig,
    protected languageService: LanguageService,
    protected routingService: RoutingService,
    protected userIdService: UserIdService
  ) {}

  ngOnInit(): void {
    this.subheader = this.quoteCodes?.join(' / ');
    this.subscription
      .add(
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
                  cart?.entries[0]?.product?.defaultCategory?.code
                );
              });
            })
          )
          .subscribe()
      )
      .add(
        this.userIdService
          .getUserId()
          .pipe(
            take(1),
            tap(occUserId => {
              this.userId = occUserId;
              this.quoteService.loadQuotesComparison(
                this.quoteCodes,
                this.userId
              );
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
              this.quoteService.loadQuotesComparison(
                this.quoteCodes,
                this.userId
              );
            }
            this.language = lang;
          })
        )
        .subscribe()
    );
  }

  getBillingEventLabels(oneTimeChargeEntry: OneTimeChargeEntry) {
    if (
      PAY_NOW_BILLING_TIME_CODE !== oneTimeChargeEntry?.billingTime?.code &&
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
