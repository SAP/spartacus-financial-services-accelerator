import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { ComparisonTableService } from '../../../../comparison-table.service';
import { FSCartService } from 'projects/fsastorefrontlib/src/lib/checkout/assets/services';
import {  CmsConfig, ProductService } from '@spartacus/core';

@Component({
    selector: 'fsa-comparison-table-panel-item',
    templateUrl: './comparison-table-panel-item.component.html',
    styleUrls: ['./comparison-table-panel-item.component.scss'],
    providers: [ComparisonTableService],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ComparisonTablePanelItemComponent implements OnInit {

    @Input()
    productCode: string;
    @Input()
    billingTimes: any;

    constructor(
        protected comparisonTableService: ComparisonTableService,
        protected cartService: FSCartService,
        protected productService: ProductService,
        protected config: CmsConfig
    ) {
    }

    product$;
    panelItemEntries = []

    ngOnInit() {
        this.product$ = this.productService.get(this.productCode);
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
    }

    public getBaseUrl() {
        return this.config.server.baseUrl || '';
    }
}
