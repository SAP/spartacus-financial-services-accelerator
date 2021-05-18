import { Component } from '@angular/core';
import { RoutingService } from '@spartacus/core';
import {
  PageLayoutService,
  ProductListComponent,
  ProductListComponentService,
  ViewConfig,
} from '@spartacus/storefront';
import { FSProduct } from './../../../occ/occ-models/occ.models';
import { FSCheckoutConfigService } from '../../../core/checkout/services/checkout-config.service';

@Component({
  selector: 'cx-fs-product-list',
  templateUrl: './product-list.component.html',
})
export class FSProductListComponent extends ProductListComponent {
  constructor(
    pageLayoutService: PageLayoutService,
    productListComponentService: ProductListComponentService,
    scrollConfig: ViewConfig,
    protected checkoutConfigService: FSCheckoutConfigService,
    protected routingService: RoutingService
  ) {
    super(pageLayoutService, productListComponentService, scrollConfig);
  }

  protected categoryBasedSteps = ['chooseCoverStep', 'comparisonCheckoutStep'];

  startCheckoutForProduct(product: FSProduct) {
    let routingParam;
    const initialStep = this.checkoutConfigService.getInitialStepForCategory(
      product.defaultCategory.code
    );
    console.log(initialStep);
    if (this.categoryBasedSteps.includes(initialStep.id)) {
      routingParam = product.defaultCategory.code;
    } else {
      routingParam = product.code;
    }
    this.routingService.go({
      cxRoute: initialStep.routeName,
      params: { code: routingParam },
    });
  }
}
