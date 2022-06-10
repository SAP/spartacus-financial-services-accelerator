import {
  Component,
  OnDestroy,
  OnInit,
  ChangeDetectionStrategy,
} from '@angular/core';
import { QuoteService } from '../../../../core/my-account/facade/quote.service';
import { FSTranslationService } from '../../../../core/i18n/facade/translation.service';
import { combineLatest, Observable, Subscription } from 'rxjs';
import { filter, map, shareReplay, tap } from 'rxjs/operators';
import {
  CategoryComparisonConfig,
  QuoteComparisonConfig,
} from '../../../../core/quote-comparison-config/quote-comparison-config';
import {
  FSCart,
  InsuranceQuote,
  OneTimeChargeEntry,
} from '../../../../occ/occ-models/occ.models';
import { RoutingService, UserIdService } from '@spartacus/core';
import { PAY_NOW_BILLING_TIME_CODE } from '../../../../core/general-config/defalut-general-config';

@Component({
  selector: 'cx-fs-quotes-applications-comparison',
  templateUrl: './quotes-applications-comparison.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QuotesApplicationsComparisonComponent
  implements OnInit, OnDestroy {
  subscription = new Subscription();
  quoteCodes: string[];
  categoryConfig: CategoryComparisonConfig;
  billingEventLabels: string[];
  userId: string;
  subheader: string;
  fsQuote$: Observable<any>;

  constructor(
    protected quoteService: QuoteService,
    protected translationService: FSTranslationService,
    protected quoteComparisonConfig: QuoteComparisonConfig,
    protected routingService: RoutingService,
    protected userIdService: UserIdService
  ) {}

  ngOnInit(): void {
    this.subscription
      .add(
        combineLatest([
          this.routingService.getRouterState(),
          this.userIdService.getUserId(),
        ])
          .pipe(
            filter(([routingData, _]) => !routingData.nextState),
            map(([routingData, occUserId]) => {
              this.quoteCodes = routingData.state.queryParams.cartCodes.split(
                ','
              );
              this.userId = occUserId;
              this.subheader = this.quoteCodes?.join(' / ');
              this.fsQuote$ = this.quoteService
                .getQuotesApplictionsForCompare(this.quoteCodes, this.userId)
                .pipe(shareReplay());
            })
          )
          .subscribe()
      )
      .add(
        this.fsQuote$
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

    this.subscription.add(
      this.quoteService.retrieveQuoteCheckout(quote).subscribe()
    );
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
