import { NgModule } from '@angular/core';
import { AccountModule } from './account/account.module';
import { BannerModule } from './banner/banner.module';
import { ProductFeatureModule } from './product-feature/product-feature.module';


@NgModule({
  imports: [
    AccountModule,
    BannerModule,
    ProductFeatureModule
  ],
  exports: [
    AccountModule,
    BannerModule,
    ProductFeatureModule
  ]
})
export class CmsLibModule {}
