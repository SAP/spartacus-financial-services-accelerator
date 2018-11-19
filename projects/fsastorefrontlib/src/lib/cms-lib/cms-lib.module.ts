import { NgModule } from '@angular/core';
import { BannerModule } from './banner/banner.module';
import { AccountModule } from './account/account.module';


@NgModule({
  imports: [
    BannerModule,
    AccountModule
  ],
  exports:[BannerModule,AccountModule]
})
export class CmsLibModule {}
