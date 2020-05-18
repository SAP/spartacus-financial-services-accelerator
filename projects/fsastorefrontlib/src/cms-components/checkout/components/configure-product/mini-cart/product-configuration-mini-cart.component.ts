import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormDataService } from '@fsa/dynamicforms';
import { Product } from '@spartacus/core';
import { CurrentProductService } from '@spartacus/storefront';
import { Subscription } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/operators';
import { PricingService } from './../../../../../core/product-pricing/facade/pricing.service';
import { FSProductService } from './../../../../../core/product-pricing/facade/product.service';
import { PricingData } from './../../../../../occ/occ-models/form-pricing.interface';
import { FSProduct } from './../../../../../occ/occ-models/occ.models';

@Component({
  selector: 'cx-fs-product-configuration-mini-cart',
  templateUrl: './product-configuration-mini-cart.component.html',
})
export class ProductConfigurationMiniCartComponent
  implements OnInit, OnDestroy {
  constructor(
    protected pricingService: PricingService,
    protected productService: FSProductService,
    protected currentProductService: CurrentProductService,
    protected formDataService: FormDataService
  ) {}

  subscription = new Subscription();
  product$: Observable<Product> = this.currentProductService.getProduct();
  productId: string;
  categoryName: string;
  pricingData: PricingData;

  ngOnInit() {
    this.subscription
      .add(
        this.product$
          .pipe(
            map(product => {
              if (product) {
                this.productId = product.code;
                this.categoryName = (<FSProduct>product).defaultCategory.name;
              }
            })
          )
          .subscribe()
      )
      .add(
        this.formDataService
          .getSubmittedForm()
          .pipe(
            map(yFormData => {
              if (yFormData && yFormData.content) {
                this.pricingData = this.pricingService.buildPricingData(
                  JSON.parse(yFormData.content)
                );
                this.product$ = this.productService.getCalculatedProductData(
                  this.productId,
                  this.pricingData
                );
              }
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
