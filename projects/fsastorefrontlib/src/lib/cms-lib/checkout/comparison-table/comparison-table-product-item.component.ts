import { ChangeDetectionStrategy, Component, OnInit, Input } from '@angular/core';
import { ProductService, Product } from '@spartacus/core';
import { Observable } from 'rxjs';

@Component({
    selector: 'fsa-comparison-table-product-item',
    templateUrl: './comparison-table-product-item.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ComparisonTableItemComponent implements OnInit {

    @Input()
    productCode: string;

    product$: Observable<Product>;

    constructor(
        protected productService: ProductService
    ) {
    }

    ngOnInit() {
        this.product$ = this.productService.get(this.productCode);
    }
}
