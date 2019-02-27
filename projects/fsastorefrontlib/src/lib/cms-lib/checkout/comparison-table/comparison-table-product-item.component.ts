import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Cart, Product, ProductService } from '@spartacus/core';
import { FSCartService } from '../../../checkout/assets/services';

@Component({
    selector: 'fsa-comparison-table-product-item',
    templateUrl: './comparison-table-product-item.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ComparisonTableItemComponent implements OnInit {

    @Input()
    productCode: string;

    product$: Observable<Product>;
    cart$: Observable<Cart>;
    bundleTemplateId: Observable<string>;

    constructor(
        protected productService: ProductService,
        protected cartService: FSCartService
    ) {
    }

    ngOnInit() {
        this.cart$ = this.cartService.getActive();
        this.product$ = this.productService.get(this.productCode);
    }

    createCartAndStartBundleForProduct(productCode: string, bundleTemplateId: string) {
        this.cartService.createCartAndStartBundle(productCode, bundleTemplateId, 1);
    }
}
