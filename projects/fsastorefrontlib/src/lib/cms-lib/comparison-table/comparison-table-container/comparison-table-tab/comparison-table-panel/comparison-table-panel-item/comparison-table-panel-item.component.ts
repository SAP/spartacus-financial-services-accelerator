import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { FSCartService } from './../../../../../../checkout/assets/services';
import {  CmsConfig, ProductService, RoutingService, Product } from '@spartacus/core';
import { Observable } from 'rxjs';
import { FSProduct, OneTimeChargeEntry } from '../../../../../../occ-models';
import { ActivatedRoute } from '@angular/router';
import { CheckoutConfigService } from '@spartacus/storefront';
import { PricingData } from 'projects/fsastorefrontlib/src/lib/checkout/assets/models/pricing.interface';
import { PricingService } from 'projects/fsastorefrontlib/src/lib/checkout/assets/services/pricing/pricing.service';
import { OccPricingService } from 'projects/fsastorefrontlib/src/lib/occ/pricing/occ-pricing.service';

@Component({
    selector: 'fsa-comparison-table-panel-item',
    templateUrl: './comparison-table-panel-item.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ComparisonTablePanelItemComponent implements OnInit {

    @Input()
    productCode: string;
    @Input()
    billingTimes: any;
    checkoutStepUrlNext: string;
    priceData: PricingData;
    productPrice: string;

    constructor(
        protected cartService: FSCartService,
        protected productService: ProductService,
        protected config: CmsConfig,
        protected routingService: RoutingService,
        private checkoutConfigService: CheckoutConfigService,
        private activatedRoute: ActivatedRoute,
        private pricingService: PricingService,
        private occPricingService: OccPricingService
    ) {
    }

    product$: Observable<FSProduct>;
    panelItemEntries: OneTimeChargeEntry[] = [];

    ngOnInit() {
        this.checkoutStepUrlNext = this.checkoutConfigService.getNextCheckoutStepUrl(
          this.activatedRoute
        );
        this.priceData = this.pricingService.getPricingAttributes();
        this.product$ = this.pricingService.getExtendedProductData(this.productCode, this.priceData);
        console.log(this.product$);
        this.product$.subscribe(data => {
            if (data) {
                this.panelItemEntries = this.billingTimes.map(billingTime => {
                    return data.price.oneTimeChargeEntries.find(entry => entry.billingTime.code === billingTime.code);
                });
            }
        });
    }

    createCartAndStartBundleForProduct(productCode: string, bundleTemplateId: string) {
        this.cartService.createCartAndStartBundle(productCode, bundleTemplateId, 1);
        this.routingService.go(this.checkoutStepUrlNext);
    }

    public getBaseUrl() {
        return this.config.backend.occ.baseUrl || '';
    }

}
