import { Component, OnInit } from '@angular/core';
import { QuoteService } from '../../../../core/my-account/facade/quote.service';
import { FSTranslationService } from '../../../../core/i18n/facade/translation.service';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import {
  CategoryComparisonConfig,
  QuoteComparisonConfig,
} from 'projects/fsastorefrontlib/src/core/quote-comparison-config/quote-comparison-config';

@Component({
  selector: 'cx-fs-quote-comparison',
  templateUrl: './quote-comparison.component.html',
})
export class QuoteComparisonComponent implements OnInit {
  mockQuoteCodes = ['00001002', '00001011'];
  quotesLoaded$: Observable<boolean> = this.quoteService.getQuotesLoaded();
  comparisonObj: any;
  categoryConfig: CategoryComparisonConfig;
  subscription = new Subscription();

  constructor(
    protected quoteService: QuoteService,
    protected translationService: FSTranslationService,
    protected quoteComparisonConfig: QuoteComparisonConfig
  ) {}

  ngOnInit(): void {
    this.quoteService.loadQuotesComparison(this.mockQuoteCodes);
    let items = [];
    let headerList = [];
    let cartCodes = [];
    this.subscription.add(
      this.quoteService
        .getQuotesComparison()
        .pipe(
          map(quotes => quotes?.carts),
          map((quotes: any[]) => {
            quotes?.map((cart, i) => {
              this.categoryConfig = this.quoteComparisonConfig.categoryConfig.find(
                category =>
                  category.categoryCode ===
                  cart?.deliveryOrderGroups[0]?.entries[0]?.product
                    ?.defaultCategory?.code
              );
              this.comparisonObj = {
                formData: this.getFormDataAccordion(
                  cart,
                  items,
                  headerList,
                  cartCodes,
                  i
                ),
              };
            });
          })
        )
        .subscribe()
    );
  }

  getFormDataAccordion(
    cart,
    items: any[],
    headerList: string[],
    cartCodes: string[],
    index: number
  ) {
    const insuredItem = cart.insuranceQuote.insuredObjectList.insuredObjects[0].insuredObjectItems.map(
      item => {
        return {
          label: item.label,
          [`value${index}`]: item.formattedValue
            ? item.formattedValue
            : item.value,
        };
      }
    );
    items.push(insuredItem);
    headerList.push(
      cart?.deliveryOrderGroups[0]?.entries[0]?.product?.cartDisplayName
    );
    cartCodes.push(cart?.code);
    return {
      labels: items[0].map(item => item.label),
      items,
      headerList,
      cartCodes,
      categoryCode:
        cart?.deliveryOrderGroups[0]?.entries[0]?.product?.defaultCategory
          ?.code,
    };
  }

  getTranslation(translationGroup: string, translationKey: string): string {
    return this.translationService.getTranslationValue(
      ['quote.details', translationGroup],
      translationKey
    );
  }
}
