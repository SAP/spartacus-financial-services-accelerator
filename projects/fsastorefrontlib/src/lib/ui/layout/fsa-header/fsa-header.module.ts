import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { CmsModule } from '@spartacus/storefront';
import { SiteContextModule } from '@spartacus/storefront';
import { LoginModule } from '@spartacus/storefront';

import { FsaHeaderComponent } from './fsa-header.component';
import { FsaMobileMenuComponent } from './mobile-menu/fsa-mobile-menu.component';


@NgModule({
  imports: [
    CommonModule,
    SiteContextModule,
    CmsModule,
    LoginModule,
    RouterModule
  ],
  declarations: [
    FsaHeaderComponent, FsaMobileMenuComponent
  ],
  exports: [
    FsaHeaderComponent, FsaMobileMenuComponent
  ]
})
export class FsaHeaderModule {}
