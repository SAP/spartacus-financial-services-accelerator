import { Component, OnInit } from '@angular/core';
import { CmsComponentData } from '@spartacus/storefront';
import { ProductService } from '@spartacus/core';
import { CmsProductFeatureComponent } from '../../occ/occ-models/cms-component.models';

@Component({
  selector: 'fsa-product-feature',
  templateUrl: './product-feature.component.html',
})
export class ProductFeatureComponent implements OnInit {
  constructor(
    protected componentData: CmsComponentData<CmsProductFeatureComponent>,
    protected productService: ProductService
  ) {}
  component$;
  product$;
  ngOnInit() {
    this.component$ = this.componentData.data$;
    this.component$.subscribe(data => {
      this.product$ = this.productService.get(data.product);
    });
  }
}
