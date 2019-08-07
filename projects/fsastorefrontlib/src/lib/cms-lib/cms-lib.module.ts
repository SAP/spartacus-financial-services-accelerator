import { NgModule } from '@angular/core';
import { AccountModule } from './account/account.module';
import { BannerModule } from './banner/banner.module';
import { ProductFeatureModule } from './product-feature/product-feature.module';
import { ComparisonTableModule } from './comparison-table/comparison-table.module';
import { CategoryFormsModule } from './forms/cms-category-form-component/cms-category-forms.module';
import { CustomDefinedContainerModule } from './container/cms-custom-defined-container.module';

@NgModule({
  imports: [
    AccountModule,
    BannerModule,
    ProductFeatureModule,
    ComparisonTableModule,
    CategoryFormsModule,
    CustomDefinedContainerModule
  ],
  exports: [
    AccountModule,
    BannerModule,
    ProductFeatureModule,
    ComparisonTableModule,
    CategoryFormsModule,
    CustomDefinedContainerModule
  ]
})
export class CmsLibModule {}
