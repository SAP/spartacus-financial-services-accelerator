import { Component } from '@angular/core';
import {
  ProductListComponent,
  PageLayoutService,
  ProductListComponentService,
  ViewConfig,
} from '@spartacus/storefront';

@Component({
  selector: 'cx-fs-product-list',
  templateUrl: './product-list.component.html',
})
export class FSProductListComponent extends ProductListComponent {
  constructor(
    protected fsPageLayoutService: PageLayoutService,
    protected fsProductListComponentService: ProductListComponentService,
    public fsScrollConfig?: ViewConfig
  ) {
    super(fsPageLayoutService, fsProductListComponentService, fsScrollConfig);
  }
  viewPage(pageNumber: number) {
    this.fsProductListComponentService.viewPage(pageNumber);
  }
}
