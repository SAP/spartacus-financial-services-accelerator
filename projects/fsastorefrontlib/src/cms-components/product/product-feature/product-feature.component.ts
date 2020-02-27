import { FSProductService } from '../../../core/product-pricing/facade/fs-product.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { CmsComponentData } from '@spartacus/storefront';
import { CmsProductFeatureComponent } from '../../../occ/occ-models/cms-component.models';
import { Subscription, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'fsa-product-feature',
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
