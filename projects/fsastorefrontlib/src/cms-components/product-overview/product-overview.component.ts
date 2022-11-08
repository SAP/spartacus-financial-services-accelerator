import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CmsComponent } from '@spartacus/core';
import { ICON_TYPE } from '@spartacus/storefront';
import { Observable } from 'rxjs';
import { ProductOverviewCategory } from '../../occ';

@Component({
  selector: 'cx-fs-product-overview',
  templateUrl: './product-overview.component.html',
})
export class ProductOverviewComponent {
  @Input() products$: Observable<CmsComponent[]>;
  @Input() productsCount$: Observable<any>;
  @Output() customerDashboardSelected = new EventEmitter<void>();
  @Output() typeOfProductsSelected = new EventEmitter<
    ProductOverviewCategory
  >();

  iconTypes: typeof ICON_TYPE;
  productOverviewCategory = ProductOverviewCategory;

  filters = [
    {
      text: 'all',
      emits: ProductOverviewCategory.ALL,
      active: true,
    },
    {
      text: 'insurances',
      emits: ProductOverviewCategory.INSURANCE,
      active: false,
    },
    {
      text: 'banking',
      emits: ProductOverviewCategory.BANKING,
      active: false,
    },
  ];

  emitSelectedProducts(selectedFilter: any) {
    this.typeOfProductsSelected.emit(selectedFilter.emits);

    this.filters = this.filters.map(filter => {
      let active = false;
      if (selectedFilter.text === filter.text) active = true;
      return {
        ...filter,
        active,
      };
    });
  }
}
