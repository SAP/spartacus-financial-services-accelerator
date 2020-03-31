import { Component, OnInit } from '@angular/core';
import { CmsComponentData } from '@spartacus/storefront';
import { CmsCategoryFeatureComponent } from '../../../occ/occ-models';

@Component({
  selector: 'cx-fs-category-feature',
  templateUrl: './category-feature.component.html',
})
export class CategoryFeatureComponent implements OnInit {
  constructor(
    protected componentData: CmsComponentData<CmsCategoryFeatureComponent>
  ) {}
  component$;

  ngOnInit() {
    this.component$ = this.componentData.data$;
  }
}
