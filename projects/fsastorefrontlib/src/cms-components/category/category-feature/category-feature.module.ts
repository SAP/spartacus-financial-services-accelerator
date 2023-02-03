import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ConfigModule,
  CmsConfig,
  I18nModule,
  UrlModule,
} from '@spartacus/core';
import { CategoryFeatureComponent } from './category-feature.component';
import { RouterModule } from '@angular/router';
import { MediaModule } from '@spartacus/storefront';

@NgModule({
  imports: [
    CommonModule,
    I18nModule,
    MediaModule,
    RouterModule,
    UrlModule,
    ConfigModule.withConfig(<CmsConfig>{
      cmsComponents: {
        CategoryFeatureComponent: {
          component: CategoryFeatureComponent,
        },
      },
    }),
  ],
  declarations: [CategoryFeatureComponent],
  exports: [CategoryFeatureComponent],
})
export class CategoryFeatureModule {}
