import { NgModule } from '@angular/core';
import { AccountModule } from './account/account.module';
import { FsaBannerModule } from './banner/fsa-banner.module';


@NgModule({
  imports: [
    AccountModule,
    FsaBannerModule
  ],
  exports: [
    AccountModule,
    FsaBannerModule
  ]
})
export class CmsLibModule {}