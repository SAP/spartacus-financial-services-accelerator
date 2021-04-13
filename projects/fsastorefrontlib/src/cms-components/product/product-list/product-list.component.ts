import { Component, OnInit } from '@angular/core';
import {
  FacetList,
  FacetService,
  PageLayoutService,
  ProductFacetService,
  ProductListComponent,
  ProductListComponentService,
  ViewConfig,
} from '@spartacus/storefront';
import { Observable } from 'rxjs';

@Component({
  selector: 'cx-fs-product-list',
  templateUrl: './product-list.component.html',
})
export class FSProductListComponent extends ProductListComponent implements OnInit {
  facetList$: Observable<FacetList>;

  constructor(
    pageLayoutService: PageLayoutService,
    productListComponentService: ProductListComponentService,
    scrollConfig: ViewConfig,
    protected facetService: FacetService,
    protected productFacetService: ProductFacetService
  ) {
    super(pageLayoutService, productListComponentService, scrollConfig);
  }

  ngOnInit() {
    console.log('product list');
    this.facetList$ = this.facetService.facetList$;
    this.facetList$.subscribe(data => console.log(data, 'facetList'));
    this.productFacetService.facetList$.subscribe(data =>
      console.log(data, 'facetList 2')
    );
    this.model$.subscribe(data => console.log(data, 'model'));
  }
}
