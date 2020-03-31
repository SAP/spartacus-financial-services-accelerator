import { Component, OnDestroy, OnInit } from '@angular/core';
import { CmsComponentData } from '@spartacus/storefront';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { FSProductService } from '../../../core/product-pricing/facade/product.service';
import { CmsProductFeatureComponent } from '../../../occ/occ-models/cms-component.models';

@Component({
  selector: 'cx-fs-product-feature',
  templateUrl: './product-feature.component.html',
})
export class ProductFeatureComponent implements OnInit, OnDestroy {
  constructor(
    protected componentData: CmsComponentData<CmsProductFeatureComponent>,
    protected productService: FSProductService
  ) {}
  private subscription = new Subscription();
  component$: Observable<CmsProductFeatureComponent>;
  product$;
  ngOnInit() {
    this.component$ = this.componentData.data$;
    this.subscription.add(
      this.component$
        .pipe(
          map(data => {
            this.product$ = this.productService.get(data.product);
          })
        )
        .subscribe()
    );
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
