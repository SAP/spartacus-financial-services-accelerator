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
    billingCode: any[] = [];

    product$: Observable<FSProduct>;
    entries: any;
    info: any;
    infoEnt: any;
    entriesArray: any[] = [];
    billingArray: any[] = [];
    filterArray: any;


    constructor(
        protected productService: ProductService,
        protected cartService: FSCartService
    ) {
    }

    ngOnInit() {
        this.product$ = this.productService.get(this.productCode);
        this.billingArray = this.billingCode.map(stuff => {
            this.info = stuff.code;
            return this.info;
        });
        console.log('billingArray', this.billingArray);
        this.product$.subscribe(data => {
            if (data) {
                this.entries = data.price.oneTimeChargeEntries;
                this.entriesArray = this.entries.map(ent => {
                    this.infoEnt = ent.billingTime.code;
                    return this.infoEnt;
                });
                console.log('entriesArray', this.entriesArray);
                this.filterArray = this.entriesArray.filter(element => this.billingArray.indexOf(element) > -1);
                console.log('Filtered Array ', this.filterArray);
            }
            return [this.entries, this.filterArray, this.infoEnt];
        });
    }
    createCartAndStartBundleForProduct(productCode: string, bundleTemplateId: string) {
        this.cartService.createCartAndStartBundle(productCode, bundleTemplateId, 1);
    }
}
