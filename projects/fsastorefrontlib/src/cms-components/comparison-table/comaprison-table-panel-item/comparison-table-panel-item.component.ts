import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
  OnDestroy,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CmsConfig, RoutingService } from '@spartacus/core';
import { Observable, Subscription } from 'rxjs';
import { FSCheckoutConfigService } from '../../../core/checkout/services/fs-checkout-config.service';
import { FSProductService } from '../../../core/product-pricing/facade/fs-product.service';
import { FSProduct, OneTimeChargeEntry, PricingData } from '../../../occ/occ-models';
import { FSCartService } from '../../../core/cart/facade';
import { map } from 'rxjs/operators';

@Component({
  selector: 'fsa-comparison-table-panel-item',
  templateUrl: './comparison-table-panel-item.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ComparisonTablePanelItemComponent implements OnInit, OnDestroy {
  @Input()
  productCode: string;
  @Input()
  billingTimes: any;
  @Input()
  pricingData: PricingData;
  checkoutStepUrlNext: string;
  productPrice: string;

  constructor(
    protected cartService: FSCartService,
    protected config: CmsConfig,
    protected routingService: RoutingService,
    protected checkoutConfigService: FSCheckoutConfigService,
    protected activatedRoute: ActivatedRoute,
    protected productService: FSProductService
  ) {}

  product$: Observable<FSProduct>;
  panelItemEntries: OneTimeChargeEntry[] = [];
  private subscription = new Subscription();

  ngOnInit() {
    this.checkoutStepUrlNext = this.checkoutConfigService.getNextCheckoutStepUrl(
      this.activatedRoute
    );

    this.getProductData();
  }

  getProductData() {
    this.product$ = this.productService.getCalculatedProductData(
      this.productCode,
      this.pricingData
    );
    this.subscription.add(
      this.product$
        .pipe(
          map(product => {
            if (product) {
              product.price.oneTimeChargeEntries.forEach(oneTimeChargeEntry => {
                if (oneTimeChargeEntry.billingTime.code === 'paynow') {
                  this.productPrice = oneTimeChargeEntry.price.formattedValue;
                }
              });
              this.panelItemEntries = this.billingTimes.map(billingTime => {
                return product.price.oneTimeChargeEntries.find(
                  entry => entry.billingTime.code === billingTime.code
                );
              });
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
    this.cartService.createCartAndStartBundle(
      productCode,
      bundleTemplateId,
      1,
      this.pricingData
    );
    this.routingService.go(this.checkoutStepUrlNext);
  }

  getBaseUrl() {
    return this.config.backend.occ.baseUrl || '';
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
