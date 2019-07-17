import { NgModule } from '@angular/core';
import { AccountModule } from './account/account.module';
import { BannerModule } from './banner/banner.module';
import { ProductFeatureModule } from './product-feature/product-feature.module';
import { ComparisonTableModule } from './comparison-table/comparison-table.module';
import { FSRegisterModule } from './user/register/fs-register.module';

@NgModule({
  imports: [
    AccountModule,
    BannerModule,
    ProductFeatureModule,
    ComparisonTableModule,
    FSRegisterModule
  ],
  exports: [
    AccountModule,
    BannerModule,
    ProductFeatureModule,
    ComparisonTableModule,
    FSRegisterModule
  ]
})
export class CmsLibModule {}
