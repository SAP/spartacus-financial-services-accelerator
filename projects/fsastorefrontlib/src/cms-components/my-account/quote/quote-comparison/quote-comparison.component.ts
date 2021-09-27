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
  billingEventsLabels: string[];
  subscription = new Subscription();

  constructor(
    protected quoteService: QuoteService,
    protected translationService: FSTranslationService,
    protected quoteComparisonConfig: QuoteComparisonConfig
  ) {}

  ngOnInit(): void {
    console.log(JSON.parse(sessionStorage.getItem('quoteCodes')), 'quoteCodes');
    this.subscription.add(
      this.quoteService
        .loadQuotesComparison(JSON.parse(sessionStorage.getItem('quoteCodes')))
        .subscribe()
    );
    this.quotesLoaded$.subscribe(console.log);
    this.quotes$ = this.quoteService.getQuotesComparison();
    this.subscription.add(
      this.quotes$
        .pipe(
          tap(quotes => {
            this.billingEventsLabels = [];
            console.log(quotes, 'quotes');
            quotes?.carts?.map(cart => {
              cart?.entries[0]?.product?.price?.oneTimeChargeEntries?.forEach(
                oneTimeCharge => {
                  if (
                    this.paynowBillingTimeCode !==
                      oneTimeCharge?.billingTime?.code &&
                    !this.billingEventsLabels.includes(
                      oneTimeCharge?.billingTime?.name
                    )
                  ) {
                    this.billingEventsLabels.push(
                      oneTimeCharge?.billingTime?.name
                    );
                  }
                }
              );
              this.categoryConfig = this.quoteComparisonConfig.categoryConfig.find(
                category =>
                  category.categoryCode ===
                  cart?.deliveryOrderGroups[0]?.entries[0]?.product
                    ?.defaultCategory?.code
              );
            });
          })
        )
        .subscribe()
    );

    // this.subscription.add(
    //   // this.comparisonObj$ = this.quoteService
    //   this.quoteService
    //     .getQuotesComparison()
    //     .pipe(
    //       // map(quotes => quotes?.carts),
    //       map(quotes => {
    //         // this.comparisonObj = {};
    //         console.log(quotes, 'quotes')
    //         quotes?.carts?.map(cart => {
    //           this.categoryConfig = this.quoteComparisonConfig.categoryConfig.find(
    //             category =>
    //               category.categoryCode ===
    //               cart?.deliveryOrderGroups[0]?.entries[0]?.product
    //                 ?.defaultCategory?.code
    //           );
    //         this.comparisonObj = {
    //             formData: this.getFormDataAccordion(
    //               cart,
    //               items,
    //               headerList,
    //               cartCodes,
    //             ),
    //           };
    //           console.log(this.comparisonObj, 'comparisonObj')
    //         });
    //       })
    //     )
    //     .subscribe()
    // );
  }

  // getFormDataAccordion(
  //   cart: any,
  //   items: any[],
  //   headerList: string[],
  //   cartCodes: string[],
  // ) {
  //   const insuredObjectListItems = cart?.entries[0]?.product?.configurable ? cart?.entries[0]?.configurationInfos[0]?.configurationValues?.entry : cart.insuranceQuote?.insuredObjectList?.insuredObjects[0]?.insuredObjectItems;
  //   const insuredItem = insuredObjectListItems.map(
  //     item => {
  //       return {
  //         label: item.key ? item.key : item.label,
  //         value: item.formattedValue
  //           ? item.formattedValue
  //           : item.value
  //       };
  //     }
  //   );
  //   items.push(insuredItem);
  //   headerList.push(
  //     cart?.deliveryOrderGroups[0]?.entries[0]?.product?.cartDisplayName
  //   );
  //   cartCodes.push(cart?.code);
  //   return {
  //     labels: items[0].map(item => item.label),
  //     items,
  //     headerList,
  //     cartCodes,
  //     categoryCode:
  //       cart?.deliveryOrderGroups[0]?.entries[0]?.product?.defaultCategory
  //         ?.code,
  //     configurable: cart?.entries[0]?.product?.configurable
  //   };
  // }

  getBillingEventValue(
    billingEventCode: string,
    billingEventsList: any[]
  ): string {
    const billingEvent = billingEventsList.find(
      event => event.billingTime.name === billingEventCode
    );
    return billingEvent ? billingEvent?.price?.formattedValue : ' - ';
  }

  getTranslation(
    translationChunk: string,
    translationGroup: string,
    translationKey?: string
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
