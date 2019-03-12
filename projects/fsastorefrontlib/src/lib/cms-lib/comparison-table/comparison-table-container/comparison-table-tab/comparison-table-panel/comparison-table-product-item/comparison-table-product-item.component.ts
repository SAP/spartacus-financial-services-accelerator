import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { ProductService } from '@spartacus/core';
import { Observable } from 'rxjs';
import { FSCartService } from '../../../../../../checkout/assets/services';
import { FSProduct } from '../../../../../../occ-models';

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
    billingCode: any;

    product$: Observable<FSProduct>;

    entriesArray: any[] = [];
    billingArray: any[] = [];
    filterArray: any[] = [];

    constructor(
        protected productService: ProductService,
        protected cartService: FSCartService
    ) {
    }

    ngOnInit() {
        this.product$ = this.productService.get(this.productCode);
        this.billingArray = this.billingCode.map(el => {
            return el.code;
        });
        this.product$.subscribe(data => {
            if (data) {
                this.entriesArray = data.price.oneTimeChargeEntries.map(elem => {
                    // creating object with only product code and price
                    return {
                        billingCode: elem.billingTime.code,
                        formattedPrice: elem.price.formattedValue
                    };
                });
                this.filterArray = this.billingArray.map(element => {
                    // checking whether billingCode matches element from billingArray
                   const billingCodeArr = this.entriesArray.map(el => {
                        return el.billingCode;
                    }).indexOf(element);
                    // if billingCode matches return its' pair formattedPrice
                    if (billingCodeArr > -1) {
                        return this.entriesArray[billingCodeArr].formattedPrice;
                    } else {
                        return undefined;
                    }
                });
            }
            return this.filterArray;
        });
    }
    createCartAndStartBundleForProduct(productCode: string, bundleTemplateId: string) {
        this.cartService.createCartAndStartBundle(productCode, bundleTemplateId, 1);
    }
}
