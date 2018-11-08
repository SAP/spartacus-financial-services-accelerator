import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyAccountModule } from '../../../my-account/my-account.module';
import { PoliciesPageLayoutComponent } from './policies-page-layout.component';

@NgModule({
  imports: [CommonModule, MyAccountModule],
  declarations: [PoliciesPageLayoutComponent],
  exports: [PoliciesPageLayoutComponent]
})
export class PoliciesPageLayoutModule {}
