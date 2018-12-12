import { NgModule } from '@angular/core';
import { AccountModule } from './account/account.module';
import { BannerModule } from './banner/banner.module';


@NgModule({
  imports: [
    AccountModule,
    BannerModule
  ],
  exports: [
    AccountModule,
    BannerModule
  ]
})
export class CmsLibModule {}