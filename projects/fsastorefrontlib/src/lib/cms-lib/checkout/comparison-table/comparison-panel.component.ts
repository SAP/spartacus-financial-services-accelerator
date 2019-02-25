import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ProductService } from '@spartacus/core';
import { CmsComponentData } from '@spartacus/storefront';
import {ComparisonPanelCMSComponent} from '../../../occ-models';

@Component({
    selector: 'fsa-comparison-panel',
    templateUrl: './comparison-panel.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ComparisonPanelComponent implements OnInit {

    comparisonPanel;
    products;
    productList;

    constructor(
        protected componentData: CmsComponentData<ComparisonPanelCMSComponent>,
        protected productService: ProductService
    ) {
    }

    ngOnInit() {
        this.comparisonPanel = JSON.stringify(this.componentData.data$.subscribe(data => this.comparisonPanel = data));
        // this.componentData.data$.subscribe(data => {
        //     this.component$ = data;
        //     this.products$ = this.productService.get(data.products.split(" ")[0]).subscribe(data1 => this.products$ = data1);
        // });
        // this.component$.subscribe(data => {
        //     this.products$ = this.productService.get(data.products.split(" ")[0]);
        // });
    }

    getProductList (comparisonPanelProducts): string[] {
        if (comparisonPanelProducts) {
            this.productList = comparisonPanelProducts.split(' ');
          }
        return this.productList;
      }
}
