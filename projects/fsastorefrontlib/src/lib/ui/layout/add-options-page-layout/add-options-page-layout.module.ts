import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddOptionsPageLayoutComponent } from './add-options-page-layout.component';
import { AddOptionsModule } from 'projects/fsastorefrontlib/src/lib/my-account';
import { CmsLibModule } from '@spartacus/storefront';
import { MiniCartModule } from '@spartacus/storefront';
import { CmsComponentData } from '@spartacus/storefront';


@NgModule({
  imports: [CommonModule, AddOptionsModule],
  declarations: [AddOptionsPageLayoutComponent],
  exports: [AddOptionsPageLayoutComponent],
  providers: [
  ]
})
export class AddOptionsPageLayoutModule { }
