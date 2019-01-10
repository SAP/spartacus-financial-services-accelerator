import { NgModule } from '@angular/core';
import { AccountModule } from './account/account.module';
import { BannerModule } from './banner/banner.module';
import { ProductFeature } from './product-feature/product-feature.module';


@NgModule({
  imports: [
    AccountModule,
    BannerModule,
    ProductFeature
  ],
  exports: [
    AccountModule,
    BannerModule,
    ProductFeature
  ]
})
export class CmsLibModule {}
