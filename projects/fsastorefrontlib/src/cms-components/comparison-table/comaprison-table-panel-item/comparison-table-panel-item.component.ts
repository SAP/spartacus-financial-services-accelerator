import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Input,
  OnDestroy,
  OnInit,
  QueryList,
  Renderer2,
  ViewChildren,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OccConfig, RoutingService } from '@spartacus/core';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { ComparisonTableService } from '../comparison-table.service';
import { FSCartService } from '../../../core/cart/facade';
import { FSCheckoutConfigService } from '../../../core/checkout/services/checkout-config.service';
import { FSProductService } from '../../../core/product-pricing/facade/product.service';
import {
  FSProduct,
  OneTimeChargeEntry,
  PricingData,
} from '../../../occ/occ-models';
import { RECOMMENDED_PRODUCT } from '../../../shared';

@Component({
  selector: 'cx-fs-comparison-table-panel-item',
  templateUrl: './comparison-table-panel-item.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ComparisonTablePanelItemComponent
  implements OnInit, AfterViewInit, OnDestroy {
  @Input()
  productCode: string;
  @Input()
  billingTimes: any;
  @Input()
  pricingData: PricingData;
  productPrice: string;
  baseUrl: string;
  @ViewChildren('tableCell') tableCell: QueryList<ElementRef<HTMLElement>>;

  constructor(
    protected cartService: FSCartService,
    protected config: OccConfig,
    protected routingService: RoutingService,
    protected checkoutConfigService: FSCheckoutConfigService,
    protected activatedRoute: ActivatedRoute,
    protected productService: FSProductService,
    protected comparisonTableService: ComparisonTableService,
    private renderer: Renderer2
  ) {}

  product$: Observable<FSProduct>;
  isLoading = true;
  recommendedProduct = localStorage.getItem(RECOMMENDED_PRODUCT);
  panelItemEntries: OneTimeChargeEntry[] = [];
  private subscription = new Subscription();

  ngOnInit() {
    this.getProductData();
    this.baseUrl = this.config.backend.occ.baseUrl || '';
  }

  getProductData() {
    this.product$ = this.productService.getCalculatedProductData(
      this.productCode,
      this.pricingData
    );

    this.subscription.add(
      this.productService
        .isLoading(this.productCode)
        .pipe(
          map(isLoading => {
            this.isLoading = isLoading;
          })
        )
        .subscribe()
    );

    this.subscription.add(
      this.product$
        .pipe(
          map(product => {
            if (product && product.price) {
              if (
                product.price.recurringChargeEntries &&
                product.price.recurringChargeEntries.length > 0
              ) {
                this.productPrice =
                  product.price.recurringChargeEntries[0].price.formattedValue;
              }
              if (
                product.price.oneTimeChargeEntries &&
                product.price.oneTimeChargeEntries.length > 0
              ) {
                if (
                  product.dynamicAttributes &&
                  Object.keys(product.dynamicAttributes).length > 0
                ) {
                  const dynamicKeys = [];
                  product.dynamicAttributes.forEach(dynamicAttribute => {
                    if (dynamicAttribute.key === 'monthlyAnnuity') {
                      this.productPrice = dynamicAttribute.value.formattedValue;
                    }
                    dynamicKeys.push(dynamicAttribute.key);
                  });

                  this.billingTimes = this.billingTimes.filter(
                    billingTime => !dynamicKeys.includes(billingTime.code)
                  );
                } else {
                  product.price.oneTimeChargeEntries.forEach(
                    oneTimeChargeEntry => {
                      if (oneTimeChargeEntry.billingTime.code === 'paynow') {
                        this.productPrice =
                          oneTimeChargeEntry.price.formattedValue;
                      }
                    }
                  );
                }
                this.panelItemEntries = this.billingTimes.map(billingTime => {
                  return product.price.oneTimeChargeEntries.find(
                    entry => entry.billingTime.code === billingTime.code
                  );
                });
              }
            }
          })
        )
        .subscribe()
    );
  }

  createCartAndStartBundleForProduct(
    productCode: string,
    bundleTemplateId: string
  ) {
    this.cartService.createCartForProduct(
      productCode,
      bundleTemplateId,
      1,
      this.pricingData
    );

    this.subscription.add(
      this.product$
        .pipe(
          map(product => {
            let route = 'addOptions';
            let routingParam;
            if (product.configurable === true) {
              route = 'configureProduct';
              routingParam = product.code;
            }
            this.routingService.go({
              cxRoute: route,
              params: { code: routingParam },
            });
          })
        )
        .subscribe()
    );
  }

  ngAfterViewInit() {
    this.subscription.add(
      this.tableCell.changes
        .pipe(
          map((data: QueryList<ElementRef<HTMLElement>>) => {
            const elementArray = data.toArray();
            this.comparisonTableService.equalizeElementsHeights(
              elementArray,
              this.renderer
            );
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
