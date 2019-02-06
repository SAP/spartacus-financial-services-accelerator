import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyAccountModule } from '../../../my-account/my-account.module';
import { InboxPageLayoutComponent } from './inbox-page-layout.component';

@NgModule({
  imports: [CommonModule, MyAccountModule],
  declarations: [InboxPageLayoutComponent],
  exports: [InboxPageLayoutComponent]
})
export class InboxPageLayoutModule {}
