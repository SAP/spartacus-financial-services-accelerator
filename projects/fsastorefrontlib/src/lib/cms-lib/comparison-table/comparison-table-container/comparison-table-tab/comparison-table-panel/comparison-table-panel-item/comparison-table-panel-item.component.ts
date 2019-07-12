import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { FSCartService } from './../../../../../../checkout/assets/services';
import {  CmsConfig, ProductService, RoutingService } from '@spartacus/core';
import { Observable } from 'rxjs';
import { FSProduct, OneTimeChargeEntry } from '../../../../../../occ-models';
import { ɵc as CheckoutConfigService } from '@spartacus/storefront';
import { ActivatedRoute } from '@angular/router';
import { CheckoutStepType } from '@spartacus/storefront';
import { OccFSProductService } from './../../../../../../occ/product/fs-product-service'

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
    goTo: CheckoutStepType;

    constructor(
        protected cartService: FSCartService,
        protected productService: OccFSProductService,
        protected config: CmsConfig,
        protected routingService: RoutingService,
        private checkoutConfigService: CheckoutConfigService,
        private activatedRoute: ActivatedRoute,
    ) {
    }

    product$: Observable<FSProduct>;
    panelItemEntries: OneTimeChargeEntry[] = [];
    formObj: any = {};
    ngOnInit() {
        this.goTo = null;
        this.checkoutStepUrlNext = this.checkoutConfigService.getNextCheckoutStepUrl(
          this.activatedRoute
        );
        this.product$ = this.productService.getProductWithPricing(this.productCode, "");
        this.product$.subscribe(data => {
            if (data) {
                this.panelItemEntries = this.billingTimes.map(billingTime => {
                    return data.price.oneTimeChargeEntries.find(entry => entry.billingTime.code === billingTime.code);
                });
            }
        });
        this.productService.formObj.subscribe( obj => console.log(obj));
    }

    createCartAndStartBundleForProduct(productCode: string, bundleTemplateId: string) {
        this.cartService.createCartAndStartBundle(productCode, bundleTemplateId, 1);
        this.routingService.go(this.checkoutStepUrlNext);
    }

    public getBaseUrl() {
        return this.config.backend.occ.baseUrl || '';
    }
}
