import { Component } from '@angular/core';
import { RoutingService } from '@spartacus/core';
import {
  PageLayoutService,
  ProductListComponent,
  ProductListComponentService,
  ViewConfig,
} from '@spartacus/storefront';

@Component({
  selector: 'cx-fs-product-list',
  templateUrl: './product-list.component.html',
})
export class FSProductListComponent extends ProductListComponent {
  constructor(
    pageLayoutService: PageLayoutService,
    productListComponentService: ProductListComponentService,
    public scrollConfig: ViewConfig,
    protected routingService: RoutingService
  ) {
    super(pageLayoutService, productListComponentService, scrollConfig);
  }

  redirectToGetAQuote(productDefaultCategory) {
    const params = { code: productDefaultCategory.code };
    if (productDefaultCategory.code.includes('banking')) {
      this.routingService.go({ cxRoute: 'category', params });
      return;
    }
    this.routingService.go({ cxRoute: 'generalInformation', params });
  }
}
