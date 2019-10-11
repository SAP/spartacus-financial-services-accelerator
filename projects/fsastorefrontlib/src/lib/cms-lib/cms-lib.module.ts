import { NgModule } from '@angular/core';
import { AccountModule } from './account/account.module';
import { BannerModule } from './banner/banner.module';
import { ProductFeatureModule } from './product-feature/product-feature.module';
import { ComparisonTableModule } from './comparison-table/comparison-table.module';
import { CategoryFormsModule } from './forms/cms-category-form-component/cms-category-forms.module';
import { CustomContainerModule } from './container/cms-custom-container.module';
import { AgentModule } from './agent/agent.module';
import { CategoryFeatureModule } from './category-feature/category-feature.module';
import { CategoryCarouselModule } from './category-carousel/category-carousel.module';

@NgModule({
  imports: [
    AgentModule,
    AccountModule,
    BannerModule,
    ProductFeatureModule,
    ComparisonTableModule,
    CategoryFormsModule,
    CustomContainerModule,
    CategoryFeatureModule,
    CategoryCarouselModule,
  ],
  exports: [
    AgentModule,
    AccountModule,
    BannerModule,
    ProductFeatureModule,
    ComparisonTableModule,
    CategoryFormsModule,
    CustomContainerModule,
    CategoryFeatureModule,
    CategoryCarouselModule,
  ],
})
export class CmsLibModule {}
