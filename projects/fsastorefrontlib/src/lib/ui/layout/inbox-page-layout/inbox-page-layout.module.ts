import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CmsModule } from '@spartacus/storefront';
import { InboxPageLayoutComponent } from './inbox-page-layout.component';

@NgModule({
  imports: [CommonModule, CmsModule],
  declarations: [InboxPageLayoutComponent],
  exports: [InboxPageLayoutComponent]
})
export class InboxPageLayoutModule {}
