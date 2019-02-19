import { NgModule } from '@angular/core';
import { AccountModule } from './account/account.module';
import { BannerModule } from './banner/banner.module';
import { ProductFeatureModule } from './product-feature/product-feature.module';
import {CheckoutModule} from './checkout/checkout.module';


@NgModule({
  imports: [
    AccountModule,
    BannerModule,
    ProductFeatureModule,
    CheckoutModule
  ],
  exports: [
    AccountModule,
    BannerModule,
    ProductFeatureModule,
    CheckoutModule
  ]
})
export class CmsLibModule {}
