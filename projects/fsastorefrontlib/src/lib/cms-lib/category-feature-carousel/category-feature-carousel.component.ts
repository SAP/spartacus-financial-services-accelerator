import { Component, OnInit } from '@angular/core';
import {
  CmsCategoryFeatureComponent, CmsCategoryFeatureCarouselComponent,
} from '../../occ-models';
import { CmsComponentData } from '@spartacus/storefront';
import { CmsService } from '@spartacus/core';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'fsa-category-carousel',
  templateUrl: './category-feature-carousel.component.html',
})
export class CategoryFeatureCarouselComponent implements OnInit {
  constructor(
    protected componentData: CmsComponentData<CmsCategoryFeatureCarouselComponent>,
    protected cmsService: CmsService
  ) {}

  component$;
  items$: Observable<Observable<CmsCategoryFeatureComponent>[]>;

  ngOnInit() {
    this.component$ = this.componentData.data$;
    this.component$.subscribe(data => {
      const categoryFeatures$ = [];
      data.categoryFeatures.split(' ').forEach(feature => {
        categoryFeatures$.push(this.cmsService.getComponentData(feature));
      });
      this.items$ = of(categoryFeatures$);
    });
  }
}
