import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ConfigModule,
  CmsConfig,
  I18nModule,
  UrlModule,
  CmsModule,
} from '@spartacus/core';
import { RouterModule } from '@angular/router';
import {
  MediaModule,
  CarouselModule,
  PageComponentModule,
} from '@spartacus/storefront';
import { CategoryFeatureCarouselComponent } from './category-feature-carousel.component';

@NgModule({
    imports: [
        CommonModule,
        I18nModule,
        MediaModule,
        RouterModule,
        UrlModule,
        CarouselModule,
        CmsModule,
        PageComponentModule,
        ConfigModule.withConfig(<CmsConfig>{
            cmsComponents: {
                FSCategoryFeatureCarouselComponent: {
                    component: CategoryFeatureCarouselComponent,
                },
            },
        }),
    ],
    declarations: [CategoryFeatureCarouselComponent],
    exports: [CategoryFeatureCarouselComponent]
})
export class CategoryFeatureCarouselModule {}
