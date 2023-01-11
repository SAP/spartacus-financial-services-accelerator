import { Component } from '@angular/core';
import {
  PageLayoutService,
  ProductListComponent,
  ProductListComponentService,
  ViewConfig,
} from '@spartacus/storefront';
import { FSProduct } from './../../../occ/occ-models/occ.models';
import { FSCheckoutService } from './../../../core/checkout/facade/checkout.service';
import { GlobalMessageService } from '@spartacus/core';

@Component({
  selector: 'cx-fs-product-list',
  templateUrl: './product-list.component.html',
})
export class FSProductListComponent extends ProductListComponent {
  constructor(
    pageLayoutService: PageLayoutService,
    productListComponentService: ProductListComponentService,
    scrollConfig: ViewConfig,
    globalMessageService: GlobalMessageService,
    protected checkoutService: FSCheckoutService
  ) {
    super(
      pageLayoutService,
      productListComponentService,
      globalMessageService,
      scrollConfig
    );
  }

  startCheckout(product: FSProduct) {
    this.checkoutService.startCheckoutForProduct(product);
  }
}
