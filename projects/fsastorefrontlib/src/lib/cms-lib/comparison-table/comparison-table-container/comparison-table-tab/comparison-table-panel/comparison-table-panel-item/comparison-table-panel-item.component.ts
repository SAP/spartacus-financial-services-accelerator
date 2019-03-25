import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { ProductService, CmsConfig } from '@spartacus/core';
import { Observable } from 'rxjs';
import { FSCartService } from '../../../../../../checkout/assets/services';
import { FSProduct, OneTimeChargeEntry } from '../../../../../../occ-models';

@Component({
    selector: 'fsa-comparison-table-panel-item',
    templateUrl: './comparison-table-panel-item.component.html',
    styleUrls: ['./comparison-table-panel-item.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ComparisonTablePanelItemComponent implements OnInit {

    @Input()
    productCode: string;
    @Input()
    billingTimes: any;

    product$: Observable<FSProduct>;
    panelItemEntries: OneTimeChargeEntry[] = [];

    constructor(
        protected productService: ProductService,
        protected cartService: FSCartService,
        protected config: CmsConfig
    ) {
    }

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
