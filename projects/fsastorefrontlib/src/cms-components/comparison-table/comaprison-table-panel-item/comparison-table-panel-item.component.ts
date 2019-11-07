import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CmsConfig, RoutingService } from '@spartacus/core';
import { Observable } from 'rxjs';
import { PricingData } from '../../../core/models/pricing.interface';
import { FSCheckoutConfigService } from '../../../core/checkout/services/fs-checkout-config.service';
import { FSProductService } from '../../../core/checkout/services/product/fs-product.service';
import { FSProduct, OneTimeChargeEntry } from '../../../occ/occ-models';
import { FSCartService } from '../../../core/checkout/services';
import { PricingService } from '../../../core/checkout/services/pricing/pricing.service';
import { FormDataService } from '@fsa/dynamicforms';

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
    protected productService: FSProductService,
    protected formDataService: FormDataService
  ) {}

  product$: Observable<FSProduct>;
  panelItemEntries: OneTimeChargeEntry[] = [];

  ngOnInit() {
    this.checkoutStepUrlNext = this.checkoutConfigService.getNextCheckoutStepUrl(
      this.activatedRoute
    );

    this.formDataService.getCurrentFormData().subscribe(formData => {
      this.pricingData = this.pricingService.buildPricingData(formData);
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
