import { Component, OnInit } from '@angular/core';
import { CmsComponentData } from '@spartacus/storefront';
import { CmsCategoryFeatureComponent } from '../../occ-models';

@Component({
  selector: 'fsa-category-feature',
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
