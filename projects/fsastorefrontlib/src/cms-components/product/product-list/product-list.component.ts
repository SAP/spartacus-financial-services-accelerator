import { Component } from '@angular/core';
import { ProductListComponent, PageLayoutService, ProductListComponentService } from '@spartacus/storefront';


@Component({
  selector: 'fsa-product-list',
  templateUrl: './product-list.component.html',
})
export class FSProductListComponent extends ProductListComponent {
  constructor(
    private fsPageLayoutService: PageLayoutService,
    private fsProductListComponentService: ProductListComponentService
  ) {
    super(fsPageLayoutService, fsProductListComponentService);

  }

  ngOnInit(): void { }
}
