import { RouterModule } from '@angular/router';
import { CmsModule } from '@spartacus/storefront';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SiteContextModule } from '@spartacus/storefront';
import { FsaHeaderComponent } from './fsa-header.component';
import { LoginModule } from '@spartacus/storefront';

@NgModule({
  imports: [
    CommonModule,
    SiteContextModule,
    CmsModule,
    LoginModule,
    RouterModule
  ],
  declarations: [
    FsaHeaderComponent
  ],
  exports: [
    FsaHeaderComponent
  ]
})
export class FsaHeaderModule {}
