import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CmsConfig, RoutingService } from '@spartacus/core';
import { Observable } from 'rxjs';
import { PricingData } from '../../../checkout/assets/models/pricing.interface';
import { FSCheckoutConfigService } from '../../../checkout/assets/services/fs-checkout-config.service';
import { PricingService } from '../../../checkout/assets/services/pricing/pricing.service';
import { FSProductService } from '../../../checkout/assets/services/product/fs-product.service';
import { FSProduct, OneTimeChargeEntry } from '../../../occ-models';
import { FSCartService } from '../../../checkout/assets/services';

@Component({
  selector: 'fsa-comparison-table-panel-item',
  templateUrl: './comparison-table-panel-item.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ComparisonTablePanelItemComponent implements OnInit {
  @Input()
  productCode: string;
  @Input()
  billingTimes: any;
  checkoutStepUrlNext: string;
  pricingData: PricingData;
  productPrice: string;

  constructor(
    protected cartService: FSCartService,
    protected config: CmsConfig,
    protected routingService: RoutingService,
    protected checkoutConfigService: FSCheckoutConfigService,
    protected activatedRoute: ActivatedRoute,
    protected pricingService: PricingService,
    protected productService: FSProductService
  ) {}

  product$: Observable<FSProduct>;
  panelItemEntries: OneTimeChargeEntry[] = [];

  ngOnInit() {
    this.checkoutStepUrlNext = this.checkoutConfigService.getNextCheckoutStepUrl(
      this.activatedRoute
    );
    this.pricingService.getPricingAttributes().subscribe(priceAttributes => {
      this.pricingData = priceAttributes;
      this.product$ = this.productService.getCalculatedProductData(
        this.productCode,
        this.pricingData
      );
      this.product$.subscribe(productData => {
        if (productData) {
          productData.price.oneTimeChargeEntries.forEach(oneTimeChargeEntry => {
            if (oneTimeChargeEntry.billingTime.code === 'paynow') {
              this.productPrice = oneTimeChargeEntry.price.formattedValue;
            }
          });
          this.panelItemEntries = this.billingTimes.map(billingTime => {
            return productData.price.oneTimeChargeEntries.find(
              entry => entry.billingTime.code === billingTime.code
            );
          });
        }
      });
    });
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

  public getBaseUrl() {
    return this.config.backend.occ.baseUrl || '';
  }
}
