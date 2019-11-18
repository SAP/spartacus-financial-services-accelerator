import { Component, OnInit, OnDestroy } from '@angular/core';
import { CmsComponentData } from '@spartacus/storefront';
import { ProductService } from '@spartacus/core';
import { CmsProductFeatureComponent } from '../../../occ/occ-models/cms-component.models';
import { Subscription } from 'rxjs';

@Component({
  selector: 'fsa-product-feature',
  templateUrl: './product-feature.component.html',
})
export class ProductFeatureComponent implements OnInit, OnDestroy {
  constructor(
    protected componentData: CmsComponentData<CmsProductFeatureComponent>,
    protected productService: ProductService
  ) { }
  private subscription = new Subscription();
  component$;
  product$;
  ngOnInit() {
    this.component$ = this.componentData.data$;
    this.subscription.add(
      this.component$.subscribe(data => {
        this.product$ = this.productService.get(data.product);
      })
    );
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
