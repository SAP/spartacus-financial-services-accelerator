import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { ProductService } from '@spartacus/core';
import { Observable } from 'rxjs';
import { FSCartService } from '../../../../../../checkout/assets/services';
import { FSProduct, OneTimeChargeEntry } from './../../../../../../occ-models';

@Component({
    selector: 'fsa-comparison-table-product-item',
    templateUrl: './comparison-table-product-item.component.html',
    styleUrls: ['./comparison-table-product-item.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ComparisonTableItemComponent implements OnInit {

    @Input()
    productCode: string;
    @Input()
    billingTimes: any;

    product$: Observable<FSProduct>;
    filterArray: OneTimeChargeEntry[] = [];

    constructor(
        protected productService: ProductService,
        protected cartService: FSCartService
    ) {
    }

    ngOnInit() {
        this.product$ = this.productService.get(this.productCode);
        this.product$.subscribe(data => {
            if (data) {
                this.filterArray = this.billingTimes.map(billingTime => {
                    return data.price.oneTimeChargeEntries.find(entry => entry.billingTime.code === billingTime.code);
                });
            }
        });
    }

    createCartAndStartBundleForProduct(productCode: string, bundleTemplateId: string) {
        this.cartService.createCartAndStartBundle(productCode, bundleTemplateId, 1);
    }
}
