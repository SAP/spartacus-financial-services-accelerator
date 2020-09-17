import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  FormDataService,
  FormDataStorageService,
  YFormData,
} from '@fsa/dynamicforms';
import { RoutingService } from '@spartacus/core';
import { CurrentProductService } from '@spartacus/storefront';
import { Subscription } from 'rxjs';
import { filter, map, take } from 'rxjs/operators';
import { FSCartService } from './../../../../../core/cart/facade/cart.service';
import { PricingService } from './../../../../../core/product-pricing/facade/pricing.service';
import { FSProduct } from './../../../../../occ/occ-models/occ.models';

@Component({
  selector: 'cx-fs-product-configuration-navigation',
  templateUrl: './product-configuration-navigation.component.html',
})
export class ProductConfigurationNavigationComponent
  implements OnInit, OnDestroy {
  constructor(
    protected formDataStorageService: FormDataStorageService,
    protected formDataService: FormDataService,
    protected pricingService: PricingService,
    protected currentProductService: CurrentProductService,
    protected cartService: FSCartService,
    protected routingService: RoutingService
  ) {}

  subscription = new Subscription();
  productCode: string;
  bundleCode: string;
  categoryCode: string;

  ngOnInit() {
    this.subscription.add(
      this.currentProductService
        .getProduct()
        .pipe(
          filter(Boolean),
          map(currentProduct => {
            const product = <FSProduct>currentProduct;
            if (product && product.defaultCategory && product.bundleTemplates) {
              this.productCode = product.code;
              this.categoryCode = product.defaultCategory.code;
              this.bundleCode = product.bundleTemplates[0].id;
            }
          })
        )
        .subscribe()
    );
  }

  navigateNext() {
    this.submitFormData();
    this.subscription.add(
      this.formDataService
        .getSubmittedForm()
        .pipe(
          filter(formData => !!formData?.content),
          take(1),
          map(formData => {
            const pricingData = this.pricingService.buildPricingData(
              JSON.parse(formData.content)
            );
            this.cartService.createCartForProduct(
              this.productCode,
              this.bundleCode,
              1,
              pricingData
            );
            this.routingService.go({
              cxRoute: 'addOptions',
            });
          })
        )
        .subscribe()
    );
  }

  protected submitFormData() {
    const formDataId = this.formDataStorageService.getFormDataIdByCategory(
      this.categoryCode
    );
    const formData: YFormData = {};
    if (formDataId) {
      formData.id = formDataId;
    }
    this.formDataService.submit(formData);
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
