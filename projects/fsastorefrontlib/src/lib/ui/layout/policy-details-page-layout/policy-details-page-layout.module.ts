import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyAccountModule } from '../../../my-account/my-account.module';
import { PolicyDetailsPageLayoutComponent } from './policy-details-page-layout.component';

@NgModule({
  imports: [CommonModule, MyAccountModule],
  declarations: [PolicyDetailsPageLayoutComponent],
  exports: [PolicyDetailsPageLayoutComponent]
})
export class PolicyDetailsPageLayoutModule {}
