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
import { CategoryCarouselComponent } from './category-carousel.component';

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
          component: CategoryCarouselComponent,
        },
      },
    }),
  ],
  declarations: [CategoryCarouselComponent],
  exports: [CategoryCarouselComponent],
  entryComponents: [CategoryCarouselComponent],
})
export class CategoryCarouselModule {}
