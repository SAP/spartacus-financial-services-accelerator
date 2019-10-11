import { Component, OnInit } from '@angular/core';
import {
  CmsCategoryCarouselComponent,
  CmsCategoryFeatureComponent,
} from '../../occ-models';
import { CmsComponentData } from '@spartacus/storefront';
import { CmsService } from '@spartacus/core';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'fsa-category-carousel',
  templateUrl: './category-carousel.component.html',
})
export class CategoryCarouselComponent implements OnInit {
  constructor(
    protected componentData: CmsComponentData<CmsCategoryCarouselComponent>,
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
