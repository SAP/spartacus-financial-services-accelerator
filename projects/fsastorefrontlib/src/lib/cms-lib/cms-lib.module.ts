import { NgModule } from '@angular/core';
import { AccountModule } from './account/account.module';
import { BannerModule } from './banner/banner.module';
import { ProductFeatureModule } from './product-feature/product-feature.module';
import { ComparisonTableModule } from './comparison-table/comparison-table.module';

@NgModule({
  imports: [
    AccountModule,
    BannerModule,
    ProductFeatureModule,
    ComparisonTableModule
  ],
  exports: [
    AccountModule,
    BannerModule,
    ProductFeatureModule,
    ComparisonTableModule
  ]
})
export class CmsLibModule {}
