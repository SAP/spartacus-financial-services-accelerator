import { Component, OnDestroy, OnInit } from '@angular/core';
import { CmsService } from '@spartacus/core';
import { CmsComponentData } from '@spartacus/storefront';
import { Observable, of, Subscription } from 'rxjs';
import {
  CmsCategoryFeatureCarouselComponent,
  CmsCategoryFeatureComponent,
} from '../../../occ/occ-models';

@Component({
  selector: 'cx-fs-category-carousel',
  templateUrl: './category-feature-carousel.component.html',
})
export class CategoryFeatureCarouselComponent implements OnInit, OnDestroy {
  constructor(
    protected componentData: CmsComponentData<CmsCategoryFeatureCarouselComponent>,
    protected cmsService: CmsService
  ) {}

  subscription = new Subscription();

  component$: Observable<CmsCategoryFeatureCarouselComponent>;
  items$: Observable<Observable<CmsCategoryFeatureComponent>[]>;

  ngOnInit() {
    this.component$ = this.componentData.data$;
    this.subscription.add(
      this.component$.subscribe(data => {
        const categoryFeatures = [];
        if (data.categoryFeatures) {
          data.categoryFeatures.split(' ').forEach(feature => {
            categoryFeatures.push(this.cmsService.getComponentData(feature));
          });
        }
        this.items$ = of(categoryFeatures);
      })
    );
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
