import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { Product, ProductService } from '@spartacus/core';
import { Observable } from 'rxjs';
import { FSCartService } from '../../checkout/assets/services';

@Component({
    selector: 'fsa-comparison-table-product-item',
    templateUrl: './comparison-table-product-item.component.html',
    styleUrls: ['./comparison-table-product-item.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ComparisonTableItemComponent implements OnInit {

    @Input()
    productCode: string;

    product$: Observable<Product>;

    constructor(
        protected productService: ProductService,
        protected cartService: FSCartService
    ) {
    }

    ngOnInit() {
        this.product$ = this.productService.get(this.productCode);
        this.product$.subscribe(data => console.log(data));
    }

    createCartAndStartBundleForProduct(productCode: string, bundleTemplateId: string) {
        this.cartService.createCartAndStartBundle(productCode, bundleTemplateId, 1);
    }
}
