import { Component, ChangeDetectionStrategy, OnInit, ViewEncapsulation } from '@angular/core';
import { CmsComponentData } from '@spartacus/storefront';
import { ProductService } from '@spartacus/core';
import { CmsProductFeature } from './../../occ-models/cms-component.models';

@Component({
    selector: 'fsa-product-feature',
    templateUrl: './product-feature-component.html',
    styleUrls: ['./product-feature-component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductFeatureComponent implements OnInit {
    CmsComponent = Component;
    constructor(
        protected componentData: CmsComponentData<CmsProductFeature>,
        protected productService: ProductService
    ) { }
    component$;
    product$;
    productCode;
    ngOnInit() {
        this.component$ = this.componentData.data$;
        this.component$.subscribe(data => {
            this.productCode = data.product;
        });
        this.product$ = this.productService.get(this.productCode);
    }
}
