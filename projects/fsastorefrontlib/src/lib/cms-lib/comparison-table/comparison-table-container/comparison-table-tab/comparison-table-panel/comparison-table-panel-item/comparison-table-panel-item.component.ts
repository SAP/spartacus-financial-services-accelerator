import { Observable } from 'rxjs';
import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CmsConfig, RoutingService } from '@spartacus/core';
import { CheckoutConfigService } from '@spartacus/storefront';

import { FSCartService } from './../../../../../../checkout/assets/services';
import { FSProduct, OneTimeChargeEntry } from '../../../../../../occ-models';
import { PricingData } from 'projects/fsastorefrontlib/src/lib/checkout/assets/models/pricing.interface';
import { PricingService } from 'projects/fsastorefrontlib/src/lib/checkout/assets/services/pricing/pricing.service';
import { FSProductService } from 'projects/fsastorefrontlib/src/lib/checkout/assets/services/product/fs-product.service';

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
    pricingData: PricingData;

    constructor(
        protected cartService: FSCartService,
        protected config: CmsConfig,
        protected routingService: RoutingService,
        private checkoutConfigService: CheckoutConfigService,
        private activatedRoute: ActivatedRoute,
        private pricingService: PricingService,
        private productService: FSProductService,
    ) {
    }

    product$: Observable<FSProduct>;
    panelItemEntries: OneTimeChargeEntry[] = [];

    ngOnInit() {
        this.checkoutStepUrlNext = this.checkoutConfigService.getNextCheckoutStepUrl(
            this.activatedRoute
        );
        this.pricingData = this.pricingService.getPricingAttributes();
        this.product$ = this.productService.getExtendedProductData(this.productCode, this.pricingData);
        this.product$.subscribe(data => {
            if (data) {
                this.panelItemEntries = this.billingTimes.map(billingTime => {
                    return data.price.oneTimeChargeEntries.find(entry => entry.billingTime.code === billingTime.code);
                });
            }
        });
    }

    createCartAndStartBundleForProduct(productCode: string, bundleTemplateId: string) {
        console.log(this.productCode);
        console.log(this.pricingData);

        this.cartService.createCartAndStartBundle(productCode, bundleTemplateId, 1, this.pricingData);
        this.routingService.go(this.checkoutStepUrlNext);
    }

    public getBaseUrl() {
        return this.config.backend.occ.baseUrl || '';
    }

}
